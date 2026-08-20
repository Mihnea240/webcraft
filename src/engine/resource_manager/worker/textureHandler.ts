import { TextureMapper } from "../parsers/textureMapper";
import { WorkerEventType, WorkerRequest, WorkerResponse } from "./workerDataProtocol";
import { packRegistries } from "./payloadPacker";

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
    const request = event.data;
    
    if (request.type === WorkerEventType.PARSE_RESOURCE_PACK) {
        try {
            // Instantiate the mapper, which automatically imports the registries from request
            const mapper = new TextureMapper(request);
            
            // Run the parsing pipeline
            const startTime = performance.now();
            mapper.parse();
            const duration = performance.now() - startTime;
            console.log(`[Worker] Atlas building took ${duration.toFixed(2)}ms`);

            // Export metadata and checkout buffers
            const registries = {
                blockTextures: mapper.blockTextureRegistry,
                atlasTiles: mapper.atlasTileRegistry,
                atlasLayers: mapper.atlasRegistry
            };

            const payload = packRegistries(registries);

            const response: WorkerResponse = {
                type: WorkerEventType.RESOURCE_PACK_PARSED,
                metadata: payload.metadata,
                bufferCounts: payload.bufferCounts,
                buffers: payload.buffers
            };

            // Transfer the buffers back to the main thread
            self.postMessage(response, payload.buffers);
        } catch (error) {
            console.error("Worker texture extraction failed:", error);
            throw error;
        }
    }
};