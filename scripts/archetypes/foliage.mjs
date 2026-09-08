/**
 * @file foliage.mjs
 * Archetype for foliage and crops (cross, tinted_cross, crop shapes).
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)(?:torch|sapling|flower|tulip|orchid|allium|daisy|poppy|dandelion|grass|fern|bush|mushroom|roots|fungus|vines|spore_blossom|sugar_cane|wheat_stage|beetroot_stage|carrots_stage|potatoes_stage|rail|wire|tripwire|redstone_dust|web|cross|crop)(?:_.*)?$/;

export function build({ name, baseShape, resolved }) {
    const isCrop = name.includes("stage") || (baseShape && baseShape.includes("crop"));
    const geomId = isCrop ? "geometry.crop" : "geometry.cross";
    const materialInstances = extractMaterialInstances(resolved, name);

    return {
        components: {
            "minecraft:geometry": geomId,
            "minecraft:collision_box": false,
            "minecraft:material_instances": materialInstances
        }
    };
}

