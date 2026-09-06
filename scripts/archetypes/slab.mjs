/**
 * @file slab.mjs
 * Archetype for slab blocks with collision boxes and half permutations.
 */

export const pattern = /(?:^|_)?slab(?:_top)?$/;

export function getComponents({ name, baseShape }) {
    const isTop = name.endsWith("_slab_top") || baseShape === "slab_top";

    return {
        components: {
            "minecraft:collision_box": {
                origin: [0, isTop ? 8 : 0, 0],
                size: [16, 8, 16]
            },
            "minecraft:custom_traits": {
                archetype: "slab",
                isTop
            }
        },
        permutations: [
            {
                condition: "query.block_property('minecraft:vertical_half') == 'top'",
                components: {
                    "minecraft:collision_box": {
                        origin: [0, 8, 0],
                        size: [16, 8, 16]
                    },
                    "minecraft:custom_traits": {
                        archetype: "slab",
                        isTop: true
                    }
                }
            },
            {
                condition: "query.block_property('minecraft:vertical_half') == 'bottom'",
                components: {
                    "minecraft:collision_box": {
                        origin: [0, 0, 0],
                        size: [16, 8, 16]
                    },
                    "minecraft:custom_traits": {
                        archetype: "slab",
                        isTop: false
                    }
                }
            }
        ]
    };
}

