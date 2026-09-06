import {
    Fn,
    color,
    float,
    uint,
    uniform,
    varying,
    vec3,
    vertexIndex
} from 'three/tsl';
import * as Three from 'three/webgpu';

import { ChunkDataStruct, CubeStruct, QuadStruct, TextureStruct } from '@engine/packing_schemas';
import { TSLPacker } from 'bitpacker';

import { CUBE_VERTICES_ARRAY } from './constants.tsl';

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
        transparent: false,
        wireframe: false,
        side: Three.DoubleSide,
    });
    

    // Varyings passed from Vertex to Fragment stage
    const vUv3D = varying(vec3(0.0), "vUv3D");
    const vNormal = varying(vec3(0.0), "vNormal");
    // const vLighting = varying(float(1.0), "vLighting"); 

    // =========================================================================
    // 1. VERTEX STAGE (Bitpacker Schema View Extraction)
    // =========================================================================
    const vertexNode = Fn(() => {
        const quadId = quadOffsetUniform.add(vertexIndex.shiftRight(2)).toConst();
        const quadData = nodes.quadsStorageNode.element(quadId).get('data');
        const quadView = new TSLPacker(QuadStruct, quadData).view;

        const blockLocalPosition = vec3(quadView.x, quadView.y, quadView.z).toConst();
        const normalId = quadView.normal.toInt().toConst();
        const geometryId = quadView.geometry_id.toConst();
        const textureId = quadView.texture_id.toConst();

        const cubeData = nodes.cubesStorageNode.element(geometryId).get('data');
        const cubeView = new TSLPacker(CubeStruct, cubeData).view;

        const textureData = nodes.texturesStorageNode.element(textureId).get('data');
        const textureView = new TSLPacker(TextureStruct, textureData).view;

        const chunkData = nodes.chunksStorageNode.element(chunkOffsetUniform).get('data');
        const chunkView = new TSLPacker(ChunkDataStruct, chunkData).view;

        const quadVertexIndex = vertexIndex.toInt().bitAnd(3).toConst();
        const baseVertex = CUBE_VERTICES_ARRAY.element(normalId.mul(4).add(quadVertexIndex)).toConst();
        // const quaternion = extractQuaternionFromPacked(cubeView.rotation).toConst();
        const scale = vec3(cubeView.scale.get(0), cubeView.scale.get(1), cubeView.scale.get(2)).toConst();
        const offset = vec3(cubeView.offset.get(0), cubeView.offset.get(1), cubeView.offset.get(2)).toConst();

        // const transformedVertex = applyQuaternion(quaternion, baseVertex.mul(scale)).add(offset).toConst();
        // const finalVertex = transformedVertex.add(blockLocalPosition).toConst();

        const u = float(textureView.atlas_u).mul(16.0 / Constants.ATLAS_DIMENSIONS[0]).toConst();
        const v = float(textureView.atlas_v).mul(16.0 / Constants.ATLAS_DIMENSIONS[1]).toConst();
        const w = float(textureView.atlas_w).toConst();
        const uv = vec3(u, v, w).toConst();

        vUv3D.assign(uv);
         
        // const normal = applyQuaternion(quaternion, NORMALS_ARRAY.element(normalId)).toConst();
        // vNormal.assign(normal);
 
        return baseVertex.add(blockLocalPosition).toConst(); // finalVertex
    });


    // =========================================================================
    // 2. FRAGMENT STAGE
    // =========================================================================
    const fragmentNode = Fn(() => {
        // Sample from 3D texture atlas
        // const texColor = texture3D(nodes.terrainTexture, vUv3D);

        // Apply interpolated vertex lighting & shadows
        // const finalRgb = texColor.rgb.mul(vLighting);

        return color(0); // Visible white color for test
    });

    const testVertexNode = Fn(() => {
        const quadId = quadOffsetUniform.add(vertexIndex.shiftRight(2)).toConst();
        const quadData = nodes.quadsStorageNode.element(quadId).get('data');
        const quadView = new TSLPacker(QuadStruct, quadData).view;

        const blockLocalPosition = vec3(quadView.x, quadView.y, quadView.z).toConst();
        const normalId = quadView.normal.toUint().toConst();

        const cubeVertex = CUBE_VERTICES_ARRAY.element(normalId.mul(4).add(vertexIndex.bitAnd(3))).toConst();
        const finalVertex = cubeVertex.add(blockLocalPosition).toConst();

        return finalVertex;
    });

    material.positionNode = vertexNode();
    // material.positionNode = testVertexNode();
    material.colorNode = fragmentNode();

    return material;
}
