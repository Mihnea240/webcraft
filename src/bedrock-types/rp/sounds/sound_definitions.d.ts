/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `SoundDefinitions`'s JSON-Schema
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
 * Whenever or not use legacy distance checking.
 */
export type UseLegacyMaxDistance = "true" | "false";
/**
 * The category this sound belongs to, for the user to control the volume on.
 */
export type SoundCategory =
  "ambient" | "block" | "music" | "weather" | "ui" | "bucket" | "neutral" | "player" | "hostile" | "record" | "bottle";
/**
 * UNDOCUMENTED: sounds.
 */
export type Sounds1 = SoundFilepathSchema | Sounds2;
/**
 * The filepath to the sound, starts with `sounds/'.
 */
export type SoundFilepathSchema = string;
/**
 * UNDOCUMENTED.
 */
export type Is3D = boolean;
/**
 * The pitch of the audio, 1 is nomial.
 */
export type Pitch = number;
/**
 * The volume of the audio, 1 is nomial.
 */
export type Volume = number;
/**
 * If marked true then minecraft will stream the audio.
 */
export type Stream = boolean;
/**
 * UNDOCUMENTED: name.
 */
export type Name = string;
/**
 * UNDOCUMENTED.
 */
export type Weight = number;
/**
 * The collection of sounds minecraft can choice from.
 */
export type Sounds = Sounds1[];
/**
 * UNDOCUMENTED.
 */
export type MaxDistance = number | null;
/**
 * UNDOCUMENTED.
 */
export type MinDistance = number | null;
/**
 * UNDOCUMENTED.
 */
export type Subtitle = string;
/**
 * UNDOCUMENTED: use legacy Maximum distance.
 */
export type UseLegacyMaximumDistance = "true" | "false";
/**
 * The filepath to the sound, starts with `sounds/'.
 *
 * This interface was referenced by `SoundDefinitions`'s JSON-Schema
 * via the `definition` "SoundPath".
 */
export type SoundFilepathSchema1 = string;

/**
 * The collection of sound definitions this resourcepack has defined.
 */
export interface SoundDefinitions {
  format_version?: FormatVersion;
  sound_definitions?: SoundDefinitions1;
  __use_legacy_max_distance?: UseLegacyMaximumDistance;
}
/**
 * UNDOCUMENTED: sound definitions.
 */
export interface SoundDefinitions1 {
  [k: string]: Sound;
}
/**
 * This interface was referenced by `SoundDefinitions`'s JSON-Schema
 * via the `definition` "SoundSpec".
 */
export interface Sound {
  __use_legacy_max_distance?: UseLegacyMaxDistance;
  category?: SoundCategory;
  sounds: Sounds;
  max_distance?: MaxDistance;
  min_distance?: MinDistance;
  subtitle?: Subtitle;
}
/**
 * A collection of sounds to choice from.
 */
export interface Sounds2 {
  is3D?: Is3D;
  pitch?: Pitch;
  volume?: Volume;
  stream?: Stream;
  name: Name;
  weight?: Weight;
}
