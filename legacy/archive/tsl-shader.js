import * as TSL from 'three/tsl';
import * as THREE from 'three/webgpu';

/**
 * @fileoverview TSL Minecraft Shader with proper type imports
 * @typedef {import('three/tsl').Node} TSLNode
 * @typedef {import('three/tsl').Fn} TSLFn
 * @typedef {import('three/tsl').ArrayNode} TSLArrayNode
 * @typedef {import('three/tsl').UniformNode} TSLUniformNode
 * @typedef {import('three/tsl').VarNode} TSLVarNode
 * @typedef {import('three/tsl').VaryingNode} TSLVaryingNode
 * @typedef {import('three/tsl').AttributeNode} TSLAttributeNode
 * @typedef {import('three/tsl').StorageBufferNode} TSLStorageNode
 * @typedef {import('three/tsl').TextureNode} TSLTextureNode
 */

/**
 * HOW TSL STRUCT INTEGRATION WORKS:
 * 
 * 1. Define Structs: Use TSL.struct() to define reusable struct types
 * 2. WGSL Functions: Include struct definitions directly in wgslFn 
 * 3. Storage Buffers: Use struct types with storage() function
 * 4. Access Members: Use .get('memberName') to access struct members in TSL
 */

// ===== STRUCT DEFINITIONS =====

/** @type {TSLNode} */
const QuadDataStruct = TSL.struct({
	position: 'vec3<f32>',
	atlas_tile: 'vec2<f32>',
	geometry_id: 'u32',
	placing: 'u32',
	facing: 'u32',
	quad_normal: 'u32',
	rotation: 'u32',
	geometry_animation_id: 'u32'
}, 'QuadData');

/** @type {TSLNode} */
const TransformDataStruct = TSL.struct({
	position: 'vec3<f32>',
	scale: 'vec3<f32>',
	rotation: 'vec3<f32>',
	inset: 'f32',
	inset_angle: 'f32',
	rotation_pivot: 'u32',
	face_uvs_packed: 'vec4<u32>'
}, 'TransformData');

/** @type {TSLFn} */
const unpackQuadData = TSL.wgslFn(`
    struct QuadData {
        position: vec3<f32>,
        atlas_tile: vec2<f32>,
        geometry_id: u32,
        placing: u32,
        facing: u32,
        quad_normal: u32,
        rotation: u32,
        geometry_animation_id: u32,
    }

    fn unpackQuadData(quad_data: vec2<u32>) -> QuadData {
        var quad: QuadData;
        quad.position = vec3<f32>(
            f32((quad_data.x >> 28u) & 15u),
            f32((quad_data.x >> 24u) & 15u),
            f32((quad_data.x >> 20u) & 15u)
        );
        quad.quad_normal = (quad_data.x >> 17u) & 7u;
        quad.placing = (quad_data.x >> 14u) & 7u;
        quad.facing = (quad_data.y >> 30u) & 3u;

        quad.atlas_tile = vec2<f32>(
            f32((quad_data.x >> 7u) & 127u),
            f32((quad_data.x >> 0u) & 127u)
        );

        quad.rotation = 0u;
        quad.geometry_id = (quad_data.y >> 21u) & 511u;
        quad.geometry_animation_id = (quad_data.y >> 16u) & 15u;

        return quad;
    }
`);



/** @type {TSLFn} */
const getGeometryUV = TSL.wgslFn(`
    fn getGeometryUV(data: vec4<u32>, quad_normal: u32, vertex_id: u32) -> vec2<f32> {
        var packed = 0u;
        let mask = 0xFFFFFu;
        switch(quad_normal){
            case 0u: { packed = (data.x >> 12u) & mask; }
            case 1u: { packed = (((data.x >> 2u) & 1023u) << 10u) | (data.y >> 22u); }
            case 2u: { packed = (data.y >> 2u) & mask; }
            case 3u: { packed = (data.z >> 12u) & mask; }
            case 4u: { packed = (((data.z >> 2u) & 1023u) << 10u) | (data.w >> 22u); }
            case 5u: { packed = (data.w >> 2u) & mask; }
            default: { packed = 0u; }
        }

        var uv_position = vec2<f32>(
            f32((packed >> 15u) & 31u),
            f32((packed >> 10u) & 31u)
        );
        var uv_size = vec2<f32>(
            f32((packed >> 5u) & 31u),
            f32((packed >> 0u) & 31u)
        );

        uv_position.y = 16.0 - uv_position.y;
        uv_size.y = -uv_size.y;

        let normalUVs = array<vec2<f32>, 4>(
            vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0), 
            vec2<f32>(1.0, 1.0), vec2<f32>(0.0, 1.0)
        );

        return uv_position + uv_size * normalUVs[vertex_id];
    }
`);

// ===== TSL CONSTANTS AND NODES =====

/** @type {TSLNode} */
const PI_2 = TSL.float(1.5707963);

/** @type {TSLNode} */
const CHUNK_SIZE = TSL.float(16.0);

/** @type {TSLNode} */
const BLOCK_CENTER = TSL.vec3(8.0, 8.0, 8.0);

/** @type {TSLNode} */
const INVERSE_CHUNK_SIZE = TSL.float(1.0 / 16.0);

/** @type {TSLNode} */
const ATLAS_SIZE = TSL.vec2(2048.0, 1024.0);

/** @type {TSLNode} */
const ATLAS_TILE_SIZE = TSL.float(24.0);

/** @type {TSLNode} */
const ATLAS_PADDING = TSL.float(4.0);

/** @type {number} */
const FACE_COUNT = 6;

/** @type {number} */
const VERTICES_PER_FACE = 4;

/** @type {TSLUniformNode} */
const VEGETATION_STRENGTH = TSL.uniform(0.1, 'f32');

// ===== TSL ARRAY NODES =====

/** @type {TSLArrayNode} */
const CUBE_VERTICES_ARRAY = TSL.array([
	// X+ face (East)
	TSL.vec3(1.0, 0.0, 1.0), TSL.vec3(1.0, 0.0, 0.0), TSL.vec3(1.0, 1.0, 0.0), TSL.vec3(1.0, 1.0, 1.0),
	// Y+ face (Up)
	TSL.vec3(0.0, 1.0, 1.0), TSL.vec3(1.0, 1.0, 1.0), TSL.vec3(1.0, 1.0, 0.0), TSL.vec3(0.0, 1.0, 0.0),
	// Z+ face (North)
	TSL.vec3(0.0, 0.0, 1.0), TSL.vec3(1.0, 0.0, 1.0), TSL.vec3(1.0, 1.0, 1.0), TSL.vec3(0.0, 1.0, 1.0),
	// Z- face (South)
	TSL.vec3(1.0, 0.0, 0.0), TSL.vec3(0.0, 0.0, 0.0), TSL.vec3(0.0, 1.0, 0.0), TSL.vec3(1.0, 1.0, 0.0),
	// Y- face (Down)
	TSL.vec3(0.0, 0.0, 0.0), TSL.vec3(1.0, 0.0, 0.0), TSL.vec3(1.0, 0.0, 1.0), TSL.vec3(0.0, 0.0, 1.0),
	// X- face (West)
	TSL.vec3(0.0, 0.0, 0.0), TSL.vec3(0.0, 0.0, 1.0), TSL.vec3(0.0, 1.0, 1.0), TSL.vec3(0.0, 1.0, 0.0)
]);

/** @type {TSLArrayNode} */
const NORMALS_ARRAY = TSL.array([
	TSL.vec3(1.0, 0.0, 0.0),   // East
	TSL.vec3(0.0, 1.0, 0.0),   // Up
	TSL.vec3(0.0, 0.0, 1.0),   // North
	TSL.vec3(0.0, 0.0, -1.0),  // South
	TSL.vec3(0.0, -1.0, 0.0),  // Down
	TSL.vec3(-1.0, 0.0, 0.0)   // West
]);

/** @type {TSLArrayNode} */
const NORMAL_UVS_ARRAY = TSL.array([
	TSL.vec2(0.0, 0.0), // Bottom Left
	TSL.vec2(1.0, 0.0), // Bottom Right
	TSL.vec2(1.0, 1.0), // Top Right
	TSL.vec2(0.0, 1.0)  // Top Left
]);

/** @type {TSLNode} */
const IDENTITY = TSL.mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);

/** @type {TSLArrayNode} */
const ROT_X = TSL.array([
	IDENTITY, // 0 degrees
	TSL.mat3(1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0), // 90 degrees
	TSL.mat3(1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0), // 180 degrees
	TSL.mat3(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0)  // 270 degrees
]);

/** @type {TSLArrayNode} */
const ROT_Y = TSL.array([
	IDENTITY, // 0 degrees
	TSL.mat3(0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0), // 90 degrees
	TSL.mat3(-1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, -1.0), // 180 degrees
	TSL.mat3(0.0, 0.0, 1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 0.0)  // 270 degrees
]);

/** @type {TSLArrayNode} */
const ROT_Z = TSL.array([
	IDENTITY, // 0 degrees
	TSL.mat3(0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0), // 90 degrees
	TSL.mat3(-1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0), // 180 degrees
	TSL.mat3(0.0, 1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0)  // 270 degrees
]);

// ===== TSL FUNCTIONS WITH PROPER TYPES =====

/** @type {TSLFn} */
const getCubeVertexFromIndex = TSL.Fn(([normalIndex, vertexIndex]) => {
	const faceOffset = normalIndex.mul(4);
	const index = faceOffset.add(vertexIndex);
	return CUBE_VERTICES_ARRAY.element(index);
}, 'vec3<f32>');

const getNormalFromIndex = TSL.Fn(([normalIndex]) => {
	return NORMALS_ARRAY.element(normalIndex);
}, 'vec3<f32>');

const getNormalUVFromIndex = TSL.Fn(([vertexIndex]) => {
	return NORMAL_UVS_ARRAY.element(vertexIndex);
}, 'vec2<f32>');

const calculateWorldPosition = TSL.Fn(([localPosition, chunkPosition]) => {
	return chunkPosition.add(localPosition.div(CHUNK_SIZE));
}, 'vec3<f32>');

const calculateAtlasUV = TSL.Fn(([atlasUv, geometryUV]) => {
	const scaledAtlasUv = atlasUv.mul(ATLAS_TILE_SIZE);
	const finalUV = scaledAtlasUv.add(geometryUV).add(ATLAS_PADDING).div(ATLAS_SIZE);
	return finalUV;
}, 'vec2<f32>');

/** @type {TSLFn} */
const rotateX = TSL.Fn(([angle]) => {
	const c = angle.cos();
	const s = angle.sin();
	return TSL.mat3(
		1.0, 0.0, 0.0,
		0.0, c, s.negate(),
		0.0, s, c
	);
}, 'mat3<f32>');

const rotateY = TSL.Fn(([angle]) => {
	const c = angle.cos();
	const s = angle.sin();
	return TSL.mat3(
		c, 0.0, s,
		0.0, 1.0, 0.0,
		s.negate(), 0.0, c
	);
}, 'mat3<f32>');

/** @type {TSLFn} */
const rotateZ = TSL.Fn(([angle]) => {
	const c = angle.cos();
	const s = angle.sin();
	return TSL.mat3(
		c, s.negate(), 0.0,
		s, c, 0.0,
		0.0, 0.0, 1.0
	);
}, 'mat3<f32>');

const rotationFromEuler = TSL.Fn(([angles]) => {
	const rotX = rotateX(angles.x);
	const rotY = rotateY(angles.y);
	const rotZ = rotateZ(angles.z);

	return rotX.mul(rotY).mul(rotZ);
}, 'mat3<f32>');

const getBlockRotationNode = TSL.Fn(([quad_data]) => {
	const baseRotation = ROT_Y.element(quad_data.get('facing'));
	const finalRotation = TSL.mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0).toVar();

	TSL.Switch(quad_data.get('placing'))
		.Case(0, () => {
			const rotation = ROT_Z.element(TSL.uint(3)).mul(baseRotation);
			finalRotation.assign(rotation);
		})
		.Case(1, () => {
			const rotation = ROT_Z.element(TSL.uint(2)).mul(baseRotation);
			finalRotation.assign(rotation);
		})
		.Case(2, () => {
			const rotation = ROT_X.element(TSL.uint(3)).mul(baseRotation);
			finalRotation.assign(rotation);
		})
		.Case(3, () => {
			const rotation = ROT_X.element(TSL.uint(1)).mul(baseRotation);
			finalRotation.assign(rotation);
		})
		.Case(4, () => finalRotation.assign(baseRotation))
		.Default(() => finalRotation.assign(baseRotation));

	return finalRotation;
}, 'mat3<f32>');

const getUV = TSL.Fn(([quad_data, vertexIndex]) => {
	let atlas_uv = quad_data.get('atlas_tile').mul(ATLAS_TILE_SIZE).toVar();
	let uv_offset = getGeometryUV(quad_data.get('face_uvs_packed'), quad_data.get('quad_normal'), vertexIndex);
	return atlas_uv.add(uv_offset).add(ATLAS_PADDING).div(ATLAS_SIZE);
}, 'vec2<f32>');

const applyTransform = TSL.Fn(([vertex, transform, quad_normal]) => {
	const rotationMatrix = rotationFromEuler(transform.get('rotation'));
	const scaledVertex = vertex.mul(transform.get('scale')).toVar();
	const inset = NORMALS_ARRAY.element(quad_normal).mul(transform.get('inset'));
	const pivot = TSL.vec3(0.5, 0, 0.5).mul(transform.get('scale'));

	scaledVertex.sub(pivot).sub(inset);
	return rotationMatrix.mul(scaledVertex)
		.add(pivot)
		.add(transform.get('position'));

}, 'vec3<f32>');

export function createChunkMaterial(resources, transforms) {
	// const material = new THREE.MeshBasicNodeMaterial();

	// // Setup uniforms
	// const timeUniform = TSL.uniform(0, 'f32');
	// const chunkPositionUniform = TSL.uniform(TSL.vec3(0, 0, 0), 'vec3<f32>');

	// // Setup storage buffer with TransformData struct type
	// const transformsStorage = TSL.storage(transforms, TransformDataStruct, transforms.count);
	// const terrainAtlas = TSL.texture(resources.atlas.terrain);
	// const quadDataAttribute = TSL.attribute('quadData', 'vec2<u32>'); // @location(1) equivalent

	// const vertexIndexBuiltin = TSL.vertexIndex; // @builtin(vertex_index)
	// const instanceIndexBuiltin = TSL.instanceIndex; // @builtin(instance_index) if needed

	// // ===== TSL VERTEX SHADER COMPOSITION =====
	// // Create the vertex shader logic using TSL composition
	// const vertexShaderNode = TSL.Fn(() => {
	// 	// Unpack quad data - parameters flow through TSL nodes
	// 	const quad = unpackQuadData(quadDataAttribute);
	// 	const transform = transformsStorage.element(quad.get('geometry_id'));

	// 	// Get face normal index from quad data
	// 	const normalIndex = quad.get('quad_normal');

	// 	// Get base vertex position and normal from cube geometry
	// 	const baseVertex = getCubeVertexFromIndex(normalIndex, vertexIndexBuiltin);
	// 	const normal = getNormalFromIndex(normalIndex);

	// 	// Get UV coordinates for this vertex
	// 	const normalUV = getNormalUVFromIndex(vertexIndexBuiltin);

	// 	// Apply block rotation based on placement
	// 	const blockRotation = getBlockRotationNode(quad);
	// 	const rotatedVertex = blockRotation.mul(TSL.vec4(baseVertex, 1.0)).xyz;
	// 	const rotatedNormal = blockRotation.mul(normal);

	// 	// Apply transform (scale, rotation, position)
	// 	const transformedVertex = applyTransform(rotatedVertex, transform, normalIndex);

	// 	// Convert to world coordinates
	// 	const quadWorldPos = quad.get('position');
	// 	const worldPosition = chunkPositionUniform.add(quadWorldPos);
	// 	const finalVertex = transformedVertex.add(worldPosition);

	// 	// Calculate final UV coordinates
	// 	const finalUV = getUV(quad, vertexIndexBuiltin);

	// 	// Return vertex shader outputs
	// 	return {
	// 		position: TSL.vec4(finalVertex, 1.0),  // Required: vertex position in clip space
	// 		normal: rotatedNormal,                 // Varying: surface normal
	// 		uv: finalUV,                          // Varying: texture coordinates
	// 		worldPos: finalVertex                  // Varying: world position
	// 	};
	// })();  // Call once to create the node

	// // Assign the vertex shader
	// material.vertexNode = vertexShaderNode;

	// // Setup fragment shader (simple texture sampling)
	// const fragmentShader = TSL.Fn(() => {
	// 	// Access varying data from the SAME vertex shader node instance
	// 	const uv = TSL.varying(vertexShaderNode.uv);
	// 	const normal = TSL.varying(vertexShaderNode.normal);

	// 	return terrainAtlas.sample(uv);
	// })();

	// material.colorNode = fragmentShader;

	// // Setup uniforms
	// material.uniforms = {
	// 	time: timeUniform,
	// 	chunkPosition: chunkPositionUniform
	// };

	// console.log(material.vertexNode.debug());

	// return material;

	const material = new THREE.MeshBasicNodeMaterial();
	const textureNode = TSL.texture(resources.atlas.terrain);
	
	// Create vertex node that scales down the geometry
	material.vertexNode = TSL.Fn(() => {
		const position = TSL.attribute('position', 'vec3<f32>');
		
		// Compose nodes directly - this DOES work in TSL!
		const angle = TSL.float(0.12);
		const rotationMatrix = rotateY(angle);
		const rotatedPosition = rotationMatrix.mul(position);
		const scaledPosition = TSL.vec4(rotatedPosition, 1.0);
		
		// Apply MVP matrices using correct TSL built-ins
		const worldPosition = TSL.modelWorldMatrix.mul(scaledPosition);
		const viewPosition = TSL.cameraViewMatrix.mul(worldPosition);
		const clipPosition = TSL.cameraProjectionMatrix.mul(viewPosition);
		
		return clipPosition;
	})();
	
	material.colorNode = TSL.vec4(1.0, 0.0, 0.0, 1.0);
	
	console.log("Scaled-down test material created");
	
	return material;
	
}