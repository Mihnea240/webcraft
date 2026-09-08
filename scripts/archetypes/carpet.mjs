/**
 * @file carpet.mjs
 * Archetype for carpet blocks.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?carpet(?:_.*)?$/;

export function build({ name, resolved }) {
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:geometry": "geometry.carpet",
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:collision_box": {
                    origin: [0, 0, 0],
                    size: [16, 1, 16]
                },
                "minecraft:custom_traits": {
                    archetype: "carpet"
                }
            }
        }
    };
}
