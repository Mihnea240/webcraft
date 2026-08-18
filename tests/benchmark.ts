import { ResourcePack } from "../src/engine/resource_manager/RP";
import { AtlasRegistry } from "../src/engine/resource_manager/registry/atlasRegistry";
import { AtlasTileRegistry } from "../src/engine/resource_manager/registry/atlasTileRegistry";
import { BlockTextureRegistry } from "../src/engine/resource_manager/registry/blockTextureRegistry";

const logsContainer = document.getElementById("logs")!;
const metricsContainer = document.getElementById("metrics")!;

function log(message: string, type: "info" | "success" | "warning" = "info") {
    const entry = document.createElement("div");
    entry.className = `log-entry log-${type}`;
    entry.innerText = message;
    logsContainer.appendChild(entry);
}

function updateMetric(id: string, timeMs: number) {
    document.getElementById(id)!.innerText = `${timeMs.toFixed(1)}ms`;
}

async function run() {
    const tStart = performance.now();
    log("Awaiting background zip pre-fetch...", "info");

    const tFetchStart = performance.now();
    // 1. Wait for fetch to complete
    let zipBuffer: ArrayBuffer;
    try {
        zipBuffer = await (window as any).__defaultPackPromise;
    } catch (err) {
        log(`Pre-fetch promise failed. Trying direct fetch...`, "warning");
        const res = await fetch("/src/assets/resource_pack.zip");
        zipBuffer = await res.arrayBuffer();
    }
    const tFetchEnd = performance.now();
    updateMetric("fetch-time", tFetchEnd - tFetchStart);
    log(`Fetch complete. Received ${zipBuffer.byteLength.toLocaleString()} bytes.`, "success");

    // 2. Initialize ResourcePack
    const pack = new ResourcePack("/src/assets/resource_pack.zip");
    pack.default();

    // 3. Await unzipping / headers extraction
    log("Extracting ZIP file headers...", "info");
    const tHeadersStart = performance.now();
    const { extractHeaders, fileToJson } = await import("../src/engine/utils/decoders");
    const fileMap = extractHeaders(zipBuffer);
    const tHeadersEnd = performance.now();
    updateMetric("headers-time", tHeadersEnd - tHeadersStart);
    log(`Headers extracted. Found ${fileMap.size} files in ZIP.`, "success");

    // 4. Metadata extraction
    log("Parsing manifest.json...", "info");
    const tMetaStart = performance.now();
    const manifestFile = fileMap.get("manifest.json")!;
    const manifestJson = await fileToJson(zipBuffer, manifestFile);
    const metadata = {
        name: manifestJson.header?.name ?? "Unnamed Pack",
        version: manifestJson.header?.version?.join('.') ?? "0.0.0",
        description: manifestJson.header?.description ?? ""
    };
    const tMetaEnd = performance.now();
    updateMetric("metadata-time", tMetaEnd - tMetaStart);
    log(`Metadata parsed. Pack Name: "${metadata.name}" (v${metadata.version})`, "success");

    // 5. Texture mapping workload off-thread
    log("Sending terrain textures workload to Web Worker...", "info");
    const tStitchStart = performance.now();

    const terrainTextureFile = fileMap.get("textures/terrain_texture.json");
    if (terrainTextureFile) {
        const { WorkerEntryPoint } = await import("../src/engine/resource_manager/workerEntryPoint");
        const { WorkerEventType } = await import("../src/engine/resource_manager/worker/workerDataProtocol");
        
        const entryPoint = WorkerEntryPoint.getInstance();
        const registries = {
            blockTextures: pack.get(BlockTextureRegistry),
            atlasTiles: pack.get(AtlasTileRegistry),
            atlasLayers: pack.get(AtlasRegistry)
        };

        const payload = entryPoint.preparePayload(registries);
        const result = await entryPoint.executeWorkload(
            payload,
            zipBuffer,
            WorkerEventType.PARSE_RESOURCE_PACK
        );

        entryPoint.interpretPayload(registries, result);
    } else {
        log("No textures/terrain_texture.json found inside ZIP!", "warning");
    }

    const tStitchEnd = performance.now();
    updateMetric("stitch-time", tStitchEnd - tStitchStart);
    log("Stitching complete. Mappings and pixel arrays successfully transferred back to registries.", "success");

    // Final total metrics
    const tTotal = performance.now() - tStart;
    updateMetric("total-time", tTotal);
    metricsContainer.style.display = "block";
    log(`Benchmark finished successfully.`, "success");
}

run().catch(err => {
    log(`Benchmark failed: ${err.message}`, "warning");
    console.error(err);
});
