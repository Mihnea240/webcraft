/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockCulling`'s JSON-Schema
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
 * Sets the identifier for this rule's description.
 */
export type Identifier = string;
/**
 * List of all components used to identify geometry parts used in culling.
 *
 * @minItems 1
 */
export type Rules = [Rule, ...Rule[]];
/**
 * The bone within the geometry part
 */
export type Bone = string;
/**
 * The cube within the geometry part
 */
export type Cube = number;
/**
 * The face within the geometry part
 */
export type Face = "up" | "down" | "north" | "south" | "east" | "west";
/**
 * Whether to cull against a full, opaque block.
 */
export type CullAgainstFullAndOpaque = boolean;
/**
 * It provides more control over which neighbor blocks will trigger a face or part to be culled.
 * - "default" will pass the condition if the neighbor block is full and opaque. All conditions are an extension of "default", meaning a full and opaque neighbor will always be a passing condition, before the extended "same_*" condition is checked.
 * - "same_culling_layer" will pass the condition if the neighbor block shares the same "culling_layer" as the block being occluded, defined in the geometry component. If either of the culling layers being compared is "minecraft:culling_layer.undefined", the condition will never pass.
 * - "same_block" will pass the condition if the neighbor block has the same identifier.
 * - "same_block_permutation" will pass the condition if the neighbor block has the same identifier and is the exact same permutation.
 */
export type Condition = "same_culling_layer" | "same_block" | "same_block_permutation";
/**
 * Specifies the direction of the neighbor block to check for culling. This direction rotates with a block's Transform component.
 */
export type Direction = "up" | "down" | "north" | "south" | "east" | "west";
/**
 * The minecraft block culling rule identifier.
 *
 * This interface was referenced by `BlockCulling`'s JSON-Schema
 * via the `definition` "B".
 */
export type BlockCullingRuleIdentifier = string;

/**
 * A resource pack file that helps the system determine how to change the appearance of this block.
 */
export interface BlockCulling {
  format_version?: FormatVersion;
  "minecraft:block_culling_rules"?: BlockCullingRules;
}
/**
 * JSON container used for descriptions, especially the identifier for the name of the culled version of the block.
 */
export interface BlockCullingRules {
  description?: Description;
  rules?: Rules;
}
/**
 * Contains the identifier used by minecraft:geometry block components to refer to this culling data
 */
export interface Description {
  identifier?: Identifier;
}
/**
 * The rules that specifies a "geometry_part" and "direction"
 *
 * This interface was referenced by `BlockCulling`'s JSON-Schema
 * via the `definition` "rule".
 */
export interface Rule {
  geometry_part?: GeometryPart;
  cull_against_full_and_opaque?: CullAgainstFullAndOpaque;
  condition?: Condition;
  direction?: Direction;
}
/**
 * Specifies the bone, cube, and face that the block will be culled. The cube and face fields are optional to allow culling a specific face. Omitting these fields will cull the whole bone.
 */
export interface GeometryPart {
  bone?: Bone;
  cube?: Cube;
  face?: Face;
}
