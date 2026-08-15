/* Auto-generated from Blockception Bedrock Schemas */

export type BlockceptionMinecraftResourceAttachables = {
  [k: string]: unknown;
} & {
  format_version?: FormatVersion;
  [k: string]: unknown;
};
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type FormatVersion = F & F1;
export type F =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type F1 = string;
