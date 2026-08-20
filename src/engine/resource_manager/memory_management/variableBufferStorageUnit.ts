import { StorageUnit } from "./storageUnit";

type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

/**
 * A generic, variable-length StorageUnit backed by any TypedArray constructor.
 * Dynamically handles element size, buffer resizing, and zero-copy worker transfers.
 */
export class VariableBufferStorageUnit<T extends TypedArray, MetaType> implements StorageUnit<T, MetaType> {
    private buffer: ArrayBuffer;
    private array: T;
    private readonly metadataTable: MetaType[] = [];
    
    private isCheckedOut = false;
    private allocatedLength = 0; // Number of elements allocated in the array
    private bytesPerElement: number;

    constructor(
        private ctor: { new (buffer: ArrayBuffer, byteOffset?: number, length?: number): T },
        initialElements: number = 4096,
        public useMetadata: boolean = true
    ) {
        this.bytesPerElement = (ctor as any).BYTES_PER_ELEMENT || 1;
        this.buffer = new ArrayBuffer(initialElements * this.bytesPerElement);
        this.array = new ctor(this.buffer);
    }

    public get(id: number): T | undefined {
        if (this.isCheckedOut) return undefined;
        // Returns a view starting at the specified element index (byteOffset = id * bytesPerElement)
        return new this.ctor(this.buffer, id * this.bytesPerElement) as T;
    }

    public set(id: number, value: T) {
        if (this.isCheckedOut) return;
        this.array.set(value, id);
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

    /**
     * Appends a variable-length TypedArray packet, returning its start index offset
     */
    public add(value?: T, meta?: MetaType): number {
        if (value === undefined) {
            throw new Error("VariableBufferStorageUnit requires a value to determine length for allocation");
        }
        const id = this.allocatedLength; // Starting element index is the ID
        this.allocatedLength += value.length;

        const requiredBytes = this.allocatedLength * this.bytesPerElement;
        if (requiredBytes > this.buffer.byteLength) {
            this.resizeBuffer(this.buffer.byteLength * 2);
        }

        // Fast memory copy (memcpy) into the contiguous array
        this.array.set(value, id);

        // Store metadata associated with the start of the block
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
        this.array = new this.ctor(returnedBuffer);
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
        new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
        this.buffer = newBuffer;
        this.array = new this.ctor(newBuffer);
    }

    placeArrayAt(id: number, value: number[]) { 
        this.array[id] = value.length;
        this.array.set(value, id + 1);
    }
}
