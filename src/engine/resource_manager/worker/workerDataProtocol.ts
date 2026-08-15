import { AtlasTile } from "../atlasTileRegistry";

export const enum WorkerEventType {
    PARSE_RESOURCE_PACK,
    RESOURCE_PACK_PARSED,
    PARSE_RESOURCE_PACK_ERROR,
}

export interface WorkerResponse {
    type: WorkerEventType.RESOURCE_PACK_PARSED;
    atlasBuffer: ArrayBuffer;

    textureRegistry: {
        buffer: ArrayBuffer;
        offset: number;
        length: number;
        nameToIdMap: [string, number][]
    }

    atlasTileRegistry: {
        length: number;
        nameToTile: [string,  AtlasTile][]
    }
}

export interface WorkerRequest {
    type: WorkerEventType.PARSE_RESOURCE_PACK;
    zipBuffer: ArrayBuffer;
    atlasBuffer: ArrayBuffer;


    textureRegistry: {
        buffer: ArrayBuffer;
        offset: number;
    }
}