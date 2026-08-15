/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Water`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The identifier for these water settings.
 */
export type Identifier = string;
/**
 * Concentration of chromophoric dissolved organic matter in mg/L; higher concentrations produce more yellow/yellow-brown colors
 */
export type Cdom = number;
/**
 * Concentration of chlorophyll in mg/L; higher concentrations produce more green colors
 */
export type Chlorophyll = number;
/**
 * Concentration of suspended sediment in mg/L; higher concentrations produce more red/red-brown colors
 */
export type SuspendedSediment = number;
/**
 * Whether or not waves are on or off
 */
export type Enabled = boolean;
/**
 * Controls the amount of wave displacement
 */
export type Depth = number;
/**
 * Controls how much the heading changes between each octave
 */
export type DirectionIncrement = number;
/**
 * Controls the size of individual waves; higher values create more tightly packed waves
 */
export type Frequency = number;
/**
 * Controls how much frequencies change in subsequent octaves
 */
export type FrequencyScaling = number;
/**
 * Controls how much each octave will blend into the neighboring octave
 */
export type Mix = number;
/**
 * Determines how many layers of waves to simulate; high values result in more complex waves
 */
export type Octaves = number;
/**
 * Controls how much smaller waves are pulled into larger ones
 */
export type Pull = number;
/**
 * Controls the resolutions of the fractal effect; higher values result in smoother waves
 */
export type SampleWidth = number;
/**
 * Adjusts the shape of the wave
 */
export type Shape = number;
/**
 * Controls the starting speed of the first waves
 */
export type Speed = number;
/**
 * Controls how much faster/slower subsequent octaves move
 */
export type SpeedScaling = number;
/**
 * Whether or not caustics are on or off
 */
export type Enabled1 = boolean;
/**
 * How many seconds to spend on each frame of animation in the caustics texture
 */
export type FrameLength = number;
/**
 * Controls how bright the caustics effect appears
 */
export type Power = number;
/**
 * Controls how size of the repetition of the caustics texture
 */
export type Scale = number;
/**
 * Resource location to a texture for controlling the shape of the caustics; if not used, a built-in Minecraft texture will be supplied automatically
 */
export type Texture = string;

/**
 * The properties of the water
 */
export interface Water {
  format_version?: FormatVersion;
  "minecraft:water_settings"?: WaterSettings;
}
/**
 * UNDOCUMENTED
 */
export interface WaterSettings {
  description: WaterSettingsDescription;
  particle_concentrations?: ParticleConcentrations;
  waves?: Waves;
  caustics?: Caustics;
}
/**
 * Contains non-component settings for the water settings.
 */
export interface WaterSettingsDescription {
  identifier: Identifier;
}
/**
 * The composition of particles in a body of water is what determines its color and how light behaves as it travels through the water
 */
export interface ParticleConcentrations {
  cdom?: Cdom;
  chlorophyll?: Chlorophyll;
  suspended_sediment?: SuspendedSediment;
}
/**
 * Waves are an optional effect that can be used to complement water surface animations to make your water appear more realistic.
 */
export interface Waves {
  enabled?: Enabled;
  depth?: Depth;
  direction_increment?: DirectionIncrement;
  frequency?: Frequency;
  frequency_scaling?: FrequencyScaling;
  mix?: Mix;
  octaves?: Octaves;
  pull?: Pull;
  sampleWidth?: SampleWidth;
  shape?: Shape;
  speed?: Speed;
  speed_scaling?: SpeedScaling;
}
/**
 * Caustics are an effect that make bodies of water more realistic by projecting light rays on underwater surfaces.
 */
export interface Caustics {
  enabled?: Enabled1;
  frame_length?: FrameLength;
  power?: Power;
  scale?: Scale;
  texture?: Texture;
}
