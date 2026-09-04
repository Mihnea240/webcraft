import { World } from "../world";
import { Chunk } from "./chunk";

import { DataViewPacker } from "bitpacker";
import { QuadStruct } from "../packing_schemas";
import * as Constants from "../resource_manager/constants";

export class ChunkMesher {
    public chunk!: Chunk;
    public world!: World;

    private writePointer = 0;
    quadBuffer = new Uint32Array(Constants.INITIAL_QUAD_BUFFER_SIZE / 4);
    packer = new DataViewPacker(QuadStruct);

    constructor() {
        this.packer.setBuffer(this.quadBuffer.buffer);
    }

    setChunk(chunk: Chunk) {
        this.chunk = chunk;
        this.world = chunk.world;
    }

    mesh() {
        return new Uint8Array(0);
    }


    unpackChunData() {

    }
}