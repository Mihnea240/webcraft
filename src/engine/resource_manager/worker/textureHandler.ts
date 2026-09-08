import { extractHeaders } from "@engine/utils/decoders";
import { GeometryMapper } from "../parsers/geometryMapper";
import { TextureMapper } from "../parsers/textureMapper";
import { AtlasRegistry, AtlasTileRegistry, BlockModelRegistry, BlockTextureRegistry, CubeGeometryRegistry } from "../registry";
import { packRegistries, unpackRegistries } from "./payloadPacker";
import { WorkerEventType, WorkerRequest, WorkerResponse } from "./workerDataProtocol";

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
    const request = event.data;

    if (request.type === WorkerEventType.PARSE_RESOURCE_PACK) {
        try {
            const registries = {
                blockTextures: new BlockTextureRegistry(),
                atlasTiles: new AtlasTileRegistry(),
                atlasLayers: new AtlasRegistry(),
                cubeGeometries: new CubeGeometryRegistry(),
                blockModels: new BlockModelRegistry()
            };

            // 1. Unpack registries transferred from main thread
            unpackRegistries(registries, request);

            // 2. Extract ZIP headers once for all mappers
            const headers = extractHeaders(request.zipBuffer);

            // 3. Run Texture parsing & Atlas building
            const startTime = performance.now();
            const textureMapper = new TextureMapper(
                request.zipBuffer,
                headers,
                registries.blockTextures,
                registries.atlasTiles,
                registries.atlasLayers
            );
            textureMapper.parse();

            // 4. Run Geometry & 3D model parsing
            const geometryMapper = new GeometryMapper(
                request.zipBuffer,
                headers,
                registries.cubeGeometries,
                registries.blockModels
            );
            await geometryMapper.parse();

            const duration = performance.now() - startTime;
            console.log(`[Worker] RP asset parsing took ${duration.toFixed(2)}ms`);

            // 5. Export metadata and checkout buffers to transfer back
            const payload = packRegistries(registries);

            const response: WorkerResponse = {
                type: WorkerEventType.RESOURCE_PACK_PARSED,
                metadata: payload.metadata,
                bufferCounts: payload.bufferCounts,
                buffers: payload.buffers
            };

            // Transfer the buffers back to the main thread
            self.postMessage(response, { transfer: payload.buffers });
        } catch (error) {
            console.error("Worker resource extraction failed:", error);
            throw error;
        }
    }
};