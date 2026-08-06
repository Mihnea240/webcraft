import { ArrayType, Bit, Float16, Int8, SignedBit, Struct, Uint32, Uint8 } from "bitpacker";

const QuaternionStruct = new Uint32(); // Or we can use Uint32 for 32-bit smallest-three
const FaceUVStruct = new Struct({
    u: new Uint8(),
    v: new Uint8(),
    w: new Int8(),
    h: new Int8(),
});

const rangeStruct = new Struct({ min: new SignedBit(4), max: new SignedBit(4) });

export const CubeStruct = new Struct({
    // --- Geometry & Scale (17 Bytes) ---
    rotation: QuaternionStruct,
    offset: new ArrayType(new Float16(), 3),
    scale: new ArrayType(new Float16(), 3),
    
    // --- Face UVs (6 Faces * 4 Bytes = 24 Bytes) ---
    uvs: new ArrayType(FaceUVStruct, 6),  
    // --- 40 bytes so far ---

    texture_x_exponent: new Bit(4),
    texture_y_exponent: new Bit(4),    

    // --- Random Offset Parameters (4 Bytes) ---
    x_offset: rangeStruct,
    y_offset: rangeStruct,
    z_offset: rangeStruct,
    
    x_offset_step: new Bit(2),
    y_offset_step: new Bit(2),
    z_offset_step: new Bit(2),

    random_offset_enabled: new Bit(1),
    pad1: new Bit(1),

    // --- Move the cube faces along the normal direction (1 Byte) ---
    inset: new Uint8(),
    // --- Rotate the cube faces relative to the normal direction upwards (1 Byte) ---
    inset_angle: new Uint8(), 



});    
