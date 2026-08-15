/* Auto-generated from Blockception Bedrock Schemas */

/**
 * UNDOCUMENTED.
 */
export type ResourcePackName = string;
/**
 * This interface was referenced by `ItemTextureFile`'s JSON-Schema
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
 * UNDOCUMENTED.
 */
export type TintColor = string;
/**
 * A texture file.
 */
export type Path1 = string;
/**
 * UNDOCUMENTED.
 */
export type Weight = number;
/**
 * UNDOCUMENTED.
 */
export type Variantions = Variantion[];
/**
 * A collection of textures.
 */
export type TextureData2 = Texture[];

/**
 * UNDOCUMENTED.
 */
export interface ItemTextureFile {
  resource_pack_name?: ResourcePackName;
  texture_data?: TextureData;
  texture_name?: "atlas.items";
}
/**
 * UNDOCUMENTED.
 */
export interface TextureData {
  [k: string]: TextureData1;
}
/**
 * UNDOCUMENTED.
 */
export interface TextureData1 {
  textures?: Texture | TextureData2;
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
 * UNDOCUMENTED.
 */
export interface Variantion {
  path: Path1;
  weight?: Weight;
  [k: string]: unknown;
}
