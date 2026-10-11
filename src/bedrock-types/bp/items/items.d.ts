/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Item`'s JSON-Schema
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
 * The identifier for this item. The name must include a namespace and must not use the Minecraft namespace unless overriding a Vanilla item.
 */
export type Identifier = string;
/**
 * If this item is experimental, it will only be registered if the world is marked as experimental.
 */
export type IsExperimental = boolean;
/**
 * A translation string of an existing group in minecraft to group this block/item under
 */
export type Group = string;
/**
 * Determines which category this block/item will be placed under in the inventory and crafting table container screens.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "D".
 */
export type Category = "construction" | "equipment" | "items" | "nature" | "none";
/**
 * Determines whether or not this item can be used with commands. Commands can use items by default
 */
export type IsHiddenInCommands = boolean;
/**
 * The allow off hand component determines whether the item can be placed in the off hand slot of the inventory.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "E".
 */
export type AllowOffHand =
  | boolean
  | {
      value: Value;
    };
/**
 * Whether the item can be placed in the off hand slot
 */
export type Value = boolean;
/**
 * Set the placement block name for the planter item.
 */
export type Block = string;
/**
 * Tags.
 */
export type Tags = string;
/**
 * List of block descriptors that contain blocks that this item can be used on. If left empty, all blocks will be allowed.
 */
export type UseOn = AllowedBlock[];
/**
 * Allows you to specify that this item should replace the default item created for the data-driven block it places.
 */
export type ReplaceBlockItem = boolean;
/**
 * The can destroy in creative component determines if the item will break blocks in creative when swinging.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "I".
 */
export type CanDestroyInCreative =
  | boolean
  | {
      value: Value1;
    };
/**
 * Whether the item can destroy blocks while in creative
 */
export type Value1 = boolean;
/**
 * The chance of this item generating a compost layer when supplied to the composter block.
 */
export type CompostingChance = number;
/**
 * The type of cool down for this item.
 */
export type Category1 = string;
/**
 * The duration of time this item will spend cooling down before becoming usable again.
 */
export type Duration = number;
/**
 * Defines the action the cooldown applies to, in a mutually exclusive way, so cooldowns for one action type do not affect the other
 */
export type Type = "use" | "attack";
/**
 * Used to register custom components.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BB".
 */
export type CustomComponents = string[];
/**
 * The damage component determines how much extra damage the item does on attack.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BC".
 */
export type Damage =
  | number
  | {
      value: Value2;
    };
/**
 * How much extra damage the item does, must be a positive number.
 */
export type Value2 = number;
/**
 * List of damage causes that can be absorbed by the item. By default, no damage cause is absorbed.
 *
 * @minItems 1
 */
export type AbsorbableCauses = [EntityDamageSource, ...EntityDamageSource[]];
/**
 * The types of damage an entity can receive.
 */
export type EntityDamageSource =
  | "all"
  | "anvil"
  | "block_explosion"
  | "campfire"
  | "charging"
  | "contact"
  | "drowning"
  | "entity_attack"
  | "entity_explosion"
  | "fall"
  | "falling_block"
  | "fire"
  | "fire_tick"
  | "fireworks"
  | "fly_into_wall"
  | "freezing"
  | "lava"
  | "lightning"
  | "magic"
  | "magma"
  | "none"
  | "override"
  | "piston"
  | "projectile"
  | "ram_attack"
  | "self_destruct"
  | "sonic_boom"
  | "soul_campfire"
  | "stalactite"
  | "stalagmite"
  | "starve"
  | "suffocation"
  | "temperature"
  | "thorns"
  | "void"
  | "wither";
/**
 * Toggles if the item will be used efficiently.
 */
export type UseEfficiency = boolean;
export type Speed = number;
export type Block1 =
  | string
  | {
      tags?: BlockTags;
    };
/**
 * The block tags.
 */
export type BlockTags = string;
/**
 * Destroy speed per block.
 */
export type DestroySpeeds = DestroySpeed[];
/**
 * Set the display name for an item.
 */
export type Value3 = string;
/**
 * Sound effect to emit when the threshold is met.
 */
export type SoundEvent = string;
/**
 * The minimum.
 */
export type Min = number;
/**
 * The maximum.
 */
export type Max = number;
/**
 * Maximum durability is the amount of damage that this item can take before breaking.
 */
export type MaximumDurability = number;
/**
 * Color to use by default. If you do not want a default color you can leave the "default_color" off and the texture will be the same as if you did not have the component until it is dyed.
 */
export type DefaultColor = string | [] | [Red] | [Red, Green] | [Red, Green, Blue];
export type Red = number;
export type Green = number;
export type Blue = number;
/**
 * The slot type to be used to determine which enchantment types this item can be enchanted with.
 */
export type Slot =
  | "all"
  | "armor_feet"
  | "armor_head"
  | "armor_legs"
  | "armor_torso"
  | "axe"
  | "bow"
  | "carrot_stick"
  | "cosmetic_head"
  | "crossbow"
  | "elytra"
  | "fishing_rod"
  | "flintsteel"
  | "g_armor"
  | "g_digging"
  | "g_tool"
  | "hoe"
  | "melee_spear"
  | "none"
  | "pickaxe"
  | "shears"
  | "shield"
  | "shovel"
  | "spear"
  | "sword";
/**
 * The enchantability of the item.
 */
export type Value4 = number;
/**
 * The entity to be placed in the world.
 */
export type Entity = string;
/**
 * Block that item can be dispensed on.
 */
export type BlockDescriptor = BlockIdentifier | BlockReference;
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
 * List of block descriptors that contain blocks that this item can be dispensed on. If left empty, all blocks will be allowed.
 */
export type DispenseOn = BlockDescriptor[];
/**
 * Block that item can be used on
 */
export type BlockDescriptor1 = BlockIdentifier | BlockReference;
/**
 * List of block descriptors that contain blocks that this item can be used on. If left empty, all blocks will be allowed.
 */
export type UseOn1 = BlockDescriptor1[];
/**
 * If true you can always eat this item (even when not hungry), defaults to false.
 */
export type CanAlwaysEat = boolean;
/**
 * How much nutrition does this food item give the player when eaten.
 */
export type Nutrition = number;
/**
 * Saturation Modifier is used in this formula: (nutrition * saturation_modifier * 2) when appling the saturation buff. Which happens when you eat the item.
 */
export type SaturationModifier = number;
/**
 * When used, convert the *this* item to the one specified by `using_converts_to`.
 */
export type UsingConvertsTo = string;
/**
 * How long in seconds will this fuel cook items for.
 */
export type Duration1 = number;
/**
 * The glint component determines whether the item has the enchanted glint render effect on it
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CI".
 */
export type Glint =
  | boolean
  | {
      value: Value5;
    };
/**
 * Whether the item has the glint effect.
 */
export type Value5 = boolean;
/**
 * This component determines if an item is rendered like a tool while in hand.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CJ".
 */
export type HandEquipped =
  | boolean
  | {
      value: Value6;
    };
/**
 * If the item is rendered like a tool while in hand.
 */
export type Value6 = boolean;
/**
 * The icon item componenent determines the icon to represent the item in the UI and elsewhere.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DA".
 */
export type Icon =
  | string
  | {
      textures: Textures;
    };
/**
 * The key from the resource_pack/textures/item_texture.json `texture_data` object associated with the texture file Example: blaze_powder.
 */
export type DefaultTexture = string;
/**
 * The key from the resource_pack/textures/item_texture.json `texture_data` object associated with the texture file Example: blaze_powder.
 */
export type Texture = string;
/**
 * A boolean or string that determines if the interact button is shown in touch controls, and what text is displayed on the button. When set to 'true', the default 'Use Item' text will be used.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DB".
 */
export type InteractButton = boolean | string;
/**
 * Value added to the the scaled dot product (after applying "damage_multiplier").
 */
export type DamageModifier = number;
/**
 * Value multiplied to sum of the dot products of the user and target's velocity vectors projected onto the view vector.
 */
export type DamageMultiplier = number;
/**
 * Time, in ticks, after which kinetic damage and its effects start being applied.
 */
export type Delay = number;
/**
 * Added tolerance to the view vector raycast for detecting entity collisions.
 */
export type HitboxMargin = number;
/**
 * The liquid clipped component determines whether the item interacts with liquid blocks on use.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DD".
 */
export type LiquidClipped =
  | boolean
  | {
      value: Value7;
    };
/**
 * Whether the item interacts with liquid blocks on use.
 */
export type Value7 = boolean;
/**
 * The max stack size component determines how many of the item can be stacked together.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DE".
 */
export type MaxStackSize =
  | number
  | {
      value: Value8;
    };
/**
 * How many of the item that can be stacked.
 */
export type Value8 = number;
/**
 * Added tolerance to the view vector raycast for detecting entity collisions.
 */
export type HitboxMargin1 = number;
/**
 * How long you must charge a projectile for it to critically hit.
 */
export type MinimumCriticalPower = number;
/**
 * The entity to be fired as a projectile.
 */
export type ProjectileEntity = string;
/**
 * Signal strength for comparator blocks to use, from 1 - 13
 */
export type ComparatorSignal = number;
/**
 * Duration of sound event in seconds, float value.
 */
export type Duration2 = number;
/**
 * Sound event type: 13, cat, blocks, chirp, far, mall, mellohi, stal, strad, ward, 11, wait, pigstep, otherside, 5, relic.
 */
export type SoundEvent1 = string;
/**
 * Specifies the base rarity and subsequently color of the item name when the player hovers the cursor over the item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DI".
 */
export type Rarity =
  | ("common" | "uncommon" | "rare" | "epic")
  | {
      /**
       * Sets the base rarity of the item. The rarity of an item automatically increases when enchanted, either to Rare when the base rarity is Common or Uncommon, or Epic when the base rarity is Rare.
       */
      value?: "common" | "uncommon" | "rare" | "epic";
      [k: string]: unknown;
    };
/**
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EA".
 */
export type EA =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * A minecraft item identifier.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "C".
 */
export type ItemIdentifier = string;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier1 = string;
/**
 * [UNDOCUMENTED] A Molang expression ran against item or block to match.
 */
export type Molang1 = string;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier2 = string;
/**
 * Items that can be used to repeair it
 */
export type Items = EA[];
/**
 * Amount that can be repaired
 */
export type RepairAmount = string | number;
/**
 * Repair item entries.
 */
export type RepairItems = ReparItem[];
/**
 * Item identifier
 */
export type Item2 = string;
/**
 * If ammo can be in offhand
 */
export type UseOffhand = boolean;
/**
 * If ammo can be stored in the inventory
 */
export type SearchInventory = boolean;
/**
 * If it needs ammo to be used in creative
 */
export type UseInCreative = boolean;
/**
 * Ammunition.
 */
export type Ammunition = Ammunition1[];
/**
 * Charge on draw? Default is set to false.
 */
export type ChargeOnDraw = boolean;
/**
 * Draw Duration. Default is set to 0.
 */
export type MaximumDrawDuration = number;
/**
 * Scale power by draw duration? Default is set to false.
 */
export type ScalePowerByDrawDuration = boolean;
/**
 * Should despawn component determines if the item should eventually despawn while floating in the world
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "ED".
 */
export type ShouldDespawn =
  | boolean
  | {
      value: Value9;
    };
/**
 * Whether the item should eventually despawn while floating in the world
 */
export type Value9 = boolean;
/**
 * The stacked by data component determines if the same item with different aux values can stack.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EE".
 */
export type StackedByData =
  | boolean
  | {
      value: Value10;
    };
/**
 * Also defines whether the item actors can merge while floating in the world.
 */
export type Value10 = boolean;
/**
 * Determines whether another Storage Item is allowed inside of this item. Default is true.
 */
export type AllowNestedStorageItems = boolean;
/**
 * List of items that are exclusively allowed in this Storage Item. If empty all items are allowed.
 */
export type AllowedItems = string[];
/**
 * List of items that are not allowed in this Storage Item.
 */
export type BannedItems = string[];
/**
 * The maximum number of different item stacks. Maximum is 64. Default is 64.
 */
export type MaxSlots = number;
/**
 * The maximum allowed weight of the sum of all contained items.
 */
export type MaxWeightLimit = number;
/**
 * The weight of this item when inside another Storage Item. 0 means item is not allowed in another Storage Item.
 */
export type WeightInStorageItem = number;
/**
 * Sound played when an attack hits and deals critical damage.
 */
export type AttackCriticalHit = string;
/**
 * Sound played when an attack hits.
 */
export type AttackHit = string;
/**
 * Sound played when an attack misses or deals no damage due to invulnerability.
 */
export type AttackMiss = string;
/**
 * An array that can contain multiple item tags.
 *
 * @minItems 1
 */
export type Tags2 = [
  (
    | (
        | "minecraft:arrow"
        | "minecraft:banner"
        | "minecraft:boat"
        | "minecraft:boats"
        | "minecraft:bookshelf_books"
        | "minecraft:chainmail_tier"
        | "minecraft:coals"
        | "minecraft:crimson_stems"
        | "minecraft:decorated_pot_sherds"
        | "minecraft:diamond_tier"
        | "minecraft:digger"
        | "minecraft:door"
        | "minecraft:golden_tier"
        | "minecraft:hanging_actor"
        | "minecraft:hanging_sign"
        | "minecraft:horse_armor"
        | "minecraft:iron_tier"
        | "minecraft:is_armor"
        | "minecraft:is_axe"
        | "minecraft:is_cooked"
        | "minecraft:is_fish"
        | "minecraft:is_food"
        | "minecraft:is_hoe"
        | "minecraft:is_meat"
        | "minecraft:is_minecart"
        | "minecraft:is_pickaxe"
        | "minecraft:is_shovel"
        | "minecraft:is_sword"
        | "minecraft:is_tool"
        | "minecraft:is_trident"
        | "minecraft:leather_tier"
        | "minecraft:lectern_books"
        | "minecraft:logs"
        | "minecraft:logs_that_burn"
        | "minecraft:mangrove_logs"
        | "minecraft:music_disc"
        | "minecraft:netherite_tier"
        | "minecraft:planks"
        | "minecraft:sand"
        | "minecraft:sign"
        | "minecraft:soul_fire_base_blocks"
        | "minecraft:spawn_egg"
        | "minecraft:stone_bricks"
        | "minecraft:stone_crafting_materials"
        | "minecraft:stone_tier"
        | "minecraft:stone_tool_materials"
        | "minecraft:sulfur_cube_archetype_bouncy"
        | "minecraft:sulfur_cube_archetype_regular"
        | "minecraft:sulfur_cube_archetype_slow_flat"
        | "minecraft:sulfur_cube_archetype_fast_flat"
        | "minecraft:sulfur_cube_archetype_light"
        | "minecraft:sulfur_cube_archetype_fast_sliding"
        | "minecraft:sulfur_cube_archetype_slow_sliding"
        | "minecraft:sulfur_cube_archetype_sticky"
        | "minecraft:sulfur_cube_archetype_high_resistance"
        | "minecraft:transform_materials"
        | "minecraft:transform_templates"
        | "minecraft:transformable_items"
        | "minecraft:trim_templates"
        | "minecraft:trimmable_armors"
        | "minecraft:vibration_damper"
        | "minecraft:warped_stems"
        | "minecraft:wooden_slabs"
        | "minecraft:wooden_tier"
        | "minecraft:wool"
      )
    | string
  ),
  ...(
    | (
        | "minecraft:arrow"
        | "minecraft:banner"
        | "minecraft:boat"
        | "minecraft:boats"
        | "minecraft:bookshelf_books"
        | "minecraft:chainmail_tier"
        | "minecraft:coals"
        | "minecraft:crimson_stems"
        | "minecraft:decorated_pot_sherds"
        | "minecraft:diamond_tier"
        | "minecraft:digger"
        | "minecraft:door"
        | "minecraft:golden_tier"
        | "minecraft:hanging_actor"
        | "minecraft:hanging_sign"
        | "minecraft:horse_armor"
        | "minecraft:iron_tier"
        | "minecraft:is_armor"
        | "minecraft:is_axe"
        | "minecraft:is_cooked"
        | "minecraft:is_fish"
        | "minecraft:is_food"
        | "minecraft:is_hoe"
        | "minecraft:is_meat"
        | "minecraft:is_minecart"
        | "minecraft:is_pickaxe"
        | "minecraft:is_shovel"
        | "minecraft:is_sword"
        | "minecraft:is_tool"
        | "minecraft:is_trident"
        | "minecraft:leather_tier"
        | "minecraft:lectern_books"
        | "minecraft:logs"
        | "minecraft:logs_that_burn"
        | "minecraft:mangrove_logs"
        | "minecraft:music_disc"
        | "minecraft:netherite_tier"
        | "minecraft:planks"
        | "minecraft:sand"
        | "minecraft:sign"
        | "minecraft:soul_fire_base_blocks"
        | "minecraft:spawn_egg"
        | "minecraft:stone_bricks"
        | "minecraft:stone_crafting_materials"
        | "minecraft:stone_tier"
        | "minecraft:stone_tool_materials"
        | "minecraft:sulfur_cube_archetype_bouncy"
        | "minecraft:sulfur_cube_archetype_regular"
        | "minecraft:sulfur_cube_archetype_slow_flat"
        | "minecraft:sulfur_cube_archetype_fast_flat"
        | "minecraft:sulfur_cube_archetype_light"
        | "minecraft:sulfur_cube_archetype_fast_sliding"
        | "minecraft:sulfur_cube_archetype_slow_sliding"
        | "minecraft:sulfur_cube_archetype_sticky"
        | "minecraft:sulfur_cube_archetype_high_resistance"
        | "minecraft:transform_materials"
        | "minecraft:transform_templates"
        | "minecraft:transformable_items"
        | "minecraft:trim_templates"
        | "minecraft:trimmable_armors"
        | "minecraft:vibration_damper"
        | "minecraft:warped_stems"
        | "minecraft:wooden_slabs"
        | "minecraft:wooden_tier"
        | "minecraft:wool"
      )
    | string
  )[]
];
/**
 * Whether the item should use the swing animation when thrown. Default is set to false.
 */
export type DoSwingAnimation = boolean;
/**
 * The scale at which the power of the throw increases. Default is set to 1.0.
 */
export type LaunchPowerScale = number;
/**
 * The maximum duration to draw a throwable item. Default is set to 0.0.
 */
export type MaximumDrawDuration1 = number;
/**
 * The minimum duration to draw a throwable item. Default is set to 0.0.
 */
export type MinimumDrawDuration = number;
/**
 * The maximum power to launch the throwable item. Default is set to 1.0.
 */
export type MaximumLaunchPower = number;
/**
 * Whether or not the power of the throw increases with duration charged. Default is set to false.
 */
export type ScalePowerByDrawDuration1 = boolean;
/**
 * This component determines which animation plays when using the item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FC".
 */
export type UseAnimation =
  | FCAnimation
  | {
      value: Value11;
    };
/**
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FC_animation".
 */
export type FCAnimation = "bow" | "brush" | "camera" | "crossbow" | "drink" | "eat" | "none" | "spear" | "spyglass";
/**
 * Which animation to play when using the item.
 */
export type Value11 = "bow" | "brush" | "camera" | "crossbow" | "drink" | "eat" | "none" | "spear" | "spyglass";
/**
 * Modifier value to scale the players movement speed when item is in use.
 */
export type MovementModifier = number;
/**
 * How long the item takes to use in seconds.
 */
export type UseDuration = number;
/**
 * Whether vibrations are emitted when the item starts or stops being used.
 */
export type EmitVibrations = boolean;
/**
 * Sound played when the item starts being used.
 */
export type StartSound = string;
/**
 * Controls how using the item triggers start using behavior. "if_first" only starts if no other component has started using yet; "always" always restarts using. Defaults to "if_first".
 */
export type StartUsing = "if_first" | "always";
/**
 * How much protection does the armor item have.
 */
export type Protection = number;
/**
 * Sets if the item can be dropped by a dispenser block
 */
export type Dispensable = boolean;
/**
 * Which equipment slot the item can fit in
 */
export type Slot1 =
  | "none"
  | "slot.weapon.mainhand"
  | "slot.weapon.offhand"
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.hotbar"
  | "slot.inventory"
  | "slot.enderchest"
  | "slot.saddle"
  | "slot.armor"
  | "slot.chest"
  | "slot.equippable";
/**
 * Defines whether Players are hidden on the Locator Bar and Locator Maps when eqipped in the appropriate wearable slot
 */
export type HidesPlayerLocation = boolean;
/**
 * Molang definition.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "G".
 */
export type Molang2 = string;
/**
 * The types of damage an entity can receive.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BE".
 */
export type EntityDamageSource1 =
  | "all"
  | "anvil"
  | "block_explosion"
  | "campfire"
  | "charging"
  | "contact"
  | "drowning"
  | "entity_attack"
  | "entity_explosion"
  | "fall"
  | "falling_block"
  | "fire"
  | "fire_tick"
  | "fireworks"
  | "fly_into_wall"
  | "freezing"
  | "lava"
  | "lightning"
  | "magic"
  | "magma"
  | "none"
  | "override"
  | "piston"
  | "projectile"
  | "ram_attack"
  | "self_destruct"
  | "sonic_boom"
  | "soul_campfire"
  | "stalactite"
  | "stalagmite"
  | "starve"
  | "suffocation"
  | "temperature"
  | "thorns"
  | "void"
  | "wither";
/**
 * Reference to a sound definition in "sound_definitions.json".
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BI".
 */
export type SoundEvent2 = string;
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CE".
 */
export type BlockIdentifier2 = string;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CD".
 */
export type BlockReference1 = BlockIdentifier | BlockReference;
/**
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DI_rarities".
 */
export type DIRarities = "common" | "uncommon" | "rare" | "epic";
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EB".
 */
export type MolangNumber = string | number;

/**
 * Minecraft items
 */
export interface Item {
  format_version: FormatVersion;
  "minecraft:item": Item1;
  [k: string]: unknown;
}
/**
 * An item definition.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "B".
 */
export interface Item1 {
  description: Description;
  /**
   * The components of this item.
   */
  components?: {
    "minecraft:allow_off_hand"?: AllowOffHand;
    "minecraft:block_placer"?: BlockPlacer;
    "minecraft:bundle_interaction"?: BundleInteraction;
    "minecraft:can_destroy_in_creative"?: CanDestroyInCreative;
    "minecraft:compostable"?: Compostable;
    "minecraft:cooldown"?: Cooldown;
    "minecraft:custom_components"?: CustomComponents;
    "minecraft:damage"?: Damage;
    "minecraft:damage_absorption"?: DamageAbsorption;
    "minecraft:digger"?: Digger;
    "minecraft:display_name"?: DisplayName;
    "minecraft:durability_sensor"?: DurabilitySensor;
    "minecraft:durability"?: Durability;
    "minecraft:dyeable"?: Dyeable;
    "minecraft:enchantable"?: Enchantable;
    "minecraft:entity_placer"?: EntityPlacer;
    "minecraft:fire_resistant"?: FireResistant;
    "minecraft:food"?: Food;
    "minecraft:fuel"?: Fuel;
    "minecraft:glint"?: Glint;
    "minecraft:hand_equipped"?: HandEquipped;
    "minecraft:icon"?: Icon;
    "minecraft:interact_button"?: InteractButton;
    "minecraft:kinetic_weapon"?: KineticWeapon;
    "minecraft:liquid_clipped"?: LiquidClipped;
    "minecraft:max_stack_size"?: MaxStackSize;
    "minecraft:piercing_weapon"?: PiercingWeapon;
    "minecraft:projectile"?: Projectile;
    "minecraft:record"?: Record;
    "minecraft:rarity"?: Rarity;
    "minecraft:repairable"?: Repairable;
    "minecraft:shooter"?: Shooter;
    "minecraft:should_despawn"?: ShouldDespawn;
    "minecraft:stacked_by_data"?: StackedByData;
    "minecraft:storage_item"?: StorageItem;
    "minecraft:storage_weight_limit"?: StorageWeightLimit;
    "minecraft:storage_weight_modifier"?: StorageWeightModifier;
    "minecraft:swing_duration"?: SwingDuration;
    "minecraft:swing_sounds"?: SwingSounds;
    "minecraft:tags"?: Tags1;
    "minecraft:throwable"?: Throwable;
    "minecraft:use_animation"?: UseAnimation;
    "minecraft:use_modifiers"?: UseModifiers;
    "minecraft:wearable"?: Wearable;
    [k: string]: unknown;
  };
}
/**
 * The description for this item.
 */
export interface Description {
  identifier?: Identifier;
  is_experimental?: IsExperimental;
  menu_category?: MenuCategory;
}
/**
 * The Creative Category that includes the specified item.
 */
export interface MenuCategory {
  group?: Group;
  category?: Category;
  is_hidden_in_commands?: IsHiddenInCommands;
}
/**
 * Planter item component. planter items are items that can be planted.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "F".
 */
export interface BlockPlacer {
  /**
   * If true, block placement through this item will be aligned while holding the interaction button down. Defaults to false.
   */
  aligned_placement?: boolean;
  block: Block;
  use_on?: UseOn;
  replace_block_item?: ReplaceBlockItem;
}
/**
 * A block descriptor that allows to be placed.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "F_use_on_item".
 */
export interface AllowedBlock {
  tags?: Tags;
  [k: string]: unknown;
}
/**
 * Adds bundle-specific interactions and tooltip to the item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "H".
 */
export interface BundleInteraction {
  /**
   * The maximum number of slots in the bundle viewable by the plater. Can be from 1 to 64. Default is 12.
   */
  num_viewable_slots?: number;
  [k: string]: unknown;
}
/**
 * Allows items to be compostable in the composter block.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "J".
 */
export interface Compostable {
  composting_chance?: CompostingChance;
}
/**
 * Cool down time for a component. After you use an item it becomes unusable for the duration specified by the `cool down time` setting in this component.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface Cooldown {
  category: Category1;
  duration: Duration;
  type?: Type;
}
/**
 * It allows an item to absorb damage that would otherwise be dealt to its wearer. For this to happen, the item needs to be equipped in an armor slot. The absorbed damage reduces the item's durability, with any excess damage being ignored. Because of this, the item also needs a `minecraft:durability` component.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface DamageAbsorption {
  absorbable_causes: AbsorbableCauses;
  [k: string]: unknown;
}
/**
 * Digger item. Component put on items that dig.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface Digger {
  use_efficiency?: UseEfficiency;
  destroy_speeds: DestroySpeeds;
}
/**
 * Destroy speed per block.
 */
export interface DestroySpeed {
  speed?: Speed;
  block?: Block1;
}
/**
 * Display Name item component. Display Names display the name of an item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface DisplayName {
  value: Value3;
}
/**
 * Defines both the durability threshold, and the effects emitted when that threshold is met.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BH".
 */
export interface DurabilitySensor {
  /**
   * The effects are emitted when the item durability value is less than or equal to this value.
   */
  durability?: number;
  /**
   * Particle effect to emit when the threshold is met.
   */
  particle_type?: string;
  sound_event?: SoundEvent;
  [k: string]: unknown;
}
/**
 * Durability item component: how much damage can this item take before breaking.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface Durability {
  damage_chance?: DamageChance;
  max_durability: MaximumDurability;
}
/**
 * Damage chance.
 */
export interface DamageChance {
  min: Min;
  max: Max;
}
/**
 * Enables custom items to be dyed in cauldrons.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CA".
 */
export interface Dyeable {
  default_color?: DefaultColor;
  [k: string]: unknown;
}
/**
 * The enchantable component determines what enchantments can be applied to the item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CB".
 */
export interface Enchantable {
  slot: Slot;
  value?: Value4;
}
/**
 * Entity placer item component. You can specifiy allowed blocks that the item is restricted to.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CC".
 */
export interface EntityPlacer {
  entity: Entity;
  dispense_on?: DispenseOn;
  use_on?: UseOn1;
}
export interface BlockReference {
  name?: BlockIdentifier1;
  states?: States;
  tags?: Molang;
}
export interface States {
  [k: string]: StateValue;
}
/**
 * Determines whether an item is immune to burning when dropped in fire or lava
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CF".
 */
export interface FireResistant {
  value?: boolean;
}
/**
 * When an item has a food component, it becomes edible to the player.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CG".
 */
export interface Food {
  can_always_eat?: CanAlwaysEat;
  nutrition?: Nutrition;
  saturation_modifier?: SaturationModifier;
  using_converts_to?: UsingConvertsTo;
}
/**
 * Fuel component. Allows this item to be used as fuel in a furnace to `cook` other items.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "CH".
 */
export interface Fuel {
  duration: Duration1;
}
/**
 * Contains key-value pairs of textures used by the item
 */
export interface Textures {
  default: DefaultTexture;
  [k: string]: Texture;
}
/**
 * Allows an item to deal kinetic damage and its effects. This happens every tick while in use, in a straight line along the user's view vector, with damage computed based on both the user's and the target's velocity projected onto the view vector (via a dot product). The more the user and target move toward each other, and the more this movement is aligned with the user's view vector, the higher the damage. After "damage_multiplier" and "damage_modifier" are applied, the resulting damage is floored to the nearest lower integer.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DC".
 */
export interface KineticWeapon {
  creative_reach?: CreativeReach;
  damage_conditions?: DamageConditions;
  damage_modifier?: DamageModifier;
  damage_multiplier?: DamageMultiplier;
  delay?: Delay;
  dismount_conditions?: DismountConditions;
  hitbox_margin?: HitboxMargin;
  knockback_conditions?: KnockbackConditions;
  reach?: Reach;
}
/**
 * Defines the reach used when the user is in Creative Mode. Defaults to "reach" if unspecified.
 */
export interface CreativeReach {
  max?: number;
  min?: number;
}
/**
 * Conditions that need to be satisfied for damage to be applied. If not specified, damage is not applied.
 */
export interface DamageConditions {
  /**
   * Time, in ticks, during which the effect can be applied after "delay" elapses. If negative, the effect is applied indefinitely.
   */
  max_duration?: number;
  /**
   * Minimum relative speed of the user with respect to the target (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_relative_speed?: number;
  /**
   * Minimum user's speed (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_speed?: number;
}
/**
 * Conditions that need to be satisfied for riders to be dismounted. If not specified, riders cannot be dismounted.
 */
export interface DismountConditions {
  /**
   * Time, in ticks, during which the effect can be applied after "delay" elapses. If negative, the effect is applied indefinitely.
   */
  max_duration?: number;
  /**
   * Minimum relative speed of the user with respect to the target (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_relative_speed?: number;
  /**
   * Minimum user's speed (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_speed?: number;
}
/**
 * Conditions that need to be satisfied for knockback to be applied. If not specified, knockback is not applied.
 */
export interface KnockbackConditions {
  /**
   * Time, in ticks, during which the effect can be applied after "delay" elapses. If negative, the effect is applied indefinitely.
   */
  max_duration?: number;
  /**
   * Minimum relative speed of the user with respect to the target (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_relative_speed?: number;
  /**
   * Minimum user's speed (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_speed?: number;
}
/**
 * Defines the range (in blocks) along the user's view vector where entities can be hit. Only targets within this distance are considered. Block collisions between the user and target block damage and its effects.
 */
export interface Reach {
  max?: number;
  min?: number;
}
/**
 * Allows an item to deal damage to all entities detected in a straight line along the user's view vector. Items with this component cannot destroy blocks, as the attack action always takes priority, regardless of what the user is looking at.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DF".
 */
export interface PiercingWeapon {
  creative_reach?: CreativeReach1;
  hitbox_margin?: HitboxMargin1;
  reach?: Reach1;
}
/**
 * Defines the reach used when the user is in Creative Mode. Defaults to "reach" if unspecified.
 */
export interface CreativeReach1 {
  max?: number;
  min?: number;
}
/**
 * Defines the range (in blocks) along the user's view vector where entities can be hit. Only targets within this distance are considered. Block collisions between the user and target block damage and its effects.
 */
export interface Reach1 {
  max?: number;
  min?: number;
}
/**
 * Compels the item shoot, like an arrow.  Pair with minecraft:shooter for dispensers or as ammunition.  Pair with minecraft:throwable to set the entity spawned.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DG".
 */
export interface Projectile {
  minimum_critical_power?: MinimumCriticalPower;
  projectile_entity: ProjectileEntity;
}
/**
 * Used by record items to play music.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DH".
 */
export interface Record {
  comparator_signal?: ComparatorSignal;
  duration?: Duration2;
  sound_event: SoundEvent1;
}
/**
 * Repairable item component: how much damage can this item repair, what items can repair it.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DJ".
 */
export interface Repairable {
  repair_items?: RepairItems;
}
/**
 * List of repair item entries.
 */
export interface ReparItem {
  items?: Items;
  repair_amount?: RepairAmount;
}
/**
 * An object that describes an item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EA_object_item_descriptor".
 */
export interface ItemDescriptor {
  item?: ItemIdentifier1 | ItemDescriptor1;
  tags?: Molang1;
  /**
   * [UNDOCUMENTED] A tag to lookup item or block by.
   */
  item_tag?: string;
}
/**
 * An object that describes an item.
 */
export interface ItemDescriptor1 {
  item?: ItemIdentifier1 | ItemDescriptor1;
  tags?: Molang1;
  /**
   * [UNDOCUMENTED] A tag to lookup item or block by.
   */
  item_tag?: string;
}
/**
 * An object that describes an item.
 */
export interface ItemDescriptor2 {
  item?: ItemIdentifier1 | ItemDescriptor1;
  tags?: Molang1;
  /**
   * [UNDOCUMENTED] A tag to lookup item or block by.
   */
  item_tag?: string;
}
/**
 * Shooter Item Component.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EC".
 */
export interface Shooter {
  ammunition?: Ammunition;
  charge_on_draw?: ChargeOnDraw;
  max_draw_duration?: MaximumDrawDuration;
  scale_power_by_draw_duration?: ScalePowerByDrawDuration;
}
/**
 * Ammunition definition
 */
export interface Ammunition1 {
  item?: Item2;
  use_offhand?: UseOffhand;
  search_inventory?: SearchInventory;
  use_in_creative?: UseInCreative;
}
/**
 * Storage Items can be used by other components to store other items within this item.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EF".
 */
export interface StorageItem {
  allow_nested_storage_items?: AllowNestedStorageItems;
  allowed_items?: AllowedItems;
  banned_items?: BannedItems;
  max_slots?: MaxSlots;
  [k: string]: unknown;
}
/**
 * Specifies the maximum weight limit that a storage item can hold
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EG".
 */
export interface StorageWeightLimit {
  max_weight_limit?: MaxWeightLimit;
  [k: string]: unknown;
}
/**
 * Specifies the maximum weight limit that a storage item can hold.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EH".
 */
export interface StorageWeightModifier {
  weight_in_storage_item?: WeightInStorageItem;
  [k: string]: unknown;
}
/**
 * Duration, in seconds, of the item's swing animation played when mining or attacking. Affects visuals only and does not impact attack frequency or other gameplay mechanics.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EI".
 */
export interface SwingDuration {
  /**
   * Duration, in seconds, of the item's swing animation played when mining or attacking. Affects visuals only and does not impact attack frequency or other gameplay mechanics.
   */
  value?: number;
}
/**
 * Overrides the swing sounds emitted by the user.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "EJ".
 */
export interface SwingSounds {
  attack_critical_hit?: AttackCriticalHit;
  attack_hit?: AttackHit;
  attack_miss?: AttackMiss;
}
/**
 * The tags component determines which tags an item has on it.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FA".
 */
export interface Tags1 {
  tags: Tags2;
}
/**
 * Throwable item component. Throwable items, such as a snowball.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FB".
 */
export interface Throwable {
  do_swing_animation?: DoSwingAnimation;
  launch_power_scale?: LaunchPowerScale;
  max_draw_duration?: MaximumDrawDuration1;
  min_draw_duration?: MinimumDrawDuration;
  max_launch_power?: MaximumLaunchPower;
  scale_power_by_draw_duration?: ScalePowerByDrawDuration1;
}
/**
 * How long to use before item is done being used.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FD".
 */
export interface UseModifiers {
  movement_modifier?: MovementModifier;
  use_duration: UseDuration;
  emit_vibrations?: EmitVibrations;
  start_sound?: StartSound;
  start_using?: StartUsing;
}
/**
 * Wearable item component.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "FE".
 */
export interface Wearable {
  protection?: Protection;
  dispensable?: Dispensable;
  slot?: Slot1;
  hides_player_location?: HidesPlayerLocation;
}
/**
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DC_range".
 */
export interface DCRange {
  max?: number;
  min?: number;
}
/**
 * Conditions that need to be satisfied for a specific effect of a kinetic weapon to be applied.
 *
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DC_conditions".
 */
export interface Conditions {
  /**
   * Time, in ticks, during which the effect can be applied after "delay" elapses. If negative, the effect is applied indefinitely.
   */
  max_duration?: number;
  /**
   * Minimum relative speed of the user with respect to the target (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_relative_speed?: number;
  /**
   * Minimum user's speed (projected onto the view vector via a dot product) required for the effect to be applied.
   */
  min_speed?: number;
}
/**
 * This interface was referenced by `Item`'s JSON-Schema
 * via the `definition` "DF_range".
 */
export interface DFRange {
  max?: number;
  min?: number;
}
