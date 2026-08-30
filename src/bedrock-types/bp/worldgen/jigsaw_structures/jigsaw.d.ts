/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
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
 * Specifies the biomes in which the Jigsaw Structure can generate.
 */
export type BiomeFilters = CGroupsSpec[] | CFiltersSpec;
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "C_groups_spec".
 */
export type CGroupsSpec = CGroupsSpec[] | CFiltersSpec;
export type CFiltersSpec =
  | {
      all_of?: AllOf;
      any_of?: AnyOf;
      none_of?: NoneOf;
      [k: string]: unknown;
    }
  | ({
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    });
/**
 * All tests in an `all_of` group must pass in order for the group to pass.
 */
export type AllOf = CGroupsSpec[] | CFiltersSpec;
/**
 * One or more tests in an `any_of` group must pass in order for the group to pass.
 */
export type AnyOf = CGroupsSpec[] | CFiltersSpec;
/**
 * All tests in a `none_of` group must fail in order for the group to pass.
 */
export type NoneOf = CGroupsSpec[] | CFiltersSpec;
/**
 * Identifier of the Jigsaw Structure. This is used with commands such as /locate, as well as within Structure Set definitions to specify which Jigsaw Structures are included in a given set.
 */
export type Identifier = string;
/**
 * Heightmap used to calculate the relative start height. For example, a heightmap_projection of ocean_floor and a start_height of 10 means the Jigsaw Structure will begin generating 10 blocks above the ocean floor.
 */
export type HeightmapProjection = "ocean_floor" | "world_surface" | "none";
/**
 *  The maximum recursion depth for Jigsaw Structure Generation. For example, a Jigsaw Structure that builds a road with a max_depth of 5 will only have paths that are a maximum of 5 structures templates in length in any given direction from the origin.
 */
export type MaxDepth = number;
/**
 * Height at which the Jigsaw Structure's start_pool should begin.
 */
export type StartHeight = {
  [k: string]: unknown;
};
/**
 * The first Template Pool to use when generating the Jigsaw Structure.
 */
export type StartPool = string;
/**
 * The name of the Jigsaw Block from the start_pool to be placed first.
 */
export type StartJigsawName = string;
/**
 * The max distance from the jigsaw pieces to the structure start.
 */
export type MaxDistanceFromCenter = number;
/**
 * Used to rewire jigsaw pool connections by redirecting pool references in an individual structure. Done by specifying aliases for Template Pools. This can allow for themes across a full structure.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAJ_pool_alias".
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAJ".
 */
export type PoolAlias = {
  [k: string]: unknown;
};
/**
 * Pool Aliases are used to determine which Template Pool can be a substitute.
 */
export type PoolAliases = PoolAlias[];
/**
 * Dimension padding prevents the structure from getting cut off at the top or bottom of the world.
 */
export type DimensionPadding = number;
/**
 * Distance in blocks from the top of the dimension that may not be used by the Jigsaw Structure.
 */
export type Top = number;
/**
 * Distance in blocks from the bottom of the dimension that may not be used by the Jigsaw Structure.
 */
export type Bottom = number;
/**
 * Specifies the world generation phase in which the structure is generated. This is used as a grouping concept to keep similar world-generation features generally bundled together.
 */
export type Step =
  | "fluid_springs"
  | "lakes"
  | "local_modifications"
  | "raw_generation"
  | "strongholds"
  | "surface_structures"
  | "top_layer_modification"
  | "underground_decoration"
  | "underground_ores"
  | "underground_structures"
  | "vegetal_decoration";
/**
 * How the terrain should adapt relative to the generated Jigsaw Structure.
 */
export type TerrainAdaptation = "beard_box" | "beard_thin" | "bury" | "encapsulate" | "none";
/**
 * How to handle waterloggable blocks overlapping with existing liquid.
 */
export type LiquidSettings = "apply_waterlogging" | "ignore_waterlogging";
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "C_filters_spec".
 */
export type CFiltersSpec1 =
  | {
      all_of?: AllOf;
      any_of?: AnyOf;
      none_of?: NoneOf;
      [k: string]: unknown;
    }
  | ({
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    } & {
      [k: string]: unknown;
    });
/**
 * The comparison to apply with `value`.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "E".
 */
export type Operator = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "F".
 */
export type Subject = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * Tests the health of the subject.
 */
export type TestProperty = string;
/**
 * (Optional) The comparison to apply with `value`.
 */
export type Operator1 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * (Optional) The subject of this filter test.
 */
export type Subject1 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A integer value.
 */
export type Value = number;
/**
 * The equipment location to test.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "H".
 */
export type EquipmentLocation =
  "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * Returns true when the designated equipment location for the subject entity is completely empty.
 */
export type TestProperty1 = string;
/**
 * (Optional) The comparison to apply with `value`.
 */
export type Operator2 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * (Optional) The subject of this filter test.
 */
export type Subject2 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * The equipment location to test.
 */
export type Value1 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * Returns true when the designated equipment location for the subject entity has any empty slot.
 */
export type TestProperty2 = string;
/**
 * (Optional) The comparison to apply with `value`.
 */
export type Operator3 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * (Optional) The subject of this filter test.
 */
export type Subject3 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * The equipment location to test.
 */
export type Value2 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * Returns true when the bool actor property matches the value provided.
 */
export type TestProperty3 = string;
/**
 * (Required) The property name to look for
 */
export type Operator4 = string;
/**
 * (Optional) The comparison to apply with `value`.
 */
export type Operator5 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * (Optional) The subject of this filter test.
 */
export type Subject4 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * true or false.
 */
export type Value3 = boolean;
/**
 * Compares the current time with a float value in the range (0.0, 1.0).
 * 0.0= Noon
 * 0.25= Sunset
 * 0.5= Midnight
 * 0.75= Sunrise
 */
export type TestProperty4 = string;
/**
 * (Optional) The comparison to apply with `value`.
 */
export type Operator6 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * (Optional) The subject of this filter test.
 */
export type Subject5 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A floating point value.
 */
export type Value4 = number;
/**
 * Compares the distance to the nearest Player with a float value.
 */
export type TestProperty5 = string;
/**
 * (Required) A floating point value.
 */
export type Value5 = number;
/**
 * Returns true when the enum actor property matches the value provided.
 */
export type TestProperty6 = string;
/**
 * (Required) The property name to look for
 */
export type Operator7 = string;
/**
 * The comparison to apply with `value`.
 */
export type Operator8 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 */
export type Subject6 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A string value.
 */
export type Value6 = string;
/**
 * Returns true when the float actor property matches the value provided.
 */
export type TestProperty7 = string;
/**
 * (Required) The property name to look for
 */
export type Operator9 = string;
/**
 * The comparison to apply with `value`.
 */
export type Operator10 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 */
export type Subject7 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A floating point value.
 */
export type Value7 = number;
/**
 * Returns true when the subject entity has the named ability.
 */
export type TestProperty8 = string;
/**
 * (Required) The Ability type to test.
 */
export type Value8 =
  | "flySpeed"
  | "flying"
  | "instabuild"
  | "invulnerable"
  | "lightning"
  | "mayfly"
  | "mute"
  | "noclip"
  | "walkSpeed"
  | "worldbuilder"
  | "verticalFlySpeed";
/**
 * Tests whether the biome the subject is in has the specified tag.
 */
export type TestProperty9 = string;
/**
 * The tag to look for.
 */
export type Value9 = string;
/**
 * Returns true when the subject entity contains the named component.
 */
export type TestProperty10 = string;
/**
 * (Required) The component name to look for.
 */
export type Value10 = string;
/**
 * The test property.
 */
export type Test = string;
/**
 * (Optional) true or false.
 */
export type Value11 = boolean;
/**
 * Returns true when the subject entity receives the named damage type.
 */
export type TestProperty11 = string;
/**
 * The Damage type to test.
 */
export type Value12 =
  | "anvil"
  | "attack"
  | "block_explosion"
  | "contact"
  | "drowning"
  | "entity_explosion"
  | "fall"
  | "falling_block"
  | "fatal"
  | "fire"
  | "fire_tick"
  | "fly_into_wall"
  | "lava"
  | "magic"
  | "none"
  | "override"
  | "piston"
  | "projectile"
  | "self_destruct"
  | "sonic_boom"
  | "stalactite"
  | "stalagmite"
  | "starve"
  | "suffocation"
  | "thorns"
  | "void"
  | "wither";
/**
 * A minecraft item identifier.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CA".
 */
export type ItemIdentifier = string;
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 */
export type Test1 = "has_equipment";
/**
 * The equipment location to test.
 */
export type Domain = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * The item name to look for.
 */
export type Value13 = string;
/**
 * Returns true when the subject entity is holding a item with the specified component.
 */
export type Test2 = "has_item_with_component";
/**
 * The component name to look for.
 */
export type Value14 = string;
/**
 * Tests for the presence of an item with the named tag in the designated slot of the subject entity.
 */
export type Test3 = "has_equipment_tag";
/**
 * The equipment location to test.
 */
export type Domain1 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * The item name to look for.
 */
export type Value15 = string;
/**
 * Tests for the presence of a damaged named item in the designated slot of the subject entity.
 */
export type Test4 = "has_damaged_equipment";
/**
 * The equipment location to test.
 */
export type Domain2 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * The item name to look for.
 */
export type Value16 = string;
/**
 * A mob effect
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CF".
 */
export type Effect =
  | "absorption"
  | "bad_omen"
  | "blindness"
  | "conduit_power"
  | "darkness"
  | "fatal_poison"
  | "fire_resistance"
  | "haste"
  | "health_boost"
  | "hunger"
  | "infested"
  | "instant_damage"
  | "instant_health"
  | "invisibility"
  | "jump_boost"
  | "levitation"
  | "mining_fatigue"
  | "nausea"
  | "night_vision"
  | "oozing"
  | "poison"
  | "raid_omen"
  | "regeneration"
  | "resistance"
  | "saturation"
  | "slow_falling"
  | "slowness"
  | "speed"
  | "strength"
  | "trial_omen"
  | "village_hero"
  | "water_breathing"
  | "weakness"
  | "weaving"
  | "wind_charged"
  | "wither";
/**
 * Tests whether the Subject has the specified mob effect.
 */
export type TestProperty12 = string;
/**
 * The specified mob effect.
 */
export type Value17 =
  | "absorption"
  | "bad_omen"
  | "blindness"
  | "conduit_power"
  | "darkness"
  | "fatal_poison"
  | "fire_resistance"
  | "haste"
  | "health_boost"
  | "hunger"
  | "infested"
  | "instant_damage"
  | "instant_health"
  | "invisibility"
  | "jump_boost"
  | "levitation"
  | "mining_fatigue"
  | "nausea"
  | "night_vision"
  | "oozing"
  | "poison"
  | "raid_omen"
  | "regeneration"
  | "resistance"
  | "saturation"
  | "slow_falling"
  | "slowness"
  | "speed"
  | "strength"
  | "trial_omen"
  | "village_hero"
  | "water_breathing"
  | "weakness"
  | "weaving"
  | "wind_charged"
  | "wither";
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 */
export type Test5 = "has_nametag";
/**
 * The namtag to look for
 */
export type Value18 = boolean;
/**
 * Tests for the presence of a property of the subject entity.
 */
export type TestProperty13 = string;
/**
 * The comparison to apply with `value`.
 */
export type Operator11 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 */
export type Subject8 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) The property name to look for.
 */
export type Value19 = string;
/**
 * The test property.
 */
export type Test6 = string;
/**
 * True or false.
 */
export type Value20 = boolean;
/**
 * Returns whether the subject entity has the same item equipped in the specified slot as calling entity.
 */
export type Test7 = "has_same_equipment_in_slot_as";
/**
 * The equipment location to test.
 */
export type Domain3 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * (Optional) true or false.
 */
export type Value21 = boolean;
/**
 * The test property.
 */
export type Test8 = string;
/**
 * True or false.
 */
export type Value22 = boolean;
/**
 * Returns true if the subject entity has the tag provided.
 */
export type TestProperty14 = string;
/**
 * The tag as a string.
 */
export type Value23 = string;
/**
 * The test property.
 */
export type Test9 = string;
/**
 * True or false.
 */
export type Value24 = boolean;
/**
 * Tests whether the target has any trade supply left. Will return false if the target cannot be traded with.
 */
export type TestProperty15 = string;
/**
 * True or false.
 */
export type Value25 = boolean;
/**
 * The test property.
 */
export type Test10 = string;
/**
 * (Required) A floating point value.
 */
export type Value26 = boolean & number;
/**
 * Compares the current 24 hour time with an int value in the range[0, 24000].
 */
export type TestProperty16 = "hourly_clock_time";
/**
 * (Required) An integer value set between 0 and 24000.
 */
export type Value27 = number;
/**
 * Returns true when the subject entity is inside a specified Block type.
 */
export type TestProperty17 = string;
/**
 * The comparison to apply with `value`.
 */
export type Operator12 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 */
export type Subject9 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Optional) A string value.
 */
export type Value28 = string;
/**
 * Returns true if the subject entity is in a caravan.
 */
export type TestProperty18 = string;
/**
 * True or false.
 */
export type Value29 = boolean;
/**
 * Returns true when the subject entity is in the clouds.
 */
export type TestProperty19 = string;
/**
 * True or false.
 */
export type Value30 = boolean;
/**
 * Returns true when the subject entity in contact with any water: water, rain, splash water bottle.
 */
export type TestProperty20 = string;
/**
 * (Optional) true or false.
 */
export type Value31 = boolean;
/**
 * Returns true when the subject entity is in lava.
 */
export type TestProperty21 = string;
/**
 * True or false.
 */
export type Value32 = boolean;
/**
 * The test property.
 */
export type Test11 = string;
/**
 * True or false.
 */
export type Value33 = boolean;
/**
 * The test property.
 */
export type Test12 = string;
/**
 * True or false.
 */
export type Value34 = boolean;
/**
 * Returns true when the subject entity is in water or rain.
 */
export type TestProperty22 = string;
/**
 * True or false.
 */
export type Value35 = boolean;
/**
 * Returns true when the subject entity is in water.
 */
export type TestProperty23 = string;
/**
 * True or false.
 */
export type Value36 = boolean;
/**
 * The test property.
 */
export type Test13 = string;
/**
 * The Family name to look for.
 */
export type Value37 = number;
/**
 * Returns true when the integer actor property matches the value provided.
 */
export type TestProperty24 = string;
/**
 * (Required) The property name to look for
 */
export type Operator13 = string;
/**
 * The comparison to apply with `value`.
 */
export type Operator14 = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 */
export type Subject10 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A integer value.
 */
export type Value38 = number;
/**
 * Tests the current altitude against a provided value. 0= bedrock elevation.
 */
export type TestProperty25 = string;
/**
 * The altitude value to compare with.
 */
export type Value39 = number;
/**
 * Returns true if the subject entity is fleeing from other mobs.
 */
export type TestProperty26 = string;
/**
 * True or false.
 */
export type Value40 = boolean;
/**
 * Tests whether the Subject is currently in the named biome.
 */
export type TestProperty27 = string;
/**
 * The biome type to test.
 */
export type Value41 = string;
/**
 * The test property.
 */
export type Test14 = string;
/**
 * The Family name to look for.
 */
export type Value42 = string;
/**
 * The test property.
 */
export type TestProperty28 = string;
/**
 * True or false.
 */
export type Value43 = boolean;
/**
 * Tests the current brightness against a provided value in the range (0.0f, 1.0f).
 */
export type TestProperty29 = string;
/**
 * The brightness value to compare with.
 */
export type Value44 = number;
/**
 * Returns true if the subject entity is climbing.
 */
export type TestProperty30 = string;
/**
 * True or false.
 */
export type Value45 = boolean;
/**
 * Returns true if the subject entity is the named color.
 */
export type TestProperty31 = string;
/**
 * The Palette Color to test.
 */
export type Value46 =
  | "black"
  | "blue"
  | "brown"
  | "cyan"
  | "gray"
  | "green"
  | "light_blue"
  | "light_green"
  | "magenta"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "silver"
  | "white"
  | "yellow";
/**
 * Returns true when the subject entity's controlling passenger is a member of the named family.
 */
export type TestProperty32 = string;
/**
 * The Family name to look for.
 */
export type Value47 = string;
/**
 * Returns true during the daylight hours.
 */
export type TestProperty33 = string;
/**
 * True or false.
 */
export type Value48 = boolean;
/**
 * Tests the current difficulty level of the game.
 */
export type TestProperty34 = string;
/**
 * The game's difficulty level to test.
 */
export type Value49 = "easy" | "hard" | "normal" | "peaceful";
/**
 * Returns true when the subject entity is a member of the named family.
 */
export type TestProperty35 = string;
/**
 * The Family name to look for.
 */
export type Value50 = string;
/**
 * Tests whether a named game rule is active.
 */
export type Value51 = boolean;
/**
 * Tests whether the Subject is in an area with humidity.
 */
export type TestProperty36 = string;
/**
 * True or false.
 */
export type Value52 = boolean;
/**
 * The test property.
 */
export type TestProperty37 = string;
/**
 * True or false.
 */
export type Value53 = boolean;
/**
 * The test property.
 */
export type TestProperty38 = string;
/**
 * True or false.
 */
export type Value54 = boolean;
/**
 * The test property.
 */
export type Test15 = string;
/**
 * True or false.
 */
export type Value55 = boolean;
/**
 * The test property.
 */
export type TestProperty39 = string;
/**
 * True or false.
 */
export type Value56 = boolean;
/**
 * The test property.
 */
export type TestProperty40 = string;
/**
 * The altitude value to compare with.
 */
export type Value57 = number;
/**
 * The test property.
 */
export type Test16 = string;
/**
 * True or false.
 */
export type Value58 = boolean;
/**
 * The test property.
 */
export type TestProperty41 = string;
/**
 * True or false.
 */
export type Value59 = boolean;
/**
 * The test property.
 */
export type TestProperty42 = string;
/**
 * True or false.
 */
export type Value60 = boolean;
/**
 * The test property.
 */
export type Test17 = string;
/**
 * True or false.
 */
export type Value61 = boolean;
/**
 * The test property.
 */
export type TestProperty43 = string;
/**
 * True or false.
 */
export type Value62 = boolean;
/**
 * The test property.
 */
export type TestProperty44 = string;
/**
 * True or false.
 */
export type Value63 = boolean;
/**
 * The test property.
 */
export type TestProperty45 = string;
/**
 * The altitude value to compare with.
 */
export type Value64 = number;
/**
 * The test property.
 */
export type Test18 = string;
/**
 * True or false.
 */
export type Value65 = boolean;
/**
 * The test property.
 */
export type TestProperty46 = string;
/**
 * True or false.
 */
export type Value66 = boolean;
/**
 * The test property.
 */
export type TestProperty47 = string;
/**
 * True or false.
 */
export type Value67 = boolean;
/**
 * The test property.
 */
export type TestProperty48 = string;
/**
 * True or false.
 */
export type Value68 = boolean;
/**
 * The test property.
 */
export type Test19 = string;
/**
 * True or false.
 */
export type Value69 = boolean;
/**
 * The test property.
 */
export type TestProperty49 = string;
/**
 * True or false.
 */
export type Value70 = boolean;
/**
 * Returns true if the subject entity is sitting.
 */
export type TestProperty50 = string;
/**
 * True or false.
 */
export type Value71 = boolean;
/**
 * The test property.
 */
export type TestProperty51 = string;
/**
 * True or false.
 */
export type Value72 = boolean;
/**
 * The test property.
 */
export type TestProperty52 = string;
/**
 * The Biome temperature catagory to test.
 */
export type Value73 = "cold" | "mild" | "ocean" | "warm";
/**
 * The test property.
 */
export type TestProperty53 = string;
/**
 * The Biome temperature value to compare with.
 */
export type Value74 = number;
/**
 * The test property.
 */
export type TestProperty54 = string;
/**
 * True or false.
 */
export type Value75 = boolean;
/**
 * The test property.
 */
export type TestProperty55 = string;
/**
 * True or false.
 */
export type Value76 = boolean;
/**
 * The test property.
 */
export type TestProperty56 = string;
/**
 * The altitude value to compare with.
 */
export type Value77 = number;
/**
 * The test property.
 */
export type TestProperty57 = string;
/**
 * The Family name to look for.
 */
export type Value78 = string;
/**
 * The test property.
 */
export type TestProperty58 = string;
/**
 * True or false.
 */
export type Value79 = boolean;
/**
 * The test property.
 */
export type Test20 = string;
/**
 * true or false.
 */
export type Value80 = boolean;
/**
 * The test property.
 */
export type Test21 = string;
/**
 * An integer value.
 */
export type Value81 = number;
/**
 * The test property.
 */
export type TestProperty59 = string;
/**
 * A floating point value.
 */
export type Value82 = number;
/**
 * The test property.
 */
export type TestProperty60 = string;
/**
 * An integer value.
 */
export type Value83 = number;
/**
 * The test property.
 */
export type TestProperty61 = string;
/**
 * True or false.
 */
export type Value84 = boolean;
/**
 * The test property.
 */
export type TestProperty62 = string;
/**
 * True or false.
 */
export type Value85 = boolean;
/**
 * The test property.
 */
export type Test22 = string;
/**
 * An integer value.
 */
export type Value86 = number;
/**
 * The test property.
 */
export type Test23 = string;
/**
 * An integer value.
 */
export type Value87 = number;
/**
 * The test property.
 */
export type Test24 = string;
/**
 * An integer value.
 */
export type Value88 = number;
/**
 * The test property.
 */
export type Test25 = string;
/**
 * True or false.
 */
export type Value89 = boolean;
/**
 * Tests if the subject is taking fire damage. Requires the damage_sensor component
 */
export type Test26 = string;
/**
 * True or false.
 */
export type Value90 = boolean;
/**
 * The test property.
 */
export type Test27 = string;
/**
 * (Required) A floating point value.
 */
export type Value91 = boolean & number;
/**
 * The test property.
 */
export type Test28 = string;
/**
 * (Required) A floating point value.
 */
export type Value92 = boolean & number;
/**
 * The test property.
 */
export type Test29 = string;
/**
 * True or false.
 */
export type Value93 = boolean;
/**
 * The test property.
 */
export type Test30 = string;
/**
 * The Family name to look for.
 */
export type Value94 = string;
/**
 * The test property.
 */
export type Test31 = string;
/**
 * The Family name to look for.
 */
export type Value95 = string;
/**
 * The test property.
 */
export type Test32 = string;
/**
 * (Required) A floating point value.
 */
export type Value96 = boolean & number;
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "C".
 */
export type Filters = CGroupsSpec[] | CFiltersSpec;
/**
 * An absolute height.
 */
export type Absolute = number;
/**
 * A relative height above the bottom of the dimension.
 */
export type AboveBottom = number;
/**
 * A relative height below the top of the dimension.
 */
export type BelowTop = number;
/**
 * A relative height starting at the dimensions sea level.
 */
export type FromSea = number;
export type Type = "constant";
export type Type1 = "uniform";
/**
 * The type of the the height provider. These values determine the format of the start_height JSON Object.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAF".
 */
export type HeightProvider = {
  [k: string]: unknown;
};
export type Type2 = "random_group";
/**
 * The data used when randomly selected.
 */
export type Data = {
  [k: string]: unknown;
};
/**
 * The weight of the item relative to the total weight of all items in the list.
 */
export type Weight = number;
/**
 * A weighted random list containing items that contain pool alias items. The pool alias types can be any valid type except random_group.
 */
export type Groups = WeightedRandomItem[];
export type Type3 = "direct";
/**
 * The alias of the Template Pool to replace.
 */
export type Alias = string;
/**
 * The Template Pool to substitute when matched.
 */
export type Target = string;
export type Type4 = "random";
/**
 * The alias of the Template Pool to replace.
 */
export type Alias1 = string;
/**
 * The Template Pool to substitute when matched.
 *
 * @minItems 2
 * @maxItems 2
 */
export type Target1 = [WeightedRandomItem1, WeightedRandomItem1];
/**
 * The data used when randomly selected.
 */
export type Data1 = string;
/**
 * The weight of the item relative to the total weight of all items in the list.
 */
export type Weight1 = number;

/**
 * A Jigsaw Structure is a group of Structure Templates that make up a larger structure. Jigsaw Structures are placed during world generation.
 */
export interface Jigsaw {
  format_version: FormatVersion;
  "minecraft:jigsaw": Jigsaw1;
}
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "B".
 */
export interface Jigsaw1 {
  biome_filters?: BiomeFilters;
  description: Description;
  heightmap_projection?: HeightmapProjection;
  max_depth: MaxDepth;
  start_height: StartHeight;
  start_pool: StartPool;
  start_jigsaw_name?: StartJigsawName;
  max_distance_from_center?: MaxDistanceFromCenter;
  pool_aliases?: PoolAliases;
  dimension_padding?: DimensionPadding | DimensionPadding1;
  step: Step;
  terrain_adaptation?: TerrainAdaptation;
  liquid_settings?: LiquidSettings;
}
/**
 * The description of this jigsaw.
 */
export interface Description {
  identifier: Identifier;
}
/**
 * Dimension padding prevents the structure from getting cut off at the top or bottom of the world.
 */
export interface DimensionPadding1 {
  top?: Top;
  bottom?: Bottom;
}
/**
 * Tests the health of the subject.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "D".
 */
export interface ActorHealth {
  test?: TestProperty;
  operator?: Operator1;
  subject?: Subject1;
  value: Value;
  [k: string]: unknown;
}
/**
 * Returns true when the designated equipment location for the subject entity is completely empty.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "G".
 */
export interface AllSlotsEmpty {
  test?: TestProperty1;
  operator?: Operator2;
  subject?: Subject2;
  value: Value1;
  [k: string]: unknown;
}
/**
 * Returns true when the designated equipment location for the subject entity has any empty slot.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "I".
 */
export interface AnySlotsEmpty {
  test?: TestProperty2;
  operator?: Operator3;
  subject?: Subject3;
  value: Value2;
  [k: string]: unknown;
}
/**
 * Returns true when the bool actor property matches the value provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "J".
 */
export interface BoolProperty {
  test?: TestProperty3;
  domain: Operator4;
  operator?: Operator5;
  subject?: Subject4;
  value?: Value3;
  [k: string]: unknown;
}
/**
 * Compares the current time with a float value in the range (0.0, 1.0).
 * 0.0= Noon
 * 0.25= Sunset
 * 0.5= Midnight
 * 0.75= Sunrise
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface ClockTime {
  test?: TestProperty4;
  operator?: Operator6;
  subject?: Subject5;
  value: Value4;
  [k: string]: unknown;
}
/**
 * Compares the distance to the nearest Player with a float value.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BB".
 */
export interface DistanceToNearestPlayer {
  test?: TestProperty5;
  operator?: Operator;
  subject?: Subject;
  value: Value5;
  [k: string]: unknown;
}
/**
 * Returns true when the enum actor property matches the value provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BC".
 */
export interface EnumProperty {
  test?: TestProperty6;
  domain: Operator7;
  operator?: Operator8;
  subject?: Subject6;
  value: Value6;
  [k: string]: unknown;
}
/**
 * Returns true when the float actor property matches the value provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface FloatProperty {
  test?: TestProperty7;
  domain: Operator9;
  operator?: Operator10;
  subject?: Subject7;
  value: Value7;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity has the named ability.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface HasAbility {
  test?: TestProperty8;
  operator?: Operator;
  subject?: Subject;
  value: Value8;
  [k: string]: unknown;
}
/**
 * Tests whether the biome the subject is in has the specified tag.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface HasBiomeTag {
  test?: TestProperty9;
  operator?: Operator;
  subject?: Subject;
  value: Value9;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity contains the named component.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface HasComponent {
  test?: TestProperty10;
  operator?: Operator;
  subject?: Subject;
  value: Value10;
  [k: string]: unknown;
}
/**
 * Returns true when the subject Player entity has opened a container.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BH".
 */
export interface HasContainerOpen {
  test?: Test;
  operator?: Operator;
  subject?: Subject;
  value?: Value11;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity receives the named damage type. has_damage can also use subject and operator parameters but they are optional.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BI".
 */
export interface HasDamage {
  test?: TestProperty11;
  operator?: Operator;
  subject?: Subject;
  value: Value12;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface HasEquipment {
  test?: Test1;
  domain?: Domain;
  operator?: Operator;
  subject?: Subject;
  value: Value13;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is holding a item with the specified component.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CB".
 */
export interface HasEquipmentTag {
  test?: Test2;
  operator?: Operator;
  subject?: Subject;
  value: Value14;
  [k: string]: unknown;
}
/**
 * Tests for the presence of an item with the named tag in the designated slot of the subject entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CC".
 */
export interface HasEquipmentTag1 {
  test?: Test3;
  domain?: Domain1;
  operator?: Operator;
  subject?: Subject;
  value: Value15;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a damaged named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CD".
 */
export interface HasDamagedEquipment {
  test?: Test4;
  domain?: Domain2;
  operator?: Operator;
  subject?: Subject;
  value: Value16;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject has the specified mob effect.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CE".
 */
export interface HasMobEffect {
  test?: TestProperty12;
  operator?: Operator;
  subject?: Subject;
  value: Value17;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CG".
 */
export interface HasEquipment1 {
  test?: Test5;
  operator?: Operator;
  subject?: Subject;
  value: Value18;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a property of the subject entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CH".
 */
export interface HasProperty {
  test?: TestProperty13;
  operator?: Operator11;
  subject?: Subject8;
  value: Value19;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is holding a ranged weapon like a bow or crossbow.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CI".
 */
export interface HasRangedWeapon {
  test?: Test6;
  operator?: Operator;
  subject?: Subject;
  value?: Value20;
  [k: string]: unknown;
}
/**
 * Returns whether the subject entity has the same item equipped in the specified slot as calling entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "CJ".
 */
export interface HasSameEquipmentInSlotAs {
  test?: Test7;
  domain?: Domain3;
  operator?: Operator;
  subject?: Subject;
  value: Value21;
  [k: string]: unknown;
}
/**
 * Tests if the subject is holding an item with silk touch.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DA".
 */
export interface HasSilkTouch {
  test?: Test8;
  operator?: Operator;
  subject?: Subject;
  value?: Value22;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has the tag provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DB".
 */
export interface HasTag {
  test?: TestProperty14;
  operator?: Operator;
  subject?: Subject;
  value: Value23;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has a valid target.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DC".
 */
export interface HasTarget {
  test?: Test9;
  operator?: Operator;
  subject?: Subject;
  value?: Value24;
  [k: string]: unknown;
}
/**
 * Tests whether the target has any trade supply left. Will return false if the target cannot be traded with.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DD".
 */
export interface HasTradeSupply {
  test?: TestProperty15;
  operator?: Operator;
  subject?: Subject;
  value?: Value25;
  [k: string]: unknown;
}
/**
 * Tests the distance between the subject and its home. Returns false if the subject has no home or if their home is in a different dimension.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DE".
 */
export interface HomeDistance {
  test?: Test10;
  operator?: Operator;
  subject?: Subject;
  value: Value26;
  [k: string]: unknown;
}
/**
 * Compares the current 24 hour time with an int value in the range[0, 24000].
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DF".
 */
export interface HourlyClockTime {
  test?: TestProperty16;
  operator?: Operator;
  subject?: Subject;
  value: Value27;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is inside a specified Block type.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DG".
 */
export interface InBlock {
  test?: TestProperty17;
  operator?: Operator12;
  subject?: Subject9;
  value?: Value28;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is in a caravan.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DH".
 */
export interface InCaravan {
  test?: TestProperty18;
  operator?: Operator;
  subject?: Subject;
  value?: Value29;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in the clouds.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DI".
 */
export interface InClouds {
  test?: TestProperty19;
  operator?: Operator;
  subject?: Subject;
  value?: Value30;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity in contact with any water: water, rain, splash water bottle.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "DJ".
 */
export interface InContactWithWater {
  test?: TestProperty20;
  operator?: Operator;
  subject?: Subject;
  value?: Value31;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in lava.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EA".
 */
export interface InLava {
  test?: TestProperty21;
  operator?: Operator;
  subject?: Subject;
  value?: Value32;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in Nether.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EB".
 */
export interface InNether {
  test?: Test11;
  operator?: Operator;
  subject?: Subject;
  value?: Value33;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in Overworld.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EC".
 */
export interface InOverworld {
  test?: Test12;
  operator?: Operator;
  subject?: Subject;
  value?: Value34;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in water or rain.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "ED".
 */
export interface InWaterOrRain {
  test?: TestProperty22;
  operator?: Operator;
  subject?: Subject;
  value?: Value35;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in water.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EE".
 */
export interface InWater {
  test?: TestProperty23;
  operator?: Operator;
  subject?: Subject;
  value?: Value36;
  [k: string]: unknown;
}
/**
 * Tests if the specified duration in seconds of inactivity for despawning has been reached.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EF".
 */
export interface InactivityTimer {
  test?: Test13;
  operator?: Operator;
  subject?: Subject;
  value: Value37;
  [k: string]: unknown;
}
/**
 * Returns true when the integer actor property matches the value provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EG".
 */
export interface IntProperty {
  test?: TestProperty24;
  domain: Operator13;
  operator?: Operator14;
  subject?: Subject10;
  value: Value38;
  [k: string]: unknown;
}
/**
 * Tests the current altitude against a provided value. 0= bedrock elevation.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EH".
 */
export interface IsAltitude {
  test?: TestProperty25;
  operator?: Operator;
  subject?: Subject;
  value: Value39;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is fleeing from other mobs.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EI".
 */
export interface IsAvoidingMobs {
  test?: TestProperty26;
  operator?: Operator;
  subject?: Subject;
  value?: Value40;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is currently in the named biome.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "EJ".
 */
export interface IsBiome {
  test?: TestProperty27;
  operator?: Operator;
  subject?: Subject;
  value: Value41;
  [k: string]: unknown;
}
/**
 * Returns true when the block has the given name.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FA".
 */
export interface IsBlock {
  test?: Test14;
  operator?: Operator;
  subject?: Subject;
  value: Value42;
  [k: string]: unknown;
}
/**
 * Tests that the Creaking Heart that spawned the subject Creaking still exists.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FB".
 */
export interface IsBoundToCreakingHeart {
  test?: TestProperty28;
  operator?: Operator;
  subject?: Subject;
  value?: Value43;
  [k: string]: unknown;
}
/**
 * Tests the current brightness against a provided value in the range (0.0f, 1.0f).
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FC".
 */
export interface IsBrightness {
  test?: TestProperty29;
  operator?: Operator;
  subject?: Subject;
  value: Value44;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is climbing.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FD".
 */
export interface IsClimbing {
  test?: TestProperty30;
  operator?: Operator;
  subject?: Subject;
  value?: Value45;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the named color.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FE".
 */
export interface IsColor {
  test?: TestProperty31;
  operator?: Operator;
  subject?: Subject;
  value: Value46;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity's controlling passenger is a member of the named family.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FF".
 */
export interface IsControllingPassengerFamily {
  test?: TestProperty32;
  operator?: Operator;
  subject?: Subject;
  value: Value47;
  [k: string]: unknown;
}
/**
 * Returns true during the daylight hours.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FG".
 */
export interface IsDaytime {
  test?: TestProperty33;
  operator?: Operator;
  subject?: Subject;
  value?: Value48;
  [k: string]: unknown;
}
/**
 * Tests the current difficulty level of the game.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FH".
 */
export interface IsDifficulty {
  test?: TestProperty34;
  operator?: Operator;
  subject?: Subject;
  value: Value49;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is a member of the named family.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FI".
 */
export interface IsFamily {
  test?: TestProperty35;
  operator?: Operator;
  subject?: Subject;
  value: Value50;
  [k: string]: unknown;
}
/**
 * Tests whether a named game rule is active.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "FJ".
 */
export interface IsGameRule {
  domain: Domain4;
  operator?: Operator;
  subject?: Subject;
  value: Value51;
  [k: string]: unknown;
}
/**
 * The Game Rule to test.
 */
export interface Domain4 {
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is in an area with humidity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GA".
 */
export interface IsHumid {
  test?: TestProperty36;
  operator?: Operator;
  subject?: Subject;
  value?: Value52;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is immobile. An entity is immobile if it lacks AI goals, has just changed dimensions or if it is a mob and has no health.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GB".
 */
export interface IsImmobile {
  test?: TestProperty37;
  operator?: Operator;
  subject?: Subject;
  value?: Value53;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is inside the bounds of a village.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GC".
 */
export interface IsInVillage {
  test?: TestProperty38;
  operator?: Operator;
  subject?: Subject;
  value?: Value54;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity leashed to the calling entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GD".
 */
export interface IsLeashedTo {
  test?: Test15;
  operator?: Operator;
  subject?: Subject;
  value?: Value55;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is leashed.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GE".
 */
export interface IsLeashed {
  test?: TestProperty39;
  operator?: Operator;
  subject?: Subject;
  value?: Value56;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the mark variant number provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GF".
 */
export interface IsMarkVariant {
  test?: TestProperty40;
  operator?: Operator;
  subject?: Subject;
  value?: Value57;
}
/**
 * Tests if the subject is not at full health.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GG".
 */
export interface InNether1 {
  test?: Test16;
  operator?: Operator;
  subject?: Subject;
  value?: Value58;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is moving.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GH".
 */
export interface IsMoving {
  test?: TestProperty41;
  operator?: Operator;
  subject?: Subject;
  value?: Value59;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the owner of the calling entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GI".
 */
export interface IsOwner {
  test?: TestProperty42;
  operator?: Operator;
  subject?: Subject;
  value?: Value60;
  [k: string]: unknown;
}
/**
 * Tests if the subject's persistence matches the bool value passed in.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "GJ".
 */
export interface IsPersistent {
  test?: Test17;
  operator?: Operator;
  subject?: Subject;
  value?: Value61;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is riding the calling entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HA".
 */
export interface IsRidingSelf {
  test?: TestProperty43;
  operator?: Operator;
  subject?: Subject;
  value?: Value62;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is riding on another entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HB".
 */
export interface IsRiding {
  test?: TestProperty44;
  operator?: Operator;
  subject?: Subject;
  value?: Value63;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the skin id number provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HC".
 */
export interface IsSkinId {
  test?: TestProperty45;
  operator?: Operator;
  subject?: Subject;
  value?: Value64;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is sleeping.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HD".
 */
export interface IsSleeping {
  test?: Test18;
  operator?: Operator;
  subject?: Subject;
  value?: Value65;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has the sneak input held.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HE".
 */
export interface IsSneakHeld {
  test?: TestProperty46;
  operator?: Operator;
  subject?: Subject;
  value?: Value66;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is sneaking.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HF".
 */
export interface IsSneaking {
  test?: TestProperty47;
  operator?: Operator;
  subject?: Subject;
  value?: Value67;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is in an area with snow cover.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HG".
 */
export interface IsSnowCovered {
  test?: TestProperty48;
  operator?: Operator;
  subject?: Subject;
  value?: Value68;
  [k: string]: unknown;
}
/**
 * Tests if the subject is sprinting.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HH".
 */
export interface IsSprinting {
  test?: Test19;
  operator?: Operator;
  subject?: Subject;
  value?: Value69;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is tamed.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HI".
 */
export interface IsTamed {
  test?: TestProperty49;
  operator?: Operator;
  subject?: Subject;
  value?: Value70;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is sitting
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "HJ".
 */
export interface IsSitting {
  test?: TestProperty50;
  operator?: Operator;
  subject?: Subject;
  value?: Value71;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the target of the calling entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IA".
 */
export interface IsTarget {
  test?: TestProperty51;
  operator?: Operator;
  subject?: Subject;
  value?: Value72;
  [k: string]: unknown;
}
/**
 * Tests whether the current temperature is a given type.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IB".
 */
export interface IsTarget1 {
  test?: TestProperty52;
  operator?: Operator;
  subject?: Subject;
  value: Value73;
  [k: string]: unknown;
}
/**
 * Tests the current temperature against a provided value in the range (0.0, 1.0) where 0.0f is the coldest temp and 1.0f is the hottest.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IC".
 */
export interface IsTemperatureValue {
  test?: TestProperty53;
  operator?: Operator;
  subject?: Subject;
  value: Value74;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is underground. An entity is considered underground if there are non-solid blocks above it.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "ID".
 */
export interface IsUnderground {
  test?: TestProperty54;
  operator?: Operator;
  subject?: Subject;
  value?: Value75;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is under water. An entity is considered underwater if it is completely submerged in water blocks.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IE".
 */
export interface IsUnderwater {
  test?: TestProperty55;
  operator?: Operator;
  subject?: Subject;
  value?: Value76;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the variant number provided.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IF".
 */
export interface IsVariant {
  test?: TestProperty56;
  operator?: Operator;
  subject?: Subject;
  value: Value77;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity's vehicle is a member of the named family.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IG".
 */
export interface IsVehicleFamily {
  test?: TestProperty57;
  operator?: Operator;
  subject?: Subject;
  value: Value78;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is visible.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IH".
 */
export interface IsVisible {
  test?: TestProperty58;
  operator?: Operator;
  subject?: Subject;
  value?: Value79;
  [k: string]: unknown;
}
/**
 * Tests if the subject block is submerged in water.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "II".
 */
export interface IsWaterlogged {
  test?: Test20;
  operator?: Operator;
  subject?: Subject;
  value: Value80;
  [k: string]: unknown;
}
/**
 * Tests is the mob is outside of the specified light level range (0, 16).
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "IJ".
 */
export interface LightLevel {
  test?: Test21;
  operator?: Operator;
  subject?: Subject;
  value: Value81;
  [k: string]: unknown;
}
/**
 * Compares the current moon intensity with a float value in the range (0.0, 1.0)
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JA".
 */
export interface MoonIntensity {
  test?: TestProperty59;
  operator?: Operator;
  subject?: Subject;
  value: Value82;
  [k: string]: unknown;
}
/**
 * Compares the current moon phase with an integer value in the range (0, 7).
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JB".
 */
export interface MoonPhase {
  test?: TestProperty60;
  operator?: Operator;
  subject?: Subject;
  value: Value83;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is on ground.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JC".
 */
export interface OnGround {
  test?: TestProperty61;
  operator?: Operator;
  subject?: Subject;
  value?: Value84;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is on a ladder.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JD".
 */
export interface OnLadder {
  test?: TestProperty62;
  operator?: Operator;
  subject?: Subject;
  value?: Value85;
  [k: string]: unknown;
}
/**
 * Returns true if the random chance rolls 0 out of a specified Maximum range.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JE".
 */
export interface RandomChance {
  test?: Test22;
  operator?: Operator;
  subject?: Subject;
  value: Value86;
  [k: string]: unknown;
}
/**
 * Tests the redstone strength at the subject's position.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JF".
 */
export interface RedstoneStrengthAtPosition {
  test?: Test23;
  operator?: Operator;
  subject?: Subject;
  value: Value87;
  [k: string]: unknown;
}
/**
 * Returns the number of riders on this entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JG".
 */
export interface RiderCount {
  test?: Test24;
  operator?: Operator;
  subject?: Subject;
  value: Value88;
  [k: string]: unknown;
}
/**
 * Tests if the subject is a surface mob.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JH".
 */
export interface SurfaceMob {
  test?: Test25;
  operator?: Operator;
  subject?: Subject;
  value?: Value89;
  [k: string]: unknown;
}
/**
 * Tests if the subject is taking fire damage. Requires the damage_sensor component
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JI".
 */
export interface TakingFireDamage {
  test?: Test26;
  operator?: Operator;
  subject?: Subject;
  value?: Value90;
  [k: string]: unknown;
}
/**
 * Tests the distance between the calling entity and its target.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "JJ".
 */
export interface TargetDistance {
  test?: Test27;
  operator?: Operator;
  subject?: Subject;
  value: Value91;
  [k: string]: unknown;
}
/**
 * Tests the distance between the subject and its owner. Returns false if there is no owner.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAA".
 */
export interface OwnerDistance {
  test?: Test28;
  operator?: Operator;
  subject?: Subject;
  value: Value92;
  [k: string]: unknown;
}
/**
 * Returns true if the subject is trusted by entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAB".
 */
export interface Trusts {
  test?: Test29;
  operator?: Operator;
  subject?: Subject;
  value?: Value93;
  [k: string]: unknown;
}
/**
 * Tests the current weather, at the actor's position, against a provided weather value.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAC".
 */
export interface WeatherAtPosition {
  test?: Test30;
  operator?: Operator;
  subject?: Subject;
  value: Value94;
  [k: string]: unknown;
}
/**
 * Tests for the current weather state the entity is experiencing.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAD".
 */
export interface Weather {
  test?: Test31;
  operator?: Operator;
  subject?: Subject;
  value: Value95;
  [k: string]: unknown;
}
/**
 * Returns the Y rotation of this entity.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAE".
 */
export interface YRotation {
  test?: Test32;
  operator?: Operator;
  subject?: Subject;
  value: Value96;
  [k: string]: unknown;
}
/**
 * A vertical anchor defines a point in the dimension to offset from. There are four types and each has it own individually named property
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAH".
 */
export interface VerticalAnchor {
  absolute?: Absolute;
  above_bottom?: AboveBottom;
  below_top?: BelowTop;
  from_sea?: FromSea;
}
/**
 * Constant anchor point.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAG".
 */
export interface Constant {
  type: Type;
  value: VerticalAnchor;
  [k: string]: unknown;
}
/**
 * When the type is "uniform" it now also expects two vertical anchor points to use as the minimum and maximum heights over which to perform the uniform distribution.
 *
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAI".
 */
export interface Uniform {
  type: Type1;
  min: VerticalAnchor;
  max: VerticalAnchor;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BAJ_random_group".
 */
export interface RandomGroup {
  type: Type2;
  groups: Groups;
  [k: string]: unknown;
}
/**
 * A used by Weighted Random Lists.
 */
export interface WeightedRandomItem {
  data?: Data;
  weight?: Weight;
}
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BBA".
 */
export interface Direct {
  type: Type3;
  alias: Alias;
  target: Target;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `Jigsaw`'s JSON-Schema
 * via the `definition` "BBB".
 */
export interface Random {
  type: Type4;
  alias: Alias1;
  targets: Target1;
  [k: string]: unknown;
}
/**
 * A used by Weighted Random Lists.
 */
export interface WeightedRandomItem1 {
  data?: Data1;
  weight?: Weight1;
}
