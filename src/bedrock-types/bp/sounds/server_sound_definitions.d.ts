/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `ServerSoundDefinitions`'s JSON-Schema
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
 * Unique identifier
 */
export type SoundEventName = string;
/**
 * Controls how playback time is tracked. A mode of `game_time` means the duration is tracked by ticks
 * A mode of `real_time` means the duration is tracked by wall-clock time
 */
export type Mode = "game_time" | "real_time";
/**
 * Duration of the sound event
 */
export type Seconds = number;
/**
 * Musical genres applicable to the sound event
 */
export type Genres = string[];
/**
 * Moods applicable to the sound event
 */
export type Moods = string[];
/**
 * The artist behind the sound event
 */
export type Artist = string;
/**
 * The title of the sound event
 */
export type Title = string;
/**
 * Lets behavior packs declare server-side sound definitions for sounds played from script.
 */
export type ServerSoundDefinitions1 = Definition[];
/**
 * A minecraft identifier.
 *
 * This interface was referenced by `ServerSoundDefinitions`'s JSON-Schema
 * via the `definition` "A".
 */
export type Identifier = string;

/**
 * Lets behavior packs declare server-side sound definitions for sounds played from script.
 */
export interface ServerSoundDefinitions {
  format_version?: FormatVersion;
  "minecraft:server_sound_definitions"?: ServerSoundDefinitions1;
}
/**
 * Server Sound Definition
 *
 * This interface was referenced by `ServerSoundDefinitions`'s JSON-Schema
 * via the `definition` "definition".
 */
export interface Definition {
  sound_event_name: SoundEventName;
  duration_info?: DurationInfo;
  music_info?: MusicInfo;
  tags?: Tags;
}
export interface DurationInfo {
  mode: Mode;
  seconds: Seconds;
}
/**
 * Describes the music content of the sound
 */
export interface MusicInfo {
  genres?: Genres;
  moods?: Moods;
  artist?: Artist;
  title?: Title;
}
/**
 * An optional map where each entry is a tag name mapped to either a single string value or an array of string values, letting behavior packs attach arbitrary metadata to a server sound definition
 */
export interface Tags {
  [k: string]: string | string[];
}
