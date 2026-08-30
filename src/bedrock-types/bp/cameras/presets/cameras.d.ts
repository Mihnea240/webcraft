/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `CameraPreset`'s JSON-Schema
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
 * A minecraft camera identifier.
 *
 * This interface was referenced by `CameraPreset`'s JSON-Schema
 * via the `definition` "B".
 */
export type CameraIdentifier = string;

/**
 * A camera preset is a set of values that define a camera's position and rotation. This can be used to quickly set a camera to a specific position and rotation.
 */
export interface CameraPreset {
  format_version: FormatVersion;
  "minecraft:camera_preset": {
    [k: string]: unknown;
  };
}
