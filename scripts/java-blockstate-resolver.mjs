/**
 * @file java-blockstate-resolver.mjs
 * Converts Java Edition blockstate JSONs (variants & multipart) into
 * Bedrock block states, placement traits, transformations, and permutations.
 */

/**
 * Normalizes Java state property names to Bedrock standard properties
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
 * Parses "key1=val1,key2=val2" into a key-value dictionary
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
 * Converts a set of properties into a MoLang query expression
 */
export function propsToMolang(props, stateNameMap = {}) {
    const clauses = [];
    for (const [k, v] of Object.entries(props)) {
        const normKey = stateNameMap[k] || normalizeStateName(k);
        const lowerVal = String(v).toLowerCase();

        if (lowerVal === "true" || lowerVal === "false") {
            clauses.push(`query.block_property('${normKey}') == ${lowerVal}`);
        } else {
            clauses.push(`query.block_property('${normKey}') == '${lowerVal}'`);
        }
    }
    return clauses.length > 0 ? clauses.join(" && ") : "1 == 1";
}

/**
 * Converts a Java `when` condition (supports single, AND, and OR) into MoLang
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
                    ? `query.block_property('${normProp}') == ${o}`
                    : `query.block_property('${normProp}') == '${o}'`;
            });
            clauses.push(`(${options.join(" || ")})`);
        } else if (valStr === "true" || valStr === "false") {
            clauses.push(`query.block_property('${normProp}') == ${valStr}`);
        } else {
            clauses.push(`query.block_property('${normProp}') == '${valStr}'`);
        }
    }

    return clauses.length > 0 ? clauses.join(" && ") : "1 == 1";
}

/**
 * Evaluates whether a when condition matches a specific property assignment
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
 * Converts Java rotation angles (x, y degrees) to Bedrock transformation component
 */
export function convertJavaApply(apply, baseGeometryIdentifier = null) {
    const rawModel = apply.model || "";
    const cleanModelName = rawModel.replace(/^minecraft:block\/|^block\//, "");
    const geomId = `geometry.${cleanModelName}`;

    const components = {};
    if (!baseGeometryIdentifier || geomId !== baseGeometryIdentifier) {
        components["minecraft:geometry"] = geomId;
    }

    const x = apply.x || 0;
    const y = apply.y || 0;

    if (x !== 0 || y !== 0) {
        components["minecraft:transformation"] = {
            rotation: [x, -y, 0],
            rotation_pivot: [8, 8, 8]
        };
    }

    return components;
}

/**
 * Infers Bedrock placement traits based on recognized properties
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
 * Converts a complete Java blockstate definition into Bedrock block components,
 * states, traits, and permutations.
 * 
 * @param {string} name - Block identifier (e.g. "oak_stairs", "furnace", "oak_fence")
 * @param {object} blockState - Raw Java blockstate JSON
 * @param {Map} resolvedModels - In-memory model asset library
 * @param {Function} convertElementsToCubes - Helper to convert & rotate elements
 * @returns {object} { states, traits, permutations, defaultComponents, multiBoneGeometry, referencedModelNames }
 */
export function convertJavaBlockState(name, blockState, resolvedModels, convertElementsToCubes) {
    const rawStates = new Map();
    const permutations = [];
    const defaultComponents = {};
    const referencedModelNames = new Set();
    let multiBoneGeometry = null;

    // -------------------------------------------------------------------------
    // Case 1: `variants`
    // -------------------------------------------------------------------------
    if (blockState.variants) {
        // 1. Gather all states & values
        for (const [vKey, vApply] of Object.entries(blockState.variants)) {
            const parsed = parseVariantKey(vKey);
            for (const [pk, pv] of Object.entries(parsed)) {
                if (!rawStates.has(pk)) rawStates.set(pk, new Set());
                rawStates.get(pk).add(pv);
            }
            const applyList = Array.isArray(vApply) ? vApply : [vApply];
            for (const a of applyList) {
                if (a.model) referencedModelNames.add(a.model.replace(/^minecraft:block\/|^block\//, ""));
            }
        }

        const stateNameMap = {};
        const states = {};
        for (const [rawK, valSet] of rawStates.entries()) {
            const normK = normalizeStateName(rawK, valSet);
            stateNameMap[rawK] = normK;
            states[normK] = Array.from(valSet).map(v => v === "true" ? true : v === "false" ? false : v);
        }

        // Determine base geometry from the first variant
        const firstVariant = Object.values(blockState.variants)[0];
        const firstApply = Array.isArray(firstVariant) ? firstVariant[0] : firstVariant;
        const baseModelName = (firstApply?.model || name).replace(/^minecraft:block\/|^block\//, "");
        const baseGeomId = `geometry.${baseModelName}`;
        defaultComponents["minecraft:geometry"] = baseGeomId;

        // 2. Build permutations
        for (const [vKey, vApply] of Object.entries(blockState.variants)) {
            const parsed = parseVariantKey(vKey);
            const condition = propsToMolang(parsed, stateNameMap);
            const applyObj = Array.isArray(vApply) ? vApply[0] : vApply;
            const components = convertJavaApply(applyObj, baseGeomId);

            // Light emission detection
            if (parsed.lit === "true" || name.includes("lit") || applyObj.model?.includes("_on")) {
                components["minecraft:light_emission"] = 13;
            }

            if (Object.keys(components).length > 0) {
                permutations.push({
                    condition,
                    components
                });
            }
        }

        const traits = inferPlacementTraits(states);
        return { states, traits, permutations, defaultComponents, multiBoneGeometry, referencedModelNames };
    }

    // -------------------------------------------------------------------------
    // Case 2: `multipart` (Fences, Walls, Panes, Gates, Shelves)
    // -------------------------------------------------------------------------
    if (blockState.multipart) {
        // 1. Gather properties and referenced models from multipart
        for (const part of blockState.multipart) {
            const applyObj = Array.isArray(part.apply) ? part.apply[0] : part.apply;
            if (applyObj?.model) {
                referencedModelNames.add(applyObj.model.replace(/^minecraft:block\/|^block\//, ""));
            }

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

        // 2. Synthesize Multi-Bone Geometry: geometry.<name>
        const bones = [];
        const baseBoneVisibility = {};
        const geomIdentifier = `geometry.${name}`;

        for (let i = 0; i < blockState.multipart.length; i++) {
            const part = blockState.multipart[i];
            const applyObj = Array.isArray(part.apply) ? part.apply[0] : part.apply;
            const modelKey = (applyObj?.model || "").replace(/^minecraft:block\/|^block\//, "");
            const modelData = resolvedModels?.get(modelKey);

            // Determine bone name
            let boneName = "center";
            if (part.when) {
                const keys = Object.keys(part.when).filter(k => k !== "OR" && k !== "AND");
                if (keys.length > 0) {
                    const k = keys[0];
                    const v = String(part.when[k]);
                    boneName = (v === "true") ? k : `${k}_${v}`;
                } else if (applyObj?.y === 90) boneName = "east";
                else if (applyObj?.y === 180) boneName = "south";
                else if (applyObj?.y === 270) boneName = "west";
                else boneName = `part_${i}`;
            }

            const rx = applyObj.x || 0;
            const ry = applyObj.y || 0;
            const cubes = convertElementsToCubes
                ? convertElementsToCubes(modelData?.elements || [], rx, ry)
                : [];

            bones.push({
                name: boneName,
                pivot: [8, 8, 8],
                cubes
            });

            // Unconditional bones are visible by default; conditional bones start hidden
            baseBoneVisibility[boneName] = !part.when;
        }

        multiBoneGeometry = {
            description: {
                identifier: geomIdentifier,
                texture_width: 16,
                texture_height: 16
            },
            bones
        };

        defaultComponents["minecraft:geometry"] = {
            identifier: geomIdentifier,
            bone_visibility: baseBoneVisibility
        };

        // 3. Build Permutations for Combinations
        const propKeys = Object.keys(states);
        if (propKeys.length > 0 && propKeys.length <= 6) {
            // Generate Cartesian product of state values
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

            // Invert stateNameMap to match against Java condition keys
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
                                ? `query.block_property('${pk}') == ${pv}`
                                : `query.block_property('${pk}') == '${pv}'`
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
        return { states, traits, permutations, defaultComponents, multiBoneGeometry, referencedModelNames };
    }

    return { states: {}, traits: null, permutations: [], defaultComponents: {}, multiBoneGeometry: null, referencedModelNames };
}
