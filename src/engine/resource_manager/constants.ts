

//Atlas and textures
export const ATLAS_DIMENSIONS = [2048, 2048];
export const INITIAL_ATLAS_SIZE = ATLAS_DIMENSIONS[0] * ATLAS_DIMENSIONS[1] * 2 * 4; // 2 4096x4096 RGBA texture
export const MAX_ATLAS_LAYERS = 64;
export const MAX_ATLAS_SIZE = ATLAS_DIMENSIONS[0] * ATLAS_DIMENSIONS[1] * 4 * MAX_ATLAS_LAYERS;

export const INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE = 4096 * 2; // 4096 descriptors, 2 bytes each
export const MAX_TEXTURE_DESCRIPTOR_COUNT = 65536 * 2; // 65536 descriptors, 2 bytes each

//Quad limits
export const INITIAL_QUAD_BUFFER_SIZE = 2_000_000 * 4; // 2 million quads, 4 u32s each
export const QUAD_BUFFER_BLOCK_SIZE = 4096; //4096 or 256 quads units for the allocator

//Chunk limits
export const CHUNK_SIZE = 16;
export const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;
export const INITIAL_CHUNK_BUFFER_SIZE = 4096 * 4; // 4096 chunks, 4 u32s each