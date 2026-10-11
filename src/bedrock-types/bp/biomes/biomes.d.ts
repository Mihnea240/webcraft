/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
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
 * The identifier for this biome. The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla biome.
 */
export type Identifier = string;
/**
 * Amount that precipitation affects colors and block changes.
 */
export type Downfall = number;
/**
 * Minimum and maximum snow level, each multiple of 0.125 is another snow layer.
 */
export type SnowAccumulation = [] | [number] | [number, number];
/**
 * Temperature affects a variety of visual and behavioral things, including snow and ice placement, sponge drying, and sky color.
 */
export type Temperature = number;
/**
 * Probabiltity between [0.0, 0.75] of creatures spawning within the biome on chunk generation.
 */
export type Probability = number;
/**
 * Whether or not the biome is humid.
 */
export type IsHumid = boolean;
/**
 * Controls whether the grass will use a custom tint color or a noise based tint color.
 */
export type Grass = FTint | FNoise;
/**
 * Controls the type of grass tint to use.
 */
export type GrassType = "tint";
/**
 * Controls the type of grass tint to use.
 */
export type GrassType1 = "noise";
/**
 * Sets the color foliage will be tinted by in this biome on the map.
 */
export type Foliage = string | [number, number, number];
/**
 * Block type use as steep material.
 */
export type Material = BlockIdentifier | BlockReference;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier = string;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier1 = string;
/**
 * The key of property is the name of the block state/property, the value must be the same as the block properties accepted values.
 */
export type StateValue = boolean | number | string;
/**
 * A condition using Molang queries that results to true/false that can be used to query for blocks with certain tags.
 */
export type Molang = string;
/**
 * Enable for north-facing slopes.
 */
export type NorthSlopes = boolean;
/**
 * Enable for south-facing slopes.
 */
export type SouthSlopes = boolean;
/**
 * Enable for west-facing slopes.
 */
export type WestSlopes = boolean;
/**
 * Enable for east-facing slopes.
 */
export type EastSlopes = boolean;
/**
 * Temperature with which this biome should selected, relative to other biomes.
 */
export type TargetTemperature = number;
/**
 * Humidity with which this biome should selected, relative to other biomes.
 */
export type TargetHumidity = number;
/**
 * Altitude with which this biome should selected, relative to other biomes.
 */
export type TargetAltitude = number;
/**
 * Weirdness with which this biome should selected, relative to other biomes.
 */
export type TargetWeirdness = number;
/**
 * Weight with which this biome should selected, relative to other biomes.
 */
export type Weight = number;
/**
 * What biome to switch to when converting to a hilly biome.
 */
export type HillsTransformation = Biome | BlockReference1;
/**
 * String name of a Biome.
 */
export type Biome = string;
/**
 * Array of any size. If an array, each entry can be a Biome name string, or an array of size 2, where the first entry is a Biome name and the second entry is a positive integer representing how that Biome is weighted against other entries. If no weight is provided, a weight of 1 is used..
 *
 * @minItems 1
 */
export type BlockReference1 = [
  Biome1 | [] | [Biome2] | [Biome2, Weight1],
  ...(Biome1 | [] | [Biome2] | [Biome2, Weight1])[]
];
/**
 * String name of a Biome.
 */
export type Biome1 = string;
/**
 * String name of a Biome.
 */
export type Biome2 = string;
/**
 * A positive integer representing how that Biome is weighted against other entries..
 */
export type Weight1 = number;
/**
 * What biome to switch to when converting to a mutated biome.
 */
export type MutateTransformation = Biome | BlockReference1;
/**
 * What biome to switch to when converting to a river biome (if not the Vanilla 'river' biome).
 */
export type RiverTransformation = Biome | BlockReference1;
/**
 * What biome to switch to when adjacent to an ocean biome.
 */
export type ShoreTransformation = Biome | BlockReference1;
/**
 * Name of a climate category.
 */
export type ClimateCategory = "medium" | "warm" | "lukewarm" | "cold" | "frozen";
/**
 * Weight with which this biome should be selected, relative to other biomes in the same category.
 */
export type Weight2 = number;
/**
 * Controls the world generation climate categories that this biome can spawn for. A single biome can be associated with multiple categories with different weightings.
 */
export type GenerateForClimates = [] | [ClimateCategory] | [ClimateCategory, Weight2][];
/**
 * Array of 2 Floats.
 */
export type NoiseParams = [] | [Depth] | [Depth, Scale];
/**
 * More negative means deeper underwater, while more positive means higher.
 */
export type Depth = number;
/**
 * Affects how much noise changes as it moves from the surface.
 */
export type Scale = number;
/**
 * Specifies a preset based on a built-in setting rather than manually using noise_params.
 */
export type NoiseType =
  | "default"
  | "default_mutated"
  | "river"
  | "ocean"
  | "deep_ocean"
  | "lowlands"
  | "taiga"
  | "mountains"
  | "highlands"
  | "extreme"
  | "less_extreme"
  | "beach"
  | "stone_beach"
  | "mushroom"
  | "swamp";
/**
 * Controls the block types used for terrain generation.
 */
export type Builder = {
  [k: string]: unknown;
};
/**
 * Defines a range of noise values [min, max] for which this adjustment should be applied.
 */
export type HeightRange = [] | [Min] | [Min, Max];
/**
 * The minecraft molang definition that results in a float.
 */
export type Min = string | number;
/**
 * The minecraft molang definition that results in a float.
 */
export type Max = string | number;
/**
 * A minecraft block reference.
 */
export type BlockReference2 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference3 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference4 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference5 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference6 = BlockIdentifier | BlockReference;
/**
 * Defines a range of noise values [min, max] for which this adjustment should be applied.
 */
export type NoiseRange = [] | [Min1] | [Min1, Max1];
/**
 * The scale to multiply by the position when accessing the noise value for the material adjustments.
 */
export type NoiseFrequencyScale = number;
/**
 * All adjustments that match the column's noise values will be applied in the order listed.
 */
export type Adjustments = Adjustment[];
/**
 * Controls the block types used for terrain generation.
 */
export type Builder1 = {
  [k: string]: unknown;
};
/**
 * Array of string tags used by other systems such as entity spawning
 *
 * @minItems 1
 */
export type Tags1 = [string, ...string[]];
/**
 * Village type
 */
export type Type = "desert" | "ice" | "savanna" | "taiga" | "default";
/**
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "F_color".
 */
export type FColor = string | [number, number, number];
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "I".
 */
export type BlockIdentifier2 = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "J".
 */
export type Molang1 = string;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "H".
 */
export type BlockReference7 = BlockIdentifier | BlockReference;
/**
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BB_transformation".
 */
export type BBTransformation = Biome | BlockReference1;
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BH".
 */
export type MolangNumber = string | number;
/**
 * A minecraft identifier.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "CB".
 */
export type Identifier1 = string;

/**
 * The minecraft biome behavior specification.
 */
export interface BiomeBehavior {
  format_version: FormatVersion;
  "minecraft:biome": BiomeDefinition;
}
/**
 * A custom biome definition.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "B".
 */
export interface BiomeDefinition {
  description: BiomeDescription;
  components: Components;
}
/**
 * The description for this biome.
 */
export interface BiomeDescription {
  identifier: Identifier;
}
/**
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "B_components_ref".
 */
export interface Components {
  "minecraft:climate"?: Climate;
  "minecraft:creature_spawn_probability"?: CreatureSpawnProbability;
  "minecraft:humidity"?: Humidity;
  "minecraft:map_tints"?: MapTints;
  "minecraft:mountain_parameters"?: MountainParameters;
  "minecraft:multinoise_generation_rules"?: NetherGenerationRules;
  "minecraft:overworld_generation_rules"?: OverworldGenerationRules;
  "minecraft:overworld_height"?: OverworldHeight;
  "minecraft:partially_frozen"?: PartiallyFrozen;
  "minecraft:replace_biomes"?: ReplaceBiomes;
  "minecraft:subsurface_builder"?: SurfaceBuilder;
  "minecraft:surface_material_adjustments"?: SurfaceMaterialAdjustments;
  "minecraft:surface_builder"?: SurfaceBuilder1;
  "minecraft:tags"?: Tags;
  "minecraft:village_type"?: VillageType;
}
/**
 * Describes temperature, humidity, precipitation, etc.  Biomes without this component will have default values.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "C".
 */
export interface Climate {
  downfall?: Downfall;
  snow_accumulation?: SnowAccumulation;
  temperature?: Temperature;
}
/**
 * Probability that creatures will spawn within the biome when a chunk is generated.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "D".
 */
export interface CreatureSpawnProbability {
  probability?: Probability;
}
/**
 * Forces a biome to ether always be humid or never humid. Humidity effects the spread chance, and spread rate of fire in the biome
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "E".
 */
export interface Humidity {
  is_humid: IsHumid;
}
/**
 * Sets the color grass and foliage will be tinted by in this biome on the map.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "F".
 */
export interface MapTints {
  grass: Grass;
  foliage?: Foliage;
}
/**
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "F_tint".
 */
export interface FTint {
  /**
   * Tint color used in this biome on the map.
   */
  tint: string | [number, number, number];
  type: GrassType;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "F_noise".
 */
export interface FNoise {
  type: GrassType1;
  [k: string]: unknown;
}
/**
 * Noise parameters used to drive mountain terrain generation in Overworld.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "G".
 */
export interface MountainParameters {
  steep_material_adjustment?: SteepMaterialAdjustment;
  top_slide?: TopSlide;
}
/**
 * Defines surface material for steep slopes.
 */
export interface SteepMaterialAdjustment {
  material?: Material;
  north_slopes?: NorthSlopes;
  south_slopes?: SouthSlopes;
  west_slopes?: WestSlopes;
  east_slopes?: EastSlopes;
}
export interface BlockReference {
  name?: BlockIdentifier1;
  states?: States;
  tags?: Molang;
}
export interface States {
  [k: string]: StateValue;
}
/**
 * Controls the density tapering that happens at the top of the world to prevent terrain from reaching too high.
 */
export interface TopSlide {
  enabled: Enabled;
}
/**
 * If false, top slide will be disabled. If true, other parameters will be taken into account
 */
export interface Enabled {
  [k: string]: unknown;
}
/**
 * Controls how this biome is instantiated (and then potentially modified) during world generation of the nether.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface NetherGenerationRules {
  target_temperature?: TargetTemperature;
  target_humidity?: TargetHumidity;
  target_altitude?: TargetAltitude;
  target_weirdness?: TargetWeirdness;
  weight?: Weight;
}
/**
 * Control how this biome is instantiated (and then potentially modified) during world generation of the overworld.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BB".
 */
export interface OverworldGenerationRules {
  hills_transformation?: HillsTransformation;
  mutate_transformation?: MutateTransformation;
  river_transformation?: RiverTransformation;
  shore_transformation?: ShoreTransformation;
  generate_for_climates?: GenerateForClimates;
}
/**
 * Noise parameters used to drive terrain height in the Overworld.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BC".
 */
export interface OverworldHeight {
  noise_params?: NoiseParams;
  noise_type?: NoiseType;
}
/**
 * Component will impact the temperature in a frozen biome, causing some areas to not be frozen. Ex: patchy ice, patchy snow
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface PartiallyFrozen {}
/**
 * Replaces a specified portion of one or more Minecraft biomes.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface ReplaceBiomes {
  /**
   * List of biome replacement configurations. Retroactively adding a new replacement to the front of this list will cause the world generation to change. Please add any new replacements to the end of the list.
   */
  replacements: BiomeReplacement[];
}
/**
 * Represents the replacement information used to determine the placement of the overriding biome.
 */
export interface BiomeReplacement {
  /**
   * Dimension in which this replacement can happen.
   */
  dimension: "minecraft:overworld" | "minecraft:nether";
  /**
   * Noise value used to determine whether or not the replacement is attempted, similar to a percentage. Must be in the range (0.0, 1.0].
   */
  amount: number;
  /**
   * Biomes that are going to be replaced by the overriding biome.
   *
   * @minItems 1
   */
  targets: [string, ...string[]];
  /**
   * Scaling value used to alter the frequency of replacement attempts. A lower frequency will mean a bigger contiguous biome area that occurs less often. A higher frequency will mean smaller contiguous biome areas that occur more often. Must be in the range (0.0, 100.0].
   */
  noise_frequency_scale: number;
  [k: string]: unknown;
}
/**
 * Allows specifying a `minecraft:surface_builder` to be applied to biomes located underneath the Overworld's terrain surface
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface SurfaceBuilder {
  builder: Builder;
}
/**
 * Specify fine-detail changes to blocks used in terrain generation (based on a noise function).
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface SurfaceMaterialAdjustments {
  adjustments?: Adjustments;
}
/**
 * The specific blocks used for this surface adjustment.
 */
export interface Adjustment {
  height_range?: HeightRange;
  materials?: Materials;
  noise_range?: NoiseRange;
  noise_frequency_scale?: NoiseFrequencyScale;
}
/**
 * The specific blocks used for this surface adjustment.
 */
export interface Materials {
  top_material?: BlockReference2;
  mid_material?: BlockReference3;
  sea_floor_material?: BlockReference4;
  foundation_material?: BlockReference5;
  sea_material?: BlockReference6;
}
export interface Min1 {
  [k: string]: unknown;
}
export interface Max1 {
  [k: string]: unknown;
}
/**
 * Controls the materials used for terrain generation.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BI".
 */
export interface SurfaceBuilder1 {
  builder: Builder1;
}
/**
 * Attach arbitrary string tags to this biome.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface Tags {
  tags: Tags1;
}
/**
 * Determines the type of village for the biome.
 *
 * This interface was referenced by `BiomeBehavior`'s JSON-Schema
 * via the `definition` "CA".
 */
export interface VillageType {
  type: Type;
}
