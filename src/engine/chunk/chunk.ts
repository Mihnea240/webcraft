import { BlockDescriptor } from "src/engine/resource_manager/registry/blockTypeRegistry";
import { Array3D } from "src/engine/utils/array3D";
import { World } from "src/engine/world";
import { BlockPallet } from "./pallet";

export const enum ChunkState { 
    Empty = 0,
    Dirty = 1,
    Meshed = 2,
}

const OFFSET_XZ = 0x80000;
const MASK_XZ = 0xFFFFF;
const MASK_Y = 0xFFF;

export function getChunkSpatialKey(cx: number, cy: number, cz: number) {
    const x = (cx + OFFSET_XZ) & MASK_XZ;
    const y = cy & MASK_Y;
    const z = (cz + OFFSET_XZ) & MASK_XZ;
    return (x * 4294967296) + (y << 20) + z;
}


export class Chunk {
    static readonly SIZE = 16;
    static readonly LOG2_SIZE = 4;
    pallet: BlockPallet;
    data?: Array3D<any>;
    status = ChunkState.Empty;

    static compressPosition(x: number, y: number, z: number) {
        return x | (z << Chunk.LOG2_SIZE) | (y << (Chunk.LOG2_SIZE << 1));
    }

    static compressedPosiztion(x: number, y: number, z: number) {
        return Chunk.compressPosition(x, y, z);
    }

    markDirty() {
        this.status = ChunkState.Dirty;
        this.world.chunkManager.markDirty(this);
    }

    constructor(public world: World, public worldPosition: [number, number, number]) {
        this.pallet = new BlockPallet(world);
    }

    getHash() { 
        const [x, y, z] = this.worldPosition;
        return getChunkSpatialKey(x, y, z);
    }

    allocate() {
        const size = this.pallet.size;
        const byteCount = Math.ceil(size / 8);

        switch (byteCount) {
            case 0:
                this.data = undefined;
                break;
            case 1:
                this.data = new Array3D<Uint8Array>(Chunk.SIZE, Chunk.SIZE, Chunk.SIZE).allocateBuffer(Uint8Array);
                break;
            case 2:
                this.data = new Array3D<Uint16Array>(Chunk.SIZE, Chunk.SIZE, Chunk.SIZE).allocateBuffer(Uint16Array);
                break;
            case 3:
            case 4:
                this.data = new Array3D<Uint32Array>(Chunk.SIZE, Chunk.SIZE, Chunk.SIZE).allocateBuffer(Uint32Array);
                break;
            default:
                throw new Error(`Chunk pallet size too large: ${size}`);
        }
    }

    realocate() {
        const oldData = this.data;
        this.allocate();

        if (!oldData) return;
        const size = oldData.size;

        for (let i = 0; i < size; i++) {
            this.data!.data[i] = oldData.data[i];
        }
    }

    getDescriptor(x: number, y: number, z: number) {
        if (!this.data) return undefined;

        const palletId = this.data.get(x, y, z);
        return this.pallet.getDescriptor(palletId);
    }

    getDescriptorByCompressedPosition(compressedPosition: number) {
        const palletId = this.data?.data[compressedPosition];
        return this.pallet.getDescriptor(palletId!);
    }

    placeBlock(x: number, y: number, z: number, descriptor: BlockDescriptor) {
        const palletId = this.pallet.addBlock(descriptor);
        if (!this.data) {
            this.allocate();
        }

        this.data!.set(x, y, z, palletId);
        this.markDirty();
    }

    placePalletId(x: number, y: number, z: number, palletId: number) {
        if (!this.data) {
            this.allocate();
        }
        this.data!.set(x, y, z, palletId);
        this.markDirty();
    }

}