/* Auto-generated from Blockception Bedrock Schemas */

/**
 * Specifying another block sound they should use sounds for if they do not define a sound themselves
 */
export type Base = string;
/**
 * This interface was referenced by `SoundsJson`'s JSON-Schema
 * via the `definition` "volume".
 */
export type Volume = number | [] | [Minimum] | [Minimum, Maximum];
export type Minimum = number;
export type Maximum = number;
/**
 * This interface was referenced by `SoundsJson`'s JSON-Schema
 * via the `definition` "pitch".
 */
export type Pitch = number | [] | [Minimum1] | [Minimum1, Maximum1];
export type Minimum1 = number;
export type Maximum1 = number;
/**
 * A single sound event definition.
 *
 * This interface was referenced by `SoundsJson`'s JSON-Schema
 * via the `definition` "sound_event".
 */
export type SoundEvent =
  | string
  | {
      volume?: Volume;
      sound: SoundEvent1;
      pitch?: Pitch;
    };
/**
 * The sound event described in sound_definitions.json
 */
export type SoundEvent1 = string;
/**
 * Key returning the enum string for variants, can use any Molang expression resulting in a string.
 */
export type Key = string;
/**
 * A single sound event definition.
 */
export type SoundEvent2 =
  | string
  | {
      volume?: Volume;
      sound?: SoundEvent3;
      pitch?: Pitch;
    };
/**
 * The sound event described in sound_definitions.json
 */
export type SoundEvent3 = string;
export type ASoundInteraction = string;
export type ASoundInteraction1 = string;

/**
 * Sound definitions.
 */
export interface SoundsJson {
  block_sounds?: BlockSounds;
  entity_sounds?: EntitySounds;
  individual_event_sounds?: IndividualEventSounds;
  interactive_sounds?: InteractiveSounds;
}
/**
 * Block sound definitions.
 */
export interface BlockSounds {
  [k: string]: BlockSound;
}
/**
 * A single block sound definition.
 */
export interface BlockSound {
  base?: Base;
  volume?: Volume;
  pitch?: Pitch;
  events?: Events;
}
export interface Events {
  [k: string]: SoundEvent;
}
/**
 * Entity sounds definitions.
 */
export interface EntitySounds {
  defaults?: EntitySound;
  entities?: Entities;
}
/**
 * Entity sound definitions.
 *
 * This interface was referenced by `SoundsJson`'s JSON-Schema
 * via the `definition` "entity_event".
 */
export interface EntitySound {
  volume?: Volume;
  pitch?: Pitch;
  events?: Events1;
  variants?: Variants;
  [k: string]: unknown;
}
export interface Events1 {
  [k: string]: SoundEvent;
}
/**
 * Defines sound variants based on the runtime entity
 */
export interface Variants {
  key?: Key;
  map?: Map;
}
/**
 * Contains key-value pairs of a variant identifier and the sound events it overrides
 */
export interface Map {
  [k: string]: {
    volume?: Volume;
    pitch?: Pitch;
    events?: Events2;
  };
}
export interface Events2 {
  [k: string]: SoundEvent;
}
/**
 * Entities definitions.
 */
export interface Entities {
  [k: string]: EntitySound;
}
/**
 * Individual event sounds definitions.
 */
export interface IndividualEventSounds {
  events?: Events3;
}
/**
 * Events.
 */
export interface Events3 {
  [k: string]: SoundEvent;
}
/**
 * Interactive sounds definitions.
 */
export interface InteractiveSounds {
  block_sounds?: BlockSounds1;
  entity_sounds?: EntitySounds1;
}
/**
 * Block sound definitions.
 */
export interface BlockSounds1 {
  [k: string]: BlockSound1;
}
/**
 * A single block sound definition.
 */
export interface BlockSound1 {
  volume?: Volume;
  pitch?: Pitch;
  events?: Events4;
}
export interface Events4 {
  [k: string]: SoundEvent2;
}
/**
 * Entity sound definitions.
 */
export interface EntitySounds1 {
  defaults?: Defaults;
  entities?: EntitesSounds;
}
/**
 * Default sound definitions.
 */
export interface Defaults {
  volume?: Volume;
  pitch?: Pitch;
  [k: string]: EntitySounds2;
}
export interface EntitySounds2 {
  events?: EntityEvents;
  [k: string]: unknown;
}
export interface EntityEvents {
  [k: string]: EntityEvent;
}
/**
 * A single entity event.
 */
export interface EntityEvent {
  [k: string]: ASoundInteraction;
}
/**
 * Entities sound definitions.
 */
export interface EntitesSounds {
  [k: string]: EntitySounds3;
}
export interface EntitySounds3 {
  volume?: Volume;
  pitch?: Pitch;
  events?: EntityEvents1;
  [k: string]: unknown;
}
export interface EntityEvents1 {
  [k: string]: EntityEvent1;
}
/**
 * A single entity event.
 */
export interface EntityEvent1 {
  [k: string]: ASoundInteraction1;
}
