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
@binding(1) @group(1) var<storage, read> chunk_uniforms: array<ChunkUniforms>;

// Static bindings (group 0)
@binding(0) @group(0) var<storage, read> transforms: array<TransformData>;
@binding(1) @group(0) var terrain_atlas: texture_2d<f32>;
@binding(2) @group(0) var atlas_sampler: sampler;

const PI_2: f32 = 1.5707963; // PI / 2
const CHUNK_SIZE: f32 = 16.0;
const BLOCK_CENTER = vec3<f32>(8.0, 8.0, 8.0);
const INVERSE_CHUNK_SIZE: f32 = 1.0 / CHUNK_SIZE;

// Constant arrays for data that needs dynamic indexing
const CUBE_VERTICES: array<vec3<f32>, 24> = array<vec3<f32>, 24>(
	// X+ face (East)
    vec3<f32>(1.0, 0.0, 0.0),
    vec3<f32>(1.0, 0.0, 1.0),
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

// Rotation matrices for block orientations
const ROT_Y: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0),       // 0 degrees
    mat3x3<f32>(0.0, 0.0, 1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 0.0),      // 90 degrees
    mat3x3<f32>(-1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, -1.0),     // 180 degrees
    mat3x3<f32>(0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0)       // 270 degrees
);

const ROT_X: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0),       // 0 degrees
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0),      // 90 degrees
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0),     // 180 degrees
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0)       // 270 degrees
);

const ROT_Z: array<mat3x3<f32>, 4> = array<mat3x3<f32>, 4>(
    mat3x3<f32>(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0),       // 0 degrees
    mat3x3<f32>(0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0),      // 90 degrees
    mat3x3<f32>(-1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0),     // 180 degrees
    mat3x3<f32>(0.0, 1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0)       // 270 degrees
);

const IDENTITY_MATRIX: mat3x3<f32> = mat3x3<f32>(
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
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
	var packed = 0u;
	let mask = 0xFFFFFu;
	switch(quad_normal) {
		case 0u: { // X+
			packed = (data.x >> 12u) & mask;
		}
		case 1u: { // Y+
			packed = (((data.x >> 2u) & 1023u) << 10u) | (data.y >> 22u);
		}
		case 2u: { // Z+
			packed = (data.y >> 2u) & mask; 
		}
		case 3u: { // Z-
			packed = (data.z >> 12u) & mask;
		}
		case 4u: { // Y-
			packed = (((data.z >> 2u) & 1023u) << 10u) | (data.w >> 22u);
		}
		case 5u: { // X-
			packed = (data.w >> 2u) & mask;
		}
		default: {
			packed = 0u;
		}
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
	var seed = u32((world_position.x * 73856093) ^ (world_position.y * 19349663) ^ (world_position.z * 83492791));
	seed = (seed << 13u) ^ seed;
	return f32((seed & 0x7FFFu) - 0x3FFFu) / 16384.0; 
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
fn vs_main(
    @location(0) quad_data: vec2<u32>,
    @location(1) chunk_id: u32,
    @builtin(vertex_index) vertex_index: u32,
    @builtin(instance_index) instance_index: u32
) -> @builtin(position) vec4<f32> {
	var output: VertexOutput;
    let quad = unpackQuadData(quad_data);


	// return camera.mvp_matrix * (vec4<f32>(CUBE_VERTICES[vertex_index], 1.0) + f32(instance_index) * vec4<f32>(1.0, 0.0, 0.0, 0.0));
	return camera.mvp_matrix * vec4<f32>(vertex, 1.0);
}

@fragment
fn fs_main() -> @location(0) vec4<f32> {
    // var output: FragmentOutput;
    
    // // Sample the texture atlas using the UV coordinates
    // let color = textureSample(terrain_atlas, atlas_sampler, input.vUV);
    
    // if (color.a < 0.5) {
    //     discard; // Discard fragments with low alpha
    // }
    
    // var brightness = 0.0;
    
    // // Calculate brightness based on face normal
    // if (input.vNormal.y > 0.0) {
    //     brightness = 1.0; // Top face
    // } else if (input.vNormal.z < 0.0) {
    //     brightness = 0.5; // North face
    // } else {
    //     brightness = 0.8; // Other faces
    // }
    
    // // Apply brightness to the texture color
    // output.color = vec4<f32>(color.rgb * brightness, color.a);
    
    // return output;
	return vec4<f32>(1.0, 1.0, 1.0, 1.0); // Placeholder color
}
