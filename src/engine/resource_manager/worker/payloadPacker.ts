import { ResourceRegistry } from "../registry/resourceRegistry";

export interface PackedRegistryPayload {
    metadata: Record<string, any>;
    bufferCounts: Record<string, number>;
    buffers: ArrayBuffer[];
}

/**
 * Packs metadata and checks out all underlying transferable buffers for a dictionary of registries.
 */
export function packRegistries(registries: Record<string, ResourceRegistry<any, any>>): PackedRegistryPayload {
    const metadata: Record<string, any> = {};
    const buffers: ArrayBuffer[] = [];
    const bufferCounts: Record<string, number> = {};

    for (const [key, registry] of Object.entries(registries)) {
        metadata[key] = registry.exportMetadata();
        const registryBuffers = registry.checkoutBuffers();
        buffers.push(...registryBuffers);
        bufferCounts[key] = registryBuffers.length;
    }

    return { metadata, bufferCounts, buffers };
}

/**
 * Imports metadata and re-attaches/binds returned binary buffers for a dictionary of registries.
 */
export function unpackRegistries(
    registries: Record<string, ResourceRegistry<any, any>>,
    payload: { metadata: Record<string, any>; bufferCounts: Record<string, number>; buffers: ArrayBuffer[] }
): void {
    let bufferIndex = 0;
    for (const [key, registry] of Object.entries(registries)) {
        const count = payload.bufferCounts[key] || 0;
        const registryBuffers = payload.buffers.slice(bufferIndex, bufferIndex + count);
        bufferIndex += count;

        registry.importMetadata(payload.metadata[key]);
        registry.importBuffers(registryBuffers);
    }
}
