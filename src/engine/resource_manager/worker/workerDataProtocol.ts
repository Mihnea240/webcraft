export const enum WorkerEventType {
    PARSE_RESOURCE_PACK,
    RESOURCE_PACK_PARSED,
}

export interface WorkerRequest {
    type: WorkerEventType.PARSE_RESOURCE_PACK;
    zipBuffer: ArrayBuffer;
    metadata: Record<string, any>;
    bufferCounts: Record<string, number>;
    buffers: ArrayBuffer[];
}

export interface WorkerResponse {
    type: WorkerEventType.RESOURCE_PACK_PARSED;
    metadata: Record<string, any>;
    bufferCounts: Record<string, number>;
    buffers: ArrayBuffer[];
}