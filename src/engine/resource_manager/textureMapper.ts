import { AtlasBuilder } from "@engine/utils/atlasBuilder";
import { extractFromImageFile, extractHeaders, fileToJson } from "@engine/utils/decoders";
import { UnzipFile } from "fflate";
import { ATLAS_SIZE } from "./RP";
import { WorkerRequest } from "./worker/workerDataProtocol";

import type { FlipbookTextureFile } from "@bedrock-types/rp/textures/flipbook_textures";
import type { TerrainTextureFile, Texture, Texture2 } from "@bedrock-types/rp/textures/terrain_texture";

export class TextureMapper{

    headers: Map<string, UnzipFile>;
    terrainTextureJson!: TerrainTextureFile;
    flipbookTextureJson!: FlipbookTextureFile;


    colorAtlasBuilder!: AtlasBuilder;
    mersAtlasBuilder!: AtlasBuilder;



    constructor(private workerReques: WorkerRequest) {
        this.headers = extractHeaders(workerReques.zipBuffer);

    }

    initAtlasBuilders(atlasBuffer: ArrayBuffer, padding: number) {
        this.colorAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer), 4096, 4096, 16, padding);
        this.mersAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer, ATLAS_SIZE), 4096, 4096, 16, padding);
    }

    async parse() {
        //Extract terrain texture json
        const terrainTextureFile = this.headers.get("textures/terrain_texture.json")!;
        const terrainTextureJson = this.terrainTextureJson = await fileToJson(terrainTextureFile);
    
        const padding = terrainTextureJson.padding || 8;
        this.initAtlasBuilders(this.workerReques.atlasBuffer, padding);

        //Extract flipbook texture json
        const flipbookTextureFile = this.headers.get("textures/flipbook_texture.json")!;
        this.flipbookTextureJson = await fileToJson(flipbookTextureFile);

    }

    addFlipbookTiles() {
        

        for (const flipbookEntry of this.flipbookTextureJson) {
            const { flipbook_texture, atlas_tile, frames, blend_frames, atlas_index, atlas_tile_variant } = flipbookEntry;
            const terrainTextureEntry = this.terrainTextureJson.texture_data![atlas_tile!];

            //The animation is defined for a texture in the tiles texture array
            if (atlas_index !== undefined) { 
                const textures = terrainTextureEntry.textures as Texture[];
                const texture = textures[atlas_index] as Texture2;

                

            }
        }
    }

    async addImage(path: string, config?: { tint_color?: string, overlay_color?: string }) { 
        const imageFile = this.headers.get(path);
        if (!imageFile) {
            console.warn(`Image file not found: ${path}`);
            return;
        }

        const imageBuffer = await extractFromImageFile(imageFile);
    }

    addTile(name: string) {
        
    }


}