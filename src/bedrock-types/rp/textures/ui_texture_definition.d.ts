/* Auto-generated from Blockception Bedrock Schemas */

/**
 * The file that specifies either 9slice texture or Aseprite flipbook.
 */
export type UITextureFile = Type9SliceTextureFile | AsepriteFlipbookFile;
export type Type9SliceOffsets = number | [number, number, number, number];
/**
 * Width and height of the texture (in this exact order).
 *
 * @minItems 2
 * @maxItems 2
 */
export type SizeOfTheTexture = [number, number];
/**
 * The width of the sprite sheet.
 */
export type Width = number;
/**
 * The height of the sprite sheet.
 */
export type Height = number;
/**
 * The path to the sprite sheet. The value is required, but not used.
 */
export type Image = string;
/**
 * The duration of the frame in milliseconds.
 */
export type Duration = number;
/**
 * The x position of the frame in the sprite sheet.
 */
export type X = number;
/**
 * The y position of the frame in the sprite sheet.
 */
export type Y = number;
/**
 * The frames of the flipbook.
 */
export type Frames = Frame[];

/**
 * The file that specifies 9Slice textures.
 */
export interface Type9SliceTextureFile {
  nineslice_size?: Type9SliceOffsets;
  base_size?: SizeOfTheTexture;
}
/**
 * The file that specifies Aseprite/libresprite flipbook animation.
 */
export interface AsepriteFlipbookFile {
  meta: Meta;
  frames: Frames;
}
/**
 * The meta data of the flipbook.
 */
export interface Meta {
  size: Size;
  image: Image;
  [k: string]: unknown;
}
/**
 * The size of the flipbook sprite sheet.
 */
export interface Size {
  w: Width;
  h: Height;
  [k: string]: unknown;
}
/**
 * A frame of the flipbook.
 */
export interface Frame {
  duration: Duration;
  frame: Frame1;
  [k: string]: unknown;
}
/**
 * The position of the frame in the sprite sheet (UV).
 */
export interface Frame1 {
  x: X;
  y: Y;
  [k: string]: unknown;
}
