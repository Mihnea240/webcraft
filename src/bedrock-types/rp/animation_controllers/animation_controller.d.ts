/* Auto-generated from Blockception Bedrock Schemas */

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
export type Animations1 = AnimationSpecification | AnimationSpecification1;
/**
 * A single string that specifies which animation there are.
 */
export type AnimationSpecification = string;
/**
 * Molang definition.
 */
export type Molang = string;
/**
 * The animations definition for.
 */
export type Animations = Animations1[];
export type BlendTransition =
  | number
  | {
      /**
       * Mapping of time since the animation was canceled, to the blend value at that time. A default key of time=0 to a blend value of 1.0 is provided if any other key is set and a blend value at time=0 hasn't already been set.
       */
      [k: string]: number;
    };
/**
 * When blending a transition to another state, animate each euler axis through the shortest rotation, instead of by value.
 */
export type BlendViaShortestPath = boolean;
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
 * The effects to be emitted.
 */
export type ParticleEffects = ParticleEffects1[];
/**
 * The name of a locator on the actor where the effect should be located.
 */
export type Locator1 = string;
/**
 * The specification on when to transition to a new state.
 */
export type Transitions = AnimationSpecification | AnimationSpecification1;
/**
 * The transition definition for.
 */
export type Transition = Transitions[];
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "C".
 */
export type MolangNumber = string | number;
/**
 * UNDOCUMENTED.
 */
export type Molang1 = string;
/**
 * Sets molang on data on entry.
 */
export type OnEntry = Molang1[];
/**
 * UNDOCUMENTED.
 */
export type Molang2 = string;
/**
 * Sets molang on data on exit.
 */
export type OnExit = Molang2[];
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
 * The event or commands to execute.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "commands".
 */
export type Commands = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `AnimationController`'s JSON-Schema
 * via the `definition` "A".
 */
export type Molang3 = string;

/**
 * UNDOCUMENTED.
 */
export interface AnimationController {
  format_version: FormatVersion;
  animation_controllers: AnimationControllersSchema;
}
/**
 * The animation controllers schema for.
 */
export interface AnimationControllersSchema {
  [k: string]: AAnimationController;
}
/**
 * A single animation controller.
 */
export interface AAnimationController {
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
  blend_transition?: BlendTransition;
  blend_via_shortest_path?: BlendViaShortestPath;
  particle_effects?: ParticleEffects;
  /**
   * Collection of sounds to trigger on entry to this animation state.
   */
  sound_effects?: {
    /**
     * Valid sound effect names should be listed in the entity's resource_definition json file.
     */
    effect: string;
    locator?: Locator1;
  }[];
  transitions?: Transition;
  variables?: {
    [k: string]: {
      input: MolangNumber;
      remap_curve?: RemapCurve;
    };
  };
  on_entry?: OnEntry;
  on_exit?: OnExit;
}
/**
 * A object specification on how to transition.
 */
export interface AnimationSpecification1 {
  [k: string]: Molang | number;
}
/**
 * UNDOCUMENTED: particle effects.
 */
export interface ParticleEffects1 {
  bind_to_actor?: BindToActor;
  effect: Effect;
  locator?: Locator;
  pre_effect_script?: PreEffectScript;
}
export interface RemapCurve {
  [k: string]: number;
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
