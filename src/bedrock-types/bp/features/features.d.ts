/* Auto-generated from Blockception Bedrock Schemas: behavior */

/**
 * A version that tells minecraft what type of data format can be expected when reading this file.
 *
 * This interface was referenced by `Features`'s JSON-Schema
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
 * The name of this feature in the form `namespace_name:feature_name`. `feature_name` must match the filename.
 */
export type Identifier = string;
/**
 * Collection of features to be placed one by one. No guarantee of order. All features use the same input position.
 *
 * @minItems 1
 */
export type Features1 = [Feature, ...Feature[]];
/**
 * Feature identifer
 */
export type Feature = string;
/**
 * Do not continue placing features once either the first success or first failure has occurred.
 */
export type EarlyOut = "none" | "first_failure" | "first_success";
/**
 * Reference to the block to fill the cave with.
 */
export type FillWith = BlockIdentifier | BlockReference;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier = string;
/**
 * A minecraft block identifier.
 */
export type BlockIdentifier1 = string;
/**
 * The key of property is the name of the block state/property, the value must be the same as the block properties accepted values.
 */
export type StateValue = boolean | number | string;
/**
 * A condition using Molang queries that results to true/false that can be used to query for blocks with certain tags.
 */
export type Molang = string;
/**
 * How many blocks to increase the cave radius by, from the center point of the cave.
 */
export type WidthModifier = string | number;
/**
 * The chance to skip doing the carve (1 / value).
 */
export type SkipCarveChance = number;
/**
 * The height limit where we attempt to carve
 */
export type HeightLimit = number;
/**
 * The scaling in y
 *
 * @minItems 2
 * @maxItems 2
 */
export type YScale = [Min, Max];
export type Min = number;
export type Max = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type HorizontalRadiusMultiplier = [Min1, Max1];
export type Min1 = number;
export type Max1 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type VerticalRadiusMultiplier = [Min2, Max2];
export type Min2 = number;
export type Max2 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type FloorLevel = [Min3, Max3];
export type Min3 = number;
export type Max3 = number;
/**
 * Reference to the block to fill the cave with.
 */
export type OreBlock = BlockIdentifier | BlockReference;
/**
 * UNDOCUMENTED
 */
export type MaxEmptyCorners = number;
/**
 * The block to fill the inside of the geode.
 */
export type Filler = BlockIdentifier | BlockReference;
/**
 * The block that forms the inside layer of the geode shell.
 */
export type InnerLayer = BlockIdentifier | BlockReference;
/**
 * The block that has a chance of generating instead of inner_layer.
 */
export type AlternateInnerLayer = BlockIdentifier | BlockReference;
/**
 * The block that forms the middle layer of the geode shell.
 */
export type MiddleLayer = BlockIdentifier | BlockReference;
/**
 * The block that forms the outer shell of the geode.
 */
export type OuterLayer = BlockIdentifier | BlockReference;
/**
 * A list of blocks that may be replaced during placement. Omit this field to allow any block to be replaced.
 *
 * @minItems 1
 */
export type InnerPlacements = [BlockReference1, ...BlockReference1[]];
/**
 * A block that may be replaced during placement.
 */
export type BlockReference1 = BlockIdentifier | BlockReference;
/**
 * The minimum distance each distribution point must be from the outer wall. [0,10]
 */
export type MinimumOuterWallDistance = number;
/**
 * The maximum distance each distribution point can be from the outer wall. [0,20]
 */
export type MaximumOuterWallDistance = number;
/**
 * The minimum number of points inside the distance field that can get generated. The distance field is the area consisting of all points with a minimum distance to all destribution points. [0,10]
 */
export type MinimumDistributionPoints = number;
/**
 * The maximum number of points inside the distance field that can get generated. The distance field is the area consisting of all points with a minimum distance to all destribution points. [0,20]
 */
export type MaximumDistributionPoints = number;
/**
 * The lowest possible value of random offset applied to the position of each distribution point. [0,10]
 */
export type MinimumPointOffset = number;
/**
 * The highest possible value of random offset applied to the position of each distribution point. [0,10]
 */
export type MaximumPointOffset = number;
/**
 * The maximum possible radius of the geode generated.
 */
export type MaximumRadius = number;
/**
 * An offset applied to each distribution point that forms the geode crack opening. [0,10]
 */
export type CrackPointOffset = number;
/**
 * The likelihood of a geode generating with a crack in its shell. [0,1]
 */
export type GenerateCrackChance = number;
/**
 * How large the crack opening of the geode should be when generated. [0,5]
 */
export type BaseCrackSize = number;
/**
 * A multiplier applied to the noise that is applied to the distribution points within the geode. Higher = more noisy.
 */
export type NoiseMultiplier = number;
/**
 * The likelihood that a special block will be placed on the inside of the geode. [0,1]
 */
export type UsePotentialPlacementsChance = number;
/**
 * The likelihood that a block in the innermost layer of the geode will be replaced with an alternate option. [0,1]
 */
export type UseAlternateLayer0Chance = number;
/**
 *  If true, the potential placement block will only be placed on the alternate layer0 blocks that get placed. Potential placement blocks are blocks that depend on the existance of another block to be placed. The latter are the layer0 alternate blocks.
 */
export type PlacementsRequireLayer0Alternate = boolean;
/**
 * The threshold of invalid blocks for a geode to have a distribution point in before it aborts generation entirely.
 */
export type InvalidBlocksThreshold = number;
/**
 * Age of the head of the plant.
 */
export type Age = number | Range;
/**
 * The maximum plant height.
 */
export type RangeMax = number;
/**
 * The minimum plant height.
 */
export type RangeMin = number;
/**
 * Collection of weighted heights that placement will select from.
 *
 * @minItems 1
 */
export type HeightDistribution = [Items, ...Items[]];
/**
 * Collection of weighted heights that placement will select from.
 *
 * @minItems 2
 * @maxItems 2
 */
export type Items = [PlantHeight, Weight];
/**
 * Plant height.
 */
export type PlantHeight = number | Range;
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight = number;
/**
 * Direction that the plant grows towards. Valid values: UP and DOWN
 */
export type GrowthDirection = "UP" | "DOWN" | "up" | "down";
/**
 * Collection of weighted block descriptor that placement will select from for the body of the plant.
 *
 * @minItems 1
 */
export type BodyBlocks = [Blocks, ...Blocks[]];
/**
 * Collection of weighted block descriptor that placement will select from for the plant.
 *
 * @minItems 2
 * @maxItems 2
 */
export type Blocks = [PlantBodyBlock, Age1];
/**
 * Plant body block.
 */
export type PlantBodyBlock = BlockIdentifier | BlockReference;
/**
 * A described range.
 */
export type Age1 =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * The first value of the range.
 */
export type A2 = number;
/**
 * The second value of the range.
 */
export type B = number;
/**
 * The minimum value of the range.
 */
export type RangeMin1 = number;
/**
 * The maximum value of the range.
 */
export type RangeMax1 = number;
/**
 * The minimum value of the range.
 */
export type Min4 = number;
/**
 * The maximum value of the range.
 */
export type Max4 = number;
/**
 * Collection of weighted block descriptor that placement will select from for the body of the plant.
 *
 * @minItems 1
 */
export type HeadBlocks = [Blocks, ...Blocks[]];
/**
 * Plant blocks can be placed in water.
 */
export type AllowWater = boolean;
/**
 * Named reference of feature to be placed.
 */
export type PlacesFeature = string;
/**
 * Specifies the minimum height difference required upwards.
 */
export type MinRequiredUpwardHeightDiff = number;
/**
 * Specifies the maximum height difference required downwards.
 */
export type MaxRequiredDownwardHeightDiff = number;
/**
 * Specifies the minimum height difference allowed upwards.
 */
export type MinAllowedUpwardHeightDiff = number;
/**
 * Specifies the maximum height difference allowed downwards.
 */
export type MaxAllowedDownwardHeightDiff = number;
/**
 * Specifies the the length in each cardinal direction the filter will check for blocks against the given differences.
 */
export type SearchRadius = number;
/**
 * Reference to the block to be placed.
 */
export type PlacesBlock = BlockIdentifier | BlockReference;
/**
 * How far, in blocks, this feature can search for a valid position to place.
 */
export type SearchRange = number;
/**
 * Can this feature be placed on the ground (top face of a block)?.
 */
export type CanPlaceOnFloor = boolean;
/**
 * Can this feature be placed on the ceiling (bottom face of a block)?.
 */
export type CanPlaceOnCeiling = boolean;
/**
 * Can this feature be placed on the wall (side faces of a block)?.
 */
export type CanPlaceOnWall = boolean;
/**
 * For each block placed by this feature, how likely will that block spread to another?.
 */
export type ChanceOfSpreading = number;
/**
 *  How far, in blocks, this feature can search for a valid position to place.
 *
 * @minItems 1
 */
export type CanPlaceOn = [Block, ...Block[]];
/**
 *  A list of blocks that the block in this feature can be placed on. Omit this field to allow any block to be placed on.
 */
export type Block = BlockIdentifier | BlockReference;
/**
 * Reference to the block to fill the cave with.
 */
export type Identifier1 = BlockIdentifier | BlockReference;
/**
 * How many blocks to increase the cave radius by, from the center point of the cave.
 */
export type Identifier2 = string | number;
/**
 * The chance to skip doing the carve (1 / value).
 */
export type SkipCarveChance1 = number;
/**
 * The height limit where we attempt to carve
 */
export type HeightLimit1 = number;
/**
 * The scaling in y
 *
 * @minItems 2
 * @maxItems 2
 */
export type YScale1 = [Min5, Max5];
export type Min5 = number;
export type Max5 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type HorizontalRadiusMultiplier1 = [Min6, Max6];
export type Min6 = number;
export type Max6 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type VerticalRadiusMultiplier1 = [Min7, Max7];
export type Min7 = number;
export type Max7 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type FloorLevel1 = [Min8, Max8];
export type Min8 = number;
export type Max8 = number;
/**
 * The number of blocks to be placed.
 */
export type Count = number;
/**
 * Collection of replace rules that will be checked in order of definition. If a rule is resolved, the rest will not be resolved for that block position.
 *
 * @minItems 1
 */
export type ReplaceRules = [RepalceRule, ...RepalceRule[]];
/**
 * Reference to the block to be placed.
 */
export type PlacesBlock1 = BlockIdentifier | BlockReference;
/**
 * A list of blocks that may be replaced during placement. Omit this field to allow any block to be replaced.
 *
 * @minItems 1
 */
export type MayReplace = [BlockReference2, ...BlockReference2[]];
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "F".
 */
export type BlockReference2 = BlockIdentifier | BlockReference;
/**
 * Chance of discarding placement if neighboring block is Air.
 */
export type DiscardChanceOnAirExposure = number;
/**
 * A minecraft block reference.
 */
export type BlockReference3 = BlockIdentifier | BlockReference;
/**
 * Defines the cubic radius of the blob.
 */
export type PlacementRadiusAroundFloor = number;
/**
 * The probability of trying to place a block at each position within the placement bounds.
 */
export type PlacementProbabilityPerValidPosition = number;
/**
 * Defines a block face that is allowed to be exposed to air and/or water. Other faces need to be embedded for blocks to be placed by this feature. Defaults to upwards face
 */
export type ExposedFace = "up" | "down" | "side" | "north" | "east" | "west" | "south";
/**
 * Named reference of feature to be placed.
 */
export type PlacesFeature1 = string;
/**
 * If true, snaps the y-value of the scattered position to the terrain heightmap. If false or unset, y-value is unmodified.
 */
export type ProjectInputToFloor = boolean;
/**
 * The order in which coordinates will be evaluated. Should be used when a coordinate depends on another. If omitted, defaults to `xzy`.
 */
export type CoordinateEvalOrder = "xyz" | "xzy" | "yxz" | "yzx" | "zxy" | "zyx";
/**
 * Number of scattered positions to generate.
 */
export type Iterations = string | number;
export type ScatterChance =
  | MolangNumber
  | {
      numerator?: Numerator;
      denominator?: Denominator;
    };
/**
 * Probability (0-100] that this scatter will occur.  Not evaluated each iteration; either no iterations will run, or all will.
 */
export type MolangNumber = string | number;
/**
 * UNDOCUMENTED.
 */
export type Numerator = number;
/**
 * UNDOCUMENTED.
 */
export type Denominator = number;
export type X =
  | MolangNumber1
  | {
      distribution: Distribution;
      step_size?: StepSize;
      grid_offset?: StepSize1;
      extent: Extent;
    };
/**
 * Expression for the coordinate (evaluated each iteration). Mutually exclusive with random distribution object below.
 */
export type MolangNumber1 = string | number;
/**
 * Type of distribution - uniform random, gaussian (centered in the range),  triangle (centered in the range), or grid (either fixed-step or jittered).
 */
export type Distribution = "uniform" | "gaussian" | "inverse_gaussian" | "triangle" | "fixed_grid" | "jittered_grid";
/**
 * When the distribution type is grid, defines the distance between steps along this axis.
 */
export type StepSize = number;
/**
 * When the distribution type is grid, defines the offset along this axis.
 */
export type StepSize1 = number;
/**
 * The lower and upper bound as an offset from the input position
 */
export type Extent = [] | [LowerBound] | [LowerBound, UpperBound];
/**
 * Lower bound (inclusive) of the scatter range, as an offset from the input point to scatter around.
 */
export type LowerBound = string | number;
/**
 * Upper bound (inclusive) of the scatter range, as an offset from the input point to scatter around.
 */
export type UpperBound = string | number;
export type Y =
  | MolangNumber1
  | {
      distribution: Distribution;
      step_size?: StepSize;
      grid_offset?: StepSize1;
      extent: Extent;
    };
export type Z =
  | MolangNumber1
  | {
      distribution: Distribution;
      step_size?: StepSize;
      grid_offset?: StepSize1;
      extent: Extent;
    };
/**
 * Named reference of feature to be placed.
 */
export type PlacesFeature2 = string;
/**
 * Maximum extent of the bounding volume expressed as [ x, y, z ].
 */
export type Max9 = [] | [MaximumX] | [MaximumX, MaximumY] | [MaximumX, MaximumY, MaximumZ];
export type MaximumX = number;
export type MaximumY = number;
export type MaximumZ = number;
/**
 * Maxium extent of the bounding volume expressed as [ x, y, z ].
 */
export type Min9 = [] | [MinimumX] | [MinimumX, MinimumY] | [MinimumX, MinimumY, MinimumZ];
export type MinimumX = number;
export type MinimumY = number;
export type MinimumZ = number;
/**
 * Axis that the search will sweep along through the `search_volume`.
 */
export type SearchAxis = "-x" | "+x" | "-y" | "+y" | "-z" | "+z";
/**
 * Number of valid positions the search must find in order to place the referenced feature.
 */
export type RequiredSuccesses = number;
/**
 * List of features to be placed in sequence. The output position of the previous feature is used as the input position to the next.
 *
 * @minItems 1
 */
export type Features2 = [Feature1, ...Feature1[]];
/**
 * A feature to be placed in sequence. The output position of the previous feature is used as the input position to the next.
 */
export type Feature1 = string;
/**
 * A minecraft block reference.
 */
export type BlockReference4 = BlockIdentifier | BlockReference;
/**
 *  Collection of weighted block references that will be placed.
 *
 * @minItems 1
 */
export type PlacesBlock2 = [WeightedBlockReference, ...WeightedBlockReference[]];
/**
 * A minecraft block reference.
 */
export type BlockReference5 = BlockIdentifier | BlockReference;
/**
 * Random weight of this block. A higher number will increase the probability of this block to be picked during placement.
 */
export type Weight1 = number;
/**
 * If true, enforce the block's canPlace check.
 */
export type EnforcePlacementRules = boolean;
/**
 * If true, enforce the block's canSurvive check.
 */
export type EnforceSurvivabilityRules = boolean;
/**
 * If true, randomizes the block's cardinal orientation.
 */
export type RandomizeRotation = boolean;
/**
 * Automatically rotate the block to attach sensibly.
 */
export type AutoRotate = boolean;
/**
 * UNDOCUMENTED.
 */
export type Top = BlockReference6 | BlockReference7[];
/**
 * A minecraft block reference.
 */
export type BlockReference6 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference7 = BlockIdentifier | BlockReference;
/**
 * UNDOCUMENTED.
 */
export type Bottom = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type North = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type South = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type East = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type West = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type All = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Sides = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Diagonal = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Top1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Bottom1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type North1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type South1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type East1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type West1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type All1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Sides1 = BlockReference6 | BlockReference7[];
/**
 * UNDOCUMENTED.
 */
export type Diagonal1 = BlockReference6 | BlockReference7[];
/**
 * A minecraft block reference.
 */
export type BlockReference8 = BlockIdentifier | BlockReference;
/**
 * A list of blocks that may be replaced during placement. Omit this field to allow any block to be replaced.
 */
export type MayReplace1 = BlockReference8[];
/**
 * Named reference of feature to be snapped.
 */
export type FeatureToSnap = string;
/**
 * Range to search for a floor or ceiling for snaping the feature.
 */
export type VerticalSearchRange = number;
/**
 * Defines the surface that the y-value of the placement position will be snapped to. Valid values: `ceiling` and `floor'
 */
export type Surface = "ceiling" | "floor" | "random_horizontal";
/**
 * Determines whether the feature can snap through air blocks
 */
export type AllowAirPlacement = boolean;
/**
 * Determines whether the feature can snap through water blocks
 */
export type AllowUnderwaterPlacement = boolean;
/**
 * A list of blocks that the feature is permitted to snap to. Leaving this empty results in the feature snapping to blocks that can provide support for the given face (up/down/horizontal)
 */
export type AllowedSurfaceBlocks = BlockReference2[];
/**
 * Determines whether the placed feature should be embedded in the found surface.
 */
export type EmbedInSurface = boolean;
/**
 * Reference to the structure to be placed.
 */
export type StructureName = string;
/**
 * How far the structure is allowed to move when searching for a valid placement position. Search is radial, stopping when the nearest valid position is found. Defaults to 0 if omitted.
 */
export type AdjustmentRadius = number;
/**
 * Direction the structure will face when placed in the world. Defaults to `random` if omitted.
 */
export type FacingDirection = "north" | "south" | "east" | "west" | "random";
/**
 * If true, tries to rotate the structure around its center when placed in the world.
 */
export type RotateAroundCenter = boolean;
/**
 * Specifies which Y coordinate of the structure is considered its ground level. This value determines which layer of the structure is checked by the "grounded" and "leveled" constraints and is used as a downward vertical offset during placement. If the value exceeds the structure's height, it is clamped to the maximum valid value and a content warning is emitted.
 */
export type GroundLevel = number;
/**
 * Maximum allowed height difference between the placement position and terrain samples taken halfway along each side of the structure. A valid terrain sample consists of a solid block with a non‑solid block above it.
 */
export type MaxSteepness = number;
/**
 * If true, only motion-blocking blocks within the structure are checked for intersections with blocks in "block_allowlist|block_whitelist". If false, all blocks in the structure except empty ones are checked for intersections, including air.
 */
export type OnlyCheckIntersectionForMotionBlockingBlocks = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference9 = BlockIdentifier | BlockReference;
/**
 * List of blocks the owning structure is allowed to intersect with.
 */
export type BlockAllowlist = BlockReference9[];
/**
 * A minecraft block reference.
 */
export type BlockReference10 = BlockIdentifier | BlockReference;
/**
 * List of blocks the owning structure is allowed to intersect with.
 */
export type BlockWhitelist = BlockReference10[];
/**
 * Named reference of feature to be placed.
 */
export type FeatureToPlace = string;
/**
 * The minimum number of blocks required to be between the estimated surface level and a valid place for this feature.
 */
export type MinimumDistanceBelowSurface = number;
export type BaseBlock = BlockReference2 | BlockReference11[];
/**
 * A minecraft block reference.
 */
export type BlockReference11 = BlockIdentifier | BlockReference;
/**
 * List of blocks that the base cluster of a tree can replace.
 */
export type MayReplace2 = BlockReference2[];
/**
 * Number of clusters that can be generated.
 */
export type NumClusters = number;
/**
 * Radius where the clusters that can be generated.
 */
export type ClustersRadius = number;
/**
 * List of blocks where a tree can grow on.
 */
export type MayGrowOn = BlockReference2[];
/**
 * List of blocks that a tree can replace.
 */
export type MayReaplce = BlockReference2[];
/**
 * List of blocks that a tree can grow through.
 */
export type MayGrowThrough = BlockReference2[];
/**
 * The width of the tree trunk.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_trunk_width".
 */
export type TrunkWidth = number;
/**
 * Min height for the trunk.
 */
export type Base = number;
/**
 * Intervals used to randomize the trunk height, the value of each interval will create a random number where (0 <= rand < interval)), and will be added to the height.
 *
 * @minItems 1
 */
export type Intervals = [number, ...number[]];
/**
 * Min height where the canopy can be placed.
 */
export type MinimumHeightForCanopy = number;
/**
 * If true, diagonal branches will be created.
 */
export type AllowDiagonalGrowth = boolean;
/**
 * Number of blocks below the tree height at which diagonal branches can be created.
 */
export type LeanHeight =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Number of steps taken in X/Z direction while creating a diagonal branch.
 */
export type LeanSteps =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Length for the diagonal branch in the Y axis.
 */
export type LeanLength =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * The block that forms the tree trunk.
 */
export type TrunkBlock = BlockIdentifier | BlockReference;
/**
 * Length for the branch in the Y axis.
 */
export type BranchLength =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Starting Y position for the branch.
 */
export type BranchPosition =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Probability of creating a branch.
 */
export type BranchChance =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * UNDOCUMENTED.
 */
export type Numerator1 = number;
/**
 * UNDOCUMENTED.
 */
export type Denominator1 = number;
/**
 * The size of the canopy.
 */
export type CanopySize = number;
/**
 * The block thata forms the canopy of the tree.
 */
export type LeafBlock = BlockIdentifier | BlockReference;
/**
 * If true the canopy uses a simple pattern.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_simplify_canopy".
 */
export type SimplifyCanopy = boolean;
/**
 * Min canopy position offset.
 */
export type Min10 = number;
/**
 * Max canopy position offset.
 */
export type Max10 = number;
/**
 * Min width for the canopy.
 */
export type MinWidth = number;
/**
 * The numerator for the slope fraction.
 */
export type Rise = number;
/**
 * The denominator for the slope fraction.
 */
export type Run = number;
/**
 * Determines the chance of creating leaf blocks for every layer of the canopy. Larger numbers create a denser tree.
 */
export type VariationChance = ChanceInformation | ChanceInformation[];
/**
 * Chance of something happening represented either as a fraction or a percentage.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CG".
 */
export type ChanceInformation =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * A minecraft block reference.
 */
export type BlockReference12 = BlockIdentifier | BlockReference;
/**
 * Number of decoration blocks to place.
 */
export type NumSteps = [] | [X1] | [X1, Y1];
/**
 * The X component.
 */
export type X1 = number;
/**
 * The Y component.
 */
export type Y1 = number;
/**
 * A list of blocks and a count per block to be placed. This aims to replace decoration_block and num_steps.
 */
export type DecorationBlocksSequence = {
  block?: BlockReference12;
  count?: NumSteps;
}[];
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation1 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * A minecraft block reference.
 */
export type BlockReference13 = BlockIdentifier | BlockReference;
/**
 * Number of decoration blocks to place.
 */
export type NumSteps1 = number;
/**
 * Directions to spread decoration blocks.
 */
export type StepDirection = "down" | "up" | "out" | "away";
/**
 * Number of layers for the canopy.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_height".
 */
export type Height = number;
/**
 * The radius of the canopy.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_radius".
 */
export type Radius = number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation2 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation3 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation4 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation5 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Max number of attempts to create leaf blocks.
 */
export type LeafPlacementAttempts = number;
/**
 * The blocks that form the canopy of the tree
 *
 * @minItems 1
 */
export type LeafBlocks = [LeafBlock] | [LeafBlock, Weight2];
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight2 = number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation6 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * A minecraft block reference.
 */
export type BlockReference14 = BlockIdentifier | BlockReference;
/**
 * Number of decoration blocks to place.
 */
export type NumSteps2 = number;
/**
 * Directions to spread decoration blocks.
 */
export type StepDirection1 = "down" | "up" | "out" | "away";
/**
 * A minecraft block reference.
 */
export type BlockReference15 = BlockIdentifier | BlockReference;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation7 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth = number;
/**
 * The radius of the canopy.
 */
export type Radius1 = number;
/**
 * Modifier for the base radius of the canopy.
 */
export type RadiusStepModifier = number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth1 = number;
/**
 * Roofed canopies feature a base and a top layer, and an extra cap layer on some occasions, this value controls the number of layers in the middle.
 */
export type CanopyHeight = number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth2 = number;
/**
 * Radius used for the base and top layers.
 */
export type OuterRadius = number;
/**
 * Radius used for the middle layers.
 */
export type InnerRadius = number;
/**
 * Min canopy position offset.
 */
export type LowerOffset = number;
/**
 * Max canopy position offset.
 */
export type UpperOffset = number;
/**
 * Max radius of the canopy.
 */
export type MaxRadius = number;
/**
 * Min height for the trunk.
 */
export type Base1 = number;
/**
 * Intervals used to randomize the trunk height, the value of each interval will create a random number where (0 <= rand < interval)), and will be added to the height.
 *
 * @minItems 1
 */
export type Intervals1 = [number, ...number[]];
/**
 * Tree variant with one branch.
 */
export type OneBranch = number;
/**
 * Tree variant with two branches.
 */
export type TwoBranches = number;
/**
 * Tree variant with three branch.
 */
export type TwoBranchesAndTrunk = number;
/**
 * Branch length in X/Z axis.
 */
export type BranchHorizontalLength =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Branch starting position relative to the top of the tree
 */
export type BranchStartOffsetFromTop =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Branch end position relative to the top of the tree
 */
export type BranchEndOffsetFromTop =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation8 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Length of the fallen log.
 */
export type LogLength = number;
/**
 * height of the stump.
 */
export type StumpHeight = number;
/**
 * Modifier for the length of the fallen log.
 */
export type HeightModifier = number;
/**
 * Feature that can be used to decorate the fallen log.
 */
export type LogDecorationFeature = string;
/**
 * Min height for the trunk.
 */
export type Base2 = number;
/**
 * Modifier for the trunk height.
 */
export type Variance = number;
/**
 * Final tree height is multiplied by this scale.
 */
export type Scale = number;
/**
 * Slope for the branch, where 0 is horizontal and 1 is vertical.
 */
export type Slope = number;
/**
 * Density of foliage.
 */
export type Density = number;
/**
 * Min height for branches. Represented by a percentage of the tree height.
 */
export type MinAltitudeFactor = number;
/**
 * Scale modifier for the tree radius.
 */
export type WidthScale = number;
/**
 * Min height for foliage. Represented by a percentage of the tree height.
 */
export type FoliageAltitudeFactor = number;
/**
 * Min height for the trunk.
 */
export type Base3 = number;
/**
 * Tree height modifier A.
 */
export type HeightRandA = number;
/**
 * Tree height modifier B.
 */
export type HeightRandB = number;
/**
 * Length for the branch in the Y axis.
 */
export type BranchLength1 =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Number of branches to place.
 */
export type BranchSteps =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation9 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Min height for the trunk.
 */
export type Base4 = number;
/**
 * Intervals used to randomize the trunk height, the value of each interval will create a random number where (0 <= rand < interval)), and will be added to the height.
 *
 * @minItems 1
 */
export type Intervals2 = [number, ...number[]];
/**
 * Min height where the canopy can be placed.
 */
export type MinimumHeightForCanopy1 = number;
/**
 * Length for the branch.
 */
export type BranchLength2 = number;
/**
 * Slope for the branch, where 0 is horizontal and 1 is vertical.
 */
export type BranchSlope = number;
/**
 * Randomized distance between branches.
 */
export type BranchInterval =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Min altitude where branches can spawn.
 */
export type Min11 = number;
/**
 * Max altitude where branches can spawn.
 */
export type Max11 = number;
/**
 * Defines the height of the trunk.
 */
export type TrunkHeight5 =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Modifier for the height of the trunk.
 */
export type HeightModifier1 =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * Specifies if the trunk can be submerged.
 */
export type CanBeSubmerged =
  | {
      max_depth?: MaxDepth;
    }
  | boolean;
/**
 * Defines the max depth at which the trunk can be submerged.
 */
export type MaxDepth = number;
/**
 * The size of the canopy.
 */
export type CanopySize1 = number;
/**
 * Min canopy position offset.
 */
export type Min12 = number;
/**
 * Max canopy position offset.
 */
export type Max12 = number;
/**
 * Min width for the canopy.
 */
export type MinWidth1 = number;
/**
 * The numerator for the slope fraction.
 */
export type Rise1 = number;
/**
 * The denominator for the slope fraction.
 */
export type Run1 = number;
/**
 * Determines the chance of creating leaf blocks for every layer of the canopy. Larger numbers create a denser tree.
 */
export type VariationChance1 = ChanceInformation | ChanceInformation[];
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation10 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * A minecraft block reference.
 */
export type BlockReference16 = BlockIdentifier | BlockReference;
/**
 * Number of decoration blocks to place.
 */
export type NumSteps3 = number;
/**
 * Directions to spread decoration blocks.
 */
export type StepDirection2 = "down" | "up" | "out" | "away";
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation11 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation12 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation13 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation14 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Max number of attempts to create leaf blocks.
 */
export type LeafPlacementAttempts1 = number;
/**
 * The blocks that form the canopy of the tree
 *
 * @minItems 1
 */
export type LeafBlocks1 = [LeafBlock] | [LeafBlock, Weight3];
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight3 = number;
/**
 * A minecraft block reference.
 */
export type BlockReference17 = BlockIdentifier | BlockReference;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation15 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth3 = number;
/**
 * The radius of the canopy.
 */
export type Radius2 = number;
/**
 * Modifier for the base radius of the canopy.
 */
export type RadiusStepModifier1 = number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth4 = number;
/**
 * Roofed canopies feature a base and a top layer, and an extra cap layer on some occasions, this value controls the number of layers in the middle.
 */
export type CanopyHeight1 = number;
/**
 * Width of the tree trunk.
 */
export type CoreWidth5 = number;
/**
 * Radius used for the base and top layers.
 */
export type OuterRadius1 = number;
/**
 * Radius used for the middle layers.
 */
export type InnerRadius1 = number;
/**
 * Min canopy position offset.
 */
export type LowerOffset1 = number;
/**
 * Max canopy position offset.
 */
export type UpperOffset1 = number;
/**
 * Max radius of the canopy.
 */
export type MaxRadius1 = number;
/**
 * Max number of attempts to create leaf blocks.
 */
export type LeafPlacementAttempts2 = number;
/**
 * The blocks that form the canopy of the tree
 *
 * @minItems 1
 */
export type LeafBlocks2 = [LeafBlock] | [LeafBlock, Weight4];
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight4 = number;
/**
 * Max width that the roots can occupy. The width increases up to the max width while moving downwards. When a max width is reached, roots will grow vertically
 */
export type MaxRootWidth = number;
/**
 * Max length that the roots can occupy.
 */
export type MaxRootLength = number;
/**
 * A minecraft block reference.
 */
export type BlockReference18 = BlockIdentifier | BlockReference;
/**
 * Chance of something happening represented either as a fraction or a percentage.
 */
export type ChanceInformation16 =
  | {
      numerator?: Numerator1;
      denominator?: Denominator1;
      [k: string]: unknown;
    }
  | number;
/**
 * A minecraft block reference.
 */
export type BlockReference19 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference20 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference21 = BlockIdentifier | BlockReference;
/**
 * Root offset from the trunk
 */
export type YOffset =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * List of blocks that a root can grow through.
 */
export type RootsMayGrowThrough = BlockReference2[];
/**
 * A minecraft block reference.
 */
export type BlockReference22 = BlockIdentifier | BlockReference;
/**
 * How many blocks to increase the cave radius by, from the center point of the cave.
 */
export type WidthModifier1 = string | number;
/**
 * The chance to skip doing the carve (1 / value).
 */
export type SkipCarveChance2 = number;
/**
 * The height limit where we attempt to carve
 */
export type HeightLimit2 = number;
/**
 * The scaling in y
 *
 * @minItems 2
 * @maxItems 2
 */
export type YScale2 = [Min13, Max13];
export type Min13 = number;
export type Max13 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type HorizontalRadiusMultiplier2 = [Min14, Max14];
export type Min14 = number;
export type Max14 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type VerticalRadiusMultiplier2 = [Min15, Max15];
export type Min15 = number;
export type Max15 = number;
/**
 * @minItems 2
 * @maxItems 2
 */
export type FloorLevel2 = [Min16, Max16];
export type Min16 = number;
export type Max16 = number;
/**
 * A minecraft block reference.
 */
export type BlockReference23 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 */
export type BlockReference24 = BlockIdentifier | BlockReference;
/**
 * Blocks that can be replaced by the ground blocks on the patch.
 */
export type ReplaceableBlocks = BlockReference24[];
/**
 * A minecraft block reference.
 */
export type BlockReference25 = BlockIdentifier | BlockReference;
/**
 * Feature that will be placed by the patch.
 */
export type VegetationFeature = string;
/**
 * Determines if a vegetation patch will grow from the ceiling or the floor.
 */
export type Surface1 = "floor" | "ceiling";
/**
 * Depth of the base covered by the ground blocks.
 */
export type Depth = number;
/**
 * Probability of putting the ground blocks one block deeper. Adds some randomness to the bottom of the patch.
 */
export type ExtraDeepBlockChance = number;
/**
 * Vertical range used to determine a suitable surface position for the patch.
 */
export type VerticalRange = number;
/**
 * Probability of spawning vegetation on the patch. Larger numbers create a denser vegetation patch.
 */
export type VegatationChance = number;
/**
 * Horizontal area that the vegetation patch will cover.
 */
export type HorizontalRadius = number;
/**
 * Probability of spawning vegetation on the edge of the patch radius.
 */
export type ExtraEgdeColumnChance = number;
/**
 * If true, waterlogs the positions occupied by the ground blocks.
 */
export type Waterlogged = boolean;
/**
 *  Collection of weighted features that placement will select from.
 *
 * @minItems 1
 */
export type Features3 = [Feature2, ...Feature2[]];
/**
 * Named reference to a feature.
 */
export type Feature2 = [] | [Feature3] | [Feature3, Weight5];
/**
 * Named reference to a feature.
 */
export type Feature3 = string;
/**
 * Weight used in random selection. Value is relative to other weights in the collection.
 */
export type Weight5 = number;
/**
 * A minecraft block reference.
 */
export type BlockReference26 = BlockIdentifier | BlockReference;
/**
 * If true, enforce the block's mayPlace check.
 */
export type EnforcePlacementRules1 = boolean;
/**
 * If true, randomizes the block's cardinal orientation.
 */
export type RandomizeRotation1 = boolean;
/**
 * A minecraft block reference.
 */
export type BlockReference27 = BlockIdentifier | BlockReference;
/**
 * A list of blocks that may be replaced during placement. Omit this field to allow any block to be replaced, except other multi-blocks.
 */
export type MayReplace3 = BlockReference27[];
/**
 * A minecraft feature identifier.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "D".
 */
export type FeatureIdentifier = string;
/**
 * A minecraft block identifier.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "G".
 */
export type BlockIdentifier2 = string;
/**
 * Molang definition.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "H".
 */
export type Molang1 = string;
/**
 * The minecraft molang definition that results in a float.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "I".
 */
export type MolangNumber2 = string | number;
/**
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BB_rangeOrInt".
 */
export type BBRangeOrInt = number | Range;
/**
 * @minItems 1
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BB_blocks_array".
 */
export type BBBlocksArray = [Blocks, ...Blocks[]];
/**
 * A described range.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BC".
 */
export type RangeAB =
  | number
  | []
  | [A2]
  | [A2, B]
  | {
      range_min?: RangeMin1;
      range_max?: RangeMax1;
    }
  | {
      min?: Min4;
      max?: Max4;
    };
/**
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BI_coord_dist".
 */
export type Coordinate =
  | MolangNumber1
  | {
      distribution: Distribution;
      step_size?: StepSize;
      grid_offset?: StepSize1;
      extent: Extent;
    };
/**
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CB_block_side".
 */
export type CBBlockSide = BlockReference6 | BlockReference7[];
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_leaf_block".
 */
export type BlockReference28 = BlockIdentifier | BlockReference;
/**
 * A minecraft block reference.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_trunk_block".
 */
export type BlockReference29 = BlockIdentifier | BlockReference;
/**
 * An vector of 2 integers.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CH".
 */
export type VectorOf2Items = [] | [X1] | [X1, Y1];

/**
 * Features are decorations scattered throughout the world. Things such as trees, plants, flowers, springs, ore, and coral are all features. Basically, if it isn't the terrain or a mob, it's probably a feature!
 */
export interface Features {
  format_version: FormatVersion;
  "minecraft:aggregate_feature"?: AggregateFeature;
  "minecraft:cave_carver_feature"?: CaveCarverFeature;
  "minecraft:fossil_feature"?: FossilFeature;
  "minecraft:geode_feature"?: GeodeFeature;
  "minecraft:growing_plant_feature"?: GrowingPlantFeature;
  "minecraft:height_difference_filter_feature"?: HeightDifferenceFilterFeature;
  "minecraft:multiface_feature"?: MultifaceFeature;
  "minecraft:nether_cave_carver_feature"?: NetherCaveCarverFeature;
  "minecraft:ore_feature"?: OreFeature;
  "minecraft:partially_exposed_blob_feature"?: PartiallyExposedBlobFeature;
  "minecraft:scatter_feature"?: ScatterFeature;
  "minecraft:search_feature"?: SearchFeature;
  "minecraft:sequence_feature"?: SequenceFeature;
  "minecraft:single_block_feature"?: SingleBlockFeature;
  "minecraft:snap_to_surface_feature"?: SnapToSurfaceFeature;
  "minecraft:structure_template_feature"?: StructureTemplateFeature;
  "minecraft:surface_relative_threshold_feature"?: SurfaceRelativeThresholdFeature;
  "minecraft:tree_feature"?: TreeFeature;
  "minecraft:underwater_cave_carver_feature"?: UnderwaterCaveCarverFeature;
  "minecraft:vegetation_patch_feature"?: VegetationPatchFeature;
  "minecraft:weighted_random_feature"?: WeightedRandomFeature;
  "minecraft:multi_block_feature"?: MultiBlockFeature;
}
/**
 * 'minecraft:aggregate_feature` places a collection of features in an arbitary order. All features in the collection use the same input position. Features should not depend on each other, as there is no guarantee on the order the features will be placed.
 *  Succeeds if: At lease one feature is placed successfully.
 *  Fails if: All features fail to be placed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "B".
 */
export interface AggregateFeature {
  description: Description;
  features: Features1;
  early_out?: EarlyOut;
}
/**
 * Feature's description containing the identifier
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "C".
 */
export interface Description {
  identifier: Identifier;
  [k: string]: unknown;
}
/**
 * `minecraft:cave_carver_feature` carves a cave through the world in the current chunk, and in every chunk around the current chunk in an 8 radial pattern. This feature will also only work when placed specifically in the pass `pregeneration_pass`.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "E".
 */
export interface CaveCarverFeature {
  description: Description;
  fill_with?: FillWith;
  width_modifier?: WidthModifier;
  skip_carve_chance?: SkipCarveChance;
  height_limit?: HeightLimit;
  y_scale?: YScale;
  horizontal_radius_multiplier?: HorizontalRadiusMultiplier;
  vertical_radius_multiplier?: VerticalRadiusMultiplier;
  floor_level?: FloorLevel;
}
export interface BlockReference {
  name?: BlockIdentifier1;
  states?: States;
  tags?: Molang;
}
export interface States {
  [k: string]: StateValue;
}
/**
 * 'minecraft:fossil_feature' generates a skeletal structure composed of bone blocks and parametric ore blocks.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "J".
 */
export interface FossilFeature {
  description: Description;
  ore_block?: OreBlock;
  max_empty_corners?: MaxEmptyCorners;
}
/**
 * `minecraft:geode_feature` generates a rock formation to simulate a geode. Each layer of, and block within, the geode can be replaced.
 * Succeeds if: At least one block within the geode is placed.
 * Fails if: All blocks within the geode fail to be placed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BA".
 */
export interface GeodeFeature {
  description: Description;
  filler: Filler;
  inner_layer: InnerLayer;
  alternate_inner_layer: AlternateInnerLayer;
  middle_layer: MiddleLayer;
  outer_layer: OuterLayer;
  inner_placements?: InnerPlacements;
  min_outer_wall_distance: MinimumOuterWallDistance;
  max_outer_wall_distance: MaximumOuterWallDistance;
  min_distribution_points: MinimumDistributionPoints;
  max_distribution_points: MaximumDistributionPoints;
  min_point_offset: MinimumPointOffset;
  max_point_offset: MaximumPointOffset;
  max_radius: MaximumRadius;
  crack_point_offset: CrackPointOffset;
  generate_crack_chance: GenerateCrackChance;
  base_crack_size: BaseCrackSize;
  noise_multiplier: NoiseMultiplier;
  use_potential_placements_chance: UsePotentialPlacementsChance;
  use_alternate_layer0_chance: UseAlternateLayer0Chance;
  placements_require_layer0_alternate: PlacementsRequireLayer0Alternate;
  invalid_blocks_threshold: InvalidBlocksThreshold;
}
/**
 * `minecraft:growing_plant_feature` places a growing plant in the world. A growing plant is a column that is anchored either to the ceiling or the floor, based on its growth direction.
 * The growing plant has a body and a head, where the head is the tip of the plant, and the body consists of the remainder blocks.
 * This feature can be used to define growing plants with variable body and head blocks, e.g. Cave Vines.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BB".
 */
export interface GrowingPlantFeature {
  description: Description;
  age?: Age;
  height_distribution: HeightDistribution;
  growth_direction: GrowthDirection;
  body_blocks: BodyBlocks;
  head_blocks: HeadBlocks;
  allow_water?: AllowWater;
}
/**
 * A range.
 */
export interface Range {
  range_max: RangeMax;
  range_min: RangeMin;
  [k: string]: unknown;
}
/**
 * 'minecraft:height_difference_filter_feature' filters away positions based on the heightmap around the placement position. The filter will check for surface blocks in each cardinal direction within the `search_radius`. Each block will be checked against all given conditions.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BD".
 */
export interface HeightDifferenceFilterFeature {
  description: Description;
  places_feature?: PlacesFeature;
  min_required_upward_height_diff?: MinRequiredUpwardHeightDiff;
  max_required_downward_height_diff?: MaxRequiredDownwardHeightDiff;
  min_allowed_upward_height_diff?: MinAllowedUpwardHeightDiff;
  max_allowed_downward_height_diff?: MaxAllowedDownwardHeightDiff;
  search_radius?: SearchRadius;
}
/**
 * `minecraft:multiface_feature` places one or a few multiface blocks on floors/walls/ceilings. Despite the name, any block can be placed by this feature. During placement, existing world blocks are checked to see if this feature can be placed on them based on the list provided in the `can_place_on` field. If no `can_replace_on` field is specified, the `place_block` block can be placed on any existing block.
 * This feature will also try to spread the `place_block` block around the location in world the feature is placed.
 * Succeeds if: At least one block is successfully placed.
 * Fails if: All block placements fail.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BE".
 */
export interface MultifaceFeature {
  description: Description;
  places_block: PlacesBlock;
  search_range: SearchRange;
  can_place_on_floor: CanPlaceOnFloor;
  can_place_on_ceiling: CanPlaceOnCeiling;
  can_place_on_wall: CanPlaceOnWall;
  chance_of_spreading: ChanceOfSpreading;
  can_place_on?: CanPlaceOn;
}
/**
 * `minecraft:nether_cave_carver_feature` carves a cave through the Nether in the current chunk, and in every chunk around the current chunk in an 8 radial pattern.This feature will also only work when placed specifically in the pass `pregeneration_pass`.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BF".
 */
export interface NetherCaveCarverFeature {
  description: Description;
  fill_with?: Identifier1;
  width_modifier?: Identifier2;
  skip_carve_chance?: SkipCarveChance1;
  height_limit?: HeightLimit1;
  y_scale?: YScale1;
  horizontal_radius_multiplier?: HorizontalRadiusMultiplier1;
  vertical_radius_multiplier?: VerticalRadiusMultiplier1;
  floor_level?: FloorLevel1;
}
/**
 * `minecraft:ore_feature` places a vein of blocks to simulate ore deposits. Despite the name, any block can be placed by this feature. During placement, existing world blocks are checked to see if they can be replaced by the new ore block based on the list provided in the `may_replace` field of a `replace_rules` entry. If no `may_replace` field is specified in a `replace_rule` entry, the ore block can replace any existing block.
 * Succeeds if: At least one ore block is successfully placed.
 * Fails if: All ore block placements fail.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BG".
 */
export interface OreFeature {
  description: Description;
  count: Count;
  replace_rules?: ReplaceRules;
  discard_chance_on_air_exposure?: DiscardChanceOnAirExposure;
}
/**
 * If a rule is resolved, the rest will not be resolved for that block position.
 */
export interface RepalceRule {
  places_block: PlacesBlock1;
  may_replace?: MayReplace;
  [k: string]: unknown;
}
/**
 * 'minecraft:partially_exposed_blob_feature' generates a blob of the specified block with the specified dimensions For the most part the blob is embedded in the specified surface, however a single side is allowed to be exposed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BH".
 */
export interface PartiallyExposedBlobFeature {
  description: Description;
  places_block: BlockReference3;
  placement_radius_around_floor: PlacementRadiusAroundFloor;
  placement_probability_per_valid_position: PlacementProbabilityPerValidPosition;
  exposed_face?: ExposedFace;
}
/**
 * `minecraft:scatter_feature` scatters a feature throughout a chunk. The `x`, `y`, and `z` fields are per-coordinate parameters.
 * Note that coordinates represent an offset from the input position, not an absolute position. Coordinates may be a single value, a random distribution, or molang expression that resolves to a numeric value. The `coordinate_eval_order` field is provided for finer control of coordinate resolution (particularly when using the `grid` distribution). `iterations` controls how many individual placements should occur if the `scatter_chance` check succeeds. The `scatter_chance` check happens once, so either all placements will run or none will.
 * Succeeds if: At least one feature placement succeeds.
 * Fails if: All feature placements fail.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BI".
 */
export interface ScatterFeature {
  description: Description;
  places_feature: PlacesFeature1;
  project_input_to_floor?: ProjectInputToFloor;
  coordinate_eval_order?: CoordinateEvalOrder;
  iterations?: Iterations;
  scatter_chance?: ScatterChance;
  x?: X;
  z?: Y;
  y?: Z;
}
/**
 * `minecraft:search_feature` sweeps a volume searching for a valid placement location for its referenced feature. The `search_volume` field specifies the axis-aligned bounding box that defines the boundaries of the search. The search sweeps along the axis defined by the `search_axis` field, layer by layer. For example, if `search_axis` = '-x', blocks with greater x values will be checked before blocks with lower x values. Each layer is searched from the bottom-left to the top-right before moving to the next layer along the axis. By default, only one valid position must be found, but this can be altered by specifying the `required_successes` field. If fewer than the required successes are found, no placement will occur.
 * Succeeds if: The number of valid positions is equal to the value specified by `required_successes`.
 * Fails if: The number of valid positions is less than the value specified by `required_successes`.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BJ".
 */
export interface SearchFeature {
  description: Description;
  places_feature?: PlacesFeature2;
  search_volume?: PlacesFeature3;
  search_axis: SearchAxis;
  required_successes?: RequiredSuccesses;
}
/**
 * Axis-aligned bounding box that will be searched for valid placement positions. Expressed as offsets from the input position.
 */
export interface PlacesFeature3 {
  max: Max9;
  min: Min9;
}
/**
 * `minecraft:sequence_feature` places a collection of features sequentially, in the order they appear in data. The output position of the previous feature is used as the input position for the next. For example, a tree feature is placed at (0, 0, 0) and places blocks up to (0, 10, 0). The next feature in the sequence begins at (0, 10, 0).
 * Succeeds if: All features in the sequence are successfully placed.
 * Fails if: Any feature in the sequence fails to be placed. Features that have not yet been placed at the time of failure are skipped.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CA".
 */
export interface SequenceFeature {
  description: Description;
  features: Features2;
}
/**
 * `minecraft:single_block_feature` places a single block in the world. The `may_place_on` and `may_replace` fields are allowlists which specify where the block can be placed. If these fields are omitted, the block can be placed anywhere. The block's internal survivability and placement rules can optionally be enforced with the `enforce_survivability_rules` and `enforce_placement_rules` fields. These rules are specified per-block and are typically designed to produce high quality gameplay or natural behavior. However, enabling this enforcement may make it harder to debug placement failures.
 *  Succeeds if: The block is successfully placed in the world.
 *  Fails if: The block fails to be placed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CB".
 */
export interface SingleBlockFeature {
  description: Description;
  places_block: BlockReference4 | PlacesBlock2;
  enforce_placement_rules: EnforcePlacementRules;
  enforce_survivability_rules: EnforceSurvivabilityRules;
  randomize_rotation?: RandomizeRotation;
  may_attach_to?: MayAttachTo;
  may_not_attach_to?: MayNotAttachTo;
  may_replace?: MayReplace1;
}
/**
 * Reference to the block to be placed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CB_weighted_block_reference".
 */
export interface WeightedBlockReference {
  block: BlockReference5;
  weight?: Weight1;
  [k: string]: unknown;
}
/**
 * The list of valid block and block faces the given block may attach to when being placed.
 */
export interface MayAttachTo {
  min_sides_must_attach?: MinimumSidesMustAttach;
  auto_rotate?: AutoRotate;
  top?: Top;
  bottom?: Bottom;
  north?: North;
  south?: South;
  east?: East;
  west?: West;
  all?: All;
  sides?: Sides;
  diagonal?: Diagonal;
}
/**
 * Minimum number of sides that must be attached when being placed.
 */
export interface MinimumSidesMustAttach {
  [k: string]: unknown;
}
/**
 * Denylist which specifies where the block can't be placed.
 */
export interface MayNotAttachTo {
  top?: Top1;
  bottom?: Bottom1;
  north?: North1;
  south?: South1;
  east?: East1;
  west?: West1;
  all?: All1;
  sides?: Sides1;
  diagonal?: Diagonal1;
}
/**
 * `minecraft:snap_to_surface_feature` snaps the y-value of a feature placement pos to the floor or the ceiling within the provided `vertical_search_range`. The placement biome is preserved.
 * If the snap position goes outside of the placement biome, placement will fail.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CC".
 */
export interface SnapToSurfaceFeature {
  description: Description;
  feature_to_snap: FeatureToSnap;
  vertical_search_range: VerticalSearchRange;
  surface?: Surface;
  allow_air_placement?: AllowAirPlacement;
  allow_underwater_placement?: AllowUnderwaterPlacement;
  allowed_surface_blocks?: AllowedSurfaceBlocks;
  embed_in_surface?: EmbedInSurface;
}
/**
 * `minecraft:structure_template_feature` places a structure in the world. The structure must be stored as a .mcstructure file in the `structures` subdirectory of a behavior pack. It is possible to reference structures that are part of other behavior packs, they do not need to come from the same behavior pack as this feature. Constraints can be defined to specify where the structure is allowed to be placed. During placement, the feature will search for a position within the 'adjustment_radius' that satisfies all constraints. If none are found, the structure will not be placed.
 * Succeeds if: The structure is placed in the world.
 * Fails if: The structure fails to be placed within the world.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CD".
 */
export interface StructureTemplateFeature {
  description: Description;
  structure_name: StructureName;
  adjustment_radius?: AdjustmentRadius;
  facing_direction?: FacingDirection;
  rotate_around_center?: RotateAroundCenter;
  ground_level?: GroundLevel;
  /**
   * Specific constraints that must be satisfied when placing this structure.
   */
  constraints: {
    grounded?: Grounded;
    leveled?: Leveled;
    unburied?: Unburied;
    block_intersection?: Unburied1;
  };
}
/**
 * When specified, ensures the structure is on the ground.
 */
export interface Grounded {}
/**
 * When specified, ensures the structure's ground level is placed on mostly flat terrain.
 */
export interface Leveled {
  max_steepness?: MaxSteepness;
}
/**
 * When specified, ensures the structure has air above it.
 */
export interface Unburied {}
/**
 * When specified, ensures the structure has air above it.
 */
export interface Unburied1 {
  only_check_intersection_for_motion_blocking_blocks?: OnlyCheckIntersectionForMotionBlockingBlocks;
  block_allowlist?: BlockAllowlist;
  block_whitelist?: BlockWhitelist;
}
/**
 * 'minecraft:surface_relative_threshold_feature' determines whether the provided position is below the estimated surface level of the world, and places a feature if so.If the provided position is above configured surface or the surface is not available, placement will fail.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CE".
 */
export interface SurfaceRelativeThresholdFeature {
  description: Description;
  feature_to_place: FeatureToPlace;
  minimum_distance_below_surface?: MinimumDistanceBelowSurface;
}
/**
 * 'minecraft:tree_feature' will place a tree in the world. A tree consists of a column that is anchored to a base block with set parameters for what it can be placed on and canopy that extends from the column. Trees support multiple types of canopies, trunks, and roots.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF".
 */
export interface TreeFeature {
  description: Description;
  base_block?: BaseBlock;
  base_cluster?: BaseCluster;
  may_grow_on?: MayGrowOn;
  may_replace?: MayReaplce;
  may_grow_through?: MayGrowThrough;
  acacia_trunk?: AcaciaTrunk;
  cherry_trunk?: CherryTrunk;
  fallen_trunk?: FallenTrunk;
  fancy_trunk?: FancyTrunk;
  mangrove_trunk?: MangroveTrunk;
  mega_trunk?: MegaTrunk;
  trunk?: Trunk;
  acacia_canopy?: AcaciaCanopy1;
  canopy?: Canopy1;
  cherry_canopy?: CherryCanopy1;
  fancy_canopy?: FancyCanopy1;
  mangrove_canopy?: MangroveCanopy1;
  mega_canopy?: MegaCanopy1;
  mega_pine_canopy?: MegaPineCanopy1;
  pine_canopy?: PineCanopy1;
  roofed_canopy?: RoofedCanopy1;
  spruce_canopy?: SpruceCanopy1;
  random_spread_canopy?: RandomSpreadCanopy;
  mangrove_roots?: MangroveRoots;
}
/**
 * Allows you to define a number of clusters for the base of the tree. Used to generate mega tree variants.
 */
export interface BaseCluster {
  may_replace: MayReplace2;
  num_clusters: NumClusters;
  cluster_radius: ClustersRadius;
}
/**
 * Configutarion for the acacia trunk.
 */
export interface AcaciaTrunk {
  trunk_width?: TrunkWidth;
  trunk_height?: TrunkHeight;
  trunk_lean?: TrunkLean;
  trunk_block?: TrunkBlock;
  branches?: Branches;
}
/**
 * Configuration object for the trunk height.
 */
export interface TrunkHeight {
  base?: Base;
  intervals?: Intervals;
  min_height_for_canopy?: MinimumHeightForCanopy;
}
/**
 * Configuration object for diagonal branches.
 */
export interface TrunkLean {
  allow_diagonal_growth?: AllowDiagonalGrowth;
  lean_height?: LeanHeight;
  lean_steps?: LeanSteps;
  lean_length?: LeanLength;
}
/**
 * Configuration object for branches.
 */
export interface Branches {
  branch_length?: BranchLength;
  branch_position?: BranchPosition;
  branch_chance?: BranchChance;
  branch_canopy?: BranchCanopy;
  trunk_decoration?: Decoration;
}
/**
 * Configuration object for the canopy.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_branch_canopy".
 */
export interface BranchCanopy {
  acacia_canopy?: AcaciaCanopy;
  canopy?: Canopy;
  cherry_canopy?: CherryCanopy;
  fancy_canopy?: FancyCanopy;
  mangrove_canopy?: MangroveCanopy;
  mega_canopy?: MegaCanopy;
  mega_pine_canopy?: MegaPineCanopy;
  pine_canopy?: PineCanopy;
  roofed_canopy?: RoofedCanopy;
  spruce_canopy?: SpruceCanopy;
}
/**
 * Configuration object for the acacia canopy.
 */
export interface AcaciaCanopy {
  canopy_size?: CanopySize;
  leaf_block?: LeafBlock;
  simplify_canopy?: SimplifyCanopy;
}
/**
 * Configuration object for the normal canopy.
 */
export interface Canopy {
  canopy_offset?: CanopyOffset;
  min_width?: MinWidth;
  canopy_slope?: CanopySlope;
  variation_chance?: VariationChance;
  leaf_block?: LeafBlock;
  canopy_decoration?: CanopyDecoration;
}
/**
 * Canopy position offset relative to the block above the trunk.
 */
export interface CanopyOffset {
  min?: Min10;
  max?: Max10;
}
/**
 * Configuration object for the canopy slope.
 */
export interface CanopySlope {
  rise?: Rise;
  run?: Run;
}
/**
 * Configuration object for the canopy decoration.
 */
export interface CanopyDecoration {
  decoration_blocks_sequence?: DecorationBlocksSequence;
  decoration_chance?: ChanceInformation1;
  decoration_block?: BlockReference13;
  num_steps?: NumSteps1;
  step_direction?: StepDirection;
}
/**
 * Configuration object for the cherry canopy.
 */
export interface CherryCanopy {
  leaf_block?: LeafBlock;
  height?: Height;
  radius?: Radius;
  trunk_width?: TrunkWidth;
  wide_bottom_layer_hole_chance?: ChanceInformation2;
  corner_hole_chance?: ChanceInformation3;
  hanging_leaves_chance?: ChanceInformation4;
  hanging_leaves_extension_chance?: ChanceInformation5;
}
/**
 * Configuration object for the fancy canopy.
 */
export interface FancyCanopy {
  height?: Height;
  radius?: Radius;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the mangrove canopy.
 */
export interface MangroveCanopy {
  canopy_height?: Height;
  canopy_radius?: Radius;
  leaf_placement_attempts?: LeafPlacementAttempts;
  leaf_blocks?: LeafBlocks;
  canopy_decoration?: Decoration;
  hanging_block?: BlockReference15;
  hanging_block_placement_chance?: ChanceInformation7;
}
/**
 * Configuration object for the decoration.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CF_decoration".
 */
export interface Decoration {
  decoration_chance?: ChanceInformation6;
  decoration_block?: BlockReference14;
  num_steps?: NumSteps2;
  step_direction?: StepDirection1;
}
/**
 * Configuration object for the mega canopy.
 */
export interface MegaCanopy {
  canopy_height?: Height;
  base_radius?: Radius;
  core_width?: CoreWidth;
  simplify_canopy?: SimplifyCanopy;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the mega pine canopy.
 */
export interface MegaPineCanopy {
  canopy_height?: Height;
  base_radius?: Radius1;
  radius_step_modifier?: RadiusStepModifier;
  core_width?: CoreWidth1;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the pine canopy.
 */
export interface PineCanopy {
  height?: Height;
  radius?: Radius;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the roofed canopy.
 */
export interface RoofedCanopy {
  canopy_height?: CanopyHeight;
  core_width?: CoreWidth2;
  outer_radius?: OuterRadius;
  inner_radius?: InnerRadius;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the spruce canopy.
 */
export interface SpruceCanopy {
  lower_offset?: LowerOffset;
  upper_offset?: UpperOffset;
  max_radius?: MaxRadius;
  leaf_block?: LeafBlock;
}
/**
 * Configutarion for the cherry trunk.
 */
export interface CherryTrunk {
  trunk_block?: TrunkBlock;
  trunk_height?: TrunkHeight1;
  branches?: Branches1;
}
/**
 * Configuration object for the trunk height.
 */
export interface TrunkHeight1 {
  base?: Base1;
  intervals?: Intervals1;
}
/**
 * Configuration object for branches.
 */
export interface Branches1 {
  tree_type_weights?: TreeTypeWeights;
  branch_horizontal_length?: BranchHorizontalLength;
  branch_start_offset_from_top?: BranchStartOffsetFromTop;
  branch_end_offset_from_top?: BranchEndOffsetFromTop;
  branch_chance?: ChanceInformation8;
  branch_canopy?: BranchCanopy;
}
/**
 * Configuration object to pick a tree variant based on a weighted random number
 */
export interface TreeTypeWeights {
  one_branch?: OneBranch;
  two_branches?: TwoBranches;
  two_branches_and_trunk?: TwoBranchesAndTrunk;
}
/**
 * Configutarion for the fallen trunk.
 */
export interface FallenTrunk {
  log_length?: LogLength;
  stump_height?: StumpHeight;
  height_modifier?: HeightModifier;
  trunk_block?: TrunkBlock;
  log_decoration_feature?: LogDecorationFeature;
  trunk_decoration?: Decoration;
}
/**
 * Configutarion for the fancy trunk.
 */
export interface FancyTrunk {
  trunk_height?: TrunkHeight2;
  trunk_width?: TrunkWidth;
  branches?: Branches2;
  trunk_block?: TrunkBlock;
  width_scale?: WidthScale;
  foliage_altitude_factor?: FoliageAltitudeFactor;
}
/**
 * Configuration object for the trunk height.
 */
export interface TrunkHeight2 {
  base?: Base2;
  variance?: Variance;
  scale?: Scale;
}
/**
 * Configuration object for branches.
 */
export interface Branches2 {
  slope?: Slope;
  density?: Density;
  min_altitude_factor?: MinAltitudeFactor;
}
/**
 * Configutarion for the mangrove trunk.
 */
export interface MangroveTrunk {
  trunk_width?: TrunkWidth;
  trunk_height?: TrunkHeight3;
  trunk_block?: TrunkBlock;
  branches?: Branches3;
  trunk_decoration?: Decoration;
}
/**
 * Configuration object for the trunk height.
 */
export interface TrunkHeight3 {
  base?: Base3;
  height_rand_a?: HeightRandA;
  height_rand_b?: HeightRandB;
}
/**
 * Configuration object for branches.
 */
export interface Branches3 {
  branch_length?: BranchLength1;
  branch_steps?: BranchSteps;
  branch_chance?: ChanceInformation9;
}
/**
 * Configutarion for the mega trunk.
 */
export interface MegaTrunk {
  trunk_width?: TrunkWidth;
  trunk_height?: TrunkHeight4;
  trunk_block?: TrunkBlock;
  trunk_decoration?: Decoration;
  branches?: Branches4;
}
/**
 * Configuration object for the trunk height.
 */
export interface TrunkHeight4 {
  base?: Base4;
  intervals?: Intervals2;
  min_height_for_canopy?: MinimumHeightForCanopy1;
}
/**
 * Configuration object for branches.
 */
export interface Branches4 {
  branch_length?: BranchLength2;
  branch_slope?: BranchSlope;
  branch_interval?: BranchInterval;
  branch_altitude_factor?: BranchAltitudeFactor;
  branch_canopy?: BranchCanopy;
}
/**
 * Altitude at which branches can spawn, relative to the tree height.
 */
export interface BranchAltitudeFactor {
  min?: Min11;
  max?: Max11;
}
/**
 * Configutarion for the normal trunk.
 */
export interface Trunk {
  trunk_height?: TrunkHeight5;
  height_modifier?: HeightModifier1;
  can_be_submerged?: CanBeSubmerged;
  trunk_block?: TrunkBlock;
  trunk_decoration?: Decoration;
}
/**
 * Configuration object for the acacia canopy.
 */
export interface AcaciaCanopy1 {
  canopy_size?: CanopySize1;
  leaf_block?: LeafBlock;
  simplify_canopy?: SimplifyCanopy;
}
/**
 * Configuration object for the normal canopy.
 */
export interface Canopy1 {
  canopy_offset?: CanopyOffset1;
  min_width?: MinWidth1;
  canopy_slope?: CanopySlope1;
  variation_chance?: VariationChance1;
  leaf_block?: LeafBlock;
  canopy_decoration?: CanopyDecoration1;
}
/**
 * Canopy position offset relative to the block above the trunk.
 */
export interface CanopyOffset1 {
  min?: Min12;
  max?: Max12;
}
/**
 * Configuration object for the canopy slope.
 */
export interface CanopySlope1 {
  rise?: Rise1;
  run?: Run1;
}
/**
 * Configuration object for the canopy decoration.
 */
export interface CanopyDecoration1 {
  decoration_chance?: ChanceInformation10;
  decoration_block?: BlockReference16;
  num_steps?: NumSteps3;
  step_direction?: StepDirection2;
}
/**
 * Configuration object for the cherry canopy.
 */
export interface CherryCanopy1 {
  leaf_block?: LeafBlock;
  height?: Height;
  radius?: Radius;
  trunk_width?: TrunkWidth;
  wide_bottom_layer_hole_chance?: ChanceInformation11;
  corner_hole_chance?: ChanceInformation12;
  hanging_leaves_chance?: ChanceInformation13;
  hanging_leaves_extension_chance?: ChanceInformation14;
}
/**
 * Configuration object for the fancy canopy.
 */
export interface FancyCanopy1 {
  height?: Height;
  radius?: Radius;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the mangrove canopy.
 */
export interface MangroveCanopy1 {
  canopy_height?: Height;
  canopy_radius?: Radius;
  leaf_placement_attempts?: LeafPlacementAttempts1;
  leaf_blocks?: LeafBlocks1;
  canopy_decoration?: Decoration;
  hanging_block?: BlockReference17;
  hanging_block_placement_chance?: ChanceInformation15;
}
/**
 * Configuration object for the mega canopy.
 */
export interface MegaCanopy1 {
  canopy_height?: Height;
  base_radius?: Radius;
  core_width?: CoreWidth3;
  simplify_canopy?: SimplifyCanopy;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the mega pine canopy.
 */
export interface MegaPineCanopy1 {
  canopy_height?: Height;
  base_radius?: Radius2;
  radius_step_modifier?: RadiusStepModifier1;
  core_width?: CoreWidth4;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the pine canopy.
 */
export interface PineCanopy1 {
  height?: Height;
  radius?: Radius;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the roofed canopy.
 */
export interface RoofedCanopy1 {
  canopy_height?: CanopyHeight1;
  core_width?: CoreWidth5;
  outer_radius?: OuterRadius1;
  inner_radius?: InnerRadius1;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the spruce canopy.
 */
export interface SpruceCanopy1 {
  lower_offset?: LowerOffset1;
  upper_offset?: UpperOffset1;
  max_radius?: MaxRadius1;
  leaf_block?: LeafBlock;
}
/**
 * Configuration object for the random spread canopy.
 */
export interface RandomSpreadCanopy {
  canopy_height?: Height;
  canopy_radius?: Radius;
  leaf_placement_attempts?: LeafPlacementAttempts2;
  leaf_blocks?: LeafBlocks2;
}
/**
 * Configuration for mangrove roots
 */
export interface MangroveRoots {
  max_root_width?: MaxRootWidth;
  max_root_length?: MaxRootLength;
  root_block?: BlockReference18;
  above_root?: AboveRoot;
}
/**
 * Configuration object for blocks decorating the top of the roots
 */
export interface AboveRoot {
  above_root_chance?: ChanceInformation16;
  above_root_block?: BlockReference19;
  muddy_root_block?: BlockReference20;
  mud_block?: BlockReference21;
  y_offset?: YOffset;
  roots_may_grow_through?: RootsMayGrowThrough;
  root_decoration?: Decoration;
}
/**
 * 'minecraft:underwater_cave_carver_feature' carves a cave through the world in the current chunk, and in every chunk around the current chunk in an 8 radial pattern.This feature will specifically target creating caves only below sea level.
 * This feature will also only work when placed specifically in the pass `pregeneration_pass`.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CI".
 */
export interface UnderwaterCaveCarverFeature {
  description: Description;
  fill_with?: BlockReference22;
  width_modifier?: WidthModifier1;
  skip_carve_chance?: SkipCarveChance2;
  height_limit?: HeightLimit2;
  y_scale?: YScale2;
  horizontal_radius_multiplier?: HorizontalRadiusMultiplier2;
  vertical_radius_multiplier?: VerticalRadiusMultiplier2;
  floor_level?: FloorLevel2;
  replace_air_with?: BlockReference23;
}
/**
 * Feature type `minecraft:vegetation_patch_feature` has not yet been documented.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "CJ".
 */
export interface VegetationPatchFeature {
  description: Description;
  replaceable_blocks: ReplaceableBlocks;
  ground_block: BlockReference25;
  vegetation_feature: VegetationFeature;
  surface?: Surface1;
  depth?: Depth;
  extra_deep_block_chance?: ExtraDeepBlockChance;
  vertical_range?: VerticalRange;
  vegetation_chance?: VegatationChance;
  horizontal_radius: HorizontalRadius;
  extra_edge_column_chance?: ExtraEgdeColumnChance;
  waterlogged?: Waterlogged;
}
/**
 * 'minecraft:weighted_random_feature' randomly selects and places a feature based on a weight value. Weights are relative, with higher values making selection more likely.
 * Succeeds if: The selected feature is placed.
 * Fails if: The selected feature fails to be placed.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "DA".
 */
export interface WeightedRandomFeature {
  description: Description;
  features: Features3;
}
/**
 * `minecraft:multi_block_feature` places a multi-block in the world as a biome decoration feature. A multi-block must be defined with the 'minecraft:multi_block' trait.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "DB".
 */
export interface MultiBlockFeature {
  description: Description;
  places_block: BlockReference26;
  enforce_placement_rules?: EnforcePlacementRules1;
  randomize_rotation?: RandomizeRotation1;
  may_replace?: MayReplace3;
}
/**
 * A range.
 *
 * This interface was referenced by `Features`'s JSON-Schema
 * via the `definition` "BB_range".
 */
export interface Range1 {
  range_max: RangeMax;
  range_min: RangeMin;
  [k: string]: unknown;
}
