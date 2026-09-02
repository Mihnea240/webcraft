import { Chunk, ChunkState } from "@engine/chunk/";
import { BlockDescriptor } from "../resource_manager/registry/blockTypeRegistry";
import { World } from "../world";
import { BlockDescriptorView } from "./blockDescriptorView";


function compressChunkPosition(x: number, y: number, z: number) {
    return (x << (Chunk.LOG2_SIZE << 1)) | (y << Chunk.LOG2_SIZE) | z;
}


export class BlockRefrence {
    public chunk?: Chunk;
    chunkX: number = 0;
    chunkY: number = 0;
    chunkZ: number = 0;
    chunkPosition: number = 0;

    blockView: BlockDescriptorView;

    constructor(public world: World, worldPosition: [number, number, number] = [0, 0, 0]) {
        this.setPosition(worldPosition[0], worldPosition[1], worldPosition[2]);

        this.blockView = new BlockDescriptorView(world);
        this.blockView.beforeUpdate = this.onUpdate.bind(this);
    }

    get worldX() {
        return (this.chunkX << Chunk.LOG2_SIZE) + (this.chunkPosition & (Chunk.SIZE - 1));
    }

    get worldY() {
        return (this.chunkY << Chunk.LOG2_SIZE) + ((this.chunkPosition >> (Chunk.LOG2_SIZE << 1)) & (Chunk.SIZE - 1));
    }

    get worldZ() {
        return (this.chunkZ << Chunk.LOG2_SIZE) + ((this.chunkPosition >> Chunk.LOG2_SIZE) & (Chunk.SIZE - 1));
    }

    setPosition(x: number, y: number, z: number) { 
        this.chunkX = x >> Chunk.LOG2_SIZE;
        this.chunkY = y >> Chunk.LOG2_SIZE;
        this.chunkZ = z >> Chunk.LOG2_SIZE;
        this.chunkPosition = compressChunkPosition(
            x & (Chunk.SIZE - 1),
            y & (Chunk.SIZE - 1),
            z & (Chunk.SIZE - 1)
        );

        this.chunk = this.world.chunkManager.get(this.chunkX, this.chunkY, this.chunkZ);
    }

    step(x: number, y: number, z: number) {
        let newX = (this.chunkPosition & (Chunk.SIZE - 1)) + x;
        let newZ = ((this.chunkPosition >> (Chunk.LOG2_SIZE)) & (Chunk.SIZE - 1)) + z;
        let newY = (this.chunkPosition >> (Chunk.LOG2_SIZE << 1)) + y;

        if(newX < 0 || newX >= Chunk.SIZE || newY < 0 || newY >= Chunk.SIZE || newZ < 0 || newZ >= Chunk.SIZE) {
            this.setPosition(this.worldX + x, this.worldY + y, this.worldZ + z);
            return true;
        }

        this.chunkPosition = compressChunkPosition(newX, newY, newZ);

        return false;
    }

    onUpdate(oldDescriptor: BlockDescriptor, newDescriptor: BlockDescriptor, remeshFlags: number) {
        this.chunk!.status = ChunkState.Dirty;

        if (oldDescriptor !== newDescriptor) {
        }
    }

    getBlockView() { 
        if (!this.chunk) return undefined;

        const view = this.blockView;
        const blockDescriptor = this.chunk.getDescriptorByCompressedPosition(this.chunkPosition);
        if (!blockDescriptor) return undefined;

        view.setDescriptor(blockDescriptor);

        return view;
    }
}