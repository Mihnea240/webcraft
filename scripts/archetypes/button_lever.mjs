/**
 * @file button_lever.mjs
 * Archetype for switches (buttons, levers, pressure plates).
 */

import { extractMaterialInstances } from "./base.mjs";

export const pattern = /(?:^|_)(?:button|lever|pressure_plate)(?:_.*)?$/;

export function build({ name, resolved }) {
    return {
        "minecraft:block": {
            description: {
                identifier: `minecraft:${name}`
            },
            components: {
                "minecraft:collision_box": false,
                "minecraft:material_instances": extractMaterialInstances(resolved, name),
                "minecraft:custom_traits": {
                    archetype: "switch"
                }
            }
        }
    };
}
