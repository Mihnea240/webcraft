import { WorkerEventType } from "./worker/workerDataProtocol";
import { packRegistries, unpackRegistries, PackedRegistryPayload } from "./worker/payloadPacker";

export class WorkerEntryPoint {
    private static instance: WorkerEntryPoint | null = null;
    private worker!: Worker;
    private activePromise: Promise<any> | null = null; // The transaction lock

    private constructor() {
        this.initWorker();
    }

    /**
     * Retrieves the single persistent WorkerEntryPoint instance
     */
    public static getInstance(): WorkerEntryPoint {
        if (!this.instance) {
            this.instance = new WorkerEntryPoint();
        }
        return this.instance;
    }

    /**
     * Initializes the background Web Worker once
     */
    private initWorker() {
        this.worker = new Worker(
            new URL("./worker/textureHandler.ts", import.meta.url),
            { type: "module" }
        );
    }

    /**
     * Prepares and checks out transferable buffers from a registry dictionary
     */
    public preparePayload(registries: Record<string, any>): PackedRegistryPayload {
        return packRegistries(registries);
    }

    /**
     * Binds returned buffers and metadata back into a registry dictionary
     */
    public interpretPayload(
        registries: Record<string, any>,
        payload: PackedRegistryPayload
    ): void {
        unpackRegistries(registries, payload);
    }

    /**
     * Dispatches a parsing workload to the persistent background worker.
     * If a transaction is already running, it queues and awaits it sequentially.
     */
    public async executeWorkload(
        payload: PackedRegistryPayload,
        zipBuffer: ArrayBuffer,
        eventType: WorkerEventType
    ): Promise<PackedRegistryPayload> {
        // Queue/lock sequential access to the worker to protect transferable buffer ownership
        while (this.activePromise) {
            await this.activePromise;
        }

        const promise = new Promise<PackedRegistryPayload>((resolve, reject) => {
            const request = {
                type: eventType,
                zipBuffer,
                metadata: payload.metadata,
                bufferCounts: payload.bufferCounts,
                buffers: payload.buffers
            };

            const transferables: Transferable[] = [zipBuffer, ...payload.buffers];
            this.worker.postMessage(request, transferables);

            this.worker.onmessage = (event: MessageEvent<any>) => {
                this.activePromise = null; // Release the lock
                resolve(event.data);
            };

            this.worker.onerror = (error) => {
                this.activePromise = null; // Release the lock on failure
                reject(error);
            };
        });

        // Set the active transaction lock
        this.activePromise = promise;
        return promise;
    }
}
