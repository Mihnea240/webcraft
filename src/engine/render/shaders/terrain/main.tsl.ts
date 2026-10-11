import {
    Fn,
    If,
    sRGBTransferEOTF,
    texture3D,
    uint,
    uniform,
    varying,
    vec2,
    vec3,
    vertexIndex
} from 'three/tsl';
import * as Three from 'three/webgpu';

import {
    cubePacker,
    quadPacker,
    texturePacker,
    TslChunkDataStruct,
    TslQuadType,
    TslTextureType
} from '../../pipeline';

import { CUBE_VERTICES_ARRAY, NORMALS_ARRAY, QUAD_UVS_ARRAY } from './constants.tsl';

import * as Constants from "@engine/resource_manager/constants";
import { applyQuaternion, extractQuaternionFromPacked } from './transform.tsl';

export interface TerrainShaderNodes {
    quadsStorageNode: Three.StorageBufferNode<typeof TslQuadType>;
    cubesStorageNode: Three.StorageBufferNode<"struct">;
    texturesStorageNode: Three.StorageBufferNode<typeof TslTextureType>;
    chunksStorageNode: Three.StorageBufferNode<typeof TslChunkDataStruct>;
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
        side: Three.FrontSide,
    });
    

    // Varyings passed from Vertex to Fragment stage
    const vUv3D = varying(vec3(0.0), "vUv3D");
    const vNormal = varying(vec3(0.0), "vNormal");
    // const vLighting = varying(float(1.0), "vLighting"); 

    // =========================================================================
    // 1. VERTEX STAGE (Bitpacker Schema View Extraction)
    // =========================================================================
    const vertexNode = Fn(() => {
        const quadId = quadOffsetUniform.add(vertexIndex.shiftRight(2)).toConst("quadId");

        // 1. Bind storage nodes to global packers
        quadPacker.setNode(nodes.quadsStorageNode.element(quadId).toConst("quadNode"));
        const quadView = quadPacker.view;
        
        cubePacker.setNode((nodes.cubesStorageNode.element(quadView.geometry_id).get("data") as any).toConst("cubeDataNode"));
        const cubeView = cubePacker.view;

        texturePacker.setNode(nodes.texturesStorageNode.element(quadView.texture_id).toConst("textureNode"));
        const textureView = texturePacker.view;

        // 2. Vertex transformations
        const blockLocalPosition = vec3(quadView.x, quadView.y, quadView.z).toConst("blockLocalPosition");
        const normalId = quadView.normal.toUint().toConst("normalId");

        const quadVertexIndex = vertexIndex.bitAnd(3).toConst("quadVertexIndex");
        const baseVertex = CUBE_VERTICES_ARRAY.element(normalId.mul(4).add(quadVertexIndex)).toConst("baseVertex");
        const scale = vec3(cubeView.scale.get(0), cubeView.scale.get(1), cubeView.scale.get(2)).mul(1.0 / 16.0).toConst("scale");
        const offset = vec3(cubeView.offset.get(0), cubeView.offset.get(1), cubeView.offset.get(2)).mul(1.0 / 16.0).toConst("offset");
        const scaledVertex = baseVertex.mul(scale).toConst("scaledVertex");
        const baseNormal = NORMALS_ARRAY.element(normalId).toConst("baseNormal");

        const rotPacked = cubeView.rotation.toUint().toConst("rotPacked");
        const transformedVertex = vec3().toVar();
        const transformedNormal = vec3().toVar();

        If(rotPacked.equal(uint(0)), () => {
            transformedVertex.assign(scaledVertex.add(offset));
            transformedNormal.assign(baseNormal);
        }).Else(() => {
            const quaternion = extractQuaternionFromPacked(rotPacked);
            transformedVertex.assign(applyQuaternion(quaternion, scaledVertex).add(offset));
            transformedNormal.assign(applyQuaternion(quaternion, baseNormal));
        });

        const finalVertex = transformedVertex.add(blockLocalPosition).toConst("finalVertex");

        const uvDescriptor = cubeView.uvs.get(normalId);
        const cornerUv = QUAD_UVS_ARRAY.element(quadVertexIndex).toConst("cornerUv");
        const tileUv = vec2(textureView.atlas_u, textureView.atlas_v).mul(16.0).add(vec2(8, 8)).toConst("tileUv");

        const uvOffset = vec2(uvDescriptor.u, uvDescriptor.v).toConst("uvOffset");
        const uvScale = vec2(uvDescriptor.w, uvDescriptor.h).toConst("uvScale");
        const localUv = cornerUv.mul(uvScale).add(uvOffset).toConst("localUv");
        
        const uv = tileUv.add(localUv).mul(vec2(
            1.0 / Constants.ATLAS_DIMENSIONS[0],
            1.0 / Constants.ATLAS_DIMENSIONS[1]
        )).toConst("finalUv");
        
        vUv3D.assign(vec3(uv, textureView.atlas_w.toFloat()));
        vNormal.assign(transformedNormal);
 
        return finalVertex;
    });


    // =========================================================================
    // 2. FRAGMENT STAGE
    // =========================================================================
    const fragmentNode = Fn(() => {
        // Sample from 3D texture atlas
        const texColor = texture3D(nodes.terrainTexture, vUv3D).toConst();

        // Apply interpolated vertex lighting & shadows
        // const finalRgb = texColor.rgb.mul(vLighting);
        const linearRgb = sRGBTransferEOTF(texColor.rgb) as Three.Node<"vec3">;


        return linearRgb; // Visible white color for test
    });

    material.positionNode = vertexNode();
    // material.positionNode = testVertexNode();
    material.colorNode = fragmentNode();

    return material;
}
