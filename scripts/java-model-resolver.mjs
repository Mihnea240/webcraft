/**
 * @file java-model-resolver.mjs
 * Standalone Java Block Model Inheritance Resolver and Bedrock Converter.
 */

import { applyArchetypes } from "./archetypes/index.mjs";
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
 * Compiles Bedrock geometry models on-the-fly during traversal when elements are encountered.
 */
export function resolveModelInheritance(name, model, allModels, geometryRegistry = null) {
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

    // Find the base model that declared elements
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

    // If no ancestor declared elements (e.g. root "block"), default to full block cube
    if (!baseShape) {
        baseShape = elements ? name : "cube";
    }

    // Determine canonical geometryId and register on the fly
    let geometryId;
    if (baseShape === "cube" || baseShape === "cube_all" || !elements) {
        geometryId = "geometry.full_block";
    } else {
        geometryId = `geometry.${baseShape}`;
        if (geometryRegistry && !geometryRegistry.has(geometryId)) {
            const cubes = convertJavaElementsToCubes(elements, 0, 0);
            geometryRegistry.register(geometryId, cubes);
        }
    }

    // Fully dereference texture variables
    const resolvedTextures = {};
    for (const [k, v] of Object.entries(rawTextures)) {
        resolvedTextures[k] = dereferenceTextureVar(v, rawTextures);
    }

    return {
        baseShape,
        geometryId,
        elements,
        textures: resolvedTextures
    };
}

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

export function resolveAllJavaModels(allModels, geometryRegistry = null) {
    const resolvedModels = new Map();
    for (const [name, rawModel] of Object.entries(allModels)) {
        resolvedModels.set(name, resolveModelInheritance(name, rawModel, allModels, geometryRegistry));
    }
    return resolvedModels;
}

export function compileJavaModelsToBedrock(allModels, allBlockStates = {}) {
    const bedrockGeometries = [];
    const blockDefinitions = new Map();
    const registeredGeometries = new Set();

    const geometryRegistry = {
        has: (id) => registeredGeometries.has(id),
        register: (id, cubes) => {
            if (registeredGeometries.has(id)) return id;
            registeredGeometries.add(id);
            bedrockGeometries.push({
                description: {
                    identifier: id,
                    texture_width: 16,
                    texture_height: 16
                },
                bones: [{
                    name: "body",
                    pivot: [8, 8, 8],
                    cubes
                }]
            });
            return id;
        }
    };

    // Canonical unit full block cube definition
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

    // 1. Resolve all models while compiling base geometries on the fly
    const resolvedModels = resolveAllJavaModels(allModels, geometryRegistry);

    // 2. Compile Blocks from BlockStates (Authoritative Block Registry)
    for (const [name, blockState] of Object.entries(allBlockStates)) {
        // Compile states, traits, default components, permutations, and optional multi-bone geometry
        const stateData = convertJavaBlockState(name, blockState, resolvedModels, convertJavaElementsToCubes);

        if (stateData.multiBoneGeometry) {
            const multiGeomId = stateData.multiBoneGeometry.description.identifier;
            if (!registeredGeometries.has(multiGeomId)) {
                bedrockGeometries.push(stateData.multiBoneGeometry);
                registeredGeometries.add(multiGeomId);
            }
        }

        const blockDef = {
            format_version: "1.20.80",
            "minecraft:block": {
                description: {
                    identifier: `minecraft:${name}`,
                    ...(stateData.states && Object.keys(stateData.states).length > 0 ? { states: stateData.states } : {})
                },
                components: {
                    ...(stateData.defaultComponents || {})
                },
                ...(stateData.permutations && stateData.permutations.length > 0 ? { permutations: stateData.permutations } : {})
            }
        };

        if (stateData.traits) {
            blockDef["minecraft:block"].components["minecraft:traits"] = stateData.traits;
        }

        const directModel = resolvedModels.get(name);
        const baseShape = directModel?.baseShape
            || (typeof stateData.defaultComponents?.["minecraft:geometry"] === "string"
                ? stateData.defaultComponents["minecraft:geometry"].replace(/^geometry\./, "")
                : name);

        // Apply archetype enhancements (collision box, custom traits, light emission modifiers)
        applyArchetypes({
            name,
            baseShape,
            resolved: directModel,
            blockDef
        });

        blockDefinitions.set(name, blockDef);
    }

    return { bedrockGeometries, blockDefinitions };
}
