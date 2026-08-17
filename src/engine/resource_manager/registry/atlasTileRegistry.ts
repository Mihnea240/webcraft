import { VariableBufferStorageUnit } from "../memory_management/variableBufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

export type AtlasTile = Uint16Array;

export class AtlasTileRegistry extends ResourceRegistry<Uint16Array, any> {
    variationStorage!: VariableBufferStorageUnit<Uint16Array, any>;
    variationWritePointer: number = 0;

    constructor(parent?: AtlasTileRegistry) {
        super(parent);
        if (parent) {
            this.variationStorage = parent.variationStorage;
            this.variationWritePointer = parent.variationWritePointer;
        }
    }

    createStorageUnit(): VariableBufferStorageUnit<Uint16Array, any> {
        this.variationStorage = new VariableBufferStorageUnit<Uint16Array, any>(Uint16Array, 1024, false);
        return new VariableBufferStorageUnit<Uint16Array, any>(Uint16Array, 4096, false);
    }

    pushVariation(variation: number[]) {
        const id = this.variationWritePointer;
        this.variationStorage.placeArrayAt(id, variation);
        this.variationWritePointer += variation.length + 1; // +1 for the length prefix
        return id;
    }

    pushWithVariation(name: string, variations: (number | number[])[]) {
        const data = new Uint16Array(variations.length);
        for (let i = 0; i < variations.length; i++) {
            const variation = variations[i];
            if (Array.isArray(variation)) {
                data[i] = -this.pushVariation(variation);
            } else {
                data[i] = variation;
            }
        }
        return this.push(name, data, undefined);
    }

    // --- Override Buffer Checkout/Import for Both Storage Units ---

    public override checkoutBuffers(): ArrayBuffer[] {
        return [
            (this.storage as any).checkoutBuffer(),
            this.variationStorage.checkoutBuffer()
        ];
    }

    public override importBuffers(buffers: ArrayBuffer[], writePointers?: number[]): void {
        const mainLength = writePointers ? writePointers[0] : this.storage.writePointer();
        const variationLength = writePointers ? writePointers[1] : this.variationWritePointer;
        
        (this.storage as any).importBuffer(buffers[0], mainLength);
        this.variationStorage.importBuffer(buffers[1], variationLength);
    }

    // --- Override Metadata Export/Import for Variation Write Pointer ---

    public override exportMetadata() {
        const base = super.exportMetadata();
        return {
            ...base,
            variationStorageMetadata: {
                length: this.variationWritePointer,
                storageMetadata: this.variationStorage.exportMetadata()
            }
        };
    }

    public override importMetadata(state: {
        mappings: [string, number][];
        storageMetadata: any;
        variationStorageMetadata?: {
            length: number;
            storageMetadata: any;
        };
    }): void {
        super.importMetadata(state);
        if (state.variationStorageMetadata) {
            this.variationWritePointer = state.variationStorageMetadata.length;
            this.variationStorage.importMetadata(state.variationStorageMetadata.storageMetadata);
        }
    }
}