import fs from "fs";
import JSZip from "jszip";

// Pipeline Actions
const ACTIONS = {
    KEEP: "keep",
    DELETE: "delete",
    TRANSFORM: "transform" 
};

// Define Processor Rules
const rules = [
    {
        // Match terrain texture mapping
        pattern: /^textures\/|^models\/|^entity\/|^biomes\//,
        action: ACTIONS.KEEP
    },
    {
        // Match the manifest file
        pattern: /^manifest\.json$/,
        action: ACTIONS.KEEP
    },
    {
        // Catch-all: delete everything else
        pattern: /.*/,
        action: ACTIONS.DELETE
    }
];

// Main processing pipeline
async function runPipeline(inputPath, outputPath) {
    console.log(`Processing resource pack: ${inputPath}...`);
    const inputBuffer = fs.readFileSync(inputPath);
    const sourceZip = await JSZip.loadAsync(inputBuffer);
    
    // Create a fresh zip to copy elements to (avoids deletion overhead)
    const targetZip = new JSZip();

    // Iterate through all source entries
    for (const [relativePath, fileEntry] of Object.entries(sourceZip.files)) {
        if (fileEntry.dir) continue; // Skip directory entries

        // Find the first rule that matches the file path
        const rule = rules.find(r => r.pattern.test(relativePath));
        if (!rule) continue;

        if (rule.action === ACTIONS.KEEP) {
            // Copy file exactly as is
            const fileData = await fileEntry.async("nodebuffer");
            targetZip.file(relativePath, fileData);
        } 
        // DELETE action does nothing (we just don't copy the file)
    }

    console.log(`Saving optimized pack to: ${outputPath}...`);
    const outputBuffer = await targetZip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: { level: 6 } // Good balance of size and speed
    });
    
    fs.writeFileSync(outputPath, outputBuffer);
    console.log("Processing finished successfully.");
}

// Example usage
runPipeline("./src/assets/rp.zip", "./src/assets/rp_stripped.zip").catch(console.error);
