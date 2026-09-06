import { DataViewPacker, Struct } from "bitpacker";
import { StorageUnit } from "./storageUnit";

export class BufferStorageUnit<TSchema extends Struct<any>, MetaType> implements StorageUnit<any, MetaType> {
    private _buffer: ArrayBuffer;
    private packer: DataViewPacker<TSchema>;
    private readonly metadataTable: MetaType[] = [];
    
    private isCheckedOut = false;
    private allocatedLength = 0;
    private elementStride: number;

    constructor(schema: TSchema, initialSize: number = 4096, public useMetadata: boolean = true) {
        this.elementStride = schema.stride;
        this._buffer = new ArrayBuffer(initialSize * this.elementStride);
        this.packer = new DataViewPacker(schema);
        this.packer = new DataViewPacker(schema, true, true);
        this.packer.setBuffer(this._buffer);
    }

    get buffer() { 
        return this._buffer;
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
        return this.useMetadata ? this.metadataTable[id] : undefined;
    }

    public setMeta(id: number, value: MetaType) {
        if (this.useMetadata) {
            this.metadataTable[id] = value;
        }
    }

    public writePointer(): number {
        return this.allocatedLength;
    }

    public add(value?: Partial<any>, meta?: MetaType): number {
        const id = this.allocatedLength;
        this.allocatedLength++;

        const requiredBytes = this.allocatedLength * this.elementStride;
        if (requiredBytes > this._buffer.byteLength) {
            this.resizeBuffer(this._buffer.byteLength * 2);
        }

        // Zero out the newly allocated slot in the buffer to guarantee clean defaults
        const byteOffset = id * this.elementStride;
        new Uint8Array(this._buffer, byteOffset, this.elementStride).fill(0);

        // Write packed binary struct data
        if (value !== undefined) {
            this.packer.byteOffset = byteOffset;
            Object.assign(this.packer.view, value);
        }

        // Store metadata
        if (this.useMetadata && meta !== undefined) {
            this.setMeta(id, meta);
        }

        return id;
    }

    public remove(id: number): void {
        if (id < 0 || id >= this.allocatedLength) return;

        const lastId = this.allocatedLength - 1;

        if (id < lastId) {
            // Swap last element byte slice into the deleted slot
            const destOffset = id * this.elementStride;
            const srcOffset = lastId * this.elementStride;

            new Uint8Array(this._buffer, destOffset, this.elementStride).set(
                new Uint8Array(this._buffer, srcOffset, this.elementStride)
            );

            if (this.useMetadata) {
                this.metadataTable[id] = this.metadataTable[lastId];
            }
        }

        if (this.useMetadata) {
            this.metadataTable.pop();
        }

        this.allocatedLength--;
    }

    public checkoutBuffer(): ArrayBuffer {
        this.isCheckedOut = true;
        return this._buffer;
    }

    public importBuffer(returnedBuffer: ArrayBuffer, newLength: number) {
        this._buffer = returnedBuffer;
        this.packer.setBuffer(returnedBuffer);
        this.allocatedLength = newLength;
        this.isCheckedOut = false;
    }

    // --- Export / Import Protocol for Registry Serialization ---

    public exportMetadata() {
        return {
            metadata: this.useMetadata ? [...this.metadataTable] : [],
            length: this.allocatedLength
        };
    }

    public importMetadata(state: {
        metadata: MetaType[];
        length: number;
    }): void {
        this.allocatedLength = state.length;
        this.metadataTable.length = 0;
        if (this.useMetadata && state.metadata) {
            this.metadataTable.push(...state.metadata);
        }
    }

    private resizeBuffer(newSize: number) {
        const newBuffer = new ArrayBuffer(newSize);
        new Uint8Array(newBuffer).set(new Uint8Array(this._buffer));
        this._buffer = newBuffer;
        this.packer.setBuffer(newBuffer);
    }
}
