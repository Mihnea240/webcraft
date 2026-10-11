import { ArrayType, Bit, Float16, Int8, Struct, Uint32, Uint8 } from "bitpacker";

const QuaternionStruct = new Uint32(); // Or we can use Uint32 for 32-bit smallest-three
const FaceUVStruct = new Struct({
    u: new Uint8(),
    v: new Uint8(),
    w: new Int8(),
    h: new Int8(),
});

export const CubeStruct = new Struct({
    // --- Geometry & Scale (16 Bytes) ---
    rotation: QuaternionStruct,
    offset: new ArrayType(new Float16(), 3),
    scale: new ArrayType(new Float16(), 3),
    
    // --- Face UVs (6 Faces * 4 Bytes = 24 Bytes) ---
    uvs: new ArrayType(FaceUVStruct, 6),  
    // --- 40 bytes so far ---

    texture_width: new Bit(8),
    texture_height: new Bit(8),

    // --- Move the cube faces along the normal direction (1 Byte) ---
    inset: new Uint8(),
    padding: new Bit(8), // 32 bits for bucket 11 (384 bits total = 48 bytes = 12 u32s)

    // random_offset_index: new Bit(8),
    // n_way_x: new Bit(4),
    // n_way_y: new Bit(4),
    // n_way_z: new Bit(4),

    // bone_id: new Bit(16), // There are too many levels of indirection
});
