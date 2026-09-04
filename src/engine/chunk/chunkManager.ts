import { ChunkRenderRegistry } from "../resource_manager/registry/chunkRenderRegistry";
import { World } from "../world";

import { ChunkDataStruct, QuadStruct } from "../packing_schemas";

import * as Constants from "@engine/resource_manager/constants";
import { struct } from "three/tsl";
import * as Three from "three/webgpu";
import { createTerrainMaterial } from "../render/shaders/terrain/main.tsl";
import { Chunk, ChunkState, getChunkSpatialKey } from "./chunk";
import { ChunkLoader } from "./chunkLoaders/base";
import { ChunkMesher } from "./mesher";

const TslQuadStruct = struct({
    data: `array<u32, ${QuadStruct.stride / 4}>`,
}, "QuadStruct");

const TslChunkDataStruct = struct({
    data: `array<u32, ${ChunkDataStruct.stride / 4}>`,
}, "ChunkDataStruct");

export class ChunkManager { 
    chunkRegistry = new ChunkRenderRegistry();
    chunkMesher = new ChunkMesher();
    chunkLoader!: ChunkLoader;

    quadBuffer: Three.StorageBufferAttribute;
    chunkBuffer: Three.StorageBufferAttribute;

    quadNode: Three.StorageBufferNode<"struct">;
    chunkNode: Three.StorageBufferNode<"struct">;

    chunkMaterial!: Three.MeshBasicNodeMaterial;

    loadedChunks = new Map<number, Chunk>();
    
    constructor(public world: World) {

        this.quadBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(Constants.INITIAL_QUAD_BUFFER_SIZE * QuadStruct.stride / 4),
            QuadStruct.stride / 4
        );

        this.chunkBuffer = new Three.StorageBufferAttribute(
            // new Uint32Array(Constants.INITIAL_CHUNK_BUFFER_SIZE * ChunkDataStruct.stride / 4),
            new Uint32Array(this.chunkRegistry.storage.buffer),
            ChunkDataStruct.stride / 4
        );

        this.quadNode = new Three.StorageBufferNode(this.quadBuffer, TslQuadStruct);
        this.chunkNode = new Three.StorageBufferNode(this.chunkBuffer, TslChunkDataStruct);

        this.initMaterial();
    }

    initMaterial() {
        this.chunkMaterial = new Three.MeshBasicNodeMaterial({
            transparent: true,
            wireframe: false,
        });
        
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
                }
                if (meta?.geometry && !meta.geometry.index) {
                    meta.geometry.setIndex(pipeline.indexBuffer);
                }
            }
        }
    }


    getChunkAt(x: number, y: number, z: number): Chunk | undefined {
        const hash = getChunkSpatialKey(x, y, z);
        return this.loadedChunks.get(hash);
    }

    getWorldPositionChunk(x: number, y: number, z: number): Chunk | undefined {
        const chunkX = Math.floor(x / Constants.CHUNK_SIZE);
        const chunkY = Math.floor(y / Constants.CHUNK_SIZE);
        const chunkZ = Math.floor(z / Constants.CHUNK_SIZE);

        return this.getChunkAt(chunkX, chunkY, chunkZ);
    }

    addChunk(chunk: Chunk) {
        const hash = chunk.getHash();
        this.loadedChunks.set(hash, chunk);
    }

    removeChunk(chunk: Chunk) {
        const hash = chunk.getHash();
        this.chunkRegistry.unregisterChunk(chunk);
        this.loadedChunks.delete(hash);
    }

    meshChunks() {
        const pipeline = this.world.resourcePack?.pipeline;
        const scene = this.world.sceneManager.scene;
        let meshedCount = 0;

        for (const chunk of this.loadedChunks.values()) {
            const dirty = chunk.status === ChunkState.Dirty;
            
            if (dirty) {
                meshedCount++;
                this.chunkMesher.setChunk(chunk);
                const quadBuffer = this.chunkMesher.mesh();

                chunk.status = ChunkState.Meshed;
                const size = quadBuffer.byteLength / QuadStruct.stride;
                const chunkId =  this.chunkRegistry.registerChunk(chunk, size);
                const meta = this.chunkRegistry.getMeta(chunkId);

                this.quadBuffer.set(quadBuffer, meta.quadOffset * QuadStruct.stride / 4);
                
                this.quadBuffer.addUpdateRange(meta.quadOffset * QuadStruct.stride / 4, size * QuadStruct.stride / 4);
                if (size > 0) {
                    this.quadBuffer.set(quadBuffer, meta.quadOffset * QuadStruct.stride / 4);
                    this.quadBuffer.addUpdateRange(meta.quadOffset * QuadStruct.stride / 4, size * QuadStruct.stride / 4);
                }
                this.chunkBuffer.addUpdateRange(chunkId * ChunkDataStruct.stride / 4, ChunkDataStruct.stride / 4);

                // Manage Three.Mesh and BufferGeometry via ChunkMeshMetadata
                if (!meta.mesh) {
                    const geometry = new Three.BufferGeometry();
                    if (pipeline) {
                        geometry.setIndex(pipeline.indexBuffer);
                    }
                    geometry.boundingBox = new Three.Box3(
                        new Three.Vector3(0, 0, 0),
                        new Three.Vector3(Constants.CHUNK_SIZE, Constants.CHUNK_SIZE, Constants.CHUNK_SIZE)
                    );

                    const mesh = new Three.Mesh(geometry, this.chunkMaterial);
                    const [cx, cy, cz] = chunk.worldPosition;
                    mesh.position.set(
                        cx * Constants.CHUNK_SIZE,
                        cy * Constants.CHUNK_SIZE,
                        cz * Constants.CHUNK_SIZE
                    );

                    meta.geometry = geometry;
                    meta.mesh = mesh;
                    scene.add(mesh);
                } else if (meta.geometry && pipeline && !meta.geometry.index) {
                    meta.geometry.setIndex(pipeline.indexBuffer);
                }

                meta.mesh.userData.quadOffset = meta.quadOffset;
                meta.mesh.userData.chunkOffset = chunkId;
                meta.geometry!.setDrawRange(0, size * 6);
                meta.mesh.visible = size > 0;
            }
        }

        if (meshedCount > 0) {
            this.quadBuffer.needsUpdate = true;
            this.chunkBuffer.needsUpdate = true;
        }
    }
}