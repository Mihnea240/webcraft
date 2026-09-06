/**
 * @file light_emission.mjs
 * Archetype for light-emitting blocks (torches, lanterns, fire, glowstone, froglights, etc.)
 */

export const pattern = /(?:^|_)(?:torch|lantern|campfire|fire|froglight)$|^lava(?:_cauldron)?$|glowstone|sea_lantern|shroomlight|crying_obsidian|respawn_anchor|beacon|conduit|end_rod|candle.*lit|redstone_lamp_(?:lit|on)/;

const LIGHT_EMISSION_MAP = {
    lava: 15,
    lava_cauldron: 15,
    fire: 15,
    soul_fire: 10,
    campfire: 15,
    soul_campfire: 10,
    torch: 14,
    wall_torch: 14,
    soul_torch: 10,
    soul_wall_torch: 10,
    lantern: 15,
    soul_lantern: 10,
    glowstone: 15,
    sea_lantern: 15,
    shroomlight: 15,
    ochre_froglight: 15,
    pearlescent_froglight: 15,
    verdant_froglight: 15,
    end_rod: 14,
    crying_obsidian: 10,
    respawn_anchor: 15,
    beacon: 15,
    conduit: 15
};

export function getComponents({ name }) {
    let light = 0;
    for (const [key, val] of Object.entries(LIGHT_EMISSION_MAP)) {
        if (name === key || name.startsWith(key + "_") || name.endsWith("_" + key)) {
            light = Math.max(light, val);
        }
    }

    if (name.includes("candle") && name.includes("lit")) {
        if (name.includes("four")) light = 12;
        else if (name.includes("three")) light = 9;
        else if (name.includes("two")) light = 6;
        else light = 3;
    } else if (name.includes("redstone_lamp_lit") || name.includes("redstone_lamp_on")) {
        light = 15;
    }

    if (light <= 0) return null;

    return {
        components: {
            "minecraft:light_emission": light
        }
    };
}

