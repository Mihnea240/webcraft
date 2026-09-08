/**
 * @file java-blockstate-resolver.mjs
 * Modular compiler converting Java Edition blockstates (variants & multipart)
 * into Bedrock block definitions, permutations, and multi-bone geometries.
 */

import { extractMaterialInstances } from "./archetypes/base.mjs";

/**
 * Normalizes Java state property names to Bedrock standard properties.
 */
export function normalizeStateName(name, allValues = new Set()) {
    if (name === "facing") {
        if (allValues.has("up") || allValues.has("down")) {
            return "minecraft:facing_direction";
        }
        return "minecraft:cardinal_direction";
    }
    if (name === "half") return "minecraft:vertical_half";
    if (name === "lit") return "minecraft:lit_bit";
    if (name === "open") return "minecraft:open_bit";
    if (name === "powered") return "webcraft:powered";
    if (name === "shape") return "webcraft:stair_shape";
    if (name === "axis") return "pillar_axis";

    return `webcraft:${name}`;
}

/**
 * Parses "key1=val1,key2=val2" into a key-value dictionary.
 */
export function parseVariantKey(key) {
    if (!key || key.trim() === "") return {};
    const pairs = key.split(",");
    const props = {};
    for (const pair of pairs) {
        const [k, v] = pair.split("=");
        if (k && v !== undefined) {
            props[k.trim()] = v.trim();
        }
    }
    return props;
}

/**
 * Converts a set of properties into a Bedrock MoLang query expression using query.block_state().
 */
export function propsToMolang(props, stateNameMap = {}) {
    const clauses = [];
    for (const [k, v] of Object.entries(props)) {
        const normKey = stateNameMap[k] || normalizeStateName(k);
        const lowerVal = String(v).toLowerCase();

        if (lowerVal === "true" || lowerVal === "false") {
            clauses.push(`query.block_state('${normKey}') == ${lowerVal}`);
        } else {
            clauses.push(`query.block_state('${normKey}') == '${lowerVal}'`);
        }
    }
    return clauses.length > 0 ? clauses.join(" && ") : "1 == 1";
}

/**
 * Converts a Java `when` condition (supports single, AND, and OR) into MoLang.
 */
export function whenToMolang(when, stateNameMap = {}) {
    if (!when || Object.keys(when).length === 0) {
        return "1 == 1";
    }

    if (Array.isArray(when.OR)) {
        const sub = when.OR.map(w => whenToMolang(w, stateNameMap));
        return `(${sub.join(" || ")})`;
    }

    if (Array.isArray(when.AND)) {
        const sub = when.AND.map(w => whenToMolang(w, stateNameMap));
        return sub.join(" && ");
    }

    const clauses = [];
    for (const [prop, val] of Object.entries(when)) {
        if (prop === "OR" || prop === "AND") continue;
        const normProp = stateNameMap[prop] || normalizeStateName(prop);
        const valStr = String(val).toLowerCase();

        if (valStr.includes("|")) {
            const options = valStr.split("|").map(opt => {
                const o = opt.trim();
                return o === "true" || o === "false"
                    ? `query.block_state('${normProp}') == ${o}`
                    : `query.block_state('${normProp}') == '${o}'`;
            });
            clauses.push(`(${options.join(" || ")})`);
        } else if (valStr === "true" || valStr === "false") {
            clauses.push(`query.block_state('${normProp}') == ${valStr}`);
        } else {
            clauses.push(`query.block_state('${normProp}') == '${valStr}'`);
        }
    }

    return clauses.length > 0 ? clauses.join(" && ") : "1 == 1";
}

/**
 * Evaluates whether a Java when condition matches a specific property assignment dictionary.
 */
export function matchesCondition(when, props) {
    if (!when) return true;
    if (Array.isArray(when.OR)) {
        return when.OR.some(sub => matchesCondition(sub, props));
    }
    if (Array.isArray(when.AND)) {
        return when.AND.every(sub => matchesCondition(sub, props));
    }
    for (const [k, v] of Object.entries(when)) {
        if (k === "OR" || k === "AND") continue;
        const expected = String(v).toLowerCase();
        const actual = String(props[k] ?? "").toLowerCase();
        if (expected.includes("|")) {
            const opts = expected.split("|").map(s => s.trim());
            if (!opts.includes(actual)) return false;
        } else if (expected !== actual) {
            return false;
        }
    }
    return true;
}

/**
 * Resolves a model application ({ model, x, y, uvlock }) into Bedrock block components:
 * - minecraft:geometry
 * - minecraft:material_instances
 * - minecraft:transformation
 */
export function resolveModelComponents(apply, resolvedModels) {
    const rawModel = apply.model || "";
    const cleanModelName = rawModel.replace(/^minecraft:block\/|^block\//, "");
    const modelData = resolvedModels?.get(cleanModelName);

    const components = {};

    // 1. Geometry
    const geomId = modelData?.geometryId || (modelData?.baseShape ? `geometry.${modelData.baseShape}` : `geometry.${cleanModelName}`);
    if (geomId) {
        components["minecraft:geometry"] = geomId;
    }

    // 2. Material Instances (Textures)
    if (modelData) {
        const matInstances = extractMaterialInstances(modelData, cleanModelName);
        if (Object.keys(matInstances).length > 0) {
            components["minecraft:material_instances"] = matInstances;
        }
    }

    // 3. Transformation (Pure rotation)
    const x = apply.x || 0;
    const y = apply.y || 0;
    if (x !== 0 || y !== 0) {
        components["minecraft:transformation"] = {
            rotation: [x, -y, 0]
        };
    }

    return components;
}

/**
 * Infers Bedrock placement traits based on recognized properties.
 */
export function inferPlacementTraits(states) {
    const traits = {};

    if (states["minecraft:cardinal_direction"]) {
        traits["minecraft:placement_direction"] = {
            enabled_states: ["minecraft:cardinal_direction"],
            y_rotation_offset: 180.0
        };
    } else if (states["minecraft:facing_direction"]) {
        traits["minecraft:placement_direction"] = {
            enabled_states: ["minecraft:facing_direction"]
        };
    }

    if (states["minecraft:vertical_half"]) {
        traits["minecraft:placement_position"] = {
            enabled_states: ["minecraft:vertical_half"]
        };
    }

    return Object.keys(traits).length > 0 ? traits : null;
}

/**
 * Compiles a Java blockstate with `variants` into Bedrock states, components, and permutations.
 * Each variant entry directly maps 1-to-1 to a Bedrock permutation entry.
 */
export function compileVariantsBlock(name, blockState, resolvedModels) {
    const rawStates = new Map();
    const variantEntries = Object.entries(blockState.variants);

    // 1. Gather all states & values
    for (const [vKey] of variantEntries) {
        const parsed = parseVariantKey(vKey);
        for (const [pk, pv] of Object.entries(parsed)) {
            if (!rawStates.has(pk)) rawStates.set(pk, new Set());
            rawStates.get(pk).add(pv);
        }
    }

    const stateNameMap = {};
    const states = {};
    for (const [rawK, valSet] of rawStates.entries()) {
        const normK = normalizeStateName(rawK, valSet);
        stateNameMap[rawK] = normK;
        states[normK] = Array.from(valSet).map(v => v === "true" ? true : v === "false" ? false : v);
    }

    // 2. Default components initialized from the first variant entry
    const [firstKey, firstApplyRaw] = variantEntries[0] || ["", {}];
    const firstApply = Array.isArray(firstApplyRaw) ? firstApplyRaw[0] : firstApplyRaw;
    const defaultComponents = resolveModelComponents(firstApply, resolvedModels);

    // 3. Build permutations for each variant
    const permutations = [];
    for (const [vKey, vApply] of variantEntries) {
        const parsed = parseVariantKey(vKey);
        const applyObj = Array.isArray(vApply) ? vApply[0] : vApply;
        const components = resolveModelComponents(applyObj, resolvedModels);

        // Light emission detection
        if (parsed.lit === "true" || parsed.lit === true || name.includes("lit") || applyObj.model?.includes("_on")) {
            components["minecraft:light_emission"] = 13;
        }

        if (!vKey || vKey.trim() === "") {
            // Unconditional variant sets default components
            Object.assign(defaultComponents, components);
        } else {
            const condition = propsToMolang(parsed, stateNameMap);
            permutations.push({
                condition,
                components
            });
        }
    }

    const traits = inferPlacementTraits(states);
    return { states, traits, permutations, defaultComponents, multiBoneGeometry: null };
}

/**
 * Compiles a Java blockstate with `multipart` into a single Bedrock multi-bone geometry
 * where each part forms a bone whose visibility is controlled by Molang and permutations.
 */
export function compileMultipartBlock(name, blockState, resolvedModels, convertElementsToCubes) {
    const rawStates = new Map();
    const bones = [];
    const baseBoneVisibility = {};
    const molangBoneVisibility = {};
    const aggregatedMaterialInstances = {};
    const usedBoneNames = new Set();

    // 1. Gather all state properties from when clauses
    for (const part of blockState.multipart) {
        if (!part.when) continue;
        const conds = Array.isArray(part.when.OR)
            ? part.when.OR
            : Array.isArray(part.when.AND)
            ? part.when.AND
            : [part.when];

        for (const c of conds) {
            for (const [pk, pv] of Object.entries(c)) {
                if (pk === "OR" || pk === "AND") continue;
                if (!rawStates.has(pk)) rawStates.set(pk, new Set());
                const vStr = String(pv);
                if (vStr.includes("|")) {
                    for (const opt of vStr.split("|")) rawStates.get(pk).add(opt.trim());
                } else {
                    rawStates.get(pk).add(vStr);
                }
            }
        }
    }

    const stateNameMap = {};
    const states = {};
    for (const [rawK, valSet] of rawStates.entries()) {
        const normK = normalizeStateName(rawK, valSet);
        stateNameMap[rawK] = normK;
        const arr = Array.from(valSet).map(v => v === "true" ? true : v === "false" ? false : v);
        if (arr.some(v => v === true || v === false)) {
            states[normK] = [false, true];
        } else {
            states[normK] = arr;
        }
    }

    // 2. Synthesize multi-bone geometry and collect textures across parts
    for (let i = 0; i < blockState.multipart.length; i++) {
        const part = blockState.multipart[i];
        const applyObj = Array.isArray(part.apply) ? part.apply[0] : part.apply;
        const modelKey = (applyObj?.model || "").replace(/^minecraft:block\/|^block\//, "");
        const modelData = resolvedModels?.get(modelKey);

        if (modelData) {
            const partMats = extractMaterialInstances(modelData, modelKey);
            Object.assign(aggregatedMaterialInstances, partMats);
        }

        // Determine descriptive bone name
        let baseBoneName = "post";
        if (part.when) {
            const keys = Object.keys(part.when).filter(k => k !== "OR" && k !== "AND");
            if (keys.length > 0) {
                const k = keys[0];
                const v = String(part.when[k]);
                baseBoneName = (v === "true" || v === "1") ? k : `${k}_${v}`;
            } else if (applyObj?.y === 90) baseBoneName = "east";
            else if (applyObj?.y === 180) baseBoneName = "south";
            else if (applyObj?.y === 270) baseBoneName = "west";
            else baseBoneName = `part_${i}`;
        } else if (applyObj?.model?.includes("post") || applyObj?.model?.includes("center")) {
            baseBoneName = "post";
        } else {
            baseBoneName = `base_${i}`;
        }

        let boneName = baseBoneName;
        let counter = 1;
        while (usedBoneNames.has(boneName)) {
            boneName = `${baseBoneName}_${counter++}`;
        }
        usedBoneNames.add(boneName);

        const rx = applyObj?.x || 0;
        const ry = applyObj?.y || 0;
        const cubes = convertElementsToCubes
            ? convertElementsToCubes(modelData?.elements || [], rx, ry)
            : [];

        bones.push({
            name: boneName,
            pivot: [8, 8, 8],
            cubes
        });

        const isUnconditional = !part.when || Object.keys(part.when).length === 0;
        baseBoneVisibility[boneName] = isUnconditional;
        molangBoneVisibility[boneName] = isUnconditional ? true : whenToMolang(part.when, stateNameMap);
    }

    const geomIdentifier = `geometry.${name}`;
    const multiBoneGeometry = {
        description: {
            identifier: geomIdentifier,
            texture_width: 16,
            texture_height: 16
        },
        bones
    };

    const defaultComponents = {
        "minecraft:geometry": {
            identifier: geomIdentifier,
            bone_visibility: molangBoneVisibility
        },
        "minecraft:material_instances": aggregatedMaterialInstances
    };

    // 3. Build permutations for state combinations (for direct pre-baking)
    const permutations = [];
    const propKeys = Object.keys(states);
    if (propKeys.length > 0 && propKeys.length <= 6) {
        let combos = [{}];
        for (const pKey of propKeys) {
            const vals = states[pKey];
            const next = [];
            for (const c of combos) {
                for (const v of vals) {
                    next.push({ ...c, [pKey]: v });
                }
            }
            combos = next;
        }

        const normToRaw = {};
        for (const [rk, nk] of Object.entries(stateNameMap)) {
            normToRaw[nk] = rk;
        }

        for (const combo of combos) {
            const rawCombo = {};
            for (const [nk, nv] of Object.entries(combo)) {
                const rk = normToRaw[nk] || nk.replace(/^webcraft:|^minecraft:/, "");
                rawCombo[rk] = nv;
            }

            const visibility = { ...baseBoneVisibility };
            let anyActive = false;

            for (let i = 0; i < blockState.multipart.length; i++) {
                const part = blockState.multipart[i];
                const bone = bones[i];
                if (!bone) continue;

                if (!part.when) {
                    visibility[bone.name] = true;
                } else if (matchesCondition(part.when, rawCombo)) {
                    visibility[bone.name] = true;
                    anyActive = true;
                } else {
                    visibility[bone.name] = false;
                }
            }

            if (anyActive) {
                const condClauses = [];
                for (const [pk, pv] of Object.entries(combo)) {
                    condClauses.push(
                        typeof pv === "boolean"
                            ? `query.block_state('${pk}') == ${pv}`
                            : `query.block_state('${pk}') == '${pv}'`
                    );
                }

                permutations.push({
                    condition: condClauses.join(" && "),
                    components: {
                        "minecraft:geometry": {
                            identifier: geomIdentifier,
                            bone_visibility: visibility
                        }
                    }
                });
            }
        }
    }

    const traits = inferPlacementTraits(states);
    return { states, traits, permutations, defaultComponents, multiBoneGeometry };
}

/**
 * Converts a complete Java blockstate definition into Bedrock block components,
 * states, traits, and permutations.
 */
export function convertJavaBlockState(name, blockState, resolvedModels, convertElementsToCubes) {
    if (blockState.variants) {
        return compileVariantsBlock(name, blockState, resolvedModels);
    } else if (blockState.multipart) {
        return compileMultipartBlock(name, blockState, resolvedModels, convertElementsToCubes);
    }
    return { states: {}, traits: null, permutations: [], defaultComponents: {}, multiBoneGeometry: null };
}
