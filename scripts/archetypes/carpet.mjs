/**
 * @file carpet.mjs
 * Archetype for carpet blocks (1/16th height collision box).
 */

export const pattern = /(?:^|_)?carpet(?:_.*)?$/;

export function getComponents() {
    return {
        components: {
            "minecraft:collision_box": {
                origin: [0, 0, 0],
                size: [16, 1, 16]
            },
            "minecraft:custom_traits": {
                archetype: "carpet"
            }
        }
    };
}

