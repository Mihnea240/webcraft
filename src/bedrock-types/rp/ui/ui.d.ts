/* Auto-generated from Blockception Bedrock Schemas: resource */

export type Namespace = string;
/**
 * The type of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "B".
 */
export type AnimationType =
  ("wait" | "offset" | "alpha" | "flip_book" | "aseprite_flip_book" | "clip" | "color" | "size" | "uv") | C;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "C".
 */
export type C = ElementReference | ElementReference1 | VariableReference;
/**
 * A reference to an element using the following syntax: [element_name]@[namespace_reference].[element_name_reference]
 */
export type ElementReference = string;
/**
 * A reference to an element using the following syntax: [namespace_reference].[element_name_reference]
 */
export type ElementReference1 = string;
/**
 * A variable is a reference to a value that can be used in the UI.
 */
export type VariableReference = string;
/**
 * The name of the animation that will be reset.
 */
export type AnimationResetName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If set, the given element will be destroyed at the end of the animation.
 */
export type DestroyAtEnd = ElementReference | ElementReference1 | VariableReference;
/**
 * If true, the animation will not be fast forwarded.
 */
export type DisableAnimFastForward = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The duration of the animation.
 */
export type Duration = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The easing of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BB".
 */
export type Easing =
  | (
      | "linear"
      | "spring"
      | "in_quad"
      | "out_quad"
      | "in_out_quad"
      | "in_cubic"
      | "out_cubic"
      | "in_out_cubic"
      | "in_quart"
      | "out_quart"
      | "in_out_quart"
      | "in_quint"
      | "out_quint"
      | "in_out_quint"
      | "in_sine"
      | "out_sine"
      | "in_out_sine"
      | "in_expo"
      | "out_expo"
      | "in_out_expo"
      | "in_circ"
      | "out_circ"
      | "in_out_circ"
      | "in_bounce"
      | "out_bounce"
      | "in_out_bounce"
      | "in_back"
      | "out_back"
      | "in_out_back"
      | "in_elastic"
      | "out_elastic"
      | "in_out_elastic"
    )
  | C;
/**
 * The event that will be triggered when the animation ends.
 */
export type EndEvent = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The FPS of the animation.
 */
export type FPS = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The number of frames in the animation.
 */
export type FrameCount = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The step of the frame.
 */
export type FrameStep = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The starting point of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BH".
 */
export type From = number | BI;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BI".
 */
export type BI = ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
export type Width = string | number;
export type Height = string | number;
/**
 * The initial UV of the animation.
 */
export type InitialUV =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The name of the next element.
 */
export type Next = ElementReference | ElementReference1 | VariableReference;
/**
 * The event that will be played.
 */
export type PlayEvent = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, this element will apply the same alpha value to its controlled element(s).
 */
export type PropagateAlpha = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the animation will be reversible.
 */
export type Reversible = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the animation will scale from the starting alpha.
 */
export type ScaleFromStartingAlpha = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The ending point of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CF".
 */
export type To = number | BI;
/**
 * The UV of the animation.
 */
export type UV = ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The size of the UV.
 */
export type UVSize =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The event that will reset the animation.
 */
export type ResetEvent = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the animation can be reset.
 */
export type Resettable = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A binding name that controls whether the animation is active.
 */
export type Activated = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The event that will start the animation.
 */
export type StartEvent = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The orientation of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DC".
 */
export type Orientation = ("horizontal" | "vertical") | Variable;
/**
 * A variable is a reference to a value that can be used in the UI.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "D".
 */
export type Variable = D & D1;
export type D = string;
export type D1 = string;
/**
 * A variable value assignment used in the UI. Can be a boolean, number, string, array, or object.
 *
 * This interface was referenced by `Animation`'s JSON-Schema definition
 * via the `patternProperty` "^\$[a-zA-Z0-9_.-]+(\|.*)?$".
 *
 * This interface was referenced by `ControlFactory`'s JSON-Schema definition
 * via the `patternProperty` "^\$[a-zA-Z0-9_.-]+(\|.*)?$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^\$.*".
 *
 * This interface was referenced by `Element`'s JSON-Schema definition
 * via the `patternProperty` "^\$[a-zA-Z0-9_.-]+(\|.*)?$".
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "A".
 */
export type VariableDefinition =
  | boolean
  | number
  | string
  | unknown[]
  | {
      [k: string]: unknown;
    };
/**
 * The controls that are contained within this element.
 */
export type Controls =
  | {
      [k: string]: SubElement;
    }[]
  | C;
export type SubElement = Element | Animation | ControlFactory;
/**
 * The type of the element
 */
export type Type = "factory";
/**
 * The IDs of the controls that will be created by the factory.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IF".
 */
export type ControlIDs =
  | string
  | {
      [k: string]: ControlID;
    };
export type ControlID = string;
/**
 * The name of the control.
 */
export type ControlName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The size of the element.
 */
export type Size =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
export type Modification = ControlModification | ArrayModification;
export type ControlModification =
  | {
      control_name?: unknown;
      operation?: "remove" | "move_back" | "move_front";
      [k: string]: unknown;
    }
  | {
      control_name: unknown;
      operation: "replace" | "swap" | "move_after" | "move_before" | "insert_before" | "insert_after";
      value: Control[] | Control1 | C;
      [k: string]: unknown;
    };
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "grouped-ui".
 */
export type UIDefinition = Element | Animation | ControlFactory;
/**
 * Modifications to the element.
 */
export type Modifications = Modification[];
/**
 * If true, the element will allow clipping.
 */
export type AllowClipping = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will show the black and purple placeholder texture if the referenced image is not found.
 */
export type AllowDebugMissingTexture = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will allow scrolling even when the content fits.
 */
export type AllowScrollEvenWhenContentFits =
  boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The alpha of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DH".
 */
export type Alpha = C | number;
/**
 * If true, the element will always handle the pointer.
 */
export type AlwaysHandlePointer = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will always handle scrolling.
 */
export type AlwaysHandleScrolling = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will always listen to input.
 */
export type AlwaysListenToInput = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will always listen for input events even when not focused.
 */
export type AlwaysListening = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will always rotate.
 */
export type AlwaysRotate = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The anchor point of the element. This is the point that the element will be positioned relative to.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "ED".
 */
export type AnchorFrom = Anchor | Variable;
/**
 * An anchor is a reference to an element in the UI.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EE".
 */
export type Anchor =
  | "bottom"
  | "bottom_left"
  | "bottom_right"
  | "bottom_middle"
  | "center"
  | "center_middle"
  | "left"
  | "left_middle"
  | "right"
  | "right_middle"
  | "top"
  | "top_left"
  | "top_right"
  | "top_middle";
/**
 * The anchor point of the element. This is the point that the element will be positioned relative to.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EF".
 */
export type AnchorTo = Anchor | Variable;
/**
 * The animations that are contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EG".
 */
export type Animations = C | C[];
/**
 * The control that will be used for the background.
 */
export type BackgroundControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be used for the background when hovered.
 */
export type BackgroundHoverControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The type of the backup font.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EJ".
 */
export type BackupFontType = "UIFont" | C;
/**
 * If true, the element will use bilinear filtering.
 */
export type Bilinear = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The bindings that are contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DD".
 */
export type Bindings = C | Binding[] | Binding1;
/**
 * The name of the collection that the binding is in.
 */
export type BindingCollectionName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The prefix of the collection that the binding is in.
 */
export type BindingCollectionPrefix = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The condition that must be met for the binding to be applied.
 */
export type BindingCondition =
  ("once" | "always" | "always_when_visible" | "visible" | "visibility_changed" | "none") | Variable;
/**
 * The name of the binding. This is used to reference the binding in the element's properties.
 */
export type BindingName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the binding. This is used to reference the binding in the element's properties.
 */
export type BindingNameOverride = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The type of the binding. The default is global.
 */
export type BindingType = ("collection" | "global" | "collection_details" | "none" | "view") | Variable;
/**
 * If true, the binding will be ignored.
 */
export type Ignored = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the binding will resolve sibling scope.
 */
export type ResolveSiblingScope = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the control that the binding is in.
 */
export type SourceControlName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the property that the binding is in.
 */
export type SourcePropertyName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the property that the binding is in.
 */
export type TargetPropertyName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button mappings that are contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FB".
 */
export type ButtonMappings = C | ButtonMapping[];
/**
 * The button ID to map from.
 */
export type FromButtonID = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button ID to map to.
 */
export type ToButtonID = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The type of button mapping.
 */
export type MappingType = ("pressed" | "focused" | "global" | "double_pressed") | Variable;
/**
 * If true, this button mapping is ignored.
 */
export type Ignored1 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The scope for the button mapping (e.g., 'view').
 */
export type Scope = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The input mode condition for this mapping (e.g., 'gamepad', 'touch').
 */
export type InputModeCondition = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, this mapping handles the select event.
 */
export type HandleSelect = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, this mapping handles the deselect event.
 */
export type HandleDeselect = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the input event is consumed and not propagated further.
 */
export type ConsumeEvent = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the screen will be cached.
 */
export type CacheScreen = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The degrees the camera is tilted for a paper doll renderer.
 */
export type CameraTiltDegrees = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be checked.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FE".
 */
export type CheckedControl = "checked" | C;
/**
 * The control that will be checked when hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FF".
 */
export type CheckedHoverControl = "checked" | C;
/**
 * The control that will be checked when locked.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FG".
 */
export type CheckedLockedControl = "checked" | C;
/**
 * The control that will be checked when locked and hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FH".
 */
export type CheckedLockedHoverControl = "checked" | C;
/**
 * The direction that the element will be clipped in.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FI".
 */
export type ClipDirection = ("left" | "right" | "top" | "bottom") | C;
/**
 * If true, the element will be clipped pixel perfect.
 */
export type ClipPixelPerfect = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A value between 0.0 and 1.0 that controls how much of the element is clipped, used together with clip_direction.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GA".
 */
export type ClipRatio = number | C;
/**
 * If true, the element will clip its children.
 */
export type ClipsChildren = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will close when the player is hurt.
 */
export type CloseOnPlayerHurt = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The index of the collection that the element is in.
 */
export type CollectionIndex = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the collection that the element is in.
 */
export type CollectionName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The color of the text. This can be a hex color code or a color keyword.
 */
export type Color =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * A color animation.
 */
export type AnimationReference = string;
/**
 * A variable is a reference to a value that can be used in the UI.
 */
export type Variable1 = string;
export type Red = number;
export type Green = number;
export type Blue = number;
/**
 * The color of the text. This can be a hex color code or a color keyword.
 */
export type Color1 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * The color of the text. This can be a hex color code or a color keyword.
 */
export type Color2 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * A boolean value.
 */
export type ConstrainToRect = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will consume hover events.
 */
export type ConsumeHoverEvents = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be contained.
 */
export type Contained = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A debug color overlay for the element. Used for layout debugging purposes.
 */
export type Debug = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The default control that will be focused.
 */
export type DefaultControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The default focus precedence of the element.
 */
export type DefaultFocusPrecedence = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be draggable.
 */
export type Draggable = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The area that the dropdown will be in.
 */
export type DropdownArea =
  | ((ElementReference | ElementReference1 | VariableReference) & string)
  | []
  | [X]
  | [X, Y]
  | [X, Y, Width1]
  | [X, Y, Width1, Height1];
/**
 * A variable
 */
export type X = ("default" | "fill") | string | number;
/**
 * A variable
 */
export type Y = ("default" | "fill") | string | number;
/**
 * A variable
 */
export type Width1 = ("default" | "fill") | string | number;
/**
 * A variable
 */
export type Height1 = ("default" | "fill") | string | number;
/**
 * The control that will be used for the dropdown content.
 */
export type DropdownContentControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the dropdown.
 */
export type DropdownName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will enable directional toggling.
 */
export type EnableDirectionalToggling = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will enable the profanity filter.
 */
export type EnableProfanityFilter = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be enabled when a new line is created.
 */
export type EnabledNewline = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be enabled.
 */
export type Enabled = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The factory that will be used to create the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IE".
 */
export type Factory =
  | {
      control_ids?: ControlIDs;
      control_name?: ControlName1;
      factory_variables?: FactoryVariables;
      name?: Name;
      max_children_size?: MaxChildrenSize;
      [k: string]: VariableDefinition;
    }
  | C;
/**
 * The name of the control that will be created by the factory.
 */
export type ControlName1 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The variables that will be used by the factory.
 */
export type FactoryVariables = FactoryVariable[] | string;
export type FactoryVariable = string;
/**
 * The name of the factory.
 */
export type Name = string;
/**
 * A integer value.
 */
export type MaxChildrenSize = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will fill the screen.
 */
export type Fill = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IH".
 */
export type FocusChangeDown = "FOCUS_OVERRIDE_STOP" | C;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "II".
 */
export type FocusChangeLeft = "FOCUS_OVERRIDE_STOP" | C;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IJ".
 */
export type FocusChangeRight = "FOCUS_OVERRIDE_STOP" | C;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JA".
 */
export type FocusChangeUp = "FOCUS_OVERRIDE_STOP" | C;
/**
 * If true, the element will be a focus container.
 */
export type FocusContainer = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be focus enabled.
 */
export type FocusEnabled = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The identifier of the element that will be focused.
 */
export type FocusIdentifier = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be focus magnet enabled.
 */
export type FocusMagnetEnabled = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "F".
 */
export type String = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 */
export type String1 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be focus magnet enabled.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JF".
 */
export type FocusMapping = {
  focus_identifier?: String;
  focus_change_right?: String1;
  [k: string]: unknown;
}[];
/**
 * The focus navigation mode that will be used when navigating down.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JG".
 */
export type FocusNavigationModeDown = NavigationMode | C;
/**
 * The navigation mode of the UI.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JH".
 */
export type NavigationMode = "contained" | "stop" | "";
/**
 * The focus navigation mode that will be used when navigating left.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JI".
 */
export type FocusNavigationModeLeft = NavigationMode | C;
/**
 * The focus navigation mode that will be used when navigating right.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JJ".
 */
export type FocusNavigationModeRight = NavigationMode | C;
/**
 * The focus navigation mode that will be used when navigating up.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAA".
 */
export type FocusNavigationModeUp = NavigationMode | C;
/**
 * If true, the element will be focus wrap enabled.
 */
export type FocusWrapEnabled = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The scale factor of the font.
 */
export type FontScaleFactor = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The size of the font.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAD".
 */
export type FontSize = ("small" | "normal" | "large" | "extra_large") | C;
/**
 * The type of the font.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAE".
 */
export type FontType = ("smooth" | "MinecraftTen" | "MinecraftTenEmoticon" | "rune" | "default") | Variable;
/**
 * If true, the element will be rendered below the screen.
 */
export type ForceRenderBelow = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the texture will be reloaded.
 */
export type ForceTextureReload = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The binding that will be used for the grid dimension.
 */
export type GridDimensionBinding = string;
/**
 * The dimensions of the grid.
 */
export type GridDimensions =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The template that will be used for the grid item.
 */
export type GridItemTemplate = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The position of the grid.
 */
export type GridPosition =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The type of the grid rescaling.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBB".
 */
export type GridRescalingType = "horizontal" | C;
/**
 * If true, the element will handle deselect.
 */
export type HandleDeselect1 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will handle select.
 */
export type HandleSelect1 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will hide the hyphen.
 */
export type HideHyphen = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBF".
 */
export type HoverControl = "hover" | C;
/**
 * If true, the element will be hover enabled.
 */
export type HoverEnabled = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be ignored. Can be a boolean or a string expression.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBH".
 */
export type Ignored2 = Boolean | string;
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "I".
 */
export type Boolean = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The images that are contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBI".
 */
export type Images = C | (C | Texture)[];
export type TexturePath = string;
/**
 * The control that will be indented.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCA".
 */
export type IndentControl = "indent" | C;
/**
 * If true, the element will inherit the maximum height of its siblings.
 */
export type InheritMaxSiblingHeight = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will inherit the maximum width of its siblings.
 */
export type InheritMaxSiblingWidth = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be modal.
 */
export type IsModal = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will use the newer 9-slice rendering system.
 */
export type IsNewNineSlice = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be showing the menu.
 */
export type IsShowingMenu = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will jump to the bottom when updated.
 */
export type JumpToBottomOnUpdate = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will keep its ratio.
 */
export type KeepRatio = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The layer that the element will be rendered in. Higher layers are rendered on top of lower layers.
 */
export type Layer = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A Number value.
 */
export type LinePadding = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be localized.
 */
export type Localize = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be locked.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDB".
 */
export type LockedControl = ("locked" | "") | C;
/**
 * If true, the element will be rendered at a lower frequency.
 */
export type LowFrequencyRendering = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The maximum length of the text. If the text is longer than this, it will be truncated.
 */
export type MaxLength = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The maximum size of the element.
 */
export type MaxSize =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The maximum number of grid items.
 */
export type MaximumGridItems = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The minimum size of the element.
 */
export type MinSize =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * If true, the element will be modal.
 */
export type Modal = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The offset of the element from the anchor point. horizontal by vertical.
 */
export type Offset =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The control that will be used for the place holder.
 */
export type PlaceHolderControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be pressed.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEB".
 */
export type PressedControl = ("hover" | "pressed" | "") | C;
/**
 * If true, touch input will be prevented from passing through this element.
 */
export type PreventTouchInput = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 */
export type Priority = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be used for the progress.
 */
export type ProgressControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be used for the progress when hovered.
 */
export type ProgressHoverControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The property bag that will be used by the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEG".
 */
export type PropertyBag =
  | {
      [k: string]: PropertyBagProperty;
    }
  | String;
/**
 * An any value.
 */
export type PropertyBagProperty =
  | unknown[]
  | boolean
  | number
  | {
      [k: string]: unknown;
    }
  | string;
/**
 * The radio toggle group that the element is in.
 */
export type RadioToggleGroup = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the game will be rendered behind the element.
 */
export type RenderGameBehind = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will only be rendered when it is the topmost element.
 */
export type RenderOnlyWhenTopmost = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The renderer that will be used by the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFB".
 */
export type Renderer =
  | (
      | "ui_holo_cursor"
      | "gradient_renderer"
      | "inventory_item_renderer"
      | "equipment_preview_renderer"
      | "trial_time_renderer"
      | "3d_structure_renderer"
      | "splash_text_renderer"
      | "paper_doll_renderer"
      | "profile_image_renderer"
      | "qr_code_renderer"
      | "name_tag_renderer"
      | "progress_bar_renderer"
      | "actor_portrait_renderer"
      | "banner_pattern_renderer"
      | "live_horse_renderer"
      | "holographic_postrenderer"
      | "panorama_renderer"
      | "bundle_tooltip_renderer"
      | "credits_renderer"
      | "vignette_renderer"
      | "debug_screen_renderer"
      | "enchanting_book_renderer"
      | "web_view_renderer"
      | "armor_renderer"
      | "bubbles_renderer"
      | "camera_renderer"
      | "cursor_renderer"
      | "dash_renderer"
      | "editor_compass_renderer"
      | "editor_gizmo_renderer"
      | "editor_volume_highlight_renderer"
      | "heart_renderer"
      | "horse_heart_renderer"
      | "horse_jump_renderer"
      | "hotbar_cooldown_renderer"
      | "hotbar_renderer"
      | "hud_player_renderer"
      | "hunger_renderer"
      | "live_player_renderer"
      | "locator_bar"
      | "mob_effects_renderer"
      | "progress_indicator_renderer"
      | "hover_text_renderer"
      | "flying_item_renderer"
      | "animated_gif_renderer"
    )
  | Variable;
/**
 * If true, the control will be replaced while inactive.
 */
export type ReplacedWhileInactive = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be reset when focus is lost.
 */
export type ResetOnFocusLost = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The speed that the element will rotate at.
 */
export type RotateSpeed = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the screen will be drawn last.
 */
export type ScreenDrawsLast = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the screen will not be flushed when the element is added.
 */
export type ScreenNotFlushable = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The panel that will be used for the scroll box and track.
 */
export type ScrollBoxAndTrackPanel = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The content that will be scrolled.
 */
export type ScrollContent = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The speed that the element will scroll at.
 */
export type ScrollSpeed = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The view port that the element will be scrolled in.
 */
export type ScrollViewPort = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The box of the scrollbar.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGB".
 */
export type ScrollbarBox = "box" | C;
/**
 * The button that will be used for the scrollbar touch.
 */
export type ScrollbarTouchButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the scrollbar track.
 */
export type ScrollbarTrackButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The track of the scrollbar.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGE".
 */
export type ScrollbarTrack = "track" | C;
/**
 * If true, the element will send telemetry.
 */
export type SendTelemetry = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the text will have a shadow.
 */
export type Shadow = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will steal the mouse.
 */
export type ShouldStealMouse = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be used for the slider box.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGJ".
 */
export type SliderBoxControl = "slider_box" | C;
/**
 * The name of the collection that the slider is in.
 */
export type SliderCollectionName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider deselected.
 */
export type SliderDeselectedButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The direction of the slider.
 */
export type SliderDirection = ElementReference | ElementReference1 | VariableReference;
/**
 * The name of the slider.
 */
export type SliderName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the slider will select on hover.
 */
export type SliderSelectOnHover = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider selected.
 */
export type SliderSelectedButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the slider small decrease.
 */
export type SliderSmallDecreaseButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the slider small decrease.
 */
export type SliderSmallIncreaseButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The steps of the slider.
 */
export type SliderSteps = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider track.
 */
export type SliderTrackButton = ElementReference | ElementReference1 | VariableReference;
/**
 * The name of the sound.
 */
export type SoundName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The pitch of the sound.
 */
export type SoundPitch = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The volume of the sound.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIC".
 */
export type SoundVolume = number | C;
/**
 * The alignment of the text.
 */
export type TextAlignment = ("left" | "center" | "right") | Variable;
/**
 * The name of the text box.
 */
export type TextBoxName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control that will be used for the text.
 */
export type TextControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the collection that the text edit box grid is in.
 */
export type TextEditBoxGridCollectionName =
  string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The labels of the text.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIH".
 */
export type TextLabels = TextLabel[] | C;
export type TextLabel = string;
/**
 * The text-to-speech override text for the element.
 */
export type TextTTS = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The type of the text.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIJ".
 */
export type TextType = "ExtendedASCII" | Variable;
/**
 * The text to display.
 */
export type Text = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * Specifies the pixel margins used for 9-slice rendering. Can be a single integer applied to all four sides, or an array [left, top, right, bottom].
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJB".
 */
export type NineSliceSize = number | [Left, Top, Right, Bottom] | C;
export type Left = number;
export type Top = number;
export type Right = number;
export type Bottom = number;
/**
 * The file system that the texture is in.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJC".
 */
export type TextureFileSystem = "RawPath" | Variable;
/**
 * The texture to display.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJD".
 */
export type Texture1 = TextureFilePath | C | string;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBJ".
 */
export type TextureFilePath = string;
/**
 * If true, the texture will be tiled.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJE".
 */
export type Tiled = boolean | ("x" | "y") | C;
/**
 * The scale factor used when tiling a texture. Specified as [x_scale, y_scale].
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJF".
 */
export type TiledScale = [XScale, YScale] | C;
export type XScale = number;
export type YScale = number;
/**
 * The default state of the toggle.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJG".
 */
export type ToggleDefaultState = ("checked" | "unchecked") | C;
/**
 * The name of the collection that the toggle grid is in.
 */
export type ToggleGridCollectionName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The default selected toggle of the toggle group.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJI".
 */
export type ToggleGroupDefaultSelected = String | Integer;
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BF".
 */
export type Integer = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The forced index of the toggle group.
 */
export type ToggleGroupForcedIndex = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the toggle.
 */
export type ToggleName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will toggle the element.
 */
export type ToggleOffButton = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will toggle the element.
 */
export type ToggleOnButton = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The touch mode of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAD".
 */
export type TouchMode = ("touch" | "mouse") | C;
/**
 * The header of the TTS control.
 */
export type TTSControlHeader = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The priority of the TTS control type order.
 */
export type TTSControlTypeOrderPriority =
  number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The number of TTS ignores.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAG".
 */
export type TTSIgnoreCount = Integer | Boolean;
/**
 * If true, the element will ignore subsections.
 */
export type TTSIgnoreSubsections = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The priority of the TTS index.
 */
export type TTSIndexPriority = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will inherit its siblings.
 */
export type TTSInheritSiblings = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the TTS.
 */
export type TTSName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the TTS will override the control value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBB".
 */
export type TTSOverrideControlValue = Boolean | String;
/**
 * The header of the TTS section.
 */
export type TTSSectionHeader = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the TTS will toggle off.
 */
export type TTSToggleOff = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the TTS will toggle on.
 */
export type TTSToggleOn = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the TTS value will change.
 */
export type TTSValueChanged = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The priority of the TTS value order.
 */
export type TTSValueOrderPriority = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The TTS section container.
 */
export type TTSSectionContainer = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The type of the element
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBI".
 */
export type Type1 =
  | "always_rotate"
  | "button"
  | "carousel_label"
  | "collection_panel"
  | "custom"
  | "dropdown"
  | "edit_box"
  | "grid"
  | "grid_page_indicator"
  | "image_cycler"
  | "image"
  | "input_panel"
  | "label_cycler"
  | "label"
  | "panel"
  | "screen"
  | "scroll_track"
  | "scroll_view"
  | "scrollbar_box"
  | "selection_wheel"
  | "slider_box"
  | "slider"
  | "stack_panel"
  | "toggle"
  | "tooltip_trigger";
/**
 * The control that will be unchecked.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBJ".
 */
export type UncheckedControl = "unchecked" | C;
/**
 * The control that will be unchecked when hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCA".
 */
export type UncheckedHoverControl = "unchecked" | C;
/**
 * The control that will be unchecked when locked.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCB".
 */
export type UncheckedLockedControl = "unchecked" | C;
/**
 * The control that will be unchecked when locked and hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCC".
 */
export type UncheckedLockedHoverControl = "unchecked" | C;
/**
 * If true, the element will use the anchored offset.
 */
export type UseAnchoredOffset = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, this element will stack its controlled element in respect to their anchor values.
 */
export type UseChildAnchors = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 */
export type UseCustomPocketToast = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will use the last focus.
 */
export type UseLastFocus = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The variables that are contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCH".
 */
export type Variables = C | Variables1[] | Variables2;
/**
 * The control that will be used for the virtual keyboard buffer.
 */
export type VirtualKeyboardBufferControl =
  string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will be visible.
 */
export type Visible = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The folder that the element will be zipped into.
 */
export type ZipFolder = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button used for gesture tracking on input panel elements.
 */
export type GestureTrackingButton = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will always handle controller direction input.
 */
export type AlwaysHandleControllerDirection =
  boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The secondary color of the element.
 */
export type SecondaryColor =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * If true, the element will always accept input.
 */
export type AlwaysAcceptsInput = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The color of the placeholder text when hovered.
 */
export type PlaceholderTextHoverColor =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * The maximum width of the hover text. A value greater than zero will result in line breaks being added to limit width.
 */
export type HoverTextMaxWidth = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The color used when storage is full.
 */
export type FullStorageColor =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * If true, the scrollbar will always be visible even when content fits.
 */
export type ScrollbarAlwaysVisible = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, text-to-speech will skip the message for this element.
 */
export type TTSSkipMessage = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element will follow the cursor position.
 */
export type FollowsCursor = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the element acts as a gamepad cursor.
 */
export type GamepadCursor = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the button that navigates to the next sub page.
 */
export type NextSubPageButtonName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the button that navigates to the previous sub page.
 */
export type PreviousSubPageButtonName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of the tooltip element to show.
 */
export type TooltipName = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control to use for the top content of the tooltip.
 */
export type TooltipTopContentControl = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The control to use for the bottom content of the tooltip.
 */
export type TooltipBottomContentControl =
  string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The area that triggers the tooltip.
 */
export type TooltipArea = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The text-to-speech value for the tooltip.
 */
export type TooltipTTSValue = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If true, the event will be consumed and not propagated.
 */
export type ConsumeEvent1 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The name of a UI element definition key. Can be a simple identifier or use @-style inheritance to extend another element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "element-key".
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CFA".
 */
export type ElementName = ElementKey & ElementKey1;
export type ElementKey =
  | SimpleElementName
  | InheritedElementName
  | VariableInheritedElementName
  | VariableElementName
  | VariableToVariableElementName;
/**
 * A simple element name without inheritance.
 */
export type SimpleElementName = string;
/**
 * An element name with @-style inheritance syntax from a static namespace.
 */
export type InheritedElementName = string;
/**
 * An element name that inherits from a variable reference.
 */
export type VariableInheritedElementName = string;
/**
 * A variable used as an element name, optionally with @-style inheritance.
 */
export type VariableElementName = string;
/**
 * A variable element name inheriting from another variable.
 */
export type VariableToVariableElementName = string;
export type ElementKey1 = string;
/**
 * A variable definition key using the $ prefix, optionally with a default value after |.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "variable-key".
 */
export type VariableName = string;
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "E".
 */
export type String2 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * If set, the given element will be destroyed at the end of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "G".
 */
export type DestroyAtEnd1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "H".
 */
export type Boolean1 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A Number value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BA".
 */
export type Number = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The duration of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "J".
 */
export type Duration1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BC".
 */
export type String3 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The FPS of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BD".
 */
export type FPS1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BE".
 */
export type Integer1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BG".
 */
export type Integer2 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BI_size_coord".
 */
export type BISizeCoord = string | number;
/**
 * The initial UV of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJ".
 */
export type InitialUV1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The name of the next element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CA".
 */
export type Next1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CB".
 */
export type String4 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CC".
 */
export type Boolean2 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CD".
 */
export type Boolean3 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CE".
 */
export type Boolean4 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The UV of the animation.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CG".
 */
export type UV1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The size of the UV.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CH".
 */
export type UVSize1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CI".
 */
export type String5 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CJ".
 */
export type Boolean5 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DA".
 */
export type String6 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DB".
 */
export type String7 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DE".
 */
export type Boolean6 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DF".
 */
export type Boolean7 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DG".
 */
export type Boolean8 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DI".
 */
export type Boolean9 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DJ".
 */
export type Boolean10 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EA".
 */
export type Boolean11 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EB".
 */
export type Boolean12 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EC".
 */
export type Boolean13 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EH".
 */
export type String8 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "EI".
 */
export type String9 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FA".
 */
export type Boolean14 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FC".
 */
export type Boolean15 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FD".
 */
export type Integer3 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FJ".
 */
export type Boolean16 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GB".
 */
export type Boolean17 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GC".
 */
export type Boolean18 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GD".
 */
export type Integer4 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GE".
 */
export type String10 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GG_color_item".
 */
export type GGColorItem = number;
/**
 * A reference to an animation element using the following syntax: [animation_name]@[namespace_reference].[animation_name_reference]
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GH".
 */
export type AnimationReference1 = string;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GG".
 */
export type GG = AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * The color of the text. This can be a hex color code or a color keyword.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GF".
 */
export type Color3 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GI".
 */
export type Boolean19 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "GJ".
 */
export type Boolean20 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HA".
 */
export type Boolean21 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HB".
 */
export type String11 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HC".
 */
export type String12 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HD".
 */
export type String13 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HE".
 */
export type Integer5 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HF".
 */
export type Boolean22 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HH_size_coord".
 */
export type HHSizeCoord = ("default" | "fill") | string | number;
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HH".
 */
export type HH =
  | ((ElementReference | ElementReference1 | VariableReference) & string)
  | []
  | [X]
  | [X, Y]
  | [X, Y, Width1]
  | [X, Y, Width1, Height1];
/**
 * The area that the dropdown will be in.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HG".
 */
export type DropdownArea1 =
  | ((ElementReference | ElementReference1 | VariableReference) & string)
  | []
  | [X]
  | [X, Y]
  | [X, Y, Width1]
  | [X, Y, Width1, Height1];
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HI".
 */
export type String14 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "HJ".
 */
export type String15 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IA".
 */
export type Boolean23 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IB".
 */
export type Boolean24 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IC".
 */
export type Boolean25 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "ID".
 */
export type Boolean26 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "IG".
 */
export type Boolean27 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JB".
 */
export type Boolean28 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JC".
 */
export type Boolean29 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JD".
 */
export type String16 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "JE".
 */
export type Boolean30 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAB".
 */
export type Boolean31 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The scale factor of the font.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAC".
 */
export type FontScaleFactor1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAF".
 */
export type Boolean32 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAG".
 */
export type Boolean33 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A variable is a reference to a value that can be used in the UI.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAH".
 */
export type Variable2 = BAH & BAH1;
export type BAH = string;
export type BAH1 = string;
/**
 * The dimensions of the grid.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAI".
 */
export type GridDimensions1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BAJ".
 */
export type String17 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The position of the grid.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBA".
 */
export type GridPosition1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBC".
 */
export type Boolean34 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBD".
 */
export type Boolean35 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBE".
 */
export type Boolean36 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BBG".
 */
export type Boolean37 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCB".
 */
export type Boolean38 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCC".
 */
export type Boolean39 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCD".
 */
export type Boolean40 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCE".
 */
export type Boolean41 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCF".
 */
export type Boolean42 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCG".
 */
export type Boolean43 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCH".
 */
export type Boolean44 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCI".
 */
export type Integer6 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A Number value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BCJ".
 */
export type LinePadding1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDA".
 */
export type Boolean45 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDC".
 */
export type Boolean46 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDD".
 */
export type Integer7 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The size of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDF".
 */
export type Size1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * The maximum size of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDE".
 */
export type MaxSize1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDG".
 */
export type Integer8 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The minimum size of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDH".
 */
export type MinSize1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDI".
 */
export type Boolean47 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The offset of the element from the anchor point. horizontal by vertical.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BDJ".
 */
export type Offset1 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEA".
 */
export type String18 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEC".
 */
export type Boolean48 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BED".
 */
export type Integer9 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEE".
 */
export type String19 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEF".
 */
export type String20 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * An any value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEH".
 */
export type Any =
  | unknown[]
  | boolean
  | number
  | {
      [k: string]: unknown;
    }
  | string;
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEI".
 */
export type String21 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BEJ".
 */
export type Boolean49 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFA".
 */
export type Boolean50 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFC".
 */
export type Boolean51 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFD".
 */
export type Boolean52 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The speed that the element will rotate at.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFE".
 */
export type RotateSpeed1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFF".
 */
export type Boolean53 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFG".
 */
export type Boolean54 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFH".
 */
export type String22 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFI".
 */
export type String23 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BFJ".
 */
export type Integer10 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGA".
 */
export type String24 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the scrollbar touch.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGC".
 */
export type ScrollbarTouchButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the scrollbar track.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGD".
 */
export type ScrollbarTrackButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGF".
 */
export type Boolean55 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGG".
 */
export type Boolean56 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGH".
 */
export type Boolean57 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The size of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BGI".
 */
export type Size2 =
  ((ElementReference | ElementReference1 | VariableReference) & string) | [] | [Width] | [Width, Height];
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHA".
 */
export type String25 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider deselected.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHB".
 */
export type SliderDeselectedButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * The direction of the slider.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHC".
 */
export type SliderDirection1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHD".
 */
export type String26 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHE".
 */
export type Boolean58 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider selected.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHF".
 */
export type SliderSelectedButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the slider small decrease.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHG".
 */
export type SliderSmallDecreaseButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * The button that will be used for the slider small decrease.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHH".
 */
export type SliderSmallIncreaseButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHI".
 */
export type Integer11 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The button that will be used for the slider track.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BHJ".
 */
export type SliderTrackButton1 = ElementReference | ElementReference1 | VariableReference;
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIA".
 */
export type String27 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The pitch of the sound.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIB".
 */
export type SoundPitch1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BID".
 */
export type String28 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIE".
 */
export type String29 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIF".
 */
export type String30 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BIG".
 */
export type String31 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BII".
 */
export type String32 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJA".
 */
export type String33 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJH".
 */
export type String34 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "BJJ".
 */
export type Integer12 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAA".
 */
export type String35 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAB".
 */
export type String36 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAC".
 */
export type String37 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAE".
 */
export type String38 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAF".
 */
export type Integer13 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAH".
 */
export type Boolean59 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAI".
 */
export type Integer14 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CAJ".
 */
export type Boolean60 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBA".
 */
export type String39 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBC".
 */
export type String40 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBD".
 */
export type Boolean61 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBE".
 */
export type Boolean62 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBF".
 */
export type Boolean63 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A integer value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBG".
 */
export type Integer15 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CBH".
 */
export type Boolean64 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCD".
 */
export type Boolean65 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCE".
 */
export type Boolean66 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCF".
 */
export type Boolean67 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCG".
 */
export type Boolean68 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCI".
 */
export type String41 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCJ".
 */
export type Boolean69 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDA".
 */
export type String42 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDB".
 */
export type String43 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDC".
 */
export type Boolean70 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The secondary color of the element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDD".
 */
export type SecondaryColor1 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDE".
 */
export type Boolean71 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The color of the placeholder text when hovered.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDF".
 */
export type PlaceholderTextHoverColor1 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * The maximum width of the hover text. A value greater than zero will result in line breaks being added to limit width.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDG".
 */
export type HoverTextMaxWidth1 = number | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * The color used when storage is full.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDH".
 */
export type FullStorageColor1 =
  AnimationReference | Variable1 | ("black" | "white") | [] | [Red] | [Red, Green] | [Red, Green, Blue];
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDI".
 */
export type Boolean72 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CDJ".
 */
export type Boolean73 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEA".
 */
export type Boolean74 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEB".
 */
export type Boolean75 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEC".
 */
export type String44 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CED".
 */
export type String45 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEE".
 */
export type String46 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEF".
 */
export type String47 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEG".
 */
export type String48 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEH".
 */
export type String49 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A string value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEI".
 */
export type String50 = string | ((ElementReference | ElementReference1 | VariableReference) & string);
/**
 * A boolean value.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CEJ".
 */
export type Boolean76 = boolean | ((ElementReference | ElementReference1 | VariableReference) & string);

export interface MinecraftJSONUI {
  namespace?: Namespace;
  [k: string]: UIDefinition;
}
/**
 * An animation is a set of keyframes that can be applied to an element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "animation".
 */
export interface Animation {
  anim_type?: AnimationType;
  animation_reset_name?: AnimationResetName;
  destroy_at_end?: DestroyAtEnd;
  disable_anim_fast_forward?: DisableAnimFastForward;
  duration?: Duration;
  easing?: Easing;
  end_event?: EndEvent;
  fps?: FPS;
  frame_count?: FrameCount;
  frame_step?: FrameStep;
  from?: From;
  initial_uv?: InitialUV;
  next?: Next;
  play_event?: PlayEvent;
  propagate_alpha?: PropagateAlpha;
  reversible?: Reversible;
  scale_from_starting_alpha?: ScaleFromStartingAlpha;
  to?: To;
  uv?: UV;
  uv_size?: UVSize;
  reset_event?: ResetEvent;
  resettable?: Resettable;
  activated?: Activated;
  start_event?: StartEvent;
  orientation?: Orientation;
  [k: string]: VariableDefinition;
}
/**
 * An element is a control that can be added to a screen. It can be a button, a label, an image, etc.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "control".
 */
export interface Element {
  controls?: Controls;
  modifications?: Modifications;
  allow_clipping?: AllowClipping;
  allow_debug_missing_texture?: AllowDebugMissingTexture;
  allow_scroll_even_when_content_fits?: AllowScrollEvenWhenContentFits;
  alpha?: Alpha;
  always_handle_pointer?: AlwaysHandlePointer;
  always_handle_scrolling?: AlwaysHandleScrolling;
  always_listen_to_input?: AlwaysListenToInput;
  always_listening?: AlwaysListening;
  always_rotate?: AlwaysRotate;
  anchor_from?: AnchorFrom;
  anchor_to?: AnchorTo;
  anims?: Animations;
  animation_reset_name?: AnimationResetName;
  background_control?: BackgroundControl;
  background_hover_control?: BackgroundHoverControl;
  backup_font_type?: BackupFontType;
  bilinear?: Bilinear;
  bindings?: Bindings;
  button_mappings?: ButtonMappings;
  cache_screen?: CacheScreen;
  camera_tilt_degrees?: CameraTiltDegrees;
  checked_control?: CheckedControl;
  checked_hover_control?: CheckedHoverControl;
  checked_locked_control?: CheckedLockedControl;
  checked_locked_hover_control?: CheckedLockedHoverControl;
  clip_direction?: ClipDirection;
  clip_pixelperfect?: ClipPixelPerfect;
  clip_ratio?: ClipRatio;
  clips_children?: ClipsChildren;
  close_on_player_hurt?: CloseOnPlayerHurt;
  collection_index?: CollectionIndex;
  collection_name?: CollectionName;
  color?: Color;
  color1?: Color1;
  color2?: Color2;
  constrain_to_rect?: ConstrainToRect;
  consume_hover_events?: ConsumeHoverEvents;
  contained?: Contained;
  control_name?: ControlName;
  debug?: Debug;
  default_control?: DefaultControl;
  default_focus_precedence?: DefaultFocusPrecedence;
  disable_anim_fast_forward?: DisableAnimFastForward;
  draggable?: Draggable;
  dropdown_area?: DropdownArea;
  dropdown_content_control?: DropdownContentControl;
  dropdown_name?: DropdownName;
  enable_directional_toggling?: EnableDirectionalToggling;
  enable_profanity_filter?: EnableProfanityFilter;
  enabled_newline?: EnabledNewline;
  enabled?: Enabled;
  factory?: Factory;
  fill?: Fill;
  focus_change_down?: FocusChangeDown;
  focus_change_left?: FocusChangeLeft;
  focus_change_right?: FocusChangeRight;
  focus_change_up?: FocusChangeUp;
  focus_container?: FocusContainer;
  focus_enabled?: FocusEnabled;
  focus_identifier?: FocusIdentifier;
  focus_magnet_enabled?: FocusMagnetEnabled;
  focus_mapping?: FocusMapping;
  focus_navigation_mode_down?: FocusNavigationModeDown;
  focus_navigation_mode_left?: FocusNavigationModeLeft;
  focus_navigation_mode_right?: FocusNavigationModeRight;
  focus_navigation_mode_up?: FocusNavigationModeUp;
  focus_wrap_enabled?: FocusWrapEnabled;
  font_scale_factor?: FontScaleFactor;
  font_size?: FontSize;
  font_type?: FontType;
  force_render_below?: ForceRenderBelow;
  force_texture_reload?: ForceTextureReload;
  grid_dimension_binding?: GridDimensionBinding;
  grid_dimensions?: GridDimensions;
  grid_item_template?: GridItemTemplate;
  grid_position?: GridPosition;
  grid_rescaling_type?: GridRescalingType;
  handle_deselect?: HandleDeselect1;
  handle_select?: HandleSelect1;
  hide_hyphen?: HideHyphen;
  hover_alpha?: Alpha;
  hover_color?: Color;
  hover_control?: HoverControl;
  hover_enabled?: HoverEnabled;
  ignored?: Ignored2;
  images?: Images;
  indent_control?: IndentControl;
  inherit_max_sibling_height?: InheritMaxSiblingHeight;
  inherit_max_sibling_width?: InheritMaxSiblingWidth;
  is_modal?: IsModal;
  is_new_nine_slice?: IsNewNineSlice;
  is_showing_menu?: IsShowingMenu;
  jump_to_bottom_on_update?: JumpToBottomOnUpdate;
  keep_ratio?: KeepRatio;
  layer?: Layer;
  line_padding?: LinePadding;
  localize?: Localize;
  locked_alpha?: Alpha;
  locked_color?: Color;
  locked_control?: LockedControl;
  low_frequency_rendering?: LowFrequencyRendering;
  max_length?: MaxLength;
  max_size?: MaxSize;
  maximum_grid_items?: MaximumGridItems;
  min_size?: MinSize;
  modal?: Modal;
  offset?: Offset;
  orientation?: Orientation;
  place_holder_control?: PlaceHolderControl;
  pressed_alpha?: Alpha;
  pressed_color?: Color;
  pressed_control?: PressedControl;
  prevent_touch_input?: PreventTouchInput;
  primary_color?: Color;
  priority?: Priority;
  progress_control?: ProgressControl;
  progress_hover_control?: ProgressHoverControl;
  propagate_alpha?: PropagateAlpha;
  property_bag?: PropertyBag;
  radio_toggle_group?: RadioToggleGroup;
  render_game_behind?: RenderGameBehind;
  render_only_when_topmost?: RenderOnlyWhenTopmost;
  renderer?: Renderer;
  replaced_while_inactive?: ReplacedWhileInactive;
  reset_event?: ResetEvent;
  reset_on_focus_lost?: ResetOnFocusLost;
  rotate_speed?: RotateSpeed;
  screen_draws_last?: ScreenDrawsLast;
  screen_not_flushable?: ScreenNotFlushable;
  scroll_box_and_track_panel?: ScrollBoxAndTrackPanel;
  scroll_content?: ScrollContent;
  scroll_speed?: ScrollSpeed;
  scroll_view_port?: ScrollViewPort;
  scrollbar_box?: ScrollbarBox;
  scrollbar_touch_button?: ScrollbarTouchButton;
  scrollbar_track_button?: ScrollbarTrackButton;
  scrollbar_track?: ScrollbarTrack;
  send_telemetry?: SendTelemetry;
  shadow?: Shadow;
  should_steal_mouse?: ShouldStealMouse;
  size?: Size;
  slider_box_control?: SliderBoxControl;
  slider_collection_name?: SliderCollectionName;
  slider_deselected_button?: SliderDeselectedButton;
  slider_direction?: SliderDirection;
  slider_name?: SliderName;
  slider_select_on_hover?: SliderSelectOnHover;
  slider_selected_button?: SliderSelectedButton;
  slider_small_decrease_button?: SliderSmallDecreaseButton;
  slider_small_increase_button?: SliderSmallIncreaseButton;
  slider_steps?: SliderSteps;
  slider_track_button?: SliderTrackButton;
  sound_name?: SoundName;
  sound_pitch?: SoundPitch;
  sound_volume?: SoundVolume;
  text_alignment?: TextAlignment;
  text_box_name?: TextBoxName;
  text_control?: TextControl;
  text_edit_box_grid_collection_name?: TextEditBoxGridCollectionName;
  text_labels?: TextLabels;
  text_tts?: TextTTS;
  text_type?: TextType;
  text?: Text;
  nineslice_size?: NineSliceSize;
  texture_file_system?: TextureFileSystem;
  texture?: Texture1;
  tiled?: Tiled;
  tiled_scale?: TiledScale;
  toggle_default_state?: ToggleDefaultState;
  toggle_grid_collection_name?: ToggleGridCollectionName;
  toggle_group_default_selected?: ToggleGroupDefaultSelected;
  toggle_group_forced_index?: ToggleGroupForcedIndex;
  toggle_name?: ToggleName;
  toggle_off_button?: ToggleOffButton;
  toggle_on_button?: ToggleOnButton;
  touch_mode?: TouchMode;
  tts_control_header?: TTSControlHeader;
  tts_control_type_order_priority?: TTSControlTypeOrderPriority;
  tts_ignore_count?: TTSIgnoreCount;
  tts_ignore_subsections?: TTSIgnoreSubsections;
  tts_index_priority?: TTSIndexPriority;
  tts_inherit_siblings?: TTSInheritSiblings;
  tts_name?: TTSName;
  tts_override_control_value?: TTSOverrideControlValue;
  tts_section_header?: TTSSectionHeader;
  tts_toggle_off?: TTSToggleOff;
  tts_toggle_on?: TTSToggleOn;
  tts_value_changed?: TTSValueChanged;
  tts_value_order_priority?: TTSValueOrderPriority;
  ttsSectionContainer?: TTSSectionContainer;
  type?: Type1;
  unchecked_control?: UncheckedControl;
  unchecked_hover_control?: UncheckedHoverControl;
  unchecked_locked_control?: UncheckedLockedControl;
  unchecked_locked_hover_control?: UncheckedLockedHoverControl;
  use_anchored_offset?: UseAnchoredOffset;
  use_child_anchors?: UseChildAnchors;
  use_custom_pocket_toast?: UseCustomPocketToast;
  use_last_focus?: UseLastFocus;
  uv_size?: UVSize;
  uv?: UV;
  variables?: Variables;
  virtual_keyboard_buffer_control?: VirtualKeyboardBufferControl;
  visible?: Visible;
  zip_folder?: ZipFolder;
  gesture_tracking_button?: GestureTrackingButton;
  always_handle_controller_direction?: AlwaysHandleControllerDirection;
  secondary_color?: SecondaryColor;
  always_accepts_input?: AlwaysAcceptsInput;
  place_holder_text_hover_color?: PlaceholderTextHoverColor;
  hover_text_max_width?: HoverTextMaxWidth;
  full_storage_color?: FullStorageColor;
  scrollbar_always_visible?: ScrollbarAlwaysVisible;
  tts_skip_message?: TTSSkipMessage;
  follows_cursor?: FollowsCursor;
  gamepad_cursor?: GamepadCursor;
  next_sub_page_button_name?: NextSubPageButtonName;
  prev_sub_page_button_name?: PreviousSubPageButtonName;
  tooltip_name?: TooltipName;
  tooltip_top_content_control?: TooltipTopContentControl;
  tooltip_bottom_content_control?: TooltipBottomContentControl;
  tooltip_area?: TooltipArea;
  tooltip_tts_value?: TooltipTTSValue;
  consume_event?: ConsumeEvent1;
  [k: string]: VariableDefinition;
}
/**
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "control_factory".
 */
export interface ControlFactory {
  type?: Type;
  control_ids?: ControlIDs;
  control_name?: ControlName;
  size?: Size;
  [k: string]: VariableDefinition;
}
export interface Control {
  [k: string]: UIDefinition;
}
/**
 * A control.
 */
export interface Control1 {
  [k: string]: UIDefinition;
}
export interface ArrayModification {
  operation: "insert_front" | "insert_back";
  [k: string]: unknown;
}
/**
 * A binding that is contained within this element.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "DD_binding".
 */
export interface Binding {
  binding_collection_name?: BindingCollectionName;
  binding_collection_prefix?: BindingCollectionPrefix;
  binding_condition?: BindingCondition;
  binding_name?: BindingName;
  binding_name_override?: BindingNameOverride;
  binding_type?: BindingType;
  ignored?: Ignored;
  resolve_sibling_scope?: ResolveSiblingScope;
  source_control_name?: SourceControlName;
  source_property_name?: SourcePropertyName;
  target_property_name?: TargetPropertyName;
}
/**
 * A binding that is contained within this element.
 */
export interface Binding1 {
  binding_collection_name?: BindingCollectionName;
  binding_collection_prefix?: BindingCollectionPrefix;
  binding_condition?: BindingCondition;
  binding_name?: BindingName;
  binding_name_override?: BindingNameOverride;
  binding_type?: BindingType;
  ignored?: Ignored;
  resolve_sibling_scope?: ResolveSiblingScope;
  source_control_name?: SourceControlName;
  source_property_name?: SourcePropertyName;
  target_property_name?: TargetPropertyName;
}
/**
 * A button mapping entry that maps an input button action to a UI button event.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "FB_button_mapping".
 */
export interface ButtonMapping {
  from_button_id?: FromButtonID;
  to_button_id?: ToButtonID;
  mapping_type?: MappingType;
  ignored?: Ignored1;
  scope?: Scope;
  input_mode_condition?: InputModeCondition;
  handle_select?: HandleSelect;
  handle_deselect?: HandleDeselect;
  consume_event?: ConsumeEvent;
  [k: string]: unknown;
}
export interface Texture {
  texture_path?: TexturePath;
  [k: string]: unknown;
}
export interface Variables1 {
  [k: string]: VariableDefinition1;
}
/**
 * A variable is a reference to a value that can be used in the UI.
 *
 * This interface was referenced by `MinecraftJSONUI`'s JSON-Schema
 * via the `definition` "CCH_variables".
 */
export interface VariableDefinition1 {
  [k: string]: unknown;
}
export interface Variables2 {
  [k: string]: VariableDefinition1;
}
