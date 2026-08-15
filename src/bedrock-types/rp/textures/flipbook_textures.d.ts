/* Auto-generated from Blockception Bedrock Schemas */

/**
 * The index of the texture array inside the definition of that shortname.
 */
export type AtlasIndex = number;
/**
 * The shortname defined in the terrain_texture JSON file.
 */
export type AtlasTitle = string;
/**
 * The variant of the block's texture array inside the shortname's block variation.
 */
export type AtlasTileVariant = number;
/**
 * Whether or not Minecraft should interpolate between frames.
 */
export type BlendFrames = boolean;
/**
 * A texture file.
 */
export type FlipbookTexture1 = string;
/**
 * The index of the frame.
 */
export type FrameIndex = number;
/**
 * The order in which frame indices to display. Duplicate frames are allowed.
 */
export type Frames = FrameIndex[];
/**
 * Sets the size of pixels.
 */
export type Replicate = number;
/**
 * The amount of ticks to wait between frames.
 */
export type TicksPerFrame = number;
/**
 * The file that specifies animated textures.
 */
export type FlipbookTextureFile = FlipbookTexture[];

/**
 * A single flipbook texture.
 */
export interface FlipbookTexture {
  atlas_index?: AtlasIndex;
  atlas_tile?: AtlasTitle;
  atlas_tile_variant?: AtlasTileVariant;
  blend_frames?: BlendFrames;
  flipbook_texture?: FlipbookTexture1;
  frames?: Frames;
  replicate?: Replicate;
  ticks_per_frame?: TicksPerFrame;
}
