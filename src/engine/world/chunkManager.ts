import { Chunk } from "src/chunk/chunk";


const OFFSET_XZ = 0x80000; // 2^19 for signed coordinates (-524288 to 524287)
const MASK_XZ = 0xFFFFF;
const MASK_Y = 0xFFF;

// 2^32 as a multiplier because JS bitwise shifts (<<) truncate to 32 bits
function getChunkKey(cx: number, cy: number, cz: number): number {
    const x = (cx + OFFSET_XZ) & MASK_XZ;
    const y = cy & MASK_Y;
    const z = (cz + OFFSET_XZ) & MASK_XZ;

    // Pack: high 20 bits (X), middle 12 bits (Y), low 20 bits (Z)
    // (x * 2^32) + (y * 2^20) + z
    return (x * 4294967296) + (y << 20) + z;
}


export class ChunkManager { 
    chunks: Map<number, Chunk> = new Map();

    addChunk(chunk: Chunk) {
        const [x, y, z] = chunk.worldPosition;
        const key = getChunkKey(x, y, z);

        this.chunks.set(key, chunk);
    }

    get(chunkX: number, chunkY: number, chunkZ: number) {
        const key = getChunkKey(chunkX, chunkY, chunkZ);
        return this.chunks.get(key);
    }

    getFromWorldPosition(x: number, y: number, z: number) { 
        const chunkX = Math.floor(x / Chunk.SIZE);
        const chunkY = Math.floor(y / Chunk.SIZE);
        const chunkZ = Math.floor(z / Chunk.SIZE);

        return this.get(chunkX, chunkY, chunkZ);
    }
}