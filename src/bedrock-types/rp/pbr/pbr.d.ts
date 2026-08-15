/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorPbrGlobal`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The default MERS value to use for blocks when not defined via textureset
 */
export type GlobalMetalnessEmissiveRoughnessSubsurface =
  [] | [Red] | [Red, Green] | [Red, Green, Blue] | [Red, Green, Blue, Alpha] | string;
export type Red = number;
export type Green = number;
export type Blue = number;
export type Alpha = number;
/**
 * The default MERS value to use for actors/mobs when not defined via textureset
 */
export type GlobalMetalnessEmissiveRoughnessSubsurface1 =
  [] | [Red] | [Red, Green] | [Red, Green, Blue] | [Red, Green, Blue, Alpha] | string;
/**
 * The default MERS value to use for particles when not defined via textureset
 */
export type GlobalMetalnessEmissiveRoughnessSubsurface2 =
  [] | [Red] | [Red, Green] | [Red, Green, Blue] | [Red, Green, Blue, Alpha] | string;
/**
 * The default MERS value to use for items when not defined via textureset
 */
export type GlobalMetalnessEmissiveRoughnessSubsurface3 =
  [] | [Red] | [Red, Green] | [Red, Green, Blue] | [Red, Green, Blue, Alpha] | string;
/**
 * This interface was referenced by `BlockceptionMinecraftBehaviorPbrGlobal`'s JSON-Schema
 * via the `definition` "rgbaOrHex".
 */
export type RgbaOrHex = [] | [Red] | [Red, Green] | [Red, Green, Blue] | [Red, Green, Blue, Alpha] | string;

export interface BlockceptionMinecraftBehaviorPbrGlobal {
  format_version?: FormatVersion;
  "minecraft:pbr_fallback_settings"?: PBRFallbackSettings;
}
/**
 * UNDOCUMENTED
 */
export interface PBRFallbackSettings {
  blocks?: Blocks;
  actors?: Actors;
  particles?: Particles;
  items?: Items;
}
/**
 * UNDOCUMENTED
 */
export interface Blocks {
  global_metalness_emissive_roughness_subsurface?: GlobalMetalnessEmissiveRoughnessSubsurface;
}
/**
 * UNDOCUMENTED
 */
export interface Actors {
  global_metalness_emissive_roughness_subsurface?: GlobalMetalnessEmissiveRoughnessSubsurface1;
}
/**
 * UNDOCUMENTED
 */
export interface Particles {
  global_metalness_emissive_roughness_subsurface?: GlobalMetalnessEmissiveRoughnessSubsurface2;
}
/**
 * UNDOCUMENTED
 */
export interface Items {
  global_metalness_emissive_roughness_subsurface?: GlobalMetalnessEmissiveRoughnessSubsurface3;
}
