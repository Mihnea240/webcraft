/**
 * @file slab.mjs
 * Archetype for slab blocks.
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)?slab(?:_.*)?$/;

export function build({ name, resolved }) {
    const isTopInitial = name.endsWith("_slab_top");
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:geometry": isTopInitial ? "geometry.slab_top" : "geometry.slab",
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:collision_box": {
                    origin: [0, isTopInitial ? 8 : 0, 0],
                    size: [16, 8, 16]
                },
                "minecraft:custom_traits": {
                    archetype: "slab",
                    isTop: isTopInitial
                }
            }
        }
    };
}
