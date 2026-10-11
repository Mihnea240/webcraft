/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Atmospherics`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The identifier for these atmosphere settings.
 */
export type Identifier = string;
/**
 * The minimum horizon height
 */
export type MinimumHorizonHeight1 = number;
/**
 * The height relative to the horizon where the zenith contribution will take over
 */
export type Start1 = number;
/**
 * The height relative to the horizon where mie scattering begins
 */
export type MieStart1 = number;
/**
 * The maximum horizon height
 */
export type MaximumHorizonHeight1 = number;
/**
 * How strong the atmosphere's rayleigh scattering term is
 */
export type RayleighStrength1 = number;
/**
 * How strong the sun's mie scattering term is
 */
export type SunMieStrength1 = number;
/**
 * How strong the moon's mie scattering term is
 */
export type MoonMieStrength1 = number;
/**
 * How the lobe of the mie scattering is shaped
 */
export type SunGlareShape1 = number;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 *
 * This interface was referenced by `SkyZenithColor`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `SkyHorizonColor`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `Atmospherics`'s JSON-Schema
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
 * The color of the light emitted by the block, in RGB format or hex format.
 */
export type LightingColor2 = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];

/**
 * The properties of the atmosphere
 */
export interface Atmospherics {
  format_version?: FormatVersion;
  "minecraft:atmosphere_settings"?: AtmosphereSettings;
}
/**
 * UNDOCUMENTED
 */
export interface AtmosphereSettings {
  description: AtmosphereDescription;
  horizon_blend_stops?: HorizonBlendStops;
  rayleigh_strength?: RayleighStrength | RayleighStrength1;
  sun_mie_strength?: SunMieStrength | SunMieStrength1;
  moon_mie_strength?: MoonMieStrength | MoonMieStrength1;
  sun_glare_shape?: SunGlareShape | SunGlareShape1;
  sky_zenith_color?: SkyZenithColor | LightingColor1;
  sky_horizon_color?: SkyHorizonColor | LightingColor2;
}
/**
 * Contains non-component settings for the atmosphere settings.
 */
export interface AtmosphereDescription {
  identifier: Identifier;
}
/**
 * How the atmosphere is divided up
 */
export interface HorizonBlendStops {
  min?: MinimumHorizonHeight | MinimumHorizonHeight1;
  start?: Start | Start1;
  mie_start?: MieStart | MieStart1;
  max?: MaximumHorizonHeight | MaximumHorizonHeight1;
}
/**
 * The minimum horizon height
 */
export interface MinimumHorizonHeight {
  /**
   * This interface was referenced by `MinimumHorizonHeight`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The height relative to the horizon where the zenith contribution will take over
 */
export interface Start {
  /**
   * This interface was referenced by `Start`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The height relative to the horizon where mie scattering begins
 */
export interface MieStart {
  /**
   * This interface was referenced by `MieStart`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The maximum horizon height
 */
export interface MaximumHorizonHeight {
  /**
   * This interface was referenced by `MaximumHorizonHeight`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * How strong the atmosphere's rayleigh scattering term is
 */
export interface RayleighStrength {
  /**
   * This interface was referenced by `RayleighStrength`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * How strong the sun's mie scattering term is
 */
export interface SunMieStrength {
  /**
   * This interface was referenced by `SunMieStrength`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * How strong the moon's mie scattering term is
 */
export interface MoonMieStrength {
  /**
   * This interface was referenced by `MoonMieStrength`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * How the lobe of the mie scattering is shaped
 */
export interface SunGlareShape {
  /**
   * This interface was referenced by `SunGlareShape`'s JSON-Schema definition
   * via the `patternProperty` "^\d*\.?\d+$".
   */
  [k: string]: number;
}
/**
 * The RGB color of the zenith region of the atmosphere
 */
export interface SkyZenithColor {
  [k: string]: LightingColor;
}
/**
 * The RGB color of the horizon region of the atmosphere
 */
export interface SkyHorizonColor {
  [k: string]: LightingColor;
}
