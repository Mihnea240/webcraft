/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `StructureSet`'s JSON-Schema
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
 * The name of this structure set.
 */
export type Identifier = string;
/**
 * Seed used for the random generator to provide a unique scatter pattern. This is used to prevent overlap in the case where multiple structure sets use the same placement values.
 */
export type Salt = number;
/**
 * Padding (in chunks) within each grid cell. Structures will not generate within the padded area.
 */
export type Separation = number;
/**
 * Grid cell size (in chunks) to use when generating the structure. Structures will attempt to generate at a random position within each cell.
 */
export type Spacing = number;
/**
 * Randomness algorithm used when placing structures.
 */
export type SpreadType = ("linear" | "triangular") & string;
export type Type = "minecraft:random_spread";
/**
 * A weighted list of Jigsaw Structure identifiers. Structures will be randomly chosen from this set during world generation.
 *
 * @minItems 1
 */
export type Structures = [
  {
    structure: Structure;
    weight: Weight;
    [k: string]: unknown;
  },
  ...{
    structure: Structure;
    weight: Weight;
    [k: string]: unknown;
  }[]
];
/**
 * Identifier of the Jigsaw Structure.
 */
export type Structure = string;
/**
 * Weight of the Jigsaw Structure in the set. Higher weights are more likely to be selected.
 */
export type Weight = number;

/**
 * A Jigsaw Structure Set is a collection of Jigsaw Structures that are placed according to a set of rules.
 */
export interface StructureSet {
  format_version: FormatVersion;
  "minecraft:structure_set": StructureSet1;
}
/**
 * This interface was referenced by `StructureSet`'s JSON-Schema
 * via the `definition` "B".
 */
export interface StructureSet1 {
  description: Description;
  placement: Placement;
  structures: Structures;
}
/**
 * The description of this structure set.
 */
export interface Description {
  identifier: Identifier;
}
/**
 * Describes where structures in the set spawn relative to one another. Currently, the only placement type supported is random_spread, which scatters structures randomly with a given separation and spacing.
 */
export interface Placement {
  salt: Salt;
  separation: Separation;
  spacing: Spacing;
  spread_type?: SpreadType;
  type: Type;
}
