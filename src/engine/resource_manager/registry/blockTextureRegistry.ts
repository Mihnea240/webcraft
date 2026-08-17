import { TextureStruct } from "@engine/packing_schemas/texture";
import { InferCPUType } from "bitpacker";
import * as Constants from "../constants";
import { BufferStorageUnit } from "../memory_management/bufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

// The data layout that gets packed for the GPU
export type BlockTextureDescriptor = InferCPUType<typeof TextureStruct>;

// Metadata for block textures (information not required on the GPU)
export type BlockTextureMetadata = {
    pure: boolean;
    tinted: boolean; // Flag to specify if the image at that location was tinted/modified
}

/**
 * Holds the local mappings and forwards descriptor storage operations to the GlobalStorage unit.
 */
export class BlockTextureRegistry extends ResourceRegistry<BlockTextureDescriptor, BlockTextureMetadata> {
    createStorageUnit(): BufferStorageUnit<typeof TextureStruct, BlockTextureMetadata> {
        return new BufferStorageUnit(
            TextureStruct,
            Constants.INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE / TextureStruct.stride,
            true
        );
    }
}