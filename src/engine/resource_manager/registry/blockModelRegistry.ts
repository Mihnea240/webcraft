import { ArrayStorageUnit } from "../memory_management";
import { ResourceRegistry } from "./resourceRegistry";

export interface BoneData { 
    pivot?: [number, number, number];
    //The range in the cube geometry registry where the cubes for this bone are stored
    cubeStartId: number;
    cubeCount: number;
}

export class BlockModel {
    boneNameToId: Map<string, number> = new Map();
    boneParents: number[] = [];
    boneData: BoneData[] = [];
    visibleBounds = {
        width: 0,
        height: 0,
    };
}

/**
 * CPU-side Model Registry storing custom block geometries (using a bitpacked 32-bit descriptor
 * for offsets, and metadata maps for bone hierarchies, parents, and bounds).
 */
export class BlockModelRegistry extends ResourceRegistry<BlockModel, any> {
    createStorageUnit() {
        return new ArrayStorageUnit<BlockModel, any>(1024, false);
    }
}
