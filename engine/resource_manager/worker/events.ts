import { AtlasTile } from "../atlasTileRegistry";

export const enum WorkerEventType {
    PARSE_RESOURCE_PACK,
    RESOURCE_PACK_PARSED,
    PARSE_RESOURCE_PACK_ERROR,
}

export interface WorkerResponseEvent {
    type: WorkerEventType.RESOURCE_PACK_PARSED;
    atlasBuffer: ArrayBuffer;

    textureRegistry: {
        buffer: ArrayBuffer;
        offset: number;
        length: number;
        nameToIdMap: [string, number][]
    }

    atlasTileRegistry: {
        offset: number;
        length: number;
        data: [string,  AtlasTile]
    }
}

export interface WorkerRequestEvent {
    type: WorkerEventType.PARSE_RESOURCE_PACK;
    zipBuffer: ArrayBuffer;

    textureRegistry: {
        buffer: ArrayBuffer;
        offset: number;
    }
}