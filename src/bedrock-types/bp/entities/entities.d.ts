/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * Allows an entity to use experimental features.
 */
export type UseBetaFeatures = boolean;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
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
 * The name of the animation controller / animation.
 */
export type AnimationController = string;
/**
 * Sets the identifier for this entity's description.
 */
export type Identifier = string;
/**
 * Sets whether or not this entity has a spawn egg in the creative ui.
 */
export type IsSpawnable = boolean;
/**
 * Sets whether or not we can summon this entity using commands such as /summon.
 */
export type IsSummonableProperty = boolean;
/**
 * Sets whether or not this entity is experimental. Experimental entities are only enabled when the experimental toggle is enabled.
 */
export type IsExperimental = boolean;
/**
 * The default value of the property.
 */
export type Default = string | boolean;
/**
 * The default value of the property.
 */
export type Default1 = string | number;
/**
 * The range of the property.
 */
export type Range = [] | [Min] | [Min, Max];
/**
 * The minimum value of the property.
 */
export type Min = number;
/**
 * The minimum value of the property.
 */
export type Max = number;
/**
 * The default value of the property.
 */
export type Default2 = string | number;
/**
 * The range of the property.
 */
export type Range1 = [] | [Min1] | [Min1, Max1];
/**
 * The minimum value of the property.
 */
export type Min1 = number;
/**
 * The minimum value of the property.
 */
export type Max1 = number;
/**
 * Sets whether or not the property is synced to the client.
 */
export type ClientSync = boolean;
/**
 * The values of the property.
 *
 * @minItems 1
 */
export type Values = [string, ...string[]];
/**
 * Sets the name for the Vanilla Minecraft identifier this entity will use to build itself from.
 */
export type RuntimeIdentifier = string;
/**
 * The name of an animation controller referenced in animations.
 */
export type Animation = string;
export type Animation1 = string;
/**
 * Tells minecraft to run which animation / animation controllers and under what conditions.
 */
export type Animate = (Animation | ConditionalAnimation)[];
/**
 * Version to upgrade to
 */
export type UpgradeTo = number;
/**
 * Name of the upgrade. Must match the name of a respective upgrade
 */
export type Name = string;
/**
 * Each entry specifies an integer upgrade_to version and a name string referencing an upgrade handler defined in a new top-level upgrades section of the entity definition.
 */
export type Upgrades = {
  upgrade_to?: UpgradeTo;
  name?: Name;
}[];
/**
 * The minimum starting health an entity has.
 */
export type Minimum = number;
/**
 * The maximum starting health an entity has.
 */
export type Maximum = number;
/**
 * The amount of health an entity to start with by default.
 */
export type Value =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin;
      range_max?: RangeMax;
    }
  | {
      min?: Min2;
      max?: Max2;
    };
/**
 * The first value of the range.
 */
export type A2 = number;
/**
 * The second value of the range.
 */
export type B = number;
/**
 * The minimum value of the range.
 */
export type RangeMin = number;
/**
 * The maximum value of the range.
 */
export type RangeMax = number;
/**
 * The minimum value of the range.
 */
export type Min2 = number;
/**
 * The maximum value of the range.
 */
export type Max2 = number;
/**
 * Adds a rider to the entity. Requires `minecraft:rideable.`
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "I".
 */
export type AddRider =
  | IEntry
  | {
      riders?: Riders;
    };
/**
 * The entity type that will be riding this entity.
 */
export type EntityType = string;
/**
 * The spawn event that will be used when the riding entity is created.
 */
export type SpawnEvent = string;
/**
 * Array of riders to add to the entity
 */
export type Riders = IEntry[];
/**
 * Duration, in seconds, for which mob won't admire items if it was hurt.
 */
export type CooldownAfterBeingAttacked = number;
/**
 * Duration, in seconds, that the mob is pacified.
 */
export type Duration = number;
/**
 * List of items that the entity drops when it grows up.
 */
export type DropItems =
  | BB[]
  | ((
      | ItemIdentifier
      | ItemDescriptor
      | {
          item?: ItemIdentifier2 | ItemDescriptor2;
          [k: string]: unknown;
        }
    ) &
      string);
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BB".
 */
export type BB =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * A minecraft item identifier.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BC".
 */
export type ItemIdentifier = string;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier1 = string;
/**
 * [UNDOCUMENTED] A Molang expression ran against item or block to match.
 */
export type Molang = string;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier2 = string;
/**
 * List of items that can be fed to the entity to pause growth for baby entities.
 */
export type PauseGrowthItems =
  | BB[]
  | ((
      | ItemIdentifier
      | ItemDescriptor
      | {
          item?: ItemIdentifier2 | ItemDescriptor2;
          [k: string]: unknown;
        }
    ) &
      string);
/**
 * List of items that can be used to reset growth for baby entities.
 */
export type ResetGrowthItems =
  | BB[]
  | ((
      | ItemIdentifier
      | ItemDescriptor
      | {
          item?: ItemIdentifier2 | ItemDescriptor2;
          [k: string]: unknown;
        }
    ) &
      string);
/**
 * Amount of time before the entity grows up, -1 for always a baby.
 */
export type Duration1 = number;
/**
 * List of items that can be fed to the entity. Includes `item` for the item name and `growth` to define how much time it grows up by
 */
export type FeedItems =
  | (
      | ItemIdentifier
      | {
          growth?: number;
          item?: BB;
          result_item?: ResultItem;
          [k: string]: unknown;
        }
    )[]
  | ItemIdentifier3;
/**
 * The feed item used will transform to this item upon successful interaction. Format: itemName:auxValue
 */
export type ResultItem =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier3 = string;
export type Filters = BFGroupsSpec[] | BFFiltersSpec;
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BF_groups_spec".
 */
export type BFGroupsSpec = BFGroupsSpec[] | BFFiltersSpec;
export type BFFiltersSpec =
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
export type AllOf = BFGroupsSpec[] | BFFiltersSpec;
/**
 * One or more tests in an `any_of` group must pass in order for the group to pass.
 */
export type AnyOf = BFGroupsSpec[] | BFFiltersSpec;
/**
 * All tests in a `none_of` group must fail in order for the group to pass.
 */
export type NoneOf = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The event to fire.
 */
export type Event = string;
/**
 * The target of the event.
 */
export type Target = "baby" | "block" | "damager" | "other" | "parent" | "player" | "self" | "target";
/**
 * List of conditions to meet so that the entity can be fed.
 */
export type InteractFilters = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The higher the number, the more air drag affects this entity. A value of 1.0 means regular air drag, while 2.0 means twice as much
 */
export type Value1 = number;
/**
 * Level sound event to be played as the ambient sound.
 */
export type EventName = string;
/**
 * The condition that must be satisfied to select the given ambient sound.
 */
export type Condition = string;
/**
 * Level sound event to be played as the ambient sound.
 */
export type EventName1 = string;
/**
 * Maximum time in seconds to randomly add to the ambient sound delay time.
 */
export type Range2 = number;
/**
 * Minimum time in seconds before the entity plays its ambient sound again.
 */
export type Value2 = number;
/**
 * Anger level will decay over time. Defines how often anger towards all nuisances will be decreased by one
 */
export type AngerDecrementInterval = number;
/**
 * Anger boost applied to angry threshold when mob gets angry.
 */
export type AngryBoost = number;
/**
 * Threshold that define when the mob is considered angry at a nuisance.
 */
export type AngryThreshold = number;
/**
 * The default amount of annoyingness for any given nuisance. Specifies how much to raise anger level on each provocation
 */
export type DefaultAnnoyingness = number;
/**
 * The default amount of annoyingness for projectile nuisance. Specifies how much to raise anger level on each provocation
 */
export type DefaultProjectileAnnoyingness = number;
/**
 * The maximum anger level that can be reached. Applies to any nuisance
 */
export type MaximumAnger = number;
/**
 * Filter that is applied to determine if a mob can be a nuisance.
 */
export type NuisanceFilter = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The event that will trigger the sound
 */
export type Condition1 = string;
/**
 * The sound to play
 */
export type Sound = string;
export type OnIncreaseSounds = {
  condition: Condition1;
  sound: Sound;
}[];
/**
 * Defines if the mob should remove target if it falls below 'angry' threshold.
 */
export type RemoveTargetsBelowAngryThreshold = boolean;
/**
 * If true, other entities of the same entity definition within the broadcastRange will also become angry.
 */
export type BroadcastAnger = boolean;
/**
 * Conditions that make this entry in the list valid.
 */
export type BroadcastFilters = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Filter out mob types that it should not attack while angry (other Piglins).
 */
export type Filters1 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Distance in blocks within which other entities of the same entity definition will become angry.
 */
export type BroadcastRange = number;
/**
 * An entity family.
 */
export type BroadcastTargets1 = string;
/**
 * A list of entity families to broadcast anger to.
 */
export type BroadcastTargets = BroadcastTargets1[];
/**
 * The sound event to play when the mob is angry.
 */
export type AngrySound = string;
/**
 * If true, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob attacks.
 */
export type BroadcastAngerOnAttack = boolean;
/**
 * If true, other entities of the same entity definition within the broadcastRange will also become angry whenever this mob is attacked.
 */
export type BroadcastAngerOnBeingAttacked = boolean;
/**
 * If false, when this mob is killed it does not spread its anger to other entities of the same entity definition within the broadcastRange
 */
export type BroadcastAngerWhenDying = boolean;
/**
 * The amount of time in seconds that the entity will be angry.
 */
export type Duration2 = number;
/**
 * Variance in seconds added to the duration [-delta, delta].
 */
export type DurationDelta = number;
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export type SoundInterval =
  | []
  | [Minimum1]
  | [Minimum1, Maximum1]
  | {
      range_min?: RangeMinimum;
      range_max?: RangeMaximum;
    };
/**
 * The minimum interval.
 */
export type Minimum1 = number;
/**
 * The maximum interval.
 */
export type Maximum1 = number;
/**
 * The minimum interval.
 */
export type RangeMinimum = number;
/**
 * The maximum interval.
 */
export type RangeMaximum = number;
/**
 * The time in seconds required to break through doors.
 */
export type BreakTime = number;
/**
 * The minimum difficulty that the world must be on for this entity to break doors.
 */
export type MinimumDifficulty = string;
/**
 * Defines how much the target is hit backwards
 */
export type HorizontalPower = number;
/**
 * Defines how much the target is hit upwards
 */
export type VerticalPower = number;
/**
 * Defines the target's maximum vertical upwards velocity after the target's knockback rules have been evaluated
 */
export type VerticalVelocityCap = number;
/**
 * Defines whether the target should be fully immersed in water for the knockback rules to apply
 */
export type CheckIfTargetIsImmersedInWater = boolean;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filter = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Scales the previous velocity of the target when hit
 */
export type SlowdownScale = number;
/**
 * Enables scaling the magnitude of knocback based on the inverse square of the damage
 */
export type ScaleWithDamage = boolean;
/**
 * Handles extra knockback from enchantments, sprinting and swimming
 */
export type EXtraKnockbackApproach = "reapply_default" | "multiply" | "multiply_reduced";
/**
 * Provides more intuitive control over how knockback is applied
 */
export type KnockbackMode = "relative_horizontal" | "hit_direction";
/**
 * Defines how this entity behaves when leashed to another entity. A preset is selected upon leashing and remains until the entity is leashed to something else. The first preset whose "filter" conditions are met will be applied; if none match, a default configuration is used instead.
 */
export type Presets = Preset[];
/**
 * The type of damage that is applied to entities that enter the damage range.
 */
export type Cause =
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
 * Attack cooldown (in seconds) for how often this entity can attack a target.
 */
export type DamageCooldown = number;
/**
 * How much damage per tick is applied to entities that enter the damage range.
 */
export type DamagePerTick = number;
/**
 * How close a hostile entity must be to have the damage applied.
 */
export type DamageRange = number;
/**
 * The set of entities that are valid to apply the damage to when within range.
 */
export type EntityFilter = BFGroupsSpec[] | BFFiltersSpec;
/**
 * If the entity should play their attack sound when attacking a target.
 */
export type PlayAttackSound = boolean;
/**
 * If the entity should use itself as the damage source when attacking a target.
 */
export type UseSelfAsDamageSource = boolean;
/**
 * A localization key to use as the death message when the area attack kills an entity. If empty, the default death message for the damage cause is used.
 */
export type DeathMessageOverride = string;
/**
 * Event to be run when the cooldown is complete.
 */
export type AttackCooldownCompleteEvent = string | Trigger | Trigger1[];
/**
 * The event to run when the conditions for this trigger are met.
 */
export type Event1 = string;
/**
 * The list of conditions for this trigger to execute.
 */
export type Filters2 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The subject of this filter test.
 */
export type Subject = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * Amount of time in seconds for the cooldown. Can be specified as a number or a pair of numbers (Minimum and max).
 */
export type AttackCooldownTime = [] | [Maximum2] | [Maximum2, Maximum3] | number;
export type Maximum2 = number;
export type Maximum3 = number;
/**
 * Range of the random amount of damage the melee attack deals. A negative value can heal the entity instead of hurting it.
 */
export type Damage =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin;
      range_max?: RangeMax;
    }
  | {
      min?: Min2;
      max?: Max2;
    };
/**
 * Identifier of the status ailment to apply to an entity attacked by this entity's melee attack.
 */
export type EffectName =
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
 * Duration in seconds of the status ailment applied to the damaged entity.
 */
export type EffectDuration = number | "infinite";
/**
 * Amplifier level (potion tier) of the status ailment applied to the damaged entity. Higher values increase the strength of the effect.
 */
export type EffectAmplifier = number;
/**
 * Distance in blocks where the 'spring' effect lifts the entity.
 */
export type SoftDistance = number;
/**
 * Distance in blocks where the balloon breaks.
 */
export type MaxDistance = number;
/**
 * Event to call when the entity is ballooned.
 */
export type OnBalloon = string;
/**
 * Event to call when the entity is unballooned.
 */
export type OnUnballoon = string;
/**
 * Mass that the entity has when computing balloon pull forces.
 */
export type Mass = number;
/**
 * Loot table that's used to drop a random item.
 */
export type BarterTable = string;
/**
 * Duration, in seconds, for which mob won't barter items if it was hurt.
 */
export type CooldownAfterBeingAttacked1 = number;
/**
 * The maximum radial distance in which a specified block can be detected. The biggest radius is 32.0.
 */
export type SensorRadius = number;
/**
 * A minecraft block identifier.
 */
export type BlockID = string;
/**
 * List of blocks that will trigger the sensor.
 */
export type BlockList = BlockID[];
/**
 * Event to run when a block breaks.
 */
export type OnBlockBroken1 = string;
/**
 * Blocks that will trigger the component when broken and what event will trigger.
 */
export type OnBreak = OnBlockBroken[];
export type Filters3 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * List of sources that break the block to listen for. If none are specified, all block breaks will be detected.
 */
export type Sources = Filters3[];
/**
 * Time in seconds for the boost.
 */
export type Duration3 = number;
/**
 * Factor by which the entity's normal speed increases. E.g. 2.0 means go twice as fast.
 */
export type SpeedMultiplier = number;
/**
 * This is the damage that the item will take each time it is used.
 */
export type Damage1 = number;
/**
 * Name of the item that can be used to boost.
 */
export type Item =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The item used to boost will become this item once it is used up.
 */
export type ReplaceItem =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * List of items that can be used to boost while riding this entity.
 */
export type BoostItems = {
  damage?: Damage1;
  item?: Item;
  replace_item?: ReplaceItem;
}[];
/**
 * The Maximum distance from the boss at which the boss's health bar is present on the players screen.
 */
export type HudRange = number;
/**
 * The name that will be displayed above the boss's health bar.
 */
export type Name1 = string;
/**
 * Whether the sky should darken in the presence of the boss.
 */
export type ShouldDarkenSky = boolean;
/**
 * Defines the bounce strength. 0 results in no bounce while 1 results in a perfectly elastic collision with full energy preservation.
 */
export type Value3 = number;
/**
 * UNDOCUMENTED.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEB".
 */
export type BlockName = string;
/**
 * A list of the blocks that can be broken as this entity moves around.
 */
export type BreakableBlocks = BlockName[];
/**
 * Time in seconds the entity can hold its breath.
 */
export type TotalSupply = number;
/**
 * Time in seconds between suffocation damage.
 */
export type SuffocateTime = number;
/**
 * Time in seconds to recover breath to maximum.
 */
export type InhaleTime = number;
/**
 * If true, this entity can breathe in air.
 */
export type BreathesAir = boolean;
/**
 * If true, this entity can breathe in water.
 */
export type BreathesWater = boolean;
/**
 * If true, water-only breathers will take Dehydration damage when out of water.
 */
export type CanDehydrate = boolean;
/**
 * If true, this entity can breathe in lava.
 */
export type BreathesLava = boolean;
/**
 * If true, this entity can breathe in solid blocks.
 */
export type BreathesSolids = boolean;
/**
 * If true, this entity will have visible bubbles while in water.
 */
export type GeneratesBubbles = boolean;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BED".
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
export type Molang1 = string;
/**
 * List of blocks this entity can breathe in, in addition to the above.
 */
export type BreatheBlocks = BlockReference[];
/**
 * List of blocks this entity can't breathe in, in addition to the above.
 */
export type NonBreathesBlocks = BlockReference[];
/**
 * If true, entities can breed while sitting.
 */
export type AllowSitting = boolean;
/**
 * Time in seconds before the Entity can breed again.
 */
export type BreedCooldown = number;
/**
 * The list of items that can be used to get the entity into the `love` state.
 */
export type BreedItems =
  | (
      | ItemIdentifier
      | {
          item?: BB;
          result_item?: ResultItem1;
          [k: string]: unknown;
        }
    )[]
  | ((
      | ItemIdentifier
      | ItemDescriptor
      | {
          item?: ItemIdentifier2 | ItemDescriptor2;
          [k: string]: unknown;
        }
    ) &
      string);
/**
 * The item used will transform to this item upon successful interaction. Format: itemName:auxValue
 */
export type ResultItem1 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The list of entity definitions that this entity can breed with.
 */
export type BreedsWith = BEEBreedsWithSpec | BEEBreedsWithSpec1[];
/**
 * The entity definition of this entity's babies.
 */
export type BabyType = string;
/**
 * The entity definition of this entity's mate.
 */
export type MateType = string;
/**
 * If true, the entity will become pregnant instead of spawning a baby.
 */
export type CausesPregnancy = boolean;
/**
 * The list of nearby block requirements to get the entity into the `love` state.
 */
export type EnvironmentRequirements = EnvironmentRequirements1 | EnvironmentRequirements2[];
/**
 * The block types required nearby for the entity to breed.
 */
export type Blocks = BlockReference2[] | BlockReference3;
/**
 * A minecraft block reference.
 */
export type BlockReference2 = (BlockIdentifier | BlockReference1) & string;
/**
 * A minecraft block reference.
 */
export type BlockReference3 = (BlockIdentifier | BlockReference1) & string;
/**
 * The number of the required block types nearby for the entity to breed.
 */
export type Count = number;
/**
 * How many blocks radius from the mob's center to search in for the required blocks. Bounded between 0 and 16.
 */
export type Radius = number;
/**
 * Chance that up to 16 babies will spawn between 0.0 and 1.0, where 1.0 is 100%.
 */
export type ExtraBabyChance = number;
/**
 * The filters to run when attempting to fall in love.
 */
export type Filters4 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * If true, the entity needs to be at full health before it can breed.
 */
export type RequireFullHealth = boolean;
/**
 * If true, the entities need to be tamed first before they can breed.
 */
export type RequireTame = boolean;
/**
 * Time in seconds before the Entity can be bribed again.
 */
export type BribeCooldown = number;
/**
 * An item that can be used to bribe the entity.
 */
export type BribeItems1 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The list of items that can be used to bribe the entity.
 */
export type BribeItems = BribeItems1[];
/**
 * Base buoyancy used to calculate how much will a mob float.
 */
export type BaseBuoyancy = number;
/**
 * Applies gravity each tick. Causes more of a wave simulation, but will cause more gravity to be applied outside liquids.
 */
export type ApplyGravity = boolean;
/**
 * Base buoyancy used to calculate how much will a mob float.
 */
export type BaseBuoyancy1 = number;
/**
 * Probability for a big wave hitting the entity. Only used if `simulate_waves` is true.
 */
export type BigWaveProbability = number;
/**
 * Multiplier for the speed to make a big wave. Triggered depending on `big_wave_probability`.
 */
export type BigWaveSpeed = number;
/**
 * How much an actor will be dragged down when the Buoyancy Component is removed.
 */
export type DragDownOnBuoyancyRemoved = number;
/**
 * A minecraft block reference.
 */
export type BlockReference4 = BlockIdentifier | BlockReference1;
/**
 * List of blocks this entity can float on. Must be a liquid block.
 */
export type LiquidBlocks = BlockReference4[];
/**
 * Type of vertical movement applied to the entity
 */
export type MovementType = "waves" | "bobbing" | "none";
/**
 * Defines whether the entity can move out of a liquid block to a neighboring solid block if pushed against it
 */
export type CanAutoStepFromLiquid = boolean;
/**
 * Specifies if/how a mob burns in daylight.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEH".
 */
export type BurnsInDaylight =
  | boolean
  | {
      protection_slot?: ProtectionSlot;
    };
/**
 * Allows specifying an equipment slot that should provide protection from burning in daylight
 */
export type ProtectionSlot =
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.armor.body"
  | "slot.weapon.offhand"
  | "slot.weapon.mainhand";
/**
 * Marks the entity as being able to fly, the pathfinder won't be restricted to paths where a solid block is required underneath it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEJ".
 */
export type CanFly = {} | boolean;
/**
 * If true, celebration will be broadcasted to other entities in the radius.
 */
export type Broadcast = boolean;
/**
 * The list of conditions that target of hunt must satisfy to initiate celebration.
 */
export type Filters5 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The sound event to play when the mob is celebrating.
 */
export type CelebrateSound = string;
/**
 * Duration, in seconds, of celebration.
 */
export type Duration4 = number;
/**
 * If broadcast is enabled, specifies the radius in which it will notify other entities for celebration.
 */
export type Radius1 = number;
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export type SoundInterval1 =
  | []
  | [Maximum4]
  | [Maximum4, Maximum5]
  | number
  | {
      range_min?: Minimum2;
      range_max?: Maximum6;
    };
export type Maximum4 = number;
export type Maximum5 = number;
/**
 * Minimum.
 */
export type Minimum2 = number;
/**
 * Maximum.
 */
export type Maximum6 = number;
/**
 * Height of the collision box in blocks. A negative value will be assumed to be 0.
 */
export type Height = number;
/**
 * Width of the collision box in blocks. A negative value will be assumed to be 0.
 */
export type Width = number;
/**
 * The Palette Color value of the entity.
 */
export type Value4 = number;
/**
 * The second Palette Color value of the entity.
 */
export type Value5 = number;
/**
 * Determines if the mob will grant mobs of the same type combat buffs if they kill the target.
 */
export type ApplyToFamily = boolean;
/**
 * Determines if the mob will grant itself the combat buffs if it kills the target.
 */
export type ApplyToSelf = boolean;
/**
 * The duration in seconds of Regeneration I added to the mob.
 */
export type RegenerationDuration = number | "infinite";
/**
 * In relation to the optimization value, determines the maximum ticks spatial update packets can be not sent.
 */
export type MaximumDroppedTicks = number;
/**
 * The maximum distance considered during bandwidth optimizations. Any value below the Maximum is interpolated to find optimization, and any value greater than or equal to this Maximum results in Maximum optimization.
 */
export type MaximumOptimizedDistance = number;
/**
 * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent as without optimizations but with much less data being sent. This should be used when actors are travelling very quickly or teleporting to prevent visual oddities.
 */
export type UseMotionPredictionHints = boolean;
/**
 * Conditions that must be met for these optimization values to be used.
 */
export type ConditionalValues1 = Filters3[];
/**
 * The object containing the conditional bandwidth optimization values.
 */
export type ConditionalValues = ConditionalValue[];
/**
 * In relation to the optimization value, determines the maximum ticks spatial update packets can be not sent.
 */
export type MaximumDroppedTicks1 = number;
/**
 * The maximum distance considered during bandwidth optimizations. Any value below the Maximum is interpolated to find optimization, and any value greater than or equal to this Maximum results in Maximum optimization.
 */
export type MaximumOptimizedDistance1 = number;
/**
 * When set to true, smaller motion packets will be sent during drop packet intervals, resulting in the same amount of packets being sent as without optimizations but with much less data being sent. This should be used when actors are travelling very quickly or teleporting to prevent visual oddities.
 */
export type UseMotionPredictionHints1 = boolean;
/**
 * Height of the hitbox in blocks. A negative value will be assumed to be 0.
 */
export type Width1 = number;
/**
 * Width and Depth of the hitbox in blocks. A negative value will be assumed to be 0.
 */
export type Height1 = number;
/**
 * The offset from the entity's anchor where the hitbox will spawn.
 */
export type Pivot = [] | [X] | [X, Y] | [X, Y, Z];
export type X = number;
export type Y = number;
export type Z = number;
/**
 * Defines a hitbox size and pivot to test against.
 */
export type Hitboxes = Hitbox[];
/**
 * Amount of damage caused each hurt.
 */
export type DamagePerHurt = number;
/**
 * Time in seconds between damage.
 */
export type TimeBetweenHurt = number;
/**
 * The list of triggers that fire when the environment conditions match the given filter criteria.
 */
export type Triggers = Triggers1[] | Triggers2;
/**
 * Type of damage that triggers the events.
 */
export type Cause1 =
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
 * A modifier that adds to/removes from the base damage from the damage cause. It does not reduce damage to less than 0.
 */
export type DamageModifier = number;
/**
 * A multiplier that modifies the base damage from the damage cause. If deals_damage is true the multiplier can only reduce the damage the entity will take to a minimum of 1.
 */
export type DamageMultiplier = number;
/**
 * Defines how received damage affects the entity:
 * - 'yes', received damage is applied to the entity.
 * - 'no', received damage is not applied to the entity.
 * - 'no_but_side_effects_apply', received damage is not applied to the entity, but the side effects of the attack are. This means that the attacker's weapon loses durability, enchantment side effects are applied, and so on.
 */
export type DealsDamage = "yes" | "no" | "no_but_side_effects_apply" | "no_but_entity_effects_apply";
/**
 * Specifies filters for entity definitions and events.
 */
export type OnDamage = string | Trigger | Trigger1[];
/**
 * Defines what sound to play, if any, when the on_damage filters are met.
 */
export type OnDamageSoundEvent = string;
/**
 * Whether the entity can dash underwater.
 */
export type CanDashUnderwater = boolean;
/**
 * The dash cooldown in seconds.
 */
export type CooldownTime = number;
/**
 * Horizontal momentum of the dash.
 */
export type HorizoontalMomentum = number;
/**
 * Vertical momentum of the dash.
 */
export type VerticalMomentum = number;
/**
 * Should the momentum be applied in the direction of the 'entity' or 'passenger'. When 'entity' is used the momentum is applied horizontally according to the direction the entity is looking, using only the entity's yaw. When 'passenger' is used the momentum will be applied in the direction the controlling passenger is looking, using the passenger's pitch and yaw.
 */
export type Direction = "entity" | "passenger";
/**
 * Angle in degrees.
 */
export type Value6 = number;
/**
 * Determines if `min_range_random_chance` is used in the standard despawn rules.
 */
export type DespawnFromChance = boolean;
/**
 * Maximum distance for standard despawn rules to instantly despawn the mob.
 */
export type MaximumDistance = number;
/**
 * Minimum distance for standard despawn rules to try to despawn the mob.
 */
export type MinimumDistance = number;
/**
 * Determines if the `min_range_inactivity_timer` is used in the standard despawn rules.
 */
export type DespawnFromInactivity = boolean;
/**
 * Determines if the mob is instantly despawned at the edge of simulation distance in the standard despawn rules.
 */
export type DespawnFromSimulationEdge = boolean;
/**
 * The list of conditions that must be satisfied before the Actor is despawned. If a filter is defined then standard despawn rules are ignored.
 */
export type Filters6 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The amount of time in seconds that the mob must be inactive.
 */
export type MinimumRangeInactivityTimer = number;
/**
 * A random chance between 1 and the given value.
 */
export type MinimumRangeRandomChance = number;
/**
 * If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
 */
export type RemoveChildEntities = boolean;
/**
 * Amount of time in seconds to dry out fully.
 */
export type TotalTime = number;
/**
 * Optional amount of additional time in seconds given by using splash water bottle on entity.
 */
export type WaterBottleRefillTime = number;
/**
 * The type of dwelling the mob wishes to join. Current Types: village
 */
export type DwellingType = "village";
/**
 * The role of which the mob plays in the dwelling. Current Roles: inhabitant, defender, hostile, passive.
 */
export type DwellingRole = "inhabitant" | "defender" | "hostile" | "passive";
/**
 * How often the mob checks on their dwelling status in ticks. Positive values only.
 */
export type UpdateIntervalBase = number;
/**
 * The variant value in ticks that will be added to the update_interval_base.
 */
export type UpdateIntervalVariant = number;
/**
 * Whether or not the mob can find and add POI's to the dwelling.
 */
export type CanFindPoi = boolean;
/**
 * How much reputation should the players be rewarded on first founding?.
 */
export type FirstFoundingReward = number;
/**
 * Can this mob migrate between dwellings? Or does it only have its initial dwelling?.
 */
export type CanMigrate = boolean;
/**
 * A padding distance for checking if the mob is within the dwelling.
 */
export type DwellingBoundsTolerance = number;
/**
 * Allows the user to define a starting profession for this particular Dweller, instead of letting them choose organically. (They still need to gain experience from trading before this takes effect.)
 */
export type PreferredProfession = string;
/**
 * Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
 */
export type ConvertTradesEconomy = boolean;
/**
 * How much should the discount be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (low-tier trade discount and high-tier trade discount)
 */
export type CuredDiscount = [] | [A3] | [A3, B1];
/**
 * Minimum.
 */
export type A3 = number;
/**
 * Maximum.
 */
export type B1 = number;
/**
 * Name to be displayed while trading with this entity.
 */
export type DisplayName = string;
/**
 * Used in legacy prices to determine how much should Demand be modified by when the player has the Hero of the Village mob effect.
 */
export type HeroDemandDiscount = number;
/**
 * The Maximum the discount can be modified by when the player has cured the Zombie Villager. Can be specified as a pair of numbers (low-tier trade discount and high-tier trade discount)
 */
export type MaximumCuredDiscount = [] | [A4] | [A4, B2];
/**
 * Minimum.
 */
export type A4 = number;
/**
 * Maximum.
 */
export type B2 = number;
/**
 * The Maximum the discount can be modified by when the player has cured a nearby Zombie Villager.
 */
export type MaximumNearbyCuredDiscount = number;
/**
 * How much should the discount be modified by when the player has cured a nearby Zombie Villager.
 */
export type NearbyCuredDiscount = number;
/**
 * Used to determine if trading with entity opens the new trade screen.
 */
export type NewScreen = boolean;
/**
 * Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
 */
export type PersistTrades = boolean;
/**
 * Show an in game trade screen when interacting with the mob.
 */
export type ShowTradeScreen = boolean;
/**
 * File path relative to the resource pack root for this entity's trades.
 */
export type Table = string;
/**
 * Determines whether the legacy formula is used to determines the trade prices.
 */
export type UseLegacyPriceFormula = boolean;
/**
 * A component that fires an event when a set of conditions are met by other entities within the defined range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGJ".
 */
export type EntitySensor =
  | (EntitySensor1 & {
      relative_range?: RelativeRange;
      [k: string]: unknown;
    })
  | {
      subsensors?: Subsensors;
      relative_range?: RelativeRange1;
      find_players_only?: FindPlayersOnly;
      [k: string]: unknown;
    };
/**
 * How many seconds should elapse before the subsensor can once again sense for entities. The cooldown is applied on top of the base 1 tick (0.05 seconds) delay. Negative values will result in no cooldown being used.
 */
export type Cooldown = number;
/**
 * Vertical offset applied to the entity's position when computing the distance from other entities.
 */
export type YOffset = number;
/**
 * event.
 */
export type Event2 = string;
/**
 * The maximum number of entities that must pass the filter conditions for the event to send.
 */
export type MaximumCount = number;
/**
 * The minimum number of entities that must pass the filter conditions for the event to send.
 */
export type MinimumCount = number;
/**
 * The maximum distance another entity can be from this and have the filters checked against it.
 */
export type Range3 = VectorOf2Items | number;
/**
 * An vector of 2 number.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHA".
 */
export type VectorOf2Items = [] | [X1] | [X1, Y1];
/**
 * The X component.
 */
export type X1 = number;
/**
 * The Y component.
 */
export type Y1 = number;
/**
 * If true requires all nearby entities to pass the filter conditions for the event to send.
 */
export type RequireAll = boolean;
/**
 * The maximum distance another entity can be from this and have the filters checked against it.
 */
export type SensorRange = number;
/**
 * If true the sensor range is additive on top of the entity's size.
 */
export type RelativeRange = boolean;
/**
 * The list of subsensors.
 */
export type Subsensors = EntitySensor1[];
/**
 * If true the sensor range is additive on top of the entity's size.
 */
export type RelativeRange1 = boolean;
/**
 * Limits the search to Players only for all subsensors.
 */
export type FindPlayersOnly = boolean;
/**
 * The list of triggers that fire when the environment conditions match the given filter criteria.
 */
export type Triggers3 = string | Trigger | Trigger1[];
/**
 * Item that the entity should not equip.
 */
export type ExcludedItems1 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * List of items that the entity should not equip.
 */
export type ExcludedItems = ExcludedItems1[];
/**
 * Specifies if equipped armor should be added to the armor slot or hand slot
 */
export type CanWearArmor = boolean;
/**
 * The chance that the item in this slot will drop.
 */
export type DropChance = number;
/**
 * The slot in which the item will drop from.
 */
export type Slot = string;
/**
 * A list of slots with the chance to drop an equipped item from that slot.
 */
export type SlotDropChance = SlotDropChance1[];
/**
 * The file path to the equipment table, relative to the behavior pack's root.
 */
export type Table1 = string;
/**
 * The slot number of this slot.
 */
export type Slot1 = number;
/**
 * A item name.
 */
export type AcceptedItems1 = (
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    }
) &
  string;
/**
 * The list of items that can go in this slot.
 */
export type AcceptedItems = AcceptedItems1[];
/**
 * Identifier of the item that can be equipped for this slot.
 */
export type Item1 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * Text to be displayed when the entity can be equipped with this item when playing with Touch-screen controls.
 */
export type InteractText = string;
/**
 * List of slots and the item that can be equipped.
 */
export type Slots = Slots1[];
/**
 * Amount of exhaustion applied when attacking.
 */
export type Attack1 = number;
/**
 * Amount of exhaustion applied when taking damage.
 */
export type Damage2 = number;
/**
 * Amount of exhaustion applied when healed through food regeneration.
 */
export type Heal = number;
/**
 * Amount of exhaustion applied when jumping.
 */
export type Jump = number;
/**
 * Amount of exhaustion applied when triggering the lunge enchantment, multiplied by the enchantment level.
 */
export type Lunge = number;
/**
 * Amount of exhaustion applied when mining.
 */
export type Mine = number;
/**
 * Amount of exhaustion applied when sprinting.
 */
export type Sprint = number;
/**
 * Amount of exhaustion applied when sprint jumping.
 */
export type SprintJump = number;
/**
 * Amount of exhaustion applied when swimming.
 */
export type Swim = number;
/**
 * Amount of exhaustion applied when walking.
 */
export type Walk = number;
/**
 * A molang expression defining the amount of experience rewarded when this entity is successfully bred. An array of expressions adds each expression's result together for a final total.
 */
export type OnBred = string | number;
/**
 * A molang expression defining the amount of experience rewarded when this entity dies. An array of expressions adds each expression's result together for a final total.
 */
export type OnDeath = string | number;
/**
 * If true, the explosion will affect blocks and entities under water.
 */
export type AllowUnderwater = boolean;
/**
 * If true, the explosion will destroy blocks in the explosion radius.
 */
export type BreaksBlocks = boolean;
/**
 * If true, blocks in the explosion radius will be set on fire.
 */
export type CausesFire = boolean;
/**
 * A scale factor applied to the explosion's damage to entities. A value of 0 prevents the explosion from dealing any damage. Negative values cause the explosion to heal entities instead.
 */
export type DamageScaling = number;
/**
 * If true, whether the explosion breaks blocks is affected by the mob griefing game rule.
 */
export type DestroyAffectedByGriefing = boolean;
/**
 * If true, whether the explosion causes fire is affected by the mob griefing game rule.
 */
export type FireAffectedByGriefing = boolean;
/**
 * The range for the random amount of time the fuse will be lit before exploding, a negative value means the explosion will be immediate.
 */
export type FuseLength = [] | [number] | [number, number] | number;
/**
 * If true, the fuse is already lit when this component is added to the entity.
 */
export type FuseLit = boolean;
/**
 * A scale factor applied to the knockback force caused by the explosion.
 */
export type KnockbackScaling = number;
/**
 * A blocks explosion resistance will be capped at this value when an explosion occurs.
 */
export type MaximumResistance = number;
/**
 * Defines whether the explosion should apply fall damage negation to Players above the point of collision.
 */
export type NegatesFallDamage = boolean;
/**
 * The name of the particle effect to use.
 */
export type ParticleEffect = "explosion" | "wind_burst" | "breeze_wind_burst";
/**
 * The radius of the explosion in blocks and the amount of damage the explosion deals.
 */
export type Power = number;
/**
 * The name of the sound effect played when the explosion triggers.
 */
export type SoundEffect = string;
/**
 * If true, the explosion will toggle blocks in the explosion radius.
 */
export type TogglesBlocks = boolean;
/**
 * UNDOCUMENTED: value.
 */
export type Value7 = number;
/**
 * The amount of blocks away the entity will look at to push away from.
 */
export type BlockDistance = number;
/**
 * The weight of the push back away from blocks.
 */
export type BlockWeight = number;
/**
 * The amount of push back given to a flocker that breaches out of the water.
 */
export type BreachInfluence = number;
/**
 * The threshold in which to start applying cohesion.
 */
export type CohesionThreshold = number;
/**
 * The weight applied for the cohesion steering of the flock.
 */
export type CohesionWeight = number;
/**
 * The weight on which to apply on the goal output.
 */
export type GoalWeight = number;
/**
 * Determines the high bound amount of entities that can be allowed in the flock.
 */
export type HighFlockLimit = number;
/**
 * Tells the Flocking Component if the entity exists in water.
 */
export type InWater = boolean;
/**
 * The area around the entity that allows others to be added to the flock.
 */
export type InfluenceRadius = number;
/**
 * The distance in which the flocker will stop applying cohesion.
 */
export type InnnerCohesionThreshold = number;
/**
 * The percentage chance between 0-1 that a fish will spawn and not want to join flocks. Invalid values will be capped at the end points.
 */
export type LonerChance = number;
/**
 * Determines the low bound amount of entities that can be allowed in the flock.
 */
export type LowFlockLimit = number;
/**
 * Tells the flockers that they can only match similar entities that also match the variant, mark variants, and color data of the other potential flockers.
 */
export type MatchVariants = boolean;
/**
 * The Maximum height allowable in the air or water.
 */
export type MaximumHeight = number;
/**
 * The Minimum height allowable in the air or water.
 */
export type MinimumHeight = number;
/**
 * The distance that is determined to be to close to another flocking and to start applying separation.
 */
export type SeparationThreshold = number;
/**
 * The weight applied to the separation of the flock.
 */
export type SeparationWeight = number;
/**
 * Tells the flockers that they will follow flocks based on the center of mass.
 */
export type UseCenterOfMass = boolean;
/**
 * Flying speed in blocks per tick.
 */
export type Value8 = number;
/**
 * The higher the number, the more the friction affects this entity. A value of 1.0 means regular friction, while 2.0 means twice as much
 */
export type Value9 = number;
/**
 * If true, the `flap` game event will be emitted when the entity moves through air.
 */
export type EmitFlap = boolean;
/**
 * If true, the `entityMove` game event will be emitted when the entity moves on ground or through a solid.
 */
export type EmitMove = boolean;
/**
 * If true, the `swim` game event will be emitted when the entity moves through a liquid.
 */
export type EmitSwim = boolean;
/**
 * Chance that an allele will be replaced with a random one instead of the parent's allele during birth.
 */
export type MutationRate = number;
/**
 * The range of positive integer allele values for this gene. Spawned mobs will have a random number in this range assigned to them.
 */
export type AlleleRange =
  | number
  | {
      range_min?: RangeMinimum1;
      range_max?: RangeMaximum1;
      [k: string]: unknown;
    };
/**
 * Lower bound of the vaues.
 */
export type RangeMinimum1 = number;
/**
 * Upper bound of the vaues.
 */
export type RangeMaximum1 = number;
/**
 * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with both. Can also be a range of integers.
 */
export type BothAllele =
  | number
  | {
      range_min?: RangeMinimum1;
      range_max?: RangeMaximum1;
      [k: string]: unknown;
    };
/**
 * If this value is non-negative, compare both the mob's main and hidden alleles with this value for a match with either. Can also be a range of integers.
 */
export type EitherAllele = number;
/**
 * If this value is non-negative, compare the mob's hidden allele with this value for a match. Can also be a range of integers.
 */
export type HiddenAllele = number;
/**
 * If this value is non-negative, compare the mob's main allele with this value for a match. Can also be a range of integers.
 */
export type MainAllele =
  | number
  | {
      range_min?: RangeMinimum1;
      range_max?: RangeMaximum1;
      [k: string]: unknown;
    };
/**
 * If this value is non-negative, overrides the chance for this gene that an allele will be replaced with a random one instead of the parent's allele during birth. Non-negative values greater than 1 will be the same as the value 1.
 */
export type MutationRate1 = number;
/**
 * The list of genetic variants for this gene. These check for particular allele combinations and fire events when all of them are satisfied.
 */
export type GeneticVariants = GeneticVariants1[];
/**
 * The name of the gene.
 */
export type Name2 = string;
/**
 * The list of genes that this entity has and will cross with a partner during breeding.
 */
export type Genes = Gene[];
/**
 * An optional cool down in seconds to prevent spamming interactions.
 */
export type Cooldown1 = number;
/**
 * An items that can be given to the entity to place in their inventory.
 */
export type Properties2 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The list of items that can be given to the entity to place in their inventory.
 */
export type Properties1 = Properties2[];
/**
 * The value of the entity's offset from the terrain, in blocks.
 */
export type Value10 = number;
/**
 * Defines which entities are exceptions and are allowed to be attacked by the owner entity, potentially attacked entity is subject "other". If this is not specified then all attacks by the owner are allowed.
 */
export type Filters7 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The list of conditions that must be satisfied for other entities to be counted towards group size.
 */
export type Filters8 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Radius from center of entity.
 */
export type Radius2 = number;
/**
 * Value between 0-1. Chance of success per tick.
 */
export type Chance = number;
/**
 * Number of charges.
 */
export type Charges = number;
/**
 * Determines if item can be used regardless of entity being at full health.
 */
export type ForceUse = boolean;
/**
 * The filter group that defines the conditions for using this item to heal the entity.
 */
export type Filters9 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The amount of health this entity gains when fed this item.
 */
export type HealAmount = number;
/**
 * Item that can be used to heal this entity.
 */
export type Item2 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The item used will transform to this item upon successful interaction. Format: itemName:auxValue
 */
export type ResultItem2 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * Effect name.
 */
export type Name3 =
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
 * The duration of the effect.
 */
export type Duration5 = number | "infinite";
/**
 * The array of items that can be used to heal this entity.
 */
export type Items = {
  filters?: Filters9;
  heal_amount?: HealAmount;
  item?: Item2;
  result_item?: ResultItem2;
  effects?: BJCEffect | BJCEffect[];
  [k: string]: unknown;
}[];
/**
 * A Molang expression defining the inter-beat interval in seconds. A value of zero or less means no heartbeat..
 */
export type Interval = string | number;
/**
 * Level sound event to be played as the heartbeat sound.
 */
export type SoundEvent = string;
/**
 * The radius that the entity will be restricted to in relation to its home.
 */
export type RestrictionRadius = number;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier4 = string;
/**
 * Optional block list that the home position will be associated with. If any of the blocks no longer exist at that position, the home restriction is removed. Example syntax: minecraft:sand. Not supported: minecraft:sand:1
 */
export type HomeBlockList = ItemIdentifier4[];
/**
 * Defines how the the entity will be restricted to its home position. The possible values are:
 * - 'none', which poses no restriction.
 * - 'random_movement', which restricts randomized movement to be around the home position.
 * - 'all_movement', which restricts any kind of movement to be around the home position. However, entities that somehow got too far away from their home will always be able to move closer to it, if prompted to do so.
 */
export type RestrictionType = "none" | "random_movement" | "all_movement";
/**
 * The multiplier to apply to the jumping height.
 */
export type Value11 =
  | {
      range_min?: number;
      range_max?: number;
    }
  | number;
/**
 * Damage cause.
 */
export type Cause2 =
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
 * Amount of damage done each tick that the conditions are met.
 */
export type DamagePerTick1 = number;
/**
 * An array of conditions used to compare the event to.
 */
export type DamageConditions = DamageCondition[];
/**
 * Modifies speed going backwards.
 */
export type BackwardsMovementModifier = number;
/**
 * Modifies the strafe speed.
 */
export type StrafeSpeedModifier = number;
/**
 * The block id, for example: `minecraft:air'.
 */
export type Name4 = string;
/**
 * A single state of a block.
 */
export type State = string | boolean | number;
/**
 * List of blocks, with certain block states, that we are monitoring to see if the entity is inside.
 */
export type BlockList1 = Block[];
/**
 * Number of days the mob has to stay up until the insomnia effect begins.
 */
export type DaysUntilInsomnia = number;
/**
 * If true, all entities linked to this entity in a child relationship (eg. leashed) will also be despawned.
 */
export type RemoveChildEntities1 = boolean;
/**
 * The interactions.
 */
export type Interactions = CAFInteractionSpec | CAFInteractionSpec1[];
/**
 * File path, relative to the Behavior Pack's path, to the loot table file.
 */
export type Table2 = string;
/**
 * Time in seconds before this entity can be interacted with again.
 */
export type Cooldown2 = number;
/**
 * Allows entity to admire the item. Requires "minecraft:admire_item" and "minecraft:behavior.admire_item" to work.
 */
export type Admire = boolean;
/**
 * Allows entity to barter with the item. Requires "minecraft:barter" to work.
 */
export type Barter1 = boolean;
/**
 * Time in seconds before this entity can be interacted with after being attacked.
 */
export type CooldownAfterBeingAttacked2 = number;
/**
 * The amount of health this entity will recover or hurt when interacting with this item. Negative values will harm the entity.
 */
export type HealthAmount = number;
/**
 * The amount of damage the item will take when used to interact with this entity. A value of 0 means the item won't lose durability.
 */
export type HurtItem = number;
/**
 * Text to show when the player is able to interact in this way with this entity when playing with Touch-screen controls.
 */
export type InteractText1 = string;
/**
 * Event to fire when the interaction occurs.
 */
export type OnInteract = string | Trigger | Trigger1[];
/**
 * Whether or not the particle will appear closer to who performed the interaction.
 */
export type ParticleOffsetTowardsInteractor = boolean;
/**
 * The type of particle that will be spawned.
 */
export type ParticleType = string;
/**
 * Will offset the particle this amount in the y direction.
 */
export type ParticleYOffset = number;
/**
 * List of sounds to play when the interaction occurs.
 */
export type PlaySounds = string;
/**
 * List of entities to spawn when the interaction occurs.
 */
export type SpawnEntities = string;
/**
 * File path, relative to the Behavior Pack's path, to the loot table file.
 */
export type Table3 = string;
/**
 * Will offset the items spawn position this amount in the y direction.
 */
export type YOffset1 = number;
/**
 * If true, the player will do the "swing" animation when interacting with this entity.
 */
export type Swing = boolean;
/**
 * The feed item used will transform to this item upon successful interaction. Format: itemName:auxValue
 */
export type TransformToItem = string;
/**
 * If true, the interaction will use an item.
 */
export type UseItem = boolean;
/**
 * Vibration to emit when the interaction occurs. Admitted values are none (no vibration emitted), shear, entity_die, entity_act, entity_interact.
 */
export type Vibration = "none" | "shear" | "entity_die" | "entity_act" | "entity_interact";
/**
 * UNDOCUMENTED Item to give to the player upon successful interaction.
 */
export type GiveItem = boolean;
/**
 * UNDOCUMENTED Takes an item from the player.
 */
export type TakeItem = boolean;
/**
 * The entity's equipment slot to remove and drop the item from, if any, upon successful interaction.
 */
export type DropItemSlot =
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.armor.body"
  | "slot.weapon.offhand"
  | "slot.weapon.mainhand";
/**
 * Will offset the item drop position this amount in the y direction. Requires "drop_item_slot" to be specified.
 */
export type DropItemYOffset = number;
/**
 * The entity's equipment slot to equip the item to, if any, upon successful interaction.
 */
export type EquipItemSlot =
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.armor.body"
  | "slot.weapon.offhand"
  | "slot.weapon.mainhand";
/**
 * How much of the item durability should be restored upon interaction.
 */
export type Amount = number;
/**
 * The entity's slot containing the item to be repaired.
 */
export type Slot2 =
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.armor.body"
  | "slot.weapon.offhand"
  | "slot.weapon.mainhand";
/**
 * Number of slots that this entity can gain per extra strength.
 */
export type AdditionalSlotsPerStrength = number;
/**
 * If true, the contents of this inventory can be removed by a hopper.
 */
export type CanBeSiphonedFrom = boolean;
/**
 * Type of container this entity has. Can be horse, minecart_chest, chest_boat, minecart_hopper, inventory, container or hopper
 */
export type ContainerType =
  "horse" | "minecart_chest" | "chest_boat" | "minecart_hopper" | "inventory" | "container" | "hopper";
/**
 * Number of slots the container has.
 */
export type InventorySize = number;
/**
 * If true, only the entity can access the inventory.
 */
export type Private = boolean;
/**
 * If true, the entity's inventory can only be accessed by its owner or itself.
 */
export type RestrictToOwner = boolean;
/**
 * The text that will display when interacting with this entity with a dye when playing with Touch-screen controls.
 */
export type InteractText2 = string;
/**
 * UNDOCUMENTED.
 */
export type Value12 = boolean;
/**
 * List of items that can be used to control this entity.
 */
export type ControlItems = Item3[] | string;
/**
 * An item that can be used to control this entity.
 */
export type Item3 = string;
/**
 * The multiplier applied to horizontal velocity when jumping.
 */
export type DistanceScale = number;
/**
 * The force applied vertically when jumping.
 */
export type Height2 = number;
/**
 * Amount of ticks between sequential jumps.
 */
export type JumpDelay = number;
/**
 * Duration of the jump animation.
 */
export type AnimationDuration = number;
/**
 * The initial vertical velocity for the jump.
 */
export type JumpPower = number;
/**
 * Allows players to retrieve entities that are leashed to this entity.
 */
export type CanRetrieveFrom = boolean;
/**
 * If true, the entity is unleashed when the component is removed.
 */
export type UnleashOnRemoval = boolean;
/**
 * If true, players can cut both incoming and outgoing leashes by using shears on the entity.
 */
export type CanBeCut = boolean;
/**
 * If true, players can leash this entity even if it is already leashed to another mob.
 */
export type CanBeStolen = boolean;
/**
 * When set to true, "on_unleash" does not trigger when the entity gets unleashed for other reasons such as being stolen or the leash breaking.
 */
export type OnUnleashInteractOnly = boolean;
/**
 * Distance in blocks at which the leash stiffens, restricting movement.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCH_hard_distance".
 */
export type HardDistance = number;
/**
 * Distance in blocks at which the leash breaks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCH_max_distance".
 */
export type MaximumDistance1 = number;
/**
 * Distance in blocks at which the `spring` effect starts acting to keep this entity close to the entity that leashed it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCH_soft_distance".
 */
export type SoftDistance1 = number;
/**
 * Adjusts the rotation at which the entity reaches equilibrium, when "spring_type" is set to "dampened" or "quad_dampened"
 */
export type RotationAdjustment = number;
/**
 * Defines the type of spring-like force that pulls the entity towards its leash holder:
 * - "bouncy": Simulates a highly elastic spring that never reaches an equilibrium if the leashed entity is suspended mid-air.
 * - "dampened": Simulates a dampened spring attached to the front of the leashed entity's collision. It reaches an equilibrium if the entity is suspended mid-air and aligns with the movement direction.
 * - "quad_dampened": Simulates four dampened springs connected to the center of each side of the entities' collisions. It reaches an equilibrium if the entity is suspended mid-air and gradually aligns with the leash holder over time.
 */
export type SpringType = "bouncy" | "dampened" | "quad_dampened";
/**
 * Defines how this entity behaves when leashed to another entity. A preset is selected upon leashing and remains until the entity is leashed to something else. The first preset whose "filter" conditions are met will be applied; if none match, a default configuration is used instead.
 */
export type Presets1 = Preset1[];
/**
 * If true, the entity is unleashed when the component is removed.
 */
export type UnleashOnRemoval1 = boolean;
/**
 * Defines, in degrees, the width of the field of view for entities looking at the owner entity. If 'scale_fov_by_distance' is set to true, this value corresponds to the field of view at a distance of one block between the entities.
 */
export type FieldOfView = number;
/**
 * Defines the entities that can trigger this component.
 */
export type Filters10 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Limits the search to only the nearest Player that meets the specified "filters" rather than all nearby entities.
 */
export type FindPlayersOnly1 = boolean;
/**
 * Defines the type of block shape used to check for line of sight obstructions.
 */
export type LineOfSightObstructionType = "outline" | "collision" | "collision_for_camera";
/**
 * A list of locations on the owner entity towards which line of sight checks are performed. At least one location must be unobstructed for the entity to be considered as looked at.
 *
 * @minItems 1
 */
export type LookAtLocations = [
  {
    location?: Location;
    vertical_offset?: VerticalOffset;
  },
  ...{
    location?: Location;
    vertical_offset?: VerticalOffset;
  }[]
];
/**
 * Location to be looked at
 */
export type Location = "head" | "body" | "feet";
/**
 * Vertical offset from the set location
 */
export type VerticalOffset = number;
/**
 * The range for the random amount of time during which the entity is `cooling down` and won't get angered or look for a target.
 */
export type LookCooldown =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin;
      range_max?: RangeMax;
    }
  | {
      min?: Min2;
      max?: Max2;
    };
/**
 * When true, the field of view narrows as the distance between the owner entity and the entity looking at it increases. This ensures that the width of the view cone remains somewhat constant towards the owner entity position, regardless of distance.
 */
export type ScaleFovByDistance = boolean;
/**
 * Maximum distance this entity will look for another entity looking at it.
 */
export type SearchRadius = number;
/**
 * Defines the minimum, continuous time the owner entity has to be looked at before being considered as such.
 */
export type MinLookedAtDuration = number;
/**
 * Defines if and how the owner entity will set entities that are looking at it as its combat targets. Valid values:
 * - "never", looking entities are never set as targets, but events are emitted.
 * - "once_and_stop_scanning", the first detected looking entity is set as target. Scanning and event emission is suspended if and until the owner entity has a target.
 * - "once_and_keep_scanning", the first detected looking entity is set as target. Scanning and event emission continues.
 */
export type SetTarget = "never" | "once_and_stop_scanning" | "once_and_keep_scanning";
/**
 * The path to the loot table, relative to the Behavior Pack's root.
 */
export type Table4 = string;
/**
 * The ID of the variant. By convention, 0 is the ID of the base entity
 */
export type Value13 = number;
/**
 * If the effect is considered an ambient effect (like the ones applied by Beacons or Conduits).
 */
export type Ambient = boolean;
/**
 * Time in seconds to wait between each application of the effect.
 */
export type CooldownTime1 = number;
/**
 * How close a hostile entity must be to have the mob effect applied.
 */
export type EffectRange = number;
/**
 * How long the applied mob effect lasts in seconds.
 */
export type EffectTime = number | "infinite";
/**
 * Filter to use for conditions.
 */
export type Filters11 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The mob effect that is applied to entities that enter this entities effect range.
 */
export type MobEffect1 =
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
 * List of names of effects the entity is immune to.
 *
 * @minItems 1
 */
export type MobEffects = [Effect, ...Effect[]];
/**
 * A mob effect
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DH".
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
 * The higher the number, the less often the movement sound will be played.
 */
export type Value14 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn1 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn2 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn3 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn4 = number;
/**
 * UNDOCUMENTED.
 */
export type StartSpeed = number;
/**
 * UNDOCUMENTED.
 */
export type SpeedWhenTurning = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn5 = number;
/**
 * Delay after landing when using the slime move control.
 */
export type JumpDelay1 = [] | [Minimum3] | [Minimum3, Maximum7];
export type Minimum3 = number;
export type Maximum7 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn6 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn7 = number;
/**
 * The maximum number in degrees the mob can turn per tick.
 */
export type MaximumTurn8 = number;
/**
 * Strength of the sway movement.
 */
export type SwayAmplitude = number;
/**
 * Multiplier for the frequency of the sway movement.
 */
export type SwayAmplitude1 = number;
/**
 * If true, this entity can be renamed with name tags.
 */
export type AllowNameTagRenaming = boolean;
/**
 * If true, the name will always be shown.
 */
export type AlwaysShow = boolean;
/**
 * Trigger to run when the entity gets named.
 */
export type DefaultTrigger = string | Trigger | Trigger1[];
/**
 * Describes the special names for this entity and the events to call when the entity acquires those names.
 */
export type NameActions = NameAction[] | NameAction1;
/**
 * List of special names that will cause the events defined in `on_named` to fire.
 */
export type NameFilter = string;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference5 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid = BlockReference5[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks1 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals1 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun1 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater1 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference6 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid1 = BlockReference6[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach1 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors1 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump1 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors1 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors1 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors1 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir1 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava1 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater1 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink1 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim1 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk1 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava1 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious1 = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks2 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals2 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun2 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater2 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference7 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid2 = BlockReference7[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach2 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors2 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump2 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors2 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors2 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors2 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir2 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava2 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater2 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink2 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim2 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk2 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava2 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious2 = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks3 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals3 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun3 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater3 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference8 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid3 = BlockReference8[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach3 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors3 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump3 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors3 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors3 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors3 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir3 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava3 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater3 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink3 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim3 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk3 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava3 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious3 = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks4 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals4 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun4 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater4 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference9 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid4 = BlockReference9[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach4 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors4 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump4 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors4 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors4 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors4 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir4 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava4 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater4 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink4 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim4 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk4 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava4 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious4 = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks5 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals5 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun5 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater5 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference10 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid5 = BlockReference10[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach5 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors5 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump5 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors5 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors5 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors5 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir5 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava5 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater5 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink5 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim5 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk5 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava5 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious5 = boolean;
/**
 * Tells the pathfinder to avoid blocks that cause damage when finding a path.
 */
export type AvoidDamageBlocks6 = boolean;
/**
 * Tells the pathfinder to avoid portals (like nether portals) when finding a path.
 */
export type AvoidPortals6 = boolean;
/**
 * Whether or not the pathfinder should avoid tiles that are exposed to the sun when creating paths.
 */
export type AvoidSun6 = boolean;
/**
 * Tells the pathfinder to avoid water when creating a path.
 */
export type AvoidWater6 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference11 = BlockIdentifier | BlockReference1;
/**
 * Tells the pathfinder which blocks to avoid when creating a path.
 */
export type BlocksToAvoid6 = BlockReference11[];
/**
 * Tells the pathfinder whether or not it can jump out of water (like a dolphin).
 */
export type CanBreach6 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door and break it.
 */
export type CanBreakDoors6 = boolean;
/**
 * Tells the pathfinder whether or not it can jump up blocks.
 */
export type CanJump6 = boolean;
/**
 * Tells the pathfinder whether or not it float.
 */
export type CanJump7 = boolean;
/**
 * Tells the pathfinder that it can path through a closed door assuming the AI will open the door.
 */
export type CanOpenDoors6 = boolean;
/**
 * Tells the pathfinder that it can path through a closed iron door assuming the AI will open the door.
 */
export type CanOpenIronDoors6 = boolean;
/**
 * Whether a path can be created through a door.
 */
export type CanPassDoors6 = boolean;
/**
 * Tells the pathfinder that it can start pathing when in the air.
 */
export type CanPathFromAir6 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the lava.
 */
export type CanPathOverLava6 = boolean;
/**
 * Tells the pathfinder whether or not it can travel on the surface of the water.
 */
export type CanPathOverWater6 = boolean;
/**
 * Tells the pathfinder whether or not it will be pulled down by gravity while in water.
 */
export type CanSink6 = boolean;
/**
 * Tells the pathfinder whether or not it can path anywhere through water and plays swimming animation along that path.
 */
export type CanSwim6 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground outside water.
 */
export type CanWalk6 = boolean;
/**
 * Tells the pathfinder whether or not it can travel in lava like walking on ground.
 */
export type CanWalkInLava6 = boolean;
/**
 * Tells the pathfinder whether or not it can walk on the ground underwater.
 */
export type IsAmphibious6 = boolean;
/**
 * UNDOCUMENTED.
 */
export type Translate = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
export type X2 = number;
export type Y2 = number;
export type Z1 = number;
/**
 * UNDOCUMENTED.
 */
export type Scale = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
/**
 * UNDOCUMENTED.
 */
export type Translate1 = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
/**
 * UNDOCUMENTED.
 */
export type Scale1 = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
/**
 * UNDOCUMENTED.
 */
export type Variant = number;
/**
 * UNDOCUMENTED.
 */
export type MarkVariant1 = number;
/**
 * UNDOCUMENTED.
 */
export type SkinList = Skin[];
/**
 * If true, the entities will blend their attributes in the offspring after they breed.
 */
export type BlendAttributes = boolean;
/**
 * The percentage chance of denying the parents` variant.
 */
export type Chance1 = number;
/**
 * The inclusive maximum of the variant range.
 */
export type MaximumVariant = number;
/**
 * The inclusive minimum of the variant range.
 */
export type MinimumVariant = number;
/**
 * The percentage chance of the offspring getting its color as if spawned rather than inheriting color from its parents.
 */
export type Color1 = number;
/**
 * The percentage chance of a mutation on the entity's extra variant type.
 */
export type ExtraVariant = number;
/**
 * The percentage chance of a mutation on the entity's variant type.
 */
export type Variant1 = number;
/**
 * Strategy used for mutating variants and extra variants for offspring. Current valid alternatives are 'random' and 'none'.
 */
export type MutationStrategy = string;
/**
 * [EXPERIMENTAL] List of attributes that should benefit from parent centric attribute blending. For example, horses blend their health, movement, and jump_strength in their offspring.
 */
export type ParentCentricAttributeBlending = unknown[];
/**
 * The chance it should not inherit from either parent
 */
export type MutationChance = number;
/**
 * Array of values to select from if mutating and the component has random mutation set
 *
 * @minItems 1
 */
export type MutationValues = [unknown, ...unknown[]];
/**
 * An vector of 2 number.
 */
export type VectorOf2Items1 = (number & []) | [X1] | [X1, Y1];
/**
 * An vector of 2 number.
 */
export type VectorOf2Items2 = (number & []) | [X1] | [X1, Y1];
/**
 * If true, the babies will be automatically tamed if its parents are.
 */
export type InheritTamed = boolean;
/**
 * If true, the babies will have their color be mixed.
 */
export type CombineParentColors = boolean;
/**
 * This interface was referenced by `OffspringPairs`'s JSON-Schema definition
 * via the `patternProperty` "^[0-9a-zA-Z:_\.\-]+$".
 */
export type OffspringIdentifier = string;
/**
 * Adds a trigger to call on this entity's death.
 */
export type OnDeath1 = string | Trigger | Trigger1[];
/**
 * The slot number of this slot.
 */
export type Slot3 = number;
/**
 * A list of slot-specific events to execute when the entity's equipment changes in those slots.
 */
export type Slots2 = Slots3[];
/**
 * Adds a trigger that will run when a nearby entity of the same type as this entity becomes Angry.
 */
export type OnFriendlyAnger = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this entity is attacked by the player.
 */
export type OnHurtByPlayer = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this entity takes damage.
 */
export type OnHurt = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this entity is set on fire.
 */
export type OnIgnite = string | Trigger | Trigger1[];
/**
 * Only usable by the Ender Dragon. Adds a trigger to call when this entity lands.
 */
export type OnStartLanding = string | Trigger | Trigger1[];
/**
 * Only usable by the Ender Dragon. Adds a trigger to call when this entity starts flying.
 */
export type OnStartTakeoff = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this entity finds a target.
 */
export type OnTargetAcquired = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this entity loses the target it currently has.
 */
export type OnTargetEscape = string | Trigger | Trigger1[];
/**
 * Adds a trigger to call when this pet's owner awakes after sleeping with the pet.
 */
export type OnWakeWithOwner = string | Trigger | Trigger1[];
/**
 * Whether or not the entity collides with things.
 */
export type HasCollision = boolean;
/**
 * Whether or not the entity is affected by gravity.
 */
export type HasGravity = boolean;
/**
 * Whether or not the entity is pushed to the closest space.
 */
export type PushedTowardsClosestSpace = boolean;
/**
 * The initial value of the player exhaustion.
 */
export type Value15 = number;
/**
 * The maximum player exhaustion of this entity.
 */
export type Maximum8 = number;
/**
 * The initial value of the player experience.
 */
export type Value16 = number;
/**
 * The maximum player experience of this entity.
 */
export type Maximum9 = number;
/**
 * The initial value of the player level.
 */
export type Value17 = number;
/**
 * The maximum player level value of the entity.
 */
export type Maximum10 = number;
/**
 * The initial value of player saturation.
 */
export type Value18 = number;
/**
 * The maximum player saturation value.
 */
export type Maximum11 = number;
/**
 * Cost for non-preferred blocks.
 */
export type DefaultBlockCost = number;
/**
 * Added cost for jumping up a node.
 */
export type JumpCost = number;
/**
 * Distance mob can fall without taking damage.
 */
export type MaximumFallBlocks = number;
/**
 * A list of blocks with their associated cost.
 */
export type PreferredPathBlocks = {
  cost?: number;
  blocks?: BlockReference[];
}[];
/**
 * Allows you to choose an anchor point for where the projectile is fired from. 0 = Original point, 1 = EyeHeight, and 2 = Middle or body height.
 */
export type Anchor = number;
/**
 * Alters the angle at which a projectile is vertically shot. Many splash potions in the game use this to offset their angles by -20 degrees.
 */
export type AngleOffset = number;
/**
 * If true, the entity hit will be set on fire.
 */
export type CatchFire = boolean;
/**
 * If true, when a projectile deals damage, whether or not to spawn in the critical damage particles.
 */
export type CritParticleOnHurt = boolean;
/**
 * When this projectile deals damage, whether or not to immediately destroy this projectile.
 */
export type DestroyOnHurt = boolean;
/**
 * Entity Definitions defined here can't be hurt by the projectile.
 */
export type Filter1 = string;
/**
 * If true, whether the projectile causes fire is affected by the mob griefing game rule.
 */
export type FireAffectedByGriefing1 = boolean;
/**
 * The gravity applied to this entity when thrown. When this actor is not on the ground, subtracts this amount from the actors change in vertical position every tick. The higher the value, the faster the entity falls.
 */
export type Gravity = number;
/**
 * If true, when hitting a vehicle, and there's at least one passenger in the vehicle, the damage will be dealt to the passenger closest to the projectile impact point. If there are no passengers, this setting does nothing.
 */
export type HitNearestPassenger = boolean;
/**
 * [EXPERIMENTAL] An array of strings defining the types of entities that this entity does not collide with.
 *
 * @minItems 1
 */
export type IgnoredEntities = [string, ...string[]];
/**
 * The sound that plays when the projectile hits the ground.
 */
export type HitGroundSound = string;
/**
 * The sound that plays when the projectile hits something.
 */
export type HitSound = string;
/**
 * If true, the projectile homes in to the nearest entity.
 */
export type Homing = boolean;
/**
 * The fraction of the projectile's speed maintained every frame while traveling in air.
 */
export type Inertia = number;
/**
 * If true, the projectile will be treated as dangerous to the players.
 */
export type IsDangerous = boolean;
/**
 * If true, this projectile will not be affected by outside forces such as friction and drag.
 */
export type IsolatedPhysics = boolean;
/**
 * If true, the projectile will knock back the entity it hits.
 */
export type Knockback = boolean;
/**
 * If true, the entity hit will be struck by lightning.
 */
export type Lightning = boolean;
/**
 * The fraction of the projectile's speed maintained every frame while traveling in water.
 */
export type LiquidInertia = number;
/**
 * If true, the projectile can hit multiple entities per flight.
 */
export type MultipleTargets = boolean;
/**
 * The offset from the entity's anchor where the projectile will spawn.
 */
export type Offset = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * The X component.
 */
export type X3 = number;
/**
 * The Y component.
 */
export type Y3 = number;
/**
 * The Z component.
 */
export type Z2 = number;
/**
 * Time in seconds that the entity hit will be on fire for.
 */
export type OnFireTime = number;
/**
 * Number of ticks after launch during which the projectile cannot hit its owner
 */
export type OwnerLaunchImmunityTicks = number;
/**
 * If true, the effect will be applied to blocking targets.
 */
export type ApplyEffectToBlockingTargets = boolean;
/**
 * Determines if the struck object is set on fire.
 */
export type CatchFire1 = boolean;
/**
 * The projectile that will be affected by this event.
 */
export type AffectProjectile = boolean;
/**
 * The shooter that will be affected by this event.
 */
export type AffectShooter = boolean;
/**
 * All entities in the splash area will be affected by this event.
 */
export type AffectSplashArea = boolean;
/**
 * The target will be affected by this event.
 */
export type AffectTarget = boolean;
/**
 * The event triggered. Also has an option filters parameter to limit affected targets.
 */
export type EventTrigger =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The event to fire.
 */
export type Event3 = string;
/**
 * The target of the event.
 */
export type Target1 = "baby" | "block" | "damager" | "other" | "parent" | "player" | "self" | "target";
/**
 * The splash area that will be affected.
 */
export type SplashArea = number;
/**
 * Controls how world difficulty contributes to the rolled damage. `none` ignores difficulty, `additive` adds a difficulty-driven term on top of the base damage, and `multiplicative` folds the difficulty term into `power_multiplier` before scaling by velocity.
 */
export type DifficultyRandomization = "none" | "additive" | "multiplicative";
/**
 * If the target is on fire, then douse the fire.
 */
export type DouseFire = boolean;
/**
 * The shape of the area that is frozen.
 */
export type Shape = "sphere" | "cube";
/**
 * If true, the area will snap to the nearest block.
 */
export type SnapToBlock = boolean;
/**
 * The size of the area that is frozen.
 */
export type Size = number;
/**
 * The minimum XP granted.
 */
export type MinXP = number;
/**
 * The maximum XP granted.
 */
export type MaxXP = number;
/**
 * The amount of damage the owner will take.
 */
export type OwnerDamage = number;
/**
 * If true, the owner will be knocked back.
 */
export type Knockback1 = boolean;
/**
 * If true, the owner will be set on fire.
 */
export type Ignite = boolean;
/**
 * Determines if a fire may be started on a flammable target.
 */
export type Ignite1 = boolean;
/**
 * UNDOCUMENTED
 */
export type ApplyKnockbackToBlockingTargets = boolean;
/**
 * Determines if the struck object is set on fire.
 */
export type CatchFire2 = boolean;
/**
 * Whether lightning can be channeled through hte weapon.
 */
export type Channeling = boolean;
/**
 * The damage dealt on impact.
 */
export type Damage3 = number | [] | [Min3] | [Min3, Max3];
export type Min3 = number;
export type Max3 = number;
/**
 * Projectile is removed on hit.
 */
export type DestroyOnHit = boolean;
/**
 * If true, then the hit must cause damage to destroy the projectile.
 */
export type DestroyOnHitRequiresDamage = boolean;
/**
 * The identifier of an entity that can be hit.
 */
export type Filter2 = string;
/**
 * If true, the projectile will knock back the entity it hits.
 */
export type Knockback2 = boolean;
/**
 * Maximum critical damage.
 */
export type MaxCriticalDamage = number;
/**
 * Minimum critical damage.
 */
export type MinCriticalDamage = number;
/**
 * How much the base damage is multiplied.
 */
export type PowerMultiplier = number;
/**
 * If true, damage will be randomized based on damage and speed.
 */
export type SemiRandomDiffDamage = boolean;
/**
 * If true, then the hit must cause damage to update the last hurt property.
 */
export type SetLastHurtRequiresDamage = boolean;
/**
 * If true, the projectile will bounce
 */
export type ShouldBounce = "no" | "if_invulnerable" | "if_no_damage_dealt";
/**
 * If `true`, rounds the projectile's damage up to the next integer before the critical-hit multiplier is applied.
 */
export type CeilPreCriticalDamage = boolean;
/**
 * If true, a mob will spawn that is not hostile, like the bat entity in Minecraft.
 */
export type Ambient1 = boolean;
/**
 * The multiplier of the amplification of this effect.
 */
export type Amplifier = number;
/**
 * The effect's duration.
 */
export type Duration6 = number | "infinite";
/**
 * The effect's duration on easy mode.
 */
export type DurationEasy = number | "infinite";
/**
 * The effect's duration on hard mode.
 */
export type DurationHard = number | "infinite";
/**
 * The effect's duration on normal mode.
 */
export type DurationNormal = (number | "infinite") & number;
/**
 * A mob effect
 */
export type Effect1 =
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
 * Does the entity's look change.
 */
export type Visible = boolean;
/**
 * The amount of time a target will remain on fire.
 */
export type OnFireTime1 = number;
/**
 * The number of particles to spawn.
 */
export type NumParticles = number;
/**
 * If true, spawns particles on an entity hit.
 */
export type OnEntityHit = boolean;
/**
 * If true, spawns particles on any other hit.
 */
export type OnOtherHit = boolean;
/**
 * The id of the particle to spawn on hit.
 */
export type ParticleType1 = string;
/**
 * Defines the effect the arrow will apply to the entity it hits.
 */
export type PotionEffect = number;
/**
 * Potion spawns an area of effect cloud. See the table below for all spawn_aoe_cloud parameters.
 */
export type SpawnAOECloud = boolean;
/**
 * The amount of new entities spawned.
 */
export type FirstSpawnCount = number;
/**
 * The chance that a spawn occurs when a projectile hits the entity.
 */
export type FirstSpawnPercentChance = number;
/**
 * The chance that a first spawn occurs when a projectile hits the entity.
 */
export type FirstSpawnChance = number;
/**
 * The chance that a second spawn occurs when a projectile hits the entity.
 */
export type SecondSpawnChance = number;
/**
 * The amount of new entities spawned in teh second spawn.
 */
export type SecondSpawnCount = number;
/**
 * Determines if a baby spawns.
 */
export type SpawnBaby = boolean;
/**
 * The entity that will spawn.
 */
export type SpawnDefinition = string;
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCI".
 */
export type Trigger2 = string | Trigger | Trigger1[];
/**
 * Triggered on the newly spawned entity with other set to the owning entity.
 */
export type OnSpawn = Trigger2[];
/**
 * Determines if the owner is transported on hit.
 */
export type TeleportOwner = boolean;
/**
 * Particle to use upon collision.
 */
export type Particle = string;
/**
 * Defines the effect the arrow will apply to the entity it hits.
 */
export type PotionEffect1 = number;
/**
 * Determines the velocity of the projectile.
 */
export type Power1 = number;
/**
 * During the specified time, in seconds, the projectile cannot be reflected by hitting it
 */
export type ReflectImmunity = number;
/**
 * If true, this entity will be reflected back when hit.
 */
export type ReflectOnHurt = boolean;
/**
 * The sound that plays when the projectile is shot.
 */
export type ShootSound = string;
/**
 * If true, the projectile will be shot towards the target of the entity firing it.
 */
export type ShootTarget = boolean;
/**
 * If true, the projectile will bounce upon hit.
 */
export type ShouldBounce1 = boolean;
/**
 * If true, the projectile will be treated like a splash potion.
 */
export type SplashPotion = boolean;
/**
 * Radius in blocks of the 'splash' effect.
 */
export type SplashRange = number;
/**
 * Determines if the projectile stops when the target is hurt.
 */
export type StopOnHurt = boolean;
/**
 * The base accuracy. Accuracy is determined by the formula uncertaintyBase - difficultyLevel * uncertaintyMultiplier.
 */
export type UncertaintyBase = number;
/**
 * Determines how much difficulty affects accuracy. Accuracy is determined by the formula uncertaintyBase - difficultyLevel * uncertaintyMultiplier.
 */
export type UncertaintyMultiplier = number;
/**
 * The value of the entity's push-through, in blocks.
 */
export type Value19 = number;
/**
 * Conditions that must be met for the preset to be applied
 */
export type Filters12 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The type of push calculation
 */
export type PushMode = "none" | "default" | "legacy_boat" | "legacy_minecart" | "ball";
/**
 * Determines whether the collision boxes of two entities must overlap for pushing to occur
 */
export type RequireCollisionOverlap = boolean;
/**
 * Scales the push force applied to the entity
 */
export type StrengthMultiplier = number;
/**
 * Minimum distance between entities for push forces to be applied
 */
export type MinDistance = number;
/**
 * Controls the maximum range at which push interactions can occur for all push_mode values
 */
export type MaxDistance1 = number;
/**
 * Scales how much push force this entity applies to itself away on collision
 */
export type PushScaleSelf = number;
/**
 * Multiplier applied to the pushing entity's movement speed to determine kick force. Only used when push_mode is "ball"
 */
export type KickSpeedScale = number;
/**
 * Maximum speed the entity can be pushed back at, regardless of how fast the pushing entity is moving. Only used when push_mode is "ball".
 */
export type MaxKickSpeed = number;
/**
 * Minimum speed the the entity will be pushed back at, regardless of how slowly the pushing entity is moving. Only used when push_mode is "ball".
 */
export type MinKickSpeed = number;
/**
 * Multiplier for the upward force applied when the entity is pushed while on the ground. A value of 0 keeps the entity flat. Only used when push_mode is "ball"
 */
export type VerticalKickMultiplier = number;
/**
 * Scales how much push force this entity applies to the other entity on collision
 */
export type PushScaleOther = number;
/**
 * Control whether the pushed_by_player sound is played
 */
export type PlaySound = boolean;
/**
 * Cooldown in seconds between sounds, a lower number results in more sounds
 */
export type PlaySoundCooldownInSeconds = number;
/**
 * Minimum change of velocity needed to trigger the push sound, a lower value means higher sensitivity
 */
export type PlaySoundImpulseThreshold = number;
/**
 * Allows customization of push behavior per entity type
 */
export type Presets2 = {
  filters?: Filters12;
  push_mode?: PushMode;
  require_collision_overlap?: RequireCollisionOverlap;
  strength_multiplier?: StrengthMultiplier;
  min_distance?: MinDistance;
  max_distance?: MaxDistance1;
  push_scale_self?: PushScaleSelf;
  kick_speed_scale?: KickSpeedScale;
  max_kick_speed?: MaxKickSpeed;
  min_kick_speed?: MinKickSpeed;
  vertical_kick_multiplier?: VerticalKickMultiplier;
  push_scale_other?: PushScaleOther;
  play_sound?: PlaySound;
  play_sound_cooldown_in_seconds?: PlaySoundCooldownInSeconds;
  play_sound_impulse_threshold?: PlaySoundImpulseThreshold;
}[];
/**
 * Event to run we attempt to trigger a raid on the village.
 */
export type TriggeredEvent =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * Maximum speed that this entity will move at when on the rail.
 */
export type MaximumSpeed = number;
/**
 * If true, on tick this entity will trigger its on_deactivate behavior.
 */
export type CheckBlockTypes = boolean;
/**
 * If true, this entity will eject all of its riders when it passes over an activated rail.
 */
export type EjectOnActivate = boolean;
/**
 * If true, this entity will eject all of its riders when it passes over a deactivated rail.
 */
export type EjectOnDeactivate = boolean;
/**
 * If true, command blocks will start ticking when passing over an activated rail.
 */
export type TickCommandBlockOnActivate = boolean;
/**
 * If false, command blocks will stop ticking when passing over a deactivated rail.
 */
export type TickCommandBlockOnDeactivate = boolean;
/**
 * The strength with which blocking entities should be knocked back.
 */
export type KnockbackStrength = number;
/**
 * The chance of this reaction being picked.
 */
export type Weight = number;
/**
 * An event that runs when this reaction is picked.
 */
export type Value20 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * A list of weighted responses to the melee attack being blocked.
 */
export type ReactionChoices = {
  weight?: Weight;
  value?: Value20;
}[];
/**
 * The seat that designates the driver of the entity. Entities with the "minecraft:behavior.controlled_by_player" goal ignore this field and give control to any player in any seat.
 */
export type ControllingSeat = number;
/**
 * If true, this entity can't be interacted with if the entity interacting with it is crouching.
 */
export type CrouchingSkipInteract = boolean;
export type FamilyType = string;
/**
 * List of entities that can ride this entity.
 */
export type FamilyTypes = FamilyType[];
/**
 * The text to display when the player can interact with the entity when playing with Touch-screen controls.
 */
export type InteractText3 = string;
/**
 * Defines where riders are placed when dismounting this entity:
 * - "default", riders are placed on a valid ground position around the entity, or at the center of the entity's collision box if none is found.
 * - "on_top_center", riders are placed at the center of the top of the entity's collision box.
 */
export type DismountMode = "default" | "on_top_center";
/**
 * Event to execute on the owner entity when an entity starts riding it.
 */
export type OnRiderEnterEvent =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * Event to execute on the owner entity when an entity stops riding it.
 */
export type OnRiderExitEvent =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The max width a mob can have to be a rider. A value of 0 ignores this parameter.
 */
export type PassengerMaxWidth = number;
/**
 * If true, this entity will pull in entities that are in the correct family_types into any available seats.
 */
export type PullInEntities = boolean;
/**
 * If true, this entity will be picked when looked at by the rider.
 */
export type RiderCanInteract = boolean;
/**
 * The number of entities that can ride this entity at the same time.
 */
export type SeatCount = number;
/**
 * The list of positions and number of riders for each position for entities riding this entity.
 */
export type Seats = CIESeatsSpec | CIESeatsSpec1[];
/**
 * Can be used to set a different camera radius when in third person or third person front camera. Value 0.0 is ignored.
 */
export type ThirdPersonCameraRadius = number;
/**
 * Adds springiness to the camera movement when the camera moves back to its radius after being pushed closer to the player by and obstacle. A higher value means a stiffer spring. Value 0.0 is ignored.
 */
export type CameraRelaxDistanceSmoothing = number;
/**
 * Angle in degrees that a rider is allowed to rotate while riding this entity. Omit this property for no limit
 */
export type LockRiderRotation = number;
/**
 * Defines the maximum number of riders that can be riding this entity for this seat to be valid.
 */
export type MaxRiderCount = number;
/**
 * Defines the minimum number of riders that need to be riding this entity before this seat can be used.
 */
export type MinRiderCount = number;
/**
 * Position of this seat relative to this entity's position.
 */
export type Position = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Offset to rotate riders by.
 */
export type RotateRiderBy = string | number;
/**
 * A Molang expression defining the angle in degrees to add to the projectile's y axis rotation.
 */
export type AzimuthAngle = string | number;
/**
 * A Molang expression defining the angle in degrees to add to the projectile's x axis rotation.
 */
export type ElevationAngle = string | number;
/**
 * An array of strings defining the types of projectiles that are reflected when they hit the entity.
 */
export type ReflectedProjectiles = string[];
/**
 * A Molang expression defining the velocity scaling of the reflected projectile. Values below 1 decrease the projectile's velocity, and values above 1 increase it.
 */
export type RefelctionScale = string | number;
/**
 * A string defining the name of the sound event to be played when a projectile is reflected. "reflect" unless specified.
 */
export type ReflectionSound = string;
/**
 * Ending scale of the entity when it's fully grown.
 */
export type EndScale = number;
/**
 * Initial scale of the newborn entity.
 */
export type StartScale = number;
/**
 * The value of the scale. 1.0 means the entity will appear at the scale they are defined in their model. Higher numbers make the entity bigger
 */
export type Value21 = number;
/**
 * The minimum the scheduler will be delayed.
 */
export type MinimumDelaySecs = number;
/**
 * The maximum the scheduler will be delayed.
 */
export type MaximumDelaySecs = number;
/**
 * Minecraft behavior event.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHG".
 */
export type Event4 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The list of triggers that fire when the conditions match the given filter criteria. If any filter criteria overlap the first defined event will be picked.
 */
export type ScheduledEvents = ScheduledEvents1[];
/**
 * A bucket for all other items in the game. Note this category is always least priority items.
 */
export type AllItems = boolean;
/**
 * Maximum number of this item the mob will hold.
 */
export type AllItemsMaximumAmount = number;
/**
 * Number of this item considered extra that the entity wants to share.
 */
export type AllItemsSurplusAmount = number;
/**
 * Number of this item this entity wants to share.
 */
export type AllItemsWantAmount = number;
/**
 * Mob will admire the item after picking up by looking at it. For this to happen the mob needs to have an Admire component and an Admire goal.
 */
export type Admire1 = boolean;
/**
 * Mob will barter for the item after picking it up. For this to work the mob needs to have a Barter component and a Barter goal.
 */
export type Barter2 = boolean;
/**
 * Determines whether the mob will consume the item or not.
 */
export type ConsumeItem = boolean;
/**
 * Defines the item this entity wants to craft with the item defined above. Should be an item name.
 */
export type CraftInto = string;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier5 = string;
/**
 * Aux value for the item.
 */
export type ItemAux = number;
/**
 * Maximum number of this item the mob will hold.
 */
export type MaximumAmount = number;
/**
 * Maximum number of this item the mob will pick up during a single goal tick.
 */
export type PickupLimit = number;
/**
 * Prioritizes which items the entity prefers. 0 is the highest priority.
 */
export type Priority = number;
/**
 * Determines whether the mob will try to put the item in its inventory if it has the inventory component and if it can't be equipped.
 */
export type StoredInInventory = boolean;
/**
 * Number of this item considered extra that the entity wants to share.
 */
export type SurplusAmount = number;
/**
 * Number of this item this entity wants to have.
 */
export type WantAmount = number;
/**
 * Determines whether the mob can only pickup the item and not drop it.
 */
export type PickupOnly = boolean;
/**
 * Determines whether the mob can only pickup one item at a time.
 */
export type SingularPickup = boolean;
/**
 * ID of the Potion effect to be applied on hit.
 */
export type AuxVal = number;
/**
 * Actor definition to use as projectile for the ranged attack. The actor definition must have the projectile component to be able to be shot as a projectile
 */
export type Def = string;
/**
 * Sets whether the projectiles being used are flagged as magic. If set, the ranged attack goal will not be used at the same time as other magic goals, such as minecraft:behavior.drink_potion.
 */
export type Magic = boolean;
/**
 * Velocity in which the projectiles will be shot. A power of 0 will be overwritten by the default projectile throw power.
 */
export type Power2 = number;
/**
 * Projectiles that can be used by the shooter
 */
export type Projectile1 = string;
/**
 * ID of the Potion effect to be applied on hit.
 */
export type AuxVal1 = number;
/**
 * Actor definition to use as projectile for the ranged attack. The actor definition must have the projectile component to be able to be shot as a projectile
 */
export type Def1 = string;
/**
 * List of projectiles that can be used by the shooter. Projectiles are evaluated in the order of the list; after a projectile is chosen, the rest of the list is ignored.
 */
export type Projectiles = (Projectile1 | Projectile2)[];
/**
 * Sound that is played when the shooter shoots a projectile.
 */
export type Sound1 = string;
/**
 * The ID of the skin. By convention, 0 is the ID of the base skin
 */
export type Value22 = number;
/**
 * The value of the volume the entity uses for sound effects.
 */
export type Value23 = number;
/**
 * The entities to spawn.
 */
export type Entities = EntitySpawn | EntitySpawn1[];
/**
 * If present, the specified entity will only spawn if the filter evaluates to true.
 */
export type Filters13 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Maximum amount of time to randomly wait in seconds before another entity is spawned.
 */
export type MaximumWaitTime = number;
/**
 * Minimum amount of time to randomly wait in seconds before another entity is spawned.
 */
export type MinimumWaitTime = number;
/**
 * The number of entities of this type to spawn each time that this triggers.
 */
export type NumToSpawn = number;
/**
 * If true, this the spawned entity will be leashed to the parent.
 */
export type ShouldLeash = boolean;
/**
 * If true, this component will only ever spawn the specified entity once.
 */
export type SingleUse = boolean;
/**
 * Identifier of the entity to spawn, leave empty to spawn the item defined above instead.
 */
export type SpawnEntity1 = string;
/**
 * Event to call when the entity is spawned.
 */
export type SpawnEvent1 = string;
/**
 * Item identifier of the item to spawn.
 */
export type SpawnItem =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * Method to use to spawn the entity.
 */
export type SpawnMethod = string;
/**
 * Identifier of the sound effect to play when the entity is spawned.
 */
export type SpawnSound = string;
/**
 * The X component.
 */
export type X4 = number;
/**
 * The Y component.
 */
export type Y4 = number;
/**
 * What entity to spawn, defaults to owning entity when not set
 */
export type EntityToSpawn = string;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters14 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * If true, the entity will inherit the name of the parent entity, defaults to true when not set
 */
export type InheritParentName = boolean;
/**
 * How many entities to spawn, defaults to 1 when not set
 */
export type SpawnAmount = number;
/**
 * Spawn method
 */
export type SpawnMethod1 = "born" | "spawned" | "summoned";
/**
 * The level of the effect, same as used in the /effect command (0 for level I, 1 for level II, etc). Defaults to 0. NOTE: Values can be negative but its not an intentional feature
 */
export type Amplifier1 = number;
/**
 * Boolean value that should cause the particles emitted by the entity to be partially transparent. This does not work properly, resulting in this property having no effect. Defaults to false.
 */
export type Ambient2 = boolean;
/**
 * The amount of time in seconds the effect should last. This allows for fractional numbers. For example, instant effects should be set to 0.05 seconds (one tick).
 */
export type Duration7 = number | "infinite";
/**
 * Boolean value. When set to true, applying this effect displays an animated graphic on-screen similar to the totem of undying effect. Obviously, this only works for players. Defaults to false.
 */
export type DisplayOnScreenAnimation = boolean;
/**
 * A mob effect
 */
export type Effect2 =
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
 * Boolean value. When set to true, the effect will be visible to the player. Defaults to true.
 */
export type Visible1 = boolean;
/**
 * List of effects to add to this entity after adding this component.
 */
export type AddEffects = (
  | Effect
  | {
      amplifier?: Amplifier1;
      ambient?: Ambient2;
      duration?: Duration7;
      display_on_screen_animation?: DisplayOnScreenAnimation;
      effect?: Effect2;
      visible?: Visible1;
    }
)[];
/**
 * List of identifiers of effects to be removed from this entity after adding this component.
 */
export type RemoveEffects = SpellEffectID[] | string;
/**
 * identifier of the effect to be removed from this entity after adding this component.
 */
export type SpellEffectID = string;
/**
 * The maximum strength of this entity.
 */
export type Maximum12 = number;
/**
 * The initial value of the strength.
 */
export type Value24 = number;
/**
 * The chance of taming the entity with each item use between 0.0 and 1.0, where 1.0 is 100%
 */
export type Probability = number;
/**
 * The list of items that can be used to tame this entity.
 */
export type TameItems =
  | (
      | ItemIdentifier
      | {
          item?: BB;
          result_item?: ResultItem3;
          [k: string]: unknown;
        }
    )[]
  | ItemIdentifier;
/**
 * The item used will transform to this item upon successful interaction. Format: itemName:auxValue
 */
export type ResultItem3 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The amount the entity's temper will increase when mounted.
 */
export type AttemptTemperMod = number;
/**
 * The list of items that, if carried while interacting with the entity, will anger it.
 */
export type AutoRejectItems = DAGAutoRejectItems | DAGAutoRejectItems1[];
/**
 * The text that shows in the feeding interact button.
 */
export type FeedText = string;
/**
 * The list of items that can be used to increase the entity's temper and speed up the taming process.
 */
export type FeedItems1 = DAGFeedItems | DAGFeedItems1[];
/**
 * Name of the item this entity likes and can be used to increase this entity's temper.
 */
export type Item5 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The amount of temper this entity gains when fed this item.
 */
export type TemperMod = number;
/**
 * The maximum value for the entity's random starting temper.
 */
export type MaximumTemper = number;
/**
 * The minimum value for the entity's random starting temper.
 */
export type MinimumTemper = number;
/**
 * The text that shows in the riding interact button.
 */
export type RideText = string;
/**
 * Whether the other entity needs to be visible to trigger `inside` events.
 */
export type MustSee = boolean;
/**
 * Maximum distance in blocks that another entity will be considered in the `inside` range.
 */
export type InsideRange = number;
/**
 * Maximum distance in blocks that another entity will be considered in the `outside` range.
 */
export type OutsideRange = number;
/**
 * Modifies the chance that the entity will teleport if the entity is in darkness.
 */
export type DarkTeleportChance = number;
/**
 * Modifies the chance that the entity will teleport if the entity is in daylight.
 */
export type LightTeleportChance = number;
/**
 * Maximum amount of time in seconds between random teleports.
 */
export type MaximumRandomTeleportTime = number;
/**
 * Minimum amount of time in seconds between random teleports.
 */
export type MinimumRandomTeleportTime = number;
/**
 * Entity will teleport to a random position within the area defined by this cube.
 */
export type RandomTeleportCube = [] | [A5] | [A5, B3] | [A5, B3, C];
export type A5 = number;
export type B3 = number;
export type C = number;
/**
 * If true, the entity will teleport randomly.
 */
export type RandomTeleports = boolean;
/**
 * Maximum distance the entity will teleport when chasing a target.
 */
export type TargetDistance = number;
/**
 * The chance that the entity will teleport between 0.0 and 1.0. 1.0 means 100%
 */
export type TargetTeleportChance = number;
/**
 * The distance at which the closest player has to be before this entity despawns. This option will be ignored if never_despawn is true. Min: 128 blocks.
 */
export type DistanceToPlayers = number;
/**
 * If true, this entity will not despawn even if players are far away. If false, distance_to_players will be used to determine when to despawn.
 */
export type NeverDespawn = boolean;
/**
 * The area around the entity to tick. Default: 2. Allowed range: 2-6.
 */
export type Radius3 = number;
/**
 * If true, the timer will restart every time after it fires.
 */
export type Looping = boolean;
/**
 * If true, the amount of time on the timer will be random between the Minimum and Maximum values specified in time.
 */
export type RandomInterval = boolean;
/**
 * Amount of time in seconds for the timer. Can be specified as a number or a pair of numbers (Minimum and max). Incompatible with random_time_choices.
 */
export type Time = [] | [Minimum4] | [Minimum4, Maximum13] | number;
export type Minimum4 = number;
export type Maximum13 = number;
/**
 * The weight on how likely this section is to trigger.
 */
export type Weight1 = number;
/**
 * The value in seconds that would be used if this section was picked.
 */
export type Value25 = number;
/**
 * This is a list of objects, representing one value in seconds that can be picked before firing the event and an optional weight. Incompatible with time.
 */
export type RandomTimeChoices = RandomTimeChoices1[];
/**
 * Determines when the mob transforms, if the trades should be converted when the new mob has a economy_trade_table. When the trades are converted, the mob will generate a new trade list with their new trade table, but then it will try to convert any of the same trades over to have the same enchantments and user data. For example, if the original has a Emerald to Enchanted Iron Sword (Sharpness 1), and the new trade also has an Emerald for Enchanted Iron Sword, then the enchantment will be Sharpness 1.
 */
export type ConvertTradesEconomy1 = boolean;
/**
 * Name to be displayed while trading with this entity.
 */
export type DisplayName1 = string;
/**
 * Used to determine if trading with entity opens the new trade screen.
 */
export type NewScreen1 = boolean;
/**
 * Determines if the trades should persist when the mob transforms. This makes it so that the next time the mob is transformed to something with a trade_table or economy_trade_table, then it keeps their trades.
 */
export type PersistTrades1 = boolean;
/**
 * File path relative to the resource pack root for this entity's trades.
 */
export type Table5 = string;
/**
 * The type of block you wish to be spawned by the entity as it move about the world. Solid blocks may not be spawned at an offset of ().
 */
export type BlockType = string;
/**
 * One or more conditions that must be met in order to cause the chosen block type to spawn.
 */
export type Filters15 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The distance from the entities current position to spawn the block. Capped at up to 16 blocks away. The X value is left/right(-/+), the Z value is backward/forward(-/+), the Y value is below/above(-/+).
 */
export type SpawnOffset = [] | [X5] | [X5, Y5] | [X5, Y5, Z3];
export type X5 = number;
export type Y5 = number;
export type Z3 = number;
/**
 * Sound to play when the transformation starts.
 */
export type BeginTransformSound = string;
/**
 * Defines the properties of the delay for the transformation.
 */
export type Delay =
  | number
  | {
      /**
       * Chance that the entity will look for nearby blocks that can speed up the transformation. Value must be between 0.0 and 1.0
       */
      block_assist_chance?: number;
      /**
       * Chance that, once a block is found, will help speed up the transformation.
       */
      block_chance?: number;
      /**
       * Maximum number of blocks the entity will look for to aid in the transformation. If not defined or set to 0, it will be set to the block radius
       */
      block_max?: number;
      /**
       * Distance in Blocks that the entity will search for blocks that can help the transformation.
       */
      block_radius?: number;
      /**
       * List of blocks that can help the transformation of this entity.
       */
      block_types?: BlockIdentifier2[];
      /**
       * Time in seconds before the entity transforms.
       */
      value?: number;
      [k: string]: unknown;
    };
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDE".
 */
export type BlockIdentifier2 = string;
/**
 * Cause the entity to drop all equipment upon transformation.
 */
export type DropEquipment = boolean;
/**
 * Cause the entity to drop all items in inventory upon transformation.
 */
export type DropInventory = boolean;
/**
 * Entity Definition that this entity will transform into.
 */
export type Into = string;
/**
 * If this entity has trades and has leveled up, it should maintain that level after transformation.
 */
export type KeepLevel = boolean;
/**
 * If this entity is owned by another entity, it should remain owned after transformation.
 */
export type KeepOwner = boolean;
/**
 * Cause the entity to keep equipment after going through transformation.
 */
export type PreserveEquipment = boolean;
/**
 * Sound to play when the entity is done transforming.
 */
export type TransformationSound = string;
/**
 * The chance of the entity trusting with each item use between 0.0 and 1.0, where 1.0 is 100%
 */
export type Probability1 = number;
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier6 = string;
/**
 * The list of items that can be used to get the entity to trust players.
 */
export type TrustItems = ItemIdentifier6[];
/**
 * Family name.
 */
export type Family1 = string;
/**
 * List of family names.
 */
export type Family = Family1[];
/**
 * The maximum auto step height when on any other block.
 */
export type BaseValue = number;
/**
 * The maximum auto step height when on any other block and controlled by the player.
 */
export type ControlledValue = number;
/**
 * The maximum auto step height when on a block that prevents jumping.
 */
export type JumpPreventedValue = number;
/**
 * The ID of the variant. By convention, 0 is the ID of the base entity
 */
export type Value26 = number;
/**
 * Vertical velocity to apply when jump action is issued.
 */
export type VerticalVelocity = number;
/**
 * The higher the number, the faster the animation for walking plays. A value of 1.0 means normal speed, while 2.0 means twice as fast
 */
export type Value27 = number;
/**
 * Drag factor to determine movement speed when in water.
 */
export type DragFactor = number;
/**
 * How important this behavior is. Lower priority behaviors will be executed first.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDA".
 */
export type Priority1 = number;
/**
 * UNDOCUMENTED
 *
 * @minItems 1
 * @maxItems 2
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDB".
 */
export type ControlFlags = ["move" | "look" | "jump"] | ["move" | "look" | "jump", "move" | "look" | "jump"];
/**
 * The sound event to play when admiring the item.
 */
export type AdmireItemSound = string;
/**
 * Minecraft behavior event.
 */
export type Event5 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * Minecraft behavior event.
 */
export type Event6 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export type SoundInterval2 = DDC | number;
/**
 * The X component.
 */
export type X6 = number;
/**
 * The Y component.
 */
export type Y6 = number;
/**
 * Movement speed multiplier of the mob when using this AI Goal.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDE".
 */
export type SpeedMultiplier1 = number;
/**
 * Horizontal reach grown around the mob's AABB to register a hit.
 */
export type AttackReach = number;
/**
 * Distance beyond the target the mob aims during a charge.
 */
export type ChargeOvershootDistance = number;
/**
 * Absolute speed used during the charge attack.
 */
export type ChargeSpeed = number;
/**
 * Knockback force applied to the target on hit.
 */
export type KnockbackForce = number;
/**
 * Maximum distance at which the mob attempts a charge.
 */
export type MaxChargeDistance = number;
/**
 * Should start tick interval.
 */
export type TickInterval = number;
/**
 * Maximum distance to look for a block in xz.
 */
export type SearchRange = number;
/**
 * Maximum distance to look for a block in y.
 */
export type SearchHeight = number;
/**
 * Modifier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
 */
export type SprintSpeedModifier = number;
/**
 * Block search method.
 */
export type TargetSelectionMethod = "random" | "nearest";
export type BlockID1 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * List of block types this mob avoids.
 */
export type TargetBlocks = BlockID1[];
/**
 * The sound event to play when the mob is avoiding a block.
 */
export type AvoidBlockSound = string;
/**
 * Modifier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
 */
export type WalkSpeedModifier = number;
/**
 * Escape trigger.
 */
export type WalkSpeedModifier1 = Event4[];
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export type SoundInterval3 = DDC | number;
/**
 * The sound event to play when the mob is avoiding another mob.
 */
export type AvoidMobSound = string;
/**
 * The next target position the entity chooses to avoid another entity will be chosen within this XZ Distance.
 */
export type AvoidTargetXZ = number;
/**
 * The next target position the entity chooses to avoid another entity will be chosen within this Y Distance.
 */
export type AvoidTargetY = number;
/**
 * Whether or not to ignore direct line of sight while this entity is running away from other specified entities.
 */
export type IgnoreVisibilty = boolean;
/**
 * Maximum distance to look for an avoid target for the entity.
 */
export type MaxDist = number;
/**
 * How many blocks away from its avoid target the entity must be for it to stop fleeing from the avoid target.
 */
export type MaxFlee = number;
/**
 * Percent chance this entity will stop avoiding another entity based on that entity's strength, where 1.0 = 100%.
 */
export type ProbabilityPerStrength = number;
/**
 * Determine if we should remove target when fleeing or not.
 */
export type RemoveTarget = boolean;
/**
 * How many blocks within range of its avoid target the entity must be for it to begin sprinting away from the avoid target.
 */
export type SprintDistance = number;
/**
 * Multiplier for sprint speed. 1.0 means keep the regular speed, while higher numbers make the sprint speed faster.
 */
export type SprintSpeedMultiplier = number;
/**
 * Multiplier for walking speed. 1.0 means keep the regular speed, while higher numbers make the walking speed faster.
 */
export type WalkSpeedMultiplier = number;
/**
 * If true, visbility between this entity and the mob type will not be checked.
 */
export type IgnoreVisibility = boolean;
/**
 * The list of conditions another entity must meet to be a valid target to avoid.
 */
export type EntityTypes = EntityType1[] | EntityType1;
/**
 * The amount of time in seconds that the mob has to wait before selecting a target of the same type again
 */
export type Cooldown3 = number;
/**
 * Maximum distance this mob can be away to be a valid choice.
 */
export type MaximumDist = number;
/**
 * UNDOCUMENTED.
 */
export type MaximumHeight1 = number;
/**
 * UNDOCUMENTED.
 */
export type MaximumHeight2 = number;
/**
 * UNDOCUMENTED.
 */
export type Priority2 = number;
/**
 * UNDOCUMENTED.
 */
export type WithinDefault = number;
/**
 * UNDOCUMENTED.
 */
export type CheckIfOutnumbered = boolean;
/**
 * If true, the mob has to be visible to be a valid choice.
 */
export type MustSee1 = boolean;
/**
 * Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more.
 */
export type MustSeeForgetDuration = number;
/**
 * If true, the mob will stop being targeted if it stops meeting any conditions.
 */
export type ReevaluateDescription = boolean;
/**
 * Multiplier for the running speed. A value of 1.0 means the speed is unchanged
 */
export type SprintSpeedMultiplier1 = number;
/**
 * Multiplier for the walking speed. A value of 1.0 means the speed is unchanged
 */
export type WalkSpeedMultiplier1 = number;
/**
 * Minecraft behavior event.
 */
export type Event7 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export type SoundInterval4 = DDC | number;
/**
 * List of items that this mob likes.
 */
export type Properties4 = (
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    }
) &
  string;
/**
 * List of items that this mob likes.
 */
export type Properties3 = Properties4[];
/**
 * Distance in blocks the mob will beg from.
 */
export type LookDistance = number;
/**
 * The duration in seconds that the celebration lasts for.
 */
export type Duration8 = number;
/**
 * Minecraft behavior event.
 */
export type Event8 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * The sound event to trigger during the celebration.
 */
export type CelebrationSound = string;
/**
 * The duration in seconds that the celebration lasts for.
 */
export type Duration9 = number;
/**
 * Trigger to fire.
 */
export type Trigger3 = string | Trigger | Trigger1[];
/**
 * A charge attack cannot start if the entity is farther than this distance to the target.
 */
export type MaxDistance2 = number;
/**
 * A charge attack cannot start if the entity is closer than this distance to the target.
 */
export type MinDistance1 = number;
/**
 * Percent chance this entity will start a charge attack, if not already attacking (1.0 = 100%)
 */
export type SuccessRate = number;
/**
 * The list of items that can be used to charge the held item. This list is required and must have at least one item in it.
 *
 * @minItems 1
 */
export type Items1 = [ItemID, ...ItemID[]];
/**
 * Items names to be used.
 */
export type ItemID =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * A random value to determine when to increase the size of the radius up to the maximum. This has a 1/value chance every tick to do so.
 */
export type RadiusChangeChance = number;
/**
 * A random value to determine when to change the height of the mob from the anchor point. This has a 1/value chance every tick to do so.
 */
export type HeightChangeChance = number;
/**
 * Maximum distance from the anchor-point in which this entity considers itself to have reached the anchor point. This is to prevent the entity from bouncing back and forth trying to reach a specific spot.
 */
export type GoalRadius = number;
/**
 * The number of blocks to increase the current movement radius by, upon successful `radius_adjustment_chance`. If the current radius increases over the range maximum, the current radius will be set back to the range minimum and the entity will change between clockwise and counter-clockwise movement.
 */
export type RadiusChange = number;
/**
 * Percent chance to determine how often to increase the size of the current movement radius around the anchor point. 1 = 100%. `radius_change_chance` is deprecated and has been replaced with `radius_adjustment_chance`.
 */
export type RadiusAdjustmentChance = number;
/**
 * Percent chance to determine how often to increase or decrease the current height around the anchor point. 1 = 100%. `height_change_chance` is deprecated and has been replaced with `height_adjustment_chance`.
 */
export type HeightAdjustmentChance = number;
/**
 * Number of degrees to change this entity's facing by, when the entity selects its next anchor point.
 */
export type AngleChange = number;
/**
 * The entity will attempt to rotate to face where the player is facing each tick. The entity will target this percentage of their difference in their current facing angles each tick (from 0.0 to 1.0 where 1.0 = 100%). This is limited by FractionalRotationLimit. A value of 0.0 will result in the entity no longer turning to where the player is facing.
 */
export type FractionalRotation = number;
/**
 * Limits the total degrees the entity can rotate to face where the player is facing on each tick.
 */
export type FractionalRotationLimit = number;
/**
 * Speed multiplier of mount when controlled by player.
 */
export type MountSpeedMultiplier = number;
/**
 * Conditions for the behavior to start and keep running. The interval between runs only starts after passing the filters.
 */
export type Filters16 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Sound to occasionally play while defending.
 */
export type AggroSound = string;
/**
 * Time in seconds between attacks.
 */
export type AttackInterval = number;
/**
 * If true, only entities in this mob's viewing range can be selected as targets.
 */
export type MustSee2 = boolean;
/**
 * Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more.
 */
export type MustSeeForgetDuration1 = number;
/**
 * Minecraft behavior event.
 */
export type Event9 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * Distance in blocks that the target can be within to launch an attack.
 */
export type WithinRadius = number;
/**
 * List of entity types that this mob considers valid targets.
 */
export type EntityTypes1 = EntityType1[] | EntityType1;
/**
 * Probability that a sound will play.
 */
export type SoundChance = number;
/**
 * List of entity types this mob considers a threat to the village.
 */
export type EntityTypes2 = EntityType1[] | EntityType1;
/**
 * The percentage chance that the entity has to attack aggressors of its village, where 1.0 = 100%.
 */
export type AttackChance = number;
/**
 * The entity's attack animation will play out over this duration (in seconds). Also controls attack cooldown.
 */
export type AttackDuration = number;
/**
 * Allows the entity to use this attack behavior, only once EVER.
 */
export type AttackOnce = boolean;
/**
 * Defines the entity types this entity will attack.
 */
export type AttackTypes = string;
/**
 * If the entity is on fire, this allows the entity's target to catch on fire after being hi
 */
export type CanSpreadOnFire = boolean;
/**
 * The percentage into the attack animation to apply the damage of the attack (1.0 = 100%).
 */
export type HitDelayPct = number;
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
 */
export type InnerBoundaryTimeIncrease = number;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type MaxDist1 = number;
/**
 * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MaxPathTime = number;
/**
 * Field of view (in degrees) when using the sensing component to detect an attack target.
 */
export type MeleeFov = number;
/**
 * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MinPathTime = number;
/**
 * Trigger to fire.
 */
export type Trigger4 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger5 = string | Trigger | Trigger1[];
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
 */
export type OuterBoundaryTimeIncrease = number;
/**
 * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
 */
export type PathFailTimeIncrease = number;
/**
 * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
 */
export type PathInnerBoundary = number;
/**
 * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
 */
export type PathOuterBoundary = number;
/**
 * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
 */
export type RandomStopInterval = number;
/**
 * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
 */
export type ReachMultiplier = number;
/**
 * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
 */
export type RequireCompletePath = boolean;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent = boolean;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type TargetDist = number;
/**
 * Allows the entity to track the attack target, even if the entity has no sensing.
 */
export type TrackTarget = boolean;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation = number;
/**
 * The sound event
 */
export type SoundEvent1 = string;
/**
 * If true, this behavior can run when this entity is named. Otherwise not.
 */
export type AllowDigWhenNamed = boolean;
/**
 * Indicates that the actor should start digging when it sees daylight.
 */
export type DigsInDaylight = boolean;
/**
 * Goal duration in seconds.
 */
export type Duration11 = number;
/**
 * The minimum idle time in seconds between the last detected disturbance to the start of digging.
 */
export type IdleTime = number;
/**
 * If true, finding new suspicious locations count as disturbances that may delay the start of this goal.
 */
export type SuspicionIsDisturbance = boolean;
/**
 * If true, vibrations count as disturbances that may delay the start of this goal.
 */
export type VibrationIsDisturbance = boolean;
/**
 * Trigger to fire.
 */
export type Trigger6 = string | Trigger | Trigger1[];
/**
 * The speed this entity moves when this behavior has started or while it's active.
 */
export type ActiveSpeed = number;
/**
 * If the dragon is outside the "target_zone" for longer than "continue_charge_threshold_time" seconds, the charge is canceled.
 */
export type ContinueChargeThresholdTime = number;
/**
 * The speed this entity moves while this behavior is not active.
 */
export type FlightSpeed = number;
/**
 * The speed at which this entity turns while using this behavior.
 */
export type TurnSpeed = number;
/**
 * Time (in seconds), after roar, to breath flame.
 */
export type CooldownTime2 = number;
/**
 * Time (in seconds), after roar, to breath flame.
 */
export type FlameTime = number;
/**
 * Number of ground flame-breath attacks to use before flight-takeoff.
 */
export type GroundFlameCount = number;
/**
 * Time (in seconds) to roar, before breathing flame.
 */
export type RoarTime = number;
/**
 * The speed this entity moves when this behavior has started or while it's active.
 */
export type ActiveSpeed1 = number;
/**
 * Maximum distance of this entity's fireball attack while strafing.
 */
export type FireballRange = number;
/**
 * The speed this entity moves while this behavior is not active.
 */
export type FlightSpeed1 = number;
/**
 * Percent chance to to switch this entity's strafe direction between clockwise and counterclockwise. Switch direction chance occurs each time a new target is chosen (1.0 = 100%).
 */
export type SwitchDirectionProbability = number;
/**
 * Time (in seconds) the target must be in fireball range, and in view [ie, no solid terrain in-between the target and this entity], before a fireball can be shot.
 */
export type TargetInRangeAndInViewTime = number;
/**
 * The speed at which this entity turns while using this behavior.
 */
export type TurnSpeed1 = number;
/**
 * The target must be within "view_angle" degrees of the dragon's current rotation before a fireball can be shot.
 */
export type ViewAngle = number;
/**
 * Time (in seconds) that the goal is on cooldown before it can be used again.
 */
export type CooldownSeconds = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters17 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Movement speed modifier of the mob when using this AI Goal.
 */
export type SpeedModifier = number;
/**
 * The registry ID of the potion to use.
 */
export type Id = number;
/**
 * The percent chance (from 0.0 to 1.0) of this potion being selected when searching for a potion to use.
 */
export type Chance2 = number;
/**
 * The filters to use when determining if this potion can be selected.
 */
export type Filters18 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * A list of potions that this entity can drink.
 */
export type Potions = Potions1[];
/**
 * The list of conditions another entity must meet to be a valid target to drop an item for.
 */
export type EntityTypes3 = EntityType1[] | EntityType1;
/**
 * Total time that the goal is on cooldown before it can be used again.
 */
export type Cooldown4 = number;
/**
 * The percent chance the entity will drop an item when using this goal.
 */
export type DropItemChance = number;
/**
 * Distance in blocks within the entity considers it has reached it's target position.
 */
export type GoalRadius1 = number;
/**
 * The loot table that contains the possible loot the entity can drop with this goal.
 */
export type LootTable = string;
/**
 * The maximum height the entities head will look at when dropping the item. The entity will always be looking at its target.
 */
export type MaxHeadLookAtHeight = number;
/**
 * If the target position is farther away than this distance on any tick, the entity will teleport to the target position.
 */
export type MinimumTeleportDistance = number;
/**
 * The preferred distance the entity tries to be from the target it is dropping an item for.
 */
export type OfferingDistance = number;
/**
 * Trigger to fire.
 */
export type Trigger7 = string | Trigger | Trigger1[];
/**
 * The number of blocks each tick that the entity will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
 */
export type SearchCount = number;
/**
 * The Height in blocks the entity will search within to find a valid target position.
 */
export type SearchHeight1 = number;
/**
 * The distance in blocks the entity will search within to find a valid target position.
 */
export type SearchRange1 = number;
/**
 * The numbers of seconds that will pass before the dropped entity can be picked up from the ground.
 */
export type SecondsBeforePickup = number;
/**
 * The range in blocks within which the entity searches to find a target to drop an item for.
 */
export type TargetRange = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * When the entity teleports, offset the teleport position by this many blocks in the X, Y, and Z coordinate.
 */
export type TeleportOffset = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Trigger to fire.
 */
export type Trigger8 = string | Trigger | Trigger1[];
/**
 * A molang expression defining the success chance the entity has to consume a block.
 */
export type SuccesChance = string | number;
/**
 * The amount of time (in seconds) it takes for the block to be eaten upon a successful eat attempt.
 */
export type TimeUntilEat = number;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier3 = string;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier4 = string;
/**
 * A collection of pairs of blocks; the first ("eat_block")is the block the entity should eat, the second ("replace_block") is the block that should replace the eaten block.
 */
export type EatAndReplaceBlockPairs = EatAndReplaceBlockPair[];
/**
 * Time in seconds the mob should wait before eating the item.
 */
export type DelayBeforeEating = number;
/**
 * Sets the time in seconds the eat animation should play for.
 */
export type EatAnimationTime = number;
/**
 * Sets the sound that should play when eating a mob.
 */
export type EatMobSound = string;
/**
 * The loot table for loot to be dropped when eating a mob.
 */
export type LootTable1 = string;
/**
 * Sets the force which the mob-to-be-eaten is pulled towards the eating mob.
 */
export type PullInForce = number;
/**
 * Sets the desired distance to be reached before eating the mob.
 */
export type ReachMobDistance = number;
/**
 * Sets the entity's speed when running toward the target.
 */
export type RunSpeed = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime3 = number;
/**
 * Goal duration in seconds.
 */
export type Duration12 = number;
/**
 * Trigger to fire.
 */
export type Trigger9 = string | Trigger | Trigger1[];
/**
 * The distance from the boundary the villager must be within in to explore the outskirts.
 */
export type DistFromBoundary = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Total distance in blocks the the entity will explore beyond the village bounds when choosing its travel point.
 */
export type ExploreDist = number;
/**
 * This is the maximum amount of time an entity will attempt to reach it's travel point on the outskirts of the village before the goal exits.
 */
export type MaxTravelTime = number;
/**
 * The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the minimum wait time. This value is also the total amount of time the entity will explore random points before the goal stops.
 */
export type MaxWaitTime = number;
/**
 * The entity must be within this distance for it to consider it has successfully reached its target.
 */
export type MinDistFromTarget = number;
/**
 * The minimum perimeter of the village required to run this goal.
 */
export type MinPerimeter = number;
/**
 * The wait time in seconds between choosing new explore points will be chosen on a random interval between this value and the maximum wait time.
 */
export type MinWaitTime = number;
/**
 * A new explore point will randomly be chosen within this XZ distance of the current target position when navigation has finished and the wait timer has elapsed.
 */
export type NextXZ = number;
/**
 * A new explore point will randomly be chosen within this Y distance of the current target position when navigation has finished and the wait timer has elapsed.
 */
export type NextY = number;
/**
 * Each new explore point will be chosen on a random interval between the minimum and the maximum wait time, divided by this value. This does not apply to the first explore point chosen when the goal runs.
 */
export type TimerRatio = number;
/**
 * Distance in blocks within the mob considers it has reached it's target position.
 */
export type GoalRadius2 = number;
/**
 * The maximum number of times the mob will use fertilzer on the target block.
 */
export type MaximumFertilizerUsage = number;
/**
 * The maximum amount of time in seconds that the goal can take before searching again. The time is chosen between 0 and this number.
 */
export type SearchCooldownMaximumSeconds = number;
/**
 * The number of randomly selected blocks each tick that the mob will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
 */
export type SearchCount1 = number;
/**
 * The Height in blocks the mob will search within to find a valid target position.
 */
export type SearchHeight2 = number;
/**
 * The distance in blocks the mob will search within to find a valid target position.
 */
export type SearchRange2 = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime4 = number;
/**
 * If true, the mob will not go into water blocks when going towards a mount.
 */
export type AvoidWater7 = boolean;
/**
 * This is the distance the mob needs to be, in blocks, from the desired mount to mount it. If the value is below 0, the mob will use its default attack distance
 */
export type MountDistance = number;
/**
 * Time the mob will wait before starting to move towards the mount.
 */
export type StartDelay = number;
/**
 * If true, the mob will only look for a mount if it has a target.
 */
export type TargetNeeded = boolean;
/**
 * Distance in blocks within which the mob will look for a mount.
 */
export type WithinRadius1 = number;
/**
 * The number of failed attempts to make before this goal is no longer used.
 */
export type MaximumFailedAttempts = number;
/**
 * The range that the mob will search for a treasure chest within a ruin or shipwreck to move towards.
 */
export type SearchRange3 = number;
/**
 * The distance the mob will move before stopping.
 */
export type StopDistance = number;
/**
 * The cooldown time in seconds before this goal can be used again.
 */
export type AttackCooldown1 = number;
/**
 * Entity anchor for the projectile spawn location.
 */
export type OwnerAnchor = number;
/**
 * Offset vector from the owner_anchor.
 */
export type OwnerOffset = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Entity anchor for projectile target.
 */
export type TargetAnchor = number;
/**
 * Offset vector from the target_anchor.
 */
export type TargetOffset = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Time in seconds between firing the projectile and ending the goal.
 */
export type PostShootDelay = number;
/**
 * Time in seconds before firing the projectile.
 */
export type PreShootDelay = number;
/**
 * Actor definition to use as projectile for the ranged attack. The actor must be a projectile.
 */
export type ProjectileDefinition = string;
/**
 * Field of view (in degrees) when using sensing to detect a target for attack.
 */
export type RangedFov = number;
/**
 * Maximum head rotation (in degrees), on the X-axis, that this entity can apply while trying to look at the target.
 */
export type MaxHeadRotationX = number;
/**
 * Maximum head rotation (in degrees), on the Y-axis, that this entity can apply while trying to look at the target.
 */
export type MaxHeadRotationY = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters19 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * If true, the mob will have an additional buffer zone around it to avoid collisions with blocks when picking a position to wander to.
 */
export type AdditionalCollisionBuffer = boolean;
/**
 * If true allows the mob to navigate through liquids on its way to the target position.
 */
export type AllowNavigatingThroughLiquids = boolean;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XzDist = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDist = number;
/**
 * Height in blocks to add to the selected target position.
 */
export type YOffset2 = number;
/**
 * If true, the point has to be reachable to be a valid target.
 */
export type MustReach = boolean;
/**
 * If true, the MoveControl flag will be added to the behavior which means that it can no longer be active at the same time as other behaviors with MoveControl.
 */
export type FloatWanderHasMoveControl = boolean;
/**
 * If true, will prioritize finding random positions in the vicinity of surfaces, i.e. blocks that are not Air or Liquid.
 */
export type NavigateAroundSurface = boolean;
/**
 * If true, the mob will randomly pick a new point while moving to the previously selected one.
 */
export type RandomReselect = boolean;
/**
 * The horizontal distance in blocks that the goal will check for a surface from a candidate position. Only valid when `navigate_around_surface` is true.
 */
export type SurfaceXZDist = number;
/**
 * The vertical distance in blocks that the goal will check for a surface from a candidate position. Only valid when `navigate_around_surface` is true.
 */
export type SurfaceYDist = number;
/**
 * If true, the mob will respect home position restrictions when choosing new target positions. If false, it will choose target position without considering home restrictions.
 */
export type UseHomePositionRestriction = boolean;
/**
 * If true, the mob will keep sinking as long as it has passengers.
 */
export type SinkWithPassengers = boolean;
/**
 * The chance per tick to cause an upward impulse.
 */
export type ChancePerTickToFloat = number;
/**
 * Time in seconds that a floating vehicles head can be underwater before it causes its passengers to dismount.
 */
export type TimeUnderWaterToDismountPassengers = number;
/**
 * If true, the mob can stop being tempted if the player moves too fast while close to this mob.
 */
export type CanGetScared = boolean;
/**
 * If true, the mob can be tempted even if it has a passenger (i.e. if being ridden).
 */
export type CanTemptWhileRidden = boolean;
/**
 * If true, vertical distance to the player will be considered when tempting.
 */
export type CanTemptVertically = boolean;
/**
 * List of items this mob is tempted by.
 */
export type Items2 = BB[];
/**
 * Range of random ticks to wait between tempt sounds.
 */
export type SoundInterval6 = number | [] | [Minimum5] | [Minimum5, Maximum14];
export type Minimum5 = number;
export type Maximum14 = number;
/**
 * The distance at which the mob will stop following the player.
 */
export type StopDistance1 = number;
/**
 * Sound to play while the mob is being tempted.
 */
export type TemptSound = string;
/**
 * Distance in blocks this mob can get tempted by a player holding an item they like.
 */
export type WithinRadius2 = number;
/**
 * Trigger to fire.
 */
export type Trigger10 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger11 = string | Trigger | Trigger1[];
/**
 * List of entity types that this mob can follow in a caravan.
 */
export type EntityTypes4 = EntityType1[] | EntityType1;
/**
 * Number of entities that can be in the caravan.
 */
export type EntityCount = number;
/**
 * If non-empty, provides criteria for filtering which nearby Mobs can be followed. If empty default criteria will be used, which will exclude Players, Squid variants, Fish variants, Tadpoles, Dolphins, and mobs of the same type as the owner of the Goal.
 */
export type Filters20 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The type of actor to prefer following. If left unspecified, a random actor among those in range will be chosen.
 */
export type PreferredActorType = string;
/**
 * The distance in blocks it will look for a mob to follow.
 */
export type SearchRange4 = number;
/**
 * The distance in blocks this mob stops from the mob it is following.
 */
export type StopDistance2 = number;
/**
 * If true, the mob will respect the 'minecraft:home' component's 'restriction_radius' field when choosing a target to follow. If false, it will choose target position without considering home restrictions.
 */
export type UseHomePositionRestriction1 = boolean;
/**
 * Defines how far (in blocks) the entity will be from its owner after teleporting. If not specified, it defaults to "stop_distance" + 1, allowing the entity to seamlessly resume navigation.
 */
export type PostTeleportDistance = number;
/**
 * Specify if the mob can teleport to the player if it is too far away.
 */
export type CanTeleport = boolean;
/**
 * Specify if the mob will follow the owner if it has heard a vibration lately.
 */
export type IgnoreVibration = boolean;
/**
 * The maximum distance in blocks this mob can be from its owner to start following, only used when canTeleport is false.
 */
export type MaxDistance3 = number;
/**
 * The distance in blocks that the owner can be away from this mob before it starts following it.
 */
export type StartDistance = number;
/**
 * The distance in blocks this mob will stop from its owner while following it.
 */
export type StopDistance3 = number;
/**
 * If true, the mob will always search for a valid leader to follow if none is found or current leader is not valid anymore
 */
export type AlwaysLookForLeader = boolean;
/**
 * Defines the distance in blocks the mob will stay from its target while following.
 */
export type FollowDistance = number;
/**
 * The filters to use when determining if a mob is a suitable leader or not.
 */
export type Filters21 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Number of ticks that must pass before a new search is initiated after a target is not found, lost, or becomes invalid.
 */
export type SearchCooldown = number;
/**
 * Defines the maximum distance in blocks a mob can get from its target captain before giving up trying to follow it.
 */
export type WithinRadius3 = number;
/**
 * Sets the time an entity should continue delivering items to a noteblock after hearing it.
 */
export type ListenTime = number;
/**
 * Trigger to fire.
 */
export type Trigger12 = string | Trigger | Trigger1[];
/**
 * Sets the desired distance to be reached before throwing the items towards the block.
 */
export type ReachBlockDistance = number;
/**
 * Sets the entity's speed when running toward the block.
 */
export type RunSpeed1 = number;
/**
 * Sets the throw force.
 */
export type ThrowForce = number;
/**
 * Sound to play when this mob throws an item.
 */
export type ThrowSound = string;
/**
 * Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
 */
export type VerticalThrowMul = number;
/**
 * Trigger to fire.
 */
export type Trigger13 = string | Trigger | Trigger1[];
/**
 * Sets the desired distance to be reached before giving items to owner.
 */
export type ReachMobDistance1 = number;
/**
 * Sets the entity's speed when running toward the owner.
 */
export type RunSpeed2 = number;
/**
 * Sets the throw force.
 */
export type ThrowForce1 = number;
/**
 * Sound to play when this mob throws an item.
 */
export type ThrowSound1 = string;
/**
 * Sets the vertical throw multiplier that is applied on top of the throw force in the vertical direction.
 */
export type VerticalThrowMul1 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius3 = number;
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval2 = number;
/**
 * Trigger to fire.
 */
export type Trigger14 = string | Trigger | Trigger1[];
/**
 * Event(s) to run when this goal fails.
 */
export type OnFailed = Event4[];
/**
 * Distance in blocks that the mob is considered close enough to the end of the current path. A new path will then be calculated to continue toward home.
 */
export type CalculateNewPathRadius = number;
/**
 * Amount of additional damage dealt from an elder guardian's magic attack.
 */
export type ElderExtraMagicDamage = number;
/**
 * In hard difficulty, amount of additional damage dealt from a guardian's magic attack.
 */
export type HardModeExtraMagicDamage = number;
/**
 * Amount of damage dealt from a guardian's magic attack. Magic attack damage is added to the guardian's base attack damage.
 */
export type MagicDamage = number;
/**
 * Guardian attack behavior stops if the target is closer than this distance (doesn't apply to elders).
 */
export type MinDistance2 = number;
/**
 * Time (in seconds) to wait after starting an attack before playing the guardian attack sound.
 */
export type SoundDelayTime = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation1 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation1 = number;
/**
 * Distance in blocks within the mob considers it has reached it's target position.
 */
export type GoalRadius4 = number;
/**
 * The maximum amount of time in seconds that the goal can take before searching for the first harvest block. The time is chosen between 0 and this number.
 */
export type MaximumSecondsBeforeSearch = number;
/**
 * The maximum amount of time in seconds that the goal can take before searching again, after failing to find a a harvest block already. The time is chosen between 0 and this number.
 */
export type SearchCooldownMaximumSeconds1 = number;
/**
 * The number of randomly selected blocks each tick that the entity will check within its search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick.
 */
export type SearchCount2 = number;
/**
 * The height in blocks the entity will search within to find a valid target position.
 */
export type SearchHeight3 = number;
/**
 * The distance in blocks the entity will search within to find a valid target position.
 */
export type SearchRange5 = number;
/**
 * The amount of time in seconds that the goal will cooldown after a successful reap/sow, before it can start again.
 */
export type SecondsUntilNewTask = number;
/**
 * Amount of time in seconds that the mob reacts.
 */
export type Duration13 = number;
/**
 * Defines what POI type to hide at.
 */
export type PointOfInterestType = "bed" | "meeting_area" | "jobsite";
/**
 * The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
 */
export type TimeoutCooldown = number;
/**
 * Whether to broadcast out the mob's target to other mobs of the same type.
 */
export type Broadcast1 = boolean;
/**
 * Range in blocks for how far to broadcast.
 */
export type BroadcastRange1 = number;
/**
 * Minimum distance the target must be for the mob to run this goal.
 */
export type MinimumRadius = number;
/**
 * Minecraft behavior event.
 */
export type Event10 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * List of entity types that this mob can target when hurt by them.
 */
export type EntityTypes5 = EntityType1[] | EntityType1;
/**
 * If true, the mob will hurt its owner and other mobs with the same owner as itself.
 */
export type HurtOwner1 = boolean;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius5 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount3 = number;
/**
 * The height that the mob will search for bookshelves.
 */
export type SearchHeight4 = number;
/**
 * Distance in blocks the mob will look for books to inspect.
 */
export type SearchRange6 = number;
/**
 * Distance in blocks within the entity considers it has reached its target position.
 */
export type GoalRadius6 = number;
/**
 * The higher the priority, the sooner this behavior will be executed as a goal.
 */
export type Priority3 = number;
/**
 * Movement speed multiplier.
 */
export type SpeedMultiplier2 = number;
/**
 * Enables collision checks when calculating the jump. Setting check_collision to true may affect performance and should be used with care.
 */
export type CheckCollision = boolean;
/**
 * Scaling temporarily applied to the entity's AABB bounds when jumping. A smaller bounding box reduces the risk of collisions during the jump. When check_collision is true it also increases the chance of being able to jump when close to obstacles.
 */
export type EntityBoundingBoxScale = number;
/**
 * The jump angles in float degrees that are allowed when performing the jump. The order in which the angles are chosen is randomized.
 */
export type JumpAngles = number[];
/**
 * The time in seconds to spend in cooldown before this goal can be used again.
 */
export type JumpCooldownDuration = number;
/**
 * The time in seconds to spend in cooldown after being hurt before this goal can be used again.
 */
export type JumpCooldownWhenHurtDuration = number;
/**
 * This angle (in degrees) is used for controlling the spread when picking a landing position behind the target. A zero spread angle means the landing position will be straight behind the target with no variance. A 90 degree spread angle means the landing position can be up to 45 degrees to the left and to the right of the position straight behind the target's view direction.
 */
export type LandingPositionSpreadDegrees = number;
/**
 * If the entity was hurt within these last seconds, the jump_cooldown_when_hurt_duration will be used instead of jump_cooldown_duration.
 */
export type LastHurtDuration = number;
/**
 * If the entity's line of sight towards its target is obstructed by an obstacle with a height below this number, the obstacle will be ignored, and the goal will try to find a valid landing position.
 */
export type LineOfSightObstructionHeightIgnore = number;
/**
 * Maximum velocity a jump can be performed at.
 */
export type MaxJumpVelocity = number;
/**
 * The time in seconds to spend preparing for the jump.
 */
export type PrepareJumpDuration = number;
/**
 * The number of blocks above the entity's head that has to be air for this goal to be usable.
 */
export type RequireVerticalSpace = number;
/**
 * The number of blocks above and below from the jump target position that will be checked to find a surface to land on.
 */
export type SnapToSurfaceBlockRange = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters22 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Blocks that the mob can't jump to.
 */
export type ForbiddenBlocks = BB[];
/**
 * The maximum velocity with which the mob can jump.
 */
export type MaxVelocity = number;
/**
 * The minimum distance (in blocks) from the mob to a block, in order to consider jumping to it.
 */
export type MinimumDistance1 = number;
/**
 * The minimum length (in blocks) of the mobs path to a block, in order to consider jumping to it.
 */
export type MinimumPathLength = number;
/**
 * Blocks that the mob prefers jumping to.
 */
export type PreferredBlocks = BB[];
/**
 * Chance (between 0.0 and 1.0) that the mob will jump to a preferred block, if in range. Only matters if preferred blocks are defined.
 */
export type PreferredBlocksChance = number;
/**
 * The scalefactor of the bounding box of the mob while it is jumping.
 */
export type ScaleFactor = number;
/**
 * The height (in blocks, in range [1, 15]) of the search box, centered around the mob.
 */
export type SearchHeight5 = number;
/**
 * The width (in blocks, in range [1, 15]) of the search box, centered around the mob.
 */
export type SearchWidth = number;
/**
 * The delay after which the knockback occurs (in seconds).
 */
export type AttackTime = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime5 = number;
/**
 * The list of conditions another entity must meet to be a valid target to apply damage to.
 */
export type Filters23 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The duration of the roar (in seconds).
 */
export type Duration14 = number;
/**
 * The damage dealt by the knockback roar.
 */
export type KnockbackDamage = number;
/**
 * The strength of the knockback.
 */
export type KnockbackStrength1 = number;
/**
 * The list of conditions another entity must meet to be a valid target to apply knockback to.
 */
export type Filters24 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The strength of the horizontal knockback.
 */
export type KnockbackHorizontalStrength = number;
/**
 * The radius (in blocks) of the knockback effect.
 */
export type KnockbackRange = number;
/**
 * The strength of the vertical knockback.
 */
export type KnockbackVerticalStrength = number;
/**
 * The maximum height for vertical knockback.
 */
export type KnockbackHeightCap = number;
/**
 * If true, this mob will chase after the target as long as it's a valid target.
 */
export type TrackTarget1 = boolean;
/**
 * Minecraft behavior event.
 */
export type Event11 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * A random value to determine at what intervals something can occur. This has a 1/interval chance to choose this goal
 */
export type Interval3 = number;
/**
 * A random value in which the goal can use to pull out of the behavior. This is a 1/interval chance to play the sound
 */
export type RandomStopInterval1 = number;
/**
 * Allows the mob to lay its eggs from below the target if it can't get there. This is useful if the target block is water with air above, since mobs may not be able to get to the air block above water.
 */
export type AllowLayingFromBelow = boolean;
/**
 * Block type for the egg to lay. If this is a turtle egg, the number of eggs in the block is randomly set.
 */
export type EggType =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius7 = number;
/**
 * Sound event name for laying egg. Defaulted to lay_egg which is used for Turtles.
 */
export type LayEggSound = string;
/**
 * Duration of the laying egg process in seconds.
 */
export type LaySeconds = number;
/**
 * Trigger to fire.
 */
export type Trigger15 = string | Trigger | Trigger1[];
/**
 * Height in blocks the mob will look for a target block to move towards.
 */
export type SearchHeight6 = number;
/**
 * The distance in blocks it will look for a target block to move towards.
 */
export type SearchRange7 = number;
export type BlockID2 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * Blocks that the mob can lay its eggs on top of.
 */
export type TargetBlocks1 = BlockID2[];
/**
 * Types of materials that can exist above the target block. Valid types are Air, Water, and Lava.
 */
export type TargetMaterialsAboveBlock = ("Air" | "Any" | "Lava" | "Water")[];
/**
 * Specifies if the default lay-egg animation should be played when the egg is placed or not.
 */
export type UseDefaultAnimation = boolean;
/**
 * If true, the mob will only jump at its target if its on the ground. Setting it to false will allow it to jump even if its already in the air
 */
export type MustBeOnGround = boolean;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent1 = boolean;
/**
 * The height in blocks the mob jumps when leaping at its target.
 */
export type Yd = number;
/**
 * The distance in blocks from which the entity will look at.
 */
export type LookDistance1 = number;
/**
 * The probability of looking at the target. A value of 1.00 is 100%.
 */
export type Probability2 = number;
/**
 * The angle in degrees that the mob can see in the X-axis (left-right).
 */
export type AngleOfViewVertical = number;
/**
 * The angle in degrees that the mob can see in the Y-axis (up-down).
 */
export type AngleOfViewHorizontal = number;
/**
 * Filter to determine the conditions for this mob to look at the entity.
 */
export type Filters25 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The angle in degrees that the mob can see in the X-axis (left-right).
 */
export type AngleOfViewVertical1 = number;
/**
 * The angle in degrees that the mob can see in the Y-axis (up-down).
 */
export type AngleOfViewHorizontal1 = number;
/**
 * The distance in blocks from which the entity will look at.
 */
export type LookDistance2 = number;
/**
 * The probability of looking at the target. A value of 1.00 is 100%.
 */
export type Probability3 = number;
/**
 * The distance in blocks from which the entity will choose a target.
 */
export type TargetDistance1 = number;
/**
 * The distance in blocks from which the entity will look at this mob's current target.
 */
export type LookDistance3 = number;
/**
 * The probability of looking at the target. A value of 1.00 is 100%.
 */
export type Probability4 = number;
/**
 * The angle in degrees that the mob can see in the X-axis (left-right).
 */
export type AngleOfViewVertical2 = number;
/**
 * The angle in degrees that the mob can see in the Y-axis (up-down).
 */
export type AngleOfViewHorizontal2 = number;
/**
 * The distance in blocks from which the entity will look at the player this mob is trading with.
 */
export type LookDistance4 = number;
/**
 * The probability of looking at the target. A value of 1.00 is 100%.
 */
export type Probability5 = number;
/**
 * The angle in degrees that the mob can see in the X-axis (left-right).
 */
export type AngleOfViewVertical3 = number;
/**
 * The angle in degrees that the mob can see in the Y-axis (up-down).
 */
export type AngleOfViewHorizontal3 = number;
/**
 * Allows the entity to use this attack behavior, only once EVER.
 */
export type AttackOnce1 = boolean;
/**
 * Defines the entity types this entity will attack.
 */
export type AttackTypes1 = string;
/**
 * If the entity is on fire, this allows the entity's target to catch on fire after being hi
 */
export type CanSpreadOnFire1 = boolean;
/**
 * Cooldown time (in seconds) between attacks.
 */
export type CooldownTime6 = number;
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
 */
export type InnerBoundaryTimeIncrease1 = number;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type MaxDist2 = number;
/**
 * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MaxPathTime1 = number;
/**
 * Field of view (in degrees) when using the sensing component to detect an attack target.
 */
export type MeleeFov1 = number;
/**
 * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MinPathTime1 = number;
/**
 * Trigger to fire.
 */
export type Trigger16 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger17 = string | Trigger | Trigger1[];
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
 */
export type OuterBoundaryTimeIncrease1 = number;
/**
 * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
 */
export type PathFailTimeIncrease1 = number;
/**
 * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
 */
export type PathInnerBoundary1 = number;
/**
 * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
 */
export type PathOuterBoundary1 = number;
/**
 * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
 */
export type RandomStopInterval2 = number;
/**
 * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
 */
export type ReachMultiplier1 = number;
/**
 * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
 */
export type RequireCompletePath1 = boolean;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent2 = boolean;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type TargetDist1 = number;
/**
 * Allows the entity to track the attack target, even if the entity has no sensing.
 */
export type TrackTarget2 = boolean;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation2 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation2 = number;
/**
 * Allows the entity to use this attack behavior, only once EVER.
 */
export type AttackOnce2 = boolean;
/**
 * Defines the entity types this entity will attack.
 */
export type AttackTypes2 = string;
/**
 * If the entity is on fire, this allows the entity's target to catch on fire after being hi
 */
export type CanSpreadOnFire2 = boolean;
/**
 * Cooldown time (in seconds) between attacks.
 */
export type CooldownTime7 = number;
/**
 * The attack reach of the entity will be a box with the size of the entity's bounds increased by this value in all horizontal directions.
 */
export type HorizontalReach = number;
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
 */
export type InnerBoundaryTimeIncrease2 = number;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type MaxDist3 = number;
/**
 * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MaxPathTime2 = number;
/**
 * Field of view (in degrees) when using the sensing component to detect an attack target.
 */
export type MeleeFov2 = number;
/**
 * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MinPathTime2 = number;
/**
 * Trigger to fire.
 */
export type Trigger18 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger19 = string | Trigger | Trigger1[];
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
 */
export type OuterBoundaryTimeIncrease2 = number;
/**
 * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
 */
export type PathFailTimeIncrease2 = number;
/**
 * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
 */
export type PathInnerBoundary2 = number;
/**
 * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
 */
export type PathOuterBoundary2 = number;
/**
 * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
 */
export type RandomStopInterval3 = number;
/**
 * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
 */
export type ReachMultiplier2 = number;
/**
 * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
 */
export type RequireCompletePath2 = boolean;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent3 = boolean;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type TargetDist2 = number;
/**
 * Allows the entity to track the attack target, even if the entity has no sensing.
 */
export type TrackTarget3 = boolean;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation3 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation3 = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime8 = number;
/**
 * Amount of time in seconds that the entity will chat with another entity.
 */
export type Duration15 = number;
/**
 * The distance from its partner that this entity will mingle. If the entity type is not the same as the entity, this value needs to be identical on both entities.
 */
export type MingleDistance = number;
/**
 * The entity type that this entity is allowed to mingle with.
 */
export type MinglePartnerType = string[] | string;
/**
 * The distance at which this mob wants to be away from its target.
 */
export type TargetDist3 = number;
/**
 * If true, this mob will chase after the target as long as it's a valid target.
 */
export type TrackTarget4 = boolean;
/**
 * The cooldown time in seconds before the goal can be reused after pathfinding fails.
 */
export type TimeoutCooldown1 = number;
/**
 * The radius away from the target block to count as reaching the goal.
 */
export type GoalRadius8 = number;
/**
 * The amount of times to try finding a random outdoors position before failing.
 */
export type SearchCount4 = number;
/**
 * The y range to search for an outdoors position for.
 */
export type SearchHeight7 = number;
/**
 * The x and z range to search for an outdoors position for.
 */
export type SearchRange8 = number;
/**
 * The cooldown time in seconds before the goal can be reused after pathfinding fails.
 */
export type TimeoutCooldown2 = number;
/**
 * If true, the mob will only move through the village during night time.
 */
export type OnlyAtNight = boolean;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius9 = number;
/**
 * Trigger to fire.
 */
export type Trigger20 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger21 = string | Trigger | Trigger1[];
/**
 * Chance to start the behavior (applied after each random tick_interval).
 */
export type StartChance = number;
/**
 * The distance in blocks that the mob will look for the block.
 */
export type SearchRange9 = number;
/**
 * The height in blocks that the mob will look for the block.
 */
export type SearchHeight8 = number;
/**
 * Number of ticks needed to complete a stay at the block.
 */
export type StayDuration = number;
/**
 * Kind of block to find fitting the specification. Valid values are "random" and "nearest".
 */
export type TargetSelectionMethod1 = "random" | "nearest";
/**
 * Offset to add to the selected target position.
 */
export type TargetOffset1 = [] | [X7] | [X7, Y7] | [X7, Y7, Z4];
export type X7 = number;
export type Y7 = number;
export type Z4 = number;
/**
 * Block types to move to.
 */
export type TargetBlocks2 = BB[];
/**
 * Conditions that need to be met for a block to be a valid target.
 */
export type Filters26 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Average interval in ticks to try to run this behavior.
 */
export type TickInterval1 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius10 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount5 = number;
/**
 * Height in blocks the mob will look for land to move towards.
 */
export type SearchHeight9 = number;
/**
 * The distance in blocks it will look for land to move towards.
 */
export type SearchRange10 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius11 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount6 = number;
/**
 * Height in blocks the mob will look for lava to move towards.
 */
export type SearchHeight10 = number;
/**
 * The distance in blocks it will look for lava to move towards.
 */
export type SearchRange11 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius12 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount7 = number;
/**
 * Height in blocks the mob will look for lava to move towards.
 */
export type SearchHeight11 = number;
/**
 * The distance in blocks it will look for lava to move towards.
 */
export type SearchRange12 = number;
/**
 * The material type of the liquid block to find. Valid values are 'Any', 'Water', and 'Lava'.
 */
export type MaterialType = "Air" | "Any" | "Lava" | "Water";
/**
 * Tells the goal what POI type it should be looking for.
 */
export type PointOfInterestType1 = "bed" | "jobsite" | "meeting_area";
/**
 * Defines the distance from the mob, in blocks, that the block to move to will be chosen.
 */
export type BlockDistance1 = number;
/**
 * Defines the distance in blocks the mob has to be from the block for the movement to be finished.
 */
export type WithinRadius4 = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime9 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius13 = number;
/**
 * The distance in blocks to search for villages. If <= 0, find the closest village regardless of distance.
 */
export type SearchRange13 = number;
/**
 * The distance in blocks it will look for water to move towards.
 */
export type SearchRange14 = number;
/**
 * Height in blocks the mob will look for water to move towards.
 */
export type SearchHeight12 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount8 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius14 = number;
/**
 * Defines the radius in blocks that the mob tries to be from the target. A value of 0 means it tries to occupy the same block as the target
 */
export type WithinRadius5 = number;
/**
 * Maximum time in seconds the mob has to wait before using the goal again.
 */
export type CooldownMax = number;
/**
 * Minimum time in seconds the mob has to wait before using the goal again.
 */
export type CooldownMin = number;
/**
 * The block distance in x and z that will be checked for mobs that this mob detects.
 */
export type MobDetectDist = number;
/**
 * The block distance in y that will be checked for mobs that this mob detects.
 */
export type MobDetectHeight = number;
/**
 * Conditions that need to be met for the entity to nap
 */
export type Filters27 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Filters for mobs that will not wake this entity from napping
 */
export type Filters28 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Filters which types of targets are valid for this entity
 */
export type EntityTypes6 = EntityType1[] | EntityType1;
/**
 * Time range (in seconds) between searching for an attack target, range is in (0, `attack_interval`]. Only used if `attack_interval` is greater than 0, otherwise `scan_interval` is used.
 */
export type AttackInterval1 = DDC | number;
/**
 * Alias for `attack_interval`; provides the same functionality as `attack_interval`.
 */
export type AttackIntervalMin = number;
/**
 * If true, this entity can attack its owner.
 */
export type AttackOwner = boolean;
/**
 * If true, this entity requires a path to the target.
 */
export type MustReach1 = boolean;
/**
 * Determines if target-validity requires this entity to be in range only, or both in range and in sight.
 */
export type MustSee3 = boolean;
/**
 * Time (in seconds) the target must not be seen by this entity to become invalid. Used only if `must_see` is true.
 */
export type MustSeeForgetDuration2 = number;
/**
 * Time (in seconds) this entity can continue attacking the target after the target is no longer valid.
 */
export type PersistTime = number;
/**
 * Allows the attacking entity to update the nearest target, otherwise a target is only reselected after each `scan_interval` or `attack_interval`.
 */
export type ReselectTargets = boolean;
/**
 * If `attack_interval` is 0 or isn't declared, then between attacks: scanning for a new target occurs every amount of ticks equal to `scan_interval`, minimum value is 1. Values under 10 can affect performance.
 */
export type ScanInterval = number;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent4 = boolean;
/**
 * Probability (0.0 to 1.0) that this entity will accept a found target. Checked each time a valid target is found during scanning.
 */
export type TargetAcquisitionProbability = number;
/**
 * Multiplied with the target's armor coverage percentage to modify `max_dist` when detecting an invisible target.
 */
export type TargetInvisibleMultiplier = number;
/**
 * Maximum vertical target-search distance, if it's greater than the target type's `max_dist`. A negative value defaults to `entity_types` greatest `max_dist`.
 */
export type TargetSearchHeight = number;
/**
 * Multiplied with the target type's `max_dist` when trying to detect a sneaking target.
 */
export type TargetSneakVisibilityMultiplier = number;
/**
 * Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare `minecraft:follow_range`.
 */
export type WithinRadius6 = number;
/**
 * List of entity types that this mob considers valid targets
 */
export type EntityTypes7 = EntityType1[] | EntityType1;
/**
 * Time in seconds before selecting a target.
 */
export type AttackInterval2 = number;
/**
 * The amount of time in seconds that the mob has to wait before selecting a target of the same type again
 */
export type Cooldown5 = number;
/**
 * If true, only entities that this mob can path to can be selected as targets.
 */
export type MustReach2 = boolean;
/**
 * If true, only entities in this mob's viewing range can be selected as targets.
 */
export type MustSee4 = boolean;
/**
 * Determines the amount of time in seconds that this mob will look for a target before forgetting about it and looking for a new one when the target isn't visible any more.
 */
export type MustSeeForgetDuration3 = number;
/**
 * Time in seconds for a valid target to stay targeted when it becomes and invalid target.
 */
export type PersistTime1 = number;
/**
 * If true, the target will change to the current closest entity whenever a different entity is closer.
 */
export type ReselectTargets1 = boolean;
/**
 * How many ticks to wait between scanning for a target.
 */
export type ScanInterval1 = number;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent5 = boolean;
/**
 * Height in blocks to search for a target mob. -1.0f means the height does not matter.
 */
export type TargetSearchHeight1 = number;
/**
 * Distance in blocks that the target can be within to launch an attack.
 */
export type WithinRadius7 = number;
/**
 * Time (in seconds) between attacks.
 */
export type CooldownTime10 = number;
/**
 * Max distance from the target, this entity will use this attack behavior.
 */
export type MaxDistance4 = number;
/**
 * Max distance from the target, this entity starts sneaking.
 */
export type MaxSneakRange = number;
/**
 * Max distance from the target, this entity starts sprinting (sprinting takes priority over sneaking).
 */
export type MaxSprintRange = number;
/**
 * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
 */
export type ReachMultiplier3 = number;
/**
 * Modifies the attacking entity's movement speed while sneaking.
 */
export type SneakSpeedMultiplier = number;
/**
 * Modifies the attacking entity's movement speed while sprinting.
 */
export type SprintSpeedMultiplier2 = number;
/**
 * Modifies the attacking entity's movement speed when not sneaking or sprinting, but still within attack range.
 */
export type WalkSpeedMultiplier2 = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation4 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation4 = number;
/**
 * Percent chance that the mob will start this goal from 0.0 to 1.0 (where 1.0 = 100%).
 */
export type ChanceToStart = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters29 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type MaxHeadRotationY1 = number;
/**
 * The max amount of time (in seconds) that the mob will offer the flower for before exiting the Goal.
 */
export type MaxOfferFlowerDuration = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type MaxRotationX = number;
/**
 * The dimensions of the AABB used to search for a potential mob to offer flower to.
 */
export type SearchArea = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * If true, the mob will close the door after opening it and going through it.
 */
export type CloseDoorAfter = boolean;
/**
 * List of entity types that this mob can target if they hurt their owner.
 */
export type EntityTypes8 = EntityType1[] | EntityType1;
/**
 * List of entity types that this entity can target if the potential target is hurt by this mob's owner.
 */
export type EntityTYpes = EntityType1[] | EntityType1;
/**
 * The types of damage an entity can receive.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCG".
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
 * The list of Entity Damage Sources that will cause this mob to panic.
 */
export type DamageSources = EntityDamageSource[];
/**
 * If true, this mob will not stop panicking until it can't move anymore or the goal is removed from it.
 */
export type Force = boolean;
/**
 * If true, the mob will not panic in response to damage from other mobs. This overrides the damage types in `damage_sources`
 */
export type IgnoreMobDamage = boolean;
/**
 * If true, the mob will prefer water over land.
 */
export type PreferWater = boolean;
/**
 * The sound event to play when this mob is in panic.
 */
export type PanicSound = string;
/**
 * The minimum time in seconds before the `panic_sound` plays.
 */
export type RangeMinimum2 = number;
/**
 * The maximum time in seconds before the `panic_sound` plays.
 */
export type RangeMaximum2 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius15 = number;
/**
 * Height in blocks from the owner the pet can be to sleep with owner.
 */
export type SearchHeight13 = number;
/**
 * The radius that the mob will search for an owner to curl up with.
 */
export type SearchRadius1 = number;
/**
 * The range that the mob will search for an owner to curl up with.
 */
export type SearchRange15 = number;
/**
 * If true, the mob can pickup any item.
 */
export type CanPickupAnyItem = boolean;
/**
 * If true, the mob can pickup items to its hand or armor slots.
 */
export type CanPickupToHandOrEquipment = boolean;
/**
 * Amount of time an offended entity needs before being willing to pick up items.
 */
export type CooldownAfterBeingAttacked3 = number;
export type ExcludedItem =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * List of items this mob will not pick up.
 */
export type ExcludedItems2 = ExcludedItem[];
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot.
 */
export type GoalRadius16 = number;
/**
 * Maximum distance this mob will look for items to pick up.
 */
export type MaximumDist1 = number;
/**
 * Height in blocks the mob will search for items
 */
export type SearchHeight14 = number;
/**
 * If true, the mob will not pick up another item if the item's preferred slot matches
 */
export type StopIfHoldingItem = boolean;
/**
 * If true, depending on the difficulty, there is a random chance that the mob may not be able to pickup items.
 */
export type PickupBasedOnChance = boolean;
/**
 * If true, the mob will only pick up items that match what's in their hand
 */
export type PickupSameItemsAsInHand = boolean;
/**
 * If true, this mob will chase after the target as long as it's a valid target.
 */
export type TrackTarget5 = boolean;
/**
 * Trigger to fire.
 */
export type Trigger22 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger23 = string | Trigger | Trigger1[];
/**
 * If true, whether the goal is affected by the mob griefing game rule.
 */
export type AffectedByGriefingRule = boolean;
/**
 * Filters for if the entity should try to place its block. Self and Target are set.
 */
export type Filters30 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Chance each tick for the entity to try and place a block.
 */
export type Chance3 = number;
/**
 * Minecraft behavior event.
 */
export type Event12 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * Block descriptors for which blocks are valid to be placed from the entity's carried item, if empty all blocks are valid.
 */
export type PlaceableCarriedBlocks = BlockReference[];
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight2 = number;
/**
 * Weighted block descriptors for which blocks should be randomly placed, if empty the entity will try to place its carried block from placeable_carried_blocks.
 */
export type RandomlyPlaceableBlocks = {
  block?: BlockReference;
  weight?: Weight2;
}[];
/**
 * Whether the mob will receive the regeneration effect while playing dead.
 */
export type ApplyRegeneration = boolean;
/**
 * The amount of time the mob will remain playing dead (in seconds).
 */
export type Duration16 = number;
/**
 * The list of other triggers that are required for the mob to activate play dead.
 */
export type Filters31 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The amount of health at which damage will cause the mob to play dead.
 */
export type ForceBelowHealth = number;
/**
 * The likelihood of this goal starting upon taking damage.
 */
export type RandomStartChance = number;
/**
 * The list of Entity Damage Sources that will cause this mob to play dead.
 */
export type DamageSources1 = EntityDamageSource1 | EntityDamageSource2[];
/**
 * The types of damage an entity can receive.
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
 * The types of damage an entity can receive.
 */
export type EntityDamageSource2 =
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
 * Percent chance that the mob will start this goal, from 0 to 1.
 */
export type ChanceToStart1 = number;
/**
 * The distance (in blocks) that the mob tries to be in range of the friend it's following.
 */
export type FollowDistance1 = number;
/**
 * The dimensions of the AABB used to search for a potential friend to play with.
 */
export type FriendSearchArea = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * The entity type(s) to consider when searching for a potential friend to play with.
 */
export type FriendTypes = {
  [k: string]: unknown;
}[];
/**
 * The max amount of seconds that the mob will play for before exiting the Goal.
 */
export type MaxPlayDurationSeconds = number;
/**
 * The height (in blocks) that the mob will search within to find a random position position to move to. Must be at least 1.
 */
export type RandomPosSearchHeight = number;
/**
 * The distance (in blocks) on ground that the mob will search within to find a random position to move to. Must be at least 1.
 */
export type RandomPosSearchRange = number;
/**
 * A minecraft block reference.
 */
export type BlockReference12 = (BlockIdentifier | BlockReference1) & string;
/**
 * Blocks that the mob is looking for to eat.
 */
export type Blocks1 = BlockReference12[];
/**
 * Time in seconds between each time it eats.
 */
export type EatDelay = number;
/**
 * Amount of time in seconds before this mob wants to eat again.
 */
export type FullDelay = number;
/**
 * Time in seconds before starting to eat/raid once it arrives at it.
 */
export type InitialEatDelay = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius17 = number;
/**
 * Maximum number of things this entity wants to eat.
 */
export type MaximumToEat = number;
/**
 * Distance in blocks the mob will look for crops to eat.
 */
export type SearchRange16 = number;
/**
 * Height in blocks the mob will look for crops to eat.
 */
export type SearchHeight15 = number;
/**
 * The modifier to knockback that babies have.
 */
export type BabyKnockbackModifier = number;
/**
 * The force of the knockback of the ram attack.
 */
export type KnockbackForce1 = number;
/**
 * The height of the knockback of the ram attack.
 */
export type KnockbackHeight = number;
/**
 * The minimum distance at which the mob can start a ram attack.
 */
export type MinRamDistance = number;
/**
 * Trigger to fire.
 */
export type Trigger24 = string | Trigger | Trigger1[];
/**
 * The sound to play when an entity is about to perform a ram attack.
 */
export type PreRamSound = string;
/**
 * The distance at which the mob start to run with ram speed.
 */
export type RamDistance = number;
/**
 * The sound to play when an entity is impacting on a ram attack.
 */
export type RamImpactSound = string;
/**
 * Sets the entity's speed when charging toward the target.
 */
export type RamSpeed = number;
/**
 * Sets the entity's speed when running toward the target.
 */
export type RunSpeed3 = number;
/**
 * Trigger to fire.
 */
export type Trigger25 = string | Trigger | Trigger1[];
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime11 = number;
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval4 = number;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XZDistance = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDistance = number;
/**
 * If true, the mob will avoid blocks that cause damage.
 */
export type AvoidDamageBlocks7 = boolean;
/**
 * If true, the mob can stop flying and land on a tree instead of the ground.
 */
export type CanLandOnTrees = boolean;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XzDist1 = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDist1 = number;
/**
 * Height in blocks to add to the selected target position.
 */
export type YOffset3 = number;
/**
 * The height above the surface which the mob will try to maintain.
 */
export type HoverHeight = unknown[];
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval5 = number;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XzDist2 = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDist2 = number;
/**
 * Height in blocks to add to the selected target position.
 */
export type YOffset4 = number;
/**
 * If the goal should continue to be used as long as the mob is leashed.
 */
export type ContinueIfLeashed = boolean;
/**
 * The mob will stay sitting on reload.
 */
export type ContinueSittingOnReload = boolean;
/**
 * The rightmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
 */
export type MaxAngleOfViewHorizontal = number;
/**
 * The max amount of unique looks a mob will have while looking around.
 */
export type MaxLookCount = number;
/**
 * The max amount of time (in ticks) a mob will stay looking at a direction while looking around.
 */
export type MaxLookTime = number;
/**
 * The leftmost angle a mob can look at on the horizontal plane with respect to its initial facing direction.
 */
export type MinAngleOfViewHorizontal = number;
/**
 * The min amount of unique looks a mob will have while looking around.
 */
export type MinLookCount = number;
/**
 * The min amount of time (in ticks) a mob will stay looking at a direction while looking around.
 */
export type MinLookTime = number;
/**
 * The probability of randomly looking around/sitting.
 */
export type Probability6 = number;
/**
 * The cooldown in seconds before the goal can be used again.
 */
export type RandomLookAroundCooldown = number;
/**
 * The angle in degrees that an entity can see in the Y-axis (up-down).
 */
export type AngleOfViewHorizontal4 = number;
/**
 * The angle in degrees that an entity can see in the X-axis (left-right).
 */
export type AngleOfViewVertical4 = number;
/**
 * The probability of looking at the target.
 */
export type Probability7 = number;
/**
 * Goal cooldown range in seconds.
 */
export type CooldownRange2 = DDC | number;
/**
 * Amount of retries to find a valid target position within search range.
 */
export type FindValidPositionRetries = number;
/**
 * Distance in blocks within the entity to considers it has reached it's target position.
 */
export type GoalRadius18 = number;
/**
 * File path relative to the behavior pack root for items to spawn list (loot table format).
 */
export type ItemTable = string;
/**
 * Trigger to fire.
 */
export type Trigger26 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger27 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger28 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger29 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger30 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger31 = string | Trigger | Trigger1[];
/**
 * Width and length of the volume around the entity used to find a valid target position
 */
export type SearchRangeXZ = number;
/**
 * Height of the volume around the entity used to find a valid target position
 */
export type SearchRangeY = number;
/**
 * Digging duration before spawning item in seconds.
 */
export type SpawnItemAfterSeconds = number;
/**
 * Distance to offset the item's spawn location in the direction the mob is facing.
 */
export type SpawnItemPosOffset = number;
/**
 * List of target block types the goal will look to dig on. Overrides the default list.
 */
export type TargetBlocks3 = BlockReference[];
/**
 * Dig target position offset from the feet position of the mob in their facing direction.
 */
export type TargetDigPositionOffset = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type Cooldown6 = number;
/**
 * The minimum amount of time in seconds before the mob can stand back up.
 */
export type MinimumSitTime = number;
/**
 * This is the chance that the mob will start this goal, from 0 to 1.
 */
export type StartChance1 = number;
/**
 * This is the chance that the mob will stop this goal, from 0 to 1.
 */
export type StopChance = number;
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval6 = number;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XZDistance1 = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDistance1 = number;
/**
 * If true, the mob will avoid surface water blocks by swimming below them.
 */
export type AvoidSurface = boolean;
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval7 = number;
/**
 * Distance in blocks on ground that the mob will look for a new spot to move to. Must be at least 1
 */
export type XZDistance2 = number;
/**
 * Distance in blocks that the mob will look up or down for a new spot to move to. Must be at least 1
 */
export type YDistance2 = number;
/**
 * Minimum distance to target before this entity will attempt to shoot.
 */
export type AttackRadius = number;
/**
 * Minimum distance the target can be for this mob to fire. If the target is closer, this mob will move first before firing
 */
export type AttackRadiusMin = number;
/**
 * Time (in seconds) between each individual shot when firing a burst of shots from a charged up attack.
 */
export type BurstInterval = number;
/**
 * Number of shots fired every time the attacking entity uses a charged up attack.
 */
export type BurstShots = number;
/**
 * Time (in seconds, then add "charge_shoot_trigger"), before a charged up attack is done charging. Charge-time decays while target is not in sight.
 */
export type ChargeChargedTrigger = number;
/**
 * Amount of time (in seconds, then doubled) a charged shot must be charging before reloading burst shots. Charge-time decays while target is not in sight.
 */
export type ChargeShootTrigger = number;
/**
 * Field of view (in degrees) when using sensing to detect a target for attack.
 */
export type RangedFov1 = number;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent6 = boolean;
/**
 * If a swing animation (using variable.attack_time) exists, this causes the actor to swing their arm(s) upon firing the ranged attack.
 */
export type Swing1 = boolean;
/**
 * Minimum amount of time (in seconds) the attacking entity needs to see the target before moving toward it.
 */
export type TargetInSightTime = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation5 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation5 = number;
/**
 * Vertical offset from the liquid.
 */
export type LiquidYOffset = number;
/**
 * Displacement for how much the entity will move up in the vertical axis.
 */
export type RiseDelta = number;
/**
 * Displacement for how much the entity will move down in the vertical axis.
 */
export type SinkDelta = number;
/**
 * Goal duration in seconds.
 */
export type Duration17 = number;
/**
 * The probability that the mob will use the goal.
 */
export type Probability8 = number;
/**
 * The interval in which a sound will play when active in a 1/delay chance to kick off.
 */
export type SoundInterval8 = number;
/**
 * Time in seconds for the entire event sending process.
 */
export type CastDuration = number;
/**
 * If true, the mob will face the entity it sends an event to.
 */
export type LookAtTarget1 = boolean;
/**
 * The minimum distance in blocks the target must be for this spell to be cast.
 */
export type MinimumActivationRange = number;
/**
 * The maxmimum distance in blocks the target must be for this spell to be cast.
 */
export type MaxmimumActivationRange = number;
/**
 * Time in seconds before the mob can use this spell again.
 */
export type CooldownTime12 = number;
/**
 * Time in seconds the spell casting will take.
 */
export type CastDuration1 = number;
/**
 * The color of the particles for this spell.
 */
export type ParticleColor = string;
/**
 * The weight of this spell. Controls how likely this spell will be picked
 */
export type Weight3 = number;
/**
 * The sound event to play when using this spell.
 */
export type StartSoundEvent = string;
/**
 * The sound event to play when this step happens.
 */
export type SoundEvent2 = string;
/**
 * List of events to send.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGB_sequence".
 */
export type EGBSequence = {
  /**
   * Amount of time in seconds before starting this step.
   */
  base_delay?: number;
  /**
   * The event to send to the entity.
   */
  event?: string;
  sound_event?: SoundEvent2;
}[];
/**
 * List of spells for the mob to use.
 */
export type EventChoices = EventChoice[];
/**
 * List of events to send.
 */
export type Sequence = {
  /**
   * Amount of time in seconds before starting this step.
   */
  base_delay?: number;
  /**
   * The event to send to the entity.
   */
  event?: string;
  sound_event?: SoundEvent2;
}[];
/**
 * List of entities this mob will share items with.
 */
export type EntityTypes9 = EntityType1[] | EntityType1;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius19 = number;
/**
 * Maximum distance in blocks this mob will look for entities to share items with.
 */
export type MaximumDistance2 = number;
/**
 * Amount of time in seconds the trap exists. After this amount of time is elapsed, the trap is removed from the world if it hasn't been activated
 */
export type Duration18 = number;
/**
 * Distance in blocks that the player has to be within to trigger the horse trap.
 */
export type WithinRadius8 = number;
/**
 * If true, the mob will be able to use the sleep goal if riding something.
 */
export type CanSleepWhileRiding = boolean;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime13 = number;
/**
 * The height of the mob's collider while sleeping.
 */
export type SleepColliderHeight = number;
/**
 * The width of the mob's collider while sleeping.
 */
export type SleepColliderWidth = number;
/**
 * The y offset of the mob's collider while sleeping.
 */
export type SleepYOffset = number;
/**
 * The cooldown time in seconds before the goal can be reused after a internal failure or timeout condition.
 */
export type TimeoutCooldown3 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the "wiggle room" to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius20 = number;
/**
 * UNDOCUMENTED
 */
export type GrowTiredCooldownTime = number;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent7 = boolean;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation6 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate while trying to look at the target.
 */
export type YMaxRotation = number;
/**
 * Percent chance a slime or magma cube has to jump while in water / lava.
 */
export type JumpChancePercentage = number;
/**
 * Additional time (in whole seconds), chosen randomly in the range of [0, "add_random_time_range"], to add to "min_change_direction_time".
 */
export type AddRandomTimeRange = number;
/**
 * Constant minimum time (in seconds) to wait before choosing a new direction.
 */
export type MinChangeDirectionTime = number;
/**
 * Maximum rotation angle range (in degrees) when randomly choosing a new direction.
 */
export type TurnRange = number;
/**
 * Items that we are interested in snacking on.
 */
export type Items3 = Item6[] | BB;
export type Item6 =
  | ItemIdentifier
  | ItemDescriptor
  | {
      item?: ItemIdentifier2 | ItemDescriptor2;
      [k: string]: unknown;
    };
/**
 * The cooldown time in seconds before the mob is able to snack again.
 */
export type SnackingCooldown = number;
/**
 * The minimum time in seconds before the mob is able to snack again.
 */
export type SnackingCooldownMinimum = number;
/**
 * This is the chance that the mob will stop snacking, from 0 to 1.
 */
export type SnackingStopChance = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime14 = number;
/**
 * The probability that the mob will drop an item when it sneezes.
 */
export type DropItemChance1 = number;
/**
 * List of entity types this mob will startle (cause to jump) when it sneezes.
 */
export type EntityTypes10 = EntityType1[] | EntityType1;
/**
 * Loot table to select dropped items from.
 */
export type LootTable2 = string;
/**
 * Sound to play when the sneeze is about to happen.
 */
export type PrepareSound = string;
/**
 * The time in seconds that the mob takes to prepare to sneeze (while the prepare_sound is playing).
 */
export type PrepareTime = number;
/**
 * The probability of sneezing. A value of 1.00 is 100%
 */
export type Probability9 = number;
/**
 * Sound to play when the sneeze occurs.
 */
export type Sound2 = string;
/**
 * Distance in blocks that mobs will be startled.
 */
export type WithinRadius9 = number;
/**
 * Sniffing duration in seconds
 */
export type Duration19 = number;
/**
 * Mob detection radius.
 */
export type SniffingRadius = number;
/**
 * Mob suspicion horizontal radius. When a player is within this radius horizontally, the anger level towards that player is increased.
 */
export type SuspicionRadiusHorizontal = number;
/**
 * Mob suspicion vertical radius. When a player is within this radius vertically, the anger level towards that player is increased.
 */
export type SuspicionRadiusVertical = number;
/**
 * Cooldown in seconds required after using this attack until the entity can use sonic boom again.
 */
export type AttackCooldown2 = number;
/**
 * Attack damage of the sonic boom.
 */
export type AttackDamage = number;
/**
 * Horizontal range (in blocks) at which the sonic boom can damage the target.
 */
export type AttackRangeHorizontal = number;
/**
 * Vertical range (in blocks) at which the sonic boom can damage the target.
 */
export type AttackRangeVertical = number;
/**
 * Sound event for the attack.
 */
export type AttackSound = string;
/**
 * Sound event for the charge up.
 */
export type ChargeSound = string;
/**
 * Goal duration in seconds.
 */
export type Duration20 = number;
/**
 * Duration in seconds until the attack sound is played.
 */
export type DurationUntilAttackSound = number;
/**
 * Height cap of the attack knockback's vertical delta.
 */
export type KnockbackHeightCap1 = number;
/**
 * Horizontal strength of the attack's knockback applied to the attack target.
 */
export type KnockbackHorizontalStrength1 = number;
/**
 * Vertical strength of the attack's knockback applied to the attack target.
 */
export type KnockbackVerticalStrength1 = number;
/**
 * The amount of time the mob will be interested before pouncing. This happens when the mob is within range of pouncing
 */
export type InterestTime = number;
/**
 * The distance in blocks the mob jumps in the direction of its target.
 */
export type LeapDistance = number;
/**
 * The height in blocks the mob jumps when leaping at its target.
 */
export type LeapHeight = number;
/**
 * The maximum distance away a target can be before the mob gives up on stalking.
 */
export type MaximumStalkDist = number;
/**
 * The maximum distance away from the target in blocks to begin pouncing at the target.
 */
export type PounceMaximumDist = number;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent8 = boolean;
/**
 * The movement speed in which you stalk your target.
 */
export type StalkSpeed = number;
/**
 * The Maximum distance away from the target when landing from the pounce that will still result in damaging the target.
 */
export type StrikeDist = number;
/**
 * The amount of time the mob will be stuck if they fail and land on a block they can be stuck on.
 */
export type StuckTime = number;
/**
 * The distance in blocks the mob jumps in the direction of their target.
 */
export type LeapDist = number;
/**
 * Blocks that the mob can get stuck in after a pounce.
 */
export type Filters32 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Sets the time an entity should stay near a noteblock after hearing it.
 */
export type ListenTime1 = number;
/**
 * Sets the entity's speed when moving toward the block.
 */
export type Speed = number;
/**
 * Sets the distance the entity needs to be away from the block to attempt to start the goal.
 */
export type StartDistance1 = number;
/**
 * Sets the distance from the block the entity will attempt to reach.
 */
export type StopDistance4 = number;
/**
 * Allows the entity to use this attack behavior, only once EVER.
 */
export type AttackOnce3 = boolean;
/**
 * Defines the entity types this entity will attack.
 */
export type AttackTypes3 = string;
/**
 * If the entity is on fire, this allows the entity's target to catch on fire after being hi
 */
export type CanSpreadOnFire3 = boolean;
/**
 * Cooldown time (in seconds) between attacks.
 */
export type CooldownTime15 = number;
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_inner_boundary".
 */
export type InnerBoundaryTimeIncrease3 = number;
/**
 * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MaxPathTime3 = number;
/**
 * Field of view (in degrees) when using the sensing component to detect an attack target.
 */
export type MeleeFov3 = number;
/**
 * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MinPathTime3 = number;
/**
 * Multiplied with the final AoE damage range to determine a no damage range. The stomp attack will go on cooldown if target is in this no damage range.
 */
export type NoDamageRangeMultiplier = number;
/**
 * Trigger to fire.
 */
export type Trigger32 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger33 = string | Trigger | Trigger1[];
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
 */
export type OuterBoundaryTimeIncrease3 = number;
/**
 * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
 */
export type PathFailTimeIncrease3 = number;
/**
 * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
 */
export type PathInnerBoundary3 = number;
/**
 * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
 */
export type PathOuterBoundary3 = number;
/**
 * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
 */
export type RandomStopInterval4 = number;
/**
 * Used with the base size of the entity to determine minimum target-distance before trying to deal attack damage.
 */
export type ReachMultiplier4 = number;
/**
 * Toggles (on/off) the need to have a full path from the entity to the target when using this melee attack behavior.
 */
export type RequireCompletePath3 = boolean;
/**
 * Allows the actor to be set to persist upon targeting a player.
 */
export type SetPersistent9 = boolean;
/**
 * Multiplied with the base size of the entity to determine stomp AoE damage range.
 */
export type StompRangeMultiplier = number;
/**
 * Unused. No effect on "minecraft:behavior.melee_attack".
 */
export type TargetDist4 = number;
/**
 * Allows the entity to track the attack target, even if the entity has no sensing.
 */
export type TrackTarget6 = boolean;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation7 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation6 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius21 = number;
/**
 * A random value to determine when to randomly move somewhere. This has a 1/interval chance to choose this goal
 */
export type Interval8 = number;
/**
 * The number of blocks each tick that the mob will check within it's search range and height for a valid block to move to. A value of 0 will have the mob check every block within range in one tick
 */
export type SearchCount9 = number;
/**
 * Height in blocks the mob will look for turtle eggs to move towards.
 */
export type SearchHeight16 = number;
/**
 * The distance in blocks it will look for turtle eggs to move towards.
 */
export type SearchRange17 = number;
/**
 * Time in seconds the mob has to wait before using the goal again.
 */
export type CooldownTime16 = number;
/**
 * Distance in blocks within the mob considers it has reached the goal. This is the `wiggle room` to stop the AI from bouncing back and forth trying to reach a specific spot
 */
export type GoalRadius22 = number;
/**
 * The distance in blocks to search for points inside villages. If <= 0, find the closest village regardless of distance.
 */
export type SearchRange18 = number;
/**
 * Movement speed multiplier of the mob when using this AI Goal.
 */
export type SpeedMultiplier3 = number;
/**
 * This is the chance that the mob will start this goal, from 0 to 1.
 */
export type StartChance2 = number;
/**
 * Time in seconds the spell casting will take.
 */
export type CastDuration2 = number;
/**
 * Time in seconds the mob has to wait before using the spell again.
 */
export type CooldownTime17 = number;
/**
 * If true, the mob will do the casting animations and render spell particles.
 */
export type DoCasting = boolean;
/**
 * Upper bound of the activation distance in blocks for this spell.
 */
export type MaximumActivationRange = number;
/**
 * Lower bound of the activation distance in blocks for this spell.
 */
export type MinimumActivationRange1 = number;
/**
 * The color of the particles for this spell.
 */
export type ParticleColor1 = number | string;
/**
 * Amount of time in seconds to wait before this step starts.
 */
export type Delay1 = number;
/**
 * Amount of time in seconds before each entity is summoned in this step.
 */
export type DelayPerSummon = number;
/**
 * Amount of time in seconds that the spawned entity will be alive for. A value of -1.0 means it will remain alive for as long as it can
 */
export type EntityLifespan = number;
/**
 * Amount of time in seconds to wait before this step starts.
 */
export type BaseDelay = number;
/**
 * The entity type of the entities we will spawn in this step.
 */
export type EntityType2 = string;
/**
 * Number of entities that will be spawned in this step.
 */
export type NumberEntitiesSpawned = number;
/**
 * The base shape of this step. Valid values are circle and line
 */
export type Shape1 = "line" | "circle";
/**
 * The base size of the entity.
 */
export type Size1 = number;
/**
 * The sound event to play for this step.
 */
export type SoundEvent3 = string;
/**
 * Maximum number of summoned entities at any given time.
 */
export type SummonCap = number;
/**
 * Maximum radius where the summon entities can spawn.
 */
export type SummonCapRadius = number;
/**
 * Event to invoke on each summoned entity on spawn.
 */
export type SummonEvent = string;
/**
 * The target of the spell. This is where the spell will start (line will start here, circle will be centered here)
 */
export type Target2 = string;
/**
 * List of steps for the spell.
 */
export type Sequence1 = Sequence2[];
/**
 * The sound event to play when using this spell.
 */
export type StartSoundEvent1 = string;
/**
 * The weight of this spell. Controls how likely the mob is to choose this spell when casting one
 */
export type Weight4 = number;
/**
 * List of spells for the mob to use to summon entities.
 */
export type SummonChoices = {
  cast_duration?: CastDuration2;
  cooldown_time?: CooldownTime17;
  do_casting?: DoCasting;
  filters?: Filters3;
  max_activation_range?: MaximumActivationRange;
  min_activation_range?: MinimumActivationRange1;
  particle_color?: ParticleColor1;
  sequence?: Sequence1;
  start_sound_event?: StartSoundEvent1;
  weight?: Weight4;
}[];
/**
 * This mob starts swelling when a target is at least this many blocks away.
 */
export type StartDistance2 = number;
/**
 * This mob stops swelling when a target has moved away at least this many blocks.
 */
export type StopDistance5 = number;
/**
 * Amount of time (in seconds) to stay idle.
 */
export type IdleTime1 = number;
/**
 * Percent chance this entity will go idle, 1.0 = 100%.
 */
export type SuccesRate = number;
/**
 * The material the mob is traveling in. An air block will only be considered valid to move to with a block of this material below it.
 */
export type IdleTime2 = "water" | "lava" | "any";
/**
 * The height (in blocks) above the mob's current position that it will search for a valid air block to move to. If a valid block cannot be found, the mob will move to the position this many blocks above it.
 */
export type SearchHeight17 = number;
/**
 * The radius (in blocks) around the mob's current position that it will search for a valid air block to move to.
 */
export type SearchRadius2 = number;
/**
 * Movement speed multiplier of the mob when using this Goal.
 */
export type SpeedMod = number;
/**
 * Percent chance to start wandering, when not path-finding. 1 = 100%
 */
export type Interval9 = number;
/**
 * Distance to look ahead for obstacle avoidance, while wandering.
 */
export type LookAhead = number;
/**
 * Amount of time (in seconds) to wander after wandering behavior was successfully started.
 */
export type WanderTime = number;
/**
 * Percent chance to start following another entity, if not already doing so. 1.0 = 100%
 */
export type SuccessRate1 = number;
/**
 * Percent chance to stop following the current entity, if they're riding another entity or they're not swimming. 1.0 = 100%
 */
export type ChanceToStop = number;
/**
 * Time (in seconds) between checks to determine if this entity should catch up to the entity being followed or match the direction of the entity being followed.
 */
export type StateCheckInterval = number;
/**
 * Distance, from the entity being followed, at which this entity will speed up to reach that entity.
 */
export type CatchUpThreshold = number;
/**
 * Distance, from the entity being followed, at which this entity will try to match that entity's direction.
 */
export type MatchDirectionThreshold = number;
/**
 * The multiplier this entity's speed is modified by when matching another entity's direction.
 */
export type CatchUpMultiplier = number;
/**
 * Radius around this entity to search for another entity to follow.
 */
export type SearchRange19 = number;
/**
 * Distance, from the entity being followed, at which this entity will stop following that entity.
 */
export type StopDistance6 = number;
/**
 * Filters which determine what entites are valid to follow.
 */
export type EntityTypes11 = EntityType1[] | EntityType1;
/**
 * Added to the base size of the entity, to determine the target's maximum allowable distance, when trying to deal attack damage.
 */
export type DamageReach = number;
/**
 * If true, whether the goal is affected by the mob griefing game rule.
 */
export type AffectedByGriefingRule1 = boolean;
/**
 * Block descriptors for which blocks are valid to be taken by the entity, if empty all blocks are valid.
 */
export type Blocks2 = BlockReference[];
/**
 * Filters for if the entity should try to take a block. Self and Target are set.
 */
export type Filters33 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Chance each tick for the entity to try and take a block.
 */
export type Chance4 = number;
/**
 * Minecraft behavior event.
 */
export type Event13 =
  | string
  | {
      event?: Event3;
      target?: Target1;
      [k: string]: unknown;
    };
/**
 * If true, whether the entity needs line of sight to the block they are trying to take.
 */
export type RequiresLineOfSight = boolean;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters34 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type MaxHeadRotationY2 = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type MaxRotationX1 = number;
/**
 * The maximum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
 */
export type MaxWaitTime1 = number;
/**
 * Minimum distance (in blocks) for the entity to be considered having reached its target.
 */
export type MinDistanceToTarget = number;
/**
 * The minimum amount of time (in seconds) for the mob to randomly wait for before taking the flower.
 */
export type MinWaitTime1 = number;
/**
 * The dimensions of the AABB used to search for a potential mob to take a flower from.
 */
export type SearchArea1 = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * Trigger to fire.
 */
export type Trigger34 = string | Trigger | Trigger1[];
/**
 * The time in seconds that must pass for the entity to be able to try to teleport again.
 */
export type Cooldown7 = number;
/**
 * Conditions to be satisfied for the entity to teleport to its owner.
 */
export type Filters35 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * This angle (in degrees) is used for controlling the spread when picking a destination position behind the target. A zero spread angle means the destination position will be straight behind the target with no variance. A 90 degree spread angle means the destination position can be up to 45 degrees to the left and to the right of the position straight behind the target's view direction.
 */
export type DesitnationPosSearchSpreadDegrees = number;
/**
 * This angle (in degrees) is used for controlling the spread when picking a destination position behind the target. A zero spread angle means the destination position will be straight behind the target with no variance. A 90 degree spread angle means the destination position can be up to 45 degrees to the left and to the right of the position straight behind the target's view direction.
 */
export type DesitnationPosSpreadDegrees = number;
/**
 * Distance in height (in blocks) between the owner entity and the target has to be less than this value when owner checks if it is too close and should move away from the target. This value needs to be bigger than zero for the move away logic to trigger.
 */
export type HeightDifferenceLimit = number;
/**
 * Horizontal search distance (in blocks) when searching for a position to move away from target.
 */
export type HorizontalSearchDistance = number;
/**
 * The speed with which the entity should move to its target position.
 */
export type MovementSpeed = number;
/**
 * Number of ticks needed to complete a stay at the block.
 */
export type VerticalSearchDistance1 = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters36 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * The list of conditions the other entity must meet to be a valid target.
 */
export type EntityTypes12 = EntityType1[] | EntityType1;
/**
 * Probability that the entity will target the entity that pushed it.
 */
export type PercentChance = number;
/**
 * If true, the mob can stop being tempted if the player moves too fast while close to this mob.
 */
export type CanGetScared1 = boolean;
/**
 * If true, the mob can be tempted even if it has a passenger (i.e. if being ridden).
 */
export type CanTemptWhileRidden1 = boolean;
/**
 * If true, vertical distance to the player will be considered when tempting.
 */
export type CanTemptVertically1 = boolean;
/**
 * List of items this mob is tempted by.
 */
export type Items4 = BB[];
/**
 * Range of random ticks to wait between tempt sounds.
 */
export type SoundInterval9 = number | [] | [Minimum6] | [Minimum6, Maximum15];
export type Minimum6 = number;
export type Maximum15 = number;
/**
 * The distance at which the mob will stop following the player.
 */
export type StopDistance7 = number;
/**
 * Sound to play while the mob is being tempted.
 */
export type TemptSound1 = string;
/**
 * Distance in blocks this mob can get tempted by a player holding an item they like.
 */
export type WithinRadius10 = number;
/**
 * Trigger to fire.
 */
export type Trigger35 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger36 = string | Trigger | Trigger1[];
/**
 * Goal cooldown range in seconds.
 */
export type CooldownRange4 = number | DDC;
/**
 * Goal duration range in seconds.
 */
export type DurationRange = number | DDC;
/**
 * Trigger to fire.
 */
export type Trigger37 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 */
export type Trigger38 = string | Trigger | Trigger1[];
/**
 * The Maximum time in seconds that the trader will hold an item before attempting to switch for a different item that takes the same trade.
 */
export type CarriedItemSwitchTime = number;
/**
 * The time in seconds before the trader can use this goal again.
 */
export type Cooldown8 = number;
/**
 * The Maximum time in seconds that the trader will be interested with showing it's trade items.
 */
export type InterestTime1 = number;
/**
 * The Maximum time in seconds that the trader will wait when you no longer have items to trade.
 */
export type RemoveItemTime = number;
/**
 * Distance in blocks this mob can be interested by a player holding an item they like.
 */
export type WithinRadius11 = number;
/**
 * Conditions that need to be met for the behavior to start.
 */
export type Filters37 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * A list of block descriptors that should be a container type to get items from. Default is any container
 */
export type SourceContainerTypes = BlockReference[];
/**
 * A list of block descriptors that should be a container type to put items in. Default is any container
 */
export type DestinationContainerTypes = BlockReference[];
/**
 * The maximum stack size that the mob will try to take from a container.
 */
export type MaxStackSize = number;
/**
 * The amount of time spent interacting with the containers in seconds.
 */
export type InteractionTime = number;
/**
 * Whether the entity is allowed to simultaneously interact with a container that another non-player entity is already interacting with.
 */
export type AllowSimultaneousInteraction = boolean;
/**
 * Whether to select the nearest valid container or a random valid container in range.
 */
export type SearchStrategy = "nearest" | "random";
/**
 * The maximum horizontal and vertical distance at which to find containers for taking or placing items.
 */
export type SearchDistance =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin;
      range_max?: RangeMax;
    }
  | {
      min?: Min2;
      max?: Max2;
    };
/**
 * The maximum number of containers the mob will visit before resetting. 0 is unlimited.
 */
export type MaxVisitedContainers = number;
/**
 * ime, in seconds, the mob will wait after spawning or after its available goals have changed (e.g. due to a component group update).
 */
export type InitialCooldwon = number;
/**
 * When the mob cannot find a valid container to interact with, the goal will be disabled for this amount of time in seconds.
 */
export type IdleCooldown = number;
/**
 * The strategy to use for placing the transported item.
 * Any - always place if there is room,
 * With matching - place if there is a matching item in the container,
 * With matching or empty - like With matching but will also place in empty containers.
 */
export type PlaceStrategy = "any" | "with_matching" | "with_matching_or_empty";
/**
 * The distance to the target within which the mob begins using its kinetic weapon
 */
export type ApproachDistance = number;
/**
 * Multiplier applied to the mob's movement speed while repositioning
 */
export type RepositionSpeedMultiplier = number;
/**
 * Multiplier applied to the mob's movement speed while on cooldown
 */
export type CooldownSpeedMultiplier = number;
/**
 * Multiplier applied to the item's "minecraft:kinetic_weapon" component's "reach"
 */
export type WeaponReachMultiplier = number;
/**
 * Multiplier applied to each "min_speed" and "min_relative_speed" condition in the item's "minecraft:kinetic_weapon" component
 */
export type WeaponMinSpeedMultiplier = number;
/**
 * Maximum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MaxPathTime4 = number;
/**
 * Field of view (in degrees) when using the sensing component to detect an attack target.
 */
export type MeleeFov4 = number;
/**
 * Minimum base time (in seconds) to recalculate new attack path to target (before increases applied).
 */
export type MinPathTime4 = number;
/**
 * Time (in seconds) to add to attack path recalculation when the target is beyond the "path_outer_boundary".
 */
export type OuterBoundaryTimeIncrease4 = number;
/**
 * Time (in seconds) to add to attack path recalculation when this entity cannot move along the current path.
 */
export type PathFailTimeIncrease4 = number;
/**
 * Distance at which to increase attack path recalculation by "inner_boundary_tick_increase".
 */
export type PathInnerBoundary4 = number;
/**
 * Distance at which to increase attack path recalculation by "outer_boundary_tick_increase".
 */
export type PathOuterBoundary4 = number;
/**
 * Specifies whether a full navigation path from the mob to the target is required
 */
export type RequireCompletePath4 = boolean;
/**
 * Allows the entity to track the attack target, even if the entity has no sensing.
 */
export type TrackTarget7 = boolean;
/**
 * Cooldown time (in seconds) between attacks.
 */
export type CooldownTime18 = number;
/**
 * Maximum rotation (in degrees), on the X-axis, this entity can rotate while trying to look at the target.
 */
export type XMaxRotation8 = number;
/**
 * Maximum rotation (in degrees), on the Y-axis, this entity can rotate its head while trying to look at the target.
 */
export type YMaxHeadRotation7 = number;
/**
 * This entity will have a 1 in N chance to stop it's current attack, where N = "random_stop_interval".
 */
export type RandomStopInterval5 = number;
/**
 * Allows the entity to use this attack behavior, only once EVER.
 */
export type AttackOnce4 = boolean;
/**
 * Allows a mob to override its mount's navigation behavior with the one defined by this goal. Requires the mount to be running the "minecraft:behavior.mount_pathing" goal, whose default behavior will be ignored
 */
export type HijackMountNavigation = boolean;
/**
 * List of entities this mob can copy the owner from.
 */
export type EntityTypes13 = EntityType1[] | EntityType1;
/**
 * List of entities this mob can copy the owner from.
 */
export type EntityTypes14 = EntityType1[] | EntityType1;
/**
 * List of entity types the wither takes into account to find who dealt the most damage to it.
 */
export type EntityTypes15 = EntityType1[] | EntityType1;
/**
 * The amount of ticks the NPC will stay in their the work location.
 */
export type ActiveTime = number;
/**
 * If true, this entity can work when their jobsite POI is being rained on.
 */
export type CanWorkInRain = boolean;
/**
 * The amount of ticks the goal will be on cooldown before it can be used again.
 */
export type GoalCooldown = number;
/**
 * Trigger to fire.
 */
export type Trigger39 = string | Trigger | Trigger1[];
/**
 * The max interval in which a sound will play.
 */
export type SoundDelayMax = number;
/**
 * The min interval in which a sound will play.
 */
export type SoundDelayMin = number;
/**
 * If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
 */
export type WorkInRainTolerance = number;
/**
 * The amount of ticks the NPC will stay in their the work location.
 */
export type ActiveTime1 = number;
/**
 * The maximum number of times the mob will interact with the composter.
 */
export type BlockInteractionMax = number;
/**
 * Determines whether the mob can empty a full composter.
 */
export type CanEmptyComposter = boolean;
/**
 * Determines whether the mob can add items to a composter given that it is not full.
 */
export type CanFillComposter = boolean;
/**
 * If true, this entity can work when their jobsite POI is being rained on.
 */
export type CanWorkInRain1 = boolean;
/**
 * The amount of ticks the goal will be on cooldown before it can be used again.
 */
export type GoalCooldown1 = number;
/**
 * The maximum number of items which can be added to the composter per block interaction.
 */
export type ItemsPerUseMax = number;
/**
 * Limits the amount of each compostable item the mob can use. Any amount held over this number will be composted if possible
 */
export type MinItemCount = number;
/**
 * Trigger to fire.
 */
export type Trigger40 = string | Trigger | Trigger1[];
/**
 * Unused.
 */
export type SoundDelayMax1 = number;
/**
 * Unused.
 */
export type SoundDelayMin1 = number;
/**
 * The maximum interval in which the mob will interact with the composter.
 */
export type UseBlockMax = number;
/**
 * The minimum interval in which the mob will interact with the composter.
 */
export type UseBlockMin = number;
/**
 * If "can_work_in_rain" is false, this is the maximum number of ticks left in the goal where rain will not interrupt the goal
 */
export type WorkInRainTolerance1 = number;
/**
 * Trigger to fire.
 */
export type Trigger41 = string | Trigger | Trigger1[];
/**
 * The components groups to add or remove.
 */
export type ComponentGroups1 = ComponentGroups2[] | ComponentGroups3;
/**
 * A reference to a component group.
 */
export type ComponentGroups2 = string;
/**
 * A reference to a component group.
 */
export type ComponentGroups3 = string;
/**
 * Trigger to fire.
 */
export type Trigger42 = string | Trigger | Trigger1[];
/**
 * The event to execute
 */
export type Event14 = string;
/**
 * The value to set the property to.
 */
export type Property = string | number | boolean;
/**
 * The command to execute.
 */
export type Command = string | string[];
/**
 * Specifies the sound event to play
 */
export type Sound3 = string;
/**
 * Specifies the type of particle to emit
 */
export type Particle1 = string;
/**
 * Specifies whether vertical movement should be stopped
 */
export type StopVerticalMovement = boolean;
/**
 * Specifies whether horizontal movement should be stopped
 */
export type StopHorizontalMovement = boolean;
/**
 * If true, it unleashes the entity from the entity it is leashed to
 */
export type UnleashSelf = boolean;
/**
 * If true, it unleashes all entities that are leashed to the entity
 */
export type UnleashOthers = boolean;
/**
 * Will evaluate every filter in order and execute the first valid one
 */
export type FirstValid = FBAEventBase[];
/**
 * A series of filters and components to be added.
 */
export type Sequences1 = Sequence4[];
/**
 * A series of filters and components to be added.
 */
export type Sequences = Sequence3[];
/**
 * The value to set the property to.
 */
export type Property1 = string | number | boolean;
/**
 * The command to execute.
 */
export type Command1 = string | string[];
/**
 * The weight on how likely this section is to trigger.
 */
export type Weight5 = number;
/**
 * Randomly selects one of the following items based upon their weight and the total weights.
 */
export type Randomize2 = Randomize3[];
/**
 * Randomly selects one of the following items based upon their weight and the total weights.
 */
export type Randomize = Randomize1[];
/**
 * A minecraft entity identifier.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "C".
 */
export type EntityIdentifier = string;
/**
 * The minecraft molang definition that results in a boolean.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "D".
 */
export type MolangBoolean = string | boolean;
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "E".
 */
export type MolangNumber = string | number;
/**
 * A described range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "H".
 */
export type RangeAB =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin;
      range_max?: RangeMax;
    }
  | {
      min?: Min2;
      max?: Max2;
    };
/**
 * Molang definition.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BD".
 */
export type Molang2 = string;
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BF_filters_spec".
 */
export type BFFiltersSpec1 =
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
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BH".
 */
export type Operator = "!=" | "<" | "<=" | "<>" | "=" | "==" | ">" | ">=" | "equals" | "not";
/**
 * The subject of this filter test.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BI".
 */
export type Subject1 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
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
export type Subject2 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A integer value.
 */
export type Value28 = number;
/**
 * The equipment location to test.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CA".
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
export type Subject3 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * The equipment location to test.
 */
export type Value29 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
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
export type Subject4 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * The equipment location to test.
 */
export type Value30 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
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
export type Subject5 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * true or false.
 */
export type Value31 = boolean;
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
export type Subject6 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A floating point value.
 */
export type Value32 = number;
/**
 * Compares the distance to the nearest Player with a float value.
 */
export type TestProperty5 = string;
/**
 * (Required) A floating point value.
 */
export type Value33 = number;
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
export type Subject7 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A string value.
 */
export type Value34 = string;
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
export type Subject8 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A floating point value.
 */
export type Value35 = number;
/**
 * Returns true when the subject entity has the named ability.
 */
export type TestProperty8 = string;
/**
 * (Required) The Ability type to test.
 */
export type Value36 =
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
export type Value37 = string;
/**
 * Returns true when the subject entity contains the named component.
 */
export type TestProperty10 = string;
/**
 * (Required) The component name to look for.
 */
export type Value38 = string;
/**
 * The test property.
 */
export type Test = string;
/**
 * (Optional) true or false.
 */
export type Value39 = boolean;
/**
 * Returns true when the subject entity receives the named damage type.
 */
export type TestProperty11 = string;
/**
 * The Damage type to test.
 */
export type Value40 =
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
 * Tests for the presence of a named item in the designated slot of the subject entity.
 */
export type Test1 = "has_equipment";
/**
 * The equipment location to test.
 */
export type Domain = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier7 = string;
/**
 * Returns true when the subject entity is holding a item with the specified component.
 */
export type Test2 = "has_item_with_component";
/**
 * The component name to look for.
 */
export type Value41 = string;
/**
 * Tests for the presence of an item with the named tag in the designated slot of the subject entity.
 */
export type Test3 = "has_equipment_tag";
/**
 * The equipment location to test.
 */
export type Domain1 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier8 = string;
/**
 * Tests for the presence of a damaged named item in the designated slot of the subject entity.
 */
export type Test4 = "has_damaged_equipment";
/**
 * The equipment location to test.
 */
export type Domain2 = "any" | "armor" | "feet" | "main_hand" | "hand" | "head" | "inventory" | "leg" | "torso";
/**
 * A minecraft item identifier.
 */
export type ItemIdentifier9 = string;
/**
 * Tests whether the Subject has the specified mob effect.
 */
export type TestProperty12 = string;
/**
 * The specified mob effect.
 */
export type Value42 =
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
export type Value43 = boolean;
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
export type Subject9 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) The property name to look for.
 */
export type Value44 = string;
/**
 * The test property.
 */
export type Test6 = string;
/**
 * True or false.
 */
export type Value45 = boolean;
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
export type Value46 = boolean;
/**
 * The test property.
 */
export type Test8 = string;
/**
 * True or false.
 */
export type Value47 = boolean;
/**
 * Returns true if the subject entity has the tag provided.
 */
export type TestProperty14 = string;
/**
 * The tag as a string.
 */
export type Value48 = string;
/**
 * The test property.
 */
export type Test9 = string;
/**
 * True or false.
 */
export type Value49 = boolean;
/**
 * Tests whether the target has any trade supply left. Will return false if the target cannot be traded with.
 */
export type TestProperty15 = string;
/**
 * True or false.
 */
export type Value50 = boolean;
/**
 * The test property.
 */
export type Test10 = string;
/**
 * (Required) A floating point value.
 */
export type Value51 = boolean & number;
/**
 * Compares the current 24 hour time with an int value in the range[0, 24000].
 */
export type TestProperty16 = "hourly_clock_time";
/**
 * (Required) An integer value set between 0 and 24000.
 */
export type Value52 = number;
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
export type Subject10 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Optional) A string value.
 */
export type Value53 = string;
/**
 * Returns true if the subject entity is in a caravan.
 */
export type TestProperty18 = string;
/**
 * True or false.
 */
export type Value54 = boolean;
/**
 * Returns true when the subject entity is in the clouds.
 */
export type TestProperty19 = string;
/**
 * True or false.
 */
export type Value55 = boolean;
/**
 * Returns true when the subject entity in contact with any water: water, rain, splash water bottle.
 */
export type TestProperty20 = string;
/**
 * (Optional) true or false.
 */
export type Value56 = boolean;
/**
 * Returns true when the subject entity is in lava.
 */
export type TestProperty21 = string;
/**
 * True or false.
 */
export type Value57 = boolean;
/**
 * The test property.
 */
export type Test11 = string;
/**
 * True or false.
 */
export type Value58 = boolean;
/**
 * The test property.
 */
export type Test12 = string;
/**
 * True or false.
 */
export type Value59 = boolean;
/**
 * Returns true when the subject entity is in water or rain.
 */
export type TestProperty22 = string;
/**
 * True or false.
 */
export type Value60 = boolean;
/**
 * Returns true when the subject entity is in water.
 */
export type TestProperty23 = string;
/**
 * True or false.
 */
export type Value61 = boolean;
/**
 * The test property.
 */
export type Test13 = string;
/**
 * The Family name to look for.
 */
export type Value62 = number;
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
export type Subject11 = "block" | "other" | "parent" | "player" | "self" | "target" | "damager";
/**
 * (Required) A integer value.
 */
export type Value63 = number;
/**
 * Tests the current altitude against a provided value. 0= bedrock elevation.
 */
export type TestProperty25 = string;
/**
 * The altitude value to compare with.
 */
export type Value64 = number;
/**
 * Returns true if the subject entity is fleeing from other mobs.
 */
export type TestProperty26 = string;
/**
 * True or false.
 */
export type Value65 = boolean;
/**
 * Tests whether the Subject is currently in the named biome.
 */
export type TestProperty27 = string;
/**
 * The biome type to test.
 */
export type Value66 = string;
/**
 * The test property.
 */
export type Test14 = string;
/**
 * The Family name to look for.
 */
export type Value67 = string;
/**
 * The test property.
 */
export type TestProperty28 = string;
/**
 * True or false.
 */
export type Value68 = boolean;
/**
 * Tests the current brightness against a provided value in the range (0.0f, 1.0f).
 */
export type TestProperty29 = string;
/**
 * The brightness value to compare with.
 */
export type Value69 = number;
/**
 * Returns true if the subject entity is climbing.
 */
export type TestProperty30 = string;
/**
 * True or false.
 */
export type Value70 = boolean;
/**
 * Returns true if the subject entity is the named color.
 */
export type TestProperty31 = string;
/**
 * The Palette Color to test.
 */
export type Value71 =
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
export type Value72 = string;
/**
 * Returns true during the daylight hours.
 */
export type TestProperty33 = string;
/**
 * True or false.
 */
export type Value73 = boolean;
/**
 * Tests the current difficulty level of the game.
 */
export type TestProperty34 = string;
/**
 * The game's difficulty level to test.
 */
export type Value74 = "easy" | "hard" | "normal" | "peaceful";
/**
 * Returns true when the subject entity is a member of the named family.
 */
export type TestProperty35 = string;
/**
 * The Family name to look for.
 */
export type Value75 = string;
/**
 * Tests whether a named game rule is active.
 */
export type Value76 = boolean;
/**
 * Tests whether the Subject is in an area with humidity.
 */
export type TestProperty36 = string;
/**
 * True or false.
 */
export type Value77 = boolean;
/**
 * The test property.
 */
export type TestProperty37 = string;
/**
 * True or false.
 */
export type Value78 = boolean;
/**
 * The test property.
 */
export type TestProperty38 = string;
/**
 * True or false.
 */
export type Value79 = boolean;
/**
 * The test property.
 */
export type Test15 = string;
/**
 * True or false.
 */
export type Value80 = boolean;
/**
 * The test property.
 */
export type TestProperty39 = string;
/**
 * True or false.
 */
export type Value81 = boolean;
/**
 * The test property.
 */
export type TestProperty40 = string;
/**
 * The altitude value to compare with.
 */
export type Value82 = number;
/**
 * The test property.
 */
export type Test16 = string;
/**
 * True or false.
 */
export type Value83 = boolean;
/**
 * The test property.
 */
export type TestProperty41 = string;
/**
 * True or false.
 */
export type Value84 = boolean;
/**
 * The test property.
 */
export type TestProperty42 = string;
/**
 * True or false.
 */
export type Value85 = boolean;
/**
 * The test property.
 */
export type Test17 = string;
/**
 * True or false.
 */
export type Value86 = boolean;
/**
 * The test property.
 */
export type TestProperty43 = string;
/**
 * True or false.
 */
export type Value87 = boolean;
/**
 * The test property.
 */
export type TestProperty44 = string;
/**
 * True or false.
 */
export type Value88 = boolean;
/**
 * The test property.
 */
export type TestProperty45 = string;
/**
 * The altitude value to compare with.
 */
export type Value89 = number;
/**
 * The test property.
 */
export type Test18 = string;
/**
 * True or false.
 */
export type Value90 = boolean;
/**
 * The test property.
 */
export type TestProperty46 = string;
/**
 * True or false.
 */
export type Value91 = boolean;
/**
 * The test property.
 */
export type TestProperty47 = string;
/**
 * True or false.
 */
export type Value92 = boolean;
/**
 * The test property.
 */
export type TestProperty48 = string;
/**
 * True or false.
 */
export type Value93 = boolean;
/**
 * The test property.
 */
export type Test19 = string;
/**
 * True or false.
 */
export type Value94 = boolean;
/**
 * The test property.
 */
export type TestProperty49 = string;
/**
 * True or false.
 */
export type Value95 = boolean;
/**
 * Returns true if the subject entity is sitting.
 */
export type TestProperty50 = string;
/**
 * True or false.
 */
export type Value96 = boolean;
/**
 * The test property.
 */
export type TestProperty51 = string;
/**
 * True or false.
 */
export type Value97 = boolean;
/**
 * The test property.
 */
export type TestProperty52 = string;
/**
 * The Biome temperature catagory to test.
 */
export type Value98 = "cold" | "mild" | "ocean" | "warm";
/**
 * The test property.
 */
export type TestProperty53 = string;
/**
 * The Biome temperature value to compare with.
 */
export type Value99 = number;
/**
 * The test property.
 */
export type TestProperty54 = string;
/**
 * True or false.
 */
export type Value100 = boolean;
/**
 * The test property.
 */
export type TestProperty55 = string;
/**
 * True or false.
 */
export type Value101 = boolean;
/**
 * The test property.
 */
export type TestProperty56 = string;
/**
 * The altitude value to compare with.
 */
export type Value102 = number;
/**
 * The test property.
 */
export type TestProperty57 = string;
/**
 * The Family name to look for.
 */
export type Value103 = string;
/**
 * The test property.
 */
export type TestProperty58 = string;
/**
 * True or false.
 */
export type Value104 = boolean;
/**
 * The test property.
 */
export type Test20 = string;
/**
 * true or false.
 */
export type Value105 = boolean;
/**
 * The test property.
 */
export type Test21 = string;
/**
 * An integer value.
 */
export type Value106 = number;
/**
 * The test property.
 */
export type TestProperty59 = string;
/**
 * A floating point value.
 */
export type Value107 = number;
/**
 * The test property.
 */
export type TestProperty60 = string;
/**
 * An integer value.
 */
export type Value108 = number;
/**
 * The test property.
 */
export type TestProperty61 = string;
/**
 * True or false.
 */
export type Value109 = boolean;
/**
 * The test property.
 */
export type TestProperty62 = string;
/**
 * True or false.
 */
export type Value110 = boolean;
/**
 * The test property.
 */
export type Test22 = string;
/**
 * An integer value.
 */
export type Value111 = number;
/**
 * The test property.
 */
export type Test23 = string;
/**
 * An integer value.
 */
export type Value112 = number;
/**
 * The test property.
 */
export type Test24 = string;
/**
 * An integer value.
 */
export type Value113 = number;
/**
 * The test property.
 */
export type Test25 = string;
/**
 * True or false.
 */
export type Value114 = boolean;
/**
 * Tests if the subject is taking fire damage. Requires the damage_sensor component
 */
export type Test26 = string;
/**
 * True or false.
 */
export type Value115 = boolean;
/**
 * The test property.
 */
export type Test27 = string;
/**
 * (Required) A floating point value.
 */
export type Value116 = boolean & number;
/**
 * The test property.
 */
export type Test28 = string;
/**
 * (Required) A floating point value.
 */
export type Value117 = boolean & number;
/**
 * The test property.
 */
export type Test29 = string;
/**
 * True or false.
 */
export type Value118 = boolean;
/**
 * The test property.
 */
export type Test30 = string;
/**
 * The Family name to look for.
 */
export type Value119 = string;
/**
 * The test property.
 */
export type Test31 = string;
/**
 * The Family name to look for.
 */
export type Value120 = string;
/**
 * The test property.
 */
export type Test32 = string;
/**
 * (Required) A floating point value.
 */
export type Value121 = boolean & number;
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BF".
 */
export type Filters38 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * Reference to a sound definition in "sound_definitions.json".
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCB".
 */
export type SoundEvent4 = string;
/**
 * A minecraft loot_table identifier.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHE".
 */
export type LootTableIdentifier = string;
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIG_integer_range".
 */
export type Range4 =
  | number
  | {
      range_min?: RangeMinimum1;
      range_max?: RangeMaximum1;
      [k: string]: unknown;
    };
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFC_rangeXYZ".
 */
export type CFCRangeXYZ = [] | [X2] | [X2, Y2] | [X2, Y2, Z1];
/**
 * The entity definition of this entity's babies.
 */
export type BabyType1 = string;
/**
 * The entity definition of this entity's mate.
 */
export type MateType1 = string;
/**
 * The block types required nearby for the entity to breed.
 */
export type Blocks3 = BlockReference13[] | BlockReference14;
/**
 * A minecraft block reference.
 */
export type BlockReference13 = (BlockIdentifier | BlockReference1) & string;
/**
 * A minecraft block reference.
 */
export type BlockReference14 = (BlockIdentifier | BlockReference1) & string;
/**
 * The number of the required block types nearby for the entity to breed.
 */
export type Count1 = number;
/**
 * How many blocks radius from the mob's center to search in for the required blocks. Bounded between 0 and 16.
 */
export type Radius4 = number;
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFE".
 */
export type Trigger43 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFG".
 */
export type Trigger44 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFH".
 */
export type Trigger45 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFI".
 */
export type Trigger46 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFJ".
 */
export type Trigger47 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGA".
 */
export type Trigger48 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGB".
 */
export type Trigger49 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGC".
 */
export type Trigger50 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGD".
 */
export type Trigger51 = string | Trigger | Trigger1[];
/**
 * Trigger to fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGE".
 */
export type Trigger52 = string | Trigger | Trigger1[];
/**
 * An vector of 3 number.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHF".
 */
export type VectorOf3Items = [] | [X3] | [X3, Y3] | [X3, Y3, Z2];
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDH".
 */
export type EntityTypes16 = EntityType1[] | EntityType1;
/**
 * Conditions that make this target a valid type.
 */
export type Filters39 = BFGroupsSpec[] | BFFiltersSpec;
/**
 * To be a valid target choice, the target type cannot be farther away from this entity than `max_dist`.
 */
export type MaximumDist2 = number;
/**
 * Determines if target-validity requires this entity to be in range only, or both in range and in sight.
 */
export type MustSee5 = boolean;
/**
 * Time (in seconds) the target must not be seen by this entity to become invalid. Used only if `must_see` is true.
 */
export type MustSeeForgetDuration4 = boolean & number;

/**
 * The minecraft entity behavior specification.
 */
export interface EntityBehavior {
  use_beta_features?: UseBetaFeatures;
  format_version: FormatVersion;
  "minecraft:entity": Entity;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "B".
 */
export interface Entity {
  description: Description;
  component_groups?: ComponentGroups;
  components?: Component1;
  events?: Events;
  upgrades?: Upgrades1;
}
/**
 * The description of the this entity.
 */
export interface Description {
  animations?: Animations;
  identifier: Identifier;
  is_spawnable?: IsSpawnable;
  is_summonable?: IsSummonableProperty;
  is_experimental?: IsExperimental;
  properties?: Properties;
  runtime_identifier?: RuntimeIdentifier;
  scripts?: Scripts;
  /**
   * At the moment, not fully implemented and does nothing. Recommended to leave it empty or set it to misc
   */
  spawn_category?:
    | "monster"
    | "creature"
    | "ambient"
    | "axolotls"
    | "underground_water_creature"
    | "water_creature"
    | "water_ambient"
    | "misc";
  entity_version?: EntityVersion;
  [k: string]: unknown;
}
/**
 * Sets the mapping of internal animation / animation controllers references to actual animations. This is a JSON Object of name/animation pairs
 */
export interface Animations {
  [k: string]: AnimationController;
}
/**
 * List of entity property definitions.
 */
export interface Properties {
  [k: string]:
    | {
        type?: "bool";
        default?: Default;
        [k: string]: unknown;
      }
    | {
        type?: "int";
        default?: Default1;
        range?: Range;
        [k: string]: unknown;
      }
    | {
        type?: "float";
        default?: Default2;
        range?: Range1;
        [k: string]: unknown;
      }
    | {
        type?: "enum";
        default?: string;
        client_sync?: ClientSync;
        values?: Values;
        [k: string]: unknown;
      };
}
/**
 * Sets the mapping of internal animation controller references to actual animation controller. This is a JSON Array of name/animation-controller pairs
 */
export interface Scripts {
  animate?: Animate;
  [k: string]: unknown;
}
/**
 * A conditional statement to run the animation under a specified condition.
 */
export interface ConditionalAnimation {
  [k: string]: Animation1;
}
/**
 * Enables per-entity versioning and upgrade handling
 */
export interface EntityVersion {
  upgrades?: Upgrades;
}
/**
 * Each group when add / remove the default components.
 */
export interface ComponentGroups {
  [k: string]: Component;
}
/**
 * The components that are added as the foundation of the entity.
 */
export interface Component {
  "minecraft:absorption"?: Attribute;
  "minecraft:addrider"?: AddRider;
  "minecraft:admire_item"?: AdmireItem;
  "minecraft:ageable"?: Ageable;
  "minecraft:air_drag_modifier"?: AirDragModifier;
  "minecraft:ambient_sound_interval"?: AmbientSoundInterval;
  "minecraft:anger_level"?: AngerLevel;
  "minecraft:angry"?: Angry;
  "minecraft:annotation.break_door"?: AnnotationBreakDoor;
  "minecraft:annotation.open_door"?: AnnotationOpenDoor;
  "minecraft:apply_knockback_rules"?: ApplyKnockbackRules;
  "minecraft:area_attack"?: AreaAttack;
  "minecraft:attack_cooldown"?: AttackCooldown;
  "minecraft:attack_damage"?: Attribute;
  "minecraft:attack"?: Attack;
  "minecraft:balloonable"?: Balloonable;
  "minecraft:barter"?: Barter;
  "minecraft:block_climber"?: BlockClimber;
  "minecraft:block_sensor"?: BlockSensor;
  "minecraft:body_rotation_always_follows_head"?: BodyRotationAlwaysFollowsHead;
  "minecraft:body_rotation_blocked"?: BodyRotationBlocked;
  "minecraft:boostable"?: Boostable;
  "minecraft:boss"?: Boss;
  "minecraft:bounciness"?: Bounciness;
  "minecraft:break_blocks"?: BreakBlocks;
  "minecraft:breathable"?: Breathable;
  "minecraft:breedable"?: Breedable;
  "minecraft:bribeable"?: Bribeable;
  "minecraft:buoyant"?: Buoyant;
  "minecraft:burns_in_daylight"?: BurnsInDaylight;
  "minecraft:can_climb"?: CanClimb;
  "minecraft:can_fly"?: CanFly;
  "minecraft:can_join_raid"?: CanJoinRaid;
  "minecraft:can_power_jump"?: CanPowerJump;
  "minecraft:cannot_be_attacked"?: CannotBeAttacked;
  "minecraft:celebrate_hunt"?: CelebrateHunt;
  "minecraft:collision_box"?: CollisionBox;
  "minecraft:color"?: Color;
  "minecraft:color2"?: Color0;
  "minecraft:combat_regeneration"?: CombatRegeneration;
  "minecraft:conditional_bandwidth_optimization"?: ConditionalBandwidthOptimization;
  "minecraft:custom_hit_test"?: CustomHitTest;
  "minecraft:damage_over_time"?: DamageOverTime;
  "minecraft:damage_sensor"?: DamageSensor;
  "minecraft:dash_action"?: DashAction;
  "minecraft:default_look_angle"?: DefaultLookAngle;
  "minecraft:despawn"?: Despawn;
  "minecraft:dimension_bound"?: DimensionBound;
  "minecraft:drying_out_timer"?: DryingOutTimer;
  "minecraft:dweller"?: Dweller;
  "minecraft:economy_trade_table"?: EconomyTradeTable;
  "minecraft:entity_sensor"?: EntitySensor;
  "minecraft:environment_sensor"?: EnvironmentSensor;
  "minecraft:equip_item"?: EquipItem;
  "minecraft:equipment"?: Equipment;
  "minecraft:equippable"?: Equippable;
  "minecraft:exhaustion_values"?: ExhaustionValues;
  "minecraft:experience_reward"?: ExperienceReward;
  "minecraft:explode"?: Explode;
  "minecraft:fall_damage"?: FallDamage;
  "minecraft:fire_immune"?: FireImmune;
  "minecraft:floats_in_liquid"?: FloatsInLiquid;
  "minecraft:flocking"?: Flocking;
  "minecraft:flying_speed"?: FlyingSpeed;
  "minecraft:follow_range"?: Attribute;
  "minecraft:friction_modifier"?: FrictionModifier;
  "minecraft:game_event_movement_tracking"?: GameEventMovementTracking;
  "minecraft:genetics"?: Genetics;
  "minecraft:giveable"?: Giveable;
  "minecraft:ground_offset"?: GroundOffset;
  "minecraft:ignore_cannot_be_attacked"?: IgnoreCannotBeAttacked;
  "minecraft:group_size"?: GroupSize;
  "minecraft:grows_crop"?: GrowsCrop;
  "minecraft:healable"?: Healable;
  "minecraft:health"?: Attribute;
  "minecraft:heartbeat"?: Heartbeat;
  "minecraft:hide"?: Hide;
  "minecraft:home"?: Home;
  "minecraft:horse.jump_strength"?: HorseJumpStrength;
  "minecraft:hurt_on_condition"?: HurtOnCondition;
  "minecraft:hurt_when_wet"?: HurtWhenWet;
  "minecraft:free_camera_controlled"?: FreeCameraControlled;
  "minecraft:input_ground_controlled"?: InputGroundControlled;
  "minecraft:inside_block_notifier"?: InsideBlockNotifier;
  "minecraft:insomnia"?: Insomnia;
  "minecraft:instant_despawn"?: InstantDespawn;
  "minecraft:interact"?: Interact;
  "minecraft:inventory"?: Inventory;
  "minecraft:is_baby"?: IsBaby;
  "minecraft:is_charged"?: IsCharged;
  "minecraft:is_chested"?: IsChested;
  "minecraft:is_collidable"?: IsCollidable;
  "minecraft:is_dyeable"?: IsDyeable;
  "minecraft:is_hidden_when_invisible"?: IsHiddenWhenInvisible;
  "minecraft:is_ignited"?: IsIgnited;
  "minecraft:is_illager_captain"?: IsIllagerCaptain;
  "minecraft:is_pregnant"?: IsPregnant;
  "minecraft:is_saddled"?: IsSaddled;
  "minecraft:is_shaking"?: IsShaking;
  "minecraft:is_sheared"?: IsSheared;
  "minecraft:is_stackable"?: IsStackable;
  "minecraft:is_stunned"?: IsStunned;
  "minecraft:is_tamed"?: IsTamed;
  "minecraft:item_controllable"?: ItemControllable;
  "minecraft:item_hopper"?: ItemHopper;
  "minecraft:jump.dynamic"?: JumpDynamic;
  "minecraft:jump.static"?: JumpStatic;
  "minecraft:leashable_to"?: LeashableTo;
  "minecraft:knockback_resistance"?: Attribute;
  "minecraft:lava_movement"?: Attribute;
  "minecraft:leashable"?: Leashable;
  "minecraft:looked_at"?: LookedAt;
  "minecraft:loot"?: Loot;
  "minecraft:luck"?: Attribute;
  "minecraft:managed_wandering_trader"?: ManagedWanderingTrader;
  "minecraft:mark_variant"?: MarkVariant;
  "minecraft:mob_effect"?: MobEffect;
  "minecraft:mob_effect_immunity"?: MobEffectImmunity;
  "minecraft:movement_sound_distance_offset"?: MovementSoundDistanceOffset;
  "minecraft:movement.amphibious"?: MovementAmphibious;
  "minecraft:movement.basic"?: MovementBasic;
  "minecraft:movement.fly"?: MovementFly;
  "minecraft:movement.generic"?: MovementGeneric;
  "minecraft:movement.glide"?: MovementGlide;
  "minecraft:movement.hover"?: MovementHover;
  "minecraft:movement.jump"?: MovementJump;
  "minecraft:movement.skip"?: MovementSkip;
  "minecraft:movement.sway"?: MovementSway;
  "minecraft:movement"?: Attribute;
  "minecraft:nameable"?: Nameable;
  "minecraft:navigation.climb"?: NavigationClimb;
  "minecraft:navigation.float"?: NavigationFloat;
  "minecraft:navigation.fly"?: NavigationFly;
  "minecraft:navigation.generic"?: NavigationGeneric;
  "minecraft:navigation.hover"?: NavigationHover;
  "minecraft:navigation.swim"?: NavigationSwim;
  "minecraft:navigation.walk"?: NavigationWalk;
  "minecraft:npc"?: Npc;
  "minecraft:offspring"?: Offspring;
  "minecraft:on_death"?: OnDeath1;
  "minecraft:on_equipment_changed"?: OnEquipmentChanged;
  "minecraft:on_friendly_anger"?: OnFriendlyAnger;
  "minecraft:on_hurt_by_player"?: OnHurtByPlayer;
  "minecraft:on_hurt"?: OnHurt;
  "minecraft:on_ignite"?: OnIgnite;
  "minecraft:on_start_landing"?: OnStartLanding;
  "minecraft:on_start_takeoff"?: OnStartTakeoff;
  "minecraft:on_target_acquired"?: OnTargetAcquired;
  "minecraft:on_target_escape"?: OnTargetEscape;
  "minecraft:on_wake_with_owner"?: OnWakeWithOwner;
  "minecraft:out_of_control"?: OutOfControl;
  "minecraft:peek"?: Peek;
  "minecraft:persistent"?: Persistent;
  "minecraft:physics"?: Physics;
  "minecraft:player.exhaustion"?: PlayerExhaustion;
  "minecraft:player.experience"?: PlayerExperience;
  "minecraft:player.level"?: PlayerLevel;
  "minecraft:player.saturation"?: PlayerSaturation;
  "minecraft:preferred_path"?: PreferredPath;
  "minecraft:projectile"?: Projectile;
  "minecraft:push_through"?: PushThrough;
  "minecraft:pushable_by_block"?: PushableByBlock;
  "minecraft:pushable_by_entity"?: PushableByEntity;
  "minecraft:raid_trigger"?: RaidTrigger;
  "minecraft:rail_movement"?: RailMovement;
  "minecraft:rail_sensor"?: RailSensor;
  "minecraft:ravager_blocked"?: RavagerBlocked;
  "minecraft:rideable"?: Rideable;
  "minecraft:rotation_axis_aligned"?: BodyRotationAxisAligned;
  "minecraft:rotation_locked_to_vehicle"?: RotationLockedToVehicle;
  "minecraft:reflect_projectiles"?: ReflectProjectiles;
  "minecraft:remove_in_peaceful"?: RemoveInPeaceful;
  "minecraft:renders_when_invisible"?: RendersWhenInvisible;
  "minecraft:scale_by_age"?: ScaleByAge;
  "minecraft:scale"?: Scale2;
  "minecraft:scheduler"?: Scheduler;
  "minecraft:shareables"?: Shareables;
  "minecraft:shooter"?: Shooter;
  "minecraft:sittable"?: Sittable;
  "minecraft:skin_id"?: SkinId;
  "minecraft:sound_volume"?: SoundVolume;
  "minecraft:spawn_egg_interaction"?: SpawnEggInteraction;
  "minecraft:spawn_entity"?: SpawnEntity;
  "minecraft:spawn_on_death"?: SpawnOnDeath;
  "minecraft:spell_effects"?: SpellEffects;
  "minecraft:strength"?: Strength;
  "minecraft:suspect_tracking"?: SuspectTracking;
  "minecraft:tameable"?: Tameable;
  "minecraft:tamemount"?: Tamemount;
  "minecraft:target_nearby_sensor"?: TargetNearbySensor;
  "minecraft:teleport"?: Teleport;
  "minecraft:tick_world"?: TickWorld;
  "minecraft:timer"?: Timer;
  "minecraft:trade_resupply"?: TradeResupply;
  "minecraft:trade_table"?: TradeTable;
  "minecraft:trail"?: Trail;
  "minecraft:transformation"?: Transformation;
  "minecraft:transient"?: Transient;
  "minecraft:trust"?: Trust;
  "minecraft:trusting"?: Trusting;
  "minecraft:type_family"?: TypeFamily;
  "minecraft:uses_legacy_friction"?: UsesLegacyFriction;
  "minecraft:uses_uniform_air_drag"?: UsesUniformAirDrag;
  "minecraft:underwater_movement"?: Attribute;
  "minecraft:variable_max_auto_step"?: VariableMaxAutoStep;
  "minecraft:variant"?: Variant2;
  "minecraft:vertical_movement_action"?: VerticalMovementAction;
  "minecraft:vibration_damper"?: VibrationDamper;
  "minecraft:vibration_listener"?: VibrationListener;
  "minecraft:walk_animation_speed"?: WalkAnimationSpeed;
  "minecraft:wants_jockey"?: WantsJockey;
  "minecraft:water_movement"?: WaterMovement;
  "minecraft:behavior.admire_item"?: AdmireItem1;
  "minecraft:behavior.aquatic_charge_attack"?: AquaticChargeAttack;
  "minecraft:behavior.avoid_block"?: AvoidBlock;
  "minecraft:behavior.avoid_mob_type"?: AvoidMobType;
  "minecraft:behavior.barter"?: Barter3;
  "minecraft:behavior.beg"?: Beg;
  "minecraft:behavior.break_door"?: BreakDoor;
  "minecraft:behavior.breed"?: Breed;
  "minecraft:behavior.celebrate_survive"?: CelebrateSurvive;
  "minecraft:behavior.celebrate"?: Celebrate;
  "minecraft:behavior.charge_attack"?: ChargeAttack;
  "minecraft:behavior.charge_held_item"?: ChargeHeldItem;
  "minecraft:behavior.circle_around_anchor"?: CircleAroundAnchor;
  "minecraft:behavior.controlled_by_player"?: ControlledByPlayer;
  "minecraft:behavior.croak"?: Croak;
  "minecraft:behavior.defend_trusted_target"?: DefendTrustedTarget;
  "minecraft:behavior.defend_village_target"?: DefendVillageTarget;
  "minecraft:behavior.delayed_attack"?: DelayedAttack;
  "minecraft:behavior.dig"?: Dig;
  "minecraft:behavior.door_interact"?: DoorInteract;
  "minecraft:behavior.dragonchargeplayer"?: Dragonchargeplayer;
  "minecraft:behavior.dragondeath"?: Dragondeath;
  "minecraft:behavior.dragonflaming"?: Dragonflaming;
  "minecraft:behavior.dragonholdingpattern"?: Dragonholdingpattern;
  "minecraft:behavior.dragonlanding"?: Dragonlanding;
  "minecraft:behavior.dragonscanning"?: Dragonscanning;
  "minecraft:behavior.dragonstrafeplayer"?: Dragonstrafeplayer;
  "minecraft:behavior.dragontakeoff"?: Dragontakeoff;
  "minecraft:behavior.drink_milk"?: DrinkMilk;
  "minecraft:behavior.drink_potion"?: DrinkPotion;
  "minecraft:behavior.drop_item_for"?: DropItemFor;
  "minecraft:behavior.eat_block"?: EatBlock;
  "minecraft:behavior.eat_carried_item"?: EatCarriedItem;
  "minecraft:behavior.eat_mob"?: EatMob;
  "minecraft:behavior.emerge"?: Emerge;
  "minecraft:behavior.equip_item"?: EquipItem1;
  "minecraft:behavior.explore_outskirts"?: ExploreOutskirts;
  "minecraft:behavior.fertilize_farm_block"?: FertilizeFarmBlock;
  "minecraft:behavior.find_cover"?: FindCover;
  "minecraft:behavior.find_mount"?: FindMount;
  "minecraft:behavior.find_underwater_treasure"?: FindUnderwaterTreasure;
  "minecraft:behavior.fire_at_target"?: FireAtTarget;
  "minecraft:behavior.flee_sun"?: FleeSun;
  "minecraft:behavior.float_wander"?: FloatWander;
  "minecraft:behavior.float"?: Float;
  "minecraft:behavior.float_tempt"?: FloatTempt;
  "minecraft:behavior.follow_caravan"?: FollowCaravan;
  "minecraft:behavior.follow_mob"?: FollowMob;
  "minecraft:behavior.follow_owner"?: FollowOwner;
  "minecraft:behavior.follow_parent"?: FollowParent;
  "minecraft:behavior.follow_target_leader"?: FollowTargetLeader;
  "minecraft:behavior.go_and_give_items_to_noteblock"?: GoAndGiveItemsToNoteblock;
  "minecraft:behavior.go_and_give_items_to_owner"?: GoAndGiveItemsToOwner;
  "minecraft:behavior.go_home"?: GoHome;
  "minecraft:behavior.guardian_attack"?: GuardianAttack;
  "minecraft:behavior.harvest_farm_block"?: HarvestFarmBlock;
  "minecraft:behavior.hide"?: Hide1;
  "minecraft:behavior.hold_ground"?: HoldGround;
  "minecraft:behavior.hurt_by_target"?: HurtByTarget;
  "minecraft:behavior.inspect_bookshelf"?: InspectBookshelf;
  "minecraft:behavior.investigate_suspicious_location"?: InspectBookshelf1;
  "minecraft:behavior.jump_around_target"?: JumpAroundTarget;
  "minecraft:behavior.jump_to_block"?: JumpToBlock;
  "minecraft:behavior.knockback_roar"?: KnockbackRoar;
  "minecraft:behavior.lay_down"?: LayDown;
  "minecraft:behavior.lay_egg"?: LayEgg;
  "minecraft:behavior.leap_at_target"?: LeapAtTarget;
  "minecraft:behavior.look_at_entity"?: LookAtEntity;
  "minecraft:behavior.look_at_player"?: LookAtPlayer;
  "minecraft:behavior.look_at_target"?: LookAtTarget;
  "minecraft:behavior.look_at_trading_player"?: LookAtTradingPlayer;
  "minecraft:behavior.make_love"?: MakeLove;
  "minecraft:behavior.melee_attack"?: MeleeAttack;
  "minecraft:behavior.melee_box_attack"?: MeleeBoxAttack;
  "minecraft:behavior.mingle"?: Mingle;
  "minecraft:behavior.mount_pathing"?: MountPathing;
  "minecraft:behavior.move_indoors"?: MoveIndoors;
  "minecraft:behavior.move_outdoors"?: MoveOutdoors;
  "minecraft:behavior.move_through_village"?: MoveThroughVillage;
  "minecraft:behavior.move_to_block"?: MoveToBlock;
  "minecraft:behavior.move_to_land"?: MoveToLand;
  "minecraft:behavior.move_to_lava"?: MoveToLava;
  "minecraft:behavior.move_to_liquid"?: MoveToLiquid;
  "minecraft:behavior.move_to_poi"?: MoveToPoi;
  "minecraft:behavior.move_to_random_block"?: MoveToRandomBlock;
  "minecraft:behavior.move_to_village"?: MoveToVillage;
  "minecraft:behavior.move_to_water"?: MoveToWater;
  "minecraft:behavior.move_towards_dwelling_restriction"?: MoveTowardsDwellingRestriction;
  "minecraft:behavior.move_towards_home_restriction"?: MoveTowardsHomeRestriction;
  "minecraft:behavior.move_towards_restriction"?: MoveTowardsRestriction;
  "minecraft:behavior.move_towards_target"?: MoveTowardsTarget;
  "minecraft:behavior.nap"?: Nap;
  "minecraft:behavior.nearest_attackable_target"?: NearestAttackableTarget;
  "minecraft:behavior.nearest_prioritized_attackable_target"?: NearestPrioritizedAttackableTarget;
  "minecraft:behavior.ocelot_sit_on_block"?: OcelotSitOnBlock;
  "minecraft:behavior.ocelotattack"?: Ocelotattack;
  "minecraft:behavior.offer_flower"?: OfferFlower;
  "minecraft:behavior.open_door"?: OpenDoor;
  "minecraft:behavior.owner_hurt_by_target"?: OwnerHurtByTarget;
  "minecraft:behavior.owner_hurt_target"?: OwnerHurtTarget;
  "minecraft:behavior.panic"?: Panic;
  "minecraft:behavior.pet_sleep_with_owner"?: PetSleepWithOwner;
  "minecraft:behavior.pickup_items"?: PickupItems;
  "minecraft:behavior.place_block"?: PlaceBlock;
  "minecraft:behavior.play_dead"?: PlayDead;
  "minecraft:behavior.play"?: Play;
  "minecraft:behavior.player_ride_tamed"?: PlayerRideTamed;
  "minecraft:behavior.raid_garden"?: RaidGarden;
  "minecraft:behavior.ram_attack"?: RamAttack;
  "minecraft:behavior.random_breach"?: RandomBreach;
  "minecraft:behavior.random_fly"?: RandomFly;
  "minecraft:behavior.random_hover"?: RandomHover;
  "minecraft:behavior.random_look_around_and_sit"?: RandomLookAroundAndSit;
  "minecraft:behavior.random_look_around"?: RandomLookAround;
  "minecraft:behavior.random_search_and_dig"?: RandomLookAround1;
  "minecraft:behavior.random_sitting"?: RandomSitting;
  "minecraft:behavior.random_stroll"?: RandomStroll;
  "minecraft:behavior.random_swim"?: RandomSwim;
  "minecraft:behavior.ranged_attack"?: RangedAttack;
  "minecraft:behavior.receive_love"?: ReceiveLove;
  "minecraft:behavior.restrict_open_door"?: RestrictOpenDoor;
  "minecraft:behavior.restrict_sun"?: RestrictSun;
  "minecraft:behavior.rise_to_liquid_level"?: RiseToLiquidLevel;
  "minecraft:behavior.roar"?: Roar;
  "minecraft:behavior.roll"?: Roll;
  "minecraft:behavior.run_around_like_crazy"?: RunAroundLikeCrazy;
  "minecraft:behavior.scared"?: Scared;
  "minecraft:behavior.send_event"?: SendEvent;
  "minecraft:behavior.share_items"?: ShareItems;
  "minecraft:behavior.silverfish_merge_with_stone"?: SilverfishMergeWithStone;
  "minecraft:behavior.silverfish_wake_up_friends"?: SilverfishWakeUpFriends;
  "minecraft:behavior.skeleton_horse_trap"?: SkeletonHorseTrap;
  "minecraft:behavior.sleep"?: Sleep;
  "minecraft:behavior.slime_attack"?: SlimeAttack;
  "minecraft:behavior.slime_float"?: SlimeFloat;
  "minecraft:behavior.slime_keep_on_jumping"?: SlimeKeepOnJumping;
  "minecraft:behavior.slime_random_direction"?: SlimeRandomDirection;
  "minecraft:behavior.snacking"?: Snacking;
  "minecraft:behavior.sneeze"?: Sneeze;
  "minecraft:behavior.sniff"?: Sniff;
  "minecraft:behavior.sonic_boom"?: SonicBoom;
  "minecraft:behavior.squid_dive"?: SquidDive;
  "minecraft:behavior.squid_flee"?: SquidFlee;
  "minecraft:behavior.squid_idle"?: SquidIdle;
  "minecraft:behavior.squid_move_away_from_ground"?: SquidMoveAwayFromGround;
  "minecraft:behavior.squid_out_of_water"?: SquidOutOfWater;
  "minecraft:behavior.stalk_and_pounce_on_target"?: StalkAndPounceOnTarget;
  "minecraft:behavior.stay_near_noteblock"?: StayNearNoteblock;
  "minecraft:behavior.stay_while_sitting"?: StayWhileSitting;
  "minecraft:behavior.stomp_attack"?: StompAttack;
  "minecraft:behavior.stomp_turtle_egg"?: StompTurtleEgg;
  "minecraft:behavior.stroll_towards_village"?: StrollTowardsVillage;
  "minecraft:behavior.summon_entity"?: SummonEntity;
  "minecraft:behavior.swell"?: Swell;
  "minecraft:behavior.swim_idle"?: SwimIdle;
  "minecraft:behavior.swim_up_for_breath"?: SwimUpForBreath;
  "minecraft:behavior.swim_wander"?: SwimWander;
  "minecraft:behavior.swim_with_entity"?: SwimWithEntity;
  "minecraft:behavior.swoop_attack"?: SwoopAttack;
  "minecraft:behavior.take_block"?: TakeBlock;
  "minecraft:behavior.take_flower"?: TakeFlower;
  "minecraft:behavior.teleport_to_owner"?: TeleportToOwner;
  "minecraft:behavior.move_around_target"?: MoveAroundTarget;
  "minecraft:behavior.target_when_pushed"?: TargetWhenPushed;
  "minecraft:behavior.tempt"?: Tempt;
  "minecraft:behavior.timer_flag_1"?: TimerFlag;
  "minecraft:behavior.timer_flag_2"?: TimerFlag;
  "minecraft:behavior.timer_flag_3"?: TimerFlag;
  "minecraft:behavior.trade_interest"?: TradeInterest;
  "minecraft:behavior.trade_with_player"?: TradeWithPlayer;
  "minecraft:behavior.transport_items"?: TransportItems;
  "minecraft:behavior.use_kinetic_weapon"?: UseKineticWeapon;
  "minecraft:behavior.vex_copy_owner_target"?: VexCopyOwnerTarget;
  "minecraft:behavior.vex_random_move"?: VexRandomMove;
  "minecraft:behavior.wither_random_attack_pos_goal"?: WitherRandomAttackPosGoal;
  "minecraft:behavior.wither_target_highest_damage"?: WitherTargetHighestDamage;
  "minecraft:behavior.work"?: Work;
  "minecraft:behavior.work_composter"?: WorkComposter;
}
/**
 * Specifies the initial value of a specific attribute for an entity when spawned.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "G".
 */
export interface Attribute {
  min?: Minimum;
  max?: Maximum;
  value?: Value;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "I_entry".
 */
export interface IEntry {
  entity_type: EntityType;
  spawn_event?: SpawnEvent;
}
/**
 * Causes the mob to ignore attackable targets for a given duration.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "J".
 */
export interface AdmireItem {
  cooldown_after_being_attacked?: CooldownAfterBeingAttacked;
  duration?: Duration;
}
/**
 * Adds a timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by feedItems.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface Ageable {
  drop_items?: DropItems;
  pause_growth_items?: PauseGrowthItems;
  reset_growth_items?: ResetGrowthItems;
  duration?: Duration1;
  feed_items?: FeedItems;
  grow_up?: GrowUp;
  reset_growth?: ResetGrowth;
  pause_growth?: PauseGrowth;
  interact_filters?: InteractFilters;
}
/**
 * An object that describes an item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BB_object_item_descriptor".
 */
export interface ItemDescriptor {
  item?: ItemIdentifier1 | ItemDescriptor1;
  tags?: Molang;
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
  tags?: Molang;
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
  tags?: Molang;
  /**
   * [UNDOCUMENTED] A tag to lookup item or block by.
   */
  item_tag?: string;
}
/**
 * Event to run when this entity grows up.
 */
export interface GrowUp {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to run when aging is reset for baby entities
 */
export interface ResetGrowth {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to run when aging is paused for baby entities
 */
export interface PauseGrowth {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines how much does air drag affects this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBH".
 */
export interface AirDragModifier {
  value: Value1;
}
/**
 * Sets the entity's delay between playing its ambient sound.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBI".
 */
export interface AmbientSoundInterval {
  event_name?: EventName;
  /**
   * List of dynamic level sound events, with conditions for choosing between them. Evaluated in order, first one wins. If none evaluate to true, 'event_name' will take precedence.
   */
  event_names?: {
    condition?: Condition;
    event_name?: EventName1;
    [k: string]: unknown;
  }[];
  range?: Range2;
  value?: Value2;
}
/**
 * Allows this entity to track anger towards a set of nuisances
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBJ".
 */
export interface AngerLevel {
  anger_decrement_interval?: AngerDecrementInterval;
  angry_boost?: AngryBoost;
  angry_threshold?: AngryThreshold;
  default_annoyingness?: DefaultAnnoyingness;
  default_projectile_annoyingness?: DefaultProjectileAnnoyingness;
  max_anger?: MaximumAnger;
  nuisance_filter?: NuisanceFilter;
  on_increase_sounds?: OnIncreaseSounds;
  remove_targets_below_angry_threshold?: RemoveTargetsBelowAngryThreshold;
}
/**
 * Defines the entity's 'angry' state using a timer.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCA".
 */
export interface Angry {
  broadcast_anger?: BroadcastAnger;
  broadcast_filters?: BroadcastFilters;
  filters?: Filters1;
  broadcast_range?: BroadcastRange;
  broadcast_targets?: BroadcastTargets;
  calm_event?: CalmEvent;
  angry_sound?: AngrySound;
  broadcast_anger_on_attack?: BroadcastAngerOnAttack;
  broadcast_anger_on_being_attacked?: BroadcastAngerOnBeingAttacked;
  broadcast_anger_when_dying?: BroadcastAngerWhenDying;
  duration?: Duration2;
  duration_delta?: DurationDelta;
  sound_interval?: SoundInterval;
}
/**
 * Event to run after the number of seconds specified in duration expires (when the entity stops being "angry")
 */
export interface CalmEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Allows the actor to break doors assuming that that flags set up for the component to use in navigation.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCC".
 */
export interface AnnotationBreakDoor {
  break_time?: BreakTime;
  min_difficulty?: MinimumDifficulty;
}
/**
 * Allows the actor to open doors assuming that that flags set up for the component to use in navigation.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCD".
 */
export interface AnnotationOpenDoor {}
/**
 * Controls how an entity applies knockback to a target
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCE".
 */
export interface ApplyKnockbackRules {
  presets?: Presets;
}
export interface Preset {
  horizontal_power?: HorizontalPower;
  vertical_power?: VerticalPower;
  vertical_velocity_cap?: VerticalVelocityCap;
  check_if_target_is_immersed_in_water?: CheckIfTargetIsImmersedInWater;
  filter?: Filter;
  slowdown_scale?: SlowdownScale;
  scale_with_damage?: ScaleWithDamage;
  extra_knockback_approach?: EXtraKnockbackApproach;
  knockback_mode?: KnockbackMode;
}
/**
 * A component that does damage to entities that get within range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCF".
 */
export interface AreaAttack {
  cause?: Cause;
  damage_cooldown?: DamageCooldown;
  damage_per_tick?: DamagePerTick;
  damage_range?: DamageRange;
  entity_filter?: EntityFilter;
  play_attack_sound?: PlayAttackSound;
  use_self_as_damage_source?: UseSelfAsDamageSource;
  death_message_override?: DeathMessageOverride;
}
/**
 * Adds a cooldown to a mob. The intention of this cooldown is to be used to prevent the mob from attempting to aquire new attack targets.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCH".
 */
export interface AttackCooldown {
  attack_cooldown_complete_event?: AttackCooldownCompleteEvent;
  attack_cooldown_time?: AttackCooldownTime;
}
export interface Trigger {
  event?: Event1;
  filters?: Filters2;
  target?: Subject;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCI_trigger".
 */
export interface Trigger1 {
  event?: Event1;
  filters?: Filters2;
  target?: Subject;
}
/**
 * Defines an entity's melee attack and any additional effects on it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BCJ".
 */
export interface Attack {
  damage: Damage;
  effect_name?: EffectName;
  effect_duration?: EffectDuration;
  effect_amplifier?: EffectAmplifier;
}
/**
 * allows the entity to have a balloon attached and defines the conditions and events for the entity when is ballooned.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDA".
 */
export interface Balloonable {
  soft_distance?: SoftDistance;
  max_distance?: MaxDistance;
  on_balloon?: OnBalloon;
  on_unballoon?: OnUnballoon;
  mass?: Mass;
}
/**
 * Enables the component to drop an item as a barter exchange.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDB".
 */
export interface Barter {
  barter_table?: BarterTable;
  cooldown_after_being_attacked?: CooldownAfterBeingAttacked1;
}
/**
 * Allows the player to detect and manuever on the scaffolding block.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDC".
 */
export interface BlockClimber {}
/**
 * Fires off a specified event when a block in the block list is broken within the sensor range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDD".
 */
export interface BlockSensor {
  sensor_radius?: SensorRadius;
  on_break?: OnBreak;
  sources?: Sources;
}
/**
 * Event to run when a block breaks.
 */
export interface OnBlockBroken {
  block_list?: BlockList;
  on_block_broken?: OnBlockBroken1;
}
/**
 * Causes the entity's body to always be automatically rotated to align with the entity's head. Does not override the "minecraft:body_rotation_blocked" component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDF".
 */
export interface BodyRotationAlwaysFollowsHead {}
/**
 * When set, the entity will no longer visually rotate their body to match their facing direction.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDG".
 */
export interface BodyRotationBlocked {}
/**
 * Defines the conditions and behavior of a rideable entity's boost.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDH".
 */
export interface Boostable {
  duration?: Duration3;
  speed_multiplier?: SpeedMultiplier;
  boost_items?: BoostItems;
}
/**
 * The current state of the boss for updating the boss HUD.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDI".
 */
export interface Boss {
  hud_range?: HudRange;
  name?: Name1;
  should_darken_sky?: ShouldDarkenSky;
}
/**
 * Controls how an entity bounces when colliding with surfaces
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BDJ".
 */
export interface Bounciness {
  value: Value3;
}
/**
 * Specifies the blocks that this entity can break as it moves around.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEA".
 */
export interface BreakBlocks {
  breakable_blocks?: BreakableBlocks;
}
/**
 * Defines what blocks this entity can breathe in and gives them the ability to suffocate.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEC".
 */
export interface Breathable {
  total_supply?: TotalSupply;
  suffocate_time?: SuffocateTime;
  inhale_time?: InhaleTime;
  breathes_air?: BreathesAir;
  breathes_water?: BreathesWater;
  can_dehydrate?: CanDehydrate;
  breathes_lava?: BreathesLava;
  breathes_solids?: BreathesSolids;
  generates_bubbles?: GeneratesBubbles;
  breathe_blocks?: BreatheBlocks;
  non_breathe_blocks?: NonBreathesBlocks;
}
export interface BlockReference1 {
  name?: BlockIdentifier1;
  states?: States;
  tags?: Molang1;
}
export interface States {
  [k: string]: StateValue;
}
/**
 * Defines the way an entity can get into the `love` state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEE".
 */
export interface Breedable {
  allow_sitting?: AllowSitting;
  breed_cooldown?: BreedCooldown;
  breed_items?: BreedItems;
  breeds_with?: BreedsWith;
  causes_pregnancy?: CausesPregnancy;
  environment_requirements?: EnvironmentRequirements;
  extra_baby_chance?: ExtraBabyChance;
  love_filters?: Filters4;
  require_full_health?: RequireFullHealth;
  require_tame?: RequireTame;
}
/**
 * An entity definitions that this entity can breed with.
 */
export interface BEEBreedsWithSpec {
  baby_type?: BabyType;
  breed_event?: BreedEvent;
  mate_type?: MateType;
  [k: string]: unknown;
}
/**
 * Event to run when this entity breeds.
 */
export interface BreedEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * An entity definitions that this entity can breed with.
 */
export interface BEEBreedsWithSpec1 {
  baby_type?: BabyType;
  breed_event?: BreedEvent;
  mate_type?: MateType;
  [k: string]: unknown;
}
/**
 * A nearby block requirements to get the entity into the `love` state.
 */
export interface EnvironmentRequirements1 {
  blocks?: Blocks;
  count?: Count;
  radius?: Radius;
  [k: string]: unknown;
}
/**
 * A nearby block requirements to get the entity into the `love` state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEE_enviroment_requirements".
 */
export interface EnvironmentRequirements2 {
  blocks?: Blocks;
  count?: Count;
  radius?: Radius;
  [k: string]: unknown;
}
/**
 * Defines the way an entity can get into the 'bribed' state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEF".
 */
export interface Bribeable {
  bribe_cooldown?: BribeCooldown;
  bribe_items?: BribeItems;
}
/**
 * Enables an entity to float on the specified liquid blocks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEG".
 */
export interface Buoyant {
  base_buoyancy?: BaseBuoyancy;
  apply_gravity?: ApplyGravity;
  buoyancy?: BaseBuoyancy1;
  big_wave_probability?: BigWaveProbability;
  big_wave_speed?: BigWaveSpeed;
  drag_down_on_buoyancy_removed?: DragDownOnBuoyancyRemoved;
  liquid_blocks?: LiquidBlocks;
  movement_type?: MovementType;
  can_auto_step_from_liquid?: CanAutoStepFromLiquid;
}
/**
 * Allows this entity to climb up ladders.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEI".
 */
export interface CanClimb {}
/**
 * Sets that this entity can join a raid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFA".
 */
export interface CanJoinRaid {}
/**
 * Allows the entity to power jump like the horse does in vanilla.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFB".
 */
export interface CanPowerJump {}
/**
 * When set, blocks entities from attacking the owner entity unless they have the "minecraft:ignore_cannot_be_attacked" component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFC".
 */
export interface CannotBeAttacked {}
/**
 * Specifies hunt celebration behavior.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFD".
 */
export interface CelebrateHunt {
  broadcast?: Broadcast;
  celebration_targets?: Filters5;
  celebrate_sound?: CelebrateSound;
  duration?: Duration4;
  radius?: Radius1;
  sound_interval?: SoundInterval1;
}
/**
 * Sets the width and height of the Entity's collision box.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFE".
 */
export interface CollisionBox {
  height?: Height;
  width?: Width;
}
/**
 * Defines the entity's color. Only works on vanilla entities that have predefined color values (sheep, llama, shulker).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFF".
 */
export interface Color {
  value?: Value4;
}
/**
 * Defines the entity's second texture color. Only works on vanilla entities that have a second predefined color values (tropical fish).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFG".
 */
export interface Color0 {
  value?: Value5;
}
/**
 * Gives Regeneration I and removes Mining Fatigue from the mob that kills the Actor`s attack target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFH".
 */
export interface CombatRegeneration {
  apply_to_family?: ApplyToFamily;
  apply_to_self?: ApplyToSelf;
  regeneration_duration?: RegenerationDuration;
}
/**
 * Defines the Conditional Spatial Update Bandwidth Optimizations of this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFI".
 */
export interface ConditionalBandwidthOptimization {
  conditional_values?: ConditionalValues;
  default_values?: DefaultValues;
}
/**
 * The object containing the conditional bandwidth optimization values.
 */
export interface ConditionalValue {
  max_dropped_ticks?: MaximumDroppedTicks;
  max_optimized_distance?: MaximumOptimizedDistance;
  use_motion_prediction_hints?: UseMotionPredictionHints;
  conditional_values?: ConditionalValues1;
}
/**
 * The object containing the default bandwidth optimization values.
 */
export interface DefaultValues {
  max_dropped_ticks?: MaximumDroppedTicks1;
  max_optimized_distance?: MaximumOptimizedDistance1;
  use_motion_prediction_hints?: UseMotionPredictionHints1;
}
/**
 * List of hitboxes for melee and ranged hits against the entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BFJ".
 */
export interface CustomHitTest {
  hitboxes?: Hitboxes;
}
/**
 * Defines a hitbox size and pivot to test against.
 */
export interface Hitbox {
  width?: Width1;
  height?: Height1;
  pivot?: Pivot;
}
/**
 * Applies defined amount of damage to the entity at specified intervals.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGA".
 */
export interface DamageOverTime {
  damage_per_hurt?: DamagePerHurt;
  time_between_hurt?: TimeBetweenHurt;
}
/**
 * Defines what events to call when this entity is damaged by specific entities or items.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGB".
 */
export interface DamageSensor {
  triggers?: Triggers;
}
/**
 * List of triggers with the events to call when taking specific kinds of damage.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGB_triggers".
 */
export interface Triggers1 {
  cause?: Cause1;
  damage_modifier?: DamageModifier;
  damage_multiplier?: DamageMultiplier;
  deals_damage?: DealsDamage;
  on_damage?: OnDamage;
  on_damage_sound_event?: OnDamageSoundEvent;
}
/**
 * List of triggers with the events to call when taking specific kinds of damage.
 */
export interface Triggers2 {
  cause?: Cause1;
  damage_modifier?: DamageModifier;
  damage_multiplier?: DamageMultiplier;
  deals_damage?: DealsDamage;
  on_damage?: OnDamage;
  on_damage_sound_event?: OnDamageSoundEvent;
}
/**
 * Ability for a ridable entity to dash.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGC".
 */
export interface DashAction {
  can_dash_underwater?: CanDashUnderwater;
  cooldown_time?: CooldownTime;
  horizontal_momentum?: HorizoontalMomentum;
  vertical_momentum?: VerticalMomentum;
  direction?: Direction;
}
/**
 * Sets this entity's default head rotation angle.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGD".
 */
export interface DefaultLookAngle {
  value?: Value6;
}
/**
 * Despawns the Actor when the despawn rules or optional filters evaluate to true.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGE".
 */
export interface Despawn {
  despawn_from_chance?: DespawnFromChance;
  despawn_from_distance?: DespawnFromDistance;
  despawn_from_inactivity?: DespawnFromInactivity;
  despawn_from_simulation_edge?: DespawnFromSimulationEdge;
  filters?: Filters6;
  min_range_inactivity_timer?: MinimumRangeInactivityTimer;
  min_range_random_chance?: MinimumRangeRandomChance;
  remove_child_entities?: RemoveChildEntities;
}
/**
 * Defines the minimum and maximum distance for despawn to occur.
 */
export interface DespawnFromDistance {
  max_distance?: MaximumDistance;
  min_distance?: MinimumDistance;
}
/**
 * Restricts entities from moving between dimensions when using Minecraft portals, keeping them bound to their current dimension.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGF".
 */
export interface DimensionBound {}
/**
 * Adds a timer for drying out that will count down and fire `dried_out_event` or will stop as soon as the entity will get under rain or water and fire `stopped_drying_out_event`.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGG".
 */
export interface DryingOutTimer {
  dried_out_event?: DriedOutEvent;
  recover_after_dried_out_event?: RecoverAfterDriedOutEvent;
  stopped_drying_out_event?: StoppedDryingOutEvent;
  total_time?: TotalTime;
  water_bottle_refill_time?: WaterBottleRefillTime;
}
/**
 * Event to fire when the drying out time runs out.
 */
export interface DriedOutEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to fire when entity was already dried out but received increase in water supply.
 */
export interface RecoverAfterDriedOutEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to fire when entity stopped drying out, for example got into water or under rain.
 */
export interface StoppedDryingOutEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Allows a mob to join and migrate between villages and other dwellings.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGH".
 */
export interface Dweller {
  dwelling_type?: DwellingType;
  dweller_role?: DwellingRole;
  update_interval_base?: UpdateIntervalBase;
  update_interval_variant?: UpdateIntervalVariant;
  can_find_poi?: CanFindPoi;
  first_founding_reward?: FirstFoundingReward;
  can_migrate?: CanMigrate;
  dwelling_bounds_tolerance?: DwellingBoundsTolerance;
  preferred_profession?: PreferredProfession;
}
/**
 * Defines this entity's ability to trade with players.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGI".
 */
export interface EconomyTradeTable {
  convert_trades_economy?: ConvertTradesEconomy;
  cured_discount?: CuredDiscount;
  display_name?: DisplayName;
  hero_demand_discount?: HeroDemandDiscount;
  max_cured_discount?: MaximumCuredDiscount;
  max_nearby_cured_discount?: MaximumNearbyCuredDiscount;
  nearby_cured_discount?: NearbyCuredDiscount;
  new_screen?: NewScreen;
  persist_trades?: PersistTrades;
  show_trade_screen?: ShowTradeScreen;
  table?: Table;
  use_legacy_price_formula?: UseLegacyPriceFormula;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BGJ_sensor_element".
 */
export interface EntitySensor1 {
  cooldown?: Cooldown;
  y_offset?: YOffset;
  event_filters?: Filters3;
  event?: Event2;
  maximum_count?: MaximumCount;
  minimum_count?: MinimumCount;
  range?: Range3;
  require_all?: RequireAll;
  sensor_range?: SensorRange;
}
/**
 * Creates a trigger based on environment conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHB".
 */
export interface EnvironmentSensor {
  triggers?: Triggers3;
}
/**
 * The entity puts on the desired equipment.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHC".
 */
export interface EquipItem {
  excluded_items?: ExcludedItems;
  can_wear_armor?: CanWearArmor;
}
/**
 * Sets the equipment table to use for the entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHD".
 */
export interface Equipment {
  slot_drop_chance?: SlotDropChance;
  table?: Table1;
}
/**
 * A slots with the chance to drop an equipped item from that slot.
 */
export interface SlotDropChance1 {
  drop_chance?: DropChance;
  slot?: Slot;
}
/**
 * Defines an entity's behavior for having items equipped to it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHF".
 */
export interface Equippable {
  slots?: Slots;
}
/**
 * A slot and the item that can be equipped.
 */
export interface Slots1 {
  slot?: Slot1;
  accepted_items?: AcceptedItems;
  item?: Item1;
  interact_text?: InteractText;
  on_equip?: OnEquip;
  on_unequip?: OnUnequip;
  [k: string]: unknown;
}
/**
 * Event to trigger when this entity is equipped with this item.
 */
export interface OnEquip {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to trigger when this item is removed from this entity.
 */
export interface OnUnequip {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines how much exhaustion each player action should take.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHG".
 */
export interface ExhaustionValues {
  attack?: Attack1;
  damage?: Damage2;
  heal?: Heal;
  jump?: Jump;
  lunge?: Lunge;
  mine?: Mine;
  sprint?: Sprint;
  sprint_jump?: SprintJump;
  swim?: Swim;
  walk?: Walk;
}
/**
 * Defines the amount of experience rewarded when the entity dies or is successfully bred.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHH".
 */
export interface ExperienceReward {
  on_bred?: OnBred;
  on_death?: OnDeath;
}
/**
 * Defines how the entity explodes.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHI".
 */
export interface Explode {
  allow_underwater?: AllowUnderwater;
  breaks_blocks?: BreaksBlocks;
  causes_fire?: CausesFire;
  damage_scaling?: DamageScaling;
  destroy_affected_by_griefing?: DestroyAffectedByGriefing;
  fire_affected_by_griefing?: FireAffectedByGriefing;
  fuse_length?: FuseLength;
  fuse_lit?: FuseLit;
  knockback_scaling?: KnockbackScaling;
  max_resistance?: MaximumResistance;
  negates_fall_damage?: NegatesFallDamage;
  particle_effect?: ParticleEffect;
  power?: Power;
  sound_effect?: SoundEffect;
  toggles_blocks?: TogglesBlocks;
}
/**
 * UNDOCUMENTED.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BHJ".
 */
export interface FallDamage {
  value?: Value7;
}
/**
 * Sets that this entity doesn't take damage from fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIA".
 */
export interface FireImmune {}
/**
 * Sets that this entity can float in liquid blocks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIB".
 */
export interface FloatsInLiquid {}
/**
 * Allows entities to flock in groups in water or not.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIC".
 */
export interface Flocking {
  block_distance?: BlockDistance;
  block_weight?: BlockWeight;
  breach_influence?: BreachInfluence;
  cohesion_threshold?: CohesionThreshold;
  cohesion_weight?: CohesionWeight;
  goal_weight?: GoalWeight;
  high_flock_limit?: HighFlockLimit;
  in_water?: InWater;
  influence_radius?: InfluenceRadius;
  innner_cohesion_threshold?: InnnerCohesionThreshold;
  loner_chance?: LonerChance;
  low_flock_limit?: LowFlockLimit;
  match_variants?: MatchVariants;
  max_height?: MaximumHeight;
  min_height?: MinimumHeight;
  separation_threshold?: SeparationThreshold;
  separation_weight?: SeparationWeight;
  use_center_of_mass?: UseCenterOfMass;
}
/**
 * Speed in Blocks that this entity flies at.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BID".
 */
export interface FlyingSpeed {
  value?: Value8;
}
/**
 * Defines how much does friction affect this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIE".
 */
export interface FrictionModifier {
  value?: Value9;
}
/**
 * Allows an entity to emit `entityMove`, `swim` and `flap` game events, depending on the block the entity is moving through. It is added by default to every mob. Add it again to override its behavior.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIF".
 */
export interface GameEventMovementTracking {
  emit_flap?: EmitFlap;
  emit_move?: EmitMove;
  emit_swim?: EmitSwim;
}
/**
 * Defines the way a mob's genes and alleles are passed on to it's offspring, and how those traits manifest in the child. Compatible parent genes are crossed together, the alleles are handed down from the parents to the child, and any matching genetic variants fire off JSON events to modify the child and express the traits.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIG".
 */
export interface Genetics {
  mutation_rate?: MutationRate;
  genes?: Genes;
}
/**
 * The list of genes that this entity has and will cross with a partner during breeding.
 */
export interface Gene {
  allele_range?: AlleleRange;
  genetic_variants?: GeneticVariants;
  name?: Name2;
  [k: string]: unknown;
}
/**
 * The genetic variant for this gene. These check for particular allele combinations and fire events when all of them are satisfied.
 */
export interface GeneticVariants1 {
  birth_event?: BrithEvent;
  both_allele?: BothAllele;
  either_allele?: EitherAllele;
  hidden_allele?: HiddenAllele;
  main_allele?: MainAllele;
  mutation_rate?: MutationRate1;
  [k: string]: unknown;
}
/**
 * Event to run when this mob is created and matches the above allele conditions.
 */
export interface BrithEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIH".
 */
export interface Giveable {
  triggers?: Triggers4;
}
/**
 * Defines sets of items that can be used to trigger events when used on this entity. The item will also be taken and placed in the entity's inventory.
 */
export interface Triggers4 {
  cooldown?: Cooldown1;
  items?: Properties1;
  on_give?: OnGive;
}
/**
 * Event to fire when the correct item is given.
 */
export interface OnGive {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Sets the offset from the ground that the entity is actually at.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BII".
 */
export interface GroundOffset {
  value?: Value10;
}
/**
 * When set, allows the entity to attack entities that have the "minecraft:cannot_be_attacked" component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BIJ".
 */
export interface IgnoreCannotBeAttacked {
  filters?: Filters7;
}
/**
 * Keeps track of entity group size in the given radius.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJA".
 */
export interface GroupSize {
  filters?: Filters8;
  radius?: Radius2;
}
/**
 * Could increase crop growth when entity walks over crop.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJB".
 */
export interface GrowsCrop {
  chance?: Chance;
  charges?: Charges;
}
/**
 * Defines the interactions with this entity for healing it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJC".
 */
export interface Healable {
  filters?: Filters3;
  force_use?: ForceUse;
  items?: Items;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJC_effect".
 */
export interface BJCEffect {
  name?: Name3;
  duration?: Duration5;
  /**
   * The amplifier of the effect.
   */
  amplifier?: number;
  [k: string]: unknown;
}
/**
 * defines the entity's heartbeat..
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJD".
 */
export interface Heartbeat {
  interval?: Interval;
  sound_event?: SoundEvent;
}
/**
 * Compels an entity to move to and hide at their owned POI or the closest nearby.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJE".
 */
export interface Hide {}
/**
 * Saves a home pos for when the the entity is spawned.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJF".
 */
export interface Home {
  restriction_radius?: RestrictionRadius;
  home_block_list?: HomeBlockList;
  restriction_type?: RestrictionType;
}
/**
 * Allows this mob to jump higher when being ridden by a player.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJG".
 */
export interface HorseJumpStrength {
  value?: Value11;
}
/**
 * Defines a set of conditions under which an entity should take damage.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJH".
 */
export interface HurtOnCondition {
  damage_conditions?: DamageConditions;
}
/**
 * A condition used to compare the event to.
 */
export interface DamageCondition {
  filters?: Filters3;
  cause?: Cause2;
  damage_per_tick?: DamagePerTick1;
}
/**
 * Specifies if an actor is hurt when wet.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJI".
 */
export interface HurtWhenWet {}
/**
 * When configured as a rideable entity, the entity will be controlled using WASD controls and mouse to move in three dimensions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJJ".
 */
export interface FreeCameraControlled {
  backwards_movement_modifier?: BackwardsMovementModifier;
  strafe_speed_modifier?: StrafeSpeedModifier;
}
/**
 * When configured as a rideable entity, the entity will be controlled using WASD controls.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAA".
 */
export interface InputGroundControlled {}
/**
 * Verifies whether the entity is inside any of the listed blocks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAB".
 */
export interface InsideBlockNotifier {
  block_list?: BlockList1;
}
/**
 * A of block, with certain block states, that we are monitoring to see if the entity is inside.
 */
export interface Block {
  block?: Block1;
  entered_block_event?: EnteredBlockEvent;
  exited_block_event?: ExitedBlockEvent;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAC".
 */
export interface Block1 {
  name?: Name4;
  states?: States1;
}
/**
 * The block states.
 */
export interface States1 {
  [k: string]: State;
}
/**
 * Event to run when this mob enters a valid block.
 */
export interface EnteredBlockEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to run when this mob leaves a valid block.
 */
export interface ExitedBlockEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Adds a timer since last rested to see if phantoms should spawn.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAD".
 */
export interface Insomnia {
  days_until_insomnia?: DaysUntilInsomnia;
}
/**
 * Despawns the Actor immediately.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAE".
 */
export interface InstantDespawn {
  remove_child_entities?: RemoveChildEntities1;
}
/**
 * Defines interactions with this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAF".
 */
export interface Interact {
  interactions?: Interactions;
}
export interface CAFInteractionSpec {
  add_items?: AddItems;
  cooldown?: Cooldown2;
  admire?: Admire;
  barter?: Barter1;
  cooldown_after_being_attacked?: CooldownAfterBeingAttacked2;
  health_amount?: HealthAmount;
  hurt_item?: HurtItem;
  interact_text?: InteractText1;
  on_interact?: OnInteract;
  particle_on_start?: ParticleOnStart;
  play_sounds?: PlaySounds;
  spawn_entities?: SpawnEntities;
  spawn_items?: SpawnItems;
  swing?: Swing;
  transform_to_item?: TransformToItem;
  use_item?: UseItem;
  vibration?: Vibration;
  give_item?: GiveItem;
  take_item?: TakeItem;
  drop_item_slot?: DropItemSlot;
  drop_item_y_offset?: DropItemYOffset;
  equip_item_slot?: EquipItemSlot;
  repair_entity_item?: RepairEntityItem;
}
/**
 * Loot table with items to add to the player's inventory upon successful interaction.
 */
export interface AddItems {
  table?: Table2;
}
/**
 * Particle effect that will be triggered at the start of the interaction.
 */
export interface ParticleOnStart {
  particle_offset_towards_interactor?: ParticleOffsetTowardsInteractor;
  particle_type?: ParticleType;
  particle_y_offset?: ParticleYOffset;
  [k: string]: unknown;
}
/**
 * Loot table with items to drop on the ground upon successful interaction.
 */
export interface SpawnItems {
  table?: Table3;
  y_offset?: YOffset1;
}
/**
 * Allows to repair one of the entity's items.
 */
export interface RepairEntityItem {
  amount?: Amount;
  slot?: Slot2;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAF_interaction_spec".
 */
export interface CAFInteractionSpec1 {
  add_items?: AddItems;
  cooldown?: Cooldown2;
  admire?: Admire;
  barter?: Barter1;
  cooldown_after_being_attacked?: CooldownAfterBeingAttacked2;
  health_amount?: HealthAmount;
  hurt_item?: HurtItem;
  interact_text?: InteractText1;
  on_interact?: OnInteract;
  particle_on_start?: ParticleOnStart;
  play_sounds?: PlaySounds;
  spawn_entities?: SpawnEntities;
  spawn_items?: SpawnItems;
  swing?: Swing;
  transform_to_item?: TransformToItem;
  use_item?: UseItem;
  vibration?: Vibration;
  give_item?: GiveItem;
  take_item?: TakeItem;
  drop_item_slot?: DropItemSlot;
  drop_item_y_offset?: DropItemYOffset;
  equip_item_slot?: EquipItemSlot;
  repair_entity_item?: RepairEntityItem;
}
/**
 * Defines this entity's inventory properties.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAG".
 */
export interface Inventory {
  additional_slots_per_strength?: AdditionalSlotsPerStrength;
  can_be_siphoned_from?: CanBeSiphonedFrom;
  container_type?: ContainerType;
  inventory_size?: InventorySize;
  private?: Private;
  restrict_to_owner?: RestrictToOwner;
}
/**
 * Sets that this entity is a baby.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAH".
 */
export interface IsBaby {}
/**
 * Sets that this entity is charged.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAI".
 */
export interface IsCharged {}
/**
 * Sets that this entity is currently carrying a chest.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CAJ".
 */
export interface IsChested {}
/**
 * Allows other mobs to have vertical and horizontal collisions with this mob. For a collision to occur, both mobs must have a "minecraft:collision_box" component. This component can only be used on mobs and enables collisions exclusively between mobs.
 * Please note that this type of collision is unreliable for moving collidable mobs. It is recommended to use this component only in scenarios where the collidable mob remains stationary.
 * Collidable behavior is closely related to stackable behavior. While the "minecraft:is_collidable" component governs how other mobs interact with the component's owner, the "minecraft:is_stackable" component describes how an entity interacts with others of its own kind.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBA".
 */
export interface IsCollidable {}
/**
 * Allows dyes to be used on this entity to change its color.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBB".
 */
export interface IsDyeable {
  interact_text?: InteractText2;
}
/**
 * Sets that this entity can hide from hostile mobs while invisible.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBC".
 */
export interface IsHiddenWhenInvisible {}
/**
 * Sets that this entity is currently on fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBD".
 */
export interface IsIgnited {}
/**
 * Sets that this entity is an illager captain.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBE".
 */
export interface IsIllagerCaptain {}
/**
 * Sets that this entity is currently is_pregnant
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBF".
 */
export interface IsPregnant {}
/**
 * Sets that this entity is currently saddled.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBG".
 */
export interface IsSaddled {}
/**
 * Sets that this entity is currently shaking.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBH".
 */
export interface IsShaking {}
/**
 * Sets that this entity is currently sheared.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBI".
 */
export interface IsSheared {}
/**
 * Sets that this entity can be stacked.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CBJ".
 */
export interface IsStackable {
  value?: Value12;
}
/**
 * Sets that this entity is currently stunned.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCA".
 */
export interface IsStunned {}
/**
 * Sets that this entity is currently tamed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCB".
 */
export interface IsTamed {}
/**
 * Defines what items can be used to control this entity while ridden.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCC".
 */
export interface ItemControllable {
  control_items?: ControlItems;
}
/**
 * Determines that this entity is an item hopper.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCD".
 */
export interface ItemHopper {}
/**
 * Defines a dynamic type jump control that will change jump properties based on the speed modifier of the mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCE".
 */
export interface JumpDynamic {
  regular_skip_data?: RegularSkipData;
  fast_skip_data?: FastSkipData;
}
/**
 * Used during normal skip movement
 */
export interface RegularSkipData {
  distance_scale?: DistanceScale;
  height?: Height2;
  jump_delay?: JumpDelay;
  animation_duration?: AnimationDuration;
}
/**
 * Used when travelling quickly with skip movement
 */
export interface FastSkipData {
  distance_scale?: DistanceScale;
  height?: Height2;
  jump_delay?: JumpDelay;
  animation_duration?: AnimationDuration;
}
/**
 * Gives the entity the ability to jump.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCF".
 */
export interface JumpStatic {
  jump_power?: JumpPower;
}
/**
 * Allows players to leash entities to this entity, retrieve those already leashed to it, or free them using shears.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCG".
 */
export interface LeashableTo {
  can_retrieve_from?: CanRetrieveFrom;
  unleash_on_removal?: UnleashOnRemoval;
}
/**
 * Allows this entity to be leashed and defines the conditions and events for this entity when is leashed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCH".
 */
export interface Leashable {
  can_be_cut?: CanBeCut;
  can_be_stolen?: CanBeStolen;
  on_unleash_interact_only?: OnUnleashInteractOnly;
  on_leash?: OnLeash;
  on_unleash?: OnUnleash;
  presets?: Presets1;
  unleash_on_removal?: UnleashOnRemoval1;
}
/**
 * Event to call when this entity is leashed.
 */
export interface OnLeash {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when this entity is unleashed.
 */
export interface OnUnleash {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
export interface Preset1 {
  filter?: Filters3;
  hard_distance?: HardDistance;
  max_distance?: MaximumDistance1;
  soft_distance?: SoftDistance1;
  rotation_adjustment?: RotationAdjustment;
  spring_type?: SpringType;
}
/**
 * Defines the behavior when another entity looks at this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCI".
 */
export interface LookedAt {
  field_of_view?: FieldOfView;
  filters?: Filters10;
  find_players_only?: FindPlayersOnly1;
  line_of_sight_obstruction_type?: LineOfSightObstructionType;
  look_at_locations?: LookAtLocations;
  looked_at_cooldown?: LookCooldown;
  looked_at_event?: LookedAtEvent;
  not_looked_at_event?: NotLookedAtEvent;
  scale_fov_by_distance?: ScaleFovByDistance;
  search_radius?: SearchRadius;
  min_looked_at_duration?: MinLookedAtDuration;
  set_target?: SetTarget;
}
/**
 * The event identifier to run when the entities specified in filters look at this entity.
 */
export interface LookedAtEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines the event to trigger when no entity is found looking at the owner entity.
 */
export interface NotLookedAtEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * sets the loot table for what items this entity drops upon death.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCJ".
 */
export interface Loot {
  table: Table4;
}
/**
 * This component is used to implement part of the Wandering Trader behavior.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDA".
 */
export interface ManagedWanderingTrader {}
/**
 * Additional variant value. Can be used to further differentiate variants.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDB".
 */
export interface MarkVariant {
  value: Value13;
}
/**
 * A component that applies a mob effect to entities that get within range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDC".
 */
export interface MobEffect {
  ambient?: Ambient;
  cooldown_time?: CooldownTime1;
  effect_range?: EffectRange;
  effect_time?: EffectTime;
  entity_filter?: Filters11;
  mob_effect?: MobEffect1;
}
/**
 * Entities with this component will have an immunity to the provided mob effects.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDD".
 */
export interface MobEffectImmunity {
  mob_effects?: MobEffects;
}
/**
 * Sets the offset used to determine the next step distance for playing a movement sound.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDE".
 */
export interface MovementSoundDistanceOffset {
  value: Value14;
}
/**
 * This move control allows the mob to swim in water and walk on land.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDF".
 */
export interface MovementAmphibious {
  max_turn?: MaximumTurn;
}
/**
 * defines the movement of an entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDG".
 */
export interface MovementBasic {
  max_turn?: MaximumTurn1;
}
/**
 * This move control causes the mob to fly.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDH".
 */
export interface MovementFly {
  max_turn?: MaximumTurn2;
}
/**
 * This move control allows a mob to fly, swim, climb, etc.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDI".
 */
export interface MovementGeneric {
  max_turn?: MaximumTurn3;
}
/**
 * This is the move control for a flying mob that has a gliding movement.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CDJ".
 */
export interface MovementGlide {
  max_turn?: MaximumTurn4;
  start_speed?: StartSpeed;
  speed_when_turning?: SpeedWhenTurning;
}
/**
 * This move control causes the mob to hover.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEA".
 */
export interface MovementHover {
  max_turn?: MaximumTurn5;
}
/**
 * Move control that causes the mob to jump as it moves with a specified delay between jumps.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEB".
 */
export interface MovementJump {
  jump_delay?: JumpDelay1;
  max_turn?: MaximumTurn6;
}
/**
 * This move control causes the mob to hop as it moves.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEC".
 */
export interface MovementSkip {
  max_turn?: MaximumTurn7;
}
/**
 * This move control causes the mob to sway side to side giving the impression it is swimming.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CED".
 */
export interface MovementSway {
  max_turn?: MaximumTurn8;
  sway_amplitude?: SwayAmplitude;
  sway_frequency?: SwayAmplitude1;
}
/**
 * Allows this entity to be named (e.g. using a name tag).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEE".
 */
export interface Nameable {
  allow_name_tag_renaming?: AllowNameTagRenaming;
  always_show?: AlwaysShow;
  default_trigger?: DefaultTrigger;
  name_actions?: NameActions;
}
/**
 * Describes the special names for this entity and the events to call when the entity acquires those names.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEE_name_action".
 */
export interface NameAction {
  name_filter?: NameFilter;
  on_named?: OnNamed;
}
/**
 * Event to be called when this entity acquires the name specified in `name_filter'.
 */
export interface OnNamed {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Describes the special names for this entity and the events to call when the entity acquires those names.
 */
export interface NameAction1 {
  name_filter?: NameFilter;
  on_named?: OnNamed;
}
/**
 * Allows this entity to generate paths that include vertical walls like the vanilla Spiders do.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEF".
 */
export interface NavigationClimb {
  avoid_damage_blocks?: AvoidDamageBlocks;
  avoid_portals?: AvoidPortals;
  avoid_sun?: AvoidSun;
  avoid_water?: AvoidWater;
  blocks_to_avoid?: BlocksToAvoid;
  can_breach?: CanBreach;
  can_break_doors?: CanBreakDoors;
  can_jump?: CanJump;
  can_open_doors?: CanOpenDoors;
  can_open_iron_doors?: CanOpenIronDoors;
  can_pass_doors?: CanPassDoors;
  can_path_from_air?: CanPathFromAir;
  can_path_over_lava?: CanPathOverLava;
  can_path_over_water?: CanPathOverWater;
  can_sink?: CanSink;
  can_swim?: CanSwim;
  can_walk?: CanWalk;
  can_walk_in_lava?: CanWalkInLava;
  is_amphibious?: IsAmphibious;
}
/**
 * Allows this entity to generate paths by flying around the air like the regular Ghast.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEG".
 */
export interface NavigationFloat {
  avoid_damage_blocks?: AvoidDamageBlocks1;
  avoid_portals?: AvoidPortals1;
  avoid_sun?: AvoidSun1;
  avoid_water?: AvoidWater1;
  blocks_to_avoid?: BlocksToAvoid1;
  can_breach?: CanBreach1;
  can_break_doors?: CanBreakDoors1;
  can_jump?: CanJump1;
  can_open_doors?: CanOpenDoors1;
  can_open_iron_doors?: CanOpenIronDoors1;
  can_pass_doors?: CanPassDoors1;
  can_path_from_air?: CanPathFromAir1;
  can_path_over_lava?: CanPathOverLava1;
  can_path_over_water?: CanPathOverWater1;
  can_sink?: CanSink1;
  can_swim?: CanSwim1;
  can_walk?: CanWalk1;
  can_walk_in_lava?: CanWalkInLava1;
  is_amphibious?: IsAmphibious1;
}
/**
 * Allows this entity to generate paths in the air like the vanilla Parrots do.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEH".
 */
export interface NavigationFly {
  avoid_damage_blocks?: AvoidDamageBlocks2;
  avoid_portals?: AvoidPortals2;
  avoid_sun?: AvoidSun2;
  avoid_water?: AvoidWater2;
  blocks_to_avoid?: BlocksToAvoid2;
  can_breach?: CanBreach2;
  can_break_doors?: CanBreakDoors2;
  can_jump?: CanJump2;
  can_open_doors?: CanOpenDoors2;
  can_open_iron_doors?: CanOpenIronDoors2;
  can_pass_doors?: CanPassDoors2;
  can_path_from_air?: CanPathFromAir2;
  can_path_over_lava?: CanPathOverLava2;
  can_path_over_water?: CanPathOverWater2;
  can_sink?: CanSink2;
  can_swim?: CanSwim2;
  can_walk?: CanWalk2;
  can_walk_in_lava?: CanWalkInLava2;
  is_amphibious?: IsAmphibious2;
}
/**
 * Allows this entity to generate paths by walking, swimming, flying and/or climbing around and jumping up and down a block.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEI".
 */
export interface NavigationGeneric {
  avoid_damage_blocks?: AvoidDamageBlocks3;
  avoid_portals?: AvoidPortals3;
  avoid_sun?: AvoidSun3;
  avoid_water?: AvoidWater3;
  blocks_to_avoid?: BlocksToAvoid3;
  can_breach?: CanBreach3;
  can_break_doors?: CanBreakDoors3;
  can_jump?: CanJump3;
  can_open_doors?: CanOpenDoors3;
  can_open_iron_doors?: CanOpenIronDoors3;
  can_pass_doors?: CanPassDoors3;
  can_path_from_air?: CanPathFromAir3;
  can_path_over_lava?: CanPathOverLava3;
  can_path_over_water?: CanPathOverWater3;
  can_sink?: CanSink3;
  can_swim?: CanSwim3;
  can_walk?: CanWalk3;
  can_walk_in_lava?: CanWalkInLava3;
  is_amphibious?: IsAmphibious3;
}
/**
 * Allows this entity to generate paths in the air like the vanilla Bees do. Keeps them from falling out of the skies and doing predictive movement.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CEJ".
 */
export interface NavigationHover {
  avoid_damage_blocks?: AvoidDamageBlocks4;
  avoid_portals?: AvoidPortals4;
  avoid_sun?: AvoidSun4;
  avoid_water?: AvoidWater4;
  blocks_to_avoid?: BlocksToAvoid4;
  can_breach?: CanBreach4;
  can_break_doors?: CanBreakDoors4;
  can_jump?: CanJump4;
  can_open_doors?: CanOpenDoors4;
  can_open_iron_doors?: CanOpenIronDoors4;
  can_pass_doors?: CanPassDoors4;
  can_path_from_air?: CanPathFromAir4;
  can_path_over_lava?: CanPathOverLava4;
  can_path_over_water?: CanPathOverWater4;
  can_sink?: CanSink4;
  can_swim?: CanSwim4;
  can_walk?: CanWalk4;
  can_walk_in_lava?: CanWalkInLava4;
  is_amphibious?: IsAmphibious4;
}
/**
 * Allows this entity to generate paths that include water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFA".
 */
export interface NavigationSwim {
  avoid_damage_blocks?: AvoidDamageBlocks5;
  avoid_portals?: AvoidPortals5;
  avoid_sun?: AvoidSun5;
  avoid_water?: AvoidWater5;
  blocks_to_avoid?: BlocksToAvoid5;
  can_breach?: CanBreach5;
  can_break_doors?: CanBreakDoors5;
  can_jump?: CanJump5;
  can_open_doors?: CanOpenDoors5;
  can_open_iron_doors?: CanOpenIronDoors5;
  can_pass_doors?: CanPassDoors5;
  can_path_from_air?: CanPathFromAir5;
  can_path_over_lava?: CanPathOverLava5;
  can_path_over_water?: CanPathOverWater5;
  can_sink?: CanSink5;
  can_swim?: CanSwim5;
  can_walk?: CanWalk5;
  can_walk_in_lava?: CanWalkInLava5;
  is_amphibious?: IsAmphibious5;
}
/**
 * Allows this entity to generate paths by walking around and jumping up and down a block like regular mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFB".
 */
export interface NavigationWalk {
  avoid_damage_blocks?: AvoidDamageBlocks6;
  avoid_portals?: AvoidPortals6;
  avoid_sun?: AvoidSun6;
  avoid_water?: AvoidWater6;
  blocks_to_avoid?: BlocksToAvoid6;
  can_breach?: CanBreach6;
  can_break_doors?: CanBreakDoors6;
  can_jump?: CanJump6;
  can_float?: CanJump7;
  can_open_doors?: CanOpenDoors6;
  can_open_iron_doors?: CanOpenIronDoors6;
  can_pass_doors?: CanPassDoors6;
  can_path_from_air?: CanPathFromAir6;
  can_path_over_lava?: CanPathOverLava6;
  can_path_over_water?: CanPathOverWater6;
  can_sink?: CanSink6;
  can_swim?: CanSwim6;
  can_walk?: CanWalk6;
  can_walk_in_lava?: CanWalkInLava6;
  is_amphibious?: IsAmphibious6;
}
/**
 * Sets this entity as an NPC
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFC".
 */
export interface Npc {
  npc_data?: NpcData;
}
/**
 * The data belonging to this npc.
 */
export interface NpcData {
  portrait_offsets?: PortraitOffsets;
  picker_offsets?: PickerOffsets;
  skin_list?: SkinList;
}
/**
 * UNDOCUMENTED.
 */
export interface PortraitOffsets {
  translate?: Translate;
  scale?: Scale;
}
/**
 * UNDOCUMENTED.
 */
export interface PickerOffsets {
  translate?: Translate1;
  scale?: Scale1;
}
/**
 * UNDOCUMENTED.
 */
export interface Skin {
  variant?: Variant;
  mark_variant?: MarkVariant1;
}
/**
 * Defines how an offspring of an entity is born
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFD".
 */
export interface Offspring {
  blend_attributes?: BlendAttributes;
  deny_parents_variant?: DenyParentsVariant;
  mutation_factor?: MutationFactor;
  mutation_strategy?: MutationStrategy;
  parent_centric_attribute_blending?: ParentCentricAttributeBlending;
  property_inheritance?: PropertyInheritance;
  random_extra_variant_mutation_interval?: VectorOf2Items1;
  random_variant_mutation_interval?: VectorOf2Items2;
  inherit_tamed?: InheritTamed;
  combine_parent_colors?: CombineParentColors;
  offspring_pairs?: OffspringPairs;
}
/**
 * Determines how likely the baby of parents with the same variant will deny that variant and take a random variant within the given range instead.
 */
export interface DenyParentsVariant {
  chance?: Chance1;
  max_variant?: MaximumVariant;
  min_variant?: MinimumVariant;
}
/**
 * Determines how likely the babies are to NOT inherit one of their parent's variances. Values are between 0.0 and 1.0, with a higher number meaning more likely to mutate.
 */
export interface MutationFactor {
  color?: Color1;
  extra_variant?: ExtraVariant;
  variant?: Variant1;
}
/**
 * List of Entity Properties that should be inherited from the parent entities and potentially mutated.
 */
export interface PropertyInheritance {
  mutation_chance?: MutationChance;
  mutation_values?: MutationValues;
  [k: string]: unknown;
}
/**
 * Key-Value Pair of the other entity and the offspring to spawn
 */
export interface OffspringPairs {
  [k: string]: OffspringIdentifier;
}
/**
 * Allows to specify events to execute when equipment is set in the entity's default equipment slots.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFF".
 */
export interface OnEquipmentChanged {
  slots?: Slots2;
}
/**
 * A slot and the item that can be equipped.
 */
export interface Slots3 {
  slot?: Slot3;
  on_equip?: OnEquip1;
  on_unequip?: OnUnequip1;
  [k: string]: unknown;
}
/**
 * Event to execute when the slot is changed to a non-empty item.
 */
export interface OnEquip1 {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to execute when the slot is changed to an empty item.
 */
export interface OnUnequip1 {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * defines the entity's `out of control` state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGF".
 */
export interface OutOfControl {}
/**
 * Defines the entity's `peek` behavior, defining the events that should be called during it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGG".
 */
export interface Peek {
  on_close?: OnClose;
  on_open?: OnOpen;
  on_target_open?: OnTargetOpen;
}
/**
 * Event to call when the entity is done peeking.
 */
export interface OnClose {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when the entity starts peeking.
 */
export interface OnOpen {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when the entity's target entity starts peeking.
 */
export interface OnTargetOpen {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines whether an entity should be persistent in the game world.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGH".
 */
export interface Persistent {}
/**
 * Defines the physical properties of an actor, including whether it is affected by gravity, whether it collides with objects, or whether it is pushed to the closest space.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGI".
 */
export interface Physics {
  has_collision?: HasCollision;
  has_gravity?: HasGravity;
  push_towards_closest_space?: PushedTowardsClosestSpace;
}
/**
 * Defines the player's exhaustion level.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CGJ".
 */
export interface PlayerExhaustion {
  value?: Value15;
  max?: Maximum8;
}
/**
 * Defines how much experience each player action should take.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHA".
 */
export interface PlayerExperience {
  value?: Value16;
  max?: Maximum9;
}
/**
 * Defines the player's level.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHB".
 */
export interface PlayerLevel {
  value?: Value17;
  max?: Maximum10;
}
/**
 * Defines the player's need for food.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHC".
 */
export interface PlayerSaturation {
  value?: Value18;
  max?: Maximum11;
}
/**
 * Specifies costing information for mobs that prefer to walk on preferred paths.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHD".
 */
export interface PreferredPath {
  default_block_cost?: DefaultBlockCost;
  jump_cost?: JumpCost;
  max_fall_blocks?: MaximumFallBlocks;
  preferred_path_blocks?: PreferredPathBlocks;
}
/**
 * Allows the entity to be a thrown entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHE".
 */
export interface Projectile {
  anchor?: Anchor;
  angle_offset?: AngleOffset;
  catch_fire?: CatchFire;
  crit_particle_on_hurt?: CritParticleOnHurt;
  destroy_on_hurt?: DestroyOnHurt;
  filter?: Filter1;
  fire_affected_by_griefing?: FireAffectedByGriefing1;
  gravity?: Gravity;
  hit_nearest_passenger?: HitNearestPassenger;
  ignored_entities?: IgnoredEntities;
  hit_ground_sound?: HitGroundSound;
  hit_sound?: HitSound;
  homing?: Homing;
  inertia?: Inertia;
  is_dangerous?: IsDangerous;
  isolated_physics?: IsolatedPhysics;
  knockback?: Knockback;
  lightning?: Lightning;
  liquid_inertia?: LiquidInertia;
  multiple_targets?: MultipleTargets;
  mob_effect?: MobEffect2;
  offset?: Offset;
  on_fire_time?: OnFireTime;
  owner_launch_immunity_ticks?: OwnerLaunchImmunityTicks;
  on_hit?: OnHit;
  particle?: Particle;
  potion_effect?: PotionEffect1;
  power?: Power1;
  reflect_immunity?: ReflectImmunity;
  reflect_on_hurt?: ReflectOnHurt;
  shoot_sound?: ShootSound;
  shoot_target?: ShootTarget;
  should_bounce?: ShouldBounce1;
  splash_potion?: SplashPotion;
  splash_range?: SplashRange;
  stop_on_hurt?: StopOnHurt;
  uncertainty_base?: UncertaintyBase;
  uncertainty_multiplier?: UncertaintyMultiplier;
}
/**
 * SEE on_hit/mob_effect.
 */
export interface MobEffect2 {
  [k: string]: unknown;
}
/**
 * Defines the behaviors that may execute on a projectile's hit, including impact damage, impact effect, and stuck in ground. See more on these parameters below.
 */
export interface OnHit {
  arrow_effect?: ArrowEffect;
  catch_fire?: CatchFire1;
  definition_event?: DefinitionEvent;
  difficulty_randomization?: DifficultyRandomization;
  douse_fire?: DouseFire;
  freeze_on_hit?: FreezeOnHit;
  grant_xp?: GrantXP;
  hurt_owner?: HurtOwner;
  ignite?: Ignite1;
  impact_damage?: ImpactDamage;
  mob_effect?: MobEffect3;
  on_fire_time?: OnFireTime1;
  particle_on_hit?: ParticleOnHit;
  potion_effect?: PotionEffect;
  remove_on_hit?: RemoveOnHit;
  spawn_aoe_cloud?: SpawnAOECloud;
  spawn_chance?: SpawnChance;
  stick_in_ground?: StickInGround;
  teleport_owner?: TeleportOwner;
  thrown_potion_effect?: ThrownPotionEffect;
}
/**
 * The target receives a mob effect. See the table below for all arrow_effect parameters.
 */
export interface ArrowEffect {
  apply_effect_to_blocking_targets?: ApplyEffectToBlockingTargets;
}
/**
 * The event that is triggered on a hit. See the table below for all definition event parameters.
 */
export interface DefinitionEvent {
  affect_projectile?: AffectProjectile;
  affect_shooter?: AffectShooter;
  affect_splash_area?: AffectSplashArea;
  affect_target?: AffectTarget;
  event_trigger?: EventTrigger;
  splash_area?: SplashArea;
}
/**
 * An area of entities that is frozen to block on hits. Has shape of either sphere or cube, snap_to_block boolean ,and size decimal properties.
 */
export interface FreezeOnHit {
  shape?: Shape;
  snap_to_block?: SnapToBlock;
  size?: Size;
}
/**
 * Grants XP on hit. Has minXP for minimum XP granted, maxXp for maximum, or simply flat xp properties.
 */
export interface GrantXP {
  minXP?: MinXP;
  maxXP?: MaxXP;
}
/**
 * Determines if the owner of the entity is hurt on hit. Contains decimal owner_damage, knockback boolean, and ignite boolean.
 */
export interface HurtOwner {
  owner_damage?: OwnerDamage;
  knockback?: Knockback1;
  ignite?: Ignite;
}
/**
 * Defines the damage that an entity may receive on being hit by this projectile. See the table below for all impact_damage parameters.
 */
export interface ImpactDamage {
  apply_knockback_to_blocking_targets?: ApplyKnockbackToBlockingTargets;
  catch_fire?: CatchFire2;
  channeling?: Channeling;
  damage?: Damage3;
  destroy_on_hit?: DestroyOnHit;
  destroy_on_hit_requires_damage?: DestroyOnHitRequiresDamage;
  filter?: Filter2;
  knockback?: Knockback2;
  max_critical_damage?: MaxCriticalDamage;
  min_critical_damage?: MinCriticalDamage;
  power_multiplier?: PowerMultiplier;
  semi_random_diff_damage?: SemiRandomDiffDamage;
  set_last_hurt_requires_damage?: SetLastHurtRequiresDamage;
  should_bounce?: ShouldBounce;
  ceil_pre_critical_damage?: CeilPreCriticalDamage;
}
/**
 * The target receives a mob effect. See the table below for all mob_effect parameters.
 */
export interface MobEffect3 {
  ambient?: Ambient1;
  amplifier?: Amplifier;
  duration?: Duration6;
  durationeasy?: DurationEasy;
  durationhard?: DurationHard;
  durationnormal?: DurationNormal;
  effect?: Effect1;
  visible?: Visible;
}
/**
 * The particles that spawn on hit. See the table below for all particle_on_hit parameters.
 */
export interface ParticleOnHit {
  num_particles?: NumParticles;
  on_entity_hit?: OnEntityHit;
  on_other_hit?: OnOtherHit;
  particle_type?: ParticleType1;
  particle_item_name?: ParticleItemName;
}
/**
 * Maps an item name to an actor filter to determine what the name of the item used in the particle should be.
 */
export interface ParticleItemName {
  [k: string]: Filters3;
}
/**
 * Removes the projectile.
 */
export interface RemoveOnHit {
  [k: string]: unknown;
}
/**
 * Contains information on the chance of spawning an entity on hit. See parameters below.
 */
export interface SpawnChance {
  first_spawn_count?: FirstSpawnCount;
  first_spawn_percent_chance?: FirstSpawnPercentChance;
  first_spawn_chance?: FirstSpawnChance;
  second_spawn_chance?: SecondSpawnChance;
  second_spawn_count?: SecondSpawnCount;
  spawn_baby?: SpawnBaby;
  spawn_definition?: SpawnDefinition;
  on_spawn?: OnSpawn;
}
/**
 * Decides if the object sticks in ground and contains shake_time integer parameter to determine how long it will shake.
 */
export interface StickInGround {
  [k: string]: unknown;
}
/**
 * Creates a splash area for effects caused by a thrown potion.
 */
export interface ThrownPotionEffect {
  [k: string]: unknown;
}
/**
 * Sets the distance through which the entity can push through.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHH".
 */
export interface PushThrough {
  value?: Value19;
}
/**
 * Allows the entity to be pushed by certain blocks, like Shulker Boxes and Pistons.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHI".
 */
export interface PushableByBlock {}
/**
 * Allows an entity to be pushed by other entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CHJ".
 */
export interface PushableByEntity {
  presets?: Presets2;
}
/**
 * Attempts to trigger a raid at the entity's location.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIA".
 */
export interface RaidTrigger {
  triggered_event?: TriggeredEvent;
}
/**
 * Defines the entity's movement on the rails. An entity with this component is only allowed to move on the rail.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIB".
 */
export interface RailMovement {
  max_speed?: MaximumSpeed;
}
/**
 * Defines the behavior of the entity when the rail gets activated or deactivated.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIC".
 */
export interface RailSensor {
  check_block_types?: CheckBlockTypes;
  eject_on_activate?: EjectOnActivate;
  eject_on_deactivate?: EjectOnDeactivate;
  on_activate?: OnActivate;
  on_deactivate?: OnDeactivate;
  tick_command_block_on_activate?: TickCommandBlockOnActivate;
  tick_command_block_on_deactivate?: TickCommandBlockOnDeactivate;
}
/**
 * Event to call when the rail is activated.
 */
export interface OnActivate {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when the rail is deactivated.
 */
export interface OnDeactivate {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines the ravager's response to their melee attack being blocked.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CID".
 */
export interface RavagerBlocked {
  knockback_strength?: KnockbackStrength;
  reaction_choices?: ReactionChoices;
}
/**
 * Determines whether this entity can be ridden. Allows specifying the different seat positions and amount.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIE".
 */
export interface Rideable {
  controlling_seat?: ControllingSeat;
  crouching_skip_interact?: CrouchingSkipInteract;
  family_types?: FamilyTypes;
  interact_text?: InteractText3;
  dismount_mode?: DismountMode;
  on_rider_enter_event?: OnRiderEnterEvent;
  on_rider_exit_event?: OnRiderExitEvent;
  passenger_max_width?: PassengerMaxWidth;
  pull_in_entities?: PullInEntities;
  rider_can_interact?: RiderCanInteract;
  seat_count?: SeatCount;
  seats?: Seats;
}
export interface CIESeatsSpec {
  third_person_camera_radius?: ThirdPersonCameraRadius;
  camera_relax_distance_smoothing?: CameraRelaxDistanceSmoothing;
  lock_rider_rotation?: LockRiderRotation;
  max_rider_count?: MaxRiderCount;
  min_rider_count?: MinRiderCount;
  position?: Position;
  rotate_rider_by?: RotateRiderBy;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIE_seats_spec".
 */
export interface CIESeatsSpec1 {
  third_person_camera_radius?: ThirdPersonCameraRadius;
  camera_relax_distance_smoothing?: CameraRelaxDistanceSmoothing;
  lock_rider_rotation?: LockRiderRotation;
  max_rider_count?: MaxRiderCount;
  min_rider_count?: MinRiderCount;
  position?: Position;
  rotate_rider_by?: RotateRiderBy;
}
/**
 * Causes the entity's body to automatically rotate to align with the nearest cardinal direction based on its current facing direction.
 * Combining this with the "minecraft:body_rotation_blocked" component will cause the entity to align to the nearest cardinal direction and remain fixed in that orientation, regardless of future changes in its facing direction.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIF".
 */
export interface BodyRotationAxisAligned {}
/**
 * Aligns both the entity's body rotation and its overall rotation with that of its mounted vehicle
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIG".
 */
export interface RotationLockedToVehicle {}
/**
 * [EXPERIMENTAL] Allows an entity to reflect projectiles.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIH".
 */
export interface ReflectProjectiles {
  azimuth_angle?: AzimuthAngle;
  elevation_angle?: ElevationAngle;
  reflected_projectiles?: ReflectedProjectiles;
  reflection_scale?: RefelctionScale;
  reflection_sound?: ReflectionSound;
}
/**
 * Denotes entities that are not allowed to exist in "Peaceful" difficulty.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CII".
 */
export interface RemoveInPeaceful {}
/**
 * When set, the entity will render even when invisible. Appropriate rendering behavior can then be specified in the corresponding "minecraft:client_entity".
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CIJ".
 */
export interface RendersWhenInvisible {}
/**
 * Defines the entity's size interpolation based on the entity's age.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJA".
 */
export interface ScaleByAge {
  end_scale?: EndScale;
  start_scale?: StartScale;
}
/**
 * Sets the entity's visual size.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJB".
 */
export interface Scale2 {
  value?: Value21;
}
/**
 * fires off scheduled mob events at time of day events.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJC".
 */
export interface Scheduler {
  min_delay_secs?: MinimumDelaySecs;
  max_delay_secs?: MaximumDelaySecs;
  scheduled_events?: ScheduledEvents;
}
/**
 * A filter and event pair. The event runs when the filter criteria succeeds
 */
export interface ScheduledEvents1 {
  filters?: Filters3;
  event?: Event4;
}
/**
 * Defines a list of items the mob wants to share or pick up. Each item must have the following parameters:
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJD".
 */
export interface Shareables {
  all_items?: AllItems;
  all_items_max_amount?: AllItemsMaximumAmount;
  all_items_surplus_amount?: AllItemsSurplusAmount;
  all_items_want_amount?: AllItemsWantAmount;
  /**
   * List of items that the entity wants to share.
   */
  items?: Item4[];
  singular_pickup?: SingularPickup;
}
/**
 * An Item that the entity wants to share.
 */
export interface Item4 {
  admire?: Admire1;
  barter?: Barter2;
  consume_item?: ConsumeItem;
  craft_into?: CraftInto;
  item?: ItemIdentifier5;
  item_aux?: ItemAux;
  max_amount?: MaximumAmount;
  pickup_limit?: PickupLimit;
  priority?: Priority;
  stored_in_inventory?: StoredInInventory;
  surplus_amount?: SurplusAmount;
  want_amount?: WantAmount;
  pickup_only?: PickupOnly;
}
/**
 * Defines the entity's ranged attack behavior.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJE".
 */
export interface Shooter {
  aux_val?: AuxVal;
  def?: Def;
  magic?: Magic;
  power?: Power2;
  projectiles?: Projectiles;
  sound?: Sound1;
}
/**
 * A projectile defintion
 */
export interface Projectile2 {
  aux_val?: AuxVal1;
  def?: Def1;
  filters?: Filters3;
  [k: string]: unknown;
}
/**
 * Defines the entity's `sit` state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJF".
 */
export interface Sittable {
  sit_event?: SitEvent;
  stand_event?: StandEvent;
}
/**
 * Event to run when the entity enters the `sit` state.
 */
export interface SitEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to run when the entity exits the `sit` state.
 */
export interface StandEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Skin ID value. Can be used to differentiate skins, such as base skins for villagers.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJG".
 */
export interface SkinId {
  value?: Value22;
}
/**
 * Sets the entity's base volume for sound effects.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJH".
 */
export interface SoundVolume {
  value?: Value23;
}
/**
 * Enables interacting with this entity using its own spawn egg to spawn a born child. Runs the "minecraft:entity_born" event on the created entity as well as the defined "on_spawn" event.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJI".
 */
export interface SpawnEggInteraction {}
/**
 * Adds a timer after which this entity will spawn another entity or item (similar to vanilla's chicken's egg-laying behavior).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJJ".
 */
export interface SpawnEntity {
  entities?: Entities;
}
export interface EntitySpawn {
  filters?: Filters13;
  max_wait_time?: MaximumWaitTime;
  min_wait_time?: MinimumWaitTime;
  num_to_spawn?: NumToSpawn;
  should_leash?: ShouldLeash;
  single_use?: SingleUse;
  spawn_entity?: SpawnEntity1;
  spawn_event?: SpawnEvent1;
  spawn_item?: SpawnItem;
  spawn_method?: SpawnMethod;
  spawn_sound?: SpawnSound;
  spawn_item_event?: SpawnItemEvent;
}
/**
 * Event to call on this entity when the item is spawned.
 */
export interface SpawnItemEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
export interface EntitySpawn1 {
  filters?: Filters13;
  max_wait_time?: MaximumWaitTime;
  min_wait_time?: MinimumWaitTime;
  num_to_spawn?: NumToSpawn;
  should_leash?: ShouldLeash;
  single_use?: SingleUse;
  spawn_entity?: SpawnEntity1;
  spawn_event?: SpawnEvent1;
  spawn_item?: SpawnItem;
  spawn_method?: SpawnMethod;
  spawn_sound?: SpawnSound;
  spawn_item_event?: SpawnItemEvent;
}
/**
 * Component for spawning entities when an entity perishes.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAA".
 */
export interface SpawnOnDeath {
  additional_spawn_range?: AdditionalSpawnRange;
  entity_to_spawn?: EntityToSpawn;
  filters?: Filters14;
  inherit_parent_name?: InheritParentName;
  spawn_amount?: SpawnAmount;
  spawn_method?: SpawnMethod1;
}
/**
 * Additional random range of entities to spawn
 */
export interface AdditionalSpawnRange {
  min?: X4;
  max?: Y4;
}
/**
 * Defines what mob effects to add and remove to the entity when adding this component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAC".
 */
export interface SpellEffects {
  add_effects?: AddEffects;
  remove_effects?: RemoveEffects;
}
/**
 * Defines the entity's strength to carry items.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAD".
 */
export interface Strength {
  max?: Maximum12;
  value?: Value24;
}
/**
 * Allows this entity to remember suspicious locations.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAE".
 */
export interface SuspectTracking {}
/**
 * Defines the rules for a mob to be tamed by the player.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAF".
 */
export interface Tameable {
  probability?: Probability;
  tame_event?: TameEvent;
  tame_items?: TameItems;
}
/**
 * Event to run when this entity becomes tamed.
 */
export interface TameEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Allows the Entity to be tamed by mounting it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAG".
 */
export interface Tamemount {
  attempt_temper_mod?: AttemptTemperMod;
  auto_reject_items?: AutoRejectItems;
  feed_text?: FeedText;
  feed_items?: FeedItems1;
  max_temper?: MaximumTemper;
  min_temper?: MinimumTemper;
  ride_text?: RideText;
  tame_event?: TameEvent1;
}
/**
 * The list of items that this entity dislikes and will cause it to get angry if used while untamed.
 */
export interface DAGAutoRejectItems {
  /**
   * Name of the item this entity dislikes and will cause it to get angry if used while untamed.
   */
  item?:
    | ItemIdentifier
    | ItemDescriptor
    | {
        item?: ItemIdentifier2 | ItemDescriptor2;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
/**
 * The list of items that this entity dislikes and will cause it to get angry if used while untamed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAG_auto_reject_items".
 */
export interface DAGAutoRejectItems1 {
  /**
   * Name of the item this entity dislikes and will cause it to get angry if used while untamed.
   */
  item?:
    | ItemIdentifier
    | ItemDescriptor
    | {
        item?: ItemIdentifier2 | ItemDescriptor2;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
/**
 * The list of items that can be used to increase the entity's temper and speed up the taming process.
 */
export interface DAGFeedItems {
  item?: Item5;
  temper_mod?: TemperMod;
  [k: string]: unknown;
}
/**
 * The list of items that can be used to increase the entity's temper and speed up the taming process.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAG_feed_items".
 */
export interface DAGFeedItems1 {
  item?: Item5;
  temper_mod?: TemperMod;
  [k: string]: unknown;
}
/**
 * Event that triggers when the entity becomes tamed.
 */
export interface TameEvent1 {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines the entity's range within which it can see or sense other entities to target them.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAH".
 */
export interface TargetNearbySensor {
  must_see?: MustSee;
  inside_range?: InsideRange;
  on_inside_range?: OnInsideRange;
  on_outside_range?: OnOutsideRange;
  on_vision_lost_inside_range?: OnVisionLostInsideRange;
  outside_range?: OutsideRange;
}
/**
 * Event to call when an entity gets in the inside range. Can specify `event` for the name of the event and `target` for the target of the event
 */
export interface OnInsideRange {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when an entity gets in the outside range. Can specify `event` for the name of the event and `target` for the target of the event
 */
export interface OnOutsideRange {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Event to call when an entity exits visual range. Can specify `event` for the name of the event and `target` for the target of the event
 */
export interface OnVisionLostInsideRange {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines an entity's teleporting behavior.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAI".
 */
export interface Teleport {
  dark_teleport_chance?: DarkTeleportChance;
  light_teleport_chance?: LightTeleportChance;
  max_random_teleport_time?: MaximumRandomTeleportTime;
  min_random_teleport_time?: MinimumRandomTeleportTime;
  random_teleport_cube?: RandomTeleportCube;
  random_teleports?: RandomTeleports;
  target_distance?: TargetDistance;
  target_teleport_chance?: TargetTeleportChance;
}
/**
 * Defines if the entity ticks the world and the radius around it to tick.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAJ".
 */
export interface TickWorld {
  distance_to_players?: DistanceToPlayers;
  never_despawn?: NeverDespawn;
  radius?: Radius3;
}
/**
 * Adds a timer after which an event will fire.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBA".
 */
export interface Timer {
  looping?: Looping;
  randomInterval?: RandomInterval;
  time?: Time;
  time_down_event?: TimeDownEvent;
  random_time_choices?: RandomTimeChoices;
}
/**
 * Event to fire when the time on the timer runs out.
 */
export interface TimeDownEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * representing one value in seconds that can be picked before firing the event and an optional weight. Incompatible with time.
 */
export interface RandomTimeChoices1 {
  weight?: Weight1;
  value?: Value25;
}
/**
 * Resupplies an entity's trade.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBB".
 */
export interface TradeResupply {}
/**
 * Defines this entity's ability to trade with players.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBC".
 */
export interface TradeTable {
  convert_trades_economy?: ConvertTradesEconomy1;
  display_name?: DisplayName1;
  new_screen?: NewScreen1;
  persist_trades?: PersistTrades1;
  table?: Table5;
}
/**
 * Defines the entity's trail to carry items.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBD".
 */
export interface Trail {
  block_type?: BlockType;
  spawn_filter?: Filters15;
  spawn_offset?: SpawnOffset;
}
/**
 * Defines an entity's transformation from the current definition into another
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBE".
 */
export interface Transformation {
  add?: Add;
  begin_transform_sound?: BeginTransformSound;
  delay?: Delay;
  drop_equipment?: DropEquipment;
  drop_inventory?: DropInventory;
  into?: Into;
  keep_level?: KeepLevel;
  keep_owner?: KeepOwner;
  preserve_equipment?: PreserveEquipment;
  transformation_sound?: TransformationSound;
}
/**
 * List of components to add to the entity after the transformation.
 */
export interface Add {
  /**
   * Names of component groups to add.
   */
  component_groups?: string[];
}
/**
 * An entity with this component will NEVER persist, and forever disappear when unloaded.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBF".
 */
export interface Transient {}
/**
 * Allows this entity to trust multiple players.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBG".
 */
export interface Trust {}
/**
 * Defines the rules for a mob to trust players.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBH".
 */
export interface Trusting {
  probability?: Probability1;
  trust_event?: TrustEvent;
  trust_items?: TrustItems;
}
/**
 * Event to run when this entity becomes trusting.
 */
export interface TrustEvent {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * Defines the families this entity belongs to.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBI".
 */
export interface TypeFamily {
  family: Family;
}
/**
 * When set, legacy calculations are used when applying "minecraft:friction_modifier". This component is automatically added to legacy content to preserve existing behavior. The legacy calculations are incorrect and should not be used for new content.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DBJ".
 */
export interface UsesLegacyFriction {}
/**
 * When present, air drag is applied uniformly on both the vertical and horizontal axes, instead of being biased toward horizontal movement.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCA".
 */
export interface UsesUniformAirDrag {}
/**
 * Entities with this component will have a maximum auto step height that is different depending on wether they are on a block that prevents jumping. Incompatible with "runtime_identifier": "minecraft:horse".
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCB".
 */
export interface VariableMaxAutoStep {
  base_value?: BaseValue;
  controlled_value?: ControlledValue;
  jump_prevented_value?: JumpPreventedValue;
}
/**
 * Used to differentiate the component group of a variant of an entity from others (e.g. ocelot, villager) Parameters
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCC".
 */
export interface Variant2 {
  value: Value26;
}
/**
 * When configured as a rideable entity, the entity will move upwards or downwards when the player uses the jump action.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCD".
 */
export interface VerticalMovementAction {
  vertical_velocity?: VerticalVelocity;
}
/**
 * Vibrations emitted by this entity will be ignored.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCE".
 */
export interface VibrationDamper {}
/**
 * This entity will respond to vibrations.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCF".
 */
export interface VibrationListener {}
/**
 * Sets the speed multiplier for this entity's walk animation speed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCG".
 */
export interface WalkAnimationSpeed {
  value?: Value27;
}
/**
 * Sets that this entity wants to become a jockey.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCH".
 */
export interface WantsJockey {}
/**
 * Defines the speed with which an entity can move through water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCI".
 */
export interface WaterMovement {
  drag_factor?: DragFactor;
}
/**
 * Enables the mob to admire items that have been configured as admirable. Must be used in combination with the admire_item component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DCJ".
 */
export interface AdmireItem1 {
  priority?: Priority1;
  control_flags?: ControlFlags;
  admire_item_sound?: AdmireItemSound;
  on_admire_item_start?: Event5;
  on_admire_item_stop?: Event6;
  sound_interval?: SoundInterval2;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDC".
 */
export interface DDC {
  min?: X6;
  max?: Y6;
}
/**
 * Enables an aquatic mob to dash at its target with knockback; includes overshoot and cooldown settings.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDD".
 */
export interface AquaticChargeAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_reach?: AttackReach;
  charge_cooldown_time?: ChargeCooldownTime;
  charge_overshoot_distance?: ChargeOvershootDistance;
  charge_speed?: ChargeSpeed;
  knockback_force?: KnockbackForce;
  max_charge_distance?: MaxChargeDistance;
}
/**
 * Range of time in seconds to wait before starting another charge.
 */
export interface ChargeCooldownTime {
  min?: X6;
  max?: Y6;
}
/**
 * Allows this entity to avoid certain blocks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDF".
 */
export interface AvoidBlock {
  priority?: Priority1;
  tick_interval?: TickInterval;
  control_flags?: ControlFlags;
  search_range?: SearchRange;
  search_height?: SearchHeight;
  sprint_speed_modifier?: SprintSpeedModifier;
  target_selection_method?: TargetSelectionMethod;
  target_blocks?: TargetBlocks;
  avoid_block_sound?: AvoidBlockSound;
  walk_speed_modifier?: WalkSpeedModifier;
  on_escape?: WalkSpeedModifier1;
  sound_interval?: SoundInterval3;
}
/**
 * Allows the entity to run away from other entities that meet the criteria specified.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDG".
 */
export interface AvoidMobType {
  priority?: Priority1;
  control_flags?: ControlFlags;
  avoid_mob_sound?: AvoidMobSound;
  avoid_target_xz?: AvoidTargetXZ;
  avoid_target_y?: AvoidTargetY;
  ignore_visibilty?: IgnoreVisibilty;
  max_dist?: MaxDist;
  max_flee?: MaxFlee;
  probability_per_strength?: ProbabilityPerStrength;
  remove_target?: RemoveTarget;
  sprint_distance?: SprintDistance;
  sprint_speed_multiplier?: SprintSpeedMultiplier;
  walk_speed_multiplier?: WalkSpeedMultiplier;
  ignore_visibility?: IgnoreVisibility;
  entity_types?: EntityTypes;
  on_escape_event?: Event7;
  sound_interval?: SoundInterval4;
}
/**
 * The entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDH_entity_definition".
 */
export interface EntityType1 {
  filters?: Filters3;
  cooldown?: Cooldown3;
  max_dist?: MaximumDist;
  max_height?: MaximumHeight1;
  max_flee?: MaximumHeight2;
  priority?: Priority2;
  within_default?: WithinDefault;
  check_if_outnumbered?: CheckIfOutnumbered;
  must_see?: MustSee1;
  must_see_forget_duration?: MustSeeForgetDuration;
  reevaluate_description?: ReevaluateDescription;
  sprint_speed_multiplier?: SprintSpeedMultiplier1;
  walk_speed_multiplier?: WalkSpeedMultiplier1;
}
/**
 * Enables the mob to barter for items that have been configured as barter currency. Must be used in combination with the barter component
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDI".
 */
export interface Barter3 {
  priority?: Priority1;
}
/**
 * Allows this mob to look at and follow the player that holds food they like.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DDJ".
 */
export interface Beg {
  priority?: Priority1;
  control_flags?: ControlFlags;
  items?: Properties3;
  look_distance?: LookDistance;
  look_time?: LookTime;
}
/**
 * The range of time in seconds this mob will stare at the player holding a food they like, begging for it.
 */
export interface LookTime {
  min?: X4;
  max?: Y4;
}
/**
 * Allows this mob to break doors.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEA".
 */
export interface BreakDoor {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
}
/**
 * Allows this mob to breed with other mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEB".
 */
export interface Breed {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
}
/**
 * Allows this entity to celebrate surviving a raid by shooting fireworks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEC".
 */
export interface CelebrateSurvive {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  fireworks_interval?: FireworksInterval;
  duration?: Duration8;
  on_celebration_end_event?: Event8;
}
/**
 * Minimum and maximum time between firework (positive, in seconds).
 */
export interface FireworksInterval {
  min?: X6;
  max?: Y6;
}
/**
 * Allows this entity to celebrate surviving a raid by making celebration sounds and jumping.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DED".
 */
export interface Celebrate {
  priority?: Priority1;
  control_flags?: ControlFlags;
  celebration_sound?: CelebrationSound;
  duration?: Duration9;
  jump_interval?: JumpInterval;
  on_celebration_end_event?: Trigger3;
  sound_interval?: SoundInterval5;
}
/**
 * Minimum and maximum time between jumping (positive, in seconds).
 */
export interface JumpInterval {
  min?: X6;
  max?: Y6;
}
/**
 * Minimum and maximum time between sound events (positive, in seconds).
 */
export interface SoundInterval5 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows this entity to damage a target by using a running attack.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEE".
 */
export interface ChargeAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  max_distance?: MaxDistance2;
  min_distance?: MinDistance1;
  success_rate?: SuccessRate;
}
/**
 * Allows an entity to charge and use their held item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEF".
 */
export interface ChargeHeldItem {
  priority?: Priority1;
  control_flags?: ControlFlags;
  items?: Items1;
}
/**
 * Causes an entity to circle around an anchor point placed near a point or target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEG".
 */
export interface CircleAroundAnchor {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  radius_range?: RadiusRange;
  radius_change_chance?: RadiusChangeChance;
  height_above_target_range?: HeightAboveTargetRange;
  height_offset_range?: HeightOffsetRange;
  height_change_chance?: HeightChangeChance;
  goal_radius?: GoalRadius;
  radius_change?: RadiusChange;
  radius_adjustment_chance?: RadiusAdjustmentChance;
  height_adjustment_chance?: HeightAdjustmentChance;
  angle_change?: AngleChange;
}
/**
 * Horizontal distance from the anchor point this entity must stay within upon a successful radius adjustment.
 */
export interface RadiusRange {
  min?: X6;
  max?: Y6;
}
/**
 * The number of blocks above the target that the next anchor point can be set. This value is used only when the entity is tracking a target.
 */
export interface HeightAboveTargetRange {
  min?: X6;
  max?: Y6;
}
/**
 * The range of height in blocks offset the mob can have from it's anchor point.
 */
export interface HeightOffsetRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the entity to be controlled by the player using an item in the item_controllable property (required). Also requires the minecraft:movement property, and the minecraft:rideable property. On every tick, the entity will attempt to rotate towards where the player is facing with the control item whilst simultaneously moving forward.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEH".
 */
export interface ControlledByPlayer {
  priority?: Priority1;
  fractional_rotation?: FractionalRotation;
  fractional_rotation_limit?: FractionalRotationLimit;
  mount_speed_multiplier?: MountSpeedMultiplier;
}
/**
 * Allows the entity to croak at a random time interval with configurable conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEI".
 */
export interface Croak {
  priority?: Priority1;
  control_flags?: ControlFlags;
  duration?: Duration10;
  filters?: Filters16;
  interval?: Interval1;
}
/**
 * Random range in seconds after which the croaking stops. Can also be a constant.
 */
export interface Duration10 {
  min?: X6;
  max?: Y6;
}
/**
 * Random range in seconds between runs of this behavior. Can also be a constant.
 */
export interface Interval1 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to target another mob that hurts an entity it trusts.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DEJ".
 */
export interface DefendTrustedTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  aggro_sound?: AggroSound;
  attack_interval?: AttackInterval;
  must_see?: MustSee2;
  must_see_forget_duration?: MustSeeForgetDuration1;
  on_defend_start?: Event9;
  within_radius?: WithinRadius;
  entity_types?: EntityTypes1;
  sound_chance?: SoundChance;
}
/**
 * Allows the entity to stay in a village and defend the village from aggressors. If a player is in bad standing with the village this goal will cause the entity to attack the player regardless of filter conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFA".
 */
export interface DefendVillageTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes2;
  /**
   * If true, this entity can attack its owner.
   */
  attack_owner?: boolean;
  attack_chance?: AttackChance;
  /**
   * If true, this entity requires a path to the target.
   */
  must_reach?: boolean;
  /**
   * Determines if target-validity requires this entity to be in range only, or both in range and in sight.
   */
  must_see?: boolean;
  /**
   * Time (in seconds) the target must not be seen by this entity to become invalid. Used only if "must_see" is true.
   */
  must_see_forget_duration?: number;
  /**
   * Time (in seconds) this entity can continue attacking the target after the target is no longer valid.
   */
  persist_time?: number;
  /**
   * Maximum distance this entity can be from the target when following it, otherwise the target becomes invalid. This value is only used if the entity doesn't declare "minecraft:follow_range".
   */
  within_radius?: number;
}
/**
 * Allows an entity to attack, while also delaying the damage-dealt until a specific time in the attack animation.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFB".
 */
export interface DelayedAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_duration?: AttackDuration;
  attack_once?: AttackOnce;
  attack_types?: AttackTypes;
  can_spread_on_fire?: CanSpreadOnFire;
  hit_delay_pct?: HitDelayPct;
  inner_boundary_time_increase?: InnerBoundaryTimeIncrease;
  max_dist?: MaxDist1;
  max_path_time?: MaxPathTime;
  melee_fov?: MeleeFov;
  min_path_time?: MinPathTime;
  on_attack?: Trigger4;
  on_kill?: Trigger5;
  outer_boundary_time_increase?: OuterBoundaryTimeIncrease;
  path_fail_time_increase?: PathFailTimeIncrease;
  path_inner_boundary?: PathInnerBoundary;
  path_outer_boundary?: PathOuterBoundary;
  random_stop_interval?: RandomStopInterval;
  reach_multiplier?: ReachMultiplier;
  require_complete_path?: RequireCompletePath;
  set_persistent?: SetPersistent;
  target_dist?: TargetDist;
  track_target?: TrackTarget;
  x_max_rotation?: XMaxRotation;
  y_max_head_rotation?: YMaxHeadRotation;
  sound_event?: SoundEvent1;
}
/**
 * [EXPERIMENTAL BEHAVIOR] Activates the `DIGGING` actor flag during the specified duration. Currently only Warden can use the Dig goal
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFC".
 */
export interface Dig {
  priority?: Priority1;
  control_flags?: ControlFlags;
  allow_dig_when_named?: AllowDigWhenNamed;
  digs_in_daylight?: DigsInDaylight;
  duration?: Duration11;
  idle_time?: IdleTime;
  suspicion_is_disturbance?: SuspicionIsDisturbance;
  vibration_is_disturbance?: VibrationIsDisturbance;
  on_start?: Trigger6;
}
/**
 * Allows the mob to open and close doors.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFD".
 */
export interface DoorInteract {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows this entity to attack a player by charging at them. The player is chosen by the "minecraft:behavior.dragonscanning". Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFE".
 */
export interface Dragonchargeplayer {
  priority?: Priority1;
  control_flags?: ControlFlags;
  active_speed?: ActiveSpeed;
  continue_charge_threshold_time?: ContinueChargeThresholdTime;
  flight_speed?: FlightSpeed;
  target_zone?: TargetZone;
  turn_speed?: TurnSpeed;
}
/**
 * Minimum and maximum distance, from the target, this entity can use this behavior.
 */
export interface TargetZone {
  min?: X6;
  max?: Y6;
}
/**
 * Controls the entity's death state and animation. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFF".
 */
export interface Dragondeath {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows this entity to use a flame-breath attack. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFG".
 */
export interface Dragonflaming {
  priority?: Priority1;
  cooldown_time?: CooldownTime2;
  flame_time?: FlameTime;
  ground_flame_count?: GroundFlameCount;
  roar_time?: RoarTime;
}
/**
 * Allows the Dragon to fly around in a circle around the center podium. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFH".
 */
export interface Dragonholdingpattern {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the Dragon to stop flying and transition into perching mode. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFI".
 */
export interface Dragonlanding {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows an entity to look around for a player to attack while in perch mode. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DFJ".
 */
export interface Dragonscanning {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows this entity to fly around looking for a player to shoot fireballs at. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGA".
 */
export interface Dragonstrafeplayer {
  priority?: Priority1;
  control_flags?: ControlFlags;
  active_speed?: ActiveSpeed1;
  fireball_range?: FireballRange;
  flight_speed?: FlightSpeed1;
  switch_direction_probability?: SwitchDirectionProbability;
  target_in_range_and_in_view_time?: TargetInRangeAndInViewTime;
  target_zone?: TargetZone1;
  turn_speed?: TurnSpeed1;
  view_angle?: ViewAngle;
}
/**
 * Minimum and maximum distance, from the target, this entity can use this behavior.
 */
export interface TargetZone1 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows an entity to leave perch mode and go back to flying around. Note: This behavior can only be used by the ender_dragon entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGB".
 */
export interface Dragontakeoff {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to drink milk based on specified environment conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGC".
 */
export interface DrinkMilk {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_seconds?: CooldownSeconds;
  filters?: Filters17;
}
/**
 * Allows the mob to drink potions based on specified environment conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGD".
 */
export interface DrinkPotion {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  speed_modifier?: SpeedModifier;
  potions?: Potions;
}
/**
 * A potions that this entity can drink.
 */
export interface Potions1 {
  id: Id;
  chance: Chance2;
  filters: Filters18;
}
/**
 * Allows the entity to move toward a target, and drop an item near the target. This goal requires a "minecraft:navigation" to execute.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGE".
 */
export interface DropItemFor {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes3;
  cooldown?: Cooldown4;
  drop_item_chance?: DropItemChance;
  goal_radius?: GoalRadius1;
  loot_table?: LootTable;
  max_head_look_at_height?: MaxHeadLookAtHeight;
  minimum_teleport_distance?: MinimumTeleportDistance;
  offering_distance?: OfferingDistance;
  on_drop_attempt?: Trigger7;
  search_count?: SearchCount;
  search_height?: SearchHeight1;
  search_range?: SearchRange1;
  seconds_before_pickup?: SecondsBeforePickup;
  target_range?: TargetRange;
  teleport_offset?: TeleportOffset;
  time_of_day_range?: TimeOfDayRange;
}
/**
 * The valid times of day that this goal can be used. For reference: noon is 0.0, sunset is 0.25, midnight is 0.5, and sunrise is 0.75, and back to noon for 1.0.
 */
export interface TimeOfDayRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the entity to consume a block, replace the eaten block with another block, and trigger an event as a result.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGF".
 */
export interface EatBlock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  on_eat?: Trigger8;
  success_chance?: SuccesChance;
  time_until_eat?: TimeUntilEat;
  eat_and_replace_block_pairs?: EatAndReplaceBlockPairs;
}
/**
 * The block to eat and the block to replace it with.
 */
export interface EatAndReplaceBlockPair {
  eat_block?: BlockIdentifier3;
  replace_block?: BlockIdentifier4;
  [k: string]: unknown;
}
/**
 * If the mob is carrying a food item, the mob will eat it and the effects will be applied to the mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGG".
 */
export interface EatCarriedItem {
  priority?: Priority1;
  delay_before_eating?: DelayBeforeEating;
}
/**
 * [EXPERIMENTAL BEHAVIOR] Allows the entity to eat a specified Mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGH".
 */
export interface EatMob {
  priority?: Priority1;
  eat_animation_time?: EatAnimationTime;
  eat_mob_sound?: EatMobSound;
  loot_table?: LootTable1;
  pull_in_force?: PullInForce;
  reach_mob_distance?: ReachMobDistance;
  run_speed?: RunSpeed;
}
/**
 * Activates the `EMERGING` actor flag during the specified duration and triggers `on_done` at the end
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGI".
 */
export interface Emerge {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime3;
  duration?: Duration12;
  on_done?: Trigger9;
}
/**
 * The entity puts on the desired equipment.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DGJ".
 */
export interface EquipItem1 {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the entity to first travel to a random point on the outskirts of the village, and then explore random points within a small distance. This goal requires "minecraft:dweller" and "minecraft:navigation" to execute.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHA".
 */
export interface ExploreOutskirts {
  priority?: Priority1;
  control_flags?: ControlFlags;
  speed_multiplier?: SpeedMultiplier1;
  dist_from_boundary?: DistFromBoundary;
  explore_dist?: ExploreDist;
  max_travel_time?: MaxTravelTime;
  max_wait_time?: MaxWaitTime;
  min_dist_from_target?: MinDistFromTarget;
  min_perimeter?: MinPerimeter;
  min_wait_time?: MinWaitTime;
  next_xz?: NextXZ;
  next_y?: NextY;
  timer_ratio?: TimerRatio;
}
/**
 * Allows the mob to search within an area for a growable crop block. If found, the mob will use any available fertilizer in their inventory on the crop. This goal will not execute if the mob does not have a fertilizer item in its inventory.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHB".
 */
export interface FertilizeFarmBlock {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius2;
  max_fertilizer_usage?: MaximumFertilizerUsage;
  search_cooldown_max_seconds?: SearchCooldownMaximumSeconds;
  search_count?: SearchCount1;
  search_height?: SearchHeight2;
  search_range?: SearchRange2;
}
/**
 * Allows the mob to seek shade.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHC".
 */
export interface FindCover {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime4;
}
/**
 * Allows the mob to look around for another mob to ride atop it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHD".
 */
export interface FindMount {
  priority?: Priority1;
  control_flags?: ControlFlags;
  avoid_water?: AvoidWater7;
  mount_distance?: MountDistance;
  start_delay?: StartDelay;
  target_needed?: TargetNeeded;
  within_radius?: WithinRadius1;
  max_failed_attempts?: MaximumFailedAttempts;
}
/**
 * Allows the mob to move towards the nearest underwater ruin or shipwreck.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHE".
 */
export interface FindUnderwaterTreasure {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  search_range?: SearchRange3;
  stop_distance?: StopDistance;
}
/**
 * Allows an entity to attack by firing a shot with a delay. Anchor and offset parameters of this component overrides the anchor and offset from projectile component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHF".
 */
export interface FireAtTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  attack_cooldown?: AttackCooldown1;
  attack_range?: AttackRange;
  owner_anchor?: OwnerAnchor;
  owner_offset?: OwnerOffset;
  target_anchor?: TargetAnchor;
  target_offset?: TargetOffset;
  post_shoot_delay?: PostShootDelay;
  pre_shoot_delay?: PreShootDelay;
  projectile_def?: ProjectileDefinition;
  ranged_fov?: RangedFov;
  max_head_rotation_x?: MaxHeadRotationX;
  max_head_rotation_y?: MaxHeadRotationY;
  filters?: Filters19;
}
/**
 * Target needs to be within this range for the attack to happen.
 */
export interface AttackRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to run away from direct sunlight and seek shade.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHG".
 */
export interface FleeSun {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to float around like the Ghast.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHH".
 */
export interface FloatWander {
  priority?: Priority1;
  control_flags?: ControlFlags;
  additional_collision_buffer?: AdditionalCollisionBuffer;
  allow_navigating_through_liquids?: AllowNavigatingThroughLiquids;
  xz_dist?: XzDist;
  y_dist?: YDist;
  y_offset?: YOffset2;
  must_reach?: MustReach;
  float_wander_has_move_control?: FloatWanderHasMoveControl;
  navigate_around_surface?: NavigateAroundSurface;
  random_reselect?: RandomReselect;
  surface_xz_dist?: SurfaceXZDist;
  surface_y_dist?: SurfaceYDist;
  use_home_position_restriction?: UseHomePositionRestriction;
  float_duration?: FloatDuration;
}
/**
 * Range of time in seconds the mob will float around before landing and choosing to do something else.
 */
export interface FloatDuration {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to stay afloat while swimming.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHI".
 */
export interface Float {
  priority?: Priority1;
  control_flags?: ControlFlags;
  sink_with_passengers?: SinkWithPassengers;
  chance_per_tick_to_float?: ChancePerTickToFloat;
  time_under_water_to_dismount_passengers?: TimeUnderWaterToDismountPassengers;
}
/**
 * Allows an entity to be tempted by a set item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DHJ".
 */
export interface FloatTempt {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  can_get_scared?: CanGetScared;
  can_tempt_while_ridden?: CanTemptWhileRidden;
  can_tempt_vertically?: CanTemptVertically;
  items?: Items2;
  sound_interval?: SoundInterval6;
  stop_distance?: StopDistance1;
  tempt_sound?: TemptSound;
  within_radius?: WithinRadius2;
  on_start?: Trigger10;
  on_end?: Trigger11;
}
/**
 * Allows the mob to follow mobs that are in a caravan.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIA".
 */
export interface FollowCaravan {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes4;
  entity_count?: EntityCount;
}
/**
 * Allows the mob to follow other mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIB".
 */
export interface FollowMob {
  priority?: Priority1;
  filters?: Filters20;
  preferred_actor_type?: PreferredActorType;
  speed_multiplier?: SpeedMultiplier1;
  search_range?: SearchRange4;
  stop_distance?: StopDistance2;
  use_home_position_restriction?: UseHomePositionRestriction1;
}
/**
 * Allows the mob to follow the player that owns them.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIC".
 */
export interface FollowOwner {
  priority?: Priority1;
  control_flags?: ControlFlags;
  post_teleport_distance?: PostTeleportDistance;
  speed_multiplier?: SpeedMultiplier1;
  can_teleport?: CanTeleport;
  ignore_vibration?: IgnoreVibration;
  max_distance?: MaxDistance3;
  start_distance?: StartDistance;
  stop_distance?: StopDistance3;
}
/**
 * Allows the mob to follow their parent around.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DID".
 */
export interface FollowParent {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
}
/**
 * Allows mob to move towards its current target leader.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIE".
 */
export interface FollowTargetLeader {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  always_look_for_leader?: AlwaysLookForLeader;
  follow_distance?: FollowDistance;
  leader_filters: Filters21;
  search_cooldown?: SearchCooldown;
  within_radius?: WithinRadius3;
}
/**
 * The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIF".
 */
export interface GoAndGiveItemsToNoteblock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  listen_time?: ListenTime;
  on_item_throw?: Trigger12;
  reach_block_distance?: ReachBlockDistance;
  run_speed?: RunSpeed1;
  throw_force?: ThrowForce;
  throw_sound?: ThrowSound;
  vertical_throw_mul?: VerticalThrowMul;
}
/**
 * The entity will attempt to toss the items from its inventory to its owner.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIG".
 */
export interface GoAndGiveItemsToOwner {
  priority?: Priority1;
  control_flags?: ControlFlags;
  on_item_throw?: Trigger13;
  reach_mob_distance?: ReachMobDistance1;
  run_speed?: RunSpeed2;
  throw_force?: ThrowForce1;
  throw_sound?: ThrowSound1;
  vertical_throw_mul?: VerticalThrowMul1;
}
/**
 * Allows the mob to move back to the position they were spawned.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIH".
 */
export interface GoHome {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius3;
  interval?: Interval2;
  on_home?: Trigger14;
  on_failed?: OnFailed;
  calculate_new_path_radius?: CalculateNewPathRadius;
}
/**
 * Allows this entity to use a laser beam attack. Can only be used by Guardians and Elder Guardians.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DII".
 */
export interface GuardianAttack {
  priority?: Priority1;
  control_flags?: ControlFlags;
  elder_extra_magic_damage?: ElderExtraMagicDamage;
  hard_mode_extra_magic_damage?: HardModeExtraMagicDamage;
  magic_damage?: MagicDamage;
  min_distance?: MinDistance2;
  sound_delay_time?: SoundDelayTime;
  x_max_rotation?: XMaxRotation1;
  y_max_head_rotation?: YMaxHeadRotation1;
}
/**
 * Allows the entity to search within an area for farmland with air above it. If found, the entity will replace the air block by planting a seed item from its inventory on the farmland block. This goal requires "minecraft:inventory" and "minecraft:navigation" to execute. This goal will not execute if the entity does not have an item in its inventory.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DIJ".
 */
export interface HarvestFarmBlock {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius4;
  max_seconds_before_search?: MaximumSecondsBeforeSearch;
  search_cooldown_max_seconds?: SearchCooldownMaximumSeconds1;
  search_count?: SearchCount2;
  search_height?: SearchHeight3;
  search_range?: SearchRange5;
  seconds_until_new_task?: SecondsUntilNewTask;
}
/**
 * Allows a mob with the hide component to attempt to move to - and hide at - an owned or nearby POI.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJA".
 */
export interface Hide1 {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  duration?: Duration13;
  poi_type?: PointOfInterestType;
  timeout_cooldown?: TimeoutCooldown;
}
/**
 * The mob freezes and looks at the mob they are targeting.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJB".
 */
export interface HoldGround {
  priority?: Priority1;
  control_flags?: ControlFlags;
  broadcast?: Broadcast1;
  broadcast_range?: BroadcastRange1;
  min_radius?: MinimumRadius;
  within_radius_event?: Event10;
}
/**
 * Allows the mob to target another mob that hurts them.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJC".
 */
export interface HurtByTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes5;
  hurt_owner?: HurtOwner1;
}
/**
 * Allows the mob to inspect bookshelves.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJD".
 */
export interface InspectBookshelf {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius5;
  search_count?: SearchCount3;
  search_height?: SearchHeight4;
  search_range?: SearchRange6;
}
/**
 * Allows the mob to inspect bookshelves.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJE".
 */
export interface InspectBookshelf1 {
  goal_radius?: GoalRadius6;
  priority?: Priority3;
  speed_multiplier?: SpeedMultiplier2;
  control_flags?: ControlFlags;
}
/**
 * Allows an entity to jump around a target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJF".
 */
export interface JumpAroundTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  check_collision?: CheckCollision;
  entity_bounding_box_scale?: EntityBoundingBoxScale;
  jump_angles?: JumpAngles;
  jump_cooldown_duration?: JumpCooldownDuration;
  jump_cooldown_when_hurt_duration?: JumpCooldownWhenHurtDuration;
  landing_distance_from_target?: VerticalSearchDistance;
  landing_position_spread_degrees?: LandingPositionSpreadDegrees;
  last_hurt_duration?: LastHurtDuration;
  line_of_sight_obstruction_height_ignore?: LineOfSightObstructionHeightIgnore;
  max_jump_velocity?: MaxJumpVelocity;
  prepare_jump_duration?: PrepareJumpDuration;
  required_vertical_space?: RequireVerticalSpace;
  snap_to_surface_block_range?: SnapToSurfaceBlockRange;
  valid_distance_to_target?: ValidDistanceToTarget;
  filters?: Filters22;
}
/**
 * The range deciding how close to and how far away from the target the landing position can be when jumping.
 */
export interface VerticalSearchDistance {
  min?: X6;
  max?: Y6;
}
/**
 * Target needs to be within this range for the jump to happen.
 */
export interface ValidDistanceToTarget {
  min?: X6;
  max?: Y6;
}
/**
 * Allows an entity to jump to another random block.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJG".
 */
export interface JumpToBlock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_range?: CooldownRange;
  forbidden_blocks?: ForbiddenBlocks;
  max_velocity?: MaxVelocity;
  minimum_distance?: MinimumDistance1;
  minimum_path_length?: MinimumPathLength;
  preferred_blocks?: PreferredBlocks;
  preferred_blocks_chance?: PreferredBlocksChance;
  scale_factor?: ScaleFactor;
  search_height?: SearchHeight5;
  search_width?: SearchWidth;
}
/**
 * Minimum and maximum cooldown time-range (positive, in seconds) between each attempted jump.
 */
export interface CooldownRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to perform a damaging knockback that affects all nearby entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJH".
 */
export interface KnockbackRoar {
  priority?: Priority1;
  control_flags?: ControlFlags;
  attack_time?: AttackTime;
  cooldown_time?: CooldownTime5;
  damage_filters?: Filters23;
  duration?: Duration14;
  knockback_damage?: KnockbackDamage;
  knockback_strength?: KnockbackStrength1;
  knockback_filters?: Filters24;
  knockback_horizontal_strength?: KnockbackHorizontalStrength;
  knockback_range?: KnockbackRange;
  knockback_vertical_strength?: KnockbackVerticalStrength;
  knockback_height_cap?: KnockbackHeightCap;
  track_target?: TrackTarget1;
  on_roar_end?: Event11;
}
/**
 * Allows mobs to lay down at times.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJI".
 */
export interface LayDown {
  priority?: Priority1;
  control_flags?: ControlFlags;
  interval?: Interval3;
  random_stop_interval?: RandomStopInterval1;
}
/**
 * Allows the mob to lay an egg block on a sand block if the mob is pregnant.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJJ".
 */
export interface LayEgg {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  allow_laying_from_below?: AllowLayingFromBelow;
  egg_type?: EggType;
  goal_radius?: GoalRadius7;
  lay_egg_sound?: LayEggSound;
  lay_seconds?: LaySeconds;
  on_lay?: Trigger15;
  search_height?: SearchHeight6;
  search_range?: SearchRange7;
  target_blocks?: TargetBlocks1;
  target_materials_above_block?: TargetMaterialsAboveBlock;
  use_default_animation?: UseDefaultAnimation;
}
/**
 * Allows monsters to jump at and attack their target. Can only be used by hostile mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAA".
 */
export interface LeapAtTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  must_be_on_ground?: MustBeOnGround;
  set_persistent?: SetPersistent1;
  yd?: Yd;
}
/**
 * Allows the mob to look at nearby entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAB".
 */
export interface LookAtEntity {
  priority?: Priority1;
  look_distance?: LookDistance1;
  probability?: Probability2;
  look_time?: LookTime1;
  angle_of_view_vertical?: AngleOfViewVertical;
  angle_of_view_horizontal?: AngleOfViewHorizontal;
  filters?: Filters25;
}
/**
 * Time range to look at the nearest entity.
 */
export interface LookTime1 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to look at the player when the player is nearby.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAC".
 */
export interface LookAtPlayer {
  priority?: Priority1;
  angle_of_view_vertical?: AngleOfViewVertical1;
  angle_of_view_horizontal?: AngleOfViewHorizontal1;
  look_distance?: LookDistance2;
  probability?: Probability3;
  look_time?: LookTime2;
  target_distance?: TargetDistance1;
}
/**
 * Time range to look at the nearest player.
 */
export interface LookTime2 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to look at the entity they are targetting.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAD".
 */
export interface LookAtTarget {
  priority?: Priority1;
  look_distance?: LookDistance3;
  probability?: Probability4;
  look_time?: LookTime3;
  angle_of_view_vertical?: AngleOfViewVertical2;
  angle_of_view_horizontal?: AngleOfViewHorizontal2;
}
/**
 * Time range to look at this mob's current target.
 */
export interface LookTime3 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to look at the player they are trading with.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAE".
 */
export interface LookAtTradingPlayer {
  priority?: Priority1;
  look_distance?: LookDistance4;
  probability?: Probability5;
  look_time?: LookTime4;
  angle_of_view_vertical?: AngleOfViewVertical3;
  angle_of_view_horizontal?: AngleOfViewHorizontal3;
}
/**
 * Time range to look at the player this mob is trading with.
 */
export interface LookTime4 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the villager to look for a mate to spawn other villagers with. Can only be used by Villagers.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAF".
 */
export interface MakeLove {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to use close combat melee attacks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAG".
 */
export interface MeleeAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_once?: AttackOnce1;
  attack_types?: AttackTypes1;
  can_spread_on_fire?: CanSpreadOnFire1;
  cooldown_time?: CooldownTime6;
  inner_boundary_time_increase?: InnerBoundaryTimeIncrease1;
  max_dist?: MaxDist2;
  max_path_time?: MaxPathTime1;
  melee_fov?: MeleeFov1;
  min_path_time?: MinPathTime1;
  on_attack?: Trigger16;
  on_kill?: Trigger17;
  outer_boundary_time_increase?: OuterBoundaryTimeIncrease1;
  path_fail_time_increase?: PathFailTimeIncrease1;
  path_inner_boundary?: PathInnerBoundary1;
  path_outer_boundary?: PathOuterBoundary1;
  random_stop_interval?: RandomStopInterval2;
  reach_multiplier?: ReachMultiplier1;
  require_complete_path?: RequireCompletePath1;
  set_persistent?: SetPersistent2;
  target_dist?: TargetDist1;
  track_target?: TrackTarget2;
  x_max_rotation?: XMaxRotation2;
  y_max_head_rotation?: YMaxHeadRotation2;
}
/**
 * Permits an entity to deal damage through a melee attack with reach calculations based on bounding boxes.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAH".
 */
export interface MeleeBoxAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_once?: AttackOnce2;
  attack_types?: AttackTypes2;
  can_spread_on_fire?: CanSpreadOnFire2;
  cooldown_time?: CooldownTime7;
  horizontal_reach?: HorizontalReach;
  inner_boundary_time_increase?: InnerBoundaryTimeIncrease2;
  max_dist?: MaxDist3;
  max_path_time?: MaxPathTime2;
  melee_fov?: MeleeFov2;
  min_path_time?: MinPathTime2;
  on_attack?: Trigger18;
  on_kill?: Trigger19;
  outer_boundary_time_increase?: OuterBoundaryTimeIncrease2;
  path_fail_time_increase?: PathFailTimeIncrease2;
  path_inner_boundary?: PathInnerBoundary2;
  path_outer_boundary?: PathOuterBoundary2;
  random_stop_interval?: RandomStopInterval3;
  reach_multiplier?: ReachMultiplier2;
  require_complete_path?: RequireCompletePath2;
  set_persistent?: SetPersistent3;
  target_dist?: TargetDist2;
  track_target?: TrackTarget3;
  x_max_rotation?: XMaxRotation3;
  y_max_head_rotation?: YMaxHeadRotation3;
}
/**
 * Allows an entity to go to the village bell and mingle with other entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAI".
 */
export interface Mingle {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime8;
  duration?: Duration15;
  mingle_distance?: MingleDistance;
  mingle_partner_type?: MinglePartnerType;
}
/**
 * Allows the mob to move around on its own while mounted seeking a target to attack.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EAJ".
 */
export interface MountPathing {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  target_dist?: TargetDist3;
  track_target?: TrackTarget4;
}
/**
 * Allows this entity to move indoors.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBA".
 */
export interface MoveIndoors {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  timeout_cooldown?: TimeoutCooldown1;
}
/**
 * Forces the entity to move `outside`, whatever that means.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBB".
 */
export interface MoveOutdoors {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius8;
  search_count?: SearchCount4;
  search_height?: SearchHeight7;
  search_range?: SearchRange8;
  timeout_cooldown?: TimeoutCooldown2;
}
/**
 * Can only be used by Villagers. Allows the villagers to create paths around the village.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBC".
 */
export interface MoveThroughVillage {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  only_at_night?: OnlyAtNight;
}
/**
 * Allows mob to move towards a block.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBD".
 */
export interface MoveToBlock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius9;
  on_stay_completed?: Trigger20;
  on_reach?: Trigger21;
  start_chance?: StartChance;
  search_range?: SearchRange9;
  search_height?: SearchHeight8;
  stay_duration?: StayDuration;
  target_selection_method?: TargetSelectionMethod1;
  target_offset?: TargetOffset1;
  target_blocks?: TargetBlocks2;
  target_block_filters?: Filters26;
  tick_interval?: TickInterval1;
}
/**
 * Allows the mob to move back onto land when in water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBE".
 */
export interface MoveToLand {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  goal_radius?: GoalRadius10;
  search_count?: SearchCount5;
  search_height?: SearchHeight9;
  search_range?: SearchRange10;
}
/**
 * Allows the mob to move back into lava when on land.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBF".
 */
export interface MoveToLava {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  goal_radius?: GoalRadius11;
  search_count?: SearchCount6;
  search_height?: SearchHeight10;
  search_range?: SearchRange11;
}
/**
 * Allows the mob to move into a liquid when on land.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBG".
 */
export interface MoveToLiquid {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  goal_radius?: GoalRadius12;
  search_count?: SearchCount7;
  search_height?: SearchHeight11;
  search_range?: SearchRange12;
  material_type?: MaterialType;
}
/**
 * Allows the mob to move to a POI if able to.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBH".
 */
export interface MoveToPoi {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  poi_type?: PointOfInterestType1;
}
/**
 * Allows mob to move towards a random block.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBI".
 */
export interface MoveToRandomBlock {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  block_distance?: BlockDistance1;
  within_radius?: WithinRadius4;
}
/**
 * Allows the mob to move into a random location within a village.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EBJ".
 */
export interface MoveToVillage {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime9;
  goal_radius?: GoalRadius13;
  search_range?: SearchRange13;
}
/**
 * Allows the mob to move back into water when on land.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECA".
 */
export interface MoveToWater {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  search_range?: SearchRange14;
  search_height?: SearchHeight12;
  search_count?: SearchCount8;
  goal_radius?: GoalRadius14;
}
/**
 * Allows mobs with the dweller component to move toward their Village area that the mob should be restricted to.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECB".
 */
export interface MoveTowardsDwellingRestriction {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
}
/**
 * Allows mobs with the home component to move toward their pre-defined area that the mob should be restricted to.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECC".
 */
export interface MoveTowardsHomeRestriction {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
}
/**
 * Allows Guardians, Iron Golems and Villagers to move within their pre-defined area that the mob should be restricted to. Other mobs don't have a restriction defined.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECD".
 */
export interface MoveTowardsRestriction {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
}
/**
 * Allows mob to move towards its current target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECE".
 */
export interface MoveTowardsTarget {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  within_radius?: WithinRadius5;
}
/**
 * Allows mobs to occassionally stop and take a nap under certain conditions.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECF".
 */
export interface Nap {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_max?: CooldownMax;
  cooldown_min?: CooldownMin;
  mob_detect_dist?: MobDetectDist;
  mob_detect_height?: MobDetectHeight;
  can_nap_filters?: Filters27;
  wake_mob_exceptions?: Filters28;
}
/**
 * Allows an entity to attack the closest target within a given subset of specific target types.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECG".
 */
export interface NearestAttackableTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes6;
  attack_interval?: AttackInterval1;
  attack_interval_min?: AttackIntervalMin;
  attack_owner?: AttackOwner;
  must_reach?: MustReach1;
  must_see?: MustSee3;
  must_see_forget_duration?: MustSeeForgetDuration2;
  persist_time?: PersistTime;
  reselect_targets?: ReselectTargets;
  scan_interval?: ScanInterval;
  set_persistent?: SetPersistent4;
  target_acquisition_probability?: TargetAcquisitionProbability;
  target_invisible_multiplier?: TargetInvisibleMultiplier;
  target_search_height?: TargetSearchHeight;
  target_sneak_visibility_multiplier?: TargetSneakVisibilityMultiplier;
  within_radius?: WithinRadius6;
}
/**
 * Allows the mob to check for and pursue the nearest valid target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECH".
 */
export interface NearestPrioritizedAttackableTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes7;
  /**
   * If true, this mob will also attack mobs that hurt its owner.
   */
  hurt_owner?: boolean;
  attack_interval?: AttackInterval2;
  cooldown?: Cooldown5;
  must_reach?: MustReach2;
  must_see?: MustSee4;
  must_see_forget_duration?: MustSeeForgetDuration3;
  persist_time?: PersistTime1;
  reselect_targets?: ReselectTargets1;
  scan_interval?: ScanInterval1;
  set_persistent?: SetPersistent5;
  target_search_height?: TargetSearchHeight1;
  within_radius?: WithinRadius7;
}
/**
 * Allows an entity to sit in place, similar to the ocelot entity animation pose.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECI".
 */
export interface OcelotSitOnBlock {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
}
/**
 * Can only be used by the Ocelot. Allows it to perform the sneak and pounce attack.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECJ".
 */
export interface Ocelotattack {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime10;
  max_distance?: MaxDistance4;
  max_sneak_range?: MaxSneakRange;
  max_sprint_range?: MaxSprintRange;
  reach_multiplier?: ReachMultiplier3;
  sneak_speed_multiplier?: SneakSpeedMultiplier;
  sprint_speed_multiplier?: SprintSpeedMultiplier2;
  walk_speed_multiplier?: WalkSpeedMultiplier2;
  x_max_rotation?: XMaxRotation4;
  y_max_head_rotation?: YMaxHeadRotation4;
}
/**
 * Allows the mob to offer the player a flower like the Iron Golem does.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDA".
 */
export interface OfferFlower {
  priority?: Priority1;
  chance_to_start?: ChanceToStart;
  filters?: Filters29;
  max_head_rotation_y?: MaxHeadRotationY1;
  max_offer_flower_duration?: MaxOfferFlowerDuration;
  max_rotation_x?: MaxRotationX;
  search_area?: SearchArea;
}
/**
 * Allows the mob to open doors. Requires the mob to be able to path through doors, otherwise the mob won't even want to try opening them.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDB".
 */
export interface OpenDoor {
  priority?: Priority1;
  control_flags?: ControlFlags;
  close_door_after?: CloseDoorAfter;
}
/**
 * Allows the mob to target another mob that hurts their owner.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDC".
 */
export interface OwnerHurtByTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes8;
}
/**
 * Allows the mob to target a mob that is hurt by their owner.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDD".
 */
export interface OwnerHurtTarget {
  priority?: Priority1;
  entity_types?: EntityTYpes;
}
/**
 * Allows the mob to enter the panic state, which makes it run around and away from the damage source that made it enter this state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDE".
 */
export interface Panic {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  damage_sources?: DamageSources;
  force?: Force;
  ignore_mob_damage?: IgnoreMobDamage;
  prefer_water?: PreferWater;
  panic_sound?: PanicSound;
  sound_interval?: SoundInterval7;
}
/**
 * The range of time in seconds to randomly wait before playing the sound again.
 */
export interface SoundInterval7 {
  range_min?: RangeMinimum2;
  range_max?: RangeMaximum2;
}
/**
 * Allows the mob to be tempted by food they like.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDF".
 */
export interface PetSleepWithOwner {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  goal_radius?: GoalRadius15;
  search_height?: SearchHeight13;
  search_radius?: SearchRadius1;
  search_range?: SearchRange15;
}
/**
 * Allows the mob to pick up items on the ground.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDG".
 */
export interface PickupItems {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  can_pickup_any_item?: CanPickupAnyItem;
  can_pickup_to_hand_or_equipment?: CanPickupToHandOrEquipment;
  cooldown_after_being_attacked?: CooldownAfterBeingAttacked3;
  excluded_items?: ExcludedItems2;
  goal_radius?: GoalRadius16;
  max_dist?: MaximumDist1;
  search_height?: SearchHeight14;
  stop_if_holding_item?: StopIfHoldingItem;
  pickup_based_on_chance?: PickupBasedOnChance;
  pickup_same_items_as_in_hand?: PickupSameItemsAsInHand;
  track_target?: TrackTarget5;
  on_pickup_item_start?: Trigger22;
  on_pickup_item_end?: Trigger23;
}
/**
 * Allows an entity to place blocks in the world
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDH".
 */
export interface PlaceBlock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  affected_by_griefing_rule?: AffectedByGriefingRule;
  can_place?: Filters30;
  chance?: Chance3;
  on_place?: Event12;
  placeable_carried_blocks?: PlaceableCarriedBlocks;
  randomly_placeable_blocks?: RandomlyPlaceableBlocks;
  xz_range?: XZRange;
  y_range?: YRange;
}
/**
 * XZ range from which the entity will try and place blocks in.
 */
export interface XZRange {
  min?: X4;
  max?: Y4;
}
/**
 * Y range from which the entity will try and place blocks in.
 */
export interface YRange {
  min?: X4;
  max?: Y4;
}
/**
 * Allows the mob to play dead when attacked by other entities. When playing dead, other entities will not target this mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDI".
 */
export interface PlayDead {
  priority?: Priority1;
  apply_regeneration?: ApplyRegeneration;
  duration?: Duration16;
  filters?: Filters31;
  force_below_health?: ForceBelowHealth;
  random_start_chance?: RandomStartChance;
  random_damage_range?: RandomDamageRange;
  damage_sources?: DamageSources1;
}
/**
 * The range of damage that may cause the goal to start depending on randomness. Damage taken below the min will never cause the goal to start. Damage taken above the max will always cause the goal to start.
 */
export interface RandomDamageRange {
  min?: X4;
  max?: Y4;
}
/**
 * Allows the mob to play with other baby villagers. This can only be used by Villagers.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EDJ".
 */
export interface Play {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  chance_to_start?: ChanceToStart1;
  follow_distance?: FollowDistance1;
  friend_search_area?: FriendSearchArea;
  friend_types?: FriendTypes;
  max_play_duration_seconds?: MaxPlayDurationSeconds;
  random_pos_search_height?: RandomPosSearchHeight;
  random_pos_search_range?: RandomPosSearchRange;
}
/**
 * Allows the mob to be ridden by the player after being tamed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEA".
 */
export interface PlayerRideTamed {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to eat/raid crops out of farms until they are full.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEB".
 */
export interface RaidGarden {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  blocks?: Blocks1;
  eat_delay?: EatDelay;
  full_delay?: FullDelay;
  initial_eat_delay?: InitialEatDelay;
  goal_radius?: GoalRadius17;
  max_to_eat?: MaximumToEat;
  search_range?: SearchRange16;
  search_height?: SearchHeight15;
}
/**
 * Allows the mob to search for a random target and, if a direct path exists between the mob and the target, it will perform a charge. If the attack hits, the target will be knocked back based on the mob's speed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEC".
 */
export interface RamAttack {
  priority?: Priority1;
  control_flags?: ControlFlags;
  baby_knockback_modifier?: BabyKnockbackModifier;
  cooldown_range?: CooldownRange1;
  knockback_force?: KnockbackForce1;
  knockback_height?: KnockbackHeight;
  min_ram_distance?: MinRamDistance;
  on_start?: Trigger24;
  pre_ram_sound?: PreRamSound;
  ram_distance?: RamDistance;
  ram_impact_sound?: RamImpactSound;
  ram_speed?: RamSpeed;
  run_speed?: RunSpeed3;
  trigger?: Trigger25;
}
/**
 * Minimum and maximum cooldown time-range (positive, in seconds) between each attempted ram attack.
 */
export interface CooldownRange1 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to randomly break surface of the water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EED".
 */
export interface RandomBreach {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime11;
  interval?: Interval4;
  xz_dist?: XZDistance;
  y_dist?: YDistance;
}
/**
 * Allows a mob to randomly fly around.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEE".
 */
export interface RandomFly {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  avoid_damage_blocks?: AvoidDamageBlocks7;
  can_land_on_trees?: CanLandOnTrees;
  xz_dist?: XzDist1;
  y_dist?: YDist1;
  y_offset?: YOffset3;
}
/**
 * Allows the mob to hover around randomly, close to the surface.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEF".
 */
export interface RandomHover {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  hover_height?: HoverHeight;
  interval?: Interval5;
  xz_dist?: XzDist2;
  y_dist?: YDist2;
  y_offset?: YOffset4;
}
/**
 * Allows the mob to randomly sit and look around for a duration. Note: Must have a sitting animation set up to use this.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEG".
 */
export interface RandomLookAroundAndSit {
  priority?: Priority1;
  control_flags?: ControlFlags;
  continue_if_leashed?: ContinueIfLeashed;
  continue_sitting_on_reload?: ContinueSittingOnReload;
  max_angle_of_view_horizontal?: MaxAngleOfViewHorizontal;
  max_look_count?: MaxLookCount;
  max_look_time?: MaxLookTime;
  min_angle_of_view_horizontal?: MinAngleOfViewHorizontal;
  min_look_count?: MinLookCount;
  min_look_time?: MinLookTime;
  probability?: Probability6;
  random_look_around_cooldown?: RandomLookAroundCooldown;
}
/**
 * Allows the mob to randomly look around.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEH".
 */
export interface RandomLookAround {
  priority?: Priority1;
  control_flags?: ControlFlags;
  angle_of_view_horizontal?: AngleOfViewHorizontal4;
  angle_of_view_vertical?: AngleOfViewVertical4;
  look_time?: LookTime5;
  probability?: Probability7;
}
/**
 * The range of time in seconds the mob will stay looking in a random direction before looking elsewhere
 */
export interface LookTime5 {
  min?: X4;
  max?: Y4;
}
/**
 * Allows this entity to locate a random target block that it can path find to. Once found, the entity will move towards it and dig up an item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEI".
 */
export interface RandomLookAround1 {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown_range?: CooldownRange2;
  digging_duration_range?: DiggingDurationRange;
  find_valid_position_retries?: FindValidPositionRetries;
  goal_radius?: GoalRadius18;
  item_table?: ItemTable;
  on_digging_start?: Trigger26;
  on_fail_during_digging?: Trigger27;
  on_fail_during_searching?: Trigger28;
  on_item_found?: Trigger29;
  on_searching_start?: Trigger30;
  on_success?: Trigger31;
  search_range_xz?: SearchRangeXZ;
  search_range_y?: SearchRangeY;
  spawn_item_after_seconds?: SpawnItemAfterSeconds;
  spawn_item_pos_offset?: SpawnItemPosOffset;
  target_blocks?: TargetBlocks3;
  target_dig_position_offset?: TargetDigPositionOffset;
}
/**
 * Digging duration in seconds.
 */
export interface DiggingDurationRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to randomly sit for a duration.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EEJ".
 */
export interface RandomSitting {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  cooldown?: Cooldown6;
  min_sit_time?: MinimumSitTime;
  start_chance?: StartChance1;
  stop_chance?: StopChance;
}
/**
 * Allows a mob to randomly stroll around.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFA".
 */
export interface RandomStroll {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  interval?: Interval6;
  xz_dist?: XZDistance1;
  y_dist?: YDistance1;
}
/**
 * Allows an entity to randomly move through water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFB".
 */
export interface RandomSwim {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  avoid_surface?: AvoidSurface;
  interval?: Interval7;
  xz_dist?: XZDistance2;
  y_dist?: YDistance2;
}
/**
 * Allows the mob to use ranged attacks like shooting arrows.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFC".
 */
export interface RangedAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_interval?: AttackInterval3;
  attack_radius?: AttackRadius;
  attack_radius_min?: AttackRadiusMin;
  burst_interval?: BurstInterval;
  burst_shots?: BurstShots;
  charge_charged_trigger?: ChargeChargedTrigger;
  charge_shoot_trigger?: ChargeShootTrigger;
  ranged_fov?: RangedFov1;
  set_persistent?: SetPersistent6;
  swing?: Swing1;
  target_in_sight_time?: TargetInSightTime;
  x_max_rotation?: XMaxRotation5;
  y_max_head_rotation?: YMaxHeadRotation5;
}
/**
 * Reload-time (in seconds), when not using a charged shot. Does not scale with target-distance.
 */
export interface AttackInterval3 {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the villager to stop so another villager can breed with it. Can only be used by a Villager.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFD".
 */
export interface ReceiveLove {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to stay indoors during night time.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFE".
 */
export interface RestrictOpenDoor {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to automatically start avoiding the sun when its a clear day out.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFF".
 */
export interface RestrictSun {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to stay at a certain level when in liquid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFG".
 */
export interface RiseToLiquidLevel {
  priority?: Priority1;
  control_flags?: ControlFlags;
  liquid_y_offset?: LiquidYOffset;
  rise_delta?: RiseDelta;
  sink_delta?: SinkDelta;
}
/**
 * Allows this entity to roar at another entity based on data in minecraft:anger_level. Once the anger threshold specified in minecraft:anger_level has been reached, this entity will roar for the specified amount of time, look at the other entity, apply anger boost towards it, and finally target it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFH".
 */
export interface Roar {
  priority?: Priority1;
  control_flags?: ControlFlags;
  duration?: Duration17;
}
/**
 * This allows the mob to roll forward.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFI".
 */
export interface Roll {
  priority?: Priority1;
  control_flags?: ControlFlags;
  probability?: Probability8;
}
/**
 * Allows the mob to run around aimlessly.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EFJ".
 */
export interface RunAroundLikeCrazy {
  priority?: Priority1;
  control_flags?: ControlFlags;
  speed_multiplier?: SpeedMultiplier1;
}
/**
 * Allows the a mob to become scared when the weather outside is thundering.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGA".
 */
export interface Scared {
  priority?: Priority1;
  control_flags?: ControlFlags;
  sound_interval?: SoundInterval8;
}
/**
 * Allows the mob to send an event to another mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGB".
 */
export interface SendEvent {
  priority?: Priority1;
  cast_duration?: CastDuration;
  look_at_target?: LookAtTarget1;
  event_choices?: EventChoices;
  sequence?: Sequence;
}
/**
 * A spell that the mob can cast.
 */
export interface EventChoice {
  min_activation_range?: MinimumActivationRange;
  max_activation_range?: MaxmimumActivationRange;
  cooldown_time?: CooldownTime12;
  cast_duration?: CastDuration1;
  filters?: Filters3;
  particle_color?: ParticleColor;
  weight?: Weight3;
  start_sound_event?: StartSoundEvent;
  sequence?: EGBSequence;
}
/**
 * Allows the mob to give items it has to others.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGC".
 */
export interface ShareItems {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes9;
  goal_radius?: GoalRadius19;
  max_dist?: MaximumDistance2;
}
/**
 * Allows the mob to go into stone blocks like Silverfish do. Currently it can only be used by Silverfish.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGD".
 */
export interface SilverfishMergeWithStone {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to alert mobs in nearby blocks to come out. Currently it can only be used by Silverfish.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGE".
 */
export interface SilverfishWakeUpFriends {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows Equine mobs to be Horse Traps and be triggered like them, spawning a lightning bolt and a bunch of horses when a player is nearby. Can only be used by Horses, Mules, Donkeys and Skeleton Horses.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGF".
 */
export interface SkeletonHorseTrap {
  priority?: Priority1;
  control_flags?: ControlFlags;
  duration?: Duration18;
  within_radius?: WithinRadius8;
}
/**
 * Allows mobs that own a bed to in a village to move to and sleep in it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGG".
 */
export interface Sleep {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  can_sleep_while_riding?: CanSleepWhileRiding;
  cooldown_time?: CooldownTime13;
  sleep_collider_height?: SleepColliderHeight;
  sleep_collider_width?: SleepColliderWidth;
  sleep_y_offset?: SleepYOffset;
  timeout_cooldown?: TimeoutCooldown3;
  goal_radius?: GoalRadius20;
}
/**
 * Can only be used by Slimes and Magma Cubes. Allows the mob to use a melee attack like the slime's.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGH".
 */
export interface SlimeAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  grow_tired_cooldown_time?: GrowTiredCooldownTime;
  set_persistent?: SetPersistent7;
  x_max_rotation?: XMaxRotation6;
  y_max_rotation?: YMaxRotation;
}
/**
 * Allow slimes to float in water / lava. Can only be used by Slime and Magma Cubes.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGI".
 */
export interface SlimeFloat {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  jump_chance_percentage?: JumpChancePercentage;
}
/**
 * Can only be used by Slimes and Magma Cubes. Allows the mob to continuously jump around like a slime.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EGJ".
 */
export interface SlimeKeepOnJumping {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
}
/**
 * Can only be used by Slimes and Magma Cubes. Allows the mob to move in random directions like a slime.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHA".
 */
export interface SlimeRandomDirection {
  priority?: Priority1;
  control_flags?: ControlFlags;
  add_random_time_range?: AddRandomTimeRange;
  min_change_direction_time?: MinChangeDirectionTime;
  turn_range?: TurnRange;
}
/**
 * Allows the mob to take a load off and snack on food that it found nearby.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHB".
 */
export interface Snacking {
  priority?: Priority1;
  control_flags?: ControlFlags;
  items?: Items3;
  snacking_cooldown?: SnackingCooldown;
  snacking_cooldown_min?: SnackingCooldownMinimum;
  snacking_stop_chance?: SnackingStopChance;
}
/**
 * Allows the mob to stop and sneeze possibly startling nearby mobs and dropping an item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHC".
 */
export interface Sneeze {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime14;
  drop_item_chance?: DropItemChance1;
  entity_types?: EntityTypes10;
  loot_table?: LootTable2;
  prepare_sound?: PrepareSound;
  prepare_time?: PrepareTime;
  probability?: Probability9;
  sound?: Sound2;
  within_radius?: WithinRadius9;
}
/**
 * Sniff compels this entity to detect the nearest player within "sniffing_radius" and update its minecraft:suspect_tracking component state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHD".
 */
export interface Sniff {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_range?: CooldownRange3;
  duration?: Duration19;
  sniffing_radius?: SniffingRadius;
  suspicion_radius_horizontal?: SuspicionRadiusHorizontal;
  suspicion_radius_vertical?: SuspicionRadiusVertical;
}
/**
 * Cooldown range between sniffs in seconds.
 */
export interface CooldownRange3 {
  min?: X6;
  max?: Y6;
}
/**
 * Plays the provided sounds and activates the `SONIC BOOM` actor flag during the specified duration
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHE".
 */
export interface SonicBoom {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_cooldown?: AttackCooldown2;
  attack_damage?: AttackDamage;
  attack_range_horizontal?: AttackRangeHorizontal;
  attack_range_vertical?: AttackRangeVertical;
  attack_sound?: AttackSound;
  charge_sound?: ChargeSound;
  duration?: Duration20;
  duration_until_attack_sound?: DurationUntilAttackSound;
  knockback_height_cap?: KnockbackHeightCap1;
  knockback_horizontal_strength?: KnockbackHorizontalStrength1;
  knockback_vertical_strength?: KnockbackVerticalStrength1;
}
/**
 * Allows an entity to dive underwater.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHF".
 */
export interface SquidDive {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the squid to swim away. Can only be used by the Squid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHG".
 */
export interface SquidFlee {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the squid to swim in place idly. Can only be used by the Squid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHH".
 */
export interface SquidIdle {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the squid to move away from ground blocks and back to water. Can only be used by the Squid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHI".
 */
export interface SquidMoveAwayFromGround {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the squid to stick to the ground when outside water. Can only be used by the Squid.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EHJ".
 */
export interface SquidOutOfWater {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows an entity to stalk a specific target. Once within range of the target, the entity will then leap at the target and deal damage based upon its attack attribute.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIA".
 */
export interface StalkAndPounceOnTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  interest_time?: InterestTime;
  leap_distance?: LeapDistance;
  leap_height?: LeapHeight;
  max_stalk_dist?: MaximumStalkDist;
  pounce_max_dist?: PounceMaximumDist;
  set_persistent?: SetPersistent8;
  stalk_speed?: StalkSpeed;
  strike_dist?: StrikeDist;
  stuck_time?: StuckTime;
  leap_dist?: LeapDist;
  stuck_blocks?: Filters32;
}
/**
 * [EXPERIMENTAL BEHAVIOR] The entity will attempt to toss the items from its inventory to a nearby recently played noteblock.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIB".
 */
export interface StayNearNoteblock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  listen_time?: ListenTime1;
  speed?: Speed;
  start_distance?: StartDistance1;
  stop_distance?: StopDistance4;
}
/**
 * Allows the mob to stay put while it is in a sitting state instead of doing something else.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIC".
 */
export interface StayWhileSitting {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the mob to use the polar bear's melee attack.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EID".
 */
export interface StompAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  attack_once?: AttackOnce3;
  attack_types?: AttackTypes3;
  can_spread_on_fire?: CanSpreadOnFire3;
  cooldown_time?: CooldownTime15;
  inner_boundary_time_increase?: InnerBoundaryTimeIncrease3;
  max_path_time?: MaxPathTime3;
  melee_fov?: MeleeFov3;
  min_path_time?: MinPathTime3;
  no_damage_range_multiplier?: NoDamageRangeMultiplier;
  on_attack?: Trigger32;
  on_kill?: Trigger33;
  outer_boundary_time_increase?: OuterBoundaryTimeIncrease3;
  path_fail_time_increase?: PathFailTimeIncrease3;
  path_inner_boundary?: PathInnerBoundary3;
  path_outer_boundary?: PathOuterBoundary3;
  random_stop_interval?: RandomStopInterval4;
  reach_multiplier?: ReachMultiplier4;
  require_complete_path?: RequireCompletePath3;
  set_persistent?: SetPersistent9;
  stomp_range_multiplier?: StompRangeMultiplier;
  target_dist?: TargetDist4;
  track_target?: TrackTarget6;
  x_max_rotation?: XMaxRotation7;
  y_max_head_rotation?: YMaxHeadRotation6;
}
/**
 * Allows this mob to stomp turtle eggs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIE".
 */
export interface StompTurtleEgg {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  goal_radius?: GoalRadius21;
  interval?: Interval8;
  search_count?: SearchCount9;
  search_height?: SearchHeight16;
  search_range?: SearchRange17;
}
/**
 * Allows the mob to move into a random location within a village within the search range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIF".
 */
export interface StrollTowardsVillage {
  priority?: Priority1;
  control_flags?: ControlFlags;
  cooldown_time?: CooldownTime16;
  goal_radius?: GoalRadius22;
  search_range?: SearchRange18;
  speed_multiplier?: SpeedMultiplier3;
  start_chance?: StartChance2;
}
/**
 * Allows the mob to attack the player by summoning other entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIG".
 */
export interface SummonEntity {
  priority?: Priority1;
  control_flags?: ControlFlags;
  summon_choices?: SummonChoices;
}
export interface Sequence2 {
  delay?: Delay1;
  delay_per_summon?: DelayPerSummon;
  entity_lifespan?: EntityLifespan;
  base_delay?: BaseDelay;
  entity_type?: EntityType2;
  num_entities_spawned?: NumberEntitiesSpawned;
  shape?: Shape1;
  size?: Size1;
  sound_event?: SoundEvent3;
  summon_cap?: SummonCap;
  summon_cap_radius?: SummonCapRadius;
  summon_event?: SummonEvent;
  target?: Target2;
}
/**
 * Allows the creeper to swell up when a player is nearby. It can only be used by Creepers.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIH".
 */
export interface Swell {
  priority?: Priority1;
  control_flags?: ControlFlags;
  start_distance?: StartDistance2;
  stop_distance?: StopDistance5;
}
/**
 * Allows the entity go idle, if swimming. Entity must be in water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EII".
 */
export interface SwimIdle {
  priority?: Priority1;
  control_flags?: ControlFlags;
  idle_time?: IdleTime1;
  success_rate?: SuccesRate;
}
/**
 * Allows the mob to try to move to air once it is close to running out of its total breathable supply.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EIJ".
 */
export interface SwimUpForBreath {
  priority?: Priority1;
  control_flags?: ControlFlags;
  material_type?: IdleTime2;
  search_height?: SearchHeight17;
  search_radius?: SearchRadius2;
  speed_mod?: SpeedMod;
}
/**
 * Has the fish swim around when they can't pathfind.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJA".
 */
export interface SwimWander {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  interval?: Interval9;
  look_ahead?: LookAhead;
  wander_time?: WanderTime;
}
/**
 * Allows the entity follow another entity. Both entities must be swimming and in water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJB".
 */
export interface SwimWithEntity {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  success_rate?: SuccessRate1;
  chance_to_stop?: ChanceToStop;
  state_check_interval?: StateCheckInterval;
  catch_up_threshold?: CatchUpThreshold;
  match_direction_threshold?: MatchDirectionThreshold;
  catch_up_multiplier?: CatchUpMultiplier;
  search_range?: SearchRange19;
  stop_distance?: StopDistance6;
  entity_types?: EntityTypes11;
}
/**
 * Allows the mob to move to attack a target. The goal ends if it has a horizontal collision or gets hit. Built to be used with flying mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJC".
 */
export interface SwoopAttack {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  control_flags?: ControlFlags;
  damage_reach?: DamageReach;
  delay_range?: DelayRange;
}
/**
 * Minimum and maximum cooldown time-range (in seconds) between each attempted swoop attack.
 */
export interface DelayRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows an entity to take blocks from the world.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJD".
 */
export interface TakeBlock {
  priority?: Priority1;
  control_flags?: ControlFlags;
  affected_by_griefing_rule?: AffectedByGriefingRule1;
  blocks?: Blocks2;
  can_take?: Filters33;
  chance?: Chance4;
  on_take?: Event13;
  requires_line_of_sight?: RequiresLineOfSight;
  xz_range?: XZRange1;
  y_range?: YRange1;
}
/**
 * XZ range from which the entity will try and take blocks from.
 */
export interface XZRange1 {
  min?: X4;
  max?: Y4;
}
/**
 * Y range from which the entity will try and take blocks from.
 */
export interface YRange1 {
  min?: X4;
  max?: Y4;
}
/**
 * Can only be used by Villagers. Allows the mob to accept flowers from Iron Golems.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJE".
 */
export interface TakeFlower {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  filters?: Filters34;
  max_head_rotation_y?: MaxHeadRotationY2;
  max_rotation_x?: MaxRotationX1;
  max_wait_time?: MaxWaitTime1;
  min_distance_to_target?: MinDistanceToTarget;
  min_wait_time?: MinWaitTime1;
  search_area?: SearchArea1;
  on_take_flower?: Trigger34;
}
/**
 * Allows an entity to teleport to its owner.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJF".
 */
export interface TeleportToOwner {
  priority?: Priority1;
  cooldown?: Cooldown7;
  filters?: Filters35;
}
/**
 * Allows an entity to move around a target. If the entity is too close (i.e. closer than destination range min and height difference limit) it will try to move away from its target. If the entity is too far away from its target it will try to move closer to a random position within the destination range. A randomized amount of those positions will be behind the target, and the spread can be tweaked with 'destination_pos_search_spread_degrees'.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJG".
 */
export interface MoveAroundTarget {
  priority?: Priority1;
  control_flags?: ControlFlags;
  destination_pos_search_spread_degrees?: DesitnationPosSearchSpreadDegrees;
  destination_position_range?: DesitnationPositionRange;
  destination_pos_spread_degrees?: DesitnationPosSpreadDegrees;
  height_difference_limit?: HeightDifferenceLimit;
  horizontal_search_distance?: HorizontalSearchDistance;
  movement_speed?: MovementSpeed;
  vertical_search_distance?: VerticalSearchDistance1;
  filters?: Filters36;
}
/**
 * The range of distances from the target entity within which the goal should look for a position to move the owner entity to.
 */
export interface DesitnationPositionRange {
  min?: X6;
  max?: Y6;
}
/**
 * Allows an entity to select a valid target entity that pushed it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJH".
 */
export interface TargetWhenPushed {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes12;
  percent_chance?: PercentChance;
}
/**
 * Allows an entity to be tempted by a set item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJI".
 */
export interface Tempt {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  can_get_scared?: CanGetScared1;
  can_tempt_while_ridden?: CanTemptWhileRidden1;
  can_tempt_vertically?: CanTemptVertically1;
  items?: Items4;
  sound_interval?: SoundInterval9;
  stop_distance?: StopDistance7;
  tempt_sound?: TemptSound1;
  within_radius?: WithinRadius10;
  on_start?: Trigger35;
  on_end?: Trigger36;
}
/**
 * Fires an event when this behavior starts, then waits for a duration before stopping. When stopping due to that timeout or due to being interrupted by another behavior, fires another event. query.timer_flag_<n> will return 1.0 on both the client and server when this behavior is running, and 0.0 otherwise.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJJ".
 */
export interface TimerFlag {
  priority?: Priority1;
  cooldown_range?: CooldownRange4;
  duration_range?: DurationRange;
  control_flags?: ControlFlags;
  on_end?: Trigger37;
  on_start?: Trigger38;
}
/**
 * Allows the mob to look at a player that is holding a tradable item.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAA".
 */
export interface TradeInterest {
  priority?: Priority1;
  control_flags?: ControlFlags;
  carried_item_switch_time?: CarriedItemSwitchTime;
  cooldown?: Cooldown8;
  interest_time?: InterestTime1;
  remove_item_time?: RemoveItemTime;
  within_radius?: WithinRadius11;
}
/**
 * Allows the player to trade with this mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAB".
 */
export interface TradeWithPlayer {
  priority?: Priority1;
  filters?: Filters37;
}
/**
 * Allows a mob to transport items from and to containers
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAC".
 */
export interface TransportItems {
  priority?: Priority1;
  source_container_types?: SourceContainerTypes;
  destination_container_types?: DestinationContainerTypes;
  max_stack_size?: MaxStackSize;
  interaction_time?: InteractionTime;
  allow_simultaneous_interaction?: AllowSimultaneousInteraction;
  search_strategy?: SearchStrategy;
  search_distance?: SearchDistance;
  max_visited_containers?: MaxVisitedContainers;
  initial_cooldown?: InitialCooldwon;
  idle_cooldown?: IdleCooldown;
  place_strategy?: PlaceStrategy;
  /**
   * A list of item descriptors that are the only items the mob is allowed to transport. If this and "disallowed_items" are both empty, then all items are allowed. If non-empty "disallowed_items" must be empty. Default value: empty.
   */
  allowed_items?: string[];
  /**
   * A list of item descriptors that are the mob is not allowed to transport. If non-empty "allowed_items" must be empty. Default value: emtpy.
   */
  disallowed_items?: string[];
}
/**
 * Allows a mob to make use of items with a "minecraft:kinetic_weapon" item component. The mob will approach the target before using the weapon and charging with it. If the target gets too close, the mob will retreat and reposition before charging again. Once all "max_duration"s in the item's "minecraft:kinetic_weapon" component have elapsed, the mob goes on cooldown and retreats before approaching again
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAD".
 */
export interface UseKineticWeapon {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  approach_distance?: ApproachDistance;
  reposition_distance?: RepositionDistance;
  cooldown_distance?: CooldownDistance;
  reposition_speed_multiplier?: RepositionSpeedMultiplier;
  cooldown_speed_multiplier?: CooldownSpeedMultiplier;
  weapon_reach_multiplier?: WeaponReachMultiplier;
  weapon_min_speed_multiplier?: WeaponMinSpeedMultiplier;
  max_path_time?: MaxPathTime4;
  melee_fov?: MeleeFov4;
  min_path_time?: MinPathTime4;
  outer_boundary_time_increase?: OuterBoundaryTimeIncrease4;
  path_fail_time_increase?: PathFailTimeIncrease4;
  path_inner_boundary?: PathInnerBoundary4;
  path_outer_boundary?: PathOuterBoundary4;
  require_complete_path?: RequireCompletePath4;
  track_target?: TrackTarget7;
  cooldown_time?: CooldownTime18;
  x_max_rotation?: XMaxRotation8;
  y_max_head_rotation?: YMaxHeadRotation7;
  random_stop_interval?: RandomStopInterval5;
  attack_once?: AttackOnce4;
  hijack_mount_navigation?: HijackMountNavigation;
}
/**
 * The distance the mob retreats to once the target is closer than the midpoint of the item's "minecraft:kinetic_weapon" component's minimum and maximum "reach"
 */
export interface RepositionDistance {
  min?: X6;
  max?: Y6;
}
/**
 * The distance the mob retreats to after all of the item's "minecraft:kinetic_weapon" component's "max_duration" values have elapsed
 */
export interface CooldownDistance {
  min?: X6;
  max?: Y6;
}
/**
 * Allows the mob to target the same entity its owner is targeting.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAE".
 */
export interface VexCopyOwnerTarget {
  priority?: Priority1;
  entity_types?: EntityTypes13;
}
/**
 * Allows the mob to move around randomly like the Vex.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAF".
 */
export interface VexRandomMove {
  priority?: Priority1;
  entity_types?: EntityTypes14;
}
/**
 * Allows the wither to launch random attacks. Can only be used by the Wither Boss.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAG".
 */
export interface WitherRandomAttackPosGoal {
  priority?: Priority1;
  control_flags?: ControlFlags;
}
/**
 * Allows the wither to focus its attacks on whichever mob has dealt the most damage to it. Can only be used by the Wither Boss.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAH".
 */
export interface WitherTargetHighestDamage {
  priority?: Priority1;
  control_flags?: ControlFlags;
  entity_types?: EntityTypes15;
}
/**
 * Allows the NPC to use the POI.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAI".
 */
export interface Work {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  active_time?: ActiveTime;
  can_work_in_rain?: CanWorkInRain;
  goal_cooldown?: GoalCooldown;
  on_arrival?: Trigger39;
  sound_delay_max?: SoundDelayMax;
  sound_delay_min?: SoundDelayMin;
  work_in_rain_tolerance?: WorkInRainTolerance;
}
/**
 * Allows the NPC to use the composter POI to convert excess seeds into bone meal.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FAJ".
 */
export interface WorkComposter {
  priority?: Priority1;
  speed_multiplier?: SpeedMultiplier1;
  active_time?: ActiveTime1;
  block_interaction_max?: BlockInteractionMax;
  can_empty_composter?: CanEmptyComposter;
  can_fill_composter?: CanFillComposter;
  can_work_in_rain?: CanWorkInRain1;
  goal_cooldown?: GoalCooldown1;
  items_per_use_max?: ItemsPerUseMax;
  min_item_count?: MinItemCount;
  on_arrival?: Trigger40;
  sound_delay_max?: SoundDelayMax1;
  sound_delay_min?: SoundDelayMin1;
  use_block_max?: UseBlockMax;
  use_block_min?: UseBlockMin;
  work_in_rain_tolerance?: WorkInRainTolerance1;
}
/**
 * The components that are added as the foundation of the entity.
 */
export interface Component1 {
  "minecraft:absorption"?: Attribute;
  "minecraft:addrider"?: AddRider;
  "minecraft:admire_item"?: AdmireItem;
  "minecraft:ageable"?: Ageable;
  "minecraft:air_drag_modifier"?: AirDragModifier;
  "minecraft:ambient_sound_interval"?: AmbientSoundInterval;
  "minecraft:anger_level"?: AngerLevel;
  "minecraft:angry"?: Angry;
  "minecraft:annotation.break_door"?: AnnotationBreakDoor;
  "minecraft:annotation.open_door"?: AnnotationOpenDoor;
  "minecraft:apply_knockback_rules"?: ApplyKnockbackRules;
  "minecraft:area_attack"?: AreaAttack;
  "minecraft:attack_cooldown"?: AttackCooldown;
  "minecraft:attack_damage"?: Attribute;
  "minecraft:attack"?: Attack;
  "minecraft:balloonable"?: Balloonable;
  "minecraft:barter"?: Barter;
  "minecraft:block_climber"?: BlockClimber;
  "minecraft:block_sensor"?: BlockSensor;
  "minecraft:body_rotation_always_follows_head"?: BodyRotationAlwaysFollowsHead;
  "minecraft:body_rotation_blocked"?: BodyRotationBlocked;
  "minecraft:boostable"?: Boostable;
  "minecraft:boss"?: Boss;
  "minecraft:bounciness"?: Bounciness;
  "minecraft:break_blocks"?: BreakBlocks;
  "minecraft:breathable"?: Breathable;
  "minecraft:breedable"?: Breedable;
  "minecraft:bribeable"?: Bribeable;
  "minecraft:buoyant"?: Buoyant;
  "minecraft:burns_in_daylight"?: BurnsInDaylight;
  "minecraft:can_climb"?: CanClimb;
  "minecraft:can_fly"?: CanFly;
  "minecraft:can_join_raid"?: CanJoinRaid;
  "minecraft:can_power_jump"?: CanPowerJump;
  "minecraft:cannot_be_attacked"?: CannotBeAttacked;
  "minecraft:celebrate_hunt"?: CelebrateHunt;
  "minecraft:collision_box"?: CollisionBox;
  "minecraft:color"?: Color;
  "minecraft:color2"?: Color0;
  "minecraft:combat_regeneration"?: CombatRegeneration;
  "minecraft:conditional_bandwidth_optimization"?: ConditionalBandwidthOptimization;
  "minecraft:custom_hit_test"?: CustomHitTest;
  "minecraft:damage_over_time"?: DamageOverTime;
  "minecraft:damage_sensor"?: DamageSensor;
  "minecraft:dash_action"?: DashAction;
  "minecraft:default_look_angle"?: DefaultLookAngle;
  "minecraft:despawn"?: Despawn;
  "minecraft:dimension_bound"?: DimensionBound;
  "minecraft:drying_out_timer"?: DryingOutTimer;
  "minecraft:dweller"?: Dweller;
  "minecraft:economy_trade_table"?: EconomyTradeTable;
  "minecraft:entity_sensor"?: EntitySensor;
  "minecraft:environment_sensor"?: EnvironmentSensor;
  "minecraft:equip_item"?: EquipItem;
  "minecraft:equipment"?: Equipment;
  "minecraft:equippable"?: Equippable;
  "minecraft:exhaustion_values"?: ExhaustionValues;
  "minecraft:experience_reward"?: ExperienceReward;
  "minecraft:explode"?: Explode;
  "minecraft:fall_damage"?: FallDamage;
  "minecraft:fire_immune"?: FireImmune;
  "minecraft:floats_in_liquid"?: FloatsInLiquid;
  "minecraft:flocking"?: Flocking;
  "minecraft:flying_speed"?: FlyingSpeed;
  "minecraft:follow_range"?: Attribute;
  "minecraft:friction_modifier"?: FrictionModifier;
  "minecraft:game_event_movement_tracking"?: GameEventMovementTracking;
  "minecraft:genetics"?: Genetics;
  "minecraft:giveable"?: Giveable;
  "minecraft:ground_offset"?: GroundOffset;
  "minecraft:ignore_cannot_be_attacked"?: IgnoreCannotBeAttacked;
  "minecraft:group_size"?: GroupSize;
  "minecraft:grows_crop"?: GrowsCrop;
  "minecraft:healable"?: Healable;
  "minecraft:health"?: Attribute;
  "minecraft:heartbeat"?: Heartbeat;
  "minecraft:hide"?: Hide;
  "minecraft:home"?: Home;
  "minecraft:horse.jump_strength"?: HorseJumpStrength;
  "minecraft:hurt_on_condition"?: HurtOnCondition;
  "minecraft:hurt_when_wet"?: HurtWhenWet;
  "minecraft:free_camera_controlled"?: FreeCameraControlled;
  "minecraft:input_ground_controlled"?: InputGroundControlled;
  "minecraft:inside_block_notifier"?: InsideBlockNotifier;
  "minecraft:insomnia"?: Insomnia;
  "minecraft:instant_despawn"?: InstantDespawn;
  "minecraft:interact"?: Interact;
  "minecraft:inventory"?: Inventory;
  "minecraft:is_baby"?: IsBaby;
  "minecraft:is_charged"?: IsCharged;
  "minecraft:is_chested"?: IsChested;
  "minecraft:is_collidable"?: IsCollidable;
  "minecraft:is_dyeable"?: IsDyeable;
  "minecraft:is_hidden_when_invisible"?: IsHiddenWhenInvisible;
  "minecraft:is_ignited"?: IsIgnited;
  "minecraft:is_illager_captain"?: IsIllagerCaptain;
  "minecraft:is_pregnant"?: IsPregnant;
  "minecraft:is_saddled"?: IsSaddled;
  "minecraft:is_shaking"?: IsShaking;
  "minecraft:is_sheared"?: IsSheared;
  "minecraft:is_stackable"?: IsStackable;
  "minecraft:is_stunned"?: IsStunned;
  "minecraft:is_tamed"?: IsTamed;
  "minecraft:item_controllable"?: ItemControllable;
  "minecraft:item_hopper"?: ItemHopper;
  "minecraft:jump.dynamic"?: JumpDynamic;
  "minecraft:jump.static"?: JumpStatic;
  "minecraft:leashable_to"?: LeashableTo;
  "minecraft:knockback_resistance"?: Attribute;
  "minecraft:lava_movement"?: Attribute;
  "minecraft:leashable"?: Leashable;
  "minecraft:looked_at"?: LookedAt;
  "minecraft:loot"?: Loot;
  "minecraft:luck"?: Attribute;
  "minecraft:managed_wandering_trader"?: ManagedWanderingTrader;
  "minecraft:mark_variant"?: MarkVariant;
  "minecraft:mob_effect"?: MobEffect;
  "minecraft:mob_effect_immunity"?: MobEffectImmunity;
  "minecraft:movement_sound_distance_offset"?: MovementSoundDistanceOffset;
  "minecraft:movement.amphibious"?: MovementAmphibious;
  "minecraft:movement.basic"?: MovementBasic;
  "minecraft:movement.fly"?: MovementFly;
  "minecraft:movement.generic"?: MovementGeneric;
  "minecraft:movement.glide"?: MovementGlide;
  "minecraft:movement.hover"?: MovementHover;
  "minecraft:movement.jump"?: MovementJump;
  "minecraft:movement.skip"?: MovementSkip;
  "minecraft:movement.sway"?: MovementSway;
  "minecraft:movement"?: Attribute;
  "minecraft:nameable"?: Nameable;
  "minecraft:navigation.climb"?: NavigationClimb;
  "minecraft:navigation.float"?: NavigationFloat;
  "minecraft:navigation.fly"?: NavigationFly;
  "minecraft:navigation.generic"?: NavigationGeneric;
  "minecraft:navigation.hover"?: NavigationHover;
  "minecraft:navigation.swim"?: NavigationSwim;
  "minecraft:navigation.walk"?: NavigationWalk;
  "minecraft:npc"?: Npc;
  "minecraft:offspring"?: Offspring;
  "minecraft:on_death"?: OnDeath1;
  "minecraft:on_equipment_changed"?: OnEquipmentChanged;
  "minecraft:on_friendly_anger"?: OnFriendlyAnger;
  "minecraft:on_hurt_by_player"?: OnHurtByPlayer;
  "minecraft:on_hurt"?: OnHurt;
  "minecraft:on_ignite"?: OnIgnite;
  "minecraft:on_start_landing"?: OnStartLanding;
  "minecraft:on_start_takeoff"?: OnStartTakeoff;
  "minecraft:on_target_acquired"?: OnTargetAcquired;
  "minecraft:on_target_escape"?: OnTargetEscape;
  "minecraft:on_wake_with_owner"?: OnWakeWithOwner;
  "minecraft:out_of_control"?: OutOfControl;
  "minecraft:peek"?: Peek;
  "minecraft:persistent"?: Persistent;
  "minecraft:physics"?: Physics;
  "minecraft:player.exhaustion"?: PlayerExhaustion;
  "minecraft:player.experience"?: PlayerExperience;
  "minecraft:player.level"?: PlayerLevel;
  "minecraft:player.saturation"?: PlayerSaturation;
  "minecraft:preferred_path"?: PreferredPath;
  "minecraft:projectile"?: Projectile;
  "minecraft:push_through"?: PushThrough;
  "minecraft:pushable_by_block"?: PushableByBlock;
  "minecraft:pushable_by_entity"?: PushableByEntity;
  "minecraft:raid_trigger"?: RaidTrigger;
  "minecraft:rail_movement"?: RailMovement;
  "minecraft:rail_sensor"?: RailSensor;
  "minecraft:ravager_blocked"?: RavagerBlocked;
  "minecraft:rideable"?: Rideable;
  "minecraft:rotation_axis_aligned"?: BodyRotationAxisAligned;
  "minecraft:rotation_locked_to_vehicle"?: RotationLockedToVehicle;
  "minecraft:reflect_projectiles"?: ReflectProjectiles;
  "minecraft:remove_in_peaceful"?: RemoveInPeaceful;
  "minecraft:renders_when_invisible"?: RendersWhenInvisible;
  "minecraft:scale_by_age"?: ScaleByAge;
  "minecraft:scale"?: Scale2;
  "minecraft:scheduler"?: Scheduler;
  "minecraft:shareables"?: Shareables;
  "minecraft:shooter"?: Shooter;
  "minecraft:sittable"?: Sittable;
  "minecraft:skin_id"?: SkinId;
  "minecraft:sound_volume"?: SoundVolume;
  "minecraft:spawn_egg_interaction"?: SpawnEggInteraction;
  "minecraft:spawn_entity"?: SpawnEntity;
  "minecraft:spawn_on_death"?: SpawnOnDeath;
  "minecraft:spell_effects"?: SpellEffects;
  "minecraft:strength"?: Strength;
  "minecraft:suspect_tracking"?: SuspectTracking;
  "minecraft:tameable"?: Tameable;
  "minecraft:tamemount"?: Tamemount;
  "minecraft:target_nearby_sensor"?: TargetNearbySensor;
  "minecraft:teleport"?: Teleport;
  "minecraft:tick_world"?: TickWorld;
  "minecraft:timer"?: Timer;
  "minecraft:trade_resupply"?: TradeResupply;
  "minecraft:trade_table"?: TradeTable;
  "minecraft:trail"?: Trail;
  "minecraft:transformation"?: Transformation;
  "minecraft:transient"?: Transient;
  "minecraft:trust"?: Trust;
  "minecraft:trusting"?: Trusting;
  "minecraft:type_family"?: TypeFamily;
  "minecraft:uses_legacy_friction"?: UsesLegacyFriction;
  "minecraft:uses_uniform_air_drag"?: UsesUniformAirDrag;
  "minecraft:underwater_movement"?: Attribute;
  "minecraft:variable_max_auto_step"?: VariableMaxAutoStep;
  "minecraft:variant"?: Variant2;
  "minecraft:vertical_movement_action"?: VerticalMovementAction;
  "minecraft:vibration_damper"?: VibrationDamper;
  "minecraft:vibration_listener"?: VibrationListener;
  "minecraft:walk_animation_speed"?: WalkAnimationSpeed;
  "minecraft:wants_jockey"?: WantsJockey;
  "minecraft:water_movement"?: WaterMovement;
  "minecraft:behavior.admire_item"?: AdmireItem1;
  "minecraft:behavior.aquatic_charge_attack"?: AquaticChargeAttack;
  "minecraft:behavior.avoid_block"?: AvoidBlock;
  "minecraft:behavior.avoid_mob_type"?: AvoidMobType;
  "minecraft:behavior.barter"?: Barter3;
  "minecraft:behavior.beg"?: Beg;
  "minecraft:behavior.break_door"?: BreakDoor;
  "minecraft:behavior.breed"?: Breed;
  "minecraft:behavior.celebrate_survive"?: CelebrateSurvive;
  "minecraft:behavior.celebrate"?: Celebrate;
  "minecraft:behavior.charge_attack"?: ChargeAttack;
  "minecraft:behavior.charge_held_item"?: ChargeHeldItem;
  "minecraft:behavior.circle_around_anchor"?: CircleAroundAnchor;
  "minecraft:behavior.controlled_by_player"?: ControlledByPlayer;
  "minecraft:behavior.croak"?: Croak;
  "minecraft:behavior.defend_trusted_target"?: DefendTrustedTarget;
  "minecraft:behavior.defend_village_target"?: DefendVillageTarget;
  "minecraft:behavior.delayed_attack"?: DelayedAttack;
  "minecraft:behavior.dig"?: Dig;
  "minecraft:behavior.door_interact"?: DoorInteract;
  "minecraft:behavior.dragonchargeplayer"?: Dragonchargeplayer;
  "minecraft:behavior.dragondeath"?: Dragondeath;
  "minecraft:behavior.dragonflaming"?: Dragonflaming;
  "minecraft:behavior.dragonholdingpattern"?: Dragonholdingpattern;
  "minecraft:behavior.dragonlanding"?: Dragonlanding;
  "minecraft:behavior.dragonscanning"?: Dragonscanning;
  "minecraft:behavior.dragonstrafeplayer"?: Dragonstrafeplayer;
  "minecraft:behavior.dragontakeoff"?: Dragontakeoff;
  "minecraft:behavior.drink_milk"?: DrinkMilk;
  "minecraft:behavior.drink_potion"?: DrinkPotion;
  "minecraft:behavior.drop_item_for"?: DropItemFor;
  "minecraft:behavior.eat_block"?: EatBlock;
  "minecraft:behavior.eat_carried_item"?: EatCarriedItem;
  "minecraft:behavior.eat_mob"?: EatMob;
  "minecraft:behavior.emerge"?: Emerge;
  "minecraft:behavior.equip_item"?: EquipItem1;
  "minecraft:behavior.explore_outskirts"?: ExploreOutskirts;
  "minecraft:behavior.fertilize_farm_block"?: FertilizeFarmBlock;
  "minecraft:behavior.find_cover"?: FindCover;
  "minecraft:behavior.find_mount"?: FindMount;
  "minecraft:behavior.find_underwater_treasure"?: FindUnderwaterTreasure;
  "minecraft:behavior.fire_at_target"?: FireAtTarget;
  "minecraft:behavior.flee_sun"?: FleeSun;
  "minecraft:behavior.float_wander"?: FloatWander;
  "minecraft:behavior.float"?: Float;
  "minecraft:behavior.float_tempt"?: FloatTempt;
  "minecraft:behavior.follow_caravan"?: FollowCaravan;
  "minecraft:behavior.follow_mob"?: FollowMob;
  "minecraft:behavior.follow_owner"?: FollowOwner;
  "minecraft:behavior.follow_parent"?: FollowParent;
  "minecraft:behavior.follow_target_leader"?: FollowTargetLeader;
  "minecraft:behavior.go_and_give_items_to_noteblock"?: GoAndGiveItemsToNoteblock;
  "minecraft:behavior.go_and_give_items_to_owner"?: GoAndGiveItemsToOwner;
  "minecraft:behavior.go_home"?: GoHome;
  "minecraft:behavior.guardian_attack"?: GuardianAttack;
  "minecraft:behavior.harvest_farm_block"?: HarvestFarmBlock;
  "minecraft:behavior.hide"?: Hide1;
  "minecraft:behavior.hold_ground"?: HoldGround;
  "minecraft:behavior.hurt_by_target"?: HurtByTarget;
  "minecraft:behavior.inspect_bookshelf"?: InspectBookshelf;
  "minecraft:behavior.investigate_suspicious_location"?: InspectBookshelf1;
  "minecraft:behavior.jump_around_target"?: JumpAroundTarget;
  "minecraft:behavior.jump_to_block"?: JumpToBlock;
  "minecraft:behavior.knockback_roar"?: KnockbackRoar;
  "minecraft:behavior.lay_down"?: LayDown;
  "minecraft:behavior.lay_egg"?: LayEgg;
  "minecraft:behavior.leap_at_target"?: LeapAtTarget;
  "minecraft:behavior.look_at_entity"?: LookAtEntity;
  "minecraft:behavior.look_at_player"?: LookAtPlayer;
  "minecraft:behavior.look_at_target"?: LookAtTarget;
  "minecraft:behavior.look_at_trading_player"?: LookAtTradingPlayer;
  "minecraft:behavior.make_love"?: MakeLove;
  "minecraft:behavior.melee_attack"?: MeleeAttack;
  "minecraft:behavior.melee_box_attack"?: MeleeBoxAttack;
  "minecraft:behavior.mingle"?: Mingle;
  "minecraft:behavior.mount_pathing"?: MountPathing;
  "minecraft:behavior.move_indoors"?: MoveIndoors;
  "minecraft:behavior.move_outdoors"?: MoveOutdoors;
  "minecraft:behavior.move_through_village"?: MoveThroughVillage;
  "minecraft:behavior.move_to_block"?: MoveToBlock;
  "minecraft:behavior.move_to_land"?: MoveToLand;
  "minecraft:behavior.move_to_lava"?: MoveToLava;
  "minecraft:behavior.move_to_liquid"?: MoveToLiquid;
  "minecraft:behavior.move_to_poi"?: MoveToPoi;
  "minecraft:behavior.move_to_random_block"?: MoveToRandomBlock;
  "minecraft:behavior.move_to_village"?: MoveToVillage;
  "minecraft:behavior.move_to_water"?: MoveToWater;
  "minecraft:behavior.move_towards_dwelling_restriction"?: MoveTowardsDwellingRestriction;
  "minecraft:behavior.move_towards_home_restriction"?: MoveTowardsHomeRestriction;
  "minecraft:behavior.move_towards_restriction"?: MoveTowardsRestriction;
  "minecraft:behavior.move_towards_target"?: MoveTowardsTarget;
  "minecraft:behavior.nap"?: Nap;
  "minecraft:behavior.nearest_attackable_target"?: NearestAttackableTarget;
  "minecraft:behavior.nearest_prioritized_attackable_target"?: NearestPrioritizedAttackableTarget;
  "minecraft:behavior.ocelot_sit_on_block"?: OcelotSitOnBlock;
  "minecraft:behavior.ocelotattack"?: Ocelotattack;
  "minecraft:behavior.offer_flower"?: OfferFlower;
  "minecraft:behavior.open_door"?: OpenDoor;
  "minecraft:behavior.owner_hurt_by_target"?: OwnerHurtByTarget;
  "minecraft:behavior.owner_hurt_target"?: OwnerHurtTarget;
  "minecraft:behavior.panic"?: Panic;
  "minecraft:behavior.pet_sleep_with_owner"?: PetSleepWithOwner;
  "minecraft:behavior.pickup_items"?: PickupItems;
  "minecraft:behavior.place_block"?: PlaceBlock;
  "minecraft:behavior.play_dead"?: PlayDead;
  "minecraft:behavior.play"?: Play;
  "minecraft:behavior.player_ride_tamed"?: PlayerRideTamed;
  "minecraft:behavior.raid_garden"?: RaidGarden;
  "minecraft:behavior.ram_attack"?: RamAttack;
  "minecraft:behavior.random_breach"?: RandomBreach;
  "minecraft:behavior.random_fly"?: RandomFly;
  "minecraft:behavior.random_hover"?: RandomHover;
  "minecraft:behavior.random_look_around_and_sit"?: RandomLookAroundAndSit;
  "minecraft:behavior.random_look_around"?: RandomLookAround;
  "minecraft:behavior.random_search_and_dig"?: RandomLookAround1;
  "minecraft:behavior.random_sitting"?: RandomSitting;
  "minecraft:behavior.random_stroll"?: RandomStroll;
  "minecraft:behavior.random_swim"?: RandomSwim;
  "minecraft:behavior.ranged_attack"?: RangedAttack;
  "minecraft:behavior.receive_love"?: ReceiveLove;
  "minecraft:behavior.restrict_open_door"?: RestrictOpenDoor;
  "minecraft:behavior.restrict_sun"?: RestrictSun;
  "minecraft:behavior.rise_to_liquid_level"?: RiseToLiquidLevel;
  "minecraft:behavior.roar"?: Roar;
  "minecraft:behavior.roll"?: Roll;
  "minecraft:behavior.run_around_like_crazy"?: RunAroundLikeCrazy;
  "minecraft:behavior.scared"?: Scared;
  "minecraft:behavior.send_event"?: SendEvent;
  "minecraft:behavior.share_items"?: ShareItems;
  "minecraft:behavior.silverfish_merge_with_stone"?: SilverfishMergeWithStone;
  "minecraft:behavior.silverfish_wake_up_friends"?: SilverfishWakeUpFriends;
  "minecraft:behavior.skeleton_horse_trap"?: SkeletonHorseTrap;
  "minecraft:behavior.sleep"?: Sleep;
  "minecraft:behavior.slime_attack"?: SlimeAttack;
  "minecraft:behavior.slime_float"?: SlimeFloat;
  "minecraft:behavior.slime_keep_on_jumping"?: SlimeKeepOnJumping;
  "minecraft:behavior.slime_random_direction"?: SlimeRandomDirection;
  "minecraft:behavior.snacking"?: Snacking;
  "minecraft:behavior.sneeze"?: Sneeze;
  "minecraft:behavior.sniff"?: Sniff;
  "minecraft:behavior.sonic_boom"?: SonicBoom;
  "minecraft:behavior.squid_dive"?: SquidDive;
  "minecraft:behavior.squid_flee"?: SquidFlee;
  "minecraft:behavior.squid_idle"?: SquidIdle;
  "minecraft:behavior.squid_move_away_from_ground"?: SquidMoveAwayFromGround;
  "minecraft:behavior.squid_out_of_water"?: SquidOutOfWater;
  "minecraft:behavior.stalk_and_pounce_on_target"?: StalkAndPounceOnTarget;
  "minecraft:behavior.stay_near_noteblock"?: StayNearNoteblock;
  "minecraft:behavior.stay_while_sitting"?: StayWhileSitting;
  "minecraft:behavior.stomp_attack"?: StompAttack;
  "minecraft:behavior.stomp_turtle_egg"?: StompTurtleEgg;
  "minecraft:behavior.stroll_towards_village"?: StrollTowardsVillage;
  "minecraft:behavior.summon_entity"?: SummonEntity;
  "minecraft:behavior.swell"?: Swell;
  "minecraft:behavior.swim_idle"?: SwimIdle;
  "minecraft:behavior.swim_up_for_breath"?: SwimUpForBreath;
  "minecraft:behavior.swim_wander"?: SwimWander;
  "minecraft:behavior.swim_with_entity"?: SwimWithEntity;
  "minecraft:behavior.swoop_attack"?: SwoopAttack;
  "minecraft:behavior.take_block"?: TakeBlock;
  "minecraft:behavior.take_flower"?: TakeFlower;
  "minecraft:behavior.teleport_to_owner"?: TeleportToOwner;
  "minecraft:behavior.move_around_target"?: MoveAroundTarget;
  "minecraft:behavior.target_when_pushed"?: TargetWhenPushed;
  "minecraft:behavior.tempt"?: Tempt;
  "minecraft:behavior.timer_flag_1"?: TimerFlag;
  "minecraft:behavior.timer_flag_2"?: TimerFlag;
  "minecraft:behavior.timer_flag_3"?: TimerFlag;
  "minecraft:behavior.trade_interest"?: TradeInterest;
  "minecraft:behavior.trade_with_player"?: TradeWithPlayer;
  "minecraft:behavior.transport_items"?: TransportItems;
  "minecraft:behavior.use_kinetic_weapon"?: UseKineticWeapon;
  "minecraft:behavior.vex_copy_owner_target"?: VexCopyOwnerTarget;
  "minecraft:behavior.vex_random_move"?: VexRandomMove;
  "minecraft:behavior.wither_random_attack_pos_goal"?: WitherRandomAttackPosGoal;
  "minecraft:behavior.wither_target_highest_damage"?: WitherTargetHighestDamage;
  "minecraft:behavior.work"?: Work;
  "minecraft:behavior.work_composter"?: WorkComposter;
}
/**
 * The events that the entity can run, these add or remove components_groups.
 */
export interface Events {
  "minecraft:entity_transformed"?: EntityTransformed;
  "minecraft:entity_born"?: EntityBorn;
  "minecraft:entity_spawned"?: EntitySpawned;
  "minecraft:on_prime"?: OnPrime;
  [k: string]: FBAEventBase;
}
/**
 * Event called on an entity that transforms into another entity.
 */
export interface EntityTransformed {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * What gets added when the event gets triggered.
 */
export interface Add1 {
  component_groups?: ComponentGroups1;
}
/**
 * What gets removed when the event gets triggered.
 */
export interface Remove {
  component_groups?: ComponentGroups1;
}
/**
 * Randomly selects one of the following items based upon their weight and the total weights.
 */
export interface Randomize1 {
  filters?: Filters3;
  trigger?: Trigger42;
  add?: Add2;
  remove?: Remove1;
  randomize?: Randomize2;
  sequence?: Sequences;
  emit_vibration?: EmitVibration1;
  set_property?: SetProperty1;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command1;
    [k: string]: unknown;
  };
  weight?: Weight5;
}
/**
 * What gets added when the event gets triggered.
 */
export interface Add2 {
  component_groups?: ComponentGroups1;
}
/**
 * What gets removed when the event gets triggered.
 */
export interface Remove1 {
  component_groups?: ComponentGroups1;
}
/**
 * Randomly selects one of the following items based upon their weight and the total weights.
 */
export interface Randomize3 {
  filters?: Filters3;
  trigger?: Trigger42;
  add?: Add2;
  remove?: Remove1;
  randomize?: Randomize2;
  sequence?: Sequences;
  emit_vibration?: EmitVibration1;
  set_property?: SetProperty1;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command1;
    [k: string]: unknown;
  };
  weight?: Weight5;
}
/**
 * Filters and components to be added.
 */
export interface Sequence3 {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * Filters and components to be added.
 */
export interface Sequence4 {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * Allows the entity to execute an event on the block at its home position
 */
export interface ExecuteEventOnHomeBlock {
  event?: Event14;
}
/**
 * Allows an entity to reset its target.
 */
export interface ResetTarget {}
/**
 * UNDOCUMENTED
 */
export interface EmitVibration {
  vibration?: "shear" | "entity_act" | "entity_interact";
  [k: string]: unknown;
}
/**
 * Allows an entity to drop its item in a given slot
 */
export interface DropItem {
  slot?:
    | "slot.armor.head"
    | "slot.armor.chest"
    | "slot.armor.legs"
    | "slot.armor.feet"
    | "slot.armor.body"
    | "slot.weapon.offhand"
    | "slot.weapon.mainhand";
  [k: string]: unknown;
}
/**
 * Sets a property on the entity.
 */
export interface SetProperty {
  [k: string]: Property;
}
/**
 * Allows the owner entity to emit sounds
 */
export interface PlaySound1 {
  sound?: Sound3;
}
/**
 * Allowing particles to be emitted at the center of the entity's bounding box
 */
export interface EmitParticle {
  particle?: Particle1;
}
/**
 * Stops the entity's movement
 */
export interface StopMovement {
  stop_vertical_movement?: StopVerticalMovement;
  stop_horizontal_movement?: StopHorizontalMovement;
}
/**
 * Sets the entity's home position to its current position
 */
export interface SetHomePosition {}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FBA_event_base".
 */
export interface FBAEventBase {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * Determine how to unleash itself and/or attached entities
 */
export interface Unleash {
  unleash_self?: UnleashSelf;
  unleash_others?: UnleashOthers;
}
/**
 * UNDOCUMENTED
 */
export interface EmitVibration1 {
  vibration?: "shear" | "entity_act" | "entity_interact";
  [k: string]: unknown;
}
/**
 * Sets a property on the entity.
 */
export interface SetProperty1 {
  [k: string]: Property1;
}
/**
 * Event called on an entity that is spawned through two entities breeding.
 */
export interface EntityBorn {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * Event called on an entity that is placed in the level.
 */
export interface EntitySpawned {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * Event called on an entity whose fuse is lit and is ready to explode.
 */
export interface OnPrime {
  filters?: Filters3;
  trigger?: Trigger41;
  add?: Add1;
  remove?: Remove;
  randomize?: Randomize;
  sequence?: Sequences1;
  execute_event_on_home_block?: ExecuteEventOnHomeBlock;
  reset_target?: ResetTarget;
  emit_vibration?: EmitVibration;
  drop_item?: DropItem;
  set_property?: SetProperty;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command;
    [k: string]: unknown;
  };
  play_sound?: PlaySound1;
  emit_particle?: EmitParticle;
  stop_movement?: StopMovement;
  set_home_position?: SetHomePosition;
  first_valid?: FirstValid;
  unleash?: Unleash;
}
/**
 * The upgrades that the entity can run, these add or remove components_groups.
 */
export interface Upgrades1 {
  "minecraft:entity_transformed"?: EntityTransformed;
  "minecraft:entity_born"?: EntityBorn;
  "minecraft:entity_spawned"?: EntitySpawned;
  "minecraft:on_prime"?: OnPrime;
  [k: string]: FBAEventBase;
}
/**
 * Tests the health of the subject.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface ActorHealth {
  test?: TestProperty;
  operator?: Operator1;
  subject?: Subject2;
  value: Value28;
  [k: string]: unknown;
}
/**
 * Returns true when the designated equipment location for the subject entity is completely empty.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface AllSlotsEmpty {
  test?: TestProperty1;
  operator?: Operator2;
  subject?: Subject3;
  value: Value29;
  [k: string]: unknown;
}
/**
 * Returns true when the designated equipment location for the subject entity has any empty slot.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CB".
 */
export interface AnySlotsEmpty {
  test?: TestProperty2;
  operator?: Operator3;
  subject?: Subject4;
  value: Value30;
  [k: string]: unknown;
}
/**
 * Returns true when the bool actor property matches the value provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CC".
 */
export interface BoolProperty {
  test?: TestProperty3;
  domain: Operator4;
  operator?: Operator5;
  subject?: Subject5;
  value?: Value31;
  [k: string]: unknown;
}
/**
 * Compares the current time with a float value in the range (0.0, 1.0).
 * 0.0= Noon
 * 0.25= Sunset
 * 0.5= Midnight
 * 0.75= Sunrise
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CD".
 */
export interface ClockTime {
  test?: TestProperty4;
  operator?: Operator6;
  subject?: Subject6;
  value: Value32;
  [k: string]: unknown;
}
/**
 * Compares the distance to the nearest Player with a float value.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CE".
 */
export interface DistanceToNearestPlayer {
  test?: TestProperty5;
  operator?: Operator;
  subject?: Subject1;
  value: Value33;
  [k: string]: unknown;
}
/**
 * Returns true when the enum actor property matches the value provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CF".
 */
export interface EnumProperty {
  test?: TestProperty6;
  domain: Operator7;
  operator?: Operator8;
  subject?: Subject7;
  value: Value34;
  [k: string]: unknown;
}
/**
 * Returns true when the float actor property matches the value provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CG".
 */
export interface FloatProperty {
  test?: TestProperty7;
  domain: Operator9;
  operator?: Operator10;
  subject?: Subject8;
  value: Value35;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity has the named ability.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CH".
 */
export interface HasAbility {
  test?: TestProperty8;
  operator?: Operator;
  subject?: Subject1;
  value: Value36;
  [k: string]: unknown;
}
/**
 * Tests whether the biome the subject is in has the specified tag.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CI".
 */
export interface HasBiomeTag {
  test?: TestProperty9;
  operator?: Operator;
  subject?: Subject1;
  value: Value37;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity contains the named component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJ".
 */
export interface HasComponent {
  test?: TestProperty10;
  operator?: Operator;
  subject?: Subject1;
  value: Value38;
  [k: string]: unknown;
}
/**
 * Returns true when the subject Player entity has opened a container.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DA".
 */
export interface HasContainerOpen {
  test?: Test;
  operator?: Operator;
  subject?: Subject1;
  value?: Value39;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity receives the named damage type. has_damage can also use subject and operator parameters but they are optional.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DB".
 */
export interface HasDamage {
  test?: TestProperty11;
  operator?: Operator;
  subject?: Subject1;
  value: Value40;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DC".
 */
export interface HasEquipment {
  test?: Test1;
  domain?: Domain;
  operator?: Operator;
  subject?: Subject1;
  value: ItemIdentifier7;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is holding a item with the specified component.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DD".
 */
export interface HasEquipmentTag {
  test?: Test2;
  operator?: Operator;
  subject?: Subject1;
  value: Value41;
  [k: string]: unknown;
}
/**
 * Tests for the presence of an item with the named tag in the designated slot of the subject entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DE".
 */
export interface HasEquipmentTag1 {
  test?: Test3;
  domain?: Domain1;
  operator?: Operator;
  subject?: Subject1;
  value: ItemIdentifier8;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a damaged named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DF".
 */
export interface HasDamagedEquipment {
  test?: Test4;
  domain?: Domain2;
  operator?: Operator;
  subject?: Subject1;
  value: ItemIdentifier9;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject has the specified mob effect.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DG".
 */
export interface HasMobEffect {
  test?: TestProperty12;
  operator?: Operator;
  subject?: Subject1;
  value: Value42;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a named item in the designated slot of the subject entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DI".
 */
export interface HasEquipment1 {
  test?: Test5;
  operator?: Operator;
  subject?: Subject1;
  value: Value43;
  [k: string]: unknown;
}
/**
 * Tests for the presence of a property of the subject entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DJ".
 */
export interface HasProperty {
  test?: TestProperty13;
  operator?: Operator11;
  subject?: Subject9;
  value: Value44;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is holding a ranged weapon like a bow or crossbow.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EA".
 */
export interface HasRangedWeapon {
  test?: Test6;
  operator?: Operator;
  subject?: Subject1;
  value?: Value45;
  [k: string]: unknown;
}
/**
 * Returns whether the subject entity has the same item equipped in the specified slot as calling entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EB".
 */
export interface HasSameEquipmentInSlotAs {
  test?: Test7;
  domain?: Domain3;
  operator?: Operator;
  subject?: Subject1;
  value: Value46;
  [k: string]: unknown;
}
/**
 * Tests if the subject is holding an item with silk touch.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EC".
 */
export interface HasSilkTouch {
  test?: Test8;
  operator?: Operator;
  subject?: Subject1;
  value?: Value47;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has the tag provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ED".
 */
export interface HasTag {
  test?: TestProperty14;
  operator?: Operator;
  subject?: Subject1;
  value: Value48;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has a valid target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EE".
 */
export interface HasTarget {
  test?: Test9;
  operator?: Operator;
  subject?: Subject1;
  value?: Value49;
  [k: string]: unknown;
}
/**
 * Tests whether the target has any trade supply left. Will return false if the target cannot be traded with.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EF".
 */
export interface HasTradeSupply {
  test?: TestProperty15;
  operator?: Operator;
  subject?: Subject1;
  value?: Value50;
  [k: string]: unknown;
}
/**
 * Tests the distance between the subject and its home. Returns false if the subject has no home or if their home is in a different dimension.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EG".
 */
export interface HomeDistance {
  test?: Test10;
  operator?: Operator;
  subject?: Subject1;
  value: Value51;
  [k: string]: unknown;
}
/**
 * Compares the current 24 hour time with an int value in the range[0, 24000].
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EH".
 */
export interface HourlyClockTime {
  test?: TestProperty16;
  operator?: Operator;
  subject?: Subject1;
  value: Value52;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is inside a specified Block type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EI".
 */
export interface InBlock {
  test?: TestProperty17;
  operator?: Operator12;
  subject?: Subject10;
  value?: Value53;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is in a caravan.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "EJ".
 */
export interface InCaravan {
  test?: TestProperty18;
  operator?: Operator;
  subject?: Subject1;
  value?: Value54;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in the clouds.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FA".
 */
export interface InClouds {
  test?: TestProperty19;
  operator?: Operator;
  subject?: Subject1;
  value?: Value55;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity in contact with any water: water, rain, splash water bottle.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FB".
 */
export interface InContactWithWater {
  test?: TestProperty20;
  operator?: Operator;
  subject?: Subject1;
  value?: Value56;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in lava.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FC".
 */
export interface InLava {
  test?: TestProperty21;
  operator?: Operator;
  subject?: Subject1;
  value?: Value57;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in Nether.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FD".
 */
export interface InNether {
  test?: Test11;
  operator?: Operator;
  subject?: Subject1;
  value?: Value58;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in Overworld.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FE".
 */
export interface InOverworld {
  test?: Test12;
  operator?: Operator;
  subject?: Subject1;
  value?: Value59;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in water or rain.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FF".
 */
export interface InWaterOrRain {
  test?: TestProperty22;
  operator?: Operator;
  subject?: Subject1;
  value?: Value60;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is in water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FG".
 */
export interface InWater1 {
  test?: TestProperty23;
  operator?: Operator;
  subject?: Subject1;
  value?: Value61;
  [k: string]: unknown;
}
/**
 * Tests if the specified duration in seconds of inactivity for despawning has been reached.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FH".
 */
export interface InactivityTimer {
  test?: Test13;
  operator?: Operator;
  subject?: Subject1;
  value: Value62;
  [k: string]: unknown;
}
/**
 * Returns true when the integer actor property matches the value provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FI".
 */
export interface IntProperty {
  test?: TestProperty24;
  domain: Operator13;
  operator?: Operator14;
  subject?: Subject11;
  value: Value63;
  [k: string]: unknown;
}
/**
 * Tests the current altitude against a provided value. 0= bedrock elevation.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FJ".
 */
export interface IsAltitude {
  test?: TestProperty25;
  operator?: Operator;
  subject?: Subject1;
  value: Value64;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is fleeing from other mobs.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GA".
 */
export interface IsAvoidingMobs {
  test?: TestProperty26;
  operator?: Operator;
  subject?: Subject1;
  value?: Value65;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is currently in the named biome.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GB".
 */
export interface IsBiome {
  test?: TestProperty27;
  operator?: Operator;
  subject?: Subject1;
  value: Value66;
  [k: string]: unknown;
}
/**
 * Returns true when the block has the given name.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GC".
 */
export interface IsBlock {
  test?: Test14;
  operator?: Operator;
  subject?: Subject1;
  value: Value67;
  [k: string]: unknown;
}
/**
 * Tests that the Creaking Heart that spawned the subject Creaking still exists.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GD".
 */
export interface IsBoundToCreakingHeart {
  test?: TestProperty28;
  operator?: Operator;
  subject?: Subject1;
  value?: Value68;
  [k: string]: unknown;
}
/**
 * Tests the current brightness against a provided value in the range (0.0f, 1.0f).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GE".
 */
export interface IsBrightness {
  test?: TestProperty29;
  operator?: Operator;
  subject?: Subject1;
  value: Value69;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is climbing.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GF".
 */
export interface IsClimbing {
  test?: TestProperty30;
  operator?: Operator;
  subject?: Subject1;
  value?: Value70;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the named color.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GG".
 */
export interface IsColor {
  test?: TestProperty31;
  operator?: Operator;
  subject?: Subject1;
  value: Value71;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity's controlling passenger is a member of the named family.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GH".
 */
export interface IsControllingPassengerFamily {
  test?: TestProperty32;
  operator?: Operator;
  subject?: Subject1;
  value: Value72;
  [k: string]: unknown;
}
/**
 * Returns true during the daylight hours.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GI".
 */
export interface IsDaytime {
  test?: TestProperty33;
  operator?: Operator;
  subject?: Subject1;
  value?: Value73;
  [k: string]: unknown;
}
/**
 * Tests the current difficulty level of the game.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "GJ".
 */
export interface IsDifficulty {
  test?: TestProperty34;
  operator?: Operator;
  subject?: Subject1;
  value: Value74;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is a member of the named family.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HA".
 */
export interface IsFamily {
  test?: TestProperty35;
  operator?: Operator;
  subject?: Subject1;
  value: Value75;
  [k: string]: unknown;
}
/**
 * Tests whether a named game rule is active.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HB".
 */
export interface IsGameRule {
  domain: Domain4;
  operator?: Operator;
  subject?: Subject1;
  value: Value76;
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
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HC".
 */
export interface IsHumid {
  test?: TestProperty36;
  operator?: Operator;
  subject?: Subject1;
  value?: Value77;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is immobile. An entity is immobile if it lacks AI goals, has just changed dimensions or if it is a mob and has no health.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HD".
 */
export interface IsImmobile {
  test?: TestProperty37;
  operator?: Operator;
  subject?: Subject1;
  value?: Value78;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is inside the bounds of a village.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HE".
 */
export interface IsInVillage {
  test?: TestProperty38;
  operator?: Operator;
  subject?: Subject1;
  value?: Value79;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity leashed to the calling entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HF".
 */
export interface IsLeashedTo {
  test?: Test15;
  operator?: Operator;
  subject?: Subject1;
  value?: Value80;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is leashed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HG".
 */
export interface IsLeashed {
  test?: TestProperty39;
  operator?: Operator;
  subject?: Subject1;
  value?: Value81;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the mark variant number provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HH".
 */
export interface IsMarkVariant {
  test?: TestProperty40;
  operator?: Operator;
  subject?: Subject1;
  value?: Value82;
}
/**
 * Tests if the subject is not at full health.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HI".
 */
export interface InNether1 {
  test?: Test16;
  operator?: Operator;
  subject?: Subject1;
  value?: Value83;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is moving.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "HJ".
 */
export interface IsMoving {
  test?: TestProperty41;
  operator?: Operator;
  subject?: Subject1;
  value?: Value84;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the owner of the calling entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IA".
 */
export interface IsOwner {
  test?: TestProperty42;
  operator?: Operator;
  subject?: Subject1;
  value?: Value85;
  [k: string]: unknown;
}
/**
 * Tests if the subject's persistence matches the bool value passed in.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IB".
 */
export interface IsPersistent {
  test?: Test17;
  operator?: Operator;
  subject?: Subject1;
  value?: Value86;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is riding the calling entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IC".
 */
export interface IsRidingSelf {
  test?: TestProperty43;
  operator?: Operator;
  subject?: Subject1;
  value?: Value87;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is riding on another entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ID".
 */
export interface IsRiding {
  test?: TestProperty44;
  operator?: Operator;
  subject?: Subject1;
  value?: Value88;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the skin id number provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IE".
 */
export interface IsSkinId {
  test?: TestProperty45;
  operator?: Operator;
  subject?: Subject1;
  value?: Value89;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is sleeping.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IF".
 */
export interface IsSleeping {
  test?: Test18;
  operator?: Operator;
  subject?: Subject1;
  value?: Value90;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity has the sneak input held.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IG".
 */
export interface IsSneakHeld {
  test?: TestProperty46;
  operator?: Operator;
  subject?: Subject1;
  value?: Value91;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is sneaking.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IH".
 */
export interface IsSneaking {
  test?: TestProperty47;
  operator?: Operator;
  subject?: Subject1;
  value?: Value92;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is in an area with snow cover.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "II".
 */
export interface IsSnowCovered {
  test?: TestProperty48;
  operator?: Operator;
  subject?: Subject1;
  value?: Value93;
  [k: string]: unknown;
}
/**
 * Tests if the subject is sprinting.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "IJ".
 */
export interface IsSprinting {
  test?: Test19;
  operator?: Operator;
  subject?: Subject1;
  value?: Value94;
  [k: string]: unknown;
}
/**
 * Tests whether the Subject is tamed.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JA".
 */
export interface IsTamed1 {
  test?: TestProperty49;
  operator?: Operator;
  subject?: Subject1;
  value?: Value95;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is sitting
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JB".
 */
export interface IsSitting {
  test?: TestProperty50;
  operator?: Operator;
  subject?: Subject1;
  value?: Value96;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the target of the calling entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JC".
 */
export interface IsTarget {
  test?: TestProperty51;
  operator?: Operator;
  subject?: Subject1;
  value?: Value97;
  [k: string]: unknown;
}
/**
 * Tests whether the current temperature is a given type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JD".
 */
export interface IsTarget1 {
  test?: TestProperty52;
  operator?: Operator;
  subject?: Subject1;
  value: Value98;
  [k: string]: unknown;
}
/**
 * Tests the current temperature against a provided value in the range (0.0, 1.0) where 0.0f is the coldest temp and 1.0f is the hottest.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JE".
 */
export interface IsTemperatureValue {
  test?: TestProperty53;
  operator?: Operator;
  subject?: Subject1;
  value: Value99;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is underground. An entity is considered underground if there are non-solid blocks above it.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JF".
 */
export interface IsUnderground {
  test?: TestProperty54;
  operator?: Operator;
  subject?: Subject1;
  value?: Value100;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is under water. An entity is considered underwater if it is completely submerged in water blocks.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JG".
 */
export interface IsUnderwater {
  test?: TestProperty55;
  operator?: Operator;
  subject?: Subject1;
  value?: Value101;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is the variant number provided.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JH".
 */
export interface IsVariant {
  test?: TestProperty56;
  operator?: Operator;
  subject?: Subject1;
  value: Value102;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity's vehicle is a member of the named family.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JI".
 */
export interface IsVehicleFamily {
  test?: TestProperty57;
  operator?: Operator;
  subject?: Subject1;
  value: Value103;
  [k: string]: unknown;
}
/**
 * Returns true if the subject entity is visible.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "JJ".
 */
export interface IsVisible {
  test?: TestProperty58;
  operator?: Operator;
  subject?: Subject1;
  value?: Value104;
  [k: string]: unknown;
}
/**
 * Tests if the subject block is submerged in water.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAA".
 */
export interface IsWaterlogged {
  test?: Test20;
  operator?: Operator;
  subject?: Subject1;
  value: Value105;
  [k: string]: unknown;
}
/**
 * Tests is the mob is outside of the specified light level range (0, 16).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAB".
 */
export interface LightLevel {
  test?: Test21;
  operator?: Operator;
  subject?: Subject1;
  value: Value106;
  [k: string]: unknown;
}
/**
 * Compares the current moon intensity with a float value in the range (0.0, 1.0)
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAC".
 */
export interface MoonIntensity {
  test?: TestProperty59;
  operator?: Operator;
  subject?: Subject1;
  value: Value107;
  [k: string]: unknown;
}
/**
 * Compares the current moon phase with an integer value in the range (0, 7).
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAD".
 */
export interface MoonPhase {
  test?: TestProperty60;
  operator?: Operator;
  subject?: Subject1;
  value: Value108;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is on ground.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAE".
 */
export interface OnGround {
  test?: TestProperty61;
  operator?: Operator;
  subject?: Subject1;
  value?: Value109;
  [k: string]: unknown;
}
/**
 * Returns true when the subject entity is on a ladder.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAF".
 */
export interface OnLadder {
  test?: TestProperty62;
  operator?: Operator;
  subject?: Subject1;
  value?: Value110;
  [k: string]: unknown;
}
/**
 * Returns true if the random chance rolls 0 out of a specified Maximum range.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAG".
 */
export interface RandomChance {
  test?: Test22;
  operator?: Operator;
  subject?: Subject1;
  value: Value111;
  [k: string]: unknown;
}
/**
 * Tests the redstone strength at the subject's position.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAH".
 */
export interface RedstoneStrengthAtPosition {
  test?: Test23;
  operator?: Operator;
  subject?: Subject1;
  value: Value112;
  [k: string]: unknown;
}
/**
 * Returns the number of riders on this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAI".
 */
export interface RiderCount {
  test?: Test24;
  operator?: Operator;
  subject?: Subject1;
  value: Value113;
  [k: string]: unknown;
}
/**
 * Tests if the subject is a surface mob.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BAJ".
 */
export interface SurfaceMob {
  test?: Test25;
  operator?: Operator;
  subject?: Subject1;
  value?: Value114;
  [k: string]: unknown;
}
/**
 * Tests if the subject is taking fire damage. Requires the damage_sensor component
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBA".
 */
export interface TakingFireDamage {
  test?: Test26;
  operator?: Operator;
  subject?: Subject1;
  value?: Value115;
  [k: string]: unknown;
}
/**
 * Tests the distance between the calling entity and its target.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBB".
 */
export interface TargetDistance2 {
  test?: Test27;
  operator?: Operator;
  subject?: Subject1;
  value: Value116;
  [k: string]: unknown;
}
/**
 * Tests the distance between the subject and its owner. Returns false if there is no owner.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBC".
 */
export interface OwnerDistance {
  test?: Test28;
  operator?: Operator;
  subject?: Subject1;
  value: Value117;
  [k: string]: unknown;
}
/**
 * Returns true if the subject is trusted by entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBD".
 */
export interface Trusts {
  test?: Test29;
  operator?: Operator;
  subject?: Subject1;
  value?: Value118;
  [k: string]: unknown;
}
/**
 * Tests the current weather, at the actor's position, against a provided weather value.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBE".
 */
export interface WeatherAtPosition {
  test?: Test30;
  operator?: Operator;
  subject?: Subject1;
  value: Value119;
  [k: string]: unknown;
}
/**
 * Tests for the current weather state the entity is experiencing.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBF".
 */
export interface Weather {
  test?: Test31;
  operator?: Operator;
  subject?: Subject1;
  value: Value120;
  [k: string]: unknown;
}
/**
 * Returns the Y rotation of this entity.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BBG".
 */
export interface YRotation {
  test?: Test32;
  operator?: Operator;
  subject?: Subject1;
  value: Value121;
  [k: string]: unknown;
}
/**
 * Minecraft behavior event.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface Event15 {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * An entity definitions that this entity can breed with.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "BEE_breeds_with_spec".
 */
export interface BEEBreedsWithSpec2 {
  baby_type?: BabyType;
  breed_event?: BreedEvent;
  mate_type?: MateType;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CCE_skip_data".
 */
export interface CCESkipData {
  distance_scale?: DistanceScale;
  height?: Height2;
  jump_delay?: JumpDelay;
  animation_duration?: AnimationDuration;
}
/**
 * An entity definitions that this entity can breed with.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFD_breeds_with_spec".
 */
export interface CFDBreedsWithSpec {
  baby_type?: BabyType1;
  breed_event?: BreedEvent1;
  mate_type?: MateType1;
  [k: string]: unknown;
}
/**
 * Event to run when this entity breeds.
 */
export interface BreedEvent1 {
  filters?: Filters;
  event?: Event;
  target?: Target;
}
/**
 * A nearby block requirements to get the entity into the `love` state.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CFD_enviroment_requirements".
 */
export interface EnvironmentRequirements3 {
  blocks?: Blocks3;
  count?: Count1;
  radius?: Radius4;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "CJJ_entity_spawn".
 */
export interface EntitySpawn2 {
  filters?: Filters13;
  max_wait_time?: MaximumWaitTime;
  min_wait_time?: MinimumWaitTime;
  num_to_spawn?: NumToSpawn;
  should_leash?: ShouldLeash;
  single_use?: SingleUse;
  spawn_entity?: SpawnEntity1;
  spawn_event?: SpawnEvent1;
  spawn_item?: SpawnItem;
  spawn_method?: SpawnMethod;
  spawn_sound?: SpawnSound;
  spawn_item_event?: SpawnItemEvent;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "DAB".
 */
export interface DAB {
  min?: X4;
  max?: Y4;
}
/**
 * A entity type.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "ECG_entity_type".
 */
export interface ECGEntityType {
  filters?: Filters39;
  max_dist?: MaximumDist2;
  must_see?: MustSee5;
  must_see_forget_duration?: MustSeeForgetDuration4;
  [k: string]: unknown;
}
/**
 * A collection of components.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "F".
 */
export interface Components {
  "minecraft:absorption"?: Attribute;
  "minecraft:addrider"?: AddRider;
  "minecraft:admire_item"?: AdmireItem;
  "minecraft:ageable"?: Ageable;
  "minecraft:air_drag_modifier"?: AirDragModifier;
  "minecraft:ambient_sound_interval"?: AmbientSoundInterval;
  "minecraft:anger_level"?: AngerLevel;
  "minecraft:angry"?: Angry;
  "minecraft:annotation.break_door"?: AnnotationBreakDoor;
  "minecraft:annotation.open_door"?: AnnotationOpenDoor;
  "minecraft:apply_knockback_rules"?: ApplyKnockbackRules;
  "minecraft:area_attack"?: AreaAttack;
  "minecraft:attack_cooldown"?: AttackCooldown;
  "minecraft:attack_damage"?: Attribute;
  "minecraft:attack"?: Attack;
  "minecraft:balloonable"?: Balloonable;
  "minecraft:barter"?: Barter;
  "minecraft:block_climber"?: BlockClimber;
  "minecraft:block_sensor"?: BlockSensor;
  "minecraft:body_rotation_always_follows_head"?: BodyRotationAlwaysFollowsHead;
  "minecraft:body_rotation_blocked"?: BodyRotationBlocked;
  "minecraft:boostable"?: Boostable;
  "minecraft:boss"?: Boss;
  "minecraft:bounciness"?: Bounciness;
  "minecraft:break_blocks"?: BreakBlocks;
  "minecraft:breathable"?: Breathable;
  "minecraft:breedable"?: Breedable;
  "minecraft:bribeable"?: Bribeable;
  "minecraft:buoyant"?: Buoyant;
  "minecraft:burns_in_daylight"?: BurnsInDaylight;
  "minecraft:can_climb"?: CanClimb;
  "minecraft:can_fly"?: CanFly;
  "minecraft:can_join_raid"?: CanJoinRaid;
  "minecraft:can_power_jump"?: CanPowerJump;
  "minecraft:cannot_be_attacked"?: CannotBeAttacked;
  "minecraft:celebrate_hunt"?: CelebrateHunt;
  "minecraft:collision_box"?: CollisionBox;
  "minecraft:color"?: Color;
  "minecraft:color2"?: Color0;
  "minecraft:combat_regeneration"?: CombatRegeneration;
  "minecraft:conditional_bandwidth_optimization"?: ConditionalBandwidthOptimization;
  "minecraft:custom_hit_test"?: CustomHitTest;
  "minecraft:damage_over_time"?: DamageOverTime;
  "minecraft:damage_sensor"?: DamageSensor;
  "minecraft:dash_action"?: DashAction;
  "minecraft:default_look_angle"?: DefaultLookAngle;
  "minecraft:despawn"?: Despawn;
  "minecraft:dimension_bound"?: DimensionBound;
  "minecraft:drying_out_timer"?: DryingOutTimer;
  "minecraft:dweller"?: Dweller;
  "minecraft:economy_trade_table"?: EconomyTradeTable;
  "minecraft:entity_sensor"?: EntitySensor;
  "minecraft:environment_sensor"?: EnvironmentSensor;
  "minecraft:equip_item"?: EquipItem;
  "minecraft:equipment"?: Equipment;
  "minecraft:equippable"?: Equippable;
  "minecraft:exhaustion_values"?: ExhaustionValues;
  "minecraft:experience_reward"?: ExperienceReward;
  "minecraft:explode"?: Explode;
  "minecraft:fall_damage"?: FallDamage;
  "minecraft:fire_immune"?: FireImmune;
  "minecraft:floats_in_liquid"?: FloatsInLiquid;
  "minecraft:flocking"?: Flocking;
  "minecraft:flying_speed"?: FlyingSpeed;
  "minecraft:follow_range"?: Attribute;
  "minecraft:friction_modifier"?: FrictionModifier;
  "minecraft:game_event_movement_tracking"?: GameEventMovementTracking;
  "minecraft:genetics"?: Genetics;
  "minecraft:giveable"?: Giveable;
  "minecraft:ground_offset"?: GroundOffset;
  "minecraft:ignore_cannot_be_attacked"?: IgnoreCannotBeAttacked;
  "minecraft:group_size"?: GroupSize;
  "minecraft:grows_crop"?: GrowsCrop;
  "minecraft:healable"?: Healable;
  "minecraft:health"?: Attribute;
  "minecraft:heartbeat"?: Heartbeat;
  "minecraft:hide"?: Hide;
  "minecraft:home"?: Home;
  "minecraft:horse.jump_strength"?: HorseJumpStrength;
  "minecraft:hurt_on_condition"?: HurtOnCondition;
  "minecraft:hurt_when_wet"?: HurtWhenWet;
  "minecraft:free_camera_controlled"?: FreeCameraControlled;
  "minecraft:input_ground_controlled"?: InputGroundControlled;
  "minecraft:inside_block_notifier"?: InsideBlockNotifier;
  "minecraft:insomnia"?: Insomnia;
  "minecraft:instant_despawn"?: InstantDespawn;
  "minecraft:interact"?: Interact;
  "minecraft:inventory"?: Inventory;
  "minecraft:is_baby"?: IsBaby;
  "minecraft:is_charged"?: IsCharged;
  "minecraft:is_chested"?: IsChested;
  "minecraft:is_collidable"?: IsCollidable;
  "minecraft:is_dyeable"?: IsDyeable;
  "minecraft:is_hidden_when_invisible"?: IsHiddenWhenInvisible;
  "minecraft:is_ignited"?: IsIgnited;
  "minecraft:is_illager_captain"?: IsIllagerCaptain;
  "minecraft:is_pregnant"?: IsPregnant;
  "minecraft:is_saddled"?: IsSaddled;
  "minecraft:is_shaking"?: IsShaking;
  "minecraft:is_sheared"?: IsSheared;
  "minecraft:is_stackable"?: IsStackable;
  "minecraft:is_stunned"?: IsStunned;
  "minecraft:is_tamed"?: IsTamed;
  "minecraft:item_controllable"?: ItemControllable;
  "minecraft:item_hopper"?: ItemHopper;
  "minecraft:jump.dynamic"?: JumpDynamic;
  "minecraft:jump.static"?: JumpStatic;
  "minecraft:leashable_to"?: LeashableTo;
  "minecraft:knockback_resistance"?: Attribute;
  "minecraft:lava_movement"?: Attribute;
  "minecraft:leashable"?: Leashable;
  "minecraft:looked_at"?: LookedAt;
  "minecraft:loot"?: Loot;
  "minecraft:luck"?: Attribute;
  "minecraft:managed_wandering_trader"?: ManagedWanderingTrader;
  "minecraft:mark_variant"?: MarkVariant;
  "minecraft:mob_effect"?: MobEffect;
  "minecraft:mob_effect_immunity"?: MobEffectImmunity;
  "minecraft:movement_sound_distance_offset"?: MovementSoundDistanceOffset;
  "minecraft:movement.amphibious"?: MovementAmphibious;
  "minecraft:movement.basic"?: MovementBasic;
  "minecraft:movement.fly"?: MovementFly;
  "minecraft:movement.generic"?: MovementGeneric;
  "minecraft:movement.glide"?: MovementGlide;
  "minecraft:movement.hover"?: MovementHover;
  "minecraft:movement.jump"?: MovementJump;
  "minecraft:movement.skip"?: MovementSkip;
  "minecraft:movement.sway"?: MovementSway;
  "minecraft:movement"?: Attribute;
  "minecraft:nameable"?: Nameable;
  "minecraft:navigation.climb"?: NavigationClimb;
  "minecraft:navigation.float"?: NavigationFloat;
  "minecraft:navigation.fly"?: NavigationFly;
  "minecraft:navigation.generic"?: NavigationGeneric;
  "minecraft:navigation.hover"?: NavigationHover;
  "minecraft:navigation.swim"?: NavigationSwim;
  "minecraft:navigation.walk"?: NavigationWalk;
  "minecraft:npc"?: Npc;
  "minecraft:offspring"?: Offspring;
  "minecraft:on_death"?: OnDeath1;
  "minecraft:on_equipment_changed"?: OnEquipmentChanged;
  "minecraft:on_friendly_anger"?: OnFriendlyAnger;
  "minecraft:on_hurt_by_player"?: OnHurtByPlayer;
  "minecraft:on_hurt"?: OnHurt;
  "minecraft:on_ignite"?: OnIgnite;
  "minecraft:on_start_landing"?: OnStartLanding;
  "minecraft:on_start_takeoff"?: OnStartTakeoff;
  "minecraft:on_target_acquired"?: OnTargetAcquired;
  "minecraft:on_target_escape"?: OnTargetEscape;
  "minecraft:on_wake_with_owner"?: OnWakeWithOwner;
  "minecraft:out_of_control"?: OutOfControl;
  "minecraft:peek"?: Peek;
  "minecraft:persistent"?: Persistent;
  "minecraft:physics"?: Physics;
  "minecraft:player.exhaustion"?: PlayerExhaustion;
  "minecraft:player.experience"?: PlayerExperience;
  "minecraft:player.level"?: PlayerLevel;
  "minecraft:player.saturation"?: PlayerSaturation;
  "minecraft:preferred_path"?: PreferredPath;
  "minecraft:projectile"?: Projectile;
  "minecraft:push_through"?: PushThrough;
  "minecraft:pushable_by_block"?: PushableByBlock;
  "minecraft:pushable_by_entity"?: PushableByEntity;
  "minecraft:raid_trigger"?: RaidTrigger;
  "minecraft:rail_movement"?: RailMovement;
  "minecraft:rail_sensor"?: RailSensor;
  "minecraft:ravager_blocked"?: RavagerBlocked;
  "minecraft:rideable"?: Rideable;
  "minecraft:rotation_axis_aligned"?: BodyRotationAxisAligned;
  "minecraft:rotation_locked_to_vehicle"?: RotationLockedToVehicle;
  "minecraft:reflect_projectiles"?: ReflectProjectiles;
  "minecraft:remove_in_peaceful"?: RemoveInPeaceful;
  "minecraft:renders_when_invisible"?: RendersWhenInvisible;
  "minecraft:scale_by_age"?: ScaleByAge;
  "minecraft:scale"?: Scale2;
  "minecraft:scheduler"?: Scheduler;
  "minecraft:shareables"?: Shareables;
  "minecraft:shooter"?: Shooter;
  "minecraft:sittable"?: Sittable;
  "minecraft:skin_id"?: SkinId;
  "minecraft:sound_volume"?: SoundVolume;
  "minecraft:spawn_egg_interaction"?: SpawnEggInteraction;
  "minecraft:spawn_entity"?: SpawnEntity;
  "minecraft:spawn_on_death"?: SpawnOnDeath;
  "minecraft:spell_effects"?: SpellEffects;
  "minecraft:strength"?: Strength;
  "minecraft:suspect_tracking"?: SuspectTracking;
  "minecraft:tameable"?: Tameable;
  "minecraft:tamemount"?: Tamemount;
  "minecraft:target_nearby_sensor"?: TargetNearbySensor;
  "minecraft:teleport"?: Teleport;
  "minecraft:tick_world"?: TickWorld;
  "minecraft:timer"?: Timer;
  "minecraft:trade_resupply"?: TradeResupply;
  "minecraft:trade_table"?: TradeTable;
  "minecraft:trail"?: Trail;
  "minecraft:transformation"?: Transformation;
  "minecraft:transient"?: Transient;
  "minecraft:trust"?: Trust;
  "minecraft:trusting"?: Trusting;
  "minecraft:type_family"?: TypeFamily;
  "minecraft:uses_legacy_friction"?: UsesLegacyFriction;
  "minecraft:uses_uniform_air_drag"?: UsesUniformAirDrag;
  "minecraft:underwater_movement"?: Attribute;
  "minecraft:variable_max_auto_step"?: VariableMaxAutoStep;
  "minecraft:variant"?: Variant2;
  "minecraft:vertical_movement_action"?: VerticalMovementAction;
  "minecraft:vibration_damper"?: VibrationDamper;
  "minecraft:vibration_listener"?: VibrationListener;
  "minecraft:walk_animation_speed"?: WalkAnimationSpeed;
  "minecraft:wants_jockey"?: WantsJockey;
  "minecraft:water_movement"?: WaterMovement;
  "minecraft:behavior.admire_item"?: AdmireItem1;
  "minecraft:behavior.aquatic_charge_attack"?: AquaticChargeAttack;
  "minecraft:behavior.avoid_block"?: AvoidBlock;
  "minecraft:behavior.avoid_mob_type"?: AvoidMobType;
  "minecraft:behavior.barter"?: Barter3;
  "minecraft:behavior.beg"?: Beg;
  "minecraft:behavior.break_door"?: BreakDoor;
  "minecraft:behavior.breed"?: Breed;
  "minecraft:behavior.celebrate_survive"?: CelebrateSurvive;
  "minecraft:behavior.celebrate"?: Celebrate;
  "minecraft:behavior.charge_attack"?: ChargeAttack;
  "minecraft:behavior.charge_held_item"?: ChargeHeldItem;
  "minecraft:behavior.circle_around_anchor"?: CircleAroundAnchor;
  "minecraft:behavior.controlled_by_player"?: ControlledByPlayer;
  "minecraft:behavior.croak"?: Croak;
  "minecraft:behavior.defend_trusted_target"?: DefendTrustedTarget;
  "minecraft:behavior.defend_village_target"?: DefendVillageTarget;
  "minecraft:behavior.delayed_attack"?: DelayedAttack;
  "minecraft:behavior.dig"?: Dig;
  "minecraft:behavior.door_interact"?: DoorInteract;
  "minecraft:behavior.dragonchargeplayer"?: Dragonchargeplayer;
  "minecraft:behavior.dragondeath"?: Dragondeath;
  "minecraft:behavior.dragonflaming"?: Dragonflaming;
  "minecraft:behavior.dragonholdingpattern"?: Dragonholdingpattern;
  "minecraft:behavior.dragonlanding"?: Dragonlanding;
  "minecraft:behavior.dragonscanning"?: Dragonscanning;
  "minecraft:behavior.dragonstrafeplayer"?: Dragonstrafeplayer;
  "minecraft:behavior.dragontakeoff"?: Dragontakeoff;
  "minecraft:behavior.drink_milk"?: DrinkMilk;
  "minecraft:behavior.drink_potion"?: DrinkPotion;
  "minecraft:behavior.drop_item_for"?: DropItemFor;
  "minecraft:behavior.eat_block"?: EatBlock;
  "minecraft:behavior.eat_carried_item"?: EatCarriedItem;
  "minecraft:behavior.eat_mob"?: EatMob;
  "minecraft:behavior.emerge"?: Emerge;
  "minecraft:behavior.equip_item"?: EquipItem1;
  "minecraft:behavior.explore_outskirts"?: ExploreOutskirts;
  "minecraft:behavior.fertilize_farm_block"?: FertilizeFarmBlock;
  "minecraft:behavior.find_cover"?: FindCover;
  "minecraft:behavior.find_mount"?: FindMount;
  "minecraft:behavior.find_underwater_treasure"?: FindUnderwaterTreasure;
  "minecraft:behavior.fire_at_target"?: FireAtTarget;
  "minecraft:behavior.flee_sun"?: FleeSun;
  "minecraft:behavior.float_wander"?: FloatWander;
  "minecraft:behavior.float"?: Float;
  "minecraft:behavior.float_tempt"?: FloatTempt;
  "minecraft:behavior.follow_caravan"?: FollowCaravan;
  "minecraft:behavior.follow_mob"?: FollowMob;
  "minecraft:behavior.follow_owner"?: FollowOwner;
  "minecraft:behavior.follow_parent"?: FollowParent;
  "minecraft:behavior.follow_target_leader"?: FollowTargetLeader;
  "minecraft:behavior.go_and_give_items_to_noteblock"?: GoAndGiveItemsToNoteblock;
  "minecraft:behavior.go_and_give_items_to_owner"?: GoAndGiveItemsToOwner;
  "minecraft:behavior.go_home"?: GoHome;
  "minecraft:behavior.guardian_attack"?: GuardianAttack;
  "minecraft:behavior.harvest_farm_block"?: HarvestFarmBlock;
  "minecraft:behavior.hide"?: Hide1;
  "minecraft:behavior.hold_ground"?: HoldGround;
  "minecraft:behavior.hurt_by_target"?: HurtByTarget;
  "minecraft:behavior.inspect_bookshelf"?: InspectBookshelf;
  "minecraft:behavior.investigate_suspicious_location"?: InspectBookshelf1;
  "minecraft:behavior.jump_around_target"?: JumpAroundTarget;
  "minecraft:behavior.jump_to_block"?: JumpToBlock;
  "minecraft:behavior.knockback_roar"?: KnockbackRoar;
  "minecraft:behavior.lay_down"?: LayDown;
  "minecraft:behavior.lay_egg"?: LayEgg;
  "minecraft:behavior.leap_at_target"?: LeapAtTarget;
  "minecraft:behavior.look_at_entity"?: LookAtEntity;
  "minecraft:behavior.look_at_player"?: LookAtPlayer;
  "minecraft:behavior.look_at_target"?: LookAtTarget;
  "minecraft:behavior.look_at_trading_player"?: LookAtTradingPlayer;
  "minecraft:behavior.make_love"?: MakeLove;
  "minecraft:behavior.melee_attack"?: MeleeAttack;
  "minecraft:behavior.melee_box_attack"?: MeleeBoxAttack;
  "minecraft:behavior.mingle"?: Mingle;
  "minecraft:behavior.mount_pathing"?: MountPathing;
  "minecraft:behavior.move_indoors"?: MoveIndoors;
  "minecraft:behavior.move_outdoors"?: MoveOutdoors;
  "minecraft:behavior.move_through_village"?: MoveThroughVillage;
  "minecraft:behavior.move_to_block"?: MoveToBlock;
  "minecraft:behavior.move_to_land"?: MoveToLand;
  "minecraft:behavior.move_to_lava"?: MoveToLava;
  "minecraft:behavior.move_to_liquid"?: MoveToLiquid;
  "minecraft:behavior.move_to_poi"?: MoveToPoi;
  "minecraft:behavior.move_to_random_block"?: MoveToRandomBlock;
  "minecraft:behavior.move_to_village"?: MoveToVillage;
  "minecraft:behavior.move_to_water"?: MoveToWater;
  "minecraft:behavior.move_towards_dwelling_restriction"?: MoveTowardsDwellingRestriction;
  "minecraft:behavior.move_towards_home_restriction"?: MoveTowardsHomeRestriction;
  "minecraft:behavior.move_towards_restriction"?: MoveTowardsRestriction;
  "minecraft:behavior.move_towards_target"?: MoveTowardsTarget;
  "minecraft:behavior.nap"?: Nap;
  "minecraft:behavior.nearest_attackable_target"?: NearestAttackableTarget;
  "minecraft:behavior.nearest_prioritized_attackable_target"?: NearestPrioritizedAttackableTarget;
  "minecraft:behavior.ocelot_sit_on_block"?: OcelotSitOnBlock;
  "minecraft:behavior.ocelotattack"?: Ocelotattack;
  "minecraft:behavior.offer_flower"?: OfferFlower;
  "minecraft:behavior.open_door"?: OpenDoor;
  "minecraft:behavior.owner_hurt_by_target"?: OwnerHurtByTarget;
  "minecraft:behavior.owner_hurt_target"?: OwnerHurtTarget;
  "minecraft:behavior.panic"?: Panic;
  "minecraft:behavior.pet_sleep_with_owner"?: PetSleepWithOwner;
  "minecraft:behavior.pickup_items"?: PickupItems;
  "minecraft:behavior.place_block"?: PlaceBlock;
  "minecraft:behavior.play_dead"?: PlayDead;
  "minecraft:behavior.play"?: Play;
  "minecraft:behavior.player_ride_tamed"?: PlayerRideTamed;
  "minecraft:behavior.raid_garden"?: RaidGarden;
  "minecraft:behavior.ram_attack"?: RamAttack;
  "minecraft:behavior.random_breach"?: RandomBreach;
  "minecraft:behavior.random_fly"?: RandomFly;
  "minecraft:behavior.random_hover"?: RandomHover;
  "minecraft:behavior.random_look_around_and_sit"?: RandomLookAroundAndSit;
  "minecraft:behavior.random_look_around"?: RandomLookAround;
  "minecraft:behavior.random_search_and_dig"?: RandomLookAround1;
  "minecraft:behavior.random_sitting"?: RandomSitting;
  "minecraft:behavior.random_stroll"?: RandomStroll;
  "minecraft:behavior.random_swim"?: RandomSwim;
  "minecraft:behavior.ranged_attack"?: RangedAttack;
  "minecraft:behavior.receive_love"?: ReceiveLove;
  "minecraft:behavior.restrict_open_door"?: RestrictOpenDoor;
  "minecraft:behavior.restrict_sun"?: RestrictSun;
  "minecraft:behavior.rise_to_liquid_level"?: RiseToLiquidLevel;
  "minecraft:behavior.roar"?: Roar;
  "minecraft:behavior.roll"?: Roll;
  "minecraft:behavior.run_around_like_crazy"?: RunAroundLikeCrazy;
  "minecraft:behavior.scared"?: Scared;
  "minecraft:behavior.send_event"?: SendEvent;
  "minecraft:behavior.share_items"?: ShareItems;
  "minecraft:behavior.silverfish_merge_with_stone"?: SilverfishMergeWithStone;
  "minecraft:behavior.silverfish_wake_up_friends"?: SilverfishWakeUpFriends;
  "minecraft:behavior.skeleton_horse_trap"?: SkeletonHorseTrap;
  "minecraft:behavior.sleep"?: Sleep;
  "minecraft:behavior.slime_attack"?: SlimeAttack;
  "minecraft:behavior.slime_float"?: SlimeFloat;
  "minecraft:behavior.slime_keep_on_jumping"?: SlimeKeepOnJumping;
  "minecraft:behavior.slime_random_direction"?: SlimeRandomDirection;
  "minecraft:behavior.snacking"?: Snacking;
  "minecraft:behavior.sneeze"?: Sneeze;
  "minecraft:behavior.sniff"?: Sniff;
  "minecraft:behavior.sonic_boom"?: SonicBoom;
  "minecraft:behavior.squid_dive"?: SquidDive;
  "minecraft:behavior.squid_flee"?: SquidFlee;
  "minecraft:behavior.squid_idle"?: SquidIdle;
  "minecraft:behavior.squid_move_away_from_ground"?: SquidMoveAwayFromGround;
  "minecraft:behavior.squid_out_of_water"?: SquidOutOfWater;
  "minecraft:behavior.stalk_and_pounce_on_target"?: StalkAndPounceOnTarget;
  "minecraft:behavior.stay_near_noteblock"?: StayNearNoteblock;
  "minecraft:behavior.stay_while_sitting"?: StayWhileSitting;
  "minecraft:behavior.stomp_attack"?: StompAttack;
  "minecraft:behavior.stomp_turtle_egg"?: StompTurtleEgg;
  "minecraft:behavior.stroll_towards_village"?: StrollTowardsVillage;
  "minecraft:behavior.summon_entity"?: SummonEntity;
  "minecraft:behavior.swell"?: Swell;
  "minecraft:behavior.swim_idle"?: SwimIdle;
  "minecraft:behavior.swim_up_for_breath"?: SwimUpForBreath;
  "minecraft:behavior.swim_wander"?: SwimWander;
  "minecraft:behavior.swim_with_entity"?: SwimWithEntity;
  "minecraft:behavior.swoop_attack"?: SwoopAttack;
  "minecraft:behavior.take_block"?: TakeBlock;
  "minecraft:behavior.take_flower"?: TakeFlower;
  "minecraft:behavior.teleport_to_owner"?: TeleportToOwner;
  "minecraft:behavior.move_around_target"?: MoveAroundTarget;
  "minecraft:behavior.target_when_pushed"?: TargetWhenPushed;
  "minecraft:behavior.tempt"?: Tempt;
  "minecraft:behavior.timer_flag_1"?: TimerFlag;
  "minecraft:behavior.timer_flag_2"?: TimerFlag;
  "minecraft:behavior.timer_flag_3"?: TimerFlag;
  "minecraft:behavior.trade_interest"?: TradeInterest;
  "minecraft:behavior.trade_with_player"?: TradeWithPlayer;
  "minecraft:behavior.transport_items"?: TransportItems;
  "minecraft:behavior.use_kinetic_weapon"?: UseKineticWeapon;
  "minecraft:behavior.vex_copy_owner_target"?: VexCopyOwnerTarget;
  "minecraft:behavior.vex_random_move"?: VexRandomMove;
  "minecraft:behavior.wither_random_attack_pos_goal"?: WitherRandomAttackPosGoal;
  "minecraft:behavior.wither_target_highest_damage"?: WitherTargetHighestDamage;
  "minecraft:behavior.work"?: Work;
  "minecraft:behavior.work_composter"?: WorkComposter;
}
/**
 * The components groups to add or remove.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FBA_addremove".
 */
export interface AddOrRemove {
  component_groups?: ComponentGroups1;
}
/**
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FBA_weighted_event_base".
 */
export interface FBAWeightedEventBase {
  filters?: Filters3;
  trigger?: Trigger42;
  add?: Add2;
  remove?: Remove1;
  randomize?: Randomize2;
  sequence?: Sequences;
  emit_vibration?: EmitVibration1;
  set_property?: SetProperty1;
  /**
   * Queues a command to be executed.
   */
  queue_command?: {
    command?: Command1;
    [k: string]: unknown;
  };
  weight?: Weight5;
}
/**
 * Events for entities.
 *
 * This interface was referenced by `EntityBehavior`'s JSON-Schema
 * via the `definition` "FBA".
 */
export interface Events1 {
  "minecraft:entity_transformed"?: EntityTransformed;
  "minecraft:entity_born"?: EntityBorn;
  "minecraft:entity_spawned"?: EntitySpawned;
  "minecraft:on_prime"?: OnPrime;
  [k: string]: FBAEventBase;
}
