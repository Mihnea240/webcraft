// Core engine types

export interface ChunkDrawDetails {
  quad_offset: number;
  quad_cnt: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface EventHandlerOptions {
  throttle?: number;
  continuous?: boolean;
  triggers?: string;
  cooldown?: number;
  freeze?: boolean;
}

export interface EventHandlerData extends EventHandlerOptions {
  callback: (...args: any[]) => void;
  originalCallback: (...args: any[]) => void;
  composed: boolean;
}

export interface PlayerOptions {
  tickMode?: 'continuous' | 'immediate';
  [key: string]: any;
}

export interface InputManagerOptions {
  tickMode?: 'continuous' | 'immediate';
}

export interface TerrainSettings {
  cell_width: number;
  cell_height: number;
  padding: number;
  width: number;
  height: number;
}

export interface GridSize {
  width: number;
  height: number;
}

export interface BitPackingData {
  0: number; // size in bits
  1: number; // mask
}

export interface BlockStateEvents {
  [index: number]: Array<() => void>;
}

// Vector3-like interface to avoid THREE.js dependency conflicts
export interface Vector3Like {
  x: number;
  y: number;
  z: number;
  set(x: number, y: number, z: number): Vector3Like;
}

export interface Matrix4Like {
  elements: number[];
  toArray(array: Float32Array): Float32Array;
  multiplyMatrices(a: any, b: any): Matrix4Like;
}

export interface CameraLike {
  position: Vector3Like;
  projectionMatrix: Matrix4Like;
  matrixWorldInverse: Matrix4Like;
  matrixAutoUpdate: boolean;
  lookAt(target: Vector3Like): void;
  updateProjectionMatrix(): void;
  getWorldDirection(target?: Vector3Like): Vector3Like;
}

export interface EulerLike {
  x: number;
  y: number;
  z: number;
}

export interface SceneLike {
  // Add scene properties as needed
}

export interface ClockLike {
  getDelta(): number;
  getElapsedTime(): number;
}
