import fs from "fs";
import JSZip from "jszip";
import path from "path";
import { mergeBlockDefinition } from "./archetypes/index.mjs";
import { convertJavaBlockState } from "./java-blockstate-resolver.mjs";
import { compileJavaModelsToBedrock } from "./java-model-resolver.mjs";

const JAVA_MODELS_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/26.2/assets/minecraft/models/block/_all.json";
const JAVA_BLOCKSTATES_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/26.2/assets/minecraft/blockstates/_all.json";

// Pipeline Actions
export const ACTIONS = {
    KEEP: "keep",
    DELETE: "delete",
    TRANSFORM: "transform"
};

/**
 * Processor Rules for asset filtering and transformations.
 * Supports RegExp matching, KEEP, DELETE, and TRANSFORM actions with custom handlers.
 */
export const rules = [
    {
        name: "texture_definitions",
        // Keep terrain_texture, flipbook_textures, and item_texture JSONs
        pattern: /^(?:resource_pack\/)?textures\/(?:terrain_texture|flipbook_textures|item_texture)\.json$/,
        action: ACTIONS.KEEP
    },
    {
        name: "texture_sets",
        // Keep Bedrock RTX / MERS texture set definitions
        pattern: /^(?:resource_pack\/)?textures\/.*\.texture_set\.json$/,
        action: ACTIONS.KEEP
    },
    {
        name: "block_textures",
        // Keep textures (blocks, terrain, items, particle) in resource pack
        pattern: /^(?:resource_pack\/)?textures\/(?:blocks?|terrain|colormap|environment)\/.*\.(?:png|tga|jpg)$/,
        action: ACTIONS.KEEP
    },
    {
        name: "general_textures",
        // Keep general textures
        pattern: /^(?:resource_pack\/)?textures\/.*\.(?:png|tga|jpg)$/,
        action: ACTIONS.KEEP
    },
    {
        name: "custom_geometries",
        // Keep geometry definitions
        pattern: /^(?:resource_pack\/)?models\/(?:blocks?|entity)\/.*\.geo\.json$/,
        action: ACTIONS.KEEP
    },
    {
        name: "biomes",
        // Keep biome definitions
        pattern: /^(?:resource_pack\/)?biomes\/.*\.json$/,
        action: ACTIONS.KEEP
    },
    {
        name: "source_block_definitions",
        // Transform or merge source block definitions if provided
        pattern: /^(?:behavior_pack\/)?blocks\/([^/]+)\.json$/,
        action: ACTIONS.TRANSFORM,
        transform: async ({ relativePath, fileData, blockDefinitions }) => {
            try {
                const json = JSON.parse(fileData.toString("utf8"));
                const blockKey = path.basename(relativePath, ".json");
                // If source pack provides block definition, merge it
                if (json["minecraft:block"]) {
                    const existing = blockDefinitions.get(blockKey);
                    if (existing) {
                        existing["minecraft:block"].components = {
                            ...(existing["minecraft:block"].components || {}),
                            ...(json["minecraft:block"].components || {})
                        };
                    } else {
                        blockDefinitions.set(blockKey, json);
                    }
                }
            } catch (err) {
                console.warn(`[Preprocessor] Could not transform ${relativePath}:`, err.message);
            }
        }
    },
    {
        name: "java_blockstates",
        // Transform Java blockstates from source pack if present
        pattern: /^(?:assets\/minecraft\/)?blockstates\/([^/]+)\.json$/,
        action: ACTIONS.TRANSFORM,
        transform: async ({ relativePath, fileData, blockDefinitions }) => {
            try {
                const blockKey = path.basename(relativePath, ".json");
                const blockStateJson = JSON.parse(fileData.toString("utf8"));
                const stateData = convertJavaBlockState(blockKey, blockStateJson);
                const existing = blockDefinitions.get(blockKey);
                if (existing) {
                    if (stateData.states && Object.keys(stateData.states).length > 0) {
                        existing["minecraft:block"].description.states = stateData.states;
                    }
                    if (stateData.traits) {
                        existing["minecraft:block"].components["minecraft:traits"] = stateData.traits;
                    }
                    if (stateData.permutations && stateData.permutations.length > 0) {
                        mergeBlockDefinition(existing["minecraft:block"], {
                            permutations: stateData.permutations
                        });
                    }
                }
            } catch (err) {
                console.warn(`[Preprocessor] Could not transform blockstate ${relativePath}:`, err.message);
            }
        }
    },
    {
        name: "manifests_and_blocks_json",
        // Keep manifest and blocks.json
        pattern: /^(?:resource_pack\/|behavior_pack\/)?(?:manifest\.json|blocks\.json)$/,
        action: ACTIONS.KEEP
    },
    {
        name: "catch_all_delete",
        // Catch-all: delete everything else (audio, UI, documentation, entities)
        pattern: /.*/,
        action: ACTIONS.DELETE
    }
];

/**
 * Downloads and caches Java block models from the official mirror
 */
async function fetchJavaModels(cachePath = "./scratch/java_all_models.json") {
    if (fs.existsSync(cachePath)) {
        console.log(`[Preprocessor] Using cached Java models from ${cachePath}`);
        return JSON.parse(fs.readFileSync(cachePath, "utf8"));
    }

    console.log(`[Preprocessor] Downloading official Java models from ${JAVA_MODELS_URL}...`);
    const res = await fetch(JAVA_MODELS_URL);
    if (!res.ok) {
        throw new Error(`Failed to download Java models: ${res.statusText}`);
    }
    const text = await res.text();
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, text);
    return JSON.parse(text);
}

/**
 * Downloads and caches Java blockstates from the official mirror
 */
async function fetchJavaBlockStates(cachePath = "./scratch/java_all_blockstates.json") {
    if (fs.existsSync(cachePath)) {
        console.log(`[Preprocessor] Using cached Java blockstates from ${cachePath}`);
        return JSON.parse(fs.readFileSync(cachePath, "utf8"));
    }

    try {
        console.log(`[Preprocessor] Downloading official Java blockstates from ${JAVA_BLOCKSTATES_URL}...`);
        const res = await fetch(JAVA_BLOCKSTATES_URL);
        if (res.ok) {
            const text = await res.text();
            fs.mkdirSync(path.dirname(cachePath), { recursive: true });
            fs.writeFileSync(cachePath, text);
            return JSON.parse(text);
        }
    } catch (e) {
        console.warn(`[Preprocessor] Could not download Java blockstates: ${e.message}`);
    }
    return {};
}

/**
 * Main Processing Pipeline
 */
export async function runPipeline(inputPath = "./src/assets/rp.zip", outputPath = "./src/assets/addon.zip") {
    console.log(`[Preprocessor] Running pipeline...`);
    const targetZip = new JSZip();

    // 1. Download & Process Java models and blockstates
    const allModels = await fetchJavaModels();
    const allBlockStates = await fetchJavaBlockStates();
    console.log(`[Preprocessor] Compiling Java models & blockstates via java-model-resolver...`);
    const { bedrockGeometries, blockDefinitions } = compileJavaModelsToBedrock(allModels, allBlockStates);

    // 2. Filter and transform assets from source pack using the regex rule pipeline
    if (fs.existsSync(inputPath)) {
        console.log(`[Preprocessor] Filtering source pack from ${inputPath}...`);
        const inputBuffer = fs.readFileSync(inputPath);
        const sourceZip = await JSZip.loadAsync(inputBuffer);

        for (const [relativePath, fileEntry] of Object.entries(sourceZip.files)) {
            if (fileEntry.dir) continue;

            const rule = rules.find(r => r.pattern.test(relativePath));
            if (!rule || rule.action === ACTIONS.DELETE) continue;

            const fileData = await fileEntry.async("nodebuffer");

            if (rule.action === ACTIONS.KEEP) {
                // Normalize path to resource_pack/ or behavior_pack/
                let destPath = relativePath;
                if (!destPath.startsWith("resource_pack/") && !destPath.startsWith("behavior_pack/")) {
                    if (destPath.startsWith("blocks/")) {
                        destPath = `behavior_pack/${destPath}`;
                    } else {
                        destPath = `resource_pack/${destPath}`;
                    }
                }

                // Never overwrite the generated vanilla_geometries with an uncompiled source
                if (destPath === "resource_pack/models/blocks/vanilla_geometries.geo.json") {
                    continue;
                }

                targetZip.file(destPath, fileData);
            } else if (rule.action === ACTIONS.TRANSFORM && typeof rule.transform === "function") {
                await rule.transform({
                    relativePath,
                    fileData,
                    sourceZip,
                    targetZip,
                    blockDefinitions,
                    bedrockGeometries
                });
            }
        }
    }

    // 3. Write unique geometries file
    targetZip.file(
        "resource_pack/models/blocks/vanilla_geometries.geo.json",
        JSON.stringify({ format_version: "1.12.0", "minecraft:geometry": bedrockGeometries }, null, 2)
    );

    // 4. Write individual block definition files in behavior_pack/blocks/<name>.json
    for (const [name, blockDef] of blockDefinitions.entries()) {
        targetZip.file(`behavior_pack/blocks/${name}.json`, JSON.stringify(blockDef, null, 2));
    }
    // 5. Ensure critical texture definition files exist
    const terrainTextureDest = "resource_pack/textures/terrain_texture.json";
    if (!targetZip.file(terrainTextureDest)) {
        const fallbackPath = "./legacy/resources/terrain_texture.json";
        if (fs.existsSync(fallbackPath)) {
            console.log(`[Preprocessor] Injected missing ${terrainTextureDest} from ${fallbackPath}`);
            targetZip.file(terrainTextureDest, fs.readFileSync(fallbackPath));
        } else {
            console.warn(`[Preprocessor] Warning: ${fallbackPath} not found!`);
        }
    }

    const flipbookDest = "resource_pack/textures/flipbook_textures.json";
    if (!targetZip.file(flipbookDest)) {
        const fallbackPath = "./legacy/resources/flipbook_textures.json";
        if (fs.existsSync(fallbackPath)) {
            console.log(`[Preprocessor] Injected missing ${flipbookDest} from ${fallbackPath}`);
            targetZip.file(flipbookDest, fs.readFileSync(fallbackPath));
        }
    }

    // 6. Ensure manifests exist
    if (!targetZip.file("resource_pack/manifest.json")) {
        targetZip.file("resource_pack/manifest.json", JSON.stringify({
            format_version: 2,
            header: { name: "WebCraft Resource Pack", description: "Standard RP", version: [1, 0, 0] }
        }, null, 2));
    }
    if (!targetZip.file("behavior_pack/manifest.json")) {
        targetZip.file("behavior_pack/manifest.json", JSON.stringify({
            format_version: 2,
            header: { name: "WebCraft Behavior Pack", description: "Standard BP", version: [1, 0, 0] }
        }, null, 2));
    }

    // 6. Compress and save final output
    console.log(`[Preprocessor] Saving optimized pack to ${outputPath}...`);
    const outputBuffer = await targetZip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, outputBuffer);
    console.log(`[Preprocessor] Successfully created ${outputPath} (${(outputBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith("preprocess-rp.mjs")) {
    const inputZip = process.argv[2] || "./src/assets/rp.zip";
    const outputZip = process.argv[3] || "./src/assets/addon.zip";
    runPipeline(inputZip, outputZip).catch(console.error);
}
