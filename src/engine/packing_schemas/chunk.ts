import { Int32, Struct } from "bitpacker";

export const ChunkDataStruct = new Struct({
    x: new Int32(),
    y: new Int32(),
    z: new Int32(),
});
