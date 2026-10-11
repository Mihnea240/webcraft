#version 300 es
precision highp float;
precision highp usampler2D;

uniform usampler2D vertex_data;
uniform usampler2D geometry_texture;
uniform uint geometry_texture_size;
uniform ivec2 vertex_data_size;
uniform ivec3 chunk_position;
uniform vec2 atlas_size;
uniform float time;

out vec2 vUV;
flat out vec3 face_normal;

struct QuadData {
	ivec2 atlas_tile; // Atlas tile coordinates
	ivec3 block_position; // Block position in the chunk
	int face_normal; // Normal of the face
	int placing; // The direction the block is placed in
	int facing; // Facing direction of the block
	int rotation; // Texture rotation
	int geometry_index; // Index of the geometry of the cube the quad belongs to
	int geometry_animation_id;
	// uint animation_index; // Index of the animation frame for the quad
};

const float chunk_size = 16.0; // Size of a chunk in blocks
const float inverse_chunk_size = 1.0 / 16.0; 
const float PI_2 = 1.57079632679; // PI / 2

// Each face defined with CCW winding from the outside view

// -X face (West)
const vec3 base_cube_west[] = vec3[](
    vec3(0, 0, 0),
    vec3(0, 0, 1),
    vec3(0, 1, 1),
    vec3(0, 1, 0)
);

// +X face (East)
const vec3 base_cube_east[] = vec3[](
	vec3(1, 0, 1),
    vec3(1, 0, 0),
	vec3(1, 1, 0),
	vec3(1, 1, 1)
);

// -Z face (North)
const vec3 base_cube_north[] = vec3[](
    vec3(1, 0, 0),
    vec3(0, 0, 0),
    vec3(0, 1, 0),
    vec3(1, 1, 0)
);

// +Z face (South)
const vec3 base_cube_south[] = vec3[](
    vec3(0, 0, 1),
    vec3(1, 0, 1),
    vec3(1, 1, 1),
    vec3(0, 1, 1)
);

// +Y face (Up)
const vec3 base_cube_up[] = vec3[](
	vec3(0, 1, 1),
	vec3(1, 1, 1),
	vec3(1, 1, 0),
	vec3(0, 1, 0)
);

// -Y face (Down)
const vec3 base_cube_down[] = vec3[](
	vec3(0, 0, 0),
	vec3(1, 0, 0),
	vec3(1, 0, 1),
	vec3(0, 0, 1)
);

const vec2 normal_uvs[] = vec2[](
	vec2(0.0, 0.0),
	vec2(1.0, 0.0),
	vec2(1.0, 1.0),
	vec2(0.0, 1.0)
);

const vec3[] normal_vectors = vec3[](
	vec3(1.0, 0.0, 0.0), // X+
	vec3(0.0, 1.0, 0.0), // Y+
	vec3(0.0, 0.0, 1.0), // Z+
	vec3(0.0, 0.0, -1.0), // Z-
	vec3(0.0, -1.0, 0.0), // Y-
	vec3(-1.0, 0.0, 0.0) // X-
);

const mat3[] rot_X = mat3[](
	mat3(1.0),
	mat3(1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0), // 90 degrees
	mat3(1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0), // 180 degrees
	mat3(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0) // 270 degrees
);

const mat3[] rot_Y = mat3[](
	mat3(1.0),
	mat3(0.0, 0.0, 1.0, 0.0, 1.0, 0.0, -1.0, 0.0, 0.0), // 90 degrees
	mat3(-1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, -1.0), // 180 degrees
	mat3(0.0, 1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, -1.0) // 270 degrees
);
const mat3[] rot_Z = mat3[](
	mat3(1.0),
	mat3(0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0), // 90 degrees
	mat3(-1.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 1.0), // 180 degrees
	mat3(0.0, 1.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0) // 270 degrees
);

mat3 rotateX(float angle) {
	float c = cos(angle);
	float s = -sin(angle);
	return mat3(
		1.0, 0.0, 0.0,
		0.0, c, -s,
		0.0, s, c
	);
}

mat3 rotateY(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat3(
		c, 0.0, s,
		0.0, 1.0, 0.0,
		-s, 0.0, c
	);
}

mat3 rotateZ(float angle) {
	float c = cos(angle);
	float s = sin(angle);
	return mat3(
		c, -s, 0.0,
		s, c, 0.0,
		0.0, 0.0, 1.0
	);
}
QuadData getQuadData(int quad_data_1, int quad_data_2) {
	QuadData data;
	// data.geometry_index = 6;
	// data.animation_index = quad_data_2 >> 18 & 63;
	data.block_position = ivec3(
		(quad_data_1 >> 28) & 15, 
		(quad_data_1 >> 24) & 15, 
		(quad_data_1 >> 20) & 15
	);

	data.face_normal = (quad_data_1 >> 17) & 7;
	data.placing = (quad_data_1 >> 14) & 7;
	data.facing = (quad_data_2 >> 30) & 3;
	
	data.atlas_tile = ivec2(
		(quad_data_1 >> 7) & 127, 
		quad_data_1 & 127
	);
	data.rotation = 0; // No rotation data packed from CPU
	data.geometry_index = (quad_data_2 >> 21) & 511;
	data.geometry_animation_id = (quad_data_2 >> 16) & 15;
	return data;
}

vec2 getGeometryUV(uvec4 data_4, int normal){
	uint uv_packed_data = 0u, mask = 0xFFFFFu;
	switch(normal){
		case 0: // X+
			uv_packed_data = (data_4.x >> 12) & mask;
			break;
		case 1: // Y+
			uv_packed_data = (((data_4.x >> 2) & 1023u) << 10) | (data_4.y >> 22);
			break;
		case 2: // Z+
			uv_packed_data = (data_4.y >> 2) & mask; 
			break;
		case 3: // Z-
			uv_packed_data = (data_4.z >> 12) & mask;
			break;
		case 4: // Y-
			uv_packed_data = (((data_4.z >> 2) & 1023u) << 10) | (data_4.w >> 22);
			break;
		case 5: // X-
			uv_packed_data = (data_4.w >> 2) & mask;
			break;
	}
	vec2 uv_position = vec2(
		float((uv_packed_data >> 15) & 31u),
		float((uv_packed_data >> 10 ) & 31u)
	);
	vec2 uv_size = vec2(
		float((uv_packed_data >> 5) & 31u),
		float((uv_packed_data >> 0) & 31u) 
	);
	// uv_position = vec2(0.0);
	// uv_size = vec2(16.0);
	uv_position.y = 16.0 - uv_position.y; // Flip the Y coordinate
	uv_size.y *= -1.0;

	return uv_position + uv_size * normal_uvs[gl_VertexID & 3];
}

vec3 getNormalVertex(int normal) {
	int vertex_id = gl_VertexID & 3;
	switch(normal) {
		case 0: // X+
			return base_cube_east[vertex_id];
		case 1: // Y+
			return base_cube_up[vertex_id];
		case 2: // Z+
			return base_cube_south[vertex_id];
		case 3: // Z-
			return base_cube_north[vertex_id];
		case 4: // Y-
			return base_cube_down[vertex_id];
		case 5: // X-
			return base_cube_west[vertex_id];
		default: return vec3(100.0); // Fallback, should not happen
	}
}

mat3 getBlockRotation(QuadData quad_data) {
	mat3 rotation = rot_Y[quad_data.facing];
	switch(quad_data.placing){
		case 0: // X+
			return rot_Z[3] * rotation; // 90 degrees around Z
		case 1: // Y+
			return rot_Z[2] * rotation; // 180 degrees around Z
		case 2: // Z+
			return rot_X[3] * rotation; // 90 degrees around X
		case 3: // Z-
			return rot_X[1] * rotation; // 270 degrees around X
		case 4: // Y-
			return rotation;
		case 5: // X-
			return rot_Z[1] * rotation; // 270 degrees around Z
		default: return rotation;
	}
}

float getJitter(ivec3 world_pos){
	int seed = world_pos.x * 73856093 ^ world_pos.y * 19349663 ^ world_pos.z * 83492791;
	seed = (seed << 13) ^ seed; // Entropy mixing
	return float((seed & 0x7FFF) - 0x3FFF) / 16384.0; // Normalize to [-1, 1]
}

vec2 getUV(QuadData quad_data, uvec4 data_4) {
	// return normal_uvs[gl_VertexID & 3] ;
	// vec2 uv_offset = normal_uvs[gl_VertexID & 3] * 16.0;
	vec2 atlas_uv = vec2(quad_data.atlas_tile) * 24.0;
	vec2 uv_offset = getGeometryUV(data_4, quad_data.face_normal);
	
	vec2 uv = (atlas_uv + uv_offset + 4.0) / atlas_size;
	uv.y = 1.0 - uv.y; // Flip the UV coordinates

	// return uv_offset;
	switch(quad_data.rotation) {
		case 0: // 0 degrees
			break;
		case 1: // 90 degrees
			uv = vec2(-uv.y, uv.x);
			break;
		case 2: // 180 degrees
			uv = vec2(-uv.x, -uv.y);
			break;
		case 3: // 270 degrees
			uv = vec2(uv.y, -uv.x);
			break;
	}
	return uv;
}

void main() {
	int quad_id = gl_VertexID >> 2;
	ivec2 quad_position = ivec2(
		(quad_id % vertex_data_size.x),
		(quad_id / vertex_data_size.x)
	);
	uvec4 quad_data_raw = texelFetch(vertex_data, quad_position, 0);
	int quad_data_1 = int(quad_data_raw.r);
	int quad_data_2 = int(quad_data_raw.g);

	QuadData quad_data = getQuadData(quad_data_1, quad_data_2);

	quad_position.x = 0;
	quad_position.y = quad_data.geometry_index;
	vec4 data_1 = uintBitsToFloat(texelFetch(geometry_texture, quad_position, 0));
	quad_position.x = 1;
	vec4 data_2 = uintBitsToFloat(texelFetch(geometry_texture, quad_position, 0));
	quad_position.x = 2;
	vec4 data_3 = uintBitsToFloat(texelFetch(geometry_texture, quad_position, 0));
	quad_position.x = 3;
	uvec4 data_4 = texelFetch(geometry_texture, quad_position, 0);

	vec3 origin = data_1.xyz;
	vec3 scale = vec3(data_1.w, data_2.xy);
	vec3 angles = vec3(data_2.zw, data_3.x);
	vec3 inset = data_3.y * normal_vectors[quad_data.face_normal];
	float inset_angle = data_3.z;
	mat3 rotation = rotateX(angles.x) * rotateY(angles.y) * rotateZ(angles.z);
	vec3 vertex = getNormalVertex(quad_data.face_normal);
	vec3 pivot = 0.5 * scale; pivot.y = 0.0;
	// vec3 inset = uintBitsToFloat(data_4.w) * normal_vectors[quad_data.face_normal];
	mat3 block_rotation = getBlockRotation(quad_data);
	ivec3 world_pos = quad_data.block_position + chunk_position;

	vertex *=scale;
	vertex = rotation * (vertex - pivot - inset) + pivot + origin;
	vertex = block_rotation * (vertex - vec3(8.0)) + vec3(8.0);

	vUV = getUV(quad_data, data_4);
	face_normal = block_rotation * normal_vectors[quad_data.face_normal];
	

	vec3 position = vec3(world_pos) + vertex * inverse_chunk_size;
	if((data_4.x & 1u) != 0u) {
		position += vec3(
			getJitter(world_pos),
			0.0,
			getJitter(world_pos + ivec3(3, 17, 91))
		) * 0.25;
	}

	// vUV = vec2(geometry_transform[0][0], geometry_transform[1][1]); // Adjust UV based on geometry transform
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}