/**
 * @file base.mjs
 * Shared utility functions for archetype modules.
 */

/**
 * Known mapping from Java texture names to Bedrock terrain_texture shortnames.
 */
export const JAVA_TO_BEDROCK_TEXTURE_MAP = {
    "torch": "torch_on",
    "redstone_torch": "redstone_torch_on",
    "redstone_torch_off": "redstone_torch_off",
    "tripwire_hook": "trip_wire_hook",
    "tripwire": "trip_wire_source",
    "grass_block_top": "grass_top",
    "grass_block_side": "grass_side",
    "grass_block_side_overlay": "grass_side_overlay",
    "grass_block_snow": "grass_side_snowed",
    "podzol_top": "dirt_podzol_top",
    "podzol_side": "dirt_podzol_side",
    "mycelium_top": "mycelium_top",
    "mycelium_side": "mycelium_side",
    "coarse_dirt": "coarse_dirt",
    "farmland": "farmland_dry",
    "farmland_moist": "farmland_wet"
};

/**
 * Transforms Java texture paths and shortnames into canonical Bedrock texture identifiers.
 */
export function transformTextureName(name) {
    if (!name || typeof name !== "string") return "";
    let clean = name.replace(/^minecraft:block\/|^block\//, "");
    if (JAVA_TO_BEDROCK_TEXTURE_MAP[clean]) {
        return JAVA_TO_BEDROCK_TEXTURE_MAP[clean];
    }
    // Pattern: name_stage0 -> name_stage_0
    const stageMatch = clean.match(/^(.*)_stage(\d+)$/);
    if (stageMatch) {
        return `${stageMatch[1]}_stage_${stageMatch[2]}`;
    }
    return clean;
}

/**
 * Normalizes a texture path/name while retaining valid references.
 */
export function cleanTexture(tex) {
    return transformTextureName(tex);
}

/**
 * Extracts material instances from resolved model textures for Bedrock Edition.
 * Excludes non-face slots ('particle', 'all') and provides wildcard '*'.
 * Collapses to just '*' if all faces share the same primary texture.
 * 
 * @param {object} resolvedModel - Model with resolved textures { textures: { ... } }
 * @param {string} fallbackName - Fallback texture name if none resolved
 * @returns {object} Dictionary of material instances
 */
export function extractMaterialInstances(resolvedModel, fallbackName = "") {
    const materialInstances = {};
    let primaryTexture = null;

    if (resolvedModel && resolvedModel.textures) {
        for (const [slot, tex] of Object.entries(resolvedModel.textures)) {
            // Filter out 'particle', 'all', and unresolved variable references
            if (slot === "particle" || slot === "all") continue;
            if (typeof tex !== "string" || tex.startsWith("#")) continue;

            const transformed = transformTextureName(tex);
            materialInstances[slot] = { texture: transformed };

            if (!primaryTexture && (slot === "texture" || slot === "side" || slot === "top" || slot === "end")) {
                primaryTexture = transformed;
            }
        }
    }

    if (!primaryTexture) {
        primaryTexture = Object.values(materialInstances)[0]?.texture || transformTextureName(fallbackName);
    }

    if (primaryTexture) {
        materialInstances["*"] = { texture: primaryTexture };
    }

    // Optimization: If all explicit slot entries point to the same texture as '*',
    // collapse them into just '*' to keep block JSON clean and minimal.
    const nonWildcardSlots = Object.keys(materialInstances).filter(k => k !== "*");
    const allSameAsWildcard = nonWildcardSlots.length > 0 && nonWildcardSlots.every(k => materialInstances[k].texture === primaryTexture);
    if (allSameAsWildcard) {
        return { "*": { texture: primaryTexture } };
    }

    return materialInstances;
}

/**
 * Builds a MoLang condition string from property key-values using query.block_state().
 */
export function buildMolangCondition(props) {
    const clauses = [];
    for (const [k, v] of Object.entries(props)) {
        if (typeof v === "boolean") {
            clauses.push(`query.block_state('${k}') == ${v}`);
        } else {
            clauses.push(`query.block_state('${k}') == '${v}'`);
        }
    }
    return clauses.length > 0 ? clauses.join(" && ") : "1 == 1";
}
