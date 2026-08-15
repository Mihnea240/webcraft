import { TextureStruct } from "@engine/packing_schemas/texture";
import { DataViewPacker, InferCPUType } from "bitpacker";
import { ResourceRegistry } from "./resourceRegistry";
import type { ResourcePack } from "./RP";
import { WorkerResponse } from "./worker/workerDataProtocol";

export type BlockTextureDescriptor = InferCPUType<typeof TextureStruct>;

export class BlockTextureRegistry extends ResourceRegistry<BlockTextureDescriptor> {
    packer: DataViewPacker<typeof TextureStruct>;
    element_stride: number = 0;
    nameToIdMap: Map<string, number> = new Map();
    
    // Shared write pointer among all clones sharing this buffer
    private sharedState: { length: number };

    constructor(
        public buffer: ArrayBuffer, 
        pack: ResourcePack,
        sharedState?: { length: number }
    ) {
        super(pack);
        this.packer = new DataViewPacker(TextureStruct);
        this.packer.setBuffer(buffer);
        this.element_stride = this.packer.struct.stride;

        if (sharedState) {
            this.sharedState = sharedState;
        } else if (pack.parent) {
            this.sharedState = pack.parent.blockTextureRegistry.sharedState;
        } else {
            this.sharedState = { length: 0 };
        }
    }

    get length(): number {
        return this.sharedState.length;
    }

    set length(value: number) {
        this.sharedState.length = value;
    }

    resizeBuffer(newSize: number) {
        if (newSize < this.length * this.element_stride) {
            throw new Error("New buffer size is too small to hold existing data.");
        }
        const newBuffer = new ArrayBuffer(newSize);
        new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
        this.buffer = newBuffer;
        this.packer.setBuffer(newBuffer);
    }
    
    private getNextAvailableId(): number {
        const id = this.length;
        if ((id + 1) * this.element_stride > this.buffer.byteLength) {
            throw new Error("BlockTextureRegistry buffer is full. Cannot add more textures.");
        }
        this.length++;
        return id;
    }

    protected override getLocalById(id: number): BlockTextureDescriptor | undefined {
        if (id < 0 || id >= this.length) return undefined;

        this.packer.byteOffset = id * this.element_stride;
        return this.packer.view;
    }
    
    protected override getLocalByName(name: string): BlockTextureDescriptor | undefined {
        const id = this.nameToIdMap.get(name);
        if (id === undefined) return undefined;
        return this.getLocalById(id);
    }

    protected override getParentRegistry(): BlockTextureRegistry | undefined {
        return this.pack.parent?.blockTextureRegistry;
    }

    getNextView() {
        return this.getById(this.getNextAvailableId());
    }

    protected override localSize(): number {
        return this.length;
    }

    linkedClone(newPack: ResourcePack): BlockTextureRegistry {
        return new BlockTextureRegistry(this.buffer, newPack, this.sharedState);
    }

    fromWorkerResponse(data: WorkerResponse["textureRegistry"]) {
        this.buffer = data.buffer;
        this.packer.setBuffer(this.buffer);
        this.length = data.length;
    }
}