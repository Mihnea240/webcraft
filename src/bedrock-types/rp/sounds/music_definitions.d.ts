/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * This interface was referenced by `MusicFile`'s JSON-Schema
 * via the `definition` "music".
 */
export type Music = unknown;
/**
 * The name of the minecraft music event.
 */
export type EventName = string;
/**
 * UNDOCUMENTED: Minimum delay.
 */
export type MinimumDelay = number;
/**
 * UNDOCUMENTED: Maximum delay.
 */
export type MaximumDelay = number;

/**
 * The definition file of music of the resourcepack.
 */
export interface MusicFile {
  [k: string]: Music1;
}
/**
 * A music definition.
 */
export interface Music1 {
  event_name: EventName;
  min_delay?: MinimumDelay;
  max_delay?: MaximumDelay;
}
