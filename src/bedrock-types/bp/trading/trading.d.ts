/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "FB".
 */
export type FormatVersion = FB & FB1;
export type FB =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type FB1 = string;
export type Give =
  | string
  | {
      item?: ItemIdentifier;
      quantity?: Quantity;
      functions?: Functions;
      choice?: Choice;
    };
export type ItemIdentifier = string;
export type Quantity =
  | Amount
  | {
      min: Minimum;
      max: Maximum;
    };
export type Amount = number;
export type Minimum = number;
export type Maximum = number;
/**
 * A minecraft loot table condition.
 */
export type Functions1 = {
  [k: string]: unknown;
};
/**
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "Functions".
 */
export type Functions = Functions1[];
/**
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "Item".
 */
export type Item =
  | string
  | {
      item?: ItemIdentifier1;
      price_multiplier?: PriceMultiplier;
      functions?: Functions;
      biomes?: Biomes;
      quantity?: Quantity1;
    };
export type ItemIdentifier1 = string;
export type PriceMultiplier = number;
/**
 * UNDOCUMENTED.
 */
export type Biomes = string[];
export type Quantity1 =
  | Amount1
  | {
      min: Minimum1;
      max: Maximum1;
    };
export type Amount1 = number;
export type Minimum1 = number;
export type Maximum1 = number;
/**
 * UNDOCUMENTED.
 */
export type Choice = Item[];
export type Gives = Give[];
export type Want =
  | string
  | {
      item?: ItemIdentifier2;
      quantity?: Quantity2;
      price_multiplier?: PriceMultiplier1;
      functions?: Functions;
      choice?: Choice1;
    };
export type ItemIdentifier2 = string;
export type Quantity2 =
  | Amount2
  | {
      min: Minimum2;
      max: Maximum2;
    };
export type Amount2 = number;
export type Minimum2 = number;
export type Maximum2 = number;
/**
 * UNDOCUMENTED.
 */
export type PriceMultiplier1 = number;
/**
 * UNDOCUMENTED.
 */
export type Choice1 = Item[];
export type Wants = Want[];
export type TraderExperience = number;
export type MaximumUses = number;
export type Weight = number;
export type RewardExperience = boolean;
/**
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "TradeArray".
 */
export type Trades = Trade[];
export type TotalExperienceRequired = number;
export type NumberToSelect = number;
/**
 * A collection of groups.
 */
export type Groups = Group[];
/**
 * A collection of tiers.
 */
export type Tiers = Tier[];
/**
 * UNDOCUMENTED.
 */
export type Function = "carry_over_block_entity_data";
/**
 * When looting a block with a block-entity and dynamic-properties, it will try to carry its dynamic-properties over to the created item-stack
 */
export type DynamicProperties = boolean;
/**
 * UNDOCUMENTED.
 */
export type Function1 = "enchant_random_gear";
/**
 * Takes a chance modifier to manipulate the algorithm. Note that a chance modifier of 1.0 doesn't mean a 100% chance that gear will become enchanted.
 */
export type Chance = number;
/**
 * UNDOCUMENTED.
 */
export type Function2 = "enchant_book_for_trading";
/**
 * UNDOCUMENTED.
 */
export type BaseCost = number;
/**
 * UNDOCUMENTED.
 */
export type BaseCost1 = number;
/**
 * UNDOCUMENTED.
 */
export type BaseCost2 = number;
/**
 * UNDOCUMENTED.
 */
export type BaseCost3 = number;
/**
 * UNDOCUMENTED.
 */
export type Function3 = "enchant_randomly";
/**
 * Supports the optional treasure boolean (true/false) to allow treasure enchantments to be toggled on and off.
 */
export type Treasure = boolean;
/**
 * UNDOCUMENTED.
 */
export type Function4 = "enchant_with_levels";
/**
 * UNDOCUMENTED.
 */
export type Levels =
  | number
  | {
      min: Minimum3;
      max: Maximum3;
    };
export type Minimum3 = number;
export type Maximum3 = number;
/**
 * UNDOCUMENTED.
 */
export type Treasure1 = boolean;
/**
 * Transforms a normal map into a treasure map that marks the location of hidden treasure.
 */
export type Function5 = "exploration_map";
/**
 * The destination value defines what type of treasure map they receive. (Note: The following do not work, even though the docs say they do: endcity, fortress, mineshaft, ruins, stronghold, temple, village, shipwreck, and pillageroutpost.)
 */
export type Destination =
  | "endcity"
  | "fortress"
  | "mineshaft"
  | "monument"
  | "ruins"
  | "stronghold"
  | "temple"
  | "village_desert"
  | "village_plains"
  | "village_savanna"
  | "village_snowy"
  | "village_taiga"
  | "village"
  | "mansion"
  | "shipwreck"
  | "buriedtreasure"
  | "pillageroutpost"
  | "jungle_temple"
  | "swamp_hut"
  | "trial_chambers";
/**
 * UNDOCUMENTED.
 */
export type Function6 = "fill_container";
/**
 * UNDOCUMENTED.
 */
export type LootTable = string;
/**
 * Returns true if the biome present at the location of the entity that is dropping loot matches the value.
 */
export type Condition = string;
/**
 * Biome tag to check.
 */
export type Tag = string;
/**
 * A minecraft item identifier.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BI".
 */
export type ItemIdentifier3 = string;
/**
 * An integer value or inclusive range.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BJ".
 */
export type BJ =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * UNDOCUMENTED.
 */
export type Condition1 = "match_tool";
/**
 * The item to match
 */
export type ItemIdentifier4 = string;
/**
 * Minimum count to match of the given item
 */
export type Count =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * Minimum durability to match of the given item
 */
export type Durability =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * The enchantment ID to check for
 */
export type Enchantment =
  | "protection"
  | "fire_protection"
  | "feather_falling"
  | "blast_protection"
  | "projectile_protection"
  | "thorns"
  | "respiration"
  | "depth_strider"
  | "aqua_affinity"
  | "sharpness"
  | "smite"
  | "bane_of_arthropods"
  | "knockback"
  | "fire_aspect"
  | "looting"
  | "efficiency"
  | "silk_touch"
  | "unbreaking"
  | "fortune"
  | "power"
  | "punch"
  | "flame"
  | "infinity"
  | "luck_of_the_sea"
  | "lure"
  | "frost_walker"
  | "mending"
  | "binding"
  | "vanishing"
  | "impaling"
  | "riptide"
  | "loyalty"
  | "channeling"
  | "multishot"
  | "piercing"
  | "quick_charge"
  | "soul_speed"
  | "swift_sneak"
  | "wind_burst"
  | "density"
  | "breach";
/**
 * The minimum level of the enchantment
 */
export type Minimum4 = number;
/**
 * The maximum level of the enchantment
 */
export type Maximum4 = number;
/**
 * List of enchantments to check for
 */
export type Enchantments = {
  enchantment: Enchantment;
  levels?: Levels1;
  [k: string]: unknown;
}[];
/**
 * List of tags the item must have
 */
export type MatchToolFilterAll = string[];
/**
 * List of tags the item must NOT have
 */
export type MatchToolFilterNone = string[];
/**
 * List of tags the item must have at least one of
 */
export type MatchToolFilterAny = string[];
/**
 * Returns the condition true if the actor's mark variant is matched to the value.
 */
export type Condition2 = string;
/**
 * Tests for the actor's mark variant (if it has one).
 */
export type Value = number & string;
/**
 * UNDOCUMENTED.
 */
export type Condition3 = string;
/**
 * UNDOCUMENTED.
 */
export type Condition4 = string;
/**
 * UNDOCUMENTED.
 */
export type Condition5 = string;
/**
 * The entity type to match
 */
export type EntityType = string;
/**
 * UNDOCUMENTED.
 */
export type Condition6 = string;
/**
 * The entity type to match
 */
export type EntityType1 = string;
/**
 * UNDOCUMENTED.
 */
export type Condition7 = string;
/**
 * UNDOCUMENTED.
 */
export type Chance1 = number;
/**
 * The maximum random chance value allowed.
 */
export type MaximumChance = number;
/**
 * UNDOCUMENTED.
 */
export type Condition8 = string;
/**
 * The random chance of the value.
 */
export type Chance2 = number;
/**
 * The multiplier for the chance if the target entity has the looting enchant that affects the actor.
 */
export type LootingMultiplier = number;
/**
 * UNDOCUMENTED.
 */
export type Condition9 = string;
/**
 * The default random chance if the level difficulty is not assigned.
 */
export type DefaultChance = number;
/**
 * The default random chance if the level difficulty is in easy. Omitting this field will set the value to `default_chance` field.
 */
export type Easy = number;
/**
 * The default random chance if the level difficulty is in hard. Omitting this field will set the value to `default_chance` field.
 */
export type Hard = number;
/**
 * The default random chance if the level difficulty is in normal. Omitting this field will set the value to `default_chance` field.
 */
export type Normal = number;
/**
 * The default random chance if the level difficulty is in peaceful. Omitting this field will set the value to `default_chance` field.
 */
export type Peaceful = number;
/**
 * UNDOCUMENTED.
 */
export type Condition10 = string;
/**
 * The entity type to match
 */
export type EntityType2 = string;
/**
 * UNDOCUMENTED.
 */
export type Condition11 = string;
/**
 * A minecraft loot table condition.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "J".
 */
export type Condition12 = {
  [k: string]: unknown;
};
/**
 * UNDOCUMENTED.
 */
export type Function7 = "furnace_smelt";
/**
 * UNDOCUMENTED.
 */
export type Conditions = Condition12[];
/**
 * UNDOCUMENTED.
 */
export type Function8 = "looting_enchant";
/**
 * UNDOCUMENTED.
 */
export type Function9 = "random_aux_value";
/**
 * UNDOCUMENTED.
 */
export type Minimum5 = number;
/**
 * UNDOCUMENTED.
 */
export type Maximum5 = number;
/**
 * UNDOCUMENTED.
 */
export type Function10 = "random_block_state";
/**
 * UNDOCUMENTED.
 */
export type BlockState = string;
export type Min = number;
export type Max = number;
/**
 * UNDOCUMENTED.
 */
export type Function11 = "set_actor_id";
/**
 * UNDOCUMENTED.
 */
export type Id = string;
/**
 * UNDOCUMENTED.
 */
export type Function12 = "set_armor_trim";
/**
 * Trim's material
 */
export type Material =
  | "amethyst"
  | "copper"
  | "diamond"
  | "emerald"
  | "gold"
  | "iron"
  | "lapis"
  | "netherite"
  | "quartz"
  | "redstone"
  | "resin";
/**
 * Trim pattern
 */
export type Pattern =
  | "sentry"
  | "vex"
  | "wild"
  | "coast"
  | "dune"
  | "wayfinder"
  | "shaper"
  | "raiser"
  | "host"
  | "ward"
  | "silence"
  | "tide"
  | "snout"
  | "rib"
  | "eye"
  | "spire"
  | "flow"
  | "bolt";
/**
 * UNDOCUMENTED.
 */
export type Function13 = "set_banner_details";
/**
 * UNDOCUMENTED.
 */
export type Type = number;
/**
 * UNDOCUMENTED.
 */
export type Function14 = "set_book_contents";
/**
 * UNDOCUMENTED.
 */
export type Author = string;
/**
 * UNDOCUMENTED.
 */
export type Title = string;
/**
 * UNDOCUMENTED.
 */
export type Pages = string[];
/**
 * UNDOCUMENTED.
 */
export type Add = boolean;
/**
 * UNDOCUMENTED.
 */
export type Function15 = "set_count";
/**
 * UNDOCUMENTED.
 */
export type Count2 =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * UNDOCUMENTED.
 */
export type Add1 = boolean;
/**
 * UNDOCUMENTED.
 */
export type Function16 = "set_damage";
/**
 * UNDOCUMENTED.
 */
export type Damage =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * UNDOCUMENTED.
 */
export type Function17 = "set_data";
/**
 * UNDOCUMENTED.
 */
export type Data =
  | number
  | {
      /**
       * Minimum value.
       */
      min: number;
      /**
       * Maximum value.
       */
      max: number;
    };
/**
 * UNDOCUMENTED.
 */
export type Function18 = "set_data_from_color_index";
/**
 * UNDOCUMENTED.
 */
export type Function19 = "trader_material_type";
/**
 * UNDOCUMENTED.
 */
export type Function20 = "random_dye";
/**
 * UNDOCUMENTED.
 */
export type Function21 = "set_lore";
/**
 * UNDOCUMENTED.
 */
export type Lore = string[];
/**
 * UNDOCUMENTED.
 */
export type Function22 = "set_name";
/**
 * UNDOCUMENTED.
 */
export type Name = string;
/**
 * This function sets the potion type of compatible items with a potion id..
 */
export type Function23 = "set_lore";
/**
 * ID of the potion to set.
 */
export type Id1 =
  | "water"
  | "mundane"
  | "long_mundane"
  | "thick"
  | "awkward"
  | "nightvision"
  | "long_nightvision"
  | "invisibility"
  | "long_invisibility"
  | "leaping"
  | "long_leaping"
  | "strong_leaping"
  | "fire_resistance"
  | "long_fire_resistance"
  | "swiftness"
  | "long_swiftness"
  | "strong_swiftness"
  | "slowness"
  | "long_slowness"
  | "strong_slowness"
  | "water_breathing"
  | "long_water_breathing"
  | "healing"
  | "strong_healing"
  | "harming"
  | "strong_harming"
  | "poison"
  | "long_poison"
  | "strong_poison"
  | "regeneration"
  | "long_regeneration"
  | "strong_regeneration"
  | "strength"
  | "long_strength"
  | "strong_strength"
  | "weakness"
  | "long_weakness"
  | "wither"
  | "turtle_master"
  | "long_turtle_master"
  | "strong_turtle_master"
  | "slow_falling"
  | "long_slow_falling"
  | "wind_charged"
  | "weaving"
  | "oozing"
  | "infested";
/**
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "FA_IDEnchant".
 */
export type IDEnchantment =
  | "aqua_affinity"
  | "bane_of_arthropods"
  | "blast_protection"
  | "channeling"
  | "binding"
  | "curse_of_vanishing"
  | "depth_strider"
  | "efficiency"
  | "feather_falling"
  | "fire_aspect"
  | "fire_protection"
  | "flame"
  | "fortune"
  | "frost_walker"
  | "impaling"
  | "infinity"
  | "knockback"
  | "looting"
  | "loyalty"
  | "luck_of_the_sea"
  | "lure"
  | "mending"
  | "multishot"
  | "piercing"
  | "projectile_protection"
  | "protection"
  | "power"
  | "punch"
  | "quick_charge"
  | "respiration"
  | "riptide"
  | "sharpness"
  | "silk_touch"
  | "smite"
  | "soul_speed"
  | "thorns"
  | "unbreaking";
export type Level = Level1 | [] | [Min1] | [Min1, Max1];
export type Level1 = number;
export type Min1 = number;
export type Max1 = number;
/**
 * Specific enchants.
 */
export type SpecificEnchants1 = "specific_enchants";
/**
 * A enchanting specification.
 */
export type Enchants = IDEnchantment1 | Enchantment2 | Enchantment1[];
export type IDEnchantment1 =
  | "aqua_affinity"
  | "bane_of_arthropods"
  | "blast_protection"
  | "channeling"
  | "binding"
  | "curse_of_vanishing"
  | "depth_strider"
  | "efficiency"
  | "feather_falling"
  | "fire_aspect"
  | "fire_protection"
  | "flame"
  | "fortune"
  | "frost_walker"
  | "impaling"
  | "infinity"
  | "knockback"
  | "looting"
  | "loyalty"
  | "luck_of_the_sea"
  | "lure"
  | "mending"
  | "multishot"
  | "piercing"
  | "projectile_protection"
  | "protection"
  | "power"
  | "punch"
  | "quick_charge"
  | "respiration"
  | "riptide"
  | "sharpness"
  | "silk_touch"
  | "smite"
  | "soul_speed"
  | "thorns"
  | "unbreaking";
/**
 * A minecraft loot table condition.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "A".
 */
export type Functions2 = {
  [k: string]: unknown;
};

/**
 * UNDOCUMENTED.
 */
export interface Trading {
  format_version?: FormatVersion;
  tiers?: Tiers;
}
export interface Tier {
  trades?: Trades;
  total_exp_required: TotalExperienceRequired;
  groups: Groups;
}
export interface Trade {
  gives: Gives;
  wants: Wants;
  trader_exp?: TraderExperience;
  max_uses?: MaximumUses;
  weight?: Weight;
  reward_exp?: RewardExperience;
}
export interface Group {
  num_to_select?: NumberToSelect;
  trades?: Trades;
}
/**
 * The function carry_over_block_entity_data.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "B".
 */
export interface CarryOverBlockEntityData {
  function?: Function;
  dynamic_properties?: DynamicProperties;
}
/**
 * The function enchant_random_gear.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "C".
 */
export interface EnchantRandomGear {
  function?: Function1;
  chance?: Chance;
}
/**
 * The function enchant_book_for_trading.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "D".
 */
export interface EnchantBookForTrading {
  function: Function2;
  base_cost: BaseCost;
  base_random_cost: BaseCost1;
  per_level_random_cost: BaseCost2;
  per_level_cost: BaseCost3;
}
/**
 * The function enchant_randomly.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "E".
 */
export interface EnchantRandomly {
  function?: Function3;
  treasure?: Treasure;
}
/**
 * The function enchant_with_levels.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "F".
 */
export interface EnchantWithLevels {
  function?: Function4;
  levels?: Levels;
  treasure?: Treasure1;
}
/**
 * Transforms a normal map into a treasure map that marks the location of hidden treasure.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "G".
 */
export interface ExplorationMap {
  function?: Function5;
  destination?: Destination;
}
/**
 * The function fill_container.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "H".
 */
export interface FillContainer {
  function?: Function6;
  loot_table?: LootTable;
}
/**
 * Returns true if the biome present at the location of the entity that is dropping loot matches the value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface HasMarkVariant {
  condition?: Condition;
  tag?: Tag;
}
/**
 * Checks the variant value of the current actor.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BB".
 */
export interface HasVariant {
  condition: "has_variant";
  /**
   * Expected variant identifier.
   */
  value?: number;
}
/**
 * Checks whether the current actor exposes a property in the given domain.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BC".
 */
export interface HasProperty {
  condition: "has_property";
  /**
   * Property domain identifier.
   */
  domain: string;
}
/**
 * Checks whether a boolean property matches the requested value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface BoolProperty {
  condition: "bool_property";
  /**
   * Property domain identifier.
   */
  domain: string;
  /**
   * Expected boolean value.
   */
  value: boolean;
}
/**
 * Checks whether an integer property matches the requested value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface IntProperty {
  condition: "int_property";
  /**
   * Property domain identifier.
   */
  domain: string;
  /**
   * Expected integer value.
   */
  value: number;
}
/**
 * Checks whether a float property matches the requested value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface FloatProperty {
  condition: "float_property";
  /**
   * Property domain identifier.
   */
  domain: string;
  /**
   * Expected float value.
   */
  value: number;
}
/**
 * Checks whether an enum property matches the requested value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface EnumProperty {
  condition: "enum_property";
  /**
   * Property domain identifier.
   */
  domain: string;
  /**
   * Expected enumeration value.
   */
  value: string;
}
/**
 * Returns the condition true if the block of the loot table was broken with a specific item.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "BH".
 */
export interface MatchTool {
  condition: Condition1;
  item?: ItemIdentifier4;
  count?: Count;
  durability?: Durability;
  enchantments?: Enchantments;
  "minecraft:match_tool_filter_all"?: MatchToolFilterAll;
  "minecraft:match_tool_filter_none"?: MatchToolFilterNone;
  "minecraft:match_tool_filter_any"?: MatchToolFilterAny;
}
/**
 * The level of the enchantment
 */
export interface Levels1 {
  range_min?: Minimum4;
  range_max?: Maximum4;
  [k: string]: unknown;
}
/**
 * Returns the condition true if the actor's mark variant is matched to the value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CA".
 */
export interface HasMarkVariant1 {
  condition?: Condition2;
  value?: Value;
}
/**
 * Returns the condition true if the actor of the loot table is killed by player or entities that has owner.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CB".
 */
export interface KilledByPlayer {
  condition?: Condition3;
}
/**
 * Returns the condition true if the actor of the loot table is killed by player or entities that has owner.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CC".
 */
export interface KilledByPlayerOrPets {
  condition?: Condition4;
}
/**
 * Returns the condition true if the actor of the loot table is killed by a specific entity type.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CD".
 */
export interface KilledByEntity {
  condition?: Condition5;
  entity_type?: EntityType;
}
/**
 * Allows checking which entity type applied damage to an entity that is dropping loot.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CE".
 */
export interface DamagedByEntity {
  condition?: Condition6;
  entity_type?: EntityType1;
}
/**
 * Checks whether the source entity matches the supplied identifier.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CF".
 */
export interface EntityKilled {
  condition: "entity_killed";
  /**
   * Entity identifier expected for the killer/victim.
   */
  entity_type: string;
}
/**
 * Sets a random chance of the specified value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CG".
 */
export interface RandomChance {
  condition?: Condition7;
  chance?: Chance1;
  max_chance?: MaximumChance;
}
/**
 * Sets a random chance of the specified value. Looting enchantment increase the random chance multiplier.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CH".
 */
export interface RandomChanceWithLooting {
  condition?: Condition8;
  chance?: Chance2;
  looting_multiplier?: LootingMultiplier;
}
/**
 * Sets a random chance of the specified value based on the level difficulty.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CI".
 */
export interface RandomDifficultyChance {
  condition?: Condition9;
  default_chance?: DefaultChance;
  easy?: Easy;
  hard?: Hard;
  normal?: Normal;
  peaceful?: Peaceful;
}
/**
 * Passes with a probability scaled by the world's regional difficulty multiplier. The regional difficulty is based on dimension, world difficulty and moon brightness.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "CJ".
 */
export interface RandomRegionalDifficultyChance {
  condition: "random_regional_difficulty_chance";
  /**
   * Base probability (0-1) before scaling by the regional difficulty multiplier.
   */
  max_chance?: number;
}
/**
 * Allows checking which vehicle entity type is being ridden by the damaged entity that is dropping loot
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DA".
 */
export interface PassengerOfEntity {
  condition?: Condition10;
  entity_type?: EntityType2;
}
/**
 * Allows checking if the entity that is dropping loot is a baby
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DB".
 */
export interface IsBaby {
  condition?: Condition11;
}
/**
 * If the item to return has a smelted crafting recipe and the loot table is triggered by an entity killed with fire. the result will be the smelted version of the item
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "I".
 */
export interface FurnaceSmelt {
  function?: Function7;
  conditions?: Conditions;
}
/**
 * The function looting_enchant.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DC".
 */
export interface LootingEnchant {
  function?: Function8;
  count?: Count1;
}
/**
 * UNDOCUMENTED.
 */
export interface Count1 {
  min?: number;
  max?: number;
}
/**
 * The function random_aux_value.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DD".
 */
export interface RandomAuxValue {
  function?: Function9;
  values?: Values;
}
/**
 * UNDOCUMENTED.
 */
export interface Values {
  min?: Minimum5;
  max?: Maximum5;
}
/**
 * The function random_block_state.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DE".
 */
export interface RandomBlockState {
  function?: Function10;
  block_state?: BlockState;
  values?: Values1;
}
/**
 * UNDOCUMENTED.
 */
export interface Values1 {
  min?: Min;
  max?: Max;
}
/**
 * The function set_actor_id.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DF".
 */
export interface SetActorId {
  function?: Function11;
  id?: Id;
}
/**
 * The function set_armor_trim.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DG".
 */
export interface SetArmorTrim {
  function: Function12;
  material: Material;
  pattern: Pattern;
}
/**
 * The function set_banner_details.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DH".
 */
export interface SetBannerDetails {
  function?: Function13;
  type?: Type;
}
/**
 * The function set_book_contents.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DI".
 */
export interface SetBookContents {
  function: Function14;
  author: Author;
  title: Title;
  pages: Pages;
}
/**
 * The function set_count.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "DJ".
 */
export interface SetCount {
  add?: Add;
  function?: Function15;
  count?: Count2;
}
/**
 * The function set_damage.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EA".
 */
export interface SetDamage {
  add?: Add1;
  function?: Function16;
  damage?: Damage;
}
/**
 * The function set_data.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EB".
 */
export interface SetData {
  function?: Function17;
  data?: Data;
}
/**
 * The function set_data_from_color_index.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EC".
 */
export interface SetDataFromColorIndex {
  function?: Function18;
}
/**
 * Configures the amplifier value applied to the ominous bottle item.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "ED".
 */
export interface SetOminousBottleAmplifier {
  function: "set_ominous_bottle_amplifier";
  /**
   * Amplifier value or range to apply.
   */
  amplifier:
    | number
    | {
        /**
         * Minimum value.
         */
        min: number;
        /**
         * Maximum value.
         */
        max: number;
      };
}
/**
 * Configures suspicious stew status effects.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EE".
 */
export interface SetStewEffect {
  function: "set_stew_effect";
  /**
   * @minItems 1
   */
  effects: [
    {
      /**
       * Numeric effect identifier.
       */
      id: number;
      /**
       * Optional duration in ticks for the effect.
       */
      duration?: number;
    },
    ...{
      /**
       * Numeric effect identifier.
       */
      id: number;
      /**
       * Optional duration in ticks for the effect.
       */
      duration?: number;
    }[]
  ];
}
/**
 * The function trader_material_type.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EF".
 */
export interface TraderMaterialType {
  function?: Function19;
}
/**
 * The function random_dye.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EG".
 */
export interface TraderMaterialType1 {
  function?: Function20;
}
/**
 * The function set_lore.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EH".
 */
export interface SetLore {
  function?: Function21;
  lore?: Lore;
}
/**
 * The function set_name.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EI".
 */
export interface SetName {
  function?: Function22;
  name?: Name;
}
/**
 * The function set_potion.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "EJ".
 */
export interface SetLore1 {
  function?: Function23;
  id?: Id1;
}
/**
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "FA_Enchant".
 */
export interface Enchantment1 {
  id?: IDEnchantment;
  level?: Level;
}
/**
 * The function specific_enchants.
 *
 * This interface was referenced by `Trading`'s JSON-Schema
 * via the `definition` "FA".
 */
export interface SpecificEnchants {
  function?: SpecificEnchants1;
  enchants?: Enchants;
}
export interface Enchantment2 {
  id?: IDEnchantment;
  level?: Level;
}
