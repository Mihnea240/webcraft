/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "B".
 */
export type FormatVersion = B & B1;
export type B =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type B1 = string;
/**
 * The identifier for these fog settings. The identifier must include a namespace.
 */
export type Identifier = string;
/**
 * The distance from the player that the fog will begin to appear. 'fog_start' must be less than or equal to 'fog_end'.
 */
export type FogStart = number;
/**
 * The distance from the player that the fog will become fully opaque. 'fog_end' must be greater than or equal to 'fog_start'.
 */
export type FogEnd = number;
/**
 * The color that the fog will take on.
 */
export type FogColor = string;
/**
 * Determines how distance value is used. Fixed distance is measured in blocks. Dynamic distance is multiplied by the current render distance.
 */
export type RenderDistanceType = "fixed" | "render";
/**
 * Additional fog data which will slowly transition to the distance fog of current biome.
 */
export type TransitionFog = boolean;
/**
 * The maximum amount of opaqueness that the ground fog will take on. A value from [0.0, 1.0].
 */
export type MaximumDensity =
  | {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^\d*\.?\d+$".
       */
      [k: string]: number;
    }
  | number;
/**
 * The height in blocks that the ground fog will become it's maximum density.
 */
export type MaximumDensityHeight =
  | {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^\d*\.?\d+$".
       */
      [k: string]: number;
    }
  | number;
/**
 * The height in blocks that the ground fog will be completely transparent and begin to appear. This value needs to be at least 1 higher than `max_density_height`.
 */
export type ZeroDensityHeight =
  | {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^\d*\.?\d+$".
       */
      [k: string]: number;
    }
  | number;
/**
 * When set to true, the density will be uniform across all heights.
 */
export type Uniform = boolean;
/**
 * Proportion of light that is absorbed (lost) per block.
 */
export type Absorption =
  | {
      [k: string]: LightingColor;
    }
  | LightingColor;
/**
 * The color of the light emitted by the block, in RGB format or hex format.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "A".
 */
export type LightingColor = string | [] | [Red] | [Red, Blue] | [Red, Blue, Green];
export type Red = number;
export type Blue = number;
export type Green = number;
/**
 * Proportion of light that is scattered per block.
 */
export type Scattering =
  | {
      [k: string]: LightingColor;
    }
  | LightingColor;
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "heyney_or_keyframe".
 */
export type HeyneyOrKeyframe =
  | {
      [k: string]: HeyneyGreenSteinG;
    }
  | HeyneyGreenSteinG;
/**
 * Controls the distribution of scattered light.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^\d*\.?\d+$".
 *
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "henyeyGreenstein".
 */
export type HeyneyGreenSteinG = number;
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "unit_interval_or_keyframe".
 */
export type UnitIntervalOrKeyframe =
  | {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^\d*\.?\d+$".
       */
      [k: string]: number;
    }
  | number;
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "height_or_keyframe".
 */
export type HeightOrKeyframe =
  | {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^\d*\.?\d+$".
       */
      [k: string]: number;
    }
  | number;
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "color_or_keyframe".
 */
export type ColorOrKeyframe =
  | {
      [k: string]: LightingColor;
    }
  | LightingColor;
/**
 * A minecraft fog identifier.
 *
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "C".
 */
export type FogIdentifier = string;

/**
 * A rendering feature intended for obscuring the player's view distance, usually for colored atmospherics or for seamlessly occluding sharp boundaries such as unloaded chunks..
 */
export interface Fog {
  format_version?: FormatVersion;
  "minecraft:fog_settings"?: FogSettings;
}
/**
 * The definition of a single fog.
 */
export interface FogSettings {
  description?: Description;
  distance?: Distance;
  volumetric?: Volumetric;
}
/**
 * The identifying description of this fog settings.
 */
export interface Description {
  identifier?: Identifier;
}
/**
 * The distance fog settings for different camera locations.
 */
export interface Distance {
  air?: Air;
  weather?: Weather;
  water?: Water;
  lava?: Lava;
  lava_resistance?: LavaResistance;
  powder_snow?: PowderSnow;
}
/**
 * The fog settings when the camera is in the air.
 */
export interface Air {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 *  The fog settings for when the camera is in the air with active weather (rain, snow, etc..).
 */
export interface Weather {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * The fog settings when the camera is in water.
 */
export interface Water {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * The fog settings when the camera is in lava.
 */
export interface Lava {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * The fog settings when the camera is in lava and the player has the lava resistance effect active.
 */
export interface LavaResistance {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * The fog settings when the camera is inside a Powder Snow block.
 */
export interface PowderSnow {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * The volumetric fog settings.
 */
export interface Volumetric {
  density?: Density;
  media_coefficients?: MediaCoefficients;
  henyey_greenstein_g?: HenyeyGreensteinG;
}
/**
 * The density settings for different camera locations.
 */
export interface Density {
  air?: Air1;
  water?: Water1;
  lava?: Lava1;
  lava_resistance?: LavaResistance1;
}
/**
 * Fog density values as light passes through air blocks.
 */
export interface Air1 {
  max_density: MaximumDensity;
  max_density_height?: MaximumDensityHeight;
  zero_density_height?: ZeroDensityHeight;
  uniform?: Uniform;
}
/**
 * Fog density values as light passes through water blocks.
 */
export interface Water1 {
  max_density: MaximumDensity;
  max_density_height?: MaximumDensityHeight;
  zero_density_height?: ZeroDensityHeight;
  uniform?: Uniform;
}
/**
 * Fog density values as light passes through lava blocks.
 */
export interface Lava1 {
  max_density: MaximumDensity;
  max_density_height?: MaximumDensityHeight;
  zero_density_height?: ZeroDensityHeight;
  uniform?: Uniform;
}
/**
 * Fog density values as light passes through lava blocks while the player has lava resistance.
 */
export interface LavaResistance1 {
  max_density: MaximumDensity;
  max_density_height?: MaximumDensityHeight;
  zero_density_height?: ZeroDensityHeight;
  uniform?: Uniform;
}
/**
 * The coefficient settings for the volumetric fog in different blocks.
 */
export interface MediaCoefficients {
  air?: Air2;
  water?: Water2;
  cloud?: Cloud;
}
/**
 * Fog coefficient values while light passes through air.
 */
export interface Air2 {
  absorption?: Absorption;
  scattering?: Scattering;
}
/**
 * Fog coefficient values while light passes through water.
 */
export interface Water2 {
  absorption?: Absorption;
  scattering?: Scattering;
}
/**
 * Fog coefficient values while light passes through clouds.
 */
export interface Cloud {
  absorption?: Absorption;
  scattering?: Scattering;
}
/**
 * These are used to determine the distribution of scattered light in different mediums.
 */
export interface HenyeyGreensteinG {
  air?: Air3;
  water?: Water3;
}
/**
 * Used when light is passing through air.
 */
export interface Air3 {
  henyey_greenstein_g?: HeyneyOrKeyframe;
}
/**
 * Used when light is passing through water.
 */
export interface Water3 {
  henyey_greenstein_g?: HeyneyOrKeyframe;
}
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "defaultFogSettings".
 */
export interface DefaultFogSettings {
  fog_start: FogStart;
  fog_end: FogEnd;
  fog_color: FogColor;
  render_distance_type: RenderDistanceType;
  transition_fog?: TransitionFog;
}
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "volumeDensityObject".
 */
export interface VolumeDensityObject {
  max_density: MaximumDensity;
  max_density_height?: MaximumDensityHeight;
  zero_density_height?: ZeroDensityHeight;
  uniform?: Uniform;
}
/**
 * This interface was referenced by `Fog`'s JSON-Schema
 * via the `definition` "volumeMediaObject".
 */
export interface VolumeMediaObject {
  absorption?: Absorption;
  scattering?: Scattering;
}
