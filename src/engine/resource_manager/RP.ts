import { extractHeaders, fileToJson, ZipFileEntry } from '@engine/utils/decoders';
import { AtlasRegistry } from './registry/atlasRegistry';
import { AtlasTileRegistry } from './registry/atlasTileRegistry';
import { BlockModelRegistry } from './registry/blockModelRegistry';
import { BlockTextureRegistry } from "./registry/blockTextureRegistry";
import { BlockPermutationRegistry, BlockTypeRegistry } from './registry/blockTypeRegistry';
import { CubeGeometryRegistry } from './registry/cubeGeometryRegistry';
import { WorkerEventType } from './worker/workerDataProtocol';
import { WorkerEntryPoint } from './workerEntryPoint';

 import { BlockMapper } from './parsers/blockMapper';

export interface ResourcePackData {
    name: string;
    version: string;
    description: string;
}

export type RegistryConstructor<T = any> = new (...args: any[]) => T;

export class ResourcePack {
    private fileMap: Map<string, ZipFileEntry> = new Map();
    private zipBuffer!: ArrayBuffer;
    
    public parent?: ResourcePack;
    public metadata!: ResourcePackData;

    // Store registries keyed by their Class Constructor type
    public readonly registries = new Map<RegistryConstructor, any>();

    constructor(public packUrl: string) {}

    /**
     * Retrieve a registry dynamically by its class type.
     * Fully type-safe and autocompleted at compile time.
     */
    public get<T>(ctor: RegistryConstructor<T>): T {
        const registry = this.registries.get(ctor);
        if (!registry) {
            throw new Error(`Registry "${ctor.name}" not found in pack`);
        }
        return registry as T;
    }

    default() {
        this.registries.set(BlockTextureRegistry, new BlockTextureRegistry());
        this.registries.set(AtlasTileRegistry, new AtlasTileRegistry());
        this.registries.set(AtlasRegistry, new AtlasRegistry());
        this.registries.set(CubeGeometryRegistry, new CubeGeometryRegistry());
        this.registries.set(BlockModelRegistry, new BlockModelRegistry());
        this.registries.set(BlockTypeRegistry, new BlockTypeRegistry());
        this.registries.set(BlockPermutationRegistry, new BlockPermutationRegistry());
    }

    linkedClone(newUrl: string): ResourcePack {
        const clone = new ResourcePack(newUrl);
        clone.parent = this;

        // Clone each registry using its constructor type dynamically
        for (const [Ctor, registry] of this.registries.entries()) {
            clone.registries.set(Ctor, new Ctor(registry));
        }

        return clone;
    }

    /**
     * Logically removes a pack from the active cascading chain.
     * Returns the new head of the active ResourcePack chain.
     */
    public removePack(packToRemove: ResourcePack): ResourcePack {
        if (this === packToRemove) {
            return this.parent!;
        }

        let current: ResourcePack | undefined = this;
        while (current) {
            if (current.parent === packToRemove) {
                current.parent = packToRemove.parent;

                // Loop through constructors to bypass registry parents
                for (const [Ctor, registry] of current.registries.entries()) {
                    const targetRegistry = packToRemove.registries.get(Ctor);
                    if (targetRegistry) {
                        registry.removeNode(targetRegistry);
                    }
                }
                break;
            }
            current = current.parent;
        }

        return this; // We remain the head of the chain
    }

    async load() {
        const response = await fetch(this.packUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch resource pack from ${this.packUrl}: ${response.statusText}`);
        }

        this.zipBuffer = await response.arrayBuffer();
        this.fileMap = extractHeaders(this.zipBuffer);

        await this.extractMetadata();

        // 1. Eagerly pull block JSONs into memory before transferring zipBuffer
        const blockMapper = new BlockMapper(
            this.zipBuffer,
            this.fileMap,
            this.get(BlockTypeRegistry),
            this.get(BlockPermutationRegistry)
        );

        // 2. Transfer zipBuffer to worker to parse textures, atlases, and models
        const assetsPromise = this.parseAssets();

        // 3. Concurrently parse block definitions on the main thread
        blockMapper.parse();

        // 4. Await worker completion and payload unpack
        await assetsPromise;

        // 5. Marry block definitions to textures and models
        const typeRegistry = this.get(BlockTypeRegistry);
        typeRegistry.bindToRp(this);
    }

    private async extractMetadata() {
        const manifestFile = this.fileMap.get('rp/manifest.json')
            || this.fileMap.get('resource_pack/manifest.json')
            || this.fileMap.get('manifest.json');

        if (!manifestFile) {
            this.metadata = {
                name: "Unnamed Pack",
                version: "1.0.0",
                description: ""
            };
            return;
        }

        const manifestJson = await fileToJson(this.zipBuffer, manifestFile);
        this.metadata = {
            name: manifestJson.header?.name ?? "Unnamed Pack",
            version: manifestJson.header?.version?.join('.') ?? "0.0.0",
            description: manifestJson.header?.description ?? ""
        };
    }

    private async parseAssets() {
        const entryPoint = WorkerEntryPoint.getInstance();

        // Map constructors to the string keys expected by the worker protocol
        const registries = {
            blockTextures: this.get(BlockTextureRegistry),
            atlasTiles: this.get(AtlasTileRegistry),
            atlasLayers: this.get(AtlasRegistry),
            cubeGeometries: this.get(CubeGeometryRegistry),
            blockModels: this.get(BlockModelRegistry)
        };

        const payload = entryPoint.preparePayload(registries);

        const result = await entryPoint.executeWorkload(
            payload,
            this.zipBuffer,
            WorkerEventType.PARSE_RESOURCE_PACK
        );

        entryPoint.interpretPayload(registries, result);
    }
}