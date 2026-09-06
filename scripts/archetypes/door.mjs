/**
 * @file door.mjs
 * Archetype for door blocks.
 */

export const pattern = /(?:^|_)?door(?:_.*)?$/;

export function getComponents({ name }) {
    const isOpen = name.includes("_open");
    const isTop = name.includes("_top");

    return {
        components: {
            "minecraft:custom_traits": {
                archetype: "door",
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

