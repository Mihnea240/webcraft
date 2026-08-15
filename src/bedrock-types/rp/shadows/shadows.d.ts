/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Shadows`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The type of shadows to use.
 */
export type ShadowStyle = "blocky_shadows" | "soft_shadows";
/**
 * The resolution to snap shadow texels to; recommended to use the same resolution as block texture assets in the accompanying pack
 */
export type TexelSize = number;

/**
 * The properties of the shadows
 */
export interface Shadows {
  format_version?: FormatVersion;
  "minecraft:shadow_settings"?: ShadowSettings;
}
/**
 * UNDOCUMENTED
 */
export interface ShadowSettings {
  shadow_style: ShadowStyle;
  texel_size?: TexelSize;
}
