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
    
    n_way_x: new Bit(4),
    n_way_y: new Bit(4),
    n_way_z: new Bit(4),

    normal: new Bit(3),
    placement: new Bit(5),

    // --- Second word ---
    transform_id: new Bit(16),
    texture_id: new Bit(16),

    // --- Third word ---
    // corner_light: new ArrayType(new Bit(4), 4),
    // corner_sky_light: new ArrayType(new Bit(4), 4),
    corner_light: new ArrayType(CornerLightStruct, 4),
    
    // --- Fourth word ---
    corner_ao: new ArrayType(new Bit(2), 4),
    chunk_id: new Bit(16),
    uv_transformation: new Bit(2), //0 = none, 1 = random rotation, 2 = uv lock, 3 idk
    padding: new Bit(6),
}); 