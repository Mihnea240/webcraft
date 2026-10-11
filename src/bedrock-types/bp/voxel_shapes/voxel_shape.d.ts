/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `VoxelShape`'s JSON-Schema
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
 * Sets the identifier for this voxel shape. Used to reference this shape in the 'culling' property of the block geometry component.
 */
export type Identifier = string;
/**
 * A list of axis-aligned bounding boxes (AABBs) that make up the voxel shape. Each box is defined by a min and max position in pixel coordinates (1 block = 16 pixels). Maximum of 32 boxes. Each box must overlap with the main 16x16x16 block region by at least 1 pixel.
 *
 * @minItems 1
 * @maxItems 32
 */
export type Boxes = [Box, ...Box[]];
/**
 * The minimum (lower) corner of the bounding box in pixel coordinates [x, y, z]. Values must be in the range -30 to 30.
 *
 * @minItems 3
 * @maxItems 3
 */
export type Min = [X, Y, Z];
export type X = number;
export type Y = number;
export type Z = number;
/**
 * The maximum (upper) corner of the bounding box in pixel coordinates [x, y, z]. Values must be in the range -30 to 30 and must be greater than the corresponding min values.
 *
 * @minItems 3
 * @maxItems 3
 */
export type Max = [X1, Y1, Z1];
export type X1 = number;
export type Y1 = number;
export type Z1 = number;
/**
 * The minecraft voxel shape identifier.
 *
 * This interface was referenced by `VoxelShape`'s JSON-Schema
 * via the `definition` "B".
 */
export type VoxelShapeIdentifier = string;

/**
 * A behavior pack file that defines the voxel shape used for collision and culling of a custom block. Voxel shapes use pixel coordinates (1 block = 16 pixels) and can be referenced by the block geometry component's 'culling' property.
 */
export interface VoxelShape {
  format_version: FormatVersion;
  "minecraft:voxel_shape": VoxelShape1;
}
/**
 * The voxel shape definition, containing a description and shape data.
 */
export interface VoxelShape1 {
  description: Description;
  shape: Shape;
}
/**
 * Contains the identifier used to refer to this voxel shape.
 */
export interface Description {
  identifier: Identifier;
}
/**
 * The shape data for this voxel shape, consisting of one or more axis-aligned bounding boxes.
 */
export interface Shape {
  boxes: Boxes;
}
/**
 * An axis-aligned bounding box defined by its min and max corners in pixel coordinates.
 */
export interface Box {
  min: Min;
  max: Max;
}
