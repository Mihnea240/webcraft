/**
 * @file fence.mjs
 * Archetype for fences, gates, and walls.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?(?:fence(?:_gate)?|wall)(?:_.*)?$/;

export function build({ name, resolved }) {
    const isWall = name.includes("_wall") || name.startsWith("wall_");
    const isGate = name.includes("fence_gate");
    const geomId = isWall ? "geometry.wall" : isGate ? "geometry.fence_gate" : "geometry.fence";

    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:geometry": geomId,
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:custom_traits": {
                    archetype: isWall ? "wall" : isGate ? "fence_gate" : "fence"
                }
            }
        }
    };
}
