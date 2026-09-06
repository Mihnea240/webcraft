import { Chunk } from "@engine/chunk/";
import { BlockDescriptor } from "../resource_manager/registry/blockTypeRegistry";
import { World } from "../world";
import { BlockDescriptorView } from "./blockDescriptorView";

export class BlockRefrence {
    public chunk?: Chunk;
    public chunkX: number = 0;
    public chunkY: number = 0;
    public chunkZ: number = 0;
    public localX: number = 0;
    public localY: number = 0;
    public localZ: number = 0;
    public chunkPosition: number = 0;

    private blockView?: BlockDescriptorView;

    constructor(public world: World, worldPosition?: [number, number, number]) {
        if (worldPosition) {
            this.setPosition(worldPosition[0], worldPosition[1], worldPosition[2]);
        }
    }

    get worldX(): number {
        return (this.chunkX << Chunk.LOG2_SIZE) + this.localX;
    }

    get worldY(): number {
        return (this.chunkY << Chunk.LOG2_SIZE) + this.localY;
    }

    get worldZ(): number {
        return (this.chunkZ << Chunk.LOG2_SIZE) + this.localZ;
    }

    setPosition(x: number, y: number, z: number): this { 
        const cx = x >> Chunk.LOG2_SIZE;
        const cy = y >> Chunk.LOG2_SIZE;
        const cz = z >> Chunk.LOG2_SIZE;

        if (cx !== this.chunkX || cy !== this.chunkY || cz !== this.chunkZ || !this.chunk) {
            this.chunkX = cx;
            this.chunkY = cy;
            this.chunkZ = cz;
            this.chunk = this.world.chunkManager.getChunkAt(cx, cy, cz);
        }

        this.localX = x & (Chunk.SIZE - 1);
        this.localY = y & (Chunk.SIZE - 1);
        this.localZ = z & (Chunk.SIZE - 1);
        this.chunkPosition = Chunk.compressPosition(this.localX, this.localY, this.localZ);

        return this;
    }

    setChunkPosition(chunk: Chunk, lx: number, ly: number, lz: number): this {
        this.chunk = chunk;
        this.chunkX = chunk.worldPosition[0];
        this.chunkY = chunk.worldPosition[1];
        this.chunkZ = chunk.worldPosition[2];
        this.localX = lx;
        this.localY = ly;
        this.localZ = lz;
        this.chunkPosition = Chunk.compressPosition(lx, ly, lz);
        return this;
    }

    step(dx: number, dy: number, dz: number): boolean {
        const nx = this.localX + dx;
        const ny = this.localY + dy;
        const nz = this.localZ + dz;

        if (nx >= 0 && nx < Chunk.SIZE && ny >= 0 && ny < Chunk.SIZE && nz >= 0 && nz < Chunk.SIZE) {
            this.localX = nx;
            this.localY = ny;
            this.localZ = nz;
            this.chunkPosition = Chunk.compressPosition(nx, ny, nz);
            return false;
        }

        this.setPosition(this.worldX + dx, this.worldY + dy, this.worldZ + dz);
        return true;
    }

    getDescriptor(): BlockDescriptor | undefined {
        if (!this.chunk || !this.chunk.data) return undefined;
        const palletId = this.chunk.data.get(this.localX, this.localY, this.localZ);
        if (palletId === undefined) return undefined;
        return this.chunk.pallet.getDescriptor(palletId);
    }

    setBlock(descriptor: BlockDescriptor): this {
        if (this.chunk) {
            this.chunk.placeBlock(this.localX, this.localY, this.localZ, descriptor);
        }
        return this;
    }

    getBlockView(): BlockDescriptorView | undefined { 
        if (!this.chunk) return undefined;

        const blockDescriptor = this.getDescriptor();
        if (blockDescriptor === undefined) return undefined;

        if (!this.blockView) {
            this.blockView = new BlockDescriptorView(this.world);
            this.blockView.beforeUpdate = this.onUpdate.bind(this);
        }

        this.blockView.setDescriptor(blockDescriptor);
        return this.blockView;
    }

    onUpdate(oldDescriptor: BlockDescriptor, newDescriptor: BlockDescriptor, remeshFlags: number) {
        if (this.chunk && oldDescriptor !== newDescriptor) {
            this.chunk.placeBlock(this.localX, this.localY, this.localZ, newDescriptor);
        }
    }
}