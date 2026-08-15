/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorPointLightsGlobal`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 *
 * This interface was referenced by `Colors`'s JSON-Schema definition
 * via the `patternProperty` "^[0-9a-zA-Z:_\.\-]+$".
 *
 * This interface was referenced by `Colors`'s JSON-Schema definition
 * via the `patternProperty` "tile.[\w.]+.name".
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorPointLightsGlobal`'s JSON-Schema
 * via the `definition` "B".
 */
export type LightingColor = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
export type Red = number;
export type Blue = number;
export type Green = number;

export interface BlockceptionMinecraftBehaviorPointLightsGlobal {
  format_version?: FormatVersion;
  "minecraft:point_light_settings"?: PointLightSettings;
}
/**
 * UNDOCUMENTED
 */
export interface PointLightSettings {
  colors: Colors;
}
/**
 *  List of key-value pairs where the key is a namespace-qualified block name and the value is a color
 */
export interface Colors {}
