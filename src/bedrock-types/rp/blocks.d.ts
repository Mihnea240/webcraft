/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Blocks`'s JSON-Schema
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
 * A version that tells Minecraft what type of data format can be expected when reading this file.
 *
 * @minItems 3
 * @maxItems 3
 */
export type FormatVersion1 = [number, number, number];
/**
 * This interface was referenced by `Blocks`'s JSON-Schema
 * via the `definition` "texture".
 */
export type Texture =
  | string
  | {
      down?: string;
      up?: string;
      side?: string;
      south?: string;
      north?: string;
      west?: string;
      east?: string;
    };
/**
 * Specifies the gamma brightness level to apply to the block texture.
 */
export type BrightnessGamma = number;
/**
 * Carried Textures.
 */
export type CarriedTextures =
  | string
  | {
      down?: string;
      up?: string;
      side?: string;
      south?: string;
      north?: string;
      west?: string;
      east?: string;
    };
/**
 * Marks if this block is isotropic or not, or which side are.
 */
export type Isotropic =
  | boolean
  | {
      down?: boolean;
      up?: boolean;
      side?: boolean;
      south?: boolean;
      north?: boolean;
      west?: boolean;
      east?: boolean;
    };
/**
 * The sound definition of this block.
 */
export type Sound = string;
/**
 * Textures.
 */
export type Textures =
  | string
  | {
      down?: string;
      up?: string;
      side?: string;
      south?: string;
      north?: string;
      west?: string;
      east?: string;
    };

/**
 * The minecraft block definition file.
 */
export interface Blocks {
  format_version?: FormatVersion | FormatVersion1;
  [k: string]: Block;
}
/**
 * Block texture definition.
 */
export interface Block {
  brightness_gamma?: BrightnessGamma;
  carried_textures?: CarriedTextures;
  isotropic?: Isotropic;
  sound?: Sound;
  textures?: Textures;
}
