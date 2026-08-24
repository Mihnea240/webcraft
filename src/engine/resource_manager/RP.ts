import { extractHeaders, fileToJson, ZipFileEntry } from '@engine/utils/decoders';
import { AtlasRegistry } from './registry/atlasRegistry';
import { AtlasTileRegistry } from './registry/atlasTileRegistry';
import { CubeGeometryRegistry } from './registry/cubeGeometryRegistry';
import { BlockModelRegistry } from './registry/blockModelRegistry';
import { BlockTextureRegistry } from "./registry/blockTextureRegistry";
import { ResourceRegistry } from './registry/resourceRegistry';
import { WorkerEventType } from './worker/workerDataProtocol';
import { WorkerEntryPoint } from './workerEntryPoint';

export interface ResourcePackData {
    name: string;
    version: string;
    description: string;
}

export class ResourcePack {
    private fileMap: Map<string, ZipFileEntry> = new Map();
    private zipBuffer!: ArrayBuffer;
    
    public parent?: ResourcePack;
    public metadata!: ResourcePackData;

    // Store registries keyed by their Class Constructor type
    public readonly registries = new Map<new (parent?: any) => ResourceRegistry<any, any>, ResourceRegistry<any, any>>();

    constructor(public packUrl: string) {}

    /**
     * Retrieve a registry dynamically by its class type.
     * Fully type-safe and autocompleted at compile time.
     */
    public get<T extends ResourceRegistry<any, any>>(ctor: new (parent?: any) => T): T {
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
        await this.parseBlockDefinitions();
        await this.parseTerrainTextures();
    }

    private async extractMetadata() {
        const manifestFile = this.fileMap.get('manifest.json');
        if (!manifestFile) {
            throw new Error("Resource pack is missing manifest.json");
        }

        const manifestJson = await fileToJson(this.zipBuffer, manifestFile);
        this.metadata = {
            name: manifestJson.header?.name ?? "Unnamed Pack",
            version: manifestJson.header?.version?.join('.') ?? "0.0.0",
            description: manifestJson.header?.description ?? ""
        };
    }

    private async parseBlockDefinitions() {
        
    }

    private async parseTerrainTextures() {
        const file = this.fileMap.get("textures/terrain_texture.json");
        if (!file) {
            return;
        }

        const entryPoint = WorkerEntryPoint.getInstance();

        // Map constructors to the string keys expected by the worker protocol
        const registries = {
            blockTextures: this.get(BlockTextureRegistry),
            atlasTiles: this.get(AtlasTileRegistry),
            atlasLayers: this.get(AtlasRegistry)
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