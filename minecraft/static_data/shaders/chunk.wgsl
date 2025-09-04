struct GeometryPacked {
    pos_and_pivot_x: vec4<f32>,
    scale_and_pivot_y: vec4<f32>,
    rotation_and_pivot_z: vec4<f32>,
    inset_data: vec2<f32>,
    animation_data: vec2<u32>,
    face_data_and_flags: vec4<u32>
}
struct Uniform {
    mvp: mat4x4<f32>,
    chunk_position: vec3<u32>,
    time: u32
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) vUV: vec2<f32>,
    @location(1) vColor: vec4<f32>,
}

@group(0) @binding(0) var<storage, read> geometry_data: array<GeometryPacked>;
@group(0) @binding(1) var<storage, read> texture_data: array<vec4<u32>>;
@group(0) @binding(2) var terrain_atlas: texture_2d<f32>;
@group(0) @binding(3) var atlas_sampler: sampler;

@group(1) @binding(0) var<uniform> v_uniform: Uniform;


const PI_2: f32 = 1.5707963; // PI / 2
const CHUNK_SIZE: f32 = 16.0;
const INVERSE_CHUNK_SIZE: f32 = 1.0 / CHUNK_SIZE; 
const BLOCK_CENTER = vec3<f32>(8.0, 8.0, 8.0) * INVERSE_CHUNK_SIZE;

// Constant arrays for data that needs dynamic indexing
const CUBE_VERTICES: array<vec3<f32>, 24> = array<vec3<f32>, 24>(
	// X+ face (East) - CCW
    vec3<f32>(1.0, 0.0, 0.0), // Bottom Left
    vec3<f32>(1.0, 1.0, 0.0), // Top Left
    vec3<f32>(1.0, 0.0, 1.0), // Bottom Right
    vec3<f32>(1.0, 1.0, 1.0), // Top Right
	// Y+ face (Up) - CCW
    vec3<f32>(1.0, 1.0, 1.0), // Top Right
    vec3<f32>(1.0, 1.0, 0.0), // Top Left
    vec3<f32>(0.0, 1.0, 1.0), // Bottom Right
    vec3<f32>(0.0, 1.0, 0.0), // Bottom Left
	// Z+ face (North) - CCW
    vec3<f32>(1.0, 0.0, 1.0), // Bottom Right
    vec3<f32>(1.0, 1.0, 1.0), // Top Right
    vec3<f32>(0.0, 0.0, 1.0), // Bottom Left
    vec3<f32>(0.0, 1.0, 1.0), // Top Left
	// Z- face (South) - CCW
    vec3<f32>(0.0, 0.0, 0.0), // Bottom Right
    vec3<f32>(0.0, 1.0, 0.0), // Top Right
    vec3<f32>(1.0, 0.0, 0.0), // Bottom Left
    vec3<f32>(1.0, 1.0, 0.0), // Top Left
	// Y- face (Down) - CCW
    vec3<f32>(1.0, 0.0, 0.0), // Bottom Right
    vec3<f32>(1.0, 0.0, 1.0), // Top Right
    vec3<f32>(0.0, 0.0, 0.0), // Bottom Left
    vec3<f32>(0.0, 0.0, 1.0), // Top Left
	// X- face (West) - CCW
    vec3<f32>(0.0, 0.0, 1.0), // Bottom Right
    vec3<f32>(0.0, 1.0, 1.0), // Top Right
    vec3<f32>(0.0, 0.0, 0.0), // Bottom Left
    vec3<f32>(0.0, 1.0, 0.0)  // Top Left
);

const NORMALS: array<vec3<f32>, 6> = array<vec3<f32>, 6>(
    vec3<f32>(1.0, 0.0, 0.0),   // East
    vec3<f32>(0.0, 1.0, 0.0),   // Up
    vec3<f32>(0.0, 0.0, 1.0),   // North
    vec3<f32>(0.0, 0.0, -1.0),  // South
    vec3<f32>(0.0, -1.0, 0.0),  // Down
    vec3<f32>(-1.0, 0.0, 0.0)  // West
);

const NORMAL_UVS: array<vec2<u32>, 4> = array<vec2<u32>, 4>(
    vec2<u32>(1u, 0u),
    vec2<u32>(1u, 1u),
    vec2<u32>(0u, 0u),
    vec2<u32>(0u, 1u),
);

const PLACEMENT_ROTATION = array<vec3<f32>, 6>(
    vec3<f32>(1.0, 2.0, 1.0) * PI_2, // X+
    vec3<f32>(0.0, 2.0, 2.0) * PI_2, // Y+
    vec3<f32>(3.0, 0.0, 0.0) * PI_2, // Z+
    vec3<f32>(1.0, 2.0, 0.0) * PI_2, // Z-
    vec3<f32>(0.0, 0.0, 0.0) * PI_2, // Y- (default, no additional rotation)
    vec3<f32>(1.0, 2.0, -1.0) * PI_2  // X-
);

const AO: array<f32, 4> = array<f32, 4>(1.0, 0.8, 0.6, 0.4);

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

fn hash3D(p: vec3<i32>) -> f32 {
     var seed: i32 =( p.x * 3129871) ^ (p.z * 116129781) ^ p.y;
    seed = seed * seed * 42317861 + seed * 11;
    let val: u32 = u32((seed >> 16u) & 15);
    return (f32(val) / 15.0) * 2.0 - 1.0; // map [0,15] → [-1,1]
}

fn getCubePosition(geometry: GeometryPacked) -> vec3<f32> {
    return geometry.pos_and_pivot_x.xyz * INVERSE_CHUNK_SIZE;
}

fn getCubeScale(geometry: GeometryPacked) -> vec3<f32> {
    return geometry.scale_and_pivot_y.xyz * INVERSE_CHUNK_SIZE;
}

fn getCubeEulerRotation(geometry: GeometryPacked) -> vec3<f32> {
    return geometry.rotation_and_pivot_z.xyz;
}

fn getCubePivot(geometry: GeometryPacked) -> vec3<f32> {
    return vec3<f32>(
        geometry.pos_and_pivot_x.w,
        geometry.scale_and_pivot_y.w,
        geometry.rotation_and_pivot_z.w
    ) * INVERSE_CHUNK_SIZE;
}

fn getCubeInset(geometry: GeometryPacked) -> f32 {
    return geometry.inset_data.x;
}

fn getCubeInsetAngle(geometry: GeometryPacked) -> f32 {
    return geometry.inset_data.y;
}

fn hasRandomOffset(geometry: GeometryPacked) -> bool {
    return (geometry.face_data_and_flags.x & 0x1u) != 0u;
}

fn hasUvLock(uv_data: vec4<u32>, normal: u32) -> bool {
    let mask = ((uv_data.y & 3u) << 4u) | ((uv_data.z & 3u) << 2u) | ((uv_data.w & 3u) << 0u);

    return (((mask >> normal) & 1u) != 0u);
}

fn hasPlacementRotation(transform: GeometryPacked) -> u32 {
    return (transform.face_data_and_flags.x & 0x2u) >> 1u;
}

fn hasIsotropic(quad: vec3<u32>) -> bool {
    return ((quad.y >> 1u) & 1u) != 0u;
}

fn getChunkPosition(quad: vec3<u32>) -> vec3<u32> {
    let x = (quad.x >> 28u) & 0xFu; // 4 bits for x
    let y = (quad.x >> 24u) & 0xFu; // 4 bits for y
    let z = (quad.x >> 20u) & 0xFu; // 4 bits
    return vec3<u32>(x, y, z);
}

fn getQuadNormal(quad: vec3<u32>) -> u32 {
    return (quad.x >> 5u) & 0x7u; // 3 bits for normal
}

fn getBlockPlacementRotation(quad: vec3<u32>, use_pacement_rotation: u32) -> vec3<f32> {
    let normal = getQuadNormal(quad);
    let placing = (quad.x >> 2u) & 0x7u;
    let facing = (quad.x >> 0u) & 0x3u;

    return 
		vec3<f32>(0.0, f32(facing) * PI_2, 0.0) + f32(use_pacement_rotation) * PLACEMENT_ROTATION[placing];
}

fn getTransform(quad: vec3<u32>) -> GeometryPacked {
    return geometry_data[quad.y >> 22u];
}

fn getVegetationOffset(position: vec3<i32>) -> vec3<f32> {
    return vec3<f32>(
        hash3D(position),
        0.0,
        hash3D(position + vec3<i32>(3, 17, 91))
    ) * 0.35; // Scale down the offset
}

fn getTextureData(quad: vec3<u32>) -> vec4<u32> {
    return texture_data[((quad.x >> 8u) & 0xFFFu)];
}

fn getAtlasCoords(texture_data: vec4<u32>) -> vec2<f32> {
    return vec2<f32>(
        f32((texture_data.x >> 24u) & 0xFFu),
        f32((texture_data.x >> 16u) & 0xFFu)
    ) * 24.0 + 4.0;
}

fn getTransformUv(
    uv_data: vec4<u32>,
    normal_index: u32,
    vertex_id: u32,
) -> vec2<f32> {
    let uv_position = vec2<u32>(
        (uv_data.x >> (27u - normal_index * 5u)) & 0x1Fu,
        (uv_data.y >> (27u - normal_index * 5u)) & 0x1Fu
    );

    let uv_size = vec2<u32>(
        (uv_data.z >> (27u - normal_index * 5u)) & 0x1Fu,
        ((uv_data.w >> (27u - normal_index * 5u)) & 0x1Fu)
    );

    var uv = vec2<f32>(uv_position) + vec2<f32>(uv_size) * vec2<f32>(NORMAL_UVS[vertex_id]);
    return vec2<f32>(uv.x, uv.y);
}

fn getLightLevel(quad: vec3<u32>, vertex_id: u32, time: u32) -> f32 {
    let corner = (((quad.z >> 28u) & 0xFu) >> vertex_id) & 1u;
    let light = (quad.y >> 2u) & 0xFu;
    let sky_light = (quad.z >> 24u) & 0xFu;

    let block_light = f32(light - corner) / 15.0;
    let sky = f32(sky_light) / 15.0 * getSkyBrightness(time);

    return max(sky, block_light);
}

fn getSkyBrightness(time: u32) -> f32 {
    let day_time = f32(time % 24000u);
    if day_time < 6000.0 {
        return 1.0;
    } else if day_time < 12000.0 {
        return 1.0 - (day_time - 6000.0) / 6000.0;
    } else if day_time < 18000.0 {
        return (day_time - 12000.0) / 6000.0;
    } else {
        return 1.0;
    }
}

fn getAo(quad: vec3<u32>, vertex_id: u32) -> f32 {
    let mask = (quad.y >> (6u + vertex_id)) & 0x3u;
    return AO[mask];
}

fn getBiomeTint(quad: vec3<u32>) -> vec3<f32> {
    let temperature = (quad.z >> 16u) & 0xFFu;
    let humidity = (quad.z >> 8u) & 0xFFu;
	// To do sample biome colormap
    return vec3<f32>(1.0, 1.0, 1.0);
}

fn getNormalShading(normal: vec3<f32>) -> f32 {
    return dot(normal, vec3<f32>(0.5, 1.0, 0.5));
}

fn uvProjection(world_pos: vec3<f32>, normal: vec3<f32>) -> vec2<f32> {
	let abs_n = abs(normal);
	let p = world_pos;
    if abs_n.x > abs_n.y && abs_n.x > abs_n.z {
        // Normal is mostly ±X → project to Y/Z plane
        return vec2<f32>(p.z, p.y) * 16.0;
    } else if abs_n.y > abs_n.z {
        // Normal is mostly ±Y → project to X/Z plane
        return vec2<f32>(p.x, p.z) * 16.0;
    } else {
        // Normal is mostly ±Z → project to X/Y plane
        return vec2<f32>(p.x, p.y) * 16.0;
    }
}

@vertex
fn vs_main(
    @builtin(vertex_index) vertex_index: u32,
    @location(0) quad: vec3<u32>
) -> VertexOutput {
    var output: VertexOutput;

    let transform = getTransform(quad);
    let texture_data = getTextureData(quad);

    let chunk_position = getChunkPosition(quad);
    let normal_index = getQuadNormal(quad);

	//Aplied transform
    var base_position = CUBE_VERTICES[normal_index * 4u + vertex_index];

    let block_placement_rotation = rotationFromEuler(
        getBlockPlacementRotation(quad, hasPlacementRotation(transform))
    );

    let rotation_matrix = rotationFromEuler(
        getCubeEulerRotation(transform)
    );

    let origin = getCubePosition(transform);
    let scale = getCubeScale(transform);
    let pivot = getCubePivot(transform);
    let inset = getCubeInset(transform) * NORMALS[normal_index] * INVERSE_CHUNK_SIZE;
    let inset_angle = getCubeInsetAngle(transform);

    base_position -= vec3<f32>(1.0, 0.0, 1.0) * getCubeInset(transform) * INVERSE_CHUNK_SIZE;
    var model_vertex = rotation_matrix * (base_position * scale - pivot - inset) + pivot + origin;
    model_vertex = block_placement_rotation * (model_vertex - BLOCK_CENTER) + BLOCK_CENTER;
	// World position
    var world_vertex = model_vertex + vec3<f32>(v_uniform.chunk_position) * CHUNK_SIZE + vec3<f32>(chunk_position);

    if (hasRandomOffset(transform)) {
        world_vertex += getVegetationOffset(
            vec3<i32>(chunk_position) + vec3<i32>(v_uniform.chunk_position) * i32(CHUNK_SIZE)
        );
    }

	let uv = select(
		getTransformUv(transform.face_data_and_flags, normal_index, vertex_index),
		uvProjection(model_vertex, block_placement_rotation * NORMALS[normal_index]),
		hasUvLock(transform.face_data_and_flags, normal_index)
	);
	var uv_normalized = (
		getAtlasCoords(texture_data) + vec2<f32>(uv.x, 16.0 - uv.y)
    ) / vec2<f32>(textureDimensions(terrain_atlas));

	// uv_normalized = vec2<f32>(NORMAL_UVS[vertex_index]);
    let block_light = getLightLevel(quad, vertex_index, v_uniform.time);
    let ao = getAo(quad, vertex_index);
	// let biome_tint = getBiomeTint(quad);
    let normal_shading = getNormalShading(rotation_matrix * NORMALS[normal_index]);
    let brightness = block_light * ao * normal_shading;

    output.position = v_uniform.mvp * vec4<f32>(world_vertex, 1.0);
    output.vColor = vec4<f32>(brightness, brightness, brightness, 1.0);
	// output.position = v_uniform.mvp * vec4<f32>(CUBE_VERTICES[vertex_index], 1.0);
    output.vUV = uv_normalized;
	// output.vUV = vec2<f32>(NORMAL_UVS[vertex_index]);


    return output;
}

@fragment
fn fs_main(
    @location(0) vUV: vec2<f32>,
    @location(1) vColor: vec4<f32>
) -> @location(0) vec4<f32> {
    let color = textureSample(terrain_atlas, atlas_sampler, vUV);

    if color.a < 0.1 {
		discard;
    }

    return color;
	// return vec4<f32>(vUV.x,vUV.y ,0.0, 1.0);
}



