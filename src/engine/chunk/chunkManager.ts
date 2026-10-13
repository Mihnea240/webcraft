import { ChunkRenderRegistry } from "../resource_manager/registry/chunkRenderRegistry";
import { World } from "../world";

import { ChunkDataStruct, QuadStruct } from "../packing_schemas";

import * as Constants from "@engine/resource_manager/constants";
import { createTerrainMaterial } from "../render/shaders/terrain/main.tsl";
import { Chunk, ChunkState, getChunkSpatialKey } from "./chunk";
import { ChunkLoader } from "./chunkLoaders/base";
import { ChunkMesher } from "./mesher";

import * as Three from 'three/webgpu';

import { TslChunkDataStruct, TslQuadType } from "../render/pipeline";
import Faces from "../utils/faces";

const ChunkBoundingBox = new Three.Box3(
    new Three.Vector3(0, 0, 0),
    new Three.Vector3(Constants.CHUNK_SIZE, Constants.CHUNK_SIZE, Constants.CHUNK_SIZE)
);

export class ChunkManager { 
    chunkRegistry = new ChunkRenderRegistry();
    chunkMesher = new ChunkMesher();
    chunkLoader!: ChunkLoader;

    quadBuffer: Three.StorageBufferAttribute;
    chunkBuffer: Three.StorageBufferAttribute;

    quadNode: Three.StorageBufferNode<typeof TslQuadType>;
    chunkNode: Three.StorageBufferNode<typeof TslChunkDataStruct>;

    chunkMaterial!: Three.MeshBasicNodeMaterial;

    loadedChunks = new Map<number, Chunk>();
    dirtyChunks = new Set<Chunk>();
    
    constructor(public world: World) {

        this.quadBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(Constants.INITIAL_QUAD_BUFFER_SIZE * QuadStruct.bucketStride),
            QuadStruct.bucketStride
        );

        this.chunkBuffer = new Three.StorageBufferAttribute(
            // new Uint32Array(Constants.INITIAL_CHUNK_BUFFER_SIZE * ChunkDataStruct.bucketStride),
            new Uint32Array(this.chunkRegistry.storage.buffer),
            ChunkDataStruct.bucketStride
        );

        this.quadNode = new Three.StorageBufferNode(this.quadBuffer, TslQuadType);
        this.chunkNode = new Three.StorageBufferNode(this.chunkBuffer, TslChunkDataStruct);

        this.initMaterial();
    }

    initMaterial() {
        const pipeline = this.world.resourcePack?.pipeline;
        if (!pipeline) return;

        this.chunkMaterial = createTerrainMaterial({
            quadsStorageNode: this.quadNode,
            chunksStorageNode: this.chunkNode,
            cubesStorageNode: pipeline.cubesNode,
            texturesStorageNode: pipeline.textureDescriptorsNode,
            terrainTexture: pipeline.terrainTexture,
        });

        // Update existing chunk meshes if material was initialized after chunk registration
        for (const chunk of this.loadedChunks.values()) {
            const chunkId = this.chunkRegistry.keyToId(chunk.getHash());
            if (chunkId !== undefined) {
                const meta = this.chunkRegistry.getMeta(chunkId);
                if (meta?.mesh) {
                    meta.mesh.material = this.chunkMaterial;
                    meta.mesh.geometry.setIndex(pipeline.indexBuffer);
                }
            }
        }
    }

    getChunkNeighbors(chunk: Chunk): (Chunk | undefined)[] {
        const [x, y, z] = chunk.worldPosition;
        return Faces.Normals.map(([dx, dy, dz]) => this.getChunkAt(x + dx, y + dy, z + dz));
    }


    getChunkAt(x: number, y: number, z: number): Chunk | undefined {
        const hash = getChunkSpatialKey(x, y, z);
        return this.loadedChunks.get(hash);
    }

    get(x: number, y: number, z: number): Chunk | undefined {
        return this.getChunkAt(x, y, z);
    }

    getWorldPositionChunk(x: number, y: number, z: number): Chunk | undefined {
        const chunkX = Math.floor(x / Constants.CHUNK_SIZE);
        const chunkY = Math.floor(y / Constants.CHUNK_SIZE);
        const chunkZ = Math.floor(z / Constants.CHUNK_SIZE);

        return this.getChunkAt(chunkX, chunkY, chunkZ);
    }

    markDirty(chunk: Chunk) {
        this.dirtyChunks.add(chunk);
    }

    addChunk(chunk: Chunk) {
        const hash = chunk.getHash();
        this.loadedChunks.set(hash, chunk);
    }

    removeChunk(chunk: Chunk) {
        this.dirtyChunks.delete(chunk);
        const hash = chunk.getHash();
        this.chunkRegistry.unregisterChunk(chunk);
        this.loadedChunks.delete(hash);
    }

    meshChunks(budget?: number) {
        if (this.dirtyChunks.size === 0) return;
        console.log(`[ChunkManager] Meshing ${this.dirtyChunks.size} dirty chunks...`);

        const pipeline = this.world.resourcePack?.pipeline;
        const scene = this.world.sceneManager.scene;
        let meshedCount = 0;

        for (const chunk of this.dirtyChunks) {
            this.dirtyChunks.delete(chunk);

            if (chunk.status !== ChunkState.Dirty) {
                continue;
            }

            meshedCount++;
            this.chunkMesher.setChunk(chunk);
            const quadBuffer = this.chunkMesher.mesh();

            chunk.status = ChunkState.Meshed;
            const size = quadBuffer.length / QuadStruct.bucketStride;
            const chunkId = this.chunkRegistry.registerChunk(chunk, size);
            const meta = this.chunkRegistry.getMeta(chunkId);

            if (size > 0) {
                this.quadBuffer.set(quadBuffer, meta.quadOffset * QuadStruct.bucketStride);
                this.quadBuffer.addUpdateRange(meta.quadOffset * QuadStruct.bucketStride, size * QuadStruct.bucketStride);
            }
            this.chunkBuffer.addUpdateRange(chunkId * ChunkDataStruct.bucketStride, ChunkDataStruct.bucketStride);

            // Manage Three.Mesh and BufferGeometry via ChunkMeshMetadata
            if (!meta.mesh) {
                const geometry = new Three.BufferGeometry();
                geometry.setIndex(pipeline.indexBuffer);
                geometry.boundingBox = ChunkBoundingBox;

                const mesh = new Three.Mesh(geometry, this.chunkMaterial);
                mesh.frustumCulled = false; 
                const [cx, cy, cz] = chunk.worldPosition;
                mesh.position.set(cx, cy, cz).multiplyScalar(Constants.CHUNK_SIZE);

                meta.mesh = mesh;
                scene.add(mesh);
            } else {
                meta.mesh.geometry.setIndex(pipeline.indexBuffer);
            }

            meta.mesh.userData.quadOffset = meta.quadOffset;
            meta.mesh.userData.chunkOffset = chunkId;
            meta.mesh.geometry.setDrawRange(0, size * 6);
            meta.mesh.visible = size > 0;

            if (budget !== undefined && meshedCount >= budget) {
                break;
            }
        }

        if (meshedCount > 0) {
            this.quadBuffer.needsUpdate = true;
            this.chunkBuffer.needsUpdate = true;
        }
    }
}