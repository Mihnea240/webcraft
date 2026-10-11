// Constants and settings types
export interface ChunkSettings {
  readonly BYTES_PER_QUAD_INSTANCE: number;
  readonly BYTES_PER_CHUNK_ID: number;
  readonly ELEMENTS_PER_QUAD: number;
  readonly ELEMENTS_PER_UNIFORM: number;
  readonly BYTES_PER_CHUNK_DATA_BUFFER: number;
  readonly WORLD_CNT: number;
  readonly ELEMENTS_PER_CHUNK_DATA: number;
  readonly BYTES_PER_CHUNK_DATA: number;
}

// Voxel DDA types
export interface VoxelDDA {
  // Add voxel DDA ray tracing properties and methods
  raycast(start: number[], direction: number[], maxDistance: number): any;
}

// Constants module declarations
export declare const ChunkSettings: ChunkSettings;
