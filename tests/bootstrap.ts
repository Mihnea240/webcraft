import { WorkerEntryPoint } from "../src/engine/resource_manager/workerEntryPoint";

console.log("[Bootstrap] Spawning worker singleton...");
// Boot the singleton worker immediately
WorkerEntryPoint.getInstance();

console.log("[Bootstrap] Fetching resource pack in background...");
const packUrl = "/src/assets/rp.zip";
(window as any).__defaultPackPromise = fetch(packUrl)
    .then(res => {
        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
        return res.arrayBuffer();
    })
    .catch(err => {
        console.error("[Bootstrap] Fetch failed:", err);
        throw err;
    });
