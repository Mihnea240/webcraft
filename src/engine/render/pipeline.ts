import * as Three from 'three/webgpu';

import { AtlasRegistry } from '../resource_manager/registry/atlasRegistry';
import { BlockTextureRegistry } from '../resource_manager/registry/blockTextureRegistry';
import { CubeGeometryRegistry } from '../resource_manager/registry/cubeGeometryRegistry';
import { ResourcePack } from '../resource_manager/RP';

import * as Constants from "@engine/resource_manager/constants";
import { storage, struct, texture3D, uv, vec3 } from 'three/tsl';

import { ChunkDataStruct, CubeStruct, QuadStruct, RandomOffsetStruct, TextureStruct } from '../packing_schemas';

export const TslCubeStruct = struct({
    data: `array<u32, ${CubeStruct.bucketStride}>`,
}, "CubeStruct");

export const TslTextureStruct = struct({
    data: `array<u32, ${TextureStruct.bucketStride}>`,
}, "TextureStruct");

export const TslChunkDataStruct = struct({
    data: `array<u32, ${ChunkDataStruct.bucketStride}>`,
}, "ChunkDataStruct");

export const TslRandomOffsetStruct = struct({
    data: `array<u32, ${RandomOffsetStruct.bucketStride}>`,
}, "RandomOffsetStruct");

export const TslQuadStruct = struct({
    data: `array<u32, ${QuadStruct.bucketStride}>`,
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
    // public dummyPositionBuffer: Three.BufferAttribute;

    constructor(
        public resourcePack: ResourcePack,
    ) {
        // this.dummyPositionBuffer = new Three.BufferAttribute(new Float32Array(Constants.QUAD_BUFFER_BLOCK_SIZE * 4 * 3), 3);

        // 1. Initial minimal stubs (1 element each, total <60 bytes) allowing WebGPU
        // pipeline precompilation to run immediately in parallel with the background worker
        this.cubeBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(CubeStruct.bucketStride), 
            CubeStruct.bucketStride
        );
        this.cubesNode = storage(this.cubeBuffer, TslCubeStruct, 4);

        this.textureDescriptorsBuffer = new Three.StorageBufferAttribute(
            new Uint32Array(TextureStruct.bucketStride), 
            TextureStruct.bucketStride
        );
        this.textureDescriptorsNode = storage(
            this.textureDescriptorsBuffer,
            TslTextureStruct,
            4
        );

        // 2. Initial 3D atlas texture matching target atlas dimensions
        const [atlasWidth, atlasHeight] = Constants.ATLAS_DIMENSIONS;
        const defaultLayers = 2;
        this.terrainTexture = new Three.Data3DTexture(
            new Uint8Array(atlasWidth * atlasHeight * defaultLayers * 4),
            atlasWidth,
            atlasHeight,
            defaultLayers
        );
        this.terrainTexture.minFilter = Three.NearestFilter;
        this.terrainTexture.magFilter = Three.NearestFilter;
        this.terrainTexture.generateMipmaps = false;
        this.terrainTexture.needsUpdate = true;

        this.indexBuffer = this.createIndexBuffer(Constants.QUAD_BUFFER_BLOCK_SIZE);
        this.indexBuffer.needsUpdate = true;
    }

    /**
     * Directly binds decoded binary buffers from registries into the GPU storage nodes (zero-copy).
     * The shader pipeline is already precompiled, so this updates bindings without recompilation.
     */
    public syncFromRegistries(): void {
        const blockTextureRegistry = this.resourcePack.get(BlockTextureRegistry);
        const cubeGeometryRegistry = this.resourcePack.get(CubeGeometryRegistry);
        const atlasRegistry = this.resourcePack.get(AtlasRegistry);

        // 1. Direct zero-copy wrap of cube geometries
        const cubeBuf = cubeGeometryRegistry.storage.buffer;
        if (cubeBuf.byteLength > 0) {
            this.cubeBuffer = new Three.StorageBufferAttribute(
                new Uint32Array(cubeBuf),
                CubeStruct.bucketStride
            );
            this.cubesNode.value = this.cubeBuffer;
        }

        // 2. Direct zero-copy wrap of texture descriptors
        const textBuf = blockTextureRegistry.storage.buffer;
        if (textBuf.byteLength > 0) {
            this.textureDescriptorsBuffer = new Three.StorageBufferAttribute(
                new Uint32Array(textBuf),
                TextureStruct.bucketStride
            );
            this.textureDescriptorsNode.value = this.textureDescriptorsBuffer;
        }

        // 3. Direct wrap of 3D atlas texture
        const [atlasWidth, atlasHeight] = Constants.ATLAS_DIMENSIONS;
        const layerSize = atlasWidth * atlasHeight * 4;
        const layers = Math.max(1, Math.floor(atlasRegistry.atlasBuffer.byteLength / layerSize));
        const colorData = new Uint8Array(atlasRegistry.atlasBuffer, 0, Math.min(atlasRegistry.atlasBuffer.byteLength, layerSize * layers));

        if (this.terrainTexture.image.width !== atlasWidth ||
            this.terrainTexture.image.height !== atlasHeight ||
            this.terrainTexture.image.depth !== layers) {
            this.terrainTexture.dispose();
        }

        this.terrainTexture.image = { data: colorData, width: atlasWidth, height: atlasHeight, depth: layers };
        this.terrainTexture.needsUpdate = true;
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
     * Precompiles the WebGPU render pipeline in the background using a dummy camera and geometry.
     * If scene is provided, dummyMesh is compiled inside the scene context with the scene's lights.
     */
    public async precompile(
        renderer: Three.WebGPURenderer,
        material: Three.MeshBasicNodeMaterial,
        scene?: Three.Scene,
        camera?: Three.Camera
    ): Promise<void> {
        const dummyGeometry = new Three.BufferGeometry();
        dummyGeometry.setIndex(this.indexBuffer);
        const dummyMesh = new Three.Mesh(dummyGeometry, material);
        const dummyCamera = camera ?? new Three.PerspectiveCamera();

        // 1. Build and log the generated WGSL shaders for inspection
        try {
            const builder = new Three.WGSLNodeBuilder(dummyMesh, renderer) as any;
            builder.camera = dummyCamera;
            builder.build();
            console.groupCollapsed("[RenderPipeline] Generated Terrain WGSL Shaders");
            console.log("=== VERTEX SHADER ===\n" + builder.vertexShader);
            console.log("=== FRAGMENT SHADER ===\n" + builder.fragmentShader);
            console.groupEnd();
        } catch (e) {
            console.warn("[RenderPipeline] Could not generate preview WGSL:", e);
        }

        if (scene) {
            scene.add(dummyMesh);
            await renderer.compileAsync(scene, dummyCamera);
            scene.remove(dummyMesh);
        } else {
            await renderer.compileAsync(dummyMesh, dummyCamera);
        }
        console.log("[RenderPipeline] WebGPU render pipeline pre-compiled in background.");
    }

    /**
     * Creates a material that displays a specific layer of the bound terrain 3D atlas texture.
     * @param layer Layer index (0 for Color atlas, 1 for MERS atlas)
     */
    public createAtlasPlaneMaterial(layer: number = 0): Three.MeshBasicNodeMaterial {
        const material = new Three.MeshBasicNodeMaterial();
        const layerCoord = layer === 0 ? 0.0 : 1.0;
        material.colorNode = texture3D(this.terrainTexture, vec3(uv().x, uv().y.oneMinus(), layerCoord));
        return material;
    }
}