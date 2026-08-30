/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "A_uv".
 */
export type AUv = [] | [X] | [X, Y];
/**
 * The x component of the uv.
 */
export type X = number;
/**
 * The y component of the uv.
 */
export type Y = number;
/**
 * Specifies the uv origin for the face. For this face, it is the upper-left corner, when looking at the face with y being up.
 */
export type Uv = [] | [X] | [X, Y];
/**
 * The face maps this many texels from the uv origin. If not specified, the box dimensions are used instead.
 */
export type UvSize = [] | [X] | [X, Y];
/**
 * Specifies the UV's for the face that stretches.
 */
export type MaterialInstance = string;
/**
 * Specifies an optional rotation for the specified UV rect in 90-degree clockwise increments before applying it to a geometry cube face. If not specified, no rotation will be applied.
 */
export type UvRotation = 90 | 180 | 270;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "B".
 */
export type FormatVersion = B & B1;
export type B =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type B1 = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "C".
 */
export type Molang = string;
/**
 * UNDOCUMENTED.
 */
export type Debug = boolean;
/**
 * The collection of geometries.
 *
 * @minItems 1
 */
export type Geometry = [Model, ...Model[]];
/**
 * Entity definition and Client Block definition files refer to this geometry via this identifier.
 */
export type Identifier = string;
/**
 * Assumed width in texels of the texture that will be bound to this geometry.
 */
export type TextureWidth = number;
/**
 * Assumed height in texels of the texture that will be bound to this geometry.
 */
export type TextureHeight = number;
/**
 * Offset of the visibility bounding box from the entity location point (in model space units).
 *
 * @minItems 3
 * @maxItems 3
 */
export type VisibleBoundsOffset = [number, number, number];
/**
 * Width of the visibility bounding box (in model space units).
 */
export type VisibleBoundsWidth = number;
/**
 * Height of the visible bounding box (in model space units).
 */
export type VisibleBoundsHeight = number;
/**
 * useful for items. A molang expression specifying the bone name of the parent skeletal hierarchy that this bone should use as the root transform. Without this field it will look for a bone in the parent entity with the same name as this bone. If both are missing, it will assume a local skeletal hierarchy (via the `parent` field). If that is also missing, it will attach to the owning entity's root transform.
 */
export type Binding = string;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Pivot = [] | [X1] | [X1, Y1] | [X1, Y1, Z];
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type X1 = number;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Y1 = number;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Z = number;
/**
 * UNDOCUMENTED.
 */
export type Reset = boolean;
/**
 * @minItems 3
 * @maxItems 3
 */
export type Rotation = [number, number, number];
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Size = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type X2 = number;
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Y2 = number;
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Z1 = number;
/**
 * This is an alternate per-face uv mapping which specifies each face of the cube. Omitting a face will cause that face to not get drawn.
 */
export type Uv1 =
  | {
      north?: North;
      south?: South;
      east?: East;
      west?: West;
      up?: Up;
      down?: Down;
    }
  | []
  | [X3]
  | [X3, Y3];
/**
 * The x component of the uv.
 */
export type X3 = number;
/**
 * The y component of the uv.
 */
export type Y3 = number;
/**
 * This is the list of cubes associated with this bone.
 */
export type Cubes = {
  /**
   * Grow this box by this additive amount in all directions (in model space units), this field overrides the bone's inflate field for this cube only.
   */
  inflate?: number;
  /**
   * Mirrors this cube about the unrotated x axis (effectively flipping the east / west faces), overriding the bone's `mirror` setting for this cube.
   */
  mirror?: boolean;
  /**
   * @minItems 3
   * @maxItems 3
   */
  origin?: [number, number, number];
  pivot?: Pivot;
  reset?: Reset;
  rotation?: Rotation;
  size?: Size;
  uv?: Uv1;
}[];
/**
 * Mirrors the UV's of the unrotated cubes along the x axis, also causes the east/west faces to get flipped.
 */
export type Mirror = boolean;
/**
 * Animation files refer to this bone via this identifier.
 */
export type Name = string;
/**
 * Bone that this bone is relative to. If the parent bone moves, this bone will move along with it.
 */
export type Parent = string;
/**
 * The bone pivots around this point (in model space units).
 */
export type Pivot1 = [] | [X4] | [X4, Y4] | [X4, Y4, Z2];
export type X4 = number;
export type Y4 = number;
export type Z2 = number;
/**
 * This is the initial rotation of the bone around the pivot, pre-animation (in degrees, x-then-y-then-z order).
 */
export type Rotation1 = [] | [X5] | [X5, Y5] | [X5, Y5, Z3];
/**
 * in degrees.
 */
export type X5 = number;
/**
 * in degrees.
 */
export type Y5 = number;
/**
 * in degrees.
 */
export type Z3 = number;
/**
 * Controls how geometry depth relates to texture resolution
 */
export type UsePixelDepth = boolean;
/**
 * Adds a mesh to the bone's geometry by converting texels in a texture into boxes.
 */
export type TextureMeshes = {
  /**
   * The pivot point on the texture (in *texture space* not entity or bone space) of the texture geometry.
   *
   * @minItems 3
   * @maxItems 3
   */
  local_pivot?: [number, number, number];
  /**
   * The position of the pivot point after rotation (in *entity space* not texture or bone space) of the texture geometry.
   *
   * @minItems 3
   * @maxItems 3
   */
  position?: [number, number, number];
  /**
   * The rotation (in degrees) of the texture geometry relative to the offset.
   *
   * @minItems 3
   * @maxItems 3
   */
  rotation?: [number, number, number];
  /**
   * The scale (in degrees) of the texture geometry relative to the offset.
   *
   * @minItems 3
   * @maxItems 3
   */
  scale?: [number, number, number];
  /**
   * The friendly-named texture to use.
   */
  texture: string;
  use_pixel_depth?: UsePixelDepth;
}[];
/**
 * Bones define the `skeleton` of the mob: the parts that can be animated, and to which geometry and other bones are attached.
 */
export type Bones = {
  binding?: Binding;
  cubes?: Cubes;
  debug?: boolean;
  /**
   * Grow this box by this additive amount in all directions (in model space units).
   */
  inflate?: number;
  /**
   * This is a list of locators associated with this bone. A locator is a point in model space that tracks a particular bone as the bone animates (by maintaining it's relationship to the bone through the animation).
   */
  locators?: {
    [k: string]:
      | {
          /**
           * Position of the locator in model space.
           *
           * @minItems 3
           * @maxItems 3
           */
          offset: [number, number, number];
          /**
           * Rotation of the locator in model space.
           *
           * @minItems 3
           * @maxItems 3
           */
          rotation: [number, number, number];
          /**
           * Discard scale inherited from parent bone.
           */
          ignore_inherited_scale?: boolean;
          [k: string]: unknown;
        }
      | [number, number, number];
  };
  mirror?: Mirror;
  name: Name;
  parent?: Parent;
  pivot?: Pivot1;
  /**
   * A triangle or quad mesh object. Can be used in conjunction with cubes and texture geometry.
   */
  poly_mesh?: {
    /**
     * If true, UVs are assumed to be [0-1]. If false, UVs are assumed to be [0-texture_width] and [0-texture_height] respectively.
     */
    normalized_uvs?: boolean;
    /**
     * Vertex normals. Can be either indexed via the `polys` section, or be a quad-list if mapped 1-to-1 to the positions and UVs sections.
     */
    normals?: [number, number, number][];
    polys:
      | ("tri_list" | "quad_list")
      | [[number, number, number], [number, number, number], [number, number, number]]
      | [[number, number, number], [number, number, number], [number, number, number], [number, number, number]][];
    positions?: [number, number, number][];
    /**
     * Vertex UVs. Can be either indexed via the `polys` section, or be a quad-list if mapped 1-to-1 to the positions and normals sections.
     */
    uvs?: [number, number][];
  };
  render_group_id?: number;
  rotation?: Rotation1;
  texture_meshes?: TextureMeshes;
}[];
/**
 * UNDOCUMENTED.
 */
export type Cape = string;
/**
 * UNDOCUMENTED.
 */
export type Debug1 = boolean;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type Type180FormatVersion = string;
/**
 * UNDOCUMENTED.
 */
export type NormalizedUvs = boolean;
/**
 * UNDOCUMENTED.
 */
export type Positions = [] | [number] | [number, number] | [number, number, number];
/**
 * UNDOCUMENTED.
 */
export type Normals = [] | [number] | [number, number] | [number, number, number];
/**
 * UNDOCUMENTED.
 */
export type Polys = [number, number, number] | [number, number, number, unknown][];
/**
 * UNDOCUMENTED.
 */
export type RenderGroupId = number;
/**
 * UNDOCUMENTED.
 */
export type Reset1 = boolean;
/**
 * UNDOCUMENTED.
 */
export type Rotation2 = [] | [number] | [number, number] | [number, number, number];
/**
 * Controls how geometry depth relates to texture resolution
 */
export type UsePixelDepth1 = boolean;
/**
 * UNDOCUMENTED.
 */
export type TextureMeshes1 = {
  texture?: string;
  local_pivot?: [] | [number] | [number, number] | [number, number, number];
  position?: [] | [number] | [number, number] | [number, number, number];
  rotation?: [] | [number] | [number, number] | [number, number, number];
  scale?: [] | [number] | [number, number] | [number, number, number];
  use_pixel_depth?: UsePixelDepth1;
}[];
/**
 * The bones definitions.
 */
export type Bones1 = Bone[];
/**
 * UNDOCUMENTED.
 */
export type Cape1 = string;
/**
 * UNDOCUMENTED.
 */
export type Debug2 = boolean;
/**
 * UNDOCUMENTED: texturewidth.
 */
export type Texturewidth = number;
/**
 * UNDOCUMENTED: textureheight.
 */
export type Textureheight = number;
/**
 * UNDOCUMENTED: visible bounds width.
 */
export type VisibleBoundsWidth1 = number;
/**
 * UNDOCUMENTED: visible bounds height.
 */
export type VisibleBoundsHeight1 = number;
/**
 * UNDOCUMENTED: visible bounds offset.
 */
export type VisibleBoundsOffset1 = [] | [number] | [number, number] | [number, number, number];
/**
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "E_uv".
 */
export type EUv = [] | [X6] | [X6, Y6];
/**
 * The x component of the uv.
 */
export type X6 = number;
/**
 * The y component of the uv.
 */
export type Y6 = number;
/**
 * Specifies the uv origin for the face. For this face, it is the upper-left corner, when looking at the face with y being up.
 */
export type Uv2 = [] | [X6] | [X6, Y6];
/**
 * The face maps this many texels from the uv origin. If not specified, the box dimensions are used instead.
 */
export type UvSize1 = [] | [X6] | [X6, Y6];
/**
 * Specifies the UV's for the face that stretches.
 */
export type MaterialInstance1 = string;
/**
 * UNDOCUMENTED.
 */
export type Debug3 = boolean;
/**
 * The collection of geometries.
 *
 * @minItems 1
 */
export type Geometry2 = [Model1, ...Model1[]];
/**
 * Entity definition and Client Block definition files refer to this geometry via this identifier.
 */
export type Identifier1 = string;
/**
 * Assumed width in texels of the texture that will be bound to this geometry.
 */
export type TextureWidth1 = number;
/**
 * Assumed height in texels of the texture that will be bound to this geometry.
 */
export type TextureHeight1 = number;
/**
 * Offset of the visibility bounding box from the entity location point (in model space units).
 *
 * @minItems 3
 * @maxItems 3
 */
export type VisibleBoundsOffset2 = [number, number, number];
/**
 * Width of the visibility bounding box (in model space units).
 */
export type VisibleBoundsWidth2 = number;
/**
 * Height of the visible bounding box (in model space units).
 */
export type VisibleBoundsHeight2 = number;
/**
 * useful for items. A molang expression specifying the bone name of the parent skeletal hierarchy that this bone should use as the root transform. Without this field it will look for a bone in the parent entity with the same name as this bone. If both are missing, it will assume a local skeletal hierarchy (via the `parent` field). If that is also missing, it will attach to the owning entity's root transform.
 */
export type Binding1 = string;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Pivot2 = [] | [X7] | [X7, Y7] | [X7, Y7, Z4];
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type X7 = number;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Y7 = number;
/**
 * If this field is specified, rotation of this cube occurs around this point, otherwise its rotation is around the center of the box. Note that in 1.12 this is flipped upside-down, but is fixed in 1.14.
 */
export type Z4 = number;
/**
 * UNDOCUMENTED.
 */
export type Reset2 = boolean;
/**
 * @minItems 3
 * @maxItems 3
 */
export type Rotation3 = [number, number, number];
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Size1 = [] | [X8] | [X8, Y8] | [X8, Y8, Z5];
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type X8 = number;
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Y8 = number;
/**
 * The cube extends this amount relative to its origin (in model space units).
 */
export type Z5 = number;
/**
 * This is an alternate per-face uv mapping which specifies each face of the cube. Omitting a face will cause that face to not get drawn.
 */
export type Uv3 =
  | {
      north?: North1;
      south?: South1;
      east?: East1;
      west?: West1;
      up?: Up1;
      down?: Down1;
    }
  | []
  | [X9]
  | [X9, Y9];
/**
 * The x component of the uv.
 */
export type X9 = number;
/**
 * The y component of the uv.
 */
export type Y9 = number;
/**
 * This is the list of cubes associated with this bone.
 */
export type Cubes1 = {
  /**
   * Grow this box by this additive amount in all directions (in model space units), this field overrides the bone's inflate field for this cube only.
   */
  inflate?: number;
  /**
   * Mirrors this cube about the unrotated x axis (effectively flipping the east / west faces), overriding the bone's `mirror` setting for this cube.
   */
  mirror?: boolean;
  /**
   * @minItems 3
   * @maxItems 3
   */
  origin?: [number, number, number];
  pivot?: Pivot2;
  reset?: Reset2;
  rotation?: Rotation3;
  size?: Size1;
  uv?: Uv3;
}[];
/**
 * Mirrors the UV's of the unrotated cubes along the x axis, also causes the east/west faces to get flipped.
 */
export type Mirror1 = boolean;
/**
 * Animation files refer to this bone via this identifier.
 */
export type Name1 = string;
/**
 * Bone that this bone is relative to. If the parent bone moves, this bone will move along with it.
 */
export type Parent1 = string;
/**
 * The bone pivots around this point (in model space units).
 */
export type Pivot3 = [] | [X10] | [X10, Y10] | [X10, Y10, Z6];
export type X10 = number;
export type Y10 = number;
export type Z6 = number;
/**
 * This is the initial rotation of the bone around the pivot, pre-animation (in degrees, x-then-y-then-z order).
 */
export type Rotation4 = [] | [X11] | [X11, Y11] | [X11, Y11, Z7];
/**
 * in degrees.
 */
export type X11 = number;
/**
 * in degrees.
 */
export type Y11 = number;
/**
 * in degrees.
 */
export type Z7 = number;
/**
 * Controls how geometry depth relates to texture resolution
 */
export type UsePixelDepth2 = boolean;
/**
 * Adds a mesh to the bone's geometry by converting texels in a texture into boxes.
 */
export type TextureMeshes2 = {
  /**
   * The pivot point on the texture (in *texture space* not entity or bone space) of the texture geometry.
   *
   * @minItems 3
   * @maxItems 3
   */
  local_pivot?: [number, number, number];
  /**
   * The position of the pivot point after rotation (in *entity space* not texture or bone space) of the texture geometry.
   *
   * @minItems 3
   * @maxItems 3
   */
  position?: [number, number, number];
  /**
   * The rotation (in degrees) of the texture geometry relative to the offset.
   *
   * @minItems 3
   * @maxItems 3
   */
  rotation?: [number, number, number];
  /**
   * The scale (in degrees) of the texture geometry relative to the offset.
   *
   * @minItems 3
   * @maxItems 3
   */
  scale?: [number, number, number];
  /**
   * The friendly-named texture to use.
   */
  texture: string;
  use_pixel_depth?: UsePixelDepth2;
}[];
/**
 * Bones define the `skeleton` of the mob: the parts that can be animated, and to which geometry and other bones are attached.
 */
export type Bones2 = {
  binding?: Binding1;
  cubes?: Cubes1;
  debug?: boolean;
  /**
   * Grow this box by this additive amount in all directions (in model space units).
   */
  inflate?: number;
  /**
   * This is a list of locators associated with this bone. A locator is a point in model space that tracks a particular bone as the bone animates (by maintaining it's relationship to the bone through the animation).
   */
  locators?: {
    [k: string]:
      | {
          /**
           * Position of the locator in model space.
           *
           * @minItems 3
           * @maxItems 3
           */
          offset: [number, number, number];
          /**
           * Rotation of the locator in model space.
           *
           * @minItems 3
           * @maxItems 3
           */
          rotation: [number, number, number];
          /**
           * Discard scale inherited from parent bone.
           */
          ignore_inherited_scale?: boolean;
          [k: string]: unknown;
        }
      | [number, number, number];
  };
  mirror?: Mirror1;
  name: Name1;
  parent?: Parent1;
  pivot?: Pivot3;
  /**
   * A triangle or quad mesh object. Can be used in conjunction with cubes and texture geometry.
   */
  poly_mesh?: {
    /**
     * If true, UVs are assumed to be [0-1]. If false, UVs are assumed to be [0-texture_width] and [0-texture_height] respectively.
     */
    normalized_uvs?: boolean;
    /**
     * Vertex normals. Can be either indexed via the `polys` section, or be a quad-list if mapped 1-to-1 to the positions and UVs sections.
     */
    normals?: [number, number, number][];
    polys:
      | ("tri_list" | "quad_list")
      | [[number, number, number], [number, number, number], [number, number, number]]
      | [[number, number, number], [number, number, number], [number, number, number], [number, number, number]][];
    positions?: [number, number, number][];
    /**
     * Vertex UVs. Can be either indexed via the `polys` section, or be a quad-list if mapped 1-to-1 to the positions and normals sections.
     */
    uvs?: [number, number][];
  };
  render_group_id?: number;
  rotation?: Rotation4;
  texture_meshes?: TextureMeshes2;
}[];
/**
 * UNDOCUMENTED.
 */
export type Cape2 = string;

export interface BlockceptionMinecraftResourceModel {
  [k: string]: unknown;
}
/**
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "A_direction_uv".
 */
export interface ADirectionUv {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "A_display_transform".
 */
export interface ADisplayTransform {
  [k: string]: unknown;
}
/**
 * The minecraft resourcepack model schema for 1.21.0
 *
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "A".
 */
export interface Geometry1210 {
  debug?: Debug;
  format_version: FormatVersion;
  "minecraft:geometry": Geometry;
}
/**
 * Model specification.
 */
export interface Model {
  description: Description;
  bones?: Bones;
  cape?: Cape;
  item_display_transforms?: ItemDisplayTransforms;
}
/**
 * The descriptions of the geometry.
 */
export interface Description {
  identifier: Identifier;
  texture_width?: TextureWidth;
  texture_height?: TextureHeight;
  visible_bounds_offset?: VisibleBoundsOffset;
  visible_bounds_width?: VisibleBoundsWidth;
  visible_bounds_height?: VisibleBoundsHeight;
}
/**
 * Specifies the UV's for the face that stretches along the x and y axes, and faces the -z axis.
 */
export interface North {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * Specifies the UV's for the face that stretches along the x and y axes, and faces the z axis.
 */
export interface South {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * Specifies the UV's for the face that stretches along the z and y axes, and faces the x axis.
 */
export interface East {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * Specifies the UV's for the face that stretches along the z and y axes, and faces the -x axis.
 */
export interface West {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * Specifies the UV's for the face that stretches along the x and z axes, and faces the y axis.
 */
export interface Up {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
/**
 * Specifies the UV's for the face that stretches along the x and z axes, and faces the -y axis.
 */
export interface Down {
  uv?: Uv;
  uv_size?: UvSize;
  material_instance?: MaterialInstance;
  uv_rotation?: UvRotation;
}
export interface ItemDisplayTransforms {
  gui?: ADisplayTransform;
  firstperson_righthand?: ADisplayTransform;
  firstperson_lefthand?: ADisplayTransform;
  thirdperson_righthand?: ADisplayTransform;
  thirdperson_lefthand?: ADisplayTransform;
  ground?: ADisplayTransform;
  fixed?: ADisplayTransform;
  head?: ADisplayTransform;
  embedded?: ADisplayTransform;
  shelf?: ADisplayTransform;
  [k: string]: unknown;
}
/**
 * UNDOCUMENTED.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "D".
 */
export interface ModelSchemaFor180 {
  debug?: Debug1;
  format_version: Type180FormatVersion;
  [k: string]: Geometry1;
}
/**
 * Geometry specification.
 */
export interface Geometry1 {
  bones?: Bones1;
  cape?: Cape1;
  debug?: Debug2;
  texturewidth?: Texturewidth;
  textureheight?: Textureheight;
  visible_bounds_width?: VisibleBoundsWidth1;
  visible_bounds_height?: VisibleBoundsHeight1;
  visible_bounds_offset?: VisibleBoundsOffset1;
}
/**
 * The bone definition.
 */
export interface Bone {
  bind_pose_rotation?: [] | [number] | [number, number] | [number, number, number];
  cubes?: {
    inflate?: number;
    mirror?: boolean;
    origin?: [] | [number] | [number, number] | [number, number, number];
    size?: [] | [number] | [number, number] | [number, number, number];
    uv?: [] | [number] | [number, number];
  }[];
  debug?: boolean;
  inflate?: number;
  locators?: {
    [k: string]: number[];
  };
  mirror?: boolean;
  name: string;
  neverRender?: boolean;
  parent?: string;
  pivot?: [] | [number] | [number, number] | [number, number, number];
  poly_mesh?: PolyMesh;
  render_group_id?: RenderGroupId;
  reset?: Reset1;
  rotation?: Rotation2;
  texture_meshes?: TextureMeshes1;
}
/**
 * UNDOCUMENTED.
 */
export interface PolyMesh {
  normalized_uvs?: NormalizedUvs;
  positions?: Positions;
  normals?: Normals;
  polys: Polys;
}
/**
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "E_direction_uv".
 */
export interface EDirectionUv {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * The minecraft resourcepack model schema for 1.16.0
 *
 * This interface was referenced by `BlockceptionMinecraftResourceModel`'s JSON-Schema
 * via the `definition` "E".
 */
export interface Geometry1160 {
  debug?: Debug3;
  format_version: FormatVersion;
  "minecraft:geometry": Geometry2;
}
/**
 * Model specification.
 */
export interface Model1 {
  description: Description1;
  bones?: Bones2;
  cape?: Cape2;
}
/**
 * The descriptions of the geometry.
 */
export interface Description1 {
  identifier: Identifier1;
  texture_width?: TextureWidth1;
  texture_height?: TextureHeight1;
  visible_bounds_offset?: VisibleBoundsOffset2;
  visible_bounds_width?: VisibleBoundsWidth2;
  visible_bounds_height?: VisibleBoundsHeight2;
}
/**
 * Specifies the UV's for the face that stretches along the x and y axes, and faces the -z axis.
 */
export interface North1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * Specifies the UV's for the face that stretches along the x and y axes, and faces the z axis.
 */
export interface South1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * Specifies the UV's for the face that stretches along the z and y axes, and faces the x axis.
 */
export interface East1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * Specifies the UV's for the face that stretches along the z and y axes, and faces the -x axis.
 */
export interface West1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * Specifies the UV's for the face that stretches along the x and z axes, and faces the y axis.
 */
export interface Up1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
/**
 * Specifies the UV's for the face that stretches along the x and z axes, and faces the -y axis.
 */
export interface Down1 {
  uv?: Uv2;
  uv_size?: UvSize1;
  material_instance?: MaterialInstance1;
}
