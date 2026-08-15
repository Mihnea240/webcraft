/* Auto-generated from Blockception Bedrock Schemas */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `ColorGrading`'s JSON-Schema
 * via the `definition` "A".
 */
export type FormatVersion = string;
/**
 * The identifier for these color grading settings.
 */
export type Identifier = string;
/**
 * Describes the difference in luminance between the bright and dark pixels in an image, otherwise known as the tonal range.
 */
export type Contrast = number[];
/**
 * A multiplication factor applied to each color channel to adjust the overall luminance intensity of the image.
 */
export type Gain = number[];
/**
 * An exponential factor applied to the final color after both color grading and tone mapping to adjust the overall luminance intensity of the image.
 */
export type Gamma = number[];
/**
 * An additive factor that is multiplied by the average luminance of the scene and then added to a given color channel to adjust the overall luminance intensity of the image.
 */
export type Offset = number[];
/**
 * Determines the hue intensity of colors. A value of 1.0 results in no change in saturation to the original image.
 */
export type Saturation = number[];
/**
 * Whether to enable highlights
 */
export type Enabled = boolean;
/**
 * A factor multiplied by the average luminance of the scene to determine which pixels are considered highlights.
 */
export type HighlightsMin = number;
/**
 * Describes the difference in luminance between the bright and dark pixels in an image, otherwise known as the tonal range.
 */
export type Contrast1 = number[];
/**
 * A multiplication factor applied to each color channel to adjust the overall luminance intensity of the image.
 */
export type Gain1 = number[];
/**
 * An exponential factor applied to the final color after both color grading and tone mapping to adjust the overall luminance intensity of the image.
 */
export type Gamma1 = number[];
/**
 * An additive factor that is multiplied by the average luminance of the scene and then added to a given color channel to adjust the overall luminance intensity of the image.
 */
export type Offset1 = number[];
/**
 * Determines the hue intensity of colors. A value of 1.0 results in no change in saturation to the original image.
 */
export type Saturation1 = number[];
/**
 * Whether to enable shadows
 */
export type Enabled1 = boolean;
/**
 * A factor multiplied by the average luminance of the scene to determine which pixels are considered shadows.
 */
export type ShadowsMin = number;
/**
 * Describes the difference in luminance between the bright and dark pixels in an image, otherwise known as the tonal range.
 */
export type Contrast2 = number[];
/**
 * A multiplication factor applied to each color channel to adjust the overall luminance intensity of the image.
 */
export type Gain2 = number[];
/**
 * An exponential factor applied to the final color after both color grading and tone mapping to adjust the overall luminance intensity of the image.
 */
export type Gamma2 = number[];
/**
 * An additive factor that is multiplied by the average luminance of the scene and then added to a given color channel to adjust the overall luminance intensity of the image.
 */
export type Offset2 = number[];
/**
 * Determines the hue intensity of colors. A value of 1.0 results in no change in saturation to the original image.
 */
export type Saturation2 = number[];
/**
 * Whether to enable temperature grading
 */
export type Enabled2 = boolean;
/**
 * Sets the temperature in kelvin
 */
export type Temperature1 = number;
/**
 * The type of temperature color grading to apply
 */
export type Type = "white_balance" | "color_temperature";
/**
 * The operator for the tone mapping
 */
export type Operator = "reinhard" | "reinhard_luma" | "reinhard_luminance" | "hable" | "aces" | "generic";

/**
 * The properties of the color grading
 */
export interface ColorGrading {
  format_version?: FormatVersion;
  "minecraft:color_grading_settings"?: ColorGradingSettings;
}
/**
 * UNDOCUMENTED
 */
export interface ColorGradingSettings {
  description: ColorGradingDescription;
  color_grading?: ColorGrading1;
  tone_mapping?: ToneMapping;
}
/**
 * Contains non-component settings for the color grading settings.
 */
export interface ColorGradingDescription {
  identifier: Identifier;
}
/**
 * The color grading settings
 */
export interface ColorGrading1 {
  midtones?: Midtones;
  highlights?: Highlights;
  shadows?: Shadows;
  temperature?: Temperature;
}
/**
 * Color grading parameters for midtones, and for when highlights or shadows are not specified.
 */
export interface Midtones {
  contrast?: Contrast;
  gain?: Gain;
  gamma?: Gamma;
  offset?: Offset;
  saturation?: Saturation;
}
/**
 * Optional color grading parameters for highlights.
 */
export interface Highlights {
  enabled?: Enabled;
  highlightsMin?: HighlightsMin;
  contrast?: Contrast1;
  gain?: Gain1;
  gamma?: Gamma1;
  offset?: Offset1;
  saturation?: Saturation1;
}
/**
 * Optional color grading parameters for shadows.
 */
export interface Shadows {
  enabled?: Enabled1;
  shadowsMax?: ShadowsMin;
  contrast?: Contrast2;
  gain?: Gain2;
  gamma?: Gamma2;
  offset?: Offset2;
  saturation?: Saturation2;
}
/**
 * Optional parameters for temperature based color grading.
 */
export interface Temperature {
  enabled?: Enabled2;
  temperature?: Temperature1;
  type?: Type;
}
/**
 * Tone mapping determines how a color is remapped from HDR-space to SDR-space for display on modern televisions and monitors.
 */
export interface ToneMapping {
  operator?: Operator;
}
