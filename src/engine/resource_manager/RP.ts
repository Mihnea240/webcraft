import { extractHeaders, fileToJson } from '@engine/utils/decoders';
import { UnzipFile } from 'fflate';
import { AtlasTileRegistry } from './registry/atlasTileRegistry';
import { BlockTextureRegistry } from "./registry/blockTextureRegistry";

export const INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE = 4096 * 2 //4096 descriptors, 2 bytes each
export const ATLAS_SIZE = (4096 ** 2) * 4; // 4096x4096 RGBA texture
export const INITIAL_ATLAS_COUNT = 2 //one for color and the next for mers 

export interface ResourcePackData {
    name: string;
    version: string;
    description: string;
}

export class ResourcePack {
    private fileMap: Map<string, UnzipFile> = new Map();
    public metadata!: ResourcePackData;

    public atlasBuffer!: ArrayBuffer;
    public blockTextureRegistry!: BlockTextureRegistry;
    public atlasTileRegistry!: AtlasTileRegistry;

    constructor(public packUrl: string) {
    }

    default() {
        this.blockTextureRegistry = new BlockTextureRegistry();
        this.atlasTileRegistry = new AtlasTileRegistry();
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
        
    }
}