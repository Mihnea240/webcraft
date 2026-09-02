import { CubeStruct } from "@engine/packing_schemas/cube";
import { InferCPUType } from "bitpacker";
import { BufferStorageUnit } from "../memory_management/bufferStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";

export type CubeGeometryDescriptor = InferCPUType<typeof CubeStruct>;
export type CubeGeometryMetadata = [string, string, string, string, string, string];

/**
 * Holds the flat GPU-bound cube geometry specifications for custom block models.
 */
export class CubeGeometryRegistry extends ResourceRegistry<CubeGeometryDescriptor, CubeGeometryMetadata> {
    declare public storage: BufferStorageUnit<typeof CubeStruct, CubeGeometryMetadata>;

    createStorageUnit(): BufferStorageUnit<typeof CubeStruct, CubeGeometryMetadata> {
        // Initial size of 4096 cubes, backed by BufferStorageUnit
        return new BufferStorageUnit(
            CubeStruct,
            4096,
        );
    }
}
