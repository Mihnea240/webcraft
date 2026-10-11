/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type FormatVersion = "1.16.100" | "1.21.30";
/**
 * This is an RGB 3-channel image (defaults to uniform alpha of 1.0), or an RGBA 4-channel image, or a 4 value array for a uniform color with alpha.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "color".
 */
export type Color = FileName | Rgba;
/**
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "file_name".
 */
export type FileName = string;
/**
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "rgba".
 */
export type Rgba = string | [number, number, number, number];
/**
 * 1-channel layer image or a single value in this JSON file for a uniform heightmap. This layer and the "normal" layer should not both be defined at the same time.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "heightmap".
 */
export type Heightmap = FileName | number;
/**
 * This is a 3-channel image (or 4-channel where the 4th channel is ignored) or a 3-value array for a uniform MER. RGB images map Red to Metalness, Green to Emissive, and Blue to Roughness.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "mer".
 */
export type MetalnessEmissiveRoughness = FileName | Rgb;
/**
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "rgb".
 */
export type Rgb = string | [number, number, number];
/**
 * This is a 4-channel image or a 4-value array for a uniform MERS. RGBA images map Red to Metalness, Green to Emissive, Blue to Roughness and Alpha to Subsurface.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "mers".
 */
export type MetalnessEmissiveRoughnessSubsurface = FileName | Rgba;
/**
 * This is a 3-channel normal map image (or 4-channel where the 4th channel is ignored). This layer and the "heightmap" layer should not both be defined at the same time.
 */
export type NormalMap = string;
/**
 * This is a 3-channel normal map image (or 4-channel where the 4th channel is ignored). This layer and the "heightmap" layer should not both be defined at the same time.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceTextureTextureSet`'s JSON-Schema
 * via the `definition` "normal".
 */
export type NormalMap1 = string;

export interface BlockceptionMinecraftResourceTextureTextureSet {
  format_version: FormatVersion;
  "minecraft:texture_set": TextureSet;
}
/**
 * Texture Sets are used to define multiple PBR layers for a texture resource.
 */
export interface TextureSet {
  color: Color;
  heightmap?: Heightmap;
  metalness_emissive_roughness?: MetalnessEmissiveRoughness;
  metalness_emissive_roughness_subsurface?: MetalnessEmissiveRoughnessSubsurface;
  normal?: NormalMap;
}
