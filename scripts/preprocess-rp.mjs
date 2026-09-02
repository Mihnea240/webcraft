import fs from "fs";
import path from "path";
import JSZip from "jszip";

const JAVA_MODELS_URL = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/26.2/assets/minecraft/models/block/_all.json";

// Pipeline Actions
export const ACTIONS = {
    KEEP: "keep",
    DELETE: "delete",
    TRANSFORM: "transform" 
};

// Define Processor Rules for asset filtering
export const rules = [
    {
        // Keep textures, models, and biomes in resource pack
        pattern: /^(?:resource_pack\/)?(?:textures\/|models\/|biomes\/)/,
        action: ACTIONS.KEEP
    },
    {
        // Keep behavior pack blocks
        pattern: /^(?:behavior_pack\/)?(?:blocks\/)/,
        action: ACTIONS.KEEP
    },
    {
        // Keep manifest and blocks.json
        pattern: /^(?:resource_pack\/|behavior_pack\/)?(?:manifest\.json|blocks\.json)$/,
        action: ACTIONS.KEEP
    },
    {
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
 * Converts Java Edition block models into:
 * 1. resource_pack/models/blocks/vanilla_geometries.geo.json (Bedrock 3D geometry definitions)
 * 2. behavior_pack/blocks/<name>.json (Individual Bedrock block definition files)
 */
function processJavaModels(allModels) {
    const bedrockGeometries = [];
    const blockDefinitions = new Map();

    function resolveModel(name, model) {
        let current = model;
        const textureVars = { ...(current.textures || {}) };
        const visited = new Set([name]);

        while (current.parent) {
            const parentName = current.parent.replace(/^minecraft:block\/|^block\//, "");
            if (visited.has(parentName)) break;
            visited.add(parentName);

            const parentModel = allModels[parentName];
            if (!parentModel) break;

            if (parentModel.textures) {
                for (const [k, v] of Object.entries(parentModel.textures)) {
                    if (!textureVars[k]) textureVars[k] = v;
                }
            }

            if (parentModel.elements && !model.elements) {
                model._inheritedElements = parentModel.elements;
                model._baseShape = parentName;
            }

            current = parentModel;
        }

        return {
            baseShape: model._baseShape || (model.elements ? name : "cube_all"),
            elements: model.elements || model._inheritedElements || null,
            textures: textureVars
        };
    }

    const uniqueShapes = new Map();

    for (const [name, rawModel] of Object.entries(allModels)) {
        const resolved = resolveModel(name, rawModel);

        // 1. Record unique 3D geometries
        if (resolved.elements && !uniqueShapes.has(resolved.baseShape)) {
            uniqueShapes.set(resolved.baseShape, resolved.elements);

            const cubes = resolved.elements.map(el => {
                const from = el.from || [0, 0, 0];
                const to = el.to || [16, 16, 16];
                
                const faces = {};
                if (el.faces) {
                    for (const [faceName, faceData] of Object.entries(el.faces)) {
                        const uv = faceData.uv || [0, 0, 16, 16];
                        faces[faceName] = {
                            uv: [uv[0], uv[1]],
                            uv_size: [uv[2] - uv[0], uv[3] - uv[1]],
                            material_instance: (faceData.texture || "").replace(/^#/, "") || "*"
                        };
                    }
                }

                return {
                    origin: [from[0] - 8, from[1], from[2] - 8],
                    size: [to[0] - from[0], to[1] - from[1], to[2] - from[2]],
                    uv: faces
                };
            });

            bedrockGeometries.push({
                description: {
                    identifier: `geometry.${resolved.baseShape}`,
                    texture_width: 16,
                    texture_height: 16
                },
                bones: [{
                    name: "body",
                    pivot: [0, 0, 0],
                    cubes
                }]
            });
        }

        // 2. Generate Individual Bedrock Block Definition
        const isCube = resolved.baseShape === "cube_all" || resolved.baseShape === "cube" || !resolved.elements;
        const geomIdentifier = isCube ? "minecraft:geometry.full_block" : `geometry.${resolved.baseShape}`;

        const materialInstances = {};
        for (const [slot, tex] of Object.entries(resolved.textures)) {
            if (typeof tex === "string") {
                const cleanTex = tex.replace(/^minecraft:block\/|^block\//, "");
                materialInstances[slot] = { texture: cleanTex };
            }
        }
        if (Object.keys(materialInstances).length === 0) {
            materialInstances["*"] = { texture: name };
        }

        blockDefinitions.set(name, {
            format_version: "1.20.80",
            "minecraft:block": {
                description: {
                    identifier: `minecraft:${name}`
                },
                components: {
                    "minecraft:geometry": geomIdentifier,
                    "minecraft:material_instances": materialInstances
                }
            }
        });
    }

    return { bedrockGeometries, blockDefinitions };
}

/**
 * Main Processing Pipeline
 */
export async function runPipeline(inputPath = "./src/assets/rp.zip", outputPath = "./src/assets/addon.zip") {
    console.log(`[Preprocessor] Running pipeline...`);
    const targetZip = new JSZip();

    // 1. Download & Process Java models to generate vanilla shapes and individual block definitions
    const allModels = await fetchJavaModels();
    const { bedrockGeometries, blockDefinitions } = processJavaModels(allModels);

    // Write unique geometries file
    targetZip.file(
        "resource_pack/models/blocks/vanilla_geometries.geo.json",
        JSON.stringify({ format_version: "1.12.0", "minecraft:geometry": bedrockGeometries }, null, 2)
    );

    // Write individual block definition files in behavior_pack/blocks/<name>.json
    for (const [name, blockDef] of blockDefinitions.entries()) {
        targetZip.file(`behavior_pack/blocks/${name}.json`, JSON.stringify(blockDef, null, 2));
    }
    console.log(`[Preprocessor] Generated ${bedrockGeometries.length} unique geometries and ${blockDefinitions.size} individual block definitions.`);

    // 2. Filter and copy assets from source pack using the rule pipeline
    if (fs.existsSync(inputPath)) {
        console.log(`[Preprocessor] Filtering source pack from ${inputPath}...`);
        const inputBuffer = fs.readFileSync(inputPath);
        const sourceZip = await JSZip.loadAsync(inputBuffer);

        for (const [relativePath, fileEntry] of Object.entries(sourceZip.files)) {
            if (fileEntry.dir) continue;

            const rule = rules.find(r => r.pattern.test(relativePath));
            if (!rule || rule.action === ACTIONS.DELETE) continue;

            const fileData = await fileEntry.async("nodebuffer");

            // Normalize path to resource_pack/ or behavior_pack/
            let destPath = relativePath;
            if (!destPath.startsWith("resource_pack/") && !destPath.startsWith("behavior_pack/")) {
                if (destPath.startsWith("blocks/")) {
                    destPath = `behavior_pack/${destPath}`;
                } else {
                    destPath = `resource_pack/${destPath}`;
                }
            }

            if (rule.action === ACTIONS.KEEP) {
                targetZip.file(destPath, fileData);
            }
        }
    }

    // 3. Ensure manifests exist
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

    // 4. Compress and save final output
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
