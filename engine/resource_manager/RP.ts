import { extractHeaders, fileToJson } from '@engine/utils/decoders';
import { UnzipFile } from 'fflate';
import { AtlasTileRegistry } from './atlasTileRegistry';
import { BlockTextureRegistry } from "./blockTextureRegistry";

const INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE = 4096 * 2 //4096 descriptors, 2 bytes each
const ATLAS_SIZE = (4096 ** 2) * 4; // 4096x4096 RGBA texture
const INITIAL_ATLAS_COUNT = 2 //one for color and the next for mers 

export interface ResourcePackData {
    name: string;
    version: string;
    description: string;
}



export class ResourcePack {
    private fileMap: Map<string, UnzipFile> = new Map();

    public parent?: ResourcePack;
    public metadata!: ResourcePackData;

    public atlasBuffer!: ArrayBuffer;
    public blockTextureRegistry!: BlockTextureRegistry;
    public atlasTileRegistry!: AtlasTileRegistry;

    constructor(public packUrl: string) {
    }

    default() {
        const blockTextureDescriptorBuffer = new ArrayBuffer(INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE);
        const atlasBuffer = new ArrayBuffer(ATLAS_SIZE * INITIAL_ATLAS_COUNT);

        this.blockTextureRegistry = new BlockTextureRegistry(blockTextureDescriptorBuffer, this);
        this.atlasTileRegistry = new AtlasTileRegistry(this);
        this.atlasBuffer = atlasBuffer;
    }

    linkedClone(newUrl: string): ResourcePack {
        const clone = new ResourcePack(newUrl);
        clone.parent = this;
        clone.blockTextureRegistry = this.blockTextureRegistry.linkedClone(clone);
        clone.atlasTileRegistry = this.atlasTileRegistry.linkedClone(clone);
        return clone;
    }

    async load() {
        const response = await fetch(this.packUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch resource pack from ${this.packUrl}: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const filemap = this.fileMap = extractHeaders(arrayBuffer);

        const mainThreadParsingFiles = [
            filemap.get('manifest.json'),
        ];
    }

    private async extractMetadata() {
        const manifestFile = this.fileMap.get('manifest.json');
        if (!manifestFile) {
            throw new Error("Resource pack is missing manifest.json");
        }

        const manifestJson = await fileToJson(manifestFile);
        // Right data object and other bits
    }

    private async parseBlockDefinitions() {
        
    }

    private async parseTerrainTextures() {
        const file = this.fileMap.get("textures/terrain_texture.json");
        if (!file) {
            throw new Error("Resource pack is missing textures/terrain_texture.json");
        }

        const terrainTextureJson = await fileToJson(file);
        const worker = (window as any).textureUnpackerWorker as Worker;

        worker.postMessage({
            type: "unpackTerrainTextures",
            data: terrainTextureJson,
            atlasBuffer: this.atlasBuffer,
            blockTextureDescriptorBuffer: this.blockTextureRegistry.buffer
        }, [this.atlasBuffer, this.blockTextureRegistry.buffer]);

        return new Promise<void>((resolve, reject) => {
            worker.onmessage = (event) => {
                const { type, data } = event.data;
                if (type === "unpackComplete") {
                    this.atlasBuffer = data.atlasBuffer;
                    this.blockTextureRegistry.buffer = data.blockTextureDescriptorBuffer;
                    resolve();
                } else if (type === "unpackError") {
                    reject(new Error(data.error));
                }
            };
        });
    }
}