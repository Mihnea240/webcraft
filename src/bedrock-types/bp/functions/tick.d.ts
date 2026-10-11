/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * The path to the function.
 */
export type FunctionPath = string;
/**
 * The collection of function path to execute.
 */
export type Values = FunctionPath[];

/**
 * Mcfunction that are to be called per game tick (20 times per second).
 */
export interface Tick {
  values?: Values;
}
