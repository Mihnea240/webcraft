/**
 * @file stairs.mjs
 * Archetype for stair blocks with traits and direction permutations.
 */

export const pattern = /(?:^|_)?stairs(?:_.*)?$/;

export function getComponents() {
    return {
        components: {
            "minecraft:custom_traits": {
                archetype: "stairs"
            }
        },
        permutations: [
            {
                condition: "query.block_property('minecraft:cardinal_direction') == 'north'",
                components: {
                    "minecraft:transformation": { "rotation": [0, 0, 0] }
                }
            },
            {
                condition: "query.block_property('minecraft:cardinal_direction') == 'east'",
                components: {
                    "minecraft:transformation": { "rotation": [0, 90, 0] }
                }
            },
            {
                condition: "query.block_property('minecraft:cardinal_direction') == 'south'",
                components: {
                    "minecraft:transformation": { "rotation": [0, 180, 0] }
                }
            },
            {
                condition: "query.block_property('minecraft:cardinal_direction') == 'west'",
                components: {
                    "minecraft:transformation": { "rotation": [0, 270, 0] }
                }
            }
        ]
    };
}

