/**
 * @file block.mjs
 * Archetype for standard full cube blocks (inheriting from block or cube).
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /^(?:minecraft:)?(?:block|cube)(?:_.*)?$/;

export function build({ name, resolved }) {
    const materialInstances = extractMaterialInstances(resolved, name);

    return {
        components: {
            "minecraft:geometry": "geometry.full_block",
            "minecraft:material_instances": materialInstances
        }
    };
}

