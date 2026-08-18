import { AtlasBuilder } from "@engine/utils/atlasBuilder";
import { extractFromImageFile, extractHeaders, fileToJson, ZipFileEntry } from "@engine/utils/decoders";
import { AtlasRegistry, AtlasTileRegistry, BlockTextureRegistry } from "../registry";
import { WorkerRequest } from "../worker/workerDataProtocol";

import * as Constants from "../constants";

import { colorFromHex, imageWithOverlay, imageWithTint } from "src/engine/utils/imageManipulations";

import type { FlipbookTexture, FlipbookTextureFile } from "@bedrock-types/rp/textures/flipbook_textures";
import type { TerrainTextureFile, Texture, Texture2, TextureData1 } from "@bedrock-types/rp/textures/terrain_texture";
import type { BlockceptionMinecraftResourceTextureTextureSet, FileName } from "@bedrock-types/rp/textures/texture_set";

type ImageConfig = {
    tint_color?: string;
    overlay_color?: string;
    position?: { x: number, y: number }; // Optional position for placing the image in the atlas
    frames?: number[]; // Optional frames for flipbook textures
    addToTextureRegistry?: boolean; // Optional flag to add the texture to the registry
}

type TextureSetResult = {
    colorTexture: { width: number, height: number, data: Uint8Array };
    mersTexture?: { width: number, height: number, data: Uint8Array };
}

function createFallbackImageData(): Uint8Array {
    const data = new Uint8Array(16 * 16 * 4);
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const isPurple = ((Math.floor(x / 8) + Math.floor(y / 8)) % 2) === 0;
            const offset = (y * 16 + x) * 4;
            data[offset] = isPurple ? 255 : 0;     // R
            data[offset + 1] = 0;                  // G
            data[offset + 2] = isPurple ? 255 : 0; // B
            data[offset + 3] = 255;                // A
        }
    }
    return data;
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

    private atlasEntryCompilation = new Uint16Array(512); // Temporary buffer for compiling atlas entries before placing them in the registry

    constructor(private workerRequest: WorkerRequest) {
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

        // Initialize builders directly in the constructor
        this.initAtlasBuilders(this.atlasRegistry.atlasBuffer, 8);
    }

    initAtlasBuilders(atlasBuffer: ArrayBuffer, padding: number) { 
        this.colorAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer), 4096, 4096, 16, padding);
        this.mersAtlasBuilder = new AtlasBuilder(new Uint8Array(atlasBuffer, Constants.INITIAL_ATLAS_SIZE), 4096, 4096, 16, padding);
    }

    async initFallbackTexture() {
        const data = createFallbackImageData();
        const tile = this.addTexture({ width: 16, height: 16, data }, { addToTextureRegistry: false });
        this.fallbackTextureId = this.blockTextureRegistry.push(".fallback", {
            atlas_u: tile.x,
            atlas_v: tile.y,
            atlas_w: 0,
            texture_u_exponent: 4, // 16px = 2^4
            texture_v_exponent: 4
        }, {
            tinted: false,
            pure: true
        });
    }

    async parse() {
        // Create fallback texture first
        await this.initFallbackTexture();

        //Extract terrain texture json
        const terrainTextureFile = this.headers.get("textures/terrain_texture.json")!;
        const terrainTextureJson = this.terrainTextureJson = await fileToJson(this.workerRequest.zipBuffer, terrainTextureFile);

        //Extract flipbook texture json
        const flipbookTextureFile = this.headers.get("textures/flipbook_textures.json")!;
        this.flipbookTextureJson = await fileToJson(this.workerRequest.zipBuffer, flipbookTextureFile);

        await this.addFlipbookTiles();
        await this.addTerrainTiles();
    }

    searchForTextureSet(path: string) {
        const textureSet = path + ".textureset.json";
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
    //FIXME; handle the case where the flipbook texture doesnt fit in the atlas
    // either because the atlas is full or because the texture was placed at an akward position
    // It shouldnt happen often

    async addFlipbookTiles() {
        for (const flipbookTexture of this.flipbookTextureJson) {
            this.addFlipbookEntry(flipbookTexture);
        }
    }

    async addTerrainTiles() {
        for (const [name, entry] of Object.entries(this.terrainTextureJson.texture_data!)) {
            await this.addTerrainEntry(name, entry);
        }
    }

    *normalizeTerrainTextureEntry(entry: TextureData1) {
        const isArray = Array.isArray(entry.textures);
        const textures = Array.isArray(entry.textures) ? entry.textures : [entry.textures];

        for (let i = 0; i < textures.length; i++) {
            const texture = textures[i];
            const index = isArray ? i : undefined;

            if (typeof texture === "string") {
                yield { path: texture, index: index, variant: undefined };
            } else if (texture!.variations) {
                const variations = texture!.variations;
                for (let j = 0; j < variations.length; j++) {
                    const variation = variations[j];
                    yield { path: variation.path, index: index, variant: j, weight: variation.weight || 0 };
                }
            } else {
                yield { path: texture!.path, index: index, variant: undefined };
            }
        }
    }

    async addTerrainEntry(name: string, entry: TextureData1) {
        const tileData: any[] = [];
        let lastVariant = -1, lastVariations: number[] | undefined = undefined;

        for (const { path, index, variant, weight } of this.normalizeTerrainTextureEntry(entry)) {
            const textureId = await this.addTileAtIndex(entry, index, variant);

            if (variant === undefined) {
                tileData.push(textureId);
            } else {
                if (variant !== lastVariant) {
                    //Resolve unspecified weights for the last set of variations
                    if (lastVariant != -1) {
                        const weights = lastVariations!.filter((_, i) => i % 2 === 1);
                        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
                        const zeroeWeightCount = weights.filter(w => w === 0).length;
                        const weightDistribution = Math.floor((100 - totalWeight) / zeroeWeightCount);
                        for (let i = 0; i < lastVariations!.length; i += 2) {
                            lastVariations![i + 1] ??= weightDistribution;
                        }
                    }

                    tileData.push(lastVariations = [textureId!, weight]);

                } else {
                    lastVariations!.push(textureId!, weight);
                }
            }
        }

        this.atlasTileRegistry.pushWithVariation(name, tileData);
    }

    async addFlipbookEntry({ flipbook_texture, atlas_tile, frames, blend_frames, atlas_index, atlas_tile_variant }: FlipbookTexture) {
        const terrainTextureEntry = this.terrainTextureJson.texture_data![atlas_tile!];

        if (!terrainTextureEntry) {
            console.warn(`Terrain texture entry not found for atlas_tile: ${atlas_tile}`);
            return;
        }

        const textureId = await this.addTileAtIndex(terrainTextureEntry, atlas_index, atlas_tile_variant);
        const view = this.blockTextureRegistry.get(textureId!)!;
        const position = {
            x: view.atlas_u,
            y: view.atlas_v + 1
        }

        view.a_framae_cnt = frames?.length || 0;
        view.blend_frames = blend_frames ? 1 : 0;

        //Add the animation frames to the atlas downwards from the base tile position
        const textures = await this.extractTextureFile(flipbook_texture!);
        if (!textures) {
            console.warn(`Flipbook texture not found for path: ${flipbook_texture}`);
            return;
        }

        const tile = await this.stichTexture(textures, {
            addToTextureRegistry: false,
            position,
            frames
        });
    }

    async addTileAtIndex(textureDef: TextureData1, texture_index?: number, variant?: number): Promise<number> {
        let path = "";
        try {
            let texture: Texture2 | undefined = undefined;
            let config: ImageConfig = {
                addToTextureRegistry: true,
            };

            if (texture_index !== undefined) {
                const textures = textureDef.textures as Texture[];
                const tex = textures[texture_index];

                if (typeof tex === "string") {
                    texture = { path: tex };
                } else {
                    texture = tex;
                    config.tint_color = texture.tint_color;
                    config.overlay_color = texture.overlay_color;

                    if (variant !== undefined) {
                        const variations = texture.variations!;
                        texture = variations[variant];
                    }
                }
            } else {
                const tex = textureDef.textures;
                if (typeof tex === "string") {
                    texture = { path: tex };
                } else if (tex && typeof tex === "object") {
                    texture = tex as Texture2;
                    config.tint_color = texture.tint_color;
                    config.overlay_color = texture.overlay_color;

                    if (variant !== undefined) {
                        const variations = texture.variations!;
                        texture = variations[variant];
                    }
                }
            }

            if (!texture || !texture.path) {
                throw new Error("Invalid texture definition: path not found");
            }

            path = texture.path;
            const flattenedName = this.flattenName(path, texture_index, variant);

            const existingId = this.blockTextureRegistry.nameToId(flattenedName);
            if (existingId !== undefined) {
                const metadata = this.blockTextureRegistry.getMeta(existingId)!;

                if ((config.tint_color || config.overlay_color)) {
                    if (!metadata.tinted) {
                        // Use the existing tile and add a tinted version of it to the atlas
                    } else {

                    }
                } else {
                    // The texture was already added to the registry 
                    if (!metadata.tinted) {
                        return existingId;
                    }
                }
            }

            const textures = await this.extractTextureFile(path);
            const tile = await this.stichTexture(textures, config);
            return this.blockTextureRegistry.push(flattenedName, {
                atlas_u: tile.x,
                atlas_v: tile.y,
                atlas_w: 0,
                texture_u_exponent: Math.log2(tile.width),
                texture_v_exponent: Math.log2(tile.height)
            }, {
                tinted: !!(config.tint_color || config.overlay_color),
                pure: false
            });

        } catch (error) {
            console.warn(`[TextureMapper] Failed loading tile for path "${path || 'unknown'}":`, error);
            return this.fallbackTextureId;
        }
    }

    flattenName(name: string, tileIndex?: number, variantIndex?: number) {
        let flattenedName = name;
        if (tileIndex !== undefined) {
            flattenedName += `_${tileIndex}`;
        }
        if (variantIndex !== undefined) {
            flattenedName += `_${variantIndex}`;
        }
        return flattenedName;
    }

    async extractTextureFile(path: string): Promise<TextureSetResult> {
        const textureSet = this.searchForTextureSet(path);
        if (textureSet) {
            const textureSetJson = await fileToJson(this.workerRequest.zipBuffer, textureSet) as BlockceptionMinecraftResourceTextureTextureSet;
            const { color, metalness_emissive_roughness_subsurface } = textureSetJson["minecraft:texture_set"];

            const colorTexture = this.searchForTexture(color as FileName);
            const mersTexture = this.searchForTexture(metalness_emissive_roughness_subsurface as FileName);

            if (!colorTexture) {
                throw new Error(`Color texture "${color}" not found in ZIP for set: ${path}`);
            }

            return {
                colorTexture: await extractFromImageFile(this.workerRequest.zipBuffer, colorTexture),
                mersTexture: mersTexture ? await extractFromImageFile(this.workerRequest.zipBuffer, mersTexture) : undefined
            } as TextureSetResult;
        }

        const texture = this.searchForTexture(path);
        if (texture) {
            return {
                colorTexture: await extractFromImageFile(this.workerRequest.zipBuffer, texture),
            } as TextureSetResult;
        }

        throw new Error(`Texture image file "${path}" not found in ZIP`);
    }

    async stichTexture({ colorTexture, mersTexture }: TextureSetResult, config: ImageConfig) {
        const tile = this.addTexture(colorTexture, config, this.colorAtlasBuilder);

        if (mersTexture) {
            config.position = tile; // Use the same position for the mers texture
            this.addTexture(mersTexture, config, this.mersAtlasBuilder);
        }

        return {
            ...tile,
            width: colorTexture.width,
            height: colorTexture.height
        };
    }

    addTexture(texture: { width: number, height: number, data: Uint8Array }, config?: ImageConfig, atlas = this.colorAtlasBuilder) {
        const { width, height, data } = texture;

        if (config?.tint_color) {
            imageWithTint(data, width, height, colorFromHex(config.tint_color));
        } else if (config?.overlay_color) {
            imageWithOverlay(data, width, height, colorFromHex(config.overlay_color));
        }

        if (config?.frames) {
            const position = config.position ?? this.colorAtlasBuilder.getNextAvailablePosition(width, height);
            if (!position) {
                throw new Error("Could not find available position in atlas for image of size " + width + "x" + height);
            }

            const frameSize = width * width * 4; // Assuming RGBA format
            let framePosition = { x: position.x, y: position.y };

            for (const frameIndex of config.frames) {
                const frameOffset = frameIndex * frameSize;
                const frameData = new Uint8Array(data.buffer, data.byteOffset + frameOffset, frameSize);

                atlas.addImage(frameData, width, width, framePosition);
                framePosition.y++; // Move to the next row for the next frame
            }

            return position;
        }

        return atlas.addImage(data, width, height, config?.position);
    }
}