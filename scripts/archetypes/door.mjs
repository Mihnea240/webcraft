/**
 * @file door.mjs
 * Archetype for door blocks.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?door(?:_.*)?$/;

export function build({ name, resolved }) {
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:custom_traits": {
                    archetype: "door"
                }
            },
            permutations: [
                {
                    condition: "query.block_property('minecraft:open_bit') == true",
                    components: {
                        "minecraft:collision_box": false
                    }
                }
            ]
        }
    };
}
