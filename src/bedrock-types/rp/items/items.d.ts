/* Auto-generated from Blockception Bedrock Schemas */

export type BlockceptionMinecraftResourceItems = {
  [k: string]: unknown;
} & {
  format_version?: FormatVersion;
  [k: string]: unknown;
};
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type FormatVersion = C & C1;
export type C =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type C1 = string;
