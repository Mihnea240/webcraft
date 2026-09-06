/**
 * @file fence.mjs
 * Archetype for fences, gates, and stone walls.
 */

export const pattern = /(?:^|_)?(?:fence(?:_gate)?|wall)(?:_.*)?$/;

export function getComponents({ name }) {
    const isWall = name.includes("_wall") || name.startsWith("wall_");
    const isGate = name.includes("fence_gate");

    return {
        components: {
            "minecraft:custom_traits": {
                archetype: isWall ? "wall" : isGate ? "fence_gate" : "fence"
            }
        }
    };
}

