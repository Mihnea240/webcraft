/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorLightingGlobal`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The identifier for these lighting settings.
 */
export type Identifier = string;
/**
 * How bright the sun is, measured in lux (lx)
 */
export type Illuminance1 = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 *
 * This interface was referenced by `Color`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `Color1`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `BlockceptionMinecraftBehaviorLightingGlobal`'s JSON-Schema
 * via the `definition` "B".
 */
export type LightingColor = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
export type Red = number;
export type Blue = number;
export type Green = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 */
export type LightingColor1 = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
/**
 * How bright the moon is, measured in lux (lx)
 */
export type Illuminance3 = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 */
export type LightingColor2 = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
/**
 * The rotational offset of the sun and moon from their standard orbital axis; measured in degrees
 */
export type OrbitalOffsetDegrees1 = number;
/**
 * The peak brightness of the End flash, measured in lux (lx)
 */
export type Illuminance4 = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 */
export type LightingColor3 = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
/**
 * The amount of desaturation to apply to albedo color values during emissive light calculation
 */
export type Desaturation = number;
/**
 * How bright the ambient light is, measured in lux (lx)
 */
export type Illuminance5 = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 */
export type LightingColor4 = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
/**
 * Scales how much energy the sky contributes to lighting
 */
export type Intensity = number;

export interface BlockceptionMinecraftBehaviorLightingGlobal {
  format_version?: FormatVersion;
  "minecraft:lighting_settings"?: LightingSettings;
}
/**
 * UNDOCUMENTED
 */
export interface LightingSettings {
  description: LightingSettingsDescription;
  directional_lights: DirectionalLights;
  emissive?: Emissive;
  ambient?: Ambient;
  sky?: Sky;
}
/**
 * Contains non-component settings for the lighting settings.
 */
export interface LightingSettingsDescription {
  identifier: Identifier;
}
/**
 * The directional lights that affect the world
 */
export interface DirectionalLights {
  orbital?: Orbital;
  flash?: Flash;
}
/**
 * Lighting settings for orbital light sources
 */
export interface Orbital {
  sun?: Sun;
  moon?: Moon;
  orbital_offset_degrees?: OrbitalOffsetDegrees | OrbitalOffsetDegrees1;
}
/**
 * The sun directional light
 */
export interface Sun {
  illuminance?: Illuminance | Illuminance1;
  color?: Color | LightingColor1;
}
/**
 * How bright the sun is, measured in lux (lx)
 */
export interface Illuminance {
  /**
   * This interface was referenced by `Illuminance`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The RGB color that the sun contributes to direct surface lighting
 */
export interface Color {
  [k: string]: LightingColor;
}
/**
 * The moon directional light
 */
export interface Moon {
  illuminance?: Illuminance2 | Illuminance3;
  color?: Color1 | LightingColor2;
}
/**
 * How bright the moon is, measured in lux (lx)
 */
export interface Illuminance2 {
  /**
   * This interface was referenced by `Illuminance2`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The RGB color that the moon contributes to direct surface lighting
 */
export interface Color1 {
  [k: string]: LightingColor;
}
/**
 * The rotational offset of the sun and moon from their standard orbital axis; measured in degrees
 */
export interface OrbitalOffsetDegrees {
  /**
   * This interface was referenced by `OrbitalOffsetDegrees`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * Lighting settings for the end flash
 */
export interface Flash {
  illuminance?: Illuminance4;
  color?: LightingColor3;
}
/**
 * UNDOCUMENTED
 */
export interface Emissive {
  desaturation?: Desaturation;
}
/**
 * Lighting settings for the ambient light
 */
export interface Ambient {
  illuminance?: Illuminance5;
  color?: LightingColor4;
}
/**
 * Lighting settings for the sky
 */
export interface Sky {
  intensity?: Intensity;
}
