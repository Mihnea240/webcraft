import { AtlasBuilder } from "@engine/utils/atlasBuilder";
import { extractFromImageFile, extractHeaders, fileToJson } from "@engine/utils/decoders";
import { BlockTextureRegistry } from "../blockTextureRegistry";
import type { ResourcePack } from "../RP";
import { WorkerRequest } from "./workerDataProtocol";


self.onmessage = async (event: MessageEvent<WorkerRequest>) => {

}

async function parseTerrainTexture(data: WorkerRequest) {
    const { zipBuffer, textureRegistry: textureRegistryData, atlasBuffer} = data;
    const { buffer, offset } = textureRegistryData;
    
    //Extract the file contents
    const headers = extractHeaders(zipBuffer);
    const terrainTextureFile = headers.get("textures/terrain_texture.json")!;
    const terrainTextureJson = await fileToJson(terrainTextureFile);
    
    const textureRegistry = new BlockTextureRegistry(buffer, {} as ResourcePack, { length: offset });

    const colorAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer), 4096, 4096, 16, 8);
    // const mersAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer), 4096, 4096, 16, 8);
    
    const textureData = terrainTextureJson.texture_data;
    for (const tileName in textureData) {
        const tileData = textureData[tileName];

        const textures = tileData.textures;
        
        if (typeof textures === "string") {
            const view = textureRegistry.getByName(textures);
            if (view) continue;

            const newView = textureRegistry.getNextView();
            const imageData = await extractFromImageFile(headers.get(textures));
        }
    }
}