/**
 * @file button_lever.mjs
 * Archetype for switches (buttons, levers, pressure plates).
 */

export const pattern = /(?:^|_)(?:button|lever|pressure_plate)(?:_.*)?$/;

export function getComponents() {
    return {
        components: {
            "minecraft:collision_box": false,
            "minecraft:custom_traits": {
                archetype: "switch"
            }
        }
    };
}

