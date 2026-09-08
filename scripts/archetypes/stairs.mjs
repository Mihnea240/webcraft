/**
 * @file stairs.mjs
 * Archetype for stair blocks.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?stairs(?:_.*)?$/;

export function build({ name, resolved }) {
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:geometry": "geometry.stairs",
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:custom_traits": {
                    archetype: "stairs"
                }
            }
        }
    };
}
