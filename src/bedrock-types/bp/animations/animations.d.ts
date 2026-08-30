/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "B".
 */
export type FormatVersion = B & B1;
export type B =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type B1 = string;
/**
 * The time in seconds this animation will last.
 */
export type AnimationLength = number;
/**
 * If set to true, this animation will loop (as long as it remains active).
 */
export type Loop = boolean;
/**
 * The event or commands to execute.
 */
export type Commands = (Variable | MinecraftCommand | Molang | Event) & string;
/**
 * The event or commands to execute.
 *
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "commands".
 */
export type Commands1 = Commands2 & Commands3;
export type Commands2 = Variable | MinecraftCommand | Molang | Event;
export type Commands3 = string;
export type CollectionTimelimeItems = Commands1[];
/**
 * How time passes when playing the animation. Defaults to `query.anim_time + query.delta_time` which means advance in seconds.
 */
export type AnimationTimeUpdate = string | number;
/**
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "animationspec".
 */
export type Animationspec = AnimationSpecification | AnimationSpecification1;
/**
 * A single string that specifies which animation there are.
 */
export type AnimationSpecification = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "A".
 */
export type Molang1 = string;
/**
 * Set to false to have the effect spawned in the world without being bound to an actor (by default an effect is bound to the actor).
 */
export type BindToActor = false;
/**
 * The name of a particle effect that should be played.
 */
export type Effect = string;
/**
 * The name of a locator on the actor where the effect should be located.
 */
export type Locator = string;
/**
 * A molang script that will be run when the particle emitter is initialized.
 */
export type PreEffectScript = string;
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "C".
 */
export type MolangNumber = string | number;

/**
 * An animation definition for an entity.
 */
export interface Animation {
  format_version: FormatVersion;
  animations: AnimationsSchema;
}
/**
 * The animation specification.
 */
export interface AnimationsSchema {
  [k: string]: Animation1;
}
/**
 * A single animation definition for an entity.
 */
export interface Animation1 {
  animation_length?: AnimationLength;
  loop?: Loop;
  timeline?: Timeline;
  anim_time_update?: AnimationTimeUpdate;
}
/**
 * A timeline specification, where property names are timestamps.
 */
export interface Timeline {
  [k: string]: Commands | CollectionTimelimeItems;
}
/**
 * Sets the value to a molang variable.
 */
export interface Variable {
  [k: string]: unknown;
}
/**
 * Executes a minecraft command.
 */
export interface MinecraftCommand {
  [k: string]: unknown;
}
export interface Molang {
  [k: string]: unknown;
}
/**
 * An event to be called upon within the executing entity.
 */
export interface Event {
  [k: string]: unknown;
}
/**
 * A object specification on how to transition.
 */
export interface AnimationSpecification1 {
  [k: string]: Molang1;
}
/**
 * This interface was referenced by `Animation`'s JSON-Schema
 * via the `definition` "particle_effect_spec".
 */
export interface ParticleEffectSpec {
  bind_to_actor?: BindToActor;
  effect: Effect;
  locator?: Locator;
  pre_effect_script?: PreEffectScript;
}
