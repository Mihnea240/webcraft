import { ArrayType, Bit, Struct } from "bitpacker";

export const CornerLightStruct = new Struct({
    block_light: new Bit(4),
    sky_light: new Bit(4),
});

export const QuadStruct = new Struct({
    // --- First word ---
    x: new Bit(4),
    y: new Bit(4),
    z: new Bit(4),

    tint_method: new Bit(6), // Moved from texture struct to quad struct
    uv_transformation: new Bit(2), //0 = none, 1 = random rotation, 2 = uv lock, 3 idk

    face_dimming: new Bit(1), // directinal based dimming
    alpha_mask_tint: new Bit(1),

    // n_way_x: new Bit(4), // Moved to cube struct duplication
    // n_way_y: new Bit(4),
    // n_way_z: new Bit(4),

    normal: new Bit(3), // 6 values for axis-aligned normals 
    placement: new Bit(5), // 24 values for face placement (4 per face, 6 faces)
    padding: new Bit(2), // 32 bits total for the first word

    // --- Second word ---
    geometry_id: new Bit(16), // Points to the cube geometry registry
    texture_id: new Bit(16), // Points to the texture registry

    // --- Third word ---
    // corner_light: new ArrayType(new Bit(4), 4),
    // corner_sky_light: new ArrayType(new Bit(4), 4),
    corner_light: new ArrayType(CornerLightStruct, 4),

    // --- Fourth word ---
    corner_ao: new ArrayType(new Bit(2), 4),
    ambient_occlusion: new Bit(8), 
    random_offset_id: new Bit(8), // Points to random offset range presets
    padding2: new Bit(8), // Complete 32-bit word (128 bits total = 16 bytes)
}); 