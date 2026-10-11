/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type FormatVersion = string;
/**
 * UNDOCUMENTED.
 */
export type RecipeIdentifier = string;
export type Tag = string;
/**
 * Recipe Tags
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "C".
 */
export type Tags = Tag[];
/**
 * Items used as input for the furnace recipe.
 */
export type Input = string;
/**
 * Items used as output for the furnace recipe.
 */
export type Output = string;
/**
 * Unlock achievement
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "D".
 */
export type Unlock =
  | {
      context: Context;
      [k: string]: unknown;
    }
  | DItem[];
/**
 * The context of the achievement to unlock
 */
export type Context = string;
/**
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "D_item".
 */
export type DItem =
  | {
      item: Item;
      data?: Data;
      [k: string]: unknown;
    }
  | {
      tag: ItemTag;
      [k: string]: unknown;
    };
/**
 * The item to unlock
 */
export type Item = string;
/**
 * The data of the item to unlock
 */
export type Data = number;
/**
 * The item to unlock
 */
export type ItemTag = string;
/**
 * Input potion used on the brewing stand.
 */
export type Input1 = string;
/**
 * Output potion from mixing the input potion with the reagent on the brewing stand.
 */
export type Output1 = string;
/**
 * Item used to mix with the input potion.
 */
export type Reagent = string;
/**
 * Input potion used on the brewing stand.
 */
export type Input2 = string;
/**
 * Output potion from mixing the input potion with the reagent on the brewing stand.
 */
export type Output2 = string;
/**
 * Item used to mix with the input potion.
 */
export type Reagent1 = string;
/**
 * Recipe item 1.12.0
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "H".
 */
export type Item1 =
  | ItemIdentifier
  | {
      item: ItemIdentifier1;
      data?: ItemDataValue;
      count?: Count;
    }
  | {
      tag: ItemTag1;
      [k: string]: unknown;
    };
export type ItemIdentifier = string;
export type ItemIdentifier1 = string;
export type ItemDataValue = number;
export type Count = number;
/**
 * The item to unlock
 */
export type ItemTag1 = string;
/**
 * UNDOCUMENTED.
 */
export type Group = string;
/**
 * Characters that represent a pattern to be defined by keys.
 *
 * @minItems 1
 * @maxItems 3
 */
export type Pattern = [Pattern1] | [Pattern1, Pattern1] | [Pattern1, Pattern1, Pattern1];
export type Pattern1 = string;
/**
 * Item used as output for the furnace recipe.
 */
export type Priority = number;
/**
 * When input items match the pattern then these items are the result.
 */
export type Result = Item1 | Item1[];
/**
 * Used to automatically assume a symmetrical recipe should return the same resultUsed to automatically assume a symmetrical recipe should return the same result
 */
export type AssumeSymmetry = boolean;
/**
 * Items used as input (without a shape) for the recipe.
 */
export type Ingredients = Item1[];
/**
 * UNDOCUMENTED.
 */
export type Group1 = string;
/**
 * Item used as output for the furnace recipe.
 */
export type Priority1 = number;
/**
 * When input items match the pattern then these items are the result.
 */
export type Result1 = Item1 | Item1[];
/**
 * Item used as base for the smithing recipe.
 */
export type Base = Item1 | Item1[];
/**
 * Item used as addition for the smithing recipe.
 */
export type Addition = Item1 | Item1[];
/**
 * When input items match the pattern then these items are the result.
 */
export type Result2 = Item1 | Item1[];

/**
 * A recipe is a set of ingredients and a result that can be crafted using a crafting table, furnace, brewing stand, or stonecutter.
 */
export interface Recipe {
  format_version: FormatVersion;
  "minecraft:recipe_furnace"?: FurnaceRecipe;
  "minecraft:recipe_brewing_container"?: BrewingRecipe1120;
  "minecraft:recipe_brewing_mix"?: BrewingRecipe11201;
  "minecraft:recipe_shaped"?: ShapedRecipe;
  "minecraft:recipe_shapeless"?: ShapelessRecipe1120;
  "minecraft:recipe_smithing_transform"?: SmithingTransformRecipe1120;
}
/**
 * Represents a furnace recipe for a furnace.'Input` items will burn and transform into items specified in `output`..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "A".
 */
export interface FurnaceRecipe {
  description: Definition;
  tags?: Tags;
  input?: Input;
  output?: Output;
  unlock?: Unlock;
}
/**
 * Recipe definition 1.12.0
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "B".
 */
export interface Definition {
  identifier?: RecipeIdentifier;
}
/**
 * Represents a Potion Brewing Container Recipe..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "E".
 */
export interface BrewingRecipe1120 {
  description: Definition;
  tags?: Tags;
  unlock?: Unlock;
  input?: Input1;
  output?: Output1;
  reagent?: Reagent;
}
/**
 * Represents a Potion Brewing Container Recipe..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "F".
 */
export interface BrewingRecipe11201 {
  description: Definition;
  tags?: Tags;
  unlock?: Unlock;
  input?: Input2;
  output?: Output2;
  reagent?: Reagent1;
}
/**
 * Represents a shaped crafting recipe for a crafting table. The key used in the pattern may be any single character except the `space` character, which is reserved for empty slots in a recipe..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "G".
 */
export interface ShapedRecipe {
  description: Definition;
  tags: Tags;
  unlock?: Unlock;
  key?: Key;
  group?: Group;
  pattern?: Pattern;
  priority?: Priority;
  result?: Result;
  assume_symmetry?: AssumeSymmetry;
}
/**
 * Patten key character mapped to item names.
 */
export interface Key {
  [k: string]: Item1;
}
/**
 * Represents a shapeless crafting recipe..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "I".
 */
export interface ShapelessRecipe1120 {
  description: Definition;
  tags?: Tags;
  unlock?: Unlock;
  ingredients?: Ingredients;
  group?: Group1;
  priority?: Priority1;
  result?: Result1;
}
/**
 * Represents a smithing table crafting recipe..
 *
 * This interface was referenced by `Recipe`'s JSON-Schema
 * via the `definition` "J".
 */
export interface SmithingTransformRecipe1120 {
  description: Definition;
  tags?: Tags;
  unlock?: Unlock;
  base?: Base;
  addition?: Addition;
  result?: Result2;
}
