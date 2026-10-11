/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * Allows a block to use experimental features.
 */
export type UseBetaFeatures = boolean;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
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
 * The identifier for this block. The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla block.
 */
export type Identifier = string;
/**
 * Determines which category this block/item will be placed under in the inventory and crafting table container screens.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "FB".
 */
export type Category = "construction" | "equipment" | "items" | "nature" | "none";
/**
 * A translation string of an existing group in minecraft to group this block/item under
 */
export type Group = string;
/**
 * Determines whether or not this item can be used with commands such as /give and /setblock. Commands can use blocks by default
 */
export type IsHiddenInCommands = boolean;
/**
 * The key defines the name of a state, which must be properly namespaced. Each value is an array that contains all of the possible values of that state or an object defining a range of integers.
 */
export type State = EF | EG;
/**
 * @minItems 1
 * @maxItems 16
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EF".
 */
export type EF = EF1 & EF2;
export type EF1 = BooleanStateValue[] | IntegerStateValue[] | StringStateValue[];
export type BooleanStateValue = boolean;
export type IntegerStateValue = number;
export type StringStateValue = string;
export type EF2 =
  | [
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ]
  | [
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      },
      {
        [k: string]: unknown;
      }
    ];
/**
 * The lowest integer this state supports. This is also used as the default state value.
 */
export type Minimum = number;
/**
 * The highest integer this state supports. This cannot be more than 15 above the minimum.
 */
export type Maximum = number;
/**
 * Block states you wish to enable
 *
 * @minItems 1
 */
export type EnabledStates = ["minecraft:cardinal_connections", ..."minecraft:cardinal_connections"[]];
/**
 * Block states you wish to enable
 *
 * @minItems 1
 */
export type EnabledStates1 = [
  (
    | "minecraft:cardinal_direction"
    | "minecraft:facing_direction"
    | "minecraft:corner_and_cardinal_direction"
    | "minecraft:sixteen_way_rotation"
  ),
  ...(
    | "minecraft:cardinal_direction"
    | "minecraft:facing_direction"
    | "minecraft:corner_and_cardinal_direction"
    | "minecraft:sixteen_way_rotation"
  )[]
];
/**
 * This rotation offset only applies to the horizontal state values
 */
export type YRotationOffset = 0 | 90 | 180 | 270 | 360;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CI".
 */
export type BlockReference = BlockIdentifier | BlockReference1;
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
 * Decides the criteria with an array of block descriptors to determine what blocks to form a corner with. The default behavior for this field is to corner with the same block name
 */
export type BlocksToCornerWith = BlockReference[];
/**
 * Block states you wish to enable
 *
 * @minItems 1
 * @maxItems 2
 */
export type EnabledStates2 =
  | ["minecraft:block_face" | "minecraft:vertical_half"]
  | ["minecraft:block_face" | "minecraft:vertical_half", "minecraft:block_face" | "minecraft:vertical_half"];
/**
 * Block states you wish to enable
 *
 * @minItems 1
 */
export type EnabledStates3 = ["minecraft:multi_block_part", ..."minecraft:multi_block_part"[]];
/**
 * Optionally used to initialize state 'minecraft:multi_block_part'
 */
export type Parts = number;
/**
 * Property used to define which direction the block parts are placed from 0 to N
 */
export type Direction = "up" | "down" | "north" | "east" | "south" | "west";
/**
 * Enables or disables the storing of DynamicProperties
 */
export type DynamicProperties = boolean;
/**
 * How the block should be evaluated by a chest during chest opening.
 */
export type ObstructionRule = "always" | "never" | "shape";
/**
 * This component can be specified as a Boolean. If this component is omitted, the default value for this component is true, which will give your block the default values for its parameters (a collision box the size/shape of a regular block).
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "E".
 */
export type CollisionBox = boolean | EEntry | EEntry[];
/**
 * Minimal position of the bounds of the collision box. origin is specified as [x, y, z] and must be in the range (-8, 0, -8) to (8, 16, 8), inclusive.
 */
export type Origin = [] | [X] | [X, Y] | [X, Y, Z];
export type X = number;
export type Y = number;
export type Z = number;
/**
 * Size of each side of the collision box. Size is specified as [x, y, z]. origin + size must be in the range (-8, 0, -8) to (8, 16, 8), inclusive.
 */
export type Size = [] | [X1] | [X1, Y1] | [X1, Y1, Z1];
export type X1 = number;
export type Y1 = number;
export type Z1 = number;
/**
 * The type of block allowed to connect to this block. Note that the "only_fences" option allows connections from all Vanilla fences excluding NetherBrick.
 */
export type AcceptsConnectionsFrom = "all" | "none" | "only_fences";
/**
 * The cardinal directions that connection is enabled for. Note that if "none" is specified for "accepts_connections_from", this field will not be used.
 */
export type EnabledDirections = ("east" | "north" | "south" | "west")[];
/**
 * The tag to check for.
 */
export type Tag = string;
/**
 * Defines the tags recipes should define to be crafted on this table. Limited to 64 tags. Each tag is limited to 64 characters.
 *
 * @maxItems 64
 */
export type CraftingTags = Tag[];
/**
 * Specifies the language file key that maps to what text will be displayed in the UI of this table. If the string given can not be resolved as a loc string, the raw string given will be displayed. If this field is omitted, the name displayed will default to the name specified in the "display_name" component. If this block has no "display_name" component, the name displayed will default to the name of the block.
 */
export type TableName = string;
/**
 * Describes the destructible by explosion properties for this block. If set to true, the block will have the default explosion resistance. If set to false, this block is indestructible by explosion. If the component is omitted, the block will have the default explosion resistance.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "H".
 */
export type DestructibleByExplosion =
  | boolean
  | {
      explosion_resistance?: ExplosionResistance;
    };
/**
 * Describes how resistant the block is to explosion. Greater values mean the block is less likely to break when near an explosion (or has higher resistance to explosions). The scale will be different for different explosion power levels. A negative value or 0 means it will easily explode; larger numbers increase level of resistance.
 */
export type ExplosionResistance = number;
/**
 * Describes the destructible by mining properties for this block. If set to true, the block will take the default number of seconds to destroy. If set to false, this block is indestructible by mining. If the component is omitted, the block will take the default number of seconds to destroy.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "I".
 */
export type DestructibleByMining =
  | boolean
  | {
      seconds_to_destroy?: SecondsToDestroy;
      item_specific_speeds?: ItemSpecificDestroySpeeds;
    };
/**
 * Sets the number of seconds it takes to destroy the block with base equipment. Greater numbers result in greater mining times.
 */
export type SecondsToDestroy = number;
/**
 * Optional array of objects to describe item-specific block destroy speeds.
 *
 * @minItems 1
 */
export type ItemSpecificDestroySpeeds = [ItemSpecificDestroySpeed, ...ItemSpecificDestroySpeed[]];
/**
 * ItemDescriptor filtering for the item used while mining.
 */
export type ItemIdentifer = string;
/**
 * Molang or tag
 */
export type Tags = string;
/**
 * Sets the number of seconds it takes to destroy the block with base equipment. Greater numbers result in greater mining times.
 */
export type DestroySpeed = number;
/**
 * The texture name used for the particle.
 */
export type Texture = string;
/**
 * Tint multiplied to the color. Tint method logic varies, but often refers to the "rain" and "temperature" of the biome the block is placed in to compute the tint.
 */
export type TintMethod =
  "none" | "default_foliage" | "birch_foliage" | "evergreen_foliage" | "dry_foliage" | "grass" | "water";
/**
 * Number of particles to spawn on destruction
 */
export type ParticleCount = number;
/**
 * Specifies the language file key that maps to what text will be displayed when you hover over the block in your inventory and hotbar. If the string given can not be resolved as a loc string, the raw string given will be displayed. If this component is omitted, the name of the block will be used as the display name.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BB".
 */
export type DisplayName = string;
/**
 * The "minecraft:geometry" component that will be used for the item.
 */
export type Geometry =
  | string
  | {
      identifier: Identifier1;
      bone_visibility?: BoneVisibility;
      culling?: BlockCullingRule;
      culling_layer?: CullingLayer;
      culling_shape?: CullingShape;
      n_way_visual_rotation?: NWayVisualRotation;
      uv_lock?: UVLock | UVLock1;
    };
/**
 * The description identifier of the geometry file to use to render this block. This identifier must match an existing geometry identifier in any of the currently loaded resource packs.
 */
export type Identifier1 = string;
/**
 * Whether or not the bone should be visible. Can be defined as a boolean or a molang expression resulting in a boolean.
 */
export type BoneVisibility1 = boolean | string;
/**
 * The description identifier of the block culling rule or voxel shape used to cull this block. This identifier must match an existing block culling rule or voxel shape identifier in any of the currently loaded resource or behavior packs.
 */
export type BlockCullingRule = string;
/**
 * A string that allows culling rule to group multiple blocks together when comparing them.
 */
export type CullingLayer = string;
/**
 * The voxel shape used for culling adjacent block faces.
 */
export type CullingShape = string;
/**
 * Block state name that controls visual rotation around the x axis.
 */
export type X2 = string;
/**
 * Block state name that controls visual rotation around the y axis.
 */
export type Y2 = string;
/**
 * Block state name that controls visual rotation around the z axis.
 */
export type Z2 = string;
/**
 * A Boolean locking UV orientation of all bones in the geometry, or an array of strings locking UV orientation of specific bones in the geometry. For performance reasons it is recommended to use the Boolean. Note that for cubes using Box UVs, rather than Per-face UVs, 'uv_lock' is only supported if the cube faces are square.
 */
export type UVLock = boolean;
/**
 * A Boolean locking UV orientation of all bones in the geometry, or an array of strings locking UV orientation of specific bones in the geometry. For performance reasons it is recommended to use the Boolean. Note that for cubes using Box UVs, rather than Per-face UVs, 'uv_lock' is only supported if the cube faces are square.
 *
 * @minItems 1
 */
export type UVLock1 = [string, ...string[]];
/**
 * The material instance for a block. Maps face or material_instance names in a geometry file to an actual material instance. You can assign a material instance object to any of these faces: "up", "down", "north", "south", "east", "west", or "*". You can also give an instance the name of your choosing such as "my_instance", and then assign it to a face by doing "north":"my_instance".
 */
export type MaterialInstance =
  | string
  | {
      alpha_masked_tint?: AlphaMaskedTint;
      ambient_occlusion?: AmbientOcclusion;
      face_dimming?: FaceDimming;
      render_method?: RenderMethod;
      texture?: Texture1;
      isotropic?: Isotropic;
      tint_method?: TintMethod1;
    };
/**
 * Should the tint be multiplied by the alpha channel of texture (similar to grass_block's sides)?
 */
export type AlphaMaskedTint = boolean;
/**
 * Should this material have ambient occlusion applied when lighting? If true, shadows will be created around and underneath the block.
 */
export type AmbientOcclusion = boolean | number;
/**
 * Should this material be dimmed by the direction it's facing?
 */
export type FaceDimming = boolean;
/**
 * The render method to use. Must be one of these options: opaque - Used for a regular block texture without an alpha layer. Does not allow for transparency or translucency. double_sided - Used for completely disabling backface culling. blend - Used for a block like stained glass. Allows for transparency and translucency (slightly transparent textures). alpha_test - Used for a block like the vanilla (unstained) glass. Does not allow for translucency, only fully opaque or fully transparent textures. Also disables backface culling.
 */
export type RenderMethod =
  | "opaque"
  | "double_sided"
  | "blend"
  | "alpha_test"
  | "alpha_test_single_sided"
  | "blend_to_opaque"
  | "alpha_test_to_opaque"
  | "alpha_test_single_sided_to_opaque";
/**
 * Texture name for the material.
 */
export type Texture1 = string;
/**
 * Controls rotating the face UVs randomly based on BlockPos
 */
export type Isotropic = boolean;
/**
 * Tint multiplied to the color. Tint method logic varies, but often refers to the "rain" and "temperature" of the biome the block is placed in to compute the tint.
 */
export type TintMethod1 =
  "none" | "default_foliage" | "birch_foliage" | "evergreen_foliage" | "dry_foliage" | "grass" | "water";
/**
 * Describes the flammable properties for this block. If set to true, default values are used. If set to false, or if this component is omitted, the block will not be able to catch on fire naturally from neighbors, but it can still be directly ignited.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BF".
 */
export type Flammable =
  | boolean
  | {
      catch_chance_modifier?: CatchChanceModifier;
      destroy_chance_modifier?: DestroyChanceModifier;
      lava_flammable?: LavaFlammable;
    };
/**
 * A modifier affecting the chance that this block will catch flame when next to a fire. Values are greater than or equal to 0, with a higher number meaning more likely to catch on fire
 */
export type CatchChanceModifier = number;
/**
 * A modifier affecting the chance that this block will be destroyed by flames when on fire.
 */
export type DestroyChanceModifier = number;
/**
 * Determines lava fire consideration. "always" includes this block when lava attempts to spread fire (triggered by adjacent block changes), but normal fire-placement rules still apply.
 * "never" excludes this block from that check.
 */
export type LavaFlammable = "always" | "never";
/**
 * Describes the friction for this block in a range of (0.0-0.9). Friction affects an entity's movement speed when it travels on the block. Greater value results in more friction.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BH".
 */
export type Friction = number;
/**
 * The description identifier of the geometry file to use to render this block. This identifier must match an existing geometry identifier in any of the currently loaded resource packs.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BD".
 */
export type Geometry2 =
  | string
  | {
      identifier: Identifier1;
      bone_visibility?: BoneVisibility;
      culling?: BlockCullingRule;
      culling_layer?: CullingLayer;
      culling_shape?: CullingShape;
      n_way_visual_rotation?: NWayVisualRotation;
      uv_lock?: UVLock | UVLock1;
    };
/**
 * The instrument sound to be played
 */
export type Up = string;
/**
 * The instrument sound to be played
 */
export type Down = string;
/**
 * The description identifier of the geometry file to use to render this block. This identifier must match an existing geometry identifier in any of the currently loaded resource packs.
 */
export type Geometry3 =
  | string
  | {
      identifier: Identifier1;
      bone_visibility?: BoneVisibility;
      culling?: BlockCullingRule;
      culling_layer?: CullingLayer;
      culling_shape?: CullingShape;
      n_way_visual_rotation?: NWayVisualRotation;
      uv_lock?: UVLock | UVLock1;
    };
/**
 * Changes the position of the leash knot
 */
export type Offset = [] | [X3] | [X3, Y3] | [X3, Y3, Z3];
export type X3 = number;
export type Y3 = number;
export type Z3 = number;
/**
 * The amount that light will be dampened when it passes through the block, in a range (0-15). Higher value means the light will be dampened more.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CB".
 */
export type LightDampening = number;
/**
 * The amount of light this block will emit in a range (0-15). Higher value means more light will be emitted.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CC".
 */
export type LightEmission = number;
/**
 * Whether this block can contain the liquid. For example, if the liquid type is water, this means the block can be waterlogged.
 */
export type CanContainLiquid = boolean;
/**
 * The type of liquid this detection rule is for.
 */
export type LiquidType = "water";
/**
 * How the block reacts to flowing water. Must be one of the following options:
 * "blocking" - The default value for this field. The block stops the liquid from flowing.
 * "broken" - The block is destroyed completely.
 * "popped" - The block is destroyed and its item is spawned.
 * "no_reaction" - The block is unaffected; visually, the liquid will flow through the block.
 */
export type OnLiquidTouches = "blocking" | "broken" | "popped" | "no_reaction";
/**
 * When a block contains a liquid, controls the directions in which the liquid can't flow out from the block. Also controls the directions in which a block can stop liquid flowing into it if no_reaction is set for the on_liquid_touches field. The default is an empty list; this means that liquid can flow out of all directions by default.
 */
export type StopsLiquidFlowingFromDirection = ("up" | "down" | "north" | "south" | "east" | "west" | "side" | "all")[];
/**
 * true means the block will use the "collision_box" to visually clip the water & false ignores liquid clipping, which will render water across the whole block
 */
export type UseLiquidClipping = boolean;
/**
 * The path to the loot table, relative to the behavior pack.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CE".
 */
export type Loot = string;
/**
 * Sets the color of the block when rendered to a map. The color is represented as a hex value in the format "#RRGGBB". May also be expressed as an array of [R, G, B] from 0 to 255. If this component is omitted, the block will not show up on the map.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CF".
 */
export type MapColor =
  | CFColor
  | {
      color: Color;
      tint_method?: TintMethod2;
    };
/**
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CF_color".
 */
export type CFColor = string | [] | [Red] | [Red, Green] | [Red, Green, Blue];
export type Red = number;
export type Green = number;
export type Blue = number;
export type Color = string | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * Tint multiplied to the color. Tint method logic varies, but often refers to the "rain" and "temperature" of the biome the block is placed in to compute the tint.
 */
export type TintMethod2 =
  "none" | "default_foliage" | "birch_foliage" | "evergreen_foliage" | "dry_foliage" | "grass" | "water";
/**
 * How the block reacts to being pushed by another block like a piston. Must be one of the following options:
 * "push_pull" - The default value for this field. The block will be pushed and pulled by a piston.
 * "push" - The block will only be pulled by a piston and will ignore a sticky piston.
 * "popped" - The block is destroyed when moved by a piston.
 * "immovable" - The block is unaffected by a piston.
 */
export type MovementType = "push_pull" | "push" | "popped" | "immovable";
/**
 * How the block should handle adjacent blocks around it when being pushed by another block like a piston. Must be one of the following options:
 * "same" - Adjacent blocks to this block will be moved when moved. This excludes other blocks with the "same" property. This will only work with the movement_type: "push_pull".
 * "none" - The default and will not move adjacent blocks.
 */
export type Sticky = string;
/**
 * List of conditions where the block can be placed/survive. Limited to 64 conditions. Each condition is a JSON Object that must contain at least one (and can contain both) of the parameters allowed_faces or block_filter as shown below.
 *
 * @minItems 1
 */
export type Conditions = [PlacementFilter1, ...PlacementFilter1[]];
/**
 * List of any of the following strings describing which face(s) this block can be placed on: "up", "down", "north", "south", "east", "west", "side", "all". Limited to 6 faces.
 */
export type AllowedFaces = ("up" | "down" | "north" | "south" | "east" | "west" | "side" | "all")[];
/**
 * A minecraft block reference.
 */
export type BlockReference2 = BlockIdentifier | BlockReference1;
/**
 * List of blocks that this block can be placed against in the "allowed_faces" direction. Limited to 64 blocks. Each block in this list can either be specified as a String (block name) or as a BlockDescriptor. A BlockDescriptor is an object that allows you to reference a block (or multiple blocks) based on its tags, or based on its name and states. The fields of a BlockDescriptor are described below.
 */
export type BlockFilter = BlockReference2[];
/**
 * What behavior should the block have.
 */
export type PrecipitationBehavior = "obstruct_rain" | "obstruct_rain_accumulate_snow" | "none" | "snowlogging";
/**
 * Lower bound
 */
export type Min = number;
/**
 * Upper bound
 */
export type Max = number;
/**
 * This is the equally spaced steps across the given range. Provide 0 for all possible values in the range
 */
export type Steps = number;
/**
 * Specifies if redstone wire can stair-step downward on the block.
 */
export type AllowsWireToStepDown = boolean;
/**
 * Specifies if the block can be powered by redstone.
 */
export type RedstoneConductor = boolean;
/**
 * Defines the minimum value for incoming signal stregth. If signal strength is greater than or equal to this value then the onRedstoneUpdate event is sent to Scripts.
 */
export type MinPower = number;
/**
 * Controls whether a signal can pass through this block or not, defaults to false
 */
export type PropagatesPower = boolean;
/**
 * The strength of the redstone signal produced by this block. Valid values are from 0 to 15, where 0 means no signal and 15 is the maximum signal strength.
 */
export type Power = number;
/**
 * The block touching this face will become strongly powered with the signal level strength of 'power'. Strongly powered blocks will power adjacent blocks. By default, the block will not strongly power any face.
 */
export type StronglyPoweredFace = ("up" | "down" | "north" | "south" | "east" | "west" | "side" | "all")[];
/**
 * The list of faces that are considered connected to the circuit. If a face is not connected, it will not provide power to the block touching that face. By default, all faces are connected.
 */
export type ConnectedFaces = ("up" | "down" | "north" | "south" | "east" | "west" | "side" | "all")[];
/**
 * If true, the `strongly_powered_face` and `connected_faces` properties will be rotated according to the `minecraft:transformation` component.
 */
export type TransformRelative = boolean;
/**
 * Defines the area of the block that is selected by the player's cursor. If set to true, default values are used. If set to false, this block is not selectable by the player's cursor. If this component is omitted, default values are used.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DH".
 */
export type SelectionBox =
  | boolean
  | {
      origin?: Origin1;
      size?: Size1;
    };
/**
 * Minimal position of the bounds of the selection box. "origin" is specified as [x, y, z] and must be in the range (-8, 0, -8) to (8, 16, 8), inclusive.
 */
export type Origin1 = [] | [X5] | [X5, Y5] | [X5, Y5, Z5];
export type X5 = number;
export type Y5 = number;
export type Z5 = number;
/**
 * Size of each side of the selection box. Size is specified as [x, y, z]. "origin" + "size" must be in the range (-8, 0, -8) to (8, 16, 8), inclusive.
 */
export type Size1 = [] | [X6] | [X6, Y6] | [X6, Y6, Z6];
export type X6 = number;
export type Y6 = number;
export type Z6 = number;
/**
 * Sound key
 */
export type Sound1 = string;
/**
 * The type of support shape for this block.
 */
export type Shape = "fence" | "stair";
/**
 * Use this component to define tags, vanilla or custom. Valid tags are of the format "namespace:tag_name". The array of tags must be non-empty.
 *
 * @minItems 1
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EA".
 */
export type Tags1 = [
  (
    | (
        | "minecraft:diamond_tier_destructible"
        | "minecraft:iron_tier_destructible"
        | "minecraft:is_axe_item_destructible"
        | "minecraft:is_hoe_item_destructible"
        | "minecraft:is_mace_item_destructible"
        | "minecraft:is_pickaxe_item_destructible"
        | "minecraft:is_shears_item_destructible"
        | "minecraft:is_shovel_item_destructible"
        | "minecraft:is_sword_item_destructible"
        | "minecraft:netherite_tier_destructible"
        | "minecraft:stone_tier_destructible"
        | "minecraft:has_fence_connections"
        | "minecraft:cornerable_stairs"
      )
    | string
  ),
  ...(
    | (
        | "minecraft:diamond_tier_destructible"
        | "minecraft:iron_tier_destructible"
        | "minecraft:is_axe_item_destructible"
        | "minecraft:is_hoe_item_destructible"
        | "minecraft:is_mace_item_destructible"
        | "minecraft:is_pickaxe_item_destructible"
        | "minecraft:is_shears_item_destructible"
        | "minecraft:is_shovel_item_destructible"
        | "minecraft:is_sword_item_destructible"
        | "minecraft:netherite_tier_destructible"
        | "minecraft:stone_tier_destructible"
        | "minecraft:has_fence_connections"
        | "minecraft:cornerable_stairs"
      )
    | string
  )[]
];
/**
 * Amount in degrees the block should be rotated on each axis. "rotation" is specified as [x, y, z] using floating point values and must be axis aligned, otherwise the value will be rounded to the nearest axis-aligned value.
 */
export type Rotation = [] | [X7] | [X7, Y7] | [X7, Y7, Z7];
export type X7 = number;
export type Y7 = number;
export type Z7 = number;
/**
 * Amount the block should be scaled along each axis. "scale" is specified as [x, y, z] using floating point values.
 */
export type Scale = [] | [X8] | [X8, Y8] | [X8, Y8, Z8];
export type X8 = number;
export type Y8 = number;
export type Z8 = number;
/**
 * Amount the block should be translated along each axis. "translation" is specified as [x, y, z] using floating point values.
 */
export type Translation = [] | [X9] | [X9, Y9] | [X9, Y9, Z9];
export type X9 = number;
export type Y9 = number;
export type Z9 = number;
/**
 * Offset to the pivot point around which to apply the scale. "scale_pivot" is specified as [x, y, z] using floating point values.
 */
export type ScalePivot = [] | [X10] | [X10, Y10] | [X10, Y10, Z10];
export type X10 = number;
export type Y10 = number;
export type Z10 = number;
/**
 * Offset to the pivot point around which to apply the rotation. "rotation_pivot" is specified as [x, y, z] using floating point values.
 */
export type RotationPivot = [] | [X11] | [X11, Y11] | [X11, Y11, Z11];
export type X11 = number;
export type Y11 = number;
export type Z11 = number;
/**
 * Used to register custom components.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EC".
 */
export type CustomComponents = string[];
/**
 * Does the event loop.
 */
export type Looping = boolean;
/**
 * The Range between which the component will trigger his event.
 */
export type IntervalRange = [] | [Min1] | [Min1, Max1];
export type Min1 = number;
export type Max1 = number;
/**
 * Sets the minimum fall distance required to trigger the custom component.
 */
export type MinFallDistance = number;
/**
 * A Molang expression that evaluates to true or false to determine if this permutation should be used. For permutation conditions you are limited to using one Molang query: "query.block_state()"
 */
export type Condition = string | boolean;
/**
 * An array of different versions of a block, allowing you to specify which components you want the block to have under certain conditions.
 */
export type Permutations = Permutation[];
/**
 * Tint multiplied to the color.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BA".
 */
export type TintMethod3 =
  "none" | "default_foliage" | "birch_foliage" | "evergreen_foliage" | "dry_foliage" | "grass" | "water";
/**
 * The instrument sound to be played
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BI_face".
 */
export type BIFace = string;
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CJ".
 */
export type BlockIdentifier2 = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DA".
 */
export type Molang1 = string;
/**
 * The minecraft molang definition that results in a boolean.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "FC".
 */
export type MolangBoolean = string | boolean;

/**
 * The minecraft block behavior specification.
 */
export interface BlockBehavior {
  use_beta_features?: UseBetaFeatures;
  format_version: FormatVersion;
  "minecraft:block": BlockDefinitions;
}
/**
 * A custom block definition.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "B".
 */
export interface BlockDefinitions {
  description: BlockDescription;
  components: Component;
  permutations?: Permutations;
}
/**
 * The description for this block.
 */
export interface BlockDescription {
  identifier: Identifier;
  menu_category?: MenuCategory;
  states?: States;
  traits?: Traits;
}
/**
 * Specifies the menu category and group for the block, which determine where this block is placed in the inventory and crafting table container screens. If this field is omitted, the block will not appear in the inventory or crafting table container screens.
 */
export interface MenuCategory {
  category: Category;
  group?: Group;
  is_hidden_in_commands?: IsHiddenInCommands;
}
/**
 * Block states are variables that can be set to different values in order to change how your block looks or behaves.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "B_states_ref".
 */
export interface States {
  [k: string]: State;
}
/**
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EG".
 */
export interface EG {
  values: StateIntegerValueRange;
}
export interface StateIntegerValueRange {
  min: Minimum;
  max: Maximum;
}
/**
 * A shortcut for creators to use Vanilla block states without needing to define and manage a series of events or triggers on custom blocks
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "B_traits_ref".
 */
export interface Traits {
  "minecraft:connection"?: Connection;
  "minecraft:placement_direction"?: PlacementDirection;
  "minecraft:placement_position"?: PlacementPosition;
  "minecraft:multi_block"?: MultiBlock;
}
/**
 * Exposes behavior like Fences or Glass Panes from Vanilla where blocks connect to other blocks around them. Using this trait with the example below adds the bool states minecraft:connection_north, minecraft:connection_east, minecraft:connection_south, and minecraft:connection_west.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EH".
 */
export interface Connection {
  enabled_states: EnabledStates;
}
/**
 * Contains information about the player's rotation when the block was placed.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EI".
 */
export interface PlacementDirection {
  enabled_states: EnabledStates1;
  y_rotation_offset?: YRotationOffset;
  blocks_to_corner_with?: BlocksToCornerWith;
}
export interface BlockReference1 {
  name?: BlockIdentifier1;
  states?: States1;
  tags?: Molang;
}
export interface States1 {
  [k: string]: StateValue;
}
/**
 * Contains information about where the player placed the block.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EJ".
 */
export interface PlacementPosition {
  enabled_states: EnabledStates2;
}
/**
 * Used to define a block composed of multiple block parts. A multi block treats all individual parts as a single block, like Door blocks
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "FA".
 */
export interface MultiBlock {
  enabled_states: EnabledStates3;
  parts?: Parts;
  direction: Direction;
}
/**
 * The components of this block.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "B_components_ref".
 */
export interface Component {
  "minecraft:block_entity"?: BlockEntity;
  "minecraft:chest_obstruction"?: ChestObstruction;
  "minecraft:collision_box"?: CollisionBox;
  "minecraft:connection_rule"?: ConnectionRule;
  "minecraft:crafting_table"?: CraftingTable;
  "minecraft:destructible_by_explosion"?: DestructibleByExplosion;
  "minecraft:destructible_by_mining"?: DestructibleByMining;
  "minecraft:destruction_particles"?: DestructionParticles;
  "minecraft:display_name"?: DisplayName;
  "minecraft:embedded_visual"?: EmbeddedVisual;
  "minecraft:flammable"?: Flammable;
  "minecraft:flower_pottable"?: FlowerPottable;
  "minecraft:friction"?: Friction;
  "minecraft:geometry"?: Geometry2;
  "minecraft:instrument_sound"?: InstrumentSound;
  "minecraft:item_visual"?: ItemVisual;
  "minecraft:leashable"?: Leashable;
  "minecraft:light_dampening"?: LightDampening;
  "minecraft:light_emission"?: LightEmission;
  "minecraft:liquid_detection"?: LiquidDetection;
  "minecraft:loot"?: Loot;
  "minecraft:map_color"?: MapColor;
  "minecraft:material_instances"?: MaterialInstances;
  "minecraft:movable"?: Movable;
  "minecraft:placement_filter"?: PlacementFilter;
  "minecraft:precipitation_interactions"?: PrecipitationInteractions;
  "minecraft:random_offset"?: RandomOffset;
  "minecraft:redstone_conductivity"?: RedstoneConductivity;
  "minecraft:redstone_consumer"?: RedstoneConsumer;
  "minecraft:redstone_producer"?: RedstoneProducer;
  "minecraft:replaceable"?: Replaceable;
  "minecraft:selection_box"?: SelectionBox;
  "minecraft:sound"?: Sound;
  "minecraft:support"?: Support;
  "minecraft:tags"?: Tags1;
  "minecraft:transformation"?: Transformation;
  "minecraft:custom_components"?: CustomComponents;
  "minecraft:tick"?: Tick;
  "minecraft:entity_fall_on"?: EntityFallOn;
  [k: string]: unknown;
}
/**
 * [EXPERIMETNAL] An associated block-entity will be placed with the intent to provide persistent local metadata, akin to chests, spawners, signs, etc...
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "C".
 */
export interface BlockEntity {
  dynamic_properties?: DynamicProperties;
}
/**
 * Defines how a block placed above a chest or ender_chest should obstruct their opening
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "D".
 */
export interface ChestObstruction {
  obstruction_rule?: ObstructionRule;
}
/**
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "E_entry".
 */
export interface EEntry {
  origin?: Origin;
  size?: Size;
}
/**
 * Allows custom blocks to define whether other blocks with connection behavior - such as fences, walls, bars, and glass panes - can try to create a connection.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "F".
 */
export interface ConnectionRule {
  accepts_connections_from?: AcceptsConnectionsFrom;
  enabled_directions?: EnabledDirections;
}
/**
 * Makes your block into a custom crafting table which enables the crafting table UI and the ability to craft recipes.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "G".
 */
export interface CraftingTable {
  crafting_tags?: CraftingTags;
  table_name?: TableName;
}
export interface ItemSpecificDestroySpeed {
  item:
    | ItemIdentifer
    | {
        tags?: Tags;
      };
  destroy_speed: DestroySpeed;
}
/**
 * Sets the particles that will be used when block is destroyed. This component can be omitted.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "J".
 */
export interface DestructionParticles {
  texture?: Texture;
  tint_method?: TintMethod;
  particle_count?: ParticleCount;
}
/**
 * When the component is present on the block, it defines which geometry and material_instances to use when the block is embedded into another block, eg. into a Flowerpot
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BC".
 */
export interface EmbeddedVisual {
  geometry: Geometry;
  material_instances: Geometry1;
}
/**
 * A list of bones that should be visible when rendering this block. If not specified, all bones will be visible.
 */
export interface BoneVisibility {
  [k: string]: BoneVisibility1;
}
/**
 * Optional object that maps x/y/z axes to block state names that drive visual-only geometry rotation.
 */
export interface NWayVisualRotation {
  x?: X2;
  y?: Y2;
  z?: Z2;
}
/**
 * The "minecraft:material_instances" component that will be used for the item.
 */
export interface Geometry1 {
  [k: string]: MaterialInstance;
}
/**
 * Allows a player to interact with an empty flowerpot when holding the block in order to embed it.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface FlowerPottable {}
/**
 * It can be used to assign an instrument to "up" and "down" faces of a block and it's permutations
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BI".
 */
export interface InstrumentSound {
  up?: Up;
  down?: Down;
}
/**
 * The description identifier of the geometry and material used to render the item of this block.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface ItemVisual {
  geometry: Geometry3;
  material_instances: Geometry4;
}
/**
 * The "minecraft:material_instances" component that will be used for the item.
 */
export interface Geometry4 {
  [k: string]: MaterialInstance;
}
/**
 * Allows custom blocks to receive a lead attachment, including an offset field to change the position of the leash knot.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CA".
 */
export interface Leashable {
  offset?: Offset;
}
/**
 * The definitions for how a block behaves when detecting liquid. Only one rule definition is allowed per liquid type - if multiple are specified, the first will be used and the rest will be ignored.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CD".
 */
export interface LiquidDetection {
  /**
   * @minItems 1
   */
  detection_rules?: [DefinitionRule, ...DefinitionRule[]];
}
/**
 * The definition rule that specifies the behavior for one liquid type.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CD_definition_rule".
 */
export interface DefinitionRule {
  can_contain_liquid?: CanContainLiquid;
  liquid_type?: LiquidType;
  on_liquid_touches?: OnLiquidTouches;
  stops_liquid_flowing_from_direction?: StopsLiquidFlowingFromDirection;
  use_liquid_clipping?: UseLiquidClipping;
}
/**
 * The material instances for a block. Maps face or material_instance names in a geometry file to an actual material instance. You can assign a material instance object to any of these faces: "up", "down", "north", "south", "east", "west", or "*". You can also give an instance the name of your choosing such as "my_instance", and then assign it to a face by doing "north":"my_instance".
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface MaterialInstances {
  [k: string]: MaterialInstance;
}
/**
 * This allows for blocks to configure how they should react when moved by a piston
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CG".
 */
export interface Movable {
  movement_type: MovementType;
  sticky?: Sticky;
}
/**
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "CH".
 */
export interface PlacementFilter {
  conditions?: Conditions;
  [k: string]: unknown;
}
export interface PlacementFilter1 {
  allowed_faces?: AllowedFaces;
  block_filter?: BlockFilter;
}
/**
 * Component that determines how the block will interact with rain and snow
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DB".
 */
export interface PrecipitationInteractions {
  precipitation_behavior: PrecipitationBehavior;
}
/**
 * This allows for blocks to randomly offset like foliage does in the Vanilla game
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DC".
 */
export interface RandomOffset {
  x?: X4;
  y?: Y4;
  z?: Z4;
}
/**
 * Random offset on the x-axis
 */
export interface X4 {
  range?: Range;
  steps?: Steps;
}
/**
 * This is the range of possible values we can pick from
 */
export interface Range {
  min?: Min;
  max?: Max;
}
/**
 * Random offset on the y-axis
 */
export interface Y4 {
  range?: Range;
  steps?: Steps;
}
/**
 * Random offset on the z-axis
 */
export interface Z4 {
  range?: Range;
  steps?: Steps;
}
/**
 * The basic redstone properties of a block; if the component is not provided the default values are used.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DD".
 */
export interface RedstoneConductivity {
  allows_wire_to_step_down?: AllowsWireToStepDown;
  redstone_conductor?: RedstoneConductor;
}
/**
 * A component describing how a block can consume and potentially propogate a redstone signal
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DE".
 */
export interface RedstoneConsumer {
  min_power: MinPower;
  propagates_power?: PropagatesPower;
}
/**
 * Allows the block to produce a redstone signal
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DF".
 */
export interface RedstoneProducer {
  power: Power;
  strongly_powered_face?: StronglyPoweredFace;
  connected_faces?: ConnectedFaces;
  transform_relative?: TransformRelative;
}
/**
 * A block with this component can be replaced when another block is placed in the same block position.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DG".
 */
export interface Replaceable {}
/**
 * [EXPERIMENTAL] It can be used to assign a set of sounds to block and its permutations similar to sound field in blocks.json
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DI".
 */
export interface Sound {
  sound?: Sound1;
}
/**
 * Defines the support shape of the block. Currently only allows for blocks to have the same shape as a Vanilla fence and Vanilla stair. To work with custom stairs, requires the use of "minecraft:vertical_half" and "minecraft:cardinal_direction" or "minecraft:facing_direction" which can be set through the "minecraft:placement_direction" block trait. Custom blocks without this component will default to unit cube support. The type of support shape for this block.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DJ".
 */
export interface Support {
  shape: Shape;
}
/**
 * Supports rotation, scaling, and translation
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EB".
 */
export interface Transformation {
  rotation?: Rotation;
  scale?: Scale;
  translation?: Translation;
  scale_pivot?: ScalePivot;
  rotation_pivot?: RotationPivot;
}
/**
 * Describes the component that will trigger an even at a regular interval between two values.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "ED".
 */
export interface Tick {
  looping?: Looping;
  interval_range?: IntervalRange;
}
/**
 * Required component to use the custom component `onEntityFallOn`.
 *
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "EE".
 */
export interface EntityFallOn {
  min_fall_distance?: MinFallDistance;
}
/**
 * A permutation of a block, which will be applied given the condition is met.
 */
export interface Permutation {
  condition: Condition;
  components?: Component1;
}
/**
 * The components of this block.
 */
export interface Component1 {
  "minecraft:block_entity"?: BlockEntity;
  "minecraft:chest_obstruction"?: ChestObstruction;
  "minecraft:collision_box"?: CollisionBox;
  "minecraft:connection_rule"?: ConnectionRule;
  "minecraft:crafting_table"?: CraftingTable;
  "minecraft:destructible_by_explosion"?: DestructibleByExplosion;
  "minecraft:destructible_by_mining"?: DestructibleByMining;
  "minecraft:destruction_particles"?: DestructionParticles;
  "minecraft:display_name"?: DisplayName;
  "minecraft:embedded_visual"?: EmbeddedVisual;
  "minecraft:flammable"?: Flammable;
  "minecraft:flower_pottable"?: FlowerPottable;
  "minecraft:friction"?: Friction;
  "minecraft:geometry"?: Geometry2;
  "minecraft:instrument_sound"?: InstrumentSound;
  "minecraft:item_visual"?: ItemVisual;
  "minecraft:leashable"?: Leashable;
  "minecraft:light_dampening"?: LightDampening;
  "minecraft:light_emission"?: LightEmission;
  "minecraft:liquid_detection"?: LiquidDetection;
  "minecraft:loot"?: Loot;
  "minecraft:map_color"?: MapColor;
  "minecraft:material_instances"?: MaterialInstances;
  "minecraft:movable"?: Movable;
  "minecraft:placement_filter"?: PlacementFilter;
  "minecraft:precipitation_interactions"?: PrecipitationInteractions;
  "minecraft:random_offset"?: RandomOffset;
  "minecraft:redstone_conductivity"?: RedstoneConductivity;
  "minecraft:redstone_consumer"?: RedstoneConsumer;
  "minecraft:redstone_producer"?: RedstoneProducer;
  "minecraft:replaceable"?: Replaceable;
  "minecraft:selection_box"?: SelectionBox;
  "minecraft:sound"?: Sound;
  "minecraft:support"?: Support;
  "minecraft:tags"?: Tags1;
  "minecraft:transformation"?: Transformation;
  "minecraft:custom_components"?: CustomComponents;
  "minecraft:tick"?: Tick;
  "minecraft:entity_fall_on"?: EntityFallOn;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `BlockBehavior`'s JSON-Schema
 * via the `definition` "DC_entry".
 */
export interface DCEntry {
  range?: Range;
  steps?: Steps;
}
