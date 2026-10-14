import { hash3D } from "src/engine/utils/hash3D";
import { VariableBufferStorageUnit } from "../memory_management/variableBufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

export type AtlasTile = Uint16Array;

export class AtlasTileRegistry extends ResourceRegistry<Uint16Array, any> {
    declare public storage: VariableBufferStorageUnit<Uint16Array, any>;
    variationStorage!: VariableBufferStorageUnit<Uint16Array, any>;
    variationWritePointer: number = 1;

    constructor(parent?: AtlasTileRegistry) {
        super(parent);
        if (parent) {
            this.variationStorage = parent.variationStorage;
            this.variationWritePointer = parent.variationWritePointer;
        } else {
            this.variationStorage = new VariableBufferStorageUnit<Uint16Array, any>(Uint16Array, 1024, false);
            this.variationWritePointer = 1;
        }
    }

    createStorageUnit(): VariableBufferStorageUnit<Uint16Array, any> {
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

    /**
     * Resolves the final texture ID in BlockTextureRegistry.
     * Fast path: returns direct texture ID with zero hash math.
     * Slow path: lazily calculates 3D block hash and selects weighted variation.
     */
    public getTextureId(
        tileId: number,
        variantId: number,
        worldX: number,
        worldY: number,
        worldZ: number
    ): number {
        const tileVariants = this.get(tileId);
        if (!tileVariants || tileVariants.length === 0) return 0;

        const clampedVariant = Math.min(variantId, tileVariants.length - 1);
        const rawEntry = tileVariants[clampedVariant];

        // Convert unsigned 16-bit to signed 16-bit to check for negative flag
        const entry = (rawEntry << 16) >> 16;

        // Fast path: Direct texture ID (>= 0)
        if (entry >= 0) {
            return entry;
        }

        // Slow path: Variation entry (< 0). Decode offset (-entry)
        const varOffset = -entry;
        const varView = this.variationStorage.get(varOffset);
        if (!varView) return 0;

        const totalElements = varView[0]; // Length prefix
        const variationCount = totalElements >> 1; // Pairs of [textureId, weight]

        // On-demand hash calculation ONLY executed when a variation is hit
        const blockHash = hash3D(worldX, worldY, worldZ);
        const roll = blockHash % 100;
        let cumulativeWeight = 0;

        for (let i = 0; i < variationCount; i++) {
            const pairIndex = 1 + (i << 1);
            const textureId = varView[pairIndex];
            const weight = varView[pairIndex + 1];

            cumulativeWeight += weight;
            if (roll < cumulativeWeight || i === variationCount - 1) {
                return textureId;
            }
        }

        return 0;
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