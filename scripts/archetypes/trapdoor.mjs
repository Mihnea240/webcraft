/**
 * @file trapdoor.mjs
 * Archetype for trapdoor blocks.
 */

export const pattern = /(?:^|_)?trapdoor(?:_.*)?$/;

export function getComponents({ name }) {
    const isOpen = name.includes("_open");
    const isTop = name.includes("_top");

    return {
        components: {
            "minecraft:custom_traits": {
                archetype: "trapdoor",
                isOpen,
                isTop
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
    };
}

