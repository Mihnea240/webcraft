import { TextureStruct } from "@engine/packing_schemas/texture";
import { InferCPUType } from "bitpacker";
import * as Constants from "../constants";
import { BufferStorageUnit } from "../memory_management/bufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

// The data layout that gets packed for the GPU
export type BlockTextureDescriptor = InferCPUType<typeof TextureStruct>;

/**
 * Holds the local mappings and forwards descriptor storage operations to the GlobalStorage unit.
 */
export class BlockTextureRegistry extends ResourceRegistry<BlockTextureDescriptor, any> {
    declare public storage: BufferStorageUnit<typeof TextureStruct, any>;

    createStorageUnit(): BufferStorageUnit<typeof TextureStruct, any> {
        return new BufferStorageUnit(
            TextureStruct,
            Constants.INITIAL_TEXTURE_DESCRIPTOR_BUFFER_SIZE / TextureStruct.stride,
            true
        );
    }
}