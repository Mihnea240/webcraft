/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorLocalLightingLocalLighting`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = A & A1;
export type A =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type A1 = string;
/**
 * `static_light` is currently unused
 */
export type LightType = "static_light" | "point_light";
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorLocalLightingLocalLighting`'s JSON-Schema
 * via the `definition` "B".
 */
export type LightingColor = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
export type Red = number;
export type Blue = number;
export type Green = number;

export interface BlockceptionMinecraftBehaviorLocalLightingLocalLighting {
  format_version?: FormatVersion;
  "minecraft:local_light_settings"?: LocalLightSettings;
}
/**
 * UNDOCUMENTED
 */
export interface LocalLightSettings {
  [k: string]: Block;
}
/**
 * Namespace-qualified block name
 *
 * This interface was referenced by `LocalLightSettings`'s JSON-Schema definition
 * via the `patternProperty` "^[0-9a-zA-Z:_\.\-]+$".
 */
export interface Block {
  light_type: LightType;
  light_color?: LightingColor;
}
