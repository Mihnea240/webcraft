import { Bit, Struct, Uint8 } from "bitpacker";

export const TextureStruct = new Struct({
    // --- First word ---
    atlas_u: new Bit(13),
    atlas_v: new Bit(13),
    atlas_w: new Bit(6),

    // --- Second word ---
    texture_u_exponent: new Bit(4),
    texture_v_exponent: new Bit(4),

    a_framae_cnt: new Uint8(),
    a_speed: new Uint8(),
    
    blend_frames: new Bit(1),
    padding: new Bit(7),
});