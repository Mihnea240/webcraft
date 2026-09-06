/**
 * @file java-model-resolver.mjs
 * Standalone Java Block Model Inheritance Resolver and Bedrock Converter.
 * 
 * Separates Java model inheritance traversal, texture slot resolution,
 * and Bedrock 3D geometry / block definition compilation from the main pipeline.
 */

import { applyArchetypes, mergeBlockDefinition } from "./archetypes/index.mjs";
import { convertJavaBlockState } from "./java-blockstate-resolver.mjs";

/**
 * Recursive dereference of texture variables (e.g. #down -> #all -> "block/dirt")
 */
export function dereferenceTextureVar(val, vars, visited = new Set()) {
    if (typeof val !== "string" || !val.startsWith("#")) return val;
    const key = val.slice(1);
    if (visited.has(key)) return val;
    visited.add(key);
    if (vars[key]) {
        return dereferenceTextureVar(vars[key], vars, visited);
    }
    return val;
}

/**
 * Resolves the parent inheritance chain for a Java block model.
 * Merges textures from ancestor to descendant, locates element definitions,
 * and dereferences variable texture bindings.
 * 
 * @param {string} name - Model name (e.g. "dirt", "oak_stairs")
 * @param {object} model - The raw Java model JSON
 * @param {object} allModels - Map of all Java models
 * @returns {object} { baseShape, elements, textures }
 */
export function resolveModelInheritance(name, model, allModels) {
    let current = model;
    const inheritanceChain = [current];
    const visited = new Set([name]);

    while (current.parent) {
        const parentName = current.parent.replace(/^minecraft:block\/|^block\//, "");
        if (visited.has(parentName)) break;
        visited.add(parentName);

        const parentModel = allModels[parentName];
        if (!parentModel) break;
        inheritanceChain.push(parentModel);
        current = parentModel;
    }

    // Merge textures from top-parent to child so child overrides
    const rawTextures = {};
    for (let i = inheritanceChain.length - 1; i >= 0; i--) {
        if (inheritanceChain[i].textures) {
            Object.assign(rawTextures, inheritanceChain[i].textures);
        }
    }

    // Find the base model that declared `elements`
    let elements = null;
    let baseShape = null;
    for (const m of inheritanceChain) {
        if (m.elements) {
            elements = m.elements;
            for (const [k, v] of Object.entries(allModels)) {
                if (v === m) {
                    baseShape = k;
                    break;
                }
            }
            break;
        }
    }

    if (!baseShape) {
        baseShape = elements ? name : "cube";
    }

    // Fully dereference texture variables
    const resolvedTextures = {};
    for (const [k, v] of Object.entries(rawTextures)) {
        resolvedTextures[k] = dereferenceTextureVar(v, rawTextures);
    }

    return {
        baseShape,
        elements,
        textures: resolvedTextures
    };
}

/**
 * Rotates a point around a pivot by Euler rx and ry (degrees)
 */
export function rotatePoint(p, pivot, rx = 0, ry = 0) {
    let x = p[0] - pivot[0];
    let y = p[1] - pivot[1];
    let z = p[2] - pivot[2];

    if (rx !== 0) {
        const radX = (rx * Math.PI) / 180;
        const cosX = Math.round(Math.cos(radX));
        const sinX = Math.round(Math.sin(radX));
        const ny = y * cosX - z * sinX;
        const nz = y * sinX + z * cosX;
        y = ny;
        z = nz;
    }

    if (ry !== 0) {
        // Java Y rotation is clockwise looking down (+Y)
        const radY = (-ry * Math.PI) / 180;
        const cosY = Math.round(Math.cos(radY));
        const sinY = Math.round(Math.sin(radY));
        const nx = x * cosY + z * sinY;
        const nz = -x * sinY + z * cosY;
        x = nx;
        z = nz;
    }

    return [Math.round(x + pivot[0]), Math.round(y + pivot[1]), Math.round(z + pivot[2])];
}

/**
 * Rotates cardinal face names according to rx and ry rotation
 */
export function rotateFaceName(face, rx = 0, ry = 0) {
    let f = face;
    if (ry === 90) {
        const map = { north: "east", east: "south", south: "west", west: "north", up: "up", down: "down" };
        f = map[f] || f;
    } else if (ry === 180) {
        const map = { north: "south", south: "north", east: "west", west: "east", up: "up", down: "down" };
        f = map[f] || f;
    } else if (ry === 270) {
        const map = { north: "west", west: "south", south: "east", east: "north", up: "up", down: "down" };
        f = map[f] || f;
    }

    if (rx === 180) {
        const map = { up: "down", down: "up", north: "south", south: "north", east: "east", west: "west" };
        f = map[f] || f;
    }
    return f;
}

/**
 * Converts Java model elements to Bedrock cubes with optional rx, ry rotation
 */
export function convertJavaElementsToCubes(elements, rx = 0, ry = 0, pivot = [8, 8, 8]) {
    if (!elements || !Array.isArray(elements)) return [];

    return elements.map(el => {
        const from = el.from || [0, 0, 0];
        const to = el.to || [16, 16, 16];

        const corners = [
            [from[0], from[1], from[2]], [to[0], from[1], from[2]],
            [from[0], to[1], from[2]],   [to[0], to[1], from[2]],
            [from[0], from[1], to[2]],   [to[0], from[1], to[2]],
            [from[0], to[1], to[2]],     [to[0], to[1], to[2]],
        ];

        const rotated = (rx !== 0 || ry !== 0)
            ? corners.map(c => rotatePoint(c, pivot, rx, ry))
            : corners;

        const xs = rotated.map(c => c[0]);
        const ys = rotated.map(c => c[1]);
        const zs = rotated.map(c => c[2]);

        const min = [Math.min(...xs), Math.min(...ys), Math.min(...zs)];
        const max = [Math.max(...xs), Math.max(...ys), Math.max(...zs)];

        const faces = {};
        if (el.faces) {
            for (const [faceName, faceData] of Object.entries(el.faces)) {
                const targetFace = rotateFaceName(faceName, rx, ry);
                const uv = faceData.uv || [0, 0, 16, 16];
                const slot = (faceData.texture || "").replace(/^#/, "") || faceName || "*";
                faces[targetFace] = {
                    uv: [uv[0], uv[1]],
                    uv_size: [uv[2] - uv[0], uv[3] - uv[1]],
                    material_instance: slot
                };
            }
        }

        return {
            origin: min,
            size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
            uv: faces
        };
    });
}

/**
 * Resolves all models into an in-memory Model Asset Library
 */
export function resolveAllJavaModels(allModels) {
    const resolvedModels = new Map();
    for (const [name, rawModel] of Object.entries(allModels)) {
        resolvedModels.set(name, resolveModelInheritance(name, rawModel, allModels));
    }
    return resolvedModels;
}

/**
 * Compiles Java models and blockstates into Bedrock geometries and block definitions
 * 
 * @param {object} allModels - Map of model name -> Java model JSON
 * @param {object} allBlockStates - Map of block name -> Java blockstate JSON
 * @returns {{ bedrockGeometries: Array, blockDefinitions: Map<string, object> }}
 */
export function compileJavaModelsToBedrock(allModels, allBlockStates = {}) {
    const bedrockGeometries = [];
    const blockDefinitions = new Map();
    const registeredGeometries = new Set();

    // 1. Resolve all models into in-memory Model Asset Library
    const resolvedModels = resolveAllJavaModels(allModels);

    // 2. Canonical unit full block cube definition (Model 0 / Cube 0 default)
    const fullBlockGeom = {
        description: {
            identifier: "geometry.full_block",
            texture_width: 16,
            texture_height: 16
        },
        bones: [{
            name: "body",
            pivot: [8, 8, 8],
            cubes: [{
                origin: [0, 0, 0],
                size: [16, 16, 16],
                uv: {
                    north: { uv: [0, 0], uv_size: [16, 16], material_instance: "north" },
                    east:  { uv: [0, 0], uv_size: [16, 16], material_instance: "east" },
                    south: { uv: [0, 0], uv_size: [16, 16], material_instance: "south" },
                    west:  { uv: [0, 0], uv_size: [16, 16], material_instance: "west" },
                    up:    { uv: [0, 0], uv_size: [16, 16], material_instance: "up" },
                    down:  { uv: [0, 0], uv_size: [16, 16], material_instance: "down" }
                }
            }]
        }]
    };
    bedrockGeometries.push(fullBlockGeom);
    registeredGeometries.add("geometry.full_block");
    registeredGeometries.add("geometry.cube");
    registeredGeometries.add("geometry.cube_all");

    // Helper to ensure a unique 3D shape is registered in bedrockGeometries
    function ensureGeometryRegistered(shapeName) {
        const geomId = `geometry.${shapeName}`;
        if (registeredGeometries.has(geomId)) return geomId;

        const resolved = resolvedModels.get(shapeName);
        if (!resolved || !resolved.elements) return "geometry.full_block";

        registeredGeometries.add(geomId);
        const cubes = convertJavaElementsToCubes(resolved.elements, 0, 0);
        bedrockGeometries.push({
            description: {
                identifier: geomId,
                texture_width: 16,
                texture_height: 16
            },
            bones: [{
                name: "body",
                pivot: [8, 8, 8],
                cubes
            }]
        });
        return geomId;
    }

    // 3. Compile Blocks from BlockStates (Authoritative Block Registry)
    for (const [name, blockState] of Object.entries(allBlockStates)) {
        const stateData = convertJavaBlockState(name, blockState, resolvedModels, convertJavaElementsToCubes);

        // Collect all textures from referenced models
        const materialInstances = {};
        let primaryTexture = null;

        // If the block has a direct model with its name, check it first
        const directModel = resolvedModels.get(name);
        const modelsToCheck = new Set(stateData.referencedModelNames);
        if (directModel) modelsToCheck.add(name);

        for (const mName of modelsToCheck) {
            const mData = resolvedModels.get(mName);
            if (!mData || !mData.textures) continue;

            for (const [slot, tex] of Object.entries(mData.textures)) {
                if (typeof tex === "string" && !tex.startsWith("#")) {
                    const cleanTex = tex.replace(/^minecraft:block\/|^block\//, "");
                    materialInstances[slot] = { texture: cleanTex };
                    if (!primaryTexture && (slot === "all" || slot === "side" || slot === "texture" || slot === "end")) {
                        primaryTexture = cleanTex;
                    }
                }
            }
        }

        if (!primaryTexture) {
            primaryTexture = Object.values(materialInstances)[0]?.texture || name;
        }

        materialInstances["*"] = { texture: primaryTexture };
        materialInstances["all"] = { texture: primaryTexture };

        // Determine geometry
        let geomComponent = stateData.defaultComponents["minecraft:geometry"];

        if (stateData.multiBoneGeometry) {
            // Register the synthesized multi-bone geometry
            bedrockGeometries.push(stateData.multiBoneGeometry);
            registeredGeometries.add(stateData.multiBoneGeometry.description.identifier);
            geomComponent = stateData.defaultComponents["minecraft:geometry"];
        } else if (typeof geomComponent === "string") {
            const shape = geomComponent.replace(/^geometry\./, "");
            ensureGeometryRegistered(shape);
        } else {
            const shape = directModel?.baseShape || "cube";
            geomComponent = (shape === "cube" || shape === "cube_all")
                ? "geometry.full_block"
                : ensureGeometryRegistered(shape);
        }

        // Build Block Definition
        const blockDef = {
            format_version: "1.20.80",
            "minecraft:block": {
                description: {
                    identifier: `minecraft:${name}`
                },
                components: {
                    "minecraft:geometry": geomComponent,
                    "minecraft:material_instances": materialInstances
                }
            }
        };

        if (stateData.states && Object.keys(stateData.states).length > 0) {
            blockDef["minecraft:block"].description.states = stateData.states;
        }
        if (stateData.traits) {
            blockDef["minecraft:block"].components["minecraft:traits"] = stateData.traits;
        }
        if (stateData.permutations && stateData.permutations.length > 0) {
            mergeBlockDefinition(blockDef["minecraft:block"], {
                permutations: stateData.permutations
            });
        }

        // Apply Archetypes (collision box, traits, etc.)
        applyArchetypes({
            name,
            baseShape: directModel?.baseShape || name,
            resolved: directModel,
            blockDef
        });

        blockDefinitions.set(name, blockDef);
    }

    // 4. Standalone Models Fallback (Models not in blockstates, excluding templates)
    for (const [name, resolved] of resolvedModels.entries()) {
        if (blockDefinitions.has(name)) continue;

        // Skip internal templates and part models
        if (name.startsWith("template_") || name.startsWith("tinted_") || name.endsWith("_inventory")) {
            continue;
        }

        const isCube = resolved.baseShape === "cube_all" || resolved.baseShape === "cube" || !resolved.elements;
        const geomIdentifier = isCube
            ? "geometry.full_block"
            : ensureGeometryRegistered(resolved.baseShape);

        const materialInstances = {};
        let primaryTexture = null;

        for (const [slot, tex] of Object.entries(resolved.textures)) {
            if (typeof tex === "string" && !tex.startsWith("#")) {
                const cleanTex = tex.replace(/^minecraft:block\/|^block\//, "");
                materialInstances[slot] = { texture: cleanTex };
                if (!primaryTexture && (slot === "all" || slot === "side" || slot === "texture")) {
                    primaryTexture = cleanTex;
                }
            }
        }

        if (!primaryTexture) {
            primaryTexture = Object.values(materialInstances)[0]?.texture || name;
        }

        materialInstances["*"] = { texture: primaryTexture };
        materialInstances["all"] = { texture: primaryTexture };

        const blockDef = {
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
        };

        applyArchetypes({
            name,
            baseShape: resolved.baseShape,
            resolved,
            blockDef
        });

        blockDefinitions.set(name, blockDef);
    }

    return { bedrockGeometries, blockDefinitions };
}
