/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
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
 * The name of the Client Biome, used by other features like the '/locate biome' command. Must match the name of a Biome defined by the game or a behavior pack.
 */
export type Identifier = string;
/**
 * Named sound that occasionally plays at the listener position.
 */
export type Addition = string | CSoundAddition;
/**
 * Name of the sound asset to play
 */
export type Asset = string;
/**
 * Probability of the sound playing each interval, between 0.0 and 1.0
 */
export type Chance = number;
/**
 * Named sound that loops while the listener position is inside the biome.
 */
export type Loop = string;
/**
 * Named sound that rarely plays at a nearby air block position when the light level is low.
 */
export type Mood = string;
/**
 * Named sound that loops while the listener position is inside the biome and underwater.
 */
export type UnderwaterLoop = string;
/**
 * Named sound that rarely plays at a nearby water block position when the light level is low.
 */
export type UnderwaterMood = string;
/**
 * Identifier of atmosphere definition to use
 */
export type AtmosphereIdentifier1 = string;
/**
 * Music to be played when inside this biome. If left off or not found the default music will be determined by the dimension. Empty string will result in no music.
 */
export type MusicDefinition = string;
/**
 * Enables underwater music
 */
export type UnderwaterMusic = boolean;
/**
 * Multiplier temporarily and gradually applied to music volume when within this biome.
 */
export type VolumeMultiplier = number;
/**
 * Identifier of color_grading definition to use
 */
export type ColorGradingIdentifier1 = string;
/**
 * Identifier of cubemap definition to use
 */
export type CubemapIdentifier1 = string;
/**
 * RGB color of dry foliage
 */
export type Color = string | [] | [Red] | [Red, Green] | [Red, Green, Blue];
export type Red = number;
export type Green = number;
export type Blue = number;
/**
 * Identifier of fog definition to use.
 */
export type FogIdentifier = string;
/**
 * RGB color of foliage, or a Foliage Color Map object.
 */
export type Color1 =
  | string
  | [number, number, number]
  | {
      color_map: ColorMap;
    };
/**
 * Color map from textures/colormap to determine color of foliage.
 */
export type ColorMap = "birch" | "evergreen" | "foliage" | "mangrove_swamp_foliage" | "swamp_foliage";
/**
 * RGB color of grass, or a Grass Color Map object.
 */
export type Color2 =
  | string
  | [number, number, number]
  | {
      color_map: ColorMap1;
    };
/**
 * Color map from textures/colormap to determine color of grass.
 */
export type ColorMap1 = "grass" | "swamp_grass";
/**
 * Adds a shading effect to the grass as if there was a roof.
 */
export type GrassIsShaded = boolean;
/**
 * Identifier of lighting definition to use
 */
export type LightingIdentifier1 = string;
/**
 * RGB color of the sky.
 */
export type SkyColor1 = string;
/**
 * Density of ash precipitation visuals.
 */
export type Ash = number;
/**
 * Density of blue spore precipitation visuals.
 */
export type BlueSpores = number;
/**
 * Density of blue spore precipitation visuals.
 */
export type RedSpores = number;
/**
 * Density of white ash precipitation visuals.
 */
export type WhiteAsh = number;
/**
 * RGB color of the water surface.
 */
export type SurfaceColor = string;
/**
 * Opacity of the water surface (0 for invisible and 1 for opaque)
 */
export type SurfaceOpacity = number;
/**
 * Identifier of water definition to use
 */
export type WaterIdentifier1 = string;

/**
 * Minecraft client_biome files define client-side settings for biomes in resource packs. This is the new preferred location for per-biome settings that used to be in biomes_client.json.
 */
export interface ClientBiome {
  format_version: FormatVersion;
  "minecraft:client_biome": ClientBiomeDefinitions;
}
/**
 * A client biome definition.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "B".
 */
export interface ClientBiomeDefinitions {
  description: ClientBiomeDescription;
  components: Components;
}
/**
 * Contains non-component settings for a Client Biome.
 */
export interface ClientBiomeDescription {
  identifier: Identifier;
}
/**
 * Any components that this Client Biome uses.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "B_components_ref".
 */
export interface Components {
  "minecraft:ambient_sounds"?: AmbientSounds;
  "minecraft:atmosphere_identifier"?: AtmosphereIdentifier;
  "minecraft:biome_music"?: BiomeMusic;
  "minecraft:color_grading_identifier"?: ColorGradingIdentifier;
  "minecraft:cubemap_identifier"?: CubemapIdentifier;
  "minecraft:dry_foliage_color"?: DryFoliageColor;
  "minecraft:fog_appearance"?: FogAppearance;
  "minecraft:foliage_appearance"?: FoliageAppearance;
  "minecraft:grass_appearance"?: GrassAppearance;
  "minecraft:lighting_identifier"?: LightingIdentifier;
  "minecraft:sky_color"?: SkyColor;
  "minecraft:precipitation"?: Precipitation;
  "minecraft:water_appearance"?: WaterAppearance;
  "minecraft:water_identifier"?: WaterIdentifier;
}
/**
 * Sets the ambient sounds for the biome. These sounds must be in the 'individual_named_sounds' in a 'sounds.json' file.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "C".
 */
export interface AmbientSounds {
  addition?: Addition;
  loop?: Loop;
  mood?: Mood;
  underwater_addition?: UnderwaterAddition;
  underwater_loop?: UnderwaterLoop;
  underwater_mood?: UnderwaterMood;
}
/**
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "C_sound_addition".
 */
export interface CSoundAddition {
  asset?: Asset;
  chance?: Chance;
}
/**
 * Named sound that occasionally plays at the listener position when underwater.
 */
export interface UnderwaterAddition {
  asset?: Asset;
  chance?: Chance;
}
/**
 * Set the atmosphere settings used during deferred rendering.
 * Biomes without this component will have default atmosphere settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "D".
 */
export interface AtmosphereIdentifier {
  atmosphere_identifier: AtmosphereIdentifier1;
}
/**
 * Affects how music plays within the biome.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "E".
 */
export interface BiomeMusic {
  music_definition?: MusicDefinition;
  underwater_music?: UnderwaterMusic;
  volume_multiplier?: VolumeMultiplier;
}
/**
 * Set the color_grading settings used during deferred rendering.
 * Biomes without this component will have default color_grading settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "F".
 */
export interface ColorGradingIdentifier {
  color_grading_identifier: ColorGradingIdentifier1;
}
/**
 * Set the identifier used for cubemap in Vibrant Visuals mode. Identifiers must resolve to identifiers in valid Cubemap JSON schemas under the "cubemaps" directory. Biomes without this component will have default cubemap settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "G".
 */
export interface CubemapIdentifier {
  cubemap_identifier: CubemapIdentifier1;
}
/**
 * Set the dry foliage color used during rendering. Biomes without this component will have default dry foliage color behavior.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "H".
 */
export interface DryFoliageColor {
  color: Color;
}
/**
 * Set the fog settings used during rendering. Biomes without this component will have default fog settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "I".
 */
export interface FogAppearance {
  fog_identifier: FogIdentifier;
}
/**
 * Set the foliage color or color map used during rendering. Biomes without this component will have default foliage appearance.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "J".
 */
export interface FoliageAppearance {
  color: Color1;
}
/**
 * Set the grass color or color map used during rendering. Biomes without this component will have default grass appearance.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface GrassAppearance {
  color: Color2;
  grass_is_shaded?: GrassIsShaded;
}
/**
 * Set the lighting settings used during deferred rendering.
 * Biomes without this component will have default lighting settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BB".
 */
export interface LightingIdentifier {
  lighting_identifier: LightingIdentifier1;
}
/**
 * Set the sky color used during rendering. Biomes without this component will have default sky color behavior.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BC".
 */
export interface SkyColor {
  sky_color: SkyColor1;
}
/**
 * Describes the visuals for a biome's precipitation. Biomes without this component will have default values. At most one precipitation type can be set for a biome.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface Precipitation {
  ash?: Ash;
  blue_spores?: BlueSpores;
  red_spores?: RedSpores;
  white_ash?: WhiteAsh;
}
/**
 * Set the water surface color used during rendering. Biomes without this component will have default water surface color behavior.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface WaterAppearance {
  surface_color?: SurfaceColor;
  surface_opacity?: SurfaceOpacity;
}
/**
 * Set the water settings used during deferred rendering.
 * Biomes without this component will have default water settings.
 *
 * This interface was referenced by `ClientBiome`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface WaterIdentifier {
  water_identifier: WaterIdentifier1;
}
