import { TextureStruct } from "@engine/packing_schemas/texture";
import type { AtlasTile } from "./registry/atlasTileRegistry";
import type { BlockTextureMetadata } from "./registry/blockTextureRegistry";
import { ArrayStorageUnit } from "./memory_management/arrayStorageUnit";
import { BufferStorageUnit } from "./memory_management/bufferStorageUnit";

/**
 * Singleton repository holding the active storage units for the entire application/page.
 * Features a compile-time static shape to ensure maximum JIT optimization and zero runtime map lookups.
 */
export class GlobalStorage {
    private static instance: GlobalStorage;

    // Static shape properties
    public readonly blockTextures: BufferStorageUnit<typeof TextureStruct, BlockTextureMetadata>;
    public readonly atlasTiles: ArrayStorageUnit<AtlasTile, any>;

    private constructor() {
        this.blockTextures = new BufferStorageUnit(TextureStruct);
        this.atlasTiles = new ArrayStorageUnit();
    }

    public static getInstance(): GlobalStorage {
        if (!GlobalStorage.instance) {
            GlobalStorage.instance = new GlobalStorage();
        }
        return GlobalStorage.instance;
    }
}
