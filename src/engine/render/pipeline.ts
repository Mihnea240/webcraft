import * as Three from 'three/webgpu';

import { AtlasRegistry } from '../resource_manager/registry/atlasRegistry';
import { BlockTextureRegistry } from '../resource_manager/registry/blockTextureRegistry';
import { CubeGeometryRegistry } from '../resource_manager/registry/cubeGeometryRegistry';
import { ResourcePack } from '../resource_manager/RP';

import * as Constants from "@engine/resource_manager/constants";
import { storage, struct } from 'three/tsl';

import { ChunkDataStruct, CubeStruct, QuadStruct, RandomOffsetStruct, TextureStruct } from '../packing_schemas';

export const TslCubeStruct = struct({
    data: `array<u32, ${CubeStruct.stride / 4}>`,
}, "CubeStruct");

export const TslTextureStruct = struct({
    data: `array<u32, ${TextureStruct.stride / 4}>`,
}, "TextureStruct");

export const TslChunkDataStruct = struct({
    data: `array<u32, ${ChunkDataStruct.stride / 4}>`,
}, "ChunkDataStruct");

export const TslRandomOffsetStruct = struct({
    data: `array<u32, ${RandomOffsetStruct.stride / 4}>`,
}, "RandomOffsetStruct");

export const TslQuadStruct = struct({
    data: `array<u32, ${QuadStruct.stride / 4}>`,
}, "QuadStruct");


export class RenderPipeline {
    // --- GPU Storage Attributes & TSL Storage Nodes ---
    public quadBuffer!: Three.StorageBufferAttribute;
    public quadsNode!: Three.StorageBufferNode<"struct">;

    public cubeBuffer!: Three.StorageBufferAttribute;
    public cubesNode!: Three.StorageBufferNode<"struct">;

    public textureDescriptorsBuffer!: Three.StorageBufferAttribute;
    public textureDescriptorsNode!: Three.StorageBufferNode<"struct">;

    public chunkBuffer!: Three.StorageBufferAttribute;
    public chunksNode!: Three.StorageBufferNode<"struct">;

    // Color & MERS Atlas Texture Bindings
    public terrainTexture!: Three.Data3DTexture;

    public indexBuffer!: Three.BufferAttribute;

    constructor(
        public resourcePack: ResourcePack,
    ) {
        const blockTextureRegistry = this.resourcePack.get(BlockTextureRegistry);
        const cubeGeometryRegistry = this.resourcePack.get(CubeGeometryRegistry);
        const atlasRegistry = this.resourcePack.get(AtlasRegistry);

        // 1. Storage Buffers wrapping the shared StorageUnit ArrayBuffers
        this.cubeBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(cubeGeometryRegistry.storage.buffer), 
            CubeStruct.stride / 4
        );
        this.cubesNode = storage(this.cubeBuffer, TslCubeStruct, this.cubeBuffer.count * 4);

        this.textureDescriptorsBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(blockTextureRegistry.storage.buffer), 
            TextureStruct.stride / 4
        );

        this.textureDescriptorsNode = storage(
            this.textureDescriptorsBuffer,
            TslTextureStruct,
            this.textureDescriptorsBuffer.count * 4
        );



        // 2. Atlas Texture Binding
        const [atlasWidth, atlasHeight] = Constants.ATLAS_DIMENSIONS;
        const layerSize = atlasWidth * atlasHeight * 4;
        const colorData = new Uint8Array(atlasRegistry.atlasBuffer, 0, layerSize);
        const layers = atlasRegistry.atlasBuffer.byteLength / layerSize;

        this.terrainTexture = new Three.Data3DTexture(
            colorData,
            atlasWidth,
            atlasHeight,
            layers
        );

        this.terrainTexture.minFilter = Three.NearestFilter;
        this.terrainTexture.magFilter = Three.NearestFilter;
        this.terrainTexture.generateMipmaps = true;
        this.terrainTexture.needsUpdate = true;

        this.indexBuffer = this.createIndexBuffer(1000);
        this.indexBuffer = this.createIndexBuffer(Constants.QUAD_BUFFER_BLOCK_SIZE);
        this.indexBuffer.needsUpdate = true;
    }

    createIndexBuffer(quadCount: number) {
        const buffer = new Uint32Array(quadCount * 6);
        for (let i = 0; i < quadCount; i++) {
            const baseIndex = i * 6;
            const vertexBase = i * 4;
            buffer[baseIndex + 0] = vertexBase + 0;
            buffer[baseIndex + 1] = vertexBase + 1;
            buffer[baseIndex + 2] = vertexBase + 2;
            buffer[baseIndex + 3] = vertexBase + 0;
            buffer[baseIndex + 4] = vertexBase + 2;
            buffer[baseIndex + 5] = vertexBase + 3;
        }

        return new Three.BufferAttribute(buffer, 1);
    }

    /**
     * Precompiles the WebGPU render pipeline in the background using a dummy camera.
     */
    public async precompile(renderer: Three.WebGPURenderer, material: Three.MeshBasicNodeMaterial): Promise<void> {
        const dummyGeometry = new Three.BufferGeometry();
        const dummyMesh = new Three.Mesh(dummyGeometry, material);
        const dummyCamera = new Three.PerspectiveCamera();

        await renderer.compileAsync(dummyMesh, dummyCamera);
        console.log("[RenderPipeline] WebGPU render pipeline pre-compiled in background.");
    }
}