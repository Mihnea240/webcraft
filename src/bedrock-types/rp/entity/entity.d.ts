/* Auto-generated from Blockception Bedrock Schemas: resource */

/**
 * A minecraft entity identifier.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "B".
 */
export type EntityIdentifier = string;
/**
 * Entity or attachable material
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "C".
 */
export type Material = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "D".
 */
export type Molang = string;
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "E".
 */
export type MolangNumber = string | number;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 */
export type Type180FormatVersion = "1.8.0";
/**
 * These names are used by the animation controller JSON. Players can reference animations from the vanilla Minecraft Resource Pack or create their own. Custom animations should be in the animation folder at the root of the Resource Pack.
 */
export type AnimationReference = string;
/**
 * A reference to an animation controller.
 *
 * @minItems 1
 */
export type AnimationControllers = [AnimationControllers1, ...AnimationControllers1[]];
/**
 * A reference to an animation.
 */
export type AnimationReference1 = string;
/**
 * UNDOCUMENTED: enable attachables.
 */
export type EnableAttachables = boolean;
/**
 * The reference to the geometry.
 */
export type GeometryReference = string;
/**
 * Hides or shows the possible armor.
 */
export type HideArmor = boolean;
/**
 * This determines if the item held by an entity should render fully lit up (if true), or depending on surrounding lighting.
 */
export type HeldItemIgnoresLighting = boolean;
/**
 * The entity indentifier.
 */
export type Identifier = string;
/**
 * Material reference.
 */
export type Material1 = string;
/**
 * The minimum engine version to be used.
 */
export type MinimumEngineVersion = string;
/**
 * Particle reference.
 */
export type Particle = string;
/**
 * Particle emitter reference.
 */
export type ParticleEmitter = string;
/**
 * Players can reference Render Controllers from the vanilla Minecraft Resource Pack or create their own. Custom Render Controllers should be in the textures folder at the root of the Resource Pack.
 *
 * @minItems 1
 */
export type RenderControllers = [
  (
    | RenderController
    | {
        [k: string]: RenderController1;
      }
  ),
  ...(
    | RenderController
    | {
        [k: string]: RenderController1;
      }
  )[]
];
/**
 * A single render controller definition.
 */
export type RenderController = string;
/**
 * A render controller activate on conditional.
 */
export type RenderController1 = string;
/**
 * Clientside molang variables that are to be evaluated during the animation.
 */
export type PreAnimation1 = string;
/**
 * Client side scripts that are evaluated immediately before animations are processed.
 */
export type PreAnimation = PreAnimation1[];
/**
 * UNDOCUMENTED: parent setup.
 */
export type ParentSetup = (string | number) & string;
/**
 * Scale sets the scale of the mob's geometry.
 */
export type Scale = (string | number) & string;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleX = string | number;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleY = string | number;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleZ = string | number;
/**
 * A sound effect definition.
 */
export type SoundEffect = string;
/**
 * The basic color of the egg.
 */
export type BaseColor = string;
/**
 * The colors of the dots on the egg.
 */
export type OverlayColor = string;
/**
 * The texture reference in item_texture.json
 */
export type Texture = string;
/**
 * The index of the texture.
 */
export type TextureIndex = number;
/**
 * A reference to a texture in the resourcepack.
 */
export type Texture1 = string;
/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "G".
 */
export type FormatVersion = G & G1;
export type G =
  | {
      [k: string]: unknown;
    }
  | "beta";
export type G1 = string;
/**
 * The minecraft molang definition that results in a boolean.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "H".
 */
export type MolangBoolean = string | boolean;
/**
 * These names are used by the animation controller JSON. Players can reference animations from the vanilla Minecraft Resource Pack or create their own. Custom animations should be in the animation folder at the root of the Resource Pack.
 */
export type AnimationReference2 = string;
/**
 * Whether or not attachables are enaboled.
 */
export type EnableAttachables1 = boolean;
/**
 * The reference to the geometry.
 */
export type GeometryReference1 = string;
/**
 * UNDOCUMENTED.
 */
export type QueryableGeometry = string;
/**
 * Hides or shows the possible armor.
 */
export type HideArmor1 = boolean;
/**
 * This determines if the item held by an entity should render fully lit up (if true), or depending on surrounding lighting.
 */
export type HeldItemIgnoresLighting1 = boolean;
/**
 * Allows items held by mobs to be scaled by a factor greater than zero
 */
export type HeldItemScale = number;
/**
 * The entity indentifier.
 */
export type Identifier1 = string;
/**
 * Material reference.
 */
export type Material2 = string;
/**
 * The minimum engine version to be used.
 */
export type MinimumEngineVersion1 = string;
/**
 * Particle reference.
 */
export type Particle1 = string;
/**
 * Particle emitter reference.
 */
export type ParticleEmitter1 = string;
/**
 * A collection of Render controller definitions.
 *
 * @minItems 1
 */
export type RenderControllers1 = [
  (
    | RenderController2
    | {
        [k: string]: RenderController3;
      }
  ),
  ...(
    | RenderController2
    | {
        [k: string]: RenderController3;
      }
  )[]
];
/**
 * A single render controller definition.
 */
export type RenderController2 = string;
/**
 * A render controller activate on conditional.
 */
export type RenderController3 = string;
/**
 * The array of items to animate.
 *
 * @minItems 1
 */
export type Animate = [
  AnimationController | AnimationControllerCondition,
  ...(AnimationController | AnimationControllerCondition)[]
];
/**
 * A single animation or animation controller to run.
 */
export type AnimationController = string;
/**
 * A molang condition.
 */
export type Molang1 = string;
/**
 * Blend weight.
 */
export type BlendWeight = number;
/**
 * Clientside molang variables that are to be evaluated during the creation of the entity.
 *
 * @minItems 1
 */
export type Initialize = [Initialize1, ...Initialize1[]];
/**
 * Clientside molang variables that are to be evaluated during the creation of the entity.
 */
export type Initialize1 = string;
/**
 * Clientside molang variables that are to be evaluated during the animation.
 */
export type PreAnimation3 = string;
/**
 * Clientside molang variables that are to be evaluated during the animation.
 */
export type PreAnimation2 = PreAnimation3[];
/**
 * Hides held items when it evaluates to a non-zero value
 */
export type HideHeldItems = string | boolean;
/**
 * UNDOCUMENTED: parent setup.
 */
export type ParentSetup1 = (string | number) & string;
/**
 * Scale sets the scale of the mob's geometry.
 */
export type Scale1 = (string | number) & string;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleX1 = string | number;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleY1 = string | number;
/**
 * The minecraft molang definition that results in a float.
 */
export type ScaleZ1 = string | number;
/**
 * Bones and effects will still be updated if the entity is off screen if this expression returns anything other than 0.0.
 */
export type ShouldUpdateBonesAndEffectsOffscreen = boolean | Molang2;
/**
 * Molang definition.
 */
export type Molang2 = string;
/**
 * Effects will still be updated if the entity is off screen if this expression or `should_update_bones_and_effects_offscreen` returns anything other than 0.0.
 */
export type ShouldUpdateEffectsOffscreen = boolean | Molang3;
/**
 * Molang definition.
 */
export type Molang3 = string;
/**
 *  If a variable is public, it can be read by other mobs. See the molang `->` operator for details.
 */
export type Variable = "public";
/**
 * A sound effect definition.
 */
export type SoundEffect1 = string;
/**
 * The basic color of the egg.
 */
export type BaseColor1 = string;
/**
 * The colors of the dots on the egg.
 */
export type OverlayColor1 = string;
/**
 * The texture reference in item_texture.json
 */
export type Texture2 = string;
/**
 * The index of the texture.
 */
export type TextureIndex1 = number;
/**
 * A reference to a texture in the resourcepack.
 */
export type Texture3 = string;

export interface BlockceptionMinecraftResourceEntity {
  [k: string]: unknown;
}
/**
 * A client side entity definition.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "A".
 */
export interface ActorEntity180 {
  format_version: Type180FormatVersion;
  "minecraft:client_entity": ClientEntity;
}
/**
 * The entity description for clientside rendering, animations and models.
 */
export interface ClientEntity {
  description: Description;
}
/**
 * The entity description for clientside rendering, animations and models.
 */
export interface Description {
  animations?: Animations;
  animation_controllers?: AnimationControllers;
  enable_attachables?: EnableAttachables;
  geometry?: Geometry;
  hide_armor?: HideArmor;
  held_item_ignores_lighting?: HeldItemIgnoresLighting;
  identifier: Identifier;
  materials?: Materials;
  min_engine_version?: MinimumEngineVersion;
  particle_effects?: ParticleEffects;
  particle_emitters?: ParticleEmitters;
  render_controllers?: RenderControllers;
  scripts?: Scripts;
  sound_effects?: SoundEffects;
  spawn_egg?: SpawnEgg;
  textures?: Textures;
}
/**
 * These names are used by the animation controller JSON. Players can reference animations from the vanilla Minecraft Resource Pack or create their own. Custom animations should be in the animation folder at the root of the Resource Pack.
 */
export interface Animations {
  [k: string]: AnimationReference;
}
/**
 * A collection of animation controllers.
 */
export interface AnimationControllers1 {
  [k: string]: AnimationReference1;
}
/**
 * The reference to defined geometries in `<resource pack>/models/'.
 */
export interface Geometry {
  [k: string]: GeometryReference;
}
/**
 * A collection of material definitions.
 */
export interface Materials {
  [k: string]: Material1;
}
/**
 * Keys are required and need to be unique from all other keys in the animation controllers. Players can reference particles from the vanilla Minecraft Resource Pack or create their own. Custom particles should be in the particle folder at the root of the Resource Pack.
 */
export interface ParticleEffects {
  [k: string]: Particle;
}
/**
 * A collection of particle emitters definitions.
 */
export interface ParticleEmitters {
  [k: string]: ParticleEmitter;
}
/**
 * The place where variables, and animations / controller to be run is specified.
 */
export interface Scripts {
  pre_animation?: PreAnimation;
  parent_setup?: ParentSetup;
  scale?: Scale;
  scalex?: ScaleX;
  scaley?: ScaleY;
  scalez?: ScaleZ;
}
/**
 * A collection of sound effect definition.
 */
export interface SoundEffects {
  [k: string]: SoundEffect;
}
/**
 * The definition of how the spawn_egg icon looks like.
 */
export interface SpawnEgg {
  base_color?: BaseColor;
  overlay_color?: OverlayColor;
  texture?: Texture;
  texture_index?: TextureIndex;
}
/**
 * A collection of references to textures in the resourcepack.
 */
export interface Textures {
  [k: string]: Texture1;
}
/**
 * A client side entity definition.
 *
 * This interface was referenced by `BlockceptionMinecraftResourceEntity`'s JSON-Schema
 * via the `definition` "F".
 */
export interface ActorEntity1100 {
  format_version: FormatVersion;
  "minecraft:client_entity": ClientEntity1;
}
/**
 * The entity description for clientside rendering, animations and models.
 */
export interface ClientEntity1 {
  description: Description1;
}
/**
 * The entity description for clientside rendering, animations and models.
 */
export interface Description1 {
  animations?: Animations1;
  enable_attachables?: EnableAttachables1;
  geometry?: Geometry1;
  queryable_geometry?: QueryableGeometry;
  hide_armor?: HideArmor1;
  held_item_ignores_lighting?: HeldItemIgnoresLighting1;
  held_item_scale?: HeldItemScale;
  identifier: Identifier1;
  materials?: Materials1;
  min_engine_version?: MinimumEngineVersion1;
  particle_effects?: ParticleEffects1;
  particle_emitters?: ParticleEmitters1;
  render_controllers?: RenderControllers1;
  scripts?: Scripts1;
  sound_effects?: SoundEffects1;
  spawn_egg?: SpawnEgg1;
  textures?: Textures1;
}
/**
 * These names are used by the animation controller JSON. Players can reference animations from the vanilla Minecraft Resource Pack or create their own. Custom animations should be in the animation folder at the root of the Resource Pack.
 */
export interface Animations1 {
  [k: string]: AnimationReference2;
}
/**
 * The reference to defined geometries in `<resource pack>/models/'.
 */
export interface Geometry1 {
  [k: string]: GeometryReference1;
}
/**
 * A collection of material definitions.
 */
export interface Materials1 {
  [k: string]: Material2;
}
/**
 * A collection of particle definitions.
 */
export interface ParticleEffects1 {
  [k: string]: Particle1;
}
/**
 * A collection of particle emitters definitions.
 */
export interface ParticleEmitters1 {
  [k: string]: ParticleEmitter1;
}
/**
 * The place where variables, and animations / controller to be run is specified.
 */
export interface Scripts1 {
  animate?: Animate;
  initialize?: Initialize;
  pre_animation?: PreAnimation2;
  hide_held_items?: HideHeldItems;
  parent_setup?: ParentSetup1;
  scale?: Scale1;
  scalex?: ScaleX1;
  scaley?: ScaleY1;
  scalez?: ScaleZ1;
  should_update_bones_and_effects_offscreen?: ShouldUpdateBonesAndEffectsOffscreen;
  should_update_effects_offscreen?: ShouldUpdateEffectsOffscreen;
  variables?: Variables;
}
/**
 * A single animation or animation controller to run on condition.
 */
export interface AnimationControllerCondition {
  [k: string]: Molang1 | BlendWeight;
}
/**
 *  A list of variables that need certain settings applied to them. Currently, for the client, only `public` is supported.
 */
export interface Variables {
  [k: string]: Variable;
}
/**
 * A collection of sound effect definition.
 */
export interface SoundEffects1 {
  [k: string]: SoundEffect1;
}
/**
 * The definition of how the spawn_egg icon looks like.
 */
export interface SpawnEgg1 {
  base_color?: BaseColor1;
  overlay_color?: OverlayColor1;
  texture?: Texture2;
  texture_index?: TextureIndex1;
}
/**
 * A collection of references to textures in the resourcepack.
 */
export interface Textures1 {
  [k: string]: Texture3;
}
