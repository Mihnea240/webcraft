// Engine classes and components
import type { 
  ChunkDrawDetails, 
  CanvasSize, 
  EventHandlerOptions, 
  EventHandlerData, 
  PlayerOptions, 
  InputManagerOptions, 
  TerrainSettings, 
  GridSize, 
  BitPackingData, 
  BlockStateEvents,
  Vector3Like,
  Matrix4Like,
  CameraLike,
  EulerLike,
  SceneLike,
  ClockLike
} from './core';

// Forward declarations
export interface World { }
export interface BlockModel { }
export interface BlockState { }
export interface Array3D { }
export interface BlockPallet { }
export interface ChunkMesher { }
export interface ResourceLoader { }

// GPU Manager Types
export interface ChunkPipeline {
  device: any; // WebGPU device
  module: any; // WebGPU shader module
  pipeline: any; // WebGPU render pipeline
  render_format: string;
  sample_count: number;
  
  terrain_texture: any;
  terrain_sampler: any;
  geometry_ssbo: any;
  texture_ssbo: any;
  uniform_buffer: any;
  chunk_data_buffer: any;
  quad_buffer: any;
  chunk_id_buffer: any;
  
  static_data_layout: any;
  dynamic_data_layout: any;
  static_data_bind_group: any;
  dynamic_data_bind_group: any;

  createTerrainTexture(bitmap: ImageBitmap): void;
  createBuffers(geometry_data: ArrayBuffer, texture_data: ArrayBuffer): void;
  createBindGroups(): void;
  createPipeline(): void;
  init(code: string, terrain_bitmap: ImageBitmap, geometry_data: ArrayBuffer, texture_data: ArrayBuffer): Promise<void>;
  setQuadBuffer(offset: number, buffer: ArrayBuffer, cnt: number): void;
}

export interface ChunkRenderer {
  canvas: HTMLCanvasElement;
  camera: CameraLike;
  chunk_pipeline: ChunkPipeline;
  device: any;
  canvas_size: CanvasSize;
  context: any; // WebGPU context
  
  util_uint32_array: Uint32Array;
  util_matrix: Matrix4Like;
  util_matrix_array: Float32Array;
  uniform_buffer: Float32Array;
  uniform_buffer_uint_view: Uint32Array;
  chunk_data_buffer: Float32Array;
  chunk_id_buffer: Uint32Array;
  
  depth_texture: any;
  multisample_texture: any;
  encoder: any;
  render_pass: any;
  active_pass: boolean;

  updateCanvasContext(): void;
  createRenderPass(): void;
  beginPass(time: number): void;
  setTime(time: number): void;
  setMVPMatrix(matrix: Float32Array): void;
  setChunkData(chunks: Chunk[]): void;
  updateUniforms(): void;
  renderChunk(chunk: Chunk): void;
  endPass(): void;
}

// Chunk class declaration
export declare class Chunk {
  static readonly size: number;
  static readonly RENDERED: number;
  static readonly EMPTY: number;
  static readonly PENDING: number;
  static readonly DIRTY: number;
  
  voxels: Array3D;
  voxel_to_first_quad: Array3D;
  pallet: BlockPallet;
  gpu_data: Float32Array;
  position: Float32Array;
  draw_details: ChunkDrawDetails;
  block_repaints: number[];
  status: number;
  id: number;
  world: World | null;

  constructor(x: number, y: number, z: number);
  pushRepaint(x: number, y: number, z: number): void;
  needsRepaint(): boolean;
  isEmpty(): boolean;
}

// World interface
export interface World {
  chunkMap: Map<string, Chunk>;
  resourceLoader: ResourceLoader;
  rayCaster: any; // THREE.Raycaster
  players: Player[];
  dirty_chunks: Chunk[];
  scene: SceneLike;
  chunkPipeline: ChunkPipeline;
  animateFunction: () => void;
  clock: ClockLike;
  blockModel: BlockModel;
  chunkMesher: ChunkMesher;
  Blocks: Record<string, new () => BlockState>;

  pushDirtyChunk(chunk: Chunk): void;
  getBlockRefrence(x: number, y: number, z: number): any;
  addPlayer(player: Player): void;
  removePlayer(player: Player): void;
  render(delta: number): Promise<void>;
  animate(): Promise<void>;
  createChunk(x: number, y: number, z: number): Chunk;
  addChunk(x: number, y: number, z: number): void;
  getChunk(x: number, y: number, z: number): Chunk | undefined;
  reomoveChunk(x: number, y: number, z: number): void;
  raycast(start: Vector3Like, direction: Vector3Like): any;
  doStuff(): void;
}

// Player and Controls Types
export interface Player {
  name: string;
  options: PlayerOptions;
  camera: CameraLike;
  world: World | null;
  inputManager: InputManager | null;
  renderer: ChunkRenderer;
  web_component: any;
  controls: CreativeFly;

  createRenderer(canvas: HTMLCanvasElement): void;
  setControls(canvas: HTMLCanvasElement): CreativeFly;
  setWorld(world: World): void;
  renderWorld(delta: number): Promise<void>;
  setupInputHandling(canvas: HTMLCanvasElement): void;
  addMovementShortcuts(): void;
}

export interface CreativeFly {
  camera: CameraLike;
  domElement: HTMLElement;
  speed: number;
  sensitivity: number;
  pixelRatio: number;
  
  camera_direction: Vector3Like;
  camera_right: Vector3Like;
  camera_forward: Vector3Like;
  up: Vector3Like;
  forward: Vector3Like;
  camera_euler: EulerLike;
  movementDirection: Vector3Like;

  update(deltaTime: number): void;
  updateCameraVectors(): void;
  handleMouseMove(mouseData: MouseEvent): void;
  moveForward(): void;
  moveBackward(): void;
  moveLeft(): void;
  moveRight(): void;
  moveUp(): void;
  moveDown(): void;
}

// Input Manager class declaration
export declare class InputManager {
  private _html_element: HTMLElement | null;
  html_bounds: DOMRect | null;
  eventHandlers: Map<string, EventHandlerData[]>;
  activeShortcuts: Set<string>;
  frozenShortcuts: Set<string>;
  timer: number | null;
  sequence_timeout: number;
  tickMode: 'continuous' | 'immediate';
  resizeObserver: ResizeObserver;
  
  key_pressed: (ev: KeyboardEvent) => void;
  key_released: (ev: KeyboardEvent) => void;
  mouse_moved: (ev: MouseEvent) => void;
  html_element: HTMLElement;
  emptyHandlers: any[];

  constructor(html_element: HTMLElement, options?: InputManagerOptions);
  normalizeKey(ev: KeyboardEvent): string;
  getShortcutsContainingKey(key: string): string[];
  handleKeyDown(ev: KeyboardEvent): void;
  handleKeyUp(ev: KeyboardEvent): void;
  tick(delta: number): void;
  handleMouseMove(ev: MouseEvent): void;
  handleResize(bounds: DOMRect): void;
  createThrottledFunction(fn: Function, throttleMs: number): Function;
  addEventListener(eventType: string, callback: Function, options?: EventHandlerOptions): InputManager;
  removeEventListener(eventType: string, callback: Function): InputManager;
  removeListenersOfType(eventType: string): InputManager;
  addShortcut(options: { shortcut: string; callback: Function; continuous?: boolean; triggers?: string; cooldown?: number; throttle?: number }): InputManager;
  dispose(): void;
}

// Utility Types
export interface Array3D {
  data: Uint16Array;
  x: number;
  y: number;
  z: number;

  index(x: number, y: number, z: number): number;
  get(x: number, y: number, z: number): number;
  set(x: number, y: number, z: number, value: number): void;
  fill(value: number): Uint16Array;
}

export interface MemoryPool {
  size: number;
  data: ArrayBuffer;
  freeList: any[];
}

export interface BitPacker {
  fields: Record<string, number>;
  bytes_per_bucket: number;
  class: any;

  computeClass(): void;
  createFunctionDefinitions(bucket_offset: number, bit_offset: number, bits: number): [string, string, string];
}

// Block Model Types
export interface BlockModel {
  classParser: BlockObjectParser;
  geometryRegistry: any; // GeometryRegistry
  materialRegistry: any; // MaterialRegistry
  geometry_view: any;
  transform_view: any;
  material_view: any;
  textureRegistry: any;
  Blocks: Record<string, new () => BlockState>;

  cacheResources(): void;
  getGeometryId(name: string): number;
  getMaterialId(name: string): number;
  cubes(geometry_id: number): Generator<any>;
}

export interface BlockObjectParser {
  blockModel: BlockModel;
  Blocks: Record<string, new () => BlockState>;

  getModifier(modifier_name: string, modifier_data: any): Function | undefined;
  parseJson(json_data: Record<string, any>): void;
  parseClassEntry(name: string, json_data: any): [string, new () => BlockState];
  parseConditionalBlock(context_class: any, condition_json: any): void;
  createGeometryModifier(new_geometry_name: string): Function;
  createMaterialModifier(new_material_name: string): Function;
  createPropertyModifier(property_name: string, property_value: any): Function;
  resolveValueKeyword(string: string): any;
  createConditionFunction(condition_text: string): [Function, string[]];
}

// BlockState class declaration
export declare class BlockState {
  static blockModel: BlockModel | null;
  static readonly FULL_BLOCK: number;
  static readonly FACING: number;
  static readonly PLACING: number;
  static readonly DOUBLE_SLAB: number;
  static readonly WATERLOGGED: number;
  static readonly ACTIVE: number;
  static readonly MODE: number;
  static readonly VALUE: number;
  static readonly NOTE_PITCH: number;
  static readonly GEOMETRY: number;
  static readonly MATERIAL: number;
  static bit_packing: BitPackingData[];
  static events: BlockStateEvents;

  constructor(name?: string);
  static computePackingMasks(): void;
}

export interface AtlasBuilder {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  terrain_settings: TerrainSettings;
  cell_map: Uint8Array;
  grid_size: GridSize;
  tile_padding: number;

  setCanvas(settings: any): void;
  setTerrainSettings(settings: TerrainSettings): void;
  clearCanvas(): void;
  getBitmapTileSize(bitmap: ImageBitmap, settings: any): { width: number; height: number };
  setCellMapSize(width: number, height: number): void;
  clearCellMap(): void;
  setCell(x: number, y: number, value?: number): void;
  getCell(x: number, y: number): number;
  isBounded(x: number, y: number): boolean;
  isAvailable(x: number, y: number, w?: number, h?: number): boolean;
  getAvailbleCell(x: number, y: number, w?: number, h?: number): { x: number; y: number } | null;
  fillAvailableCell(x: number, y: number, w?: number, h?: number, value?: number): void;
  copyToCanvas(image: ImageBitmap, x: number, y: number, settings: any): void;
}

export interface ResourceLoader {
  chunkPipeline: ChunkPipeline;
  blockModel: BlockModel;
  wgsl_chunk_shader_code: string;
  resorce_path: string;

  init(): Promise<void>;
  minecraftPathTrim(path: string): string;
  getFileNameFromPath(path: string): string;
  loadShaders(): Promise<void>;
  loadBlockMaterials(): Promise<any>;
  loadTerrainTexture(): Promise<any>;
  loadTextureFiles(): Promise<any>;
  loadFlipbook(): Promise<any>;
  loadGeometry(): Promise<any>;
  loadBlockClasses(): Promise<any>;
  extractTextureBitmaps(zip: any, terrain_texture: any): Promise<any>;
}

// Additional interfaces for missing types
export interface BlockPallet {
  // Add properties and methods as needed
}

export interface ChunkMesher {
  // Add properties and methods as needed
  constructor(blockModel: BlockModel, chunkPipeline: ChunkPipeline);
}

// Faces class declaration  
export declare class Faces {
	static readonly TOP: number;
	static readonly BOTTOM: number;
	static readonly NORTH: number;
	static readonly SOUTH: number;
	static readonly WEST: number;
	static readonly EAST: number;
	static readonly FRONT: number;
	static readonly BACK: number;
	
  static fromString(value: string): number;
}

// Utility functions
export function packIntegers(input_array: number[], input_element_size: number, output_byte_array: Uint8Array): void;
