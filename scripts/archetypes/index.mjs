/**
 * @file index.mjs
 * Archetype Manager and Component Merging Pipeline.
 * 
 * Each archetype produces a component JSON fragment containing base components and/or permutations.
 * The merging schema:
 * 1. Base components: overwrites/updates base component keys.
 * 2. Permutations: merges with existing condition permutations or appends new ones.
 */

import * as buttonLever from "./button_lever.mjs";
import * as carpet from "./carpet.mjs";
import * as door from "./door.mjs";
import * as fence from "./fence.mjs";
import * as lightEmission from "./light_emission.mjs";
import * as nonSolid from "./non_solid.mjs";
import * as slab from "./slab.mjs";
import * as stairs from "./stairs.mjs";
import * as trapdoor from "./trapdoor.mjs";

export const archetypes = [
    lightEmission,
    nonSolid,
    slab,
    stairs,
    door,
    trapdoor,
    carpet,
    fence,
    buttonLever
];

/**
 * Merges a generated archetype component JSON into a target Bedrock block definition.
 * Merging schema:
 * - Overwrites base components
 * - Merges permutations
 * 
 * @param {object} targetBlock - The Bedrock block object (e.g. blockDef["minecraft:block"])
 * @param {object} patch - The archetype output: { components?: object, permutations?: Array }
 * @returns {object} The modified targetBlock
 */
export function mergeBlockDefinition(targetBlock, patch) {
    if (!patch) return targetBlock;

    // 1. Overwrite / merge base components
    if (patch.components) {
        targetBlock.components = targetBlock.components || {};
        for (const [compName, compVal] of Object.entries(patch.components)) {
            targetBlock.components[compName] = compVal;
        }
    }

    // 2. Merge permutations
    if (patch.permutations && Array.isArray(patch.permutations)) {
        targetBlock.permutations = targetBlock.permutations || [];

        for (const patchPerm of patch.permutations) {
            if (!patchPerm.condition) continue;

            const existingPerm = targetBlock.permutations.find(p => p.condition === patchPerm.condition);
            if (existingPerm) {
                // Merge components into existing permutation matching this condition
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
 * Runs all matching archetypes against a block and merges their components & permutations.
 * 
 * @param {object} context - { name, baseShape, resolved, blockDef }
 */
export function applyArchetypes(context) {
    const { name, baseShape, blockDef } = context;
    const targetBlock = blockDef["minecraft:block"];

    for (const archetype of archetypes) {
        let matched = false;

        if (archetype.pattern instanceof RegExp) {
            matched = archetype.pattern.test(name) || (baseShape && archetype.pattern.test(baseShape));
        } else if (typeof archetype.match === "function") {
            matched = archetype.match(context);
        }

        if (matched && typeof archetype.getComponents === "function") {
            const patch = archetype.getComponents(context);
            if (patch) {
                mergeBlockDefinition(targetBlock, patch);
            }
        }
    }
}

