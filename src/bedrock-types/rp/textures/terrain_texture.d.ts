/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * Sets the number of mipmap levels for reducing texture quality at varying distances. More mipmap levels means reduced texture quality at farther distances.
 */
export type NumMipLevels = number;
/**
 * Adds buffer space to prevent textures from bleeding into each other.
 */
export type Padding = number;
/**
 * The name of your resource pack, which should match the name in this pack's manifest.
 */
export type ResourcePackName = string;
/**
 * This interface was referenced by `TerrainTextureFile`'s JSON-Schema
 * via the `definition` "texture".
 */
export type Texture = Texture1 | Texture2;
/**
 * A texture file.
 */
export type Texture1 = string;
/**
 * A texture file.
 */
export type Path = string;
/**
 * The tint color to be applied to the texture.
 */
export type TintColor = string;
/**
 * A texture file.
 */
export type Path1 = string;
/**
 * The weight of the texture.
 */
export type Weight = number;
/**
 * The possible variations to use for this texture.
 */
export type Variantions = Variantion[];

/**
 * An collection of texture definitions.
 */
export interface TerrainTextureFile {
  num_mip_levels?: NumMipLevels;
  padding?: Padding;
  resource_pack_name?: ResourcePackName;
  texture_data?: TextureData;
  texture_name?: "atlas.terrain";
}
/**
 * A JSON object with shortnames and texture data.
 */
export interface TextureData {
  [k: string]: TextureData1;
}
/**
 * Describes the texture, including properties like the path to the texture.
 */
export interface TextureData1 {
  textures?: Texture | Texture[];
  [k: string]: unknown;
}
/**
 * A collection of texture files.
 */
export interface Texture2 {
  overlay_color?: OverlayColor;
  path?: Path;
  tint_color?: TintColor;
  variations?: Variantions;
}
/**
 * The color to apply to the texture.
 */
export interface OverlayColor {
  [k: string]: unknown;
}
/**
 * One of the variations, specified along with a possible weight.
 */
export interface Variantion {
  path: Path1;
  weight?: Weight;
  [k: string]: unknown;
}
