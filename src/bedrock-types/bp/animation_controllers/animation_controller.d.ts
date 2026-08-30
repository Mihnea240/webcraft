/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
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
 * The key definition of an animation to play, defined in the entity.
 */
export type Animations1 = AnimationSpecification | AnimationSpecification1;
/**
 * A single string that specifies which animation there are.
 */
export type AnimationSpecification = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "A".
 */
export type Molang = string;
/**
 * The animations definition for.
 */
export type Animations = Animations1[];
/**
 * The event or commands to execute.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "commands".
 */
export type Commands = Commands1 & Commands2;
export type Commands1 = Event | Command | Molang1;
export type Commands2 = string;
/**
 * Events, commands or transitions to preform on entry of this state.
 */
export type OnEntry = Commands[];
/**
 * Events, commands or transitions to preform on exit of this state.
 */
export type OnExit = Commands[];
/**
 * The transition definition for.
 */
export type Transition = Transition1[];
/**
 * The state to start with, if not specified state at position 0 in the array is used.
 */
export type InitialState = string;
/**
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "animationspec".
 */
export type Animationspec = AnimationSpecification | AnimationSpecification1;
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
 * Animation controller for behaviors.
 */
export interface AnimationController {
  format_version: FormatVersion;
  animation_controllers: AnimationControllers;
}
/**
 * The animation controllers schema for.
 */
export interface AnimationControllers {
  [k: string]: AnimationController1;
}
/**
 * A single animation controller.
 */
export interface AnimationController1 {
  states: States;
  initial_state?: InitialState;
}
/**
 * The states of this animation controller.
 */
export interface States {
  [k: string]: AnimationState;
}
/**
 * Animation state.
 */
export interface AnimationState {
  animations?: Animations;
  on_entry?: OnEntry;
  on_exit?: OnExit;
  transitions?: Transition;
}
/**
 * A object specification on when to animate.
 */
export interface AnimationSpecification1 {
  [k: string]: Molang;
}
export interface Event {
  [k: string]: unknown;
}
export interface Command {
  [k: string]: unknown;
}
export interface Molang1 {
  [k: string]: unknown;
}
/**
 * A transition to another state.
 */
export interface Transition1 {
  [k: string]: Molang;
}
/**
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "particle_effect_spec".
 */
export interface ParticleEffectSpec {
  bind_to_actor?: BindToActor;
  effect: Effect;
  locator?: Locator;
  pre_effect_script?: PreEffectScript;
}
