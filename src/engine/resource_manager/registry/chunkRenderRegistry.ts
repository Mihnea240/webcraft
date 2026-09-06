import { InferCPUType } from "bitpacker";
import { BufferStorageUnit } from "../memory_management/bufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

import { Chunk } from "src/engine/chunk";
import { ChunkDataStruct } from "src/engine/packing_schemas";
import { BlockAllocator } from "src/engine/utils/blockAllocator";
import * as Three from "three/webgpu";

import * as Constants from "../constants";

export type ChunkDescriptor = InferCPUType<typeof ChunkDataStruct>;

export interface ChunkMeshMetadata {
    /** Starting index in the GPU Quad Megabuffer */
    quadOffset: number;
    /** Number of active quads to draw */
    quadCount: number;
    chunk: Chunk;
    mesh?: Three.Mesh;
    geometry?: Three.BufferGeometry;
}

/**
 * World-scoped registry holding subchunk spatial GPU data (world positions, biomes)
 * and managing quad buffer slab allocations.
 */
export class ChunkRenderRegistry extends ResourceRegistry<ChunkDescriptor, ChunkMeshMetadata, number> {
    declare public storage: BufferStorageUnit<typeof ChunkDataStruct, ChunkMeshMetadata>;

    public blockAllocator = new BlockAllocator(
        Constants.QUAD_BUFFER_BLOCK_SIZE,
        Constants.INITIAL_QUAD_BUFFER_SIZE / Constants.QUAD_BUFFER_BLOCK_SIZE
    );

    createStorageUnit(): BufferStorageUnit<typeof ChunkDataStruct, ChunkMeshMetadata> {
        return new BufferStorageUnit(
            ChunkDataStruct,
            Constants.INITIAL_CHUNK_BUFFER_SIZE / 4, // 4096 chunks
            true
        );
    }

    /**
     * Registers a subchunk's world position and biome into the GPU buffer and spatial map.
     */
    public registerChunk(chunk: Chunk, quadCount: number = 0) {
        const spatialKey = chunk.getHash();
        const [cx, cy, cz] = chunk.worldPosition;
        let chunkId = this.keyToId(spatialKey);

        //TODO: Add more complex data in the future
        const chunkData = {
            x: cx,
            y: cy,
            z: cz,
        }

        if (chunkId === undefined) {
            const size = Math.ceil(quadCount / Constants.QUAD_BUFFER_BLOCK_SIZE);
            const blockStart = this.blockAllocator.allocate(size);

            chunkId = this.push(spatialKey, chunkData, {
                quadOffset: blockStart * Constants.QUAD_BUFFER_BLOCK_SIZE,
                quadCount,
                chunk
            });
        } else {
            const meta = this.getMeta(chunkId);
            const newSize = Math.ceil(quadCount / Constants.QUAD_BUFFER_BLOCK_SIZE);
            const oldSize = Math.ceil(meta.quadCount / Constants.QUAD_BUFFER_BLOCK_SIZE);

            if (newSize > oldSize) {
                this.blockAllocator.free(meta.quadOffset / Constants.QUAD_BUFFER_BLOCK_SIZE, oldSize);
                const blockStart = this.blockAllocator.allocate(newSize);

                meta.quadOffset = blockStart * Constants.QUAD_BUFFER_BLOCK_SIZE;
                meta.quadCount = quadCount;
            }
            this.set(chunkId, chunkData);
        }

        return chunkId;
    }

    unregisterChunk(chunk: Chunk) {
        const spatialKey = chunk.getHash();
        const chunkId = this.keyToId(spatialKey);

        if (chunkId === undefined) {
            return false;
        }

        const meta = this.getMeta(chunkId);
        if (meta.mesh) {
            meta.mesh.removeFromParent();
            meta.mesh.geometry.dispose();
            meta.mesh = undefined;
        }

        const size = Math.ceil(meta.quadCount / Constants.QUAD_BUFFER_BLOCK_SIZE);
        this.blockAllocator.free(meta.quadOffset / Constants.QUAD_BUFFER_BLOCK_SIZE, size);

        const movedKey = this.pop(chunkId);
        if (movedKey !== undefined) {
            // A chunk was moved into slot chunkId from the end
            const movedMeta = this.getMeta(chunkId);
            if (movedMeta?.mesh) {
                movedMeta.mesh.userData.chunkOffset = chunkId;
            }
        }

        return true;
    }
}

