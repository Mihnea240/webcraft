import { AtlasBuilder } from "@engine/utils/atlasBuilder";
import { extractFromImageFile, extractHeaders, fileToJson, ZipFileEntry } from "@engine/utils/decoders";
import { AtlasRegistry, AtlasTileRegistry, BlockTextureRegistry } from "../registry";
import { WorkerRequest } from "../worker/workerDataProtocol";

import * as Constants from "../constants";

import { colorFromHex, imageWithOverlay, imageWithTint } from "src/engine/utils/imageManipulations";

import type { FlipbookTexture, FlipbookTextureFile } from "@bedrock-types/rp/textures/flipbook_textures";
import type { TerrainTextureFile, Texture2, TextureData1, Variantions } from "@bedrock-types/rp/textures/terrain_texture";

type ImageConfig = {
    position?: { x: number, y: number }; // Optional position for placing the image in the atlas
    frames?: number[]; // Optional frames for flipbook textures

    // The name registered in the texture registry for this entry
    //For enties with tint/overlay, it will be diffrent from the path
    textureRegistryName: string;
    path: string; // Path to the texture file (without extension)
} & Texture2

type TextureSetResult = {
    colorTexture: { width: number, height: number, data: Uint8Array };
    mersTexture?: { width: number, height: number, data: Uint8Array };
}

class TerrainParser {
    constructor(private terrainTextureJson: TerrainTextureFile) {

    }

    *enties(entry: TextureData1) {
        if (Array.isArray(entry.textures)) {
            for (let i = 0; i < entry.textures!.length; i++) {
                let texture = entry.textures![i];
                if (typeof texture === "string") {
                    texture = { path: texture };
                    entry.textures![i] = texture;
                }

                const variations = (texture as Texture2).variations;
                if (variations) {
                    this.resolveVariations(variations);
                }
                yield texture as Texture2;
            }
        } else if (typeof entry.textures === "string") {
            const texture = { path: entry.textures };
            entry.textures = texture as any;
            yield texture;
        } else {
            const texture = entry.textures as Texture2;
            const variations = texture.variations;
            if (variations) {
                this.resolveVariations(variations);
            }

            yield texture;
        }
    }

    resolveVariations(variations: Variantions) {
        const nullWeightCount = variations.filter(v => v.weight === undefined).length;
        const totalWeight = variations.reduce((sum, v) => sum + (v.weight ?? 0), 0);
        const weightDistribution = Math.floor((100 - totalWeight) / nullWeightCount);

        for (const variation of variations) {
            variation.weight ??= weightDistribution;
        }
    }

    getTextureEntry(atlas_tile: string, index?: number): Texture2 {
        const entry = this.terrainTextureJson.texture_data![atlas_tile];
        if (!entry) {
            throw new Error(`Terrain texture entry not found for atlas_tile: ${atlas_tile}`);
        }

        let tex = entry.textures;
        if (Array.isArray(tex)) {
            const idx = index !== undefined ? index : 0;
            const texture = tex[idx];
            if (typeof texture === "string") {
                const obj = { path: texture } as Texture2;
                tex[idx] = obj;
                return obj;
            }
            return texture as Texture2;
        } else {
            if (typeof tex === "string") {
                const obj = { path: tex } as Texture2;
                entry.textures = obj as any;
                return obj;
            }
            return tex as Texture2;
        }
    }

    incorporateVariation(config: ImageConfig, variationIndex: number) {
        const variation = config.variations![variationIndex];
        config.path = variation.path;
        config.textureRegistryName = !!(config.tint_color || config.overlay_color) ? `${config.path}__${variationIndex}` : config.path;
    }
}

export class TextureMapper {

    headers: Map<string, ZipFileEntry>;
    terrainTextureJson!: TerrainTextureFile;
    flipbookTextureJson!: FlipbookTextureFile;


    colorAtlasBuilder!: AtlasBuilder;
    mersAtlasBuilder!: AtlasBuilder;

    blockTextureRegistry!: BlockTextureRegistry;
    atlasRegistry!: AtlasRegistry;
    atlasTileRegistry!: AtlasTileRegistry;

    public fallbackTextureId!: number;
    terrainParser!: TerrainParser;

    constructor(private workerRequest: WorkerRequest, public useMers: boolean = false) {
        this.headers = extractHeaders(workerRequest.zipBuffer);

        this.blockTextureRegistry = new BlockTextureRegistry();
        this.atlasRegistry = new AtlasRegistry();
        this.atlasTileRegistry = new AtlasTileRegistry();

        const registries = {
            blockTextures: this.blockTextureRegistry,
            atlasTiles: this.atlasTileRegistry,
            atlasLayers: this.atlasRegistry
        };

        let bufferIndex = 0;
        for (const [key, registry] of Object.entries(registries)) {
            const count = workerRequest.bufferCounts[key] || 0;
            const registryBuffers = workerRequest.buffers.slice(bufferIndex, bufferIndex + count);
            bufferIndex += count;

            registry.importMetadata(workerRequest.metadata[key]);
            registry.importBuffers(registryBuffers);
        }
    }

    initAtlasBuilders(atlasBuffer: ArrayBuffer, padding: number) {
        const [width, height] = Constants.ATLAS_DIMENSIONS;
        const ATLAS_SIZE = width * height * 4; // Assuming RGBA format

        const colorArray = new Uint8Array(atlasBuffer, 0, ATLAS_SIZE);
        const mersArray = new Uint8Array(atlasBuffer, ATLAS_SIZE, ATLAS_SIZE);

        this.colorAtlasBuilder = new AtlasBuilder(colorArray, width, height, 16, padding);
        this.mersAtlasBuilder = new AtlasBuilder(mersArray, width, height, 16, padding);
    }

    get missing() {
        if (this.fallbackTextureId === undefined) {
            const entry = this.terrainParser.getTextureEntry("missing");    
            this.fallbackTextureId = this.addTile(entry as ImageConfig);
        }
        return this.fallbackTextureId;
    }

    searchForTextureSet(path: string) {
        const textureSet = path + ".texture_set.json";
        const textureSetFile = this.headers.get(textureSet);

        if (textureSetFile) {
            return textureSetFile;
        }

        return undefined;
    }

    searchForTexture(path: string) {
        const texturePngFile = this.headers.get(path + ".png");
        if (texturePngFile) {
            return texturePngFile;
        }

        const textureTgaFile = this.headers.get(path + ".tga");
        if (textureTgaFile) {
            return textureTgaFile;
        }

        const textureJpgFile = this.headers.get(path + ".jpg");
        if (textureJpgFile) {
            return textureJpgFile;
        }

        return undefined;
    }

    extractTextureFile(path: string): TextureSetResult {
        const textureSet = this.searchForTextureSet(path);
        if (textureSet && this.useMers) {
            const textureSetJson = fileToJson(this.workerRequest.zipBuffer, textureSet);
            const { color, metalness_emissive_roughness_subsurface } = textureSetJson["minecraft:texture_set"];

            const colorPath = path.replace(/[^/]+$/, color);
            const mersPath = path.replace(/[^/]+$/, metalness_emissive_roughness_subsurface);
            const colorTexture = this.searchForTexture(colorPath);
            const mersTexture = this.searchForTexture(mersPath);

            if (!colorTexture) {
                throw new Error(`Color texture "${colorPath}" not found in ZIP for set: ${path}`);
            }

            const result: TextureSetResult = {
                colorTexture: extractFromImageFile(this.workerRequest.zipBuffer, colorTexture),
                mersTexture: mersTexture ? extractFromImageFile(this.workerRequest.zipBuffer, mersTexture) : undefined
            };

            return result;
        }

        const texture = this.searchForTexture(path);
        if (texture) {
            return {
                colorTexture: extractFromImageFile(this.workerRequest.zipBuffer, texture),
            } as TextureSetResult;
        }

        throw new Error(`Texture image file "${path}" not found in ZIP`);
    }

    parse() {
        //Extract terrain texture json
        const terrainTextureFile = this.headers.get("textures/terrain_texture.json")!;
        this.terrainTextureJson = fileToJson(this.workerRequest.zipBuffer, terrainTextureFile);

        this.initAtlasBuilders(this.atlasRegistry.atlasBuffer, this.terrainTextureJson.padding ?? 8);
        this.terrainParser = new TerrainParser(this.terrainTextureJson);

        //Extract flipbook texture json
        const flipbookTextureFile = this.headers.get("textures/flipbook_textures.json")!;
        this.flipbookTextureJson = fileToJson(this.workerRequest.zipBuffer, flipbookTextureFile);

        for (const entry of this.flipbookTextureJson) {
            try {
                this.addFlipbookEntry(entry);
            } catch (error) {
                console.error("[Flipbook]", error);
            }
        }

        for (const [atlasTile, entry] of Object.entries(this.terrainTextureJson.texture_data!)) {
            try {
                this.addTerrainEntry(atlasTile, entry);
            } catch (error) {
                console.error("[Terrain]", error);
            }
        }
    }


    addTerrainEntry(name: string, entry: TextureData1) {
        const tileData: (number | number[])[] = [];
        let i = 0;

        for (const texture of this.terrainParser.enties(entry)) {
            const config = texture as ImageConfig;
            const tainted = config.tint_color || config.overlay_color;

            if (config.variations) {
                const variations = config.variations;
                const variationData: number[] = [];
                tileData.push(variationData);

                for (let i = 0; i < config.variations.length; i++) {
                    this.terrainParser.incorporateVariation(config, i);

                    const id = this.addTile(config);
                    variationData.push(id);
                    variationData.push(variations[i].weight!);
                }

                continue;
            }

            i++;
            if (tainted) {
                config.textureRegistryName = `${config.path}__${name}__${i}`;
            }

            const id = this.addTile(config);
            tileData.push(id);
        }

        return this.atlasTileRegistry.pushWithVariation(name, tileData);
    }

    addFlipbookEntry({
        flipbook_texture,
        atlas_tile, frames,
        blend_frames,
        atlas_index,
        atlas_tile_variant,
        ticks_per_frame,
    }: FlipbookTexture
    ) {
        const terrainTextureEntry = this.terrainTextureJson.texture_data![atlas_tile!];

        if (!terrainTextureEntry) {
            console.warn(`Terrain texture entry not found for atlas_tile: ${atlas_tile}`);
            return;
        }

        const textures = this.extractTextureFile(flipbook_texture!);

        // If frames is omitted, generate the natural frame order: [0, 1, 2, ..., N-1]
        let animationFrames = frames;
        const width = textures.colorTexture.width;
        const height = textures.colorTexture.height;

        if (!animationFrames) {
            const frameCount = Math.floor(height / width);
            animationFrames = Array.from({ length: frameCount }, (_, i) => i);
        }

        const config = this.terrainParser.getTextureEntry(atlas_tile!, atlas_index) as ImageConfig;
        if (atlas_tile_variant !== undefined) {
            if (config.variations) {
                config.variations[atlas_tile_variant].path = flipbook_texture!;
            }
        }

        config.textureRegistryName = config.path = flipbook_texture!;
        config.frames = animationFrames;

        config.position = this.addTexture(textures.colorTexture, config, this.colorAtlasBuilder);
        if (textures.mersTexture) {
            this.addTexture(textures.mersTexture, config, this.mersAtlasBuilder);
        }

        const id = this.blockTextureRegistry.register(config.textureRegistryName);
        const view = this.blockTextureRegistry.get(id)!;

        view.atlas_u = config.position.x;
        view.atlas_v = config.position.y;
        view.texture_v_exponent = view.texture_u_exponent = Math.log2(width);
        view.a_framae_cnt = animationFrames.length;
        view.a_speed = ticks_per_frame ?? 1;
        view.blend_frames = blend_frames ? 1 : 0;
    }

    addTile(config: ImageConfig): number {
        const name = config.textureRegistryName ?? config.path;
        const existingId = this.blockTextureRegistry.nameToId(name);
        if (existingId !== undefined) {
            return existingId;
        }

        const { colorTexture, mersTexture } = this.extractTextureFile(config.path);
        if (colorTexture.height > colorTexture.width) { 
            console.warn(`Texture ${config.path} has height greater than width. This may cause issues with texture mapping.`);
            return this.missing;
        }

        const pos = this.addTexture(colorTexture, config, this.colorAtlasBuilder);
        if (mersTexture) {
            this.addTexture(mersTexture, config, this.mersAtlasBuilder);
        }

        const width = colorTexture.width;
        const height = config.frames ? colorTexture.width : colorTexture.height;

        const id = this.blockTextureRegistry.register(name);
        const view = this.blockTextureRegistry.get(id)!;
        view.atlas_u = pos.x;
        view.atlas_v = pos.y;
        view.texture_u_exponent = Math.log2(width);
        view.texture_v_exponent = Math.log2(height);

        return id;
    }

    //Used to attach the texture to the atlas and return the position of the texture in the atlas
    addTexture(texture: { width: number, height: number, data: Uint8Array }, config?: ImageConfig, atlas = this.colorAtlasBuilder) {
        const { width, height, data } = texture;

        if (config?.tint_color) {
            imageWithTint(data, width, height, colorFromHex(config.tint_color));
        } else if (config?.overlay_color) {
            imageWithOverlay(data, width, height, colorFromHex(config.overlay_color as any));
        }

        if (config?.frames) {
            const totalHeight = config.frames.length * (width + atlas.padding * 2) - atlas.padding * 2;
            const position = config.position ?? this.colorAtlasBuilder.getNextAvailablePosition(width, totalHeight);
            if (!position) {
                throw new Error("Could not find available position in atlas for image of size " + width + "x" + totalHeight);
            }

            const frameSize = width * width * 4; // Assuming RGBA format
            const frameSpan = Math.ceil((width + 2 * atlas.padding) / atlas.unitSize);
            let framePosition = { x: position.x, y: position.y };

            for (const frameIndex of config.frames) {
                const frameOffset = frameIndex * frameSize;
                const frameData = new Uint8Array(data.buffer, data.byteOffset + frameOffset, frameSize);

                atlas.addImage(frameData, width, width, framePosition);
                framePosition.y += frameSpan; // Move to the next row for the next frame
            }

            return position;
        }

        return atlas.addImage(data, width, height, config?.position);
    }
}