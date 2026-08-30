/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
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
 * Identifier of the Processor List. This is referenced by Template Pools when pairing processors with Structure Templates.
 */
export type Identifier = string;
/**
 * A list of processors.
 *
 * @minItems 1
 */
export type Processors = [Processors1, ...Processors1[]];
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "C".
 */
export type Processors1 = {
  [k: string]: unknown;
};
export type Type = "minecraft:passthrough";
/**
 * The loot table to append
 */
export type LootTable = string;
export type Type1 = "minecraft:append_loot";
export type PredicateType = "minecraft:always_true";
export type PredicateType1 = "minecraft:block_match";
export type PredicateType2 = "minecraft:random_block_match";
export type PredicateType3 = "minecraft:tag_match";
/**
 * The tag to be matched.
 */
export type Tag = string;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "E".
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
export type PredicateType4 = "minecraft:blockstate_match";
export type PredicateType5 = "minecraft:random_blockstate_match";
export type Axis = "x" | "y" | "z";
export type MaxChance = number;
export type MaxDist = number;
export type MinChance = number;
export type MinDist = number;
export type PredicateType6 = "minecraft:axis_aligned_linear_pos";
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "F".
 */
export type BlockIdentifier2 = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "G".
 */
export type Molang1 = string;
export type ProcessorType = "minecraft:rule";
export type Rules = DRule[];
export type Blocks = string[];
export type ProcessorType1 = "minecraft:block_ignore";
export type ProcessorType2 = "minecraft:protected_blocks";
export type Type2 = "constant";
export type Value = number;
export type MaxInclusive = number;
export type MinInclusive = number;
export type Type3 = "uniform";
export type ProcessorType3 = "minecraft:capped";

/**
 * Rules used by Jigsaw Structures to determine which blocks to modify or replace when placing a Structure Template in the world.
 */
export interface ProcessorList {
  format_version: FormatVersion;
  "minecraft:processor_list": ProcessorList1;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "B".
 */
export interface ProcessorList1 {
  description: Description;
  processors: Processors;
}
/**
 * The description of this jigsaw.
 */
export interface Description {
  identifier?: Identifier;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_rule".
 */
export interface DRule {
  block_entity_modifier?: Passthrough | AppendLoot;
  input_predicate?: AlwaysTrue | BlockMatch | RandomBlockMatch | TagMatch | BlockStateMatch | RandomBlockStateMatch;
  location_predicate?: AlwaysTrue | BlockMatch | RandomBlockMatch | TagMatch | BlockStateMatch | RandomBlockStateMatch;
  output_state: BlockReference;
  position_predicate?: AlwaysTrue | AxisAlignedLinear;
  [k: string]: unknown;
}
/**
 * Modifier that leaves the state unchanged. This is the default block modifier if no other block modifier is specified.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_passthrough".
 */
export interface Passthrough {
  type: Type;
}
/**
 * Modifier will attempt to add loot to a block entity.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_append_loot".
 */
export interface AppendLoot {
  loot_table: LootTable;
  type: Type1;
}
/**
 * Predicate that always evaluates to true. This is the default predicate if no other predicate is specified.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_always_true".
 */
export interface AlwaysTrue {
  predicate_type: PredicateType;
}
/**
 * Predicate that evaluates to true if the block at the specified location matches the specified block.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_block_match".
 */
export interface BlockMatch {
  block: string;
  predicate_type: PredicateType1;
  [k: string]: unknown;
}
/**
 * Predicate that evaluates to true with a given probability if the block at the specified location matches the specified block.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_random_block_match".
 */
export interface RandomBlockMatch {
  block: string;
  predicate_type: PredicateType2;
  /**
   * Probability of the evaluating to true when the block matches.
   */
  probability: number;
  [k: string]: unknown;
}
/**
 * Predicate that evaluates to true if the block at the specified location contains the tag.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_tag_match".
 */
export interface TagMatch {
  predicate_type: PredicateType3;
  tag: Tag;
  [k: string]: unknown;
}
/**
 * Predicate that evaluates to true if the block at the specified location matches the specified block.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_blockstate_match".
 */
export interface BlockStateMatch {
  block_state: BlockReference;
  predicate_type: PredicateType4;
  [k: string]: unknown;
}
export interface BlockReference1 {
  name?: BlockIdentifier1;
  states?: States;
  tags?: Molang;
}
export interface States {
  [k: string]: StateValue;
}
/**
 * Predicate that evaluates to true with a given probability if the block at the specified location matches the specified block.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_random_blockstate_match".
 */
export interface RandomBlockStateMatch {
  block_state: BlockReference;
  predicate_type: PredicateType5;
  /**
   * Probability of the evaluating to true when the block matches.
   */
  probability: number;
  [k: string]: unknown;
}
/**
 * Predicate that evalutes to true if the block is within the distance range along the provided axis and and random number is generated between chance range.
 *
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D_axis_aligned_linear_pos".
 */
export interface AxisAlignedLinear {
  axis?: Axis;
  max_chance?: MaxChance;
  max_dist?: MaxDist;
  min_chance?: MinChance;
  min_dist?: MinDist;
  predicate_type: PredicateType6;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "D".
 */
export interface Rule {
  processor_type: ProcessorType;
  rules: Rules;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "I".
 */
export interface BlockIgnore {
  blocks: Blocks;
  processor_type: ProcessorType1;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "J".
 */
export interface ProtectedBlocks {
  processor_type: ProcessorType2;
  value: string;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `ProcessorList`'s JSON-Schema
 * via the `definition` "H".
 */
export interface Capped {
  delegate: Rule | BlockIgnore | ProtectedBlocks;
  limit: number | ConstantInteger | UniformInteger;
  processor_type: ProcessorType3;
  [k: string]: unknown;
}
export interface ConstantInteger {
  type: Type2;
  value: Value;
}
export interface UniformInteger {
  max_inclusive: MaxInclusive;
  min_inclusive: MinInclusive;
  type: Type3;
  [k: string]: unknown;
}
