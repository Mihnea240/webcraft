/**
 * @file index.mjs
 * Archetype Manager and Modular Component Merging Pipeline.
 */

import { extractMaterialInstances } from "./base.mjs";
import * as block from "./block.mjs";
import * as buttonLever from "./button_lever.mjs";
import * as carpet from "./carpet.mjs";
import * as door from "./door.mjs";
import * as fence from "./fence.mjs";
import * as foliage from "./foliage.mjs";
import * as lightEmission from "./light_emission.mjs";
import * as nonSolid from "./non_solid.mjs";
import * as slab from "./slab.mjs";
import * as stairs from "./stairs.mjs";
import * as trapdoor from "./trapdoor.mjs";

export { extractMaterialInstances };

export const archetypes = [
    stairs,
    slab,
    fence,
    door,
    trapdoor,
    carpet,
    buttonLever,
    foliage,
    block
];

export const modifiers = [
    nonSolid,
    lightEmission
];

/**
 * Merges a generated archetype component JSON into a target Bedrock block definition.
 */
export function mergeBlockDefinition(targetBlock, patch) {
    if (!patch) return targetBlock;

    // 1. Merge description / states
    if (patch.description) {
        targetBlock.description = targetBlock.description || {};
        if (patch.description.identifier && !targetBlock.description.identifier) {
            targetBlock.description.identifier = patch.description.identifier;
        }
        if (patch.description.states) {
            targetBlock.description.states = {
                ...(targetBlock.description.states || {}),
                ...patch.description.states
            };
        }
    } else if (patch.states) {
        targetBlock.description = targetBlock.description || {};
        targetBlock.description.states = {
            ...(targetBlock.description.states || {}),
            ...patch.states
        };
    }

    // 2. Merge components
    if (patch.components) {
        targetBlock.components = targetBlock.components || {};
        for (const [compName, compVal] of Object.entries(patch.components)) {
            if (compName === "minecraft:material_instances" && targetBlock.components[compName]) {
                targetBlock.components[compName] = {
                    ...targetBlock.components[compName],
                    ...compVal
                };
            } else {
                targetBlock.components[compName] = compVal;
            }
        }
    }

    // 3. Merge permutations
    if (patch.permutations && Array.isArray(patch.permutations)) {
        targetBlock.permutations = targetBlock.permutations || [];

        for (const patchPerm of patch.permutations) {
            if (!patchPerm.condition) continue;

            const existingPerm = targetBlock.permutations.find(p => p.condition === patchPerm.condition);
            if (existingPerm) {
                existingPerm.components = {
                    ...(existingPerm.components || {}),
                    ...(patchPerm.components || {})
                };
            } else {
                targetBlock.permutations.push(JSON.parse(JSON.stringify(patchPerm)));
            }
        }
    }

    return targetBlock;
}

/**
 * Creates or enhances a Bedrock block definition using archetypes and modifiers.
 * 
 * @param {object} context - { name, baseShape, resolved, blockState }
 * @returns {object} The Bedrock block definition object { format_version: "1.20.80", "minecraft:block": { ... } }
 */
export function createBlockFromArchetype(context) {
    const { name, baseShape } = context;

    // 1. Match archetype
    let blockDef = null;
    for (const arch of archetypes) {
        if (arch.pattern && (arch.pattern.test(name) || (baseShape && arch.pattern.test(baseShape)))) {
            const res = arch.build(context);
            if (res) {
                blockDef = res["minecraft:block"] ? res : { "minecraft:block": res };
                break;
            }
        }
    }

    // Default fallback to block archetype
    if (!blockDef) {
        const res = block.build(context);
        blockDef = res["minecraft:block"] ? res : { "minecraft:block": res };
    }

    if (!blockDef.format_version) {
        blockDef.format_version = "1.20.80";
    }

    const targetBlock = blockDef["minecraft:block"];
    if (!targetBlock.description) {
        targetBlock.description = {};
    }
    if (!targetBlock.description.identifier) {
        targetBlock.description.identifier = `minecraft:${name}`;
    }

    // 2. Apply modifiers (light emission, non-solid collision)
    for (const mod of modifiers) {
        if (mod.pattern && (mod.pattern.test(name) || (baseShape && mod.pattern.test(baseShape)))) {
            const patch = mod.build(context);
            if (patch) {
                mergeBlockDefinition(targetBlock, patch);
            }
        }
    }

    return blockDef;
}

export function applyArchetypes(context) {
    const { name, baseShape, blockDef } = context;
    const targetBlock = blockDef["minecraft:block"];

    // 1. Archetype enhancements (e.g. collision boxes, custom traits)
    for (const arch of archetypes) {
        if (arch.pattern && (arch.pattern.test(name) || (baseShape && arch.pattern.test(baseShape)))) {
            const patch = arch.build(context);
            if (patch) {
                const patchObj = patch["minecraft:block"] ? patch["minecraft:block"] : patch;
                if (targetBlock.components?.["minecraft:geometry"] && patchObj.components?.["minecraft:geometry"]) {
                    delete patchObj.components["minecraft:geometry"];
                }
                if (targetBlock.components?.["minecraft:material_instances"] && patchObj.components?.["minecraft:material_instances"]) {
                    patchObj.components["minecraft:material_instances"] = {
                        ...patchObj.components["minecraft:material_instances"],
                        ...targetBlock.components["minecraft:material_instances"]
                    };
                }
                mergeBlockDefinition(targetBlock, patchObj);
                break;
            }
        }
    }

    // 2. Modifiers (e.g. non-solid, light emission)
    for (const mod of modifiers) {
        if (mod.pattern && (mod.pattern.test(name) || (baseShape && mod.pattern.test(baseShape)))) {
            const patch = mod.build(context);
            if (patch) {
                mergeBlockDefinition(targetBlock, patch);
            }
        }
    }
}
