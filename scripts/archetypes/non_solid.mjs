/**
 * @file non_solid.mjs
 * Archetype modifier for passable / non-colliding blocks.
 */

export const pattern = /(?:^|_)(?:torch|sapling|flower|tulip|orchid|allium|daisy|poppy|dandelion|grass|fern|bush|mushroom|roots|fungus|vines|spore_blossom|sugar_cane|wheat_stage|beetroot_stage|carrots_stage|potatoes_stage|rail|wire|tripwire|redstone_dust|web)(?:_.*)?$/;

export function build() {
    return {
        components: {
            "minecraft:collision_box": false
        }
    };
}

export const getComponents = build;
