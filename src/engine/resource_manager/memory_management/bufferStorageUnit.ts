import { DataViewPacker, Struct } from "bitpacker";
import { StorageUnit } from "./storageUnit";

export class BufferStorageUnit<TSchema extends Struct<any>, MetaType> implements StorageUnit<any, MetaType> {
    private _buffer: ArrayBuffer;
    private packer: DataViewPacker<TSchema>;
    private readonly metadataTable: MetaType[] = [];
    
    private isCheckedOut = false;
    private allocatedLength = 0;
    private elementStride: number;

    /** Simple callback invoked when backing ArrayBuffer doubles/reallocates */
    public onResize?: (newBuffer: ArrayBuffer) => void;

    constructor(schema: TSchema, initialSize: number = 4096, public useMetadata: boolean = true) {
        this.elementStride = schema.stride;
        this._buffer = new ArrayBuffer(initialSize * this.elementStride);
        this.packer = new DataViewPacker(schema, false);
        this.packer.setBuffer(this._buffer);
    }

    get buffer() { 
        return this._buffer;
    }

    /** Number of logically stored items */
    public get size(): number {
        return this.allocatedLength;
    }

    /** Number of items that fit before reallocation */
    public get capacity(): number {
        return Math.floor(this._buffer.byteLength / this.elementStride);
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
            let nextSize = this._buffer.byteLength * 2;
            while (nextSize < requiredBytes) {
                nextSize *= 2;
            }
            this.resizeBuffer(nextSize);
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

    /** Copies the struct data and metadata from fromId to toId */
    public copySlot(fromId: number, toId: number): void {
        const destOffset = toId * this.elementStride;
        const srcOffset = fromId * this.elementStride;

        new Uint8Array(this._buffer, destOffset, this.elementStride).set(
            new Uint8Array(this._buffer, srcOffset, this.elementStride)
        );

        if (this.useMetadata) {
            this.metadataTable[toId] = this.metadataTable[fromId];
        }
    }

    /** Pops the last allocated slot */
    public popSlot(): void {
        if (this.allocatedLength <= 0) return;
        if (this.useMetadata) {
            this.metadataTable.pop();
        }
        this.allocatedLength--;
    }

    /** Swaps the last item into the given id and pops the last slot */
    public swapAndPop(id: number): void {
        if (id < 0 || id >= this.allocatedLength) return;
        const lastId = this.allocatedLength - 1;
        if (id < lastId) {
            this.copySlot(lastId, id);
        }
        this.popSlot();
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
        this.onResize?.(newBuffer);
    }
}
