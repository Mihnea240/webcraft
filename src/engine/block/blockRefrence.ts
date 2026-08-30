import { Chunk, ChunkState } from "src/chunk/chunk";
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

    blockView?: BlockDescriptorView;

    constructor(public world: World, worldPosition: [number, number, number] = [0, 0, 0]) {
        this.setPosition(worldPosition[0], worldPosition[1], worldPosition[2]);

        this.blockView = new BlockDescriptorView(world);
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
        const newX = this.chunkPosition   
    }

    getBlockView() { 
        if (!this.chunk) return undefined;

        const view = this.blockView ??= new BlockDescriptorView(this.world);
        const blockDescriptor = this.chunk.getDescriptorByCompressedPosition(this.chunkPosition);
        if (!blockDescriptor) return undefined;

        view.setDescriptor(blockDescriptor);
        view.beforeUpdate = (oldDescriptor, newDescriptor, flags) => {
            //TODO: Extend this logic
            this.chunk!.status = ChunkState.Dirty;
        }

        return view;
    }
}