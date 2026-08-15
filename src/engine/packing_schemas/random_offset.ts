import { Float16, Struct, Uint8 } from "bitpacker";

//Used for cpu only manipulations as the ubo alignments dont allow for uint32 arrays
 export const RandomOffsetStruct = new Struct({
    min_x: new Float16(),
    min_y: new Float16(),
    min_z: new Float16(),

    max_x: new Float16(),
    max_y: new Float16(),
    max_z: new Float16(),

    step_x: new Uint8(),
    step_y: new Uint8(),
    step_z: new Uint8(),
    padding: new Uint8(),
});