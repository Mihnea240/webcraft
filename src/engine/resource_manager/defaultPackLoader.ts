import { ResourcePack } from "./RP";

// Instantiate the default pack pointing to rp.zip as requested
export const defaultPack = new ResourcePack("/src/assets/addon.zip");
defaultPack.default();

// Cache the load promise to resolve asynchronously to any requesting worlds
export const loadPromise = defaultPack.load()
    .then(() => {
        console.log("[DefaultPackLoader] Default resource pack successfully loaded and compiled off-thread.");
    })
    .catch(err => {
        console.error("[DefaultPackLoader] Failed to load default resource pack:", err);
    });


// Listen to world initialization events requesting the resource pack
document.addEventListener("request-resource-pack", (e) => {
    const world = e.detail;
    console.log("[DefaultPackLoader] World requested default resource pack:", world);
    if (!world) return;

    // 1. Assign pack immediately: triggers world.init() & pipeline.precompile() concurrently with worker
    world.setResourcePack(defaultPack);
    console.log("[DefaultPackLoader] Default resource pack assigned to world; shader precompilation initiated.");

    // 2. Once worker finishes decoding assets, generate the test world
    loadPromise.then(() => {
        console.log("[DefaultPackLoader] Assets decoded. Initializing world chunks...");
        world.loadWorld();
    });
});
