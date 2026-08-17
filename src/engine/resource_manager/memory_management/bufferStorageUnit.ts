import { DataViewPacker, Struct } from "bitpacker";
import { StorageUnit } from "./storageUnit";

export class BufferStorageUnit<TSchema extends Struct<any>, MetaType> implements StorageUnit<any, MetaType> {
    private buffer: ArrayBuffer;
    private packer: DataViewPacker<TSchema>;
    private readonly metadataTable: MetaType[] = [];
    
    private isCheckedOut = false;
    private allocatedLength = 0;
    private elementStride: number;

    constructor(schema: TSchema, initialSize: number = 4096, public useMetadata: boolean = true) {
        this.elementStride = schema.stride;
        this.buffer = new ArrayBuffer(initialSize * this.elementStride);
        this.packer = new DataViewPacker(schema);
        this.packer.setBuffer(this.buffer);
    }

    public get(id: number) {
        if (this.isCheckedOut) return undefined;
        this.packer.byteOffset = id * this.elementStride;
        return this.packer.view;
    }

    public set(id: number, value: Partial<any>) {
        if (this.isCheckedOut) return;
        const view = this.get(id);
        if (view) {
            Object.assign(view, value);
        }
    }

    public getMeta(id: number): MetaType | undefined {
        return this.metadataTable[id];
    }

    public setMeta(id: number, value: MetaType) {
        this.metadataTable[id] = value;
    }

    public writePointer(): number {
        return this.allocatedLength;
    }

    public add(value: Partial<any>, meta?: MetaType): number {
        const id = this.allocatedLength;
        this.allocatedLength++;

        const requiredBytes = this.allocatedLength * this.elementStride;
        if (requiredBytes > this.buffer.byteLength) {
            this.resizeBuffer(this.buffer.byteLength * 2);
        }

        // Zero out the newly allocated slot in the buffer to guarantee clean defaults
        const byteOffset = id * this.elementStride;
        new Uint8Array(this.buffer, byteOffset, this.elementStride).fill(0);

        // Write packed binary struct data
        this.packer.byteOffset = byteOffset;
        Object.assign(this.packer.view, value);

        // Store metadata
        if (this.useMetadata && meta !== undefined) {
            this.setMeta(id, meta);
        }

        return id;
    }

    // --- Transferable Checkout/Return for Web Workers ---

    public checkoutBuffer(): ArrayBuffer {
        this.isCheckedOut = true;
        return this.buffer;
    }

    public importBuffer(returnedBuffer: ArrayBuffer, newLength: number) {
        this.buffer = returnedBuffer;
        this.packer.setBuffer(returnedBuffer);
        this.allocatedLength = newLength;
        this.isCheckedOut = false;
    }

    // --- Export / Import Protocol for Registry Serialization ---

    public exportMetadata() {
        return {
            metadata: [...this.metadataTable],
            length: this.allocatedLength
        };
    }

    public importMetadata(state: {
        metadata: MetaType[];
        length: number;
    }): void {
        this.allocatedLength = state.length;
        if (state.metadata) {
            this.metadataTable.length = 0;
            this.metadataTable.push(...state.metadata);
        }
    }

    private resizeBuffer(newSize: number) {
        const newBuffer = new ArrayBuffer(newSize);
        new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
        this.buffer = newBuffer;
        this.packer.setBuffer(newBuffer);
    }
}
