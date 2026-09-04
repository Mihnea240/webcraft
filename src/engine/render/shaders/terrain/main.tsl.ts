import {
    Fn,
    float,
    instanceIndex,
    texture3D,
    uint,
    uniform,
    varying,
    vec3,
    vec4,
    vertexIndex
} from 'three/tsl';
import * as Three from 'three/webgpu';

import { ChunkDataStruct, CubeStruct, QuadStruct, TextureStruct } from '@engine/packing_schemas';
import { TSLPacker } from 'bitpacker';

import { CUBE_VERTICES_ARRAY, NORMALS_ARRAY } from './constants.tsl';
import { applyQuaternion, extractQuaternionFromPacked } from './transform.tsl';

import * as Constants from "@engine/resource_manager/constants";

export interface TerrainShaderNodes {
    quadsStorageNode: Three.StorageBufferNode<"struct">;
    cubesStorageNode: Three.StorageBufferNode<"struct">;
    texturesStorageNode: Three.StorageBufferNode<"struct">;
    chunksStorageNode: Three.StorageBufferNode<"struct">;
    terrainTexture: Three.Data3DTexture;
}

const quadOffset = uint(0); 
const chunkOffset = uint(0);
export const quadOffsetUniform = uniform(0, "uint").onObjectUpdate((frame) => {
    return frame.object!.userData?.quadOffset ?? 0;
});

export const chunkOffsetUniform = uniform(0, "uint").onObjectUpdate((frame) => {
    return frame.object!.userData?.chunkOffset ?? 0;
});

/**
 * Creates the modular Terrain Node Material in Three.js TSL using bitpacker schema extraction.
 */
export function createTerrainMaterial(nodes: TerrainShaderNodes): Three.MeshBasicNodeMaterial {
    const material = new Three.MeshBasicNodeMaterial({
        transparent: true,
        wireframe: false,
    });
    

    // Varyings passed from Vertex to Fragment stage
    const vUv3D = varying(vec3(0.0), "vUv3D");
    const vNormal = varying(vec3(0.0), "vNormal");
    // const vLighting = varying(float(1.0), "vLighting"); 

    // =========================================================================
    // 1. VERTEX STAGE (Bitpacker Schema View Extraction)
    // =========================================================================
    const vertexNode = Fn(() => {
        const quadId = quadOffset.add(instanceIndex.shiftRight(2));
        const quadView = new TSLPacker(QuadStruct, nodes.quadsStorageNode.element(quadId)).view;
        const cubeView = new TSLPacker(CubeStruct, nodes.cubesStorageNode.element(quadView.geometry_id)).view;
        const textureView = new TSLPacker(TextureStruct, nodes.texturesStorageNode.element(quadView.texture_id)).view;
        const chunkView = new TSLPacker(ChunkDataStruct, nodes.chunksStorageNode.element(chunkOffset)).view;

        const blockLocalPosition = vec3(quadView.x, quadView.y, quadView.z);
        const normalId = quadView.normal.toInt();

        const quadVertexIndex = vertexIndex.toInt().bitAnd(3);
        const baseVertex = CUBE_VERTICES_ARRAY.element(normalId.mul(4).add(quadVertexIndex));
        const quaternion = extractQuaternionFromPacked(cubeView.rotation);
        const scale = vec3(cubeView.scale[0], cubeView.scale[1], cubeView.scale[2]);
        const offset = vec3(cubeView.offset[0], cubeView.offset[1], cubeView.offset[2]);

        const transformedVertex = applyQuaternion(quaternion, baseVertex.mul(scale)).add(offset);
        const finalVertex = transformedVertex.add(blockLocalPosition);

        const u = float(textureView.atlas_u).mul(16.0 / Constants.ATLAS_DIMENSIONS[0]);
        const v = float(textureView.atlas_v).mul(16.0 / Constants.ATLAS_DIMENSIONS[1]);
        const uv = vec3(u, v, float(textureView.atlas_w));

        vUv3D.assign(uv);
         
        const normal = applyQuaternion(quaternion, NORMALS_ARRAY.element(normalId));
        vNormal.assign(normal);

        return vec4(finalVertex, 1.0);
    });


    // =========================================================================
    // 2. FRAGMENT STAGE
    // =========================================================================
    const fragmentNode = Fn(() => {
        // Sample from 3D texture atlas
        const texColor = texture3D(nodes.terrainTexture, vUv3D);

        // Apply interpolated vertex lighting & shadows
        // const finalRgb = texColor.rgb.mul(vLighting);

        return texColor;
    });

    material.positionNode = vertexNode();
    material.colorNode = fragmentNode();

    return material;
}
