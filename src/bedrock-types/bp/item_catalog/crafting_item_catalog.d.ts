/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `CraftingItemCatalog`'s JSON-Schema
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
 * @minItems 1
 */
export type Categories = [Category, ...Category[]];
/**
 * Determines which category this block/item will be placed under in the inventory and crafting table container screens.
 */
export type CategoryName = "construction" | "equipment" | "items" | "nature";
/**
 * The item or block that represents the group.
 */
export type Icon = string;
/**
 * The localization string that is display when you hover over your group name. The localization string needs to include the namespace.
 */
export type Name = string;
/**
 * List of items to be added
 */
export type Items = (
  | string
  | {
      /**
       * You can optionally provide an aux value for items that use it at the end. Example: namespace:my_item:1
       */
      name: string;
      [k: string]: unknown;
    }
)[];
/**
 * Defines a new group which will be added to the category you specify at the end of all existing items/groups.
 */
export type Groups = Group[];

/**
 * Used to define the creative inventory/recipe book
 */
export interface CraftingItemCatalog {
  format_version: FormatVersion;
  "minecraft:crafting_items_catalog": CraftingItemsCatalog;
}
/**
 * This interface was referenced by `CraftingItemCatalog`'s JSON-Schema
 * via the `definition` "B".
 */
export interface CraftingItemsCatalog {
  categories: Categories;
}
/**
 * You can add new items to the existing categories.
 *
 * This interface was referenced by `CraftingItemCatalog`'s JSON-Schema
 * via the `definition` "B_category".
 */
export interface Category {
  category_name: CategoryName;
  groups: Groups;
}
/**
 * Represents a group of items. A group can be collapsible if it is provided with a group identifier, or added a set of loose items without an icon.
 *
 * This interface was referenced by `CraftingItemCatalog`'s JSON-Schema
 * via the `definition` "B_group".
 */
export interface Group {
  group_identifier?: GroupIdentifier;
  items: Items;
}
/**
 * Optional field to give an icon and name to a group. Otherwise the items are added as loose items. If there are two groups with the same name within a category, they will merge.
 */
export interface GroupIdentifier {
  icon?: Icon;
  name: Name;
}
