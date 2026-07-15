
struct CameraUniforms {
    mvp_matrix: mat4x4<f32>,
}

struct ChunkUniforms {
    position: vec3<f32>,
    _padding: f32,
}

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

struct TransformData {
    position: vec3<f32>,
    scale: vec3<f32>,
    rotation: vec3<f32>,
    inset: f32,
    inset_angle: f32,
    rotation_pivot: u32,
    face_uvs_packed: vec4<u32>
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) vNormal: vec3<f32>,
    @location(1) vUV: vec2<f32>,
}

// Dynamic bindings (group 1)
@binding(0) @group(1) var<uniform> camera: CameraUniforms;
@binding(1) @group(1) var<storage, read> quad_buffer: array<vec2<u32>>;
@binding(2) @group(1) var<storage, read> chunk_uniforms: array<ChunkUniforms>;

// Static bindings (group 0)
@binding(0) @group(0) var<storage, read> transforms: array<TransformData>;

const PI_2: f32 = 1.5707963; // PI / 2
const CHUNK_SIZE: f32 = 16.0;
const BLOCK_CENTER = vec3<f32>(8.0, 8.0, 8.0);
const INVERSE_CHUNK_SIZE: f32 = 1.0 / CHUNK_SIZE;

const CUBE_VERTICES: array<vec3<f32>, 24> = array<vec3<f32>, 24>(
	// X+ face (East)
    vec3<f32>(1.0, 0.0, 1.0),
    vec3<f32>(1.0, 0.0, 0.0),
    vec3<f32>(1.0, 1.0, 0.0),
    vec3<f32>(1.0, 1.0, 1.0),
	// Y+ face (Up)
    vec3<f32>(0.0, 1.0, 1.0),
    vec3<f32>(1.0, 1.0, 1.0),
    vec3<f32>(1.0, 1.0, 0.0),
    vec3<f32>(0.0, 1.0, 0.0),
	// Z+ face (North)
    vec3<f32>(0.0, 0.0, 1.0),
    vec3<f32>(1.0, 0.0, 1.0),
    vec3<f32>(1.0, 1.0, 1.0),
    vec3<f32>(0.0, 1.0, 1.0),
	// Z- face (South)
    vec3<f32>(1.0, 0.0, 0.0),
    vec3<f32>(0.0, 0.0, 0.0),
    vec3<f32>(0.0, 1.0, 0.0),
    vec3<f32>(1.0, 1.0, 0.0),
	// Y- face (Down)
    vec3<f32>(0.0, 0.0, 0.0),
    vec3<f32>(1.0, 0.0, 0.0),
    vec3<f32>(1.0, 0.0, 1.0),
    vec3<f32>(0.0, 0.0, 1.0),
	// X- face (West)
    vec3<f32>(0.0, 0.0, 0.0),
    vec3<f32>(0.0, 0.0, 1.0),
    vec3<f32>(0.0, 1.0, 1.0),
    vec3<f32>(0.0, 1.0, 0.0)
);

const NORMALS: array<vec3<f32>, 6> = array<vec3<f32>, 6>(
    vec3<f32>(1.0, 0.0, 0.0),   // East
    vec3<f32>(0.0, 1.0, 0.0),   // Up
    vec3<f32>(0.0, 0.0, 1.0),   // North
    vec3<f32>(0.0, 0.0, -1.0),  // South
    vec3<f32>(0.0, -1.0, 0.0),  // Down
    vec3<f32>(-1.0, 0.0, 0.0)  // West
);

const NORMAL_UVS: array<vec2<f32>, 4> = array<vec2<f32>, 4>(
    vec2<f32>(0.0, 0.0), // Bottom Left
    vec2<f32>(1.0, 0.0), // Bottom Right
    vec2<f32>(1.0, 1.0), // Top Right
    vec2<f32>(0.0, 1.0)  // Top Left
);

const IDENTITY_MATRIX: mat3x3<f32> = mat3x3<f32>(
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
);

const ROT_X: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
	// 0 degrees (identity)
	IDENTITY_MATRIX,
	// 90 degrees around X
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0),
	// 180 degrees around X  
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0),
	// 270 degrees around X
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0)
);

const ROT_Y: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
	// 0 degrees (identity)
	IDENTITY_MATRIX,
	// 90 degrees around Y
	mat3x3<f32>(0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0),
	// 180 degrees around Y  
	mat3x3<f32>(-1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0),
	// 270 degrees around Y
	mat3x3<f32>(0.0, 0.0, 1.0, 0.0, -1.0, 0.0, -1.0, 0.0, 0.0)
);

const ROT_Z: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
	// 0 degrees (identity)
	IDENTITY_MATRIX,
	// 90 degrees around Z
	mat3x3<f32>(0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0),
	// 180 degrees around Z  
	mat3x3<f32>(-1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0),
	// 270 degrees around Z
	mat3x3<f32>(0.0, 1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0)
);

fn rotateX(angle_index: f32) -> mat3x3<f32> {
	let angle = f32(angle_index);
	let c = cos(angle);
	let s = sin(angle);
	return mat3x3<f32>(
		1.0, 0.0, 0.0,
		0.0, c, -s,
		0.0, s, c
	);
}

fn rotateY(angle_index: f32) -> mat3x3<f32> {
	let angle = f32(angle_index);
	let c = cos(angle);
	let s = sin(angle);
	return mat3x3<f32>(
		c, 0.0, s,
		0.0, 1.0, 0.0,
		-s, 0.0, c
	);
}

fn rotateZ(angle_index: f32) -> mat3x3<f32> {
	let angle = f32(angle_index);
	let c = cos(angle);
	let s = sin(angle);
	return mat3x3<f32>(
		c, -s, 0.0,
		s, c, 0.0,
		0.0, 0.0, 1.0
	);
}

fn rotationFromEuler(angles: vec3<f32>) -> mat3x3<f32> {
	return rotateX(angles.x) * rotateY(angles.y) * rotateZ(angles.z);
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

fn getNormalVertex(normal_index: u32, vertex_index: u32) -> vec3<f32> {
	return CUBE_VERTICES[normal_index * 4u + vertex_index];
}

fn getNormalUV(vertex_index: u32) -> vec2<f32> {
	return NORMAL_UVS[vertex_index];
}

fn getBlockRotation(quad: QuadData) -> mat3x3<f32> {
	var rotation = ROT_Y[quad.facing];

	switch (quad.placing) {
		case 0u: { // X+
			return ROT_Z[3u] * rotation; // 270 degrees around Z
		}
		case 1u: { // Y+
			return ROT_Z[2u] * rotation; // 180 degrees around Z
		}
		case 2u: { // Z+
			return ROT_X[3u] * rotation; // 270 degrees around X
		}
		case 3u: { // Z-
			return ROT_X[1u] * rotation; // 90 degrees around X
		}
		case 4u: { // Y- (default, no additional rotation)
			return rotation; // 0 degrees around Y
		}
		case 5u: { // X-
			return ROT_Z[1u] * rotation; // 90 degrees around Z
		}
		default: {
			return rotation;
		}
	}
}

fn getGeometryUV(data: vec4<u32>, quad_normal: u32, vertex_id: u32) -> vec2<f32> {
	var packed = 0u, mask = 0xFFFFF;
	switch(quad_normal){
		case 0: // X+
			packed = (data.x >> 12u) & mask;
			break;
		case 1: // Y+
			packed = (((data.x >> 2u) & 1023u) << 10u) | (data.y >> 22u);
			break;
		case 2: // Z+
			packed = (data.y >> 2u) & mask; 
			break;
		case 3: // Z-
			packed = (data.z >> 12u) & mask;
			break;
		case 4: // Y-
			packed = (((data.z >> 2u) & 1023u) << 10u) | (data.w >> 22u);
			break;
		case 5: // X-
			packed = (data.w >> 2u) & mask;
			break;
	}

	var uv_position = vec2<f32>(
		f32((packed >> 15u) & 31u),
		f32((packed >> 10u) & 31u)
	);
	var uv_size = vec2<f32>(
		f32((packed >> 5u) & 31u),
		f32((packed >> 0u) & 31u)
	);

	uv_position.y = CHUNK_SIZE - uv_position.y;
	uv_size.y = -uv_size.y;

	return uv_position + uv_size * NORMAL_UVS[vertex_id];
}

fn getUV(quad: QuadData, data: vec4<u32>, vertex_id: u32) -> vec2<f32> {
	let atlas_uv = quad.atlas_tile * 24.0;
	let uv_offset = getGeometryUV(data, quad.quad_normal, vertex_id);
	let atlas_size = vec2<f32>(2048.0, 1024.0);
	var uv = (atlas_uv + uv_offset + 4.0)  / atlas_size;

	return uv;
}

fn hash3D(world_position: vec3<i32>) -> f32{
	var seed = (world_position.x * 73856093) ^ (world_position.y * 19349663) ^ (world_position.z * 83492791);
	seed = (seed << 13) ^ seed;
	return f32((seed & 0x7FFF) - 0x3FFF) / 16384.0; 
}

fn applyTransform(vertex: vec3<f32>, transform: TransformData, quad_normal: u32) -> vec3<f32> {
	let inset = transform.inset * NORMALS[quad_normal]; 
	let pivot = vec3<f32>(0.5 * transform.scale.x, 0.0, 0.5 * transform.scale.z);

	var result = vertex;
	result *= transform.scale;
	result = rotationFromEuler(transform.rotation) * (result - pivot - inset) + pivot + transform.position;
	return result;
}

fn getVegetationOffset(world_position: vec3<i32>) -> vec3<f32> {
	return vec3<f32>(
		hash3D(world_position),
		0.0,
		hash3D(world_position + vec3<i32>(3, 17, 91))
	) * 0.25;
}

@vertex
@vertex
fn vs_main(
    @location(0) quad_data: vec2<u32>,
    @location(1) chunk_id: u32,
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instance_index: u32
) -> VertexOutput {
	var output: VertexOutput;
    let quad = unpackQuadData(quad_data);
    let transform = transforms[quad.geometry_id];
	let block_rotation = getBlockRotation(quad);
    let chunk_uniform = chunk_uniforms[chunk_id];

	let world_position = chunk_uniform.position + quad.position;
	var vertex = getNormalVertex(quad.quad_normal, vertex_index);
	
	vertex = applyTransform(vertex, transform, quad.quad_normal);
	vertex = block_rotation * (vertex - BLOCK_CENTER) + BLOCK_CENTER;

	// To world coordinates
	vertex = world_position + vertex * INVERSE_CHUNK_SIZE;

	
	if((transform.face_uvs_packed.x & 1u) != 0u){
		vertex += getVegetationOffset(vec3<i32>(world_position.x, world_position.y, world_position.z));
	}
	
	// Apply camera transformation
	output.position = camera.mvp_matrix * vec4<f32>(vertex, 1.0);
	output.vNormal = block_rotation * NORMALS[quad.quad_normal];
	output.vUV = getUV(quad, transform.face_uvs_packed, vertex_index);

	return output;
}