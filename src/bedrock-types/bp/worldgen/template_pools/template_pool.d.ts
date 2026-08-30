/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `TemplatePool`'s JSON-Schema
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
 * Identifier of the template pool. This is used by both the start_pool property of the Jigsaw Structure JSON and the Jigsaw Block's Target Pool field.
 */
export type Identifier = string;
/**
 * An array of pool elements.
 *
 * @minItems 1
 */
export type Elements = [TemplatePoolElement, ...TemplatePoolElement[]];
/**
 * A grouping of a Structure Template, the Processor List to use when placing the structure, and its weight that determines the likelihood of the element being chosen.
 */
export type Element = {
  [k: string]: unknown;
};
/**
 * The weighted probability of choosing the element from the pool. For example, a template pool containing 2 structures with weights of 1 and 3 will have a 25% and 75% chance of being chosen respectively.
 */
export type Weight = number;
/**
 * Fallback template pool to use if no element in the pool can be placed successfully.
 */
export type Fallback = string;
/**
 *  The type of element.
 */
export type ElementType = "minecraft:empty_pool_element";
/**
 *  The type of element.
 */
export type ElementType1 = "minecraft:single_pool_element";
/**
 * The path of the structure file. This path is relative to the behavior pack's "structures" folder.
 */
export type Location = string;
/**
 * The identifier of the processor list to use when placing the structure.
 */
export type Processors = string;
/**
 * Specifies how structures should be placed relative to the terrain.
 */
export type Projection = ("rigid" | "terrain_matching") & string;
/**
 * The identifier of the feature to place.
 */
export type Feature = string;

/**
 * Used to pair block rules with Structure Templates and to randomly place Structure Templates using a weighted list.
 */
export interface TemplatePool {
  format_version: FormatVersion;
  "minecraft:template_pool": TemplatePool1;
}
/**
 * This interface was referenced by `TemplatePool`'s JSON-Schema
 * via the `definition` "B".
 */
export interface TemplatePool1 {
  description: Description;
  elements: Elements;
  fallback?: Fallback;
}
/**
 * The description of this template pool.
 */
export interface Description {
  identifier: Identifier;
}
/**
 * A template pool item used to define the element and its weight.
 *
 * This interface was referenced by `TemplatePool`'s JSON-Schema
 * via the `definition` "B_template_pool_element".
 */
export interface TemplatePoolElement {
  element: Element;
  weight?: Weight;
}
/**
 * This interface was referenced by `TemplatePool`'s JSON-Schema
 * via the `definition` "B_empty_element".
 */
export interface BEmptyElement {
  element_type: ElementType;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `TemplatePool`'s JSON-Schema
 * via the `definition` "B_single_element".
 */
export interface BSingleElement {
  element_type: ElementType1;
  location: Location;
  processors?: Processors;
  projection?: Projection;
  [k: string]: unknown;
}
/**
 * This interface was referenced by `TemplatePool`'s JSON-Schema
 * via the `definition` "B_feature_pool_element".
 */
export interface BFeaturePoolElement {
  element_type: "minecraft:feature_pool_element";
  feature: Feature;
}
