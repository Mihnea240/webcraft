import { ResourceRegistry } from "./registry/resourceRegistry";
import { WorkerEventType } from "./worker/workerDataProtocol";
import { packRegistries, unpackRegistries, PackedRegistryPayload } from "./worker/payloadPacker";

export class WorkerEntryPoint {
    private worker: Worker | null = null;

    constructor() {}

    /**
     * Spawns or retrieves the active Web Worker
     */
    private getWorker(): Worker {
        this.worker ??= new Worker(
            new URL("./worker/textureHandler.ts", import.meta.url),
            { type: "module" }
        );
        return this.worker;
    }

    /**
     * Extracts buffers and metadata from a dictionary of registries.
     */
    public preparePayload(registries: Record<string, ResourceRegistry<any, any>>): PackedRegistryPayload {
        return packRegistries(registries);
    }

    /**
     * Binds returned buffers and metadata back into a dictionary of registries.
     */
    public interpretPayload(
        registries: Record<string, ResourceRegistry<any, any>>,
        payload: PackedRegistryPayload
    ): void {
        unpackRegistries(registries, payload);
    }

    /**
     * Sends a specific workload request to the worker and waits for completion.
     */
    public async executeWorkload(
        payload: PackedRegistryPayload,
        zipBuffer: ArrayBuffer,
        eventType: WorkerEventType
    ): Promise<PackedRegistryPayload> {
        const worker = this.getWorker();

        const request = {
            type: eventType,
            zipBuffer,
            metadata: payload.metadata,
            bufferCounts: payload.bufferCounts,
            buffers: payload.buffers
        };

        const transferables: Transferable[] = [zipBuffer, ...payload.buffers];
        worker.postMessage(request, transferables);

        return new Promise((resolve, reject) => {
            worker.onmessage = (event: MessageEvent<any>) => {
                const response = event.data;
                resolve({
                    metadata: response.metadata,
                    bufferCounts: response.bufferCounts,
                    buffers: response.buffers
                });
            };

            worker.onerror = (error) => {
                reject(error);
            };
        });
    }

    /**
     * Cleans up the worker instance
     */
    public terminate(): void {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}
