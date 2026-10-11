/**
 * @file trapdoor.mjs
 * Archetype for trapdoor blocks.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?trapdoor(?:_.*)?$/;

export function build({ name, resolved }) {
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:custom_traits": {
                    archetype: "trapdoor"
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
