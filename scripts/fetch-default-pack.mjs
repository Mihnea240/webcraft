/**
 * @file fetch-default-pack.mjs
 * CLI utility and library for downloading, caching, and versioning upstream Minecraft resources:
 * - Bedrock Samples (Mojang/bedrock-samples) & vanilla resource pack (rp.zip)
 * - Java Assets (InventivetalentDev/minecraft-assets models & blockstates)
 * - Bedrock JSON Schemas (Blockception/Minecraft-bedrock-json-schemas)
 */

import { execSync } from "child_process";
import fs from "fs";
import JSZip from "jszip";
import path from "path";

export const CACHE_PATHS = {
    BEDROCK_SAMPLES: ".cache/bedrock-samples",
    BEDROCK_SCHEMAS: ".cache/bedrock-schemas",
    JAVA_MODELS: "./scratch/java_all_models.json",
    JAVA_BLOCKSTATES: "./scratch/java_all_blockstates.json",
    DEFAULT_RP_ZIP: "./src/assets/rp.zip"
};

const URLS = {
    BEDROCK_SAMPLES_REPO: "https://github.com/Mojang/bedrock-samples.git",
    BEDROCK_SCHEMAS_REPO: "https://github.com/Blockception/Minecraft-bedrock-json-schemas.git",
    JAVA_MODELS: (ver = "26.2") => `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/models/block/_all.json`,
    JAVA_BLOCKSTATES: (ver = "26.2") => `https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/${ver}/assets/minecraft/blockstates/_all.json`
};

/**
 * Clones or updates a shallow Git repository in the cache.
 */
export function syncGitRepo(repoUrl, targetDir, { force = false, branch = null } = {}) {
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });

    if (fs.existsSync(targetDir)) {
        if (force) {
            console.log(`[Fetch] Force re-cloning ${repoUrl} into ${targetDir}...`);
            fs.rmSync(targetDir, { recursive: true, force: true });
        } else if (fs.existsSync(path.join(targetDir, ".git"))) {
            console.log(`[Fetch] Updating cached repo in ${targetDir}...`);
            try {
                execSync("git fetch --depth 1", { cwd: targetDir, stdio: "inherit" });
                if (branch) {
                    execSync(`git checkout ${branch}`, { cwd: targetDir, stdio: "inherit" });
                }
                execSync("git pull --ff-only", { cwd: targetDir, stdio: "inherit" });
                return targetDir;
            } catch (err) {
                console.warn(`[Fetch] Update failed (${err.message}). Retaining cached version.`);
                return targetDir;
            }
        }
    }

    console.log(`[Fetch] Shallow cloning ${repoUrl} into ${targetDir}...`);
    const branchArg = branch ? `--branch ${branch}` : "";
    execSync(`git clone --depth 1 ${branchArg} ${repoUrl} "${targetDir}"`, { stdio: "inherit" });
    return targetDir;
}

/**
 * Downloads official Java models and blockstates.
 */
export async function fetchJavaAssets({ force = false, version = "26.2" } = {}) {
    const modelsPath = CACHE_PATHS.JAVA_MODELS;
    const statesPath = CACHE_PATHS.JAVA_BLOCKSTATES;

    fs.mkdirSync(path.dirname(modelsPath), { recursive: true });

    if (!force && fs.existsSync(modelsPath) && fs.existsSync(statesPath)) {
        console.log(`[Fetch] Using existing Java assets in ${path.dirname(modelsPath)} (pass --force to re-download).`);
        return { modelsPath, statesPath };
    }

    console.log(`[Fetch] Downloading Java models (MC ${version})...`);
    const modelsRes = await fetch(URLS.JAVA_MODELS(version));
    if (!modelsRes.ok) throw new Error(`Failed to fetch Java models: ${modelsRes.statusText}`);
    fs.writeFileSync(modelsPath, await modelsRes.text());

    console.log(`[Fetch] Downloading Java blockstates (MC ${version})...`);
    const statesRes = await fetch(URLS.JAVA_BLOCKSTATES(version));
    if (!statesRes.ok) throw new Error(`Failed to fetch Java blockstates: ${statesRes.statusText}`);
    fs.writeFileSync(statesPath, await statesRes.text());

    console.log(`[Fetch] Java assets successfully saved to ${path.dirname(modelsPath)}`);
    return { modelsPath, statesPath };
}

/**
 * Fetches Mojang's bedrock-samples repository and packages the vanilla resource pack.
 */
export async function fetchBedrockSamples({ force = false, branch = null } = {}) {
    const samplesDir = syncGitRepo(URLS.BEDROCK_SAMPLES_REPO, CACHE_PATHS.BEDROCK_SAMPLES, { force, branch });
    const vanillaRpDir = path.join(samplesDir, "resource_pack");

    if (!fs.existsSync(vanillaRpDir)) {
        throw new Error(`Vanilla resource_pack directory not found in ${samplesDir}`);
    }

    // Package vanilla resource_pack into src/assets/rp.zip
    await packageDirectoryToZip(vanillaRpDir, CACHE_PATHS.DEFAULT_RP_ZIP);
    return samplesDir;
}

/**
 * Fetches Blockception's Bedrock JSON schemas.
 */
export function fetchBedrockSchemas({ force = false } = {}) {
    return syncGitRepo(URLS.BEDROCK_SCHEMAS_REPO, CACHE_PATHS.BEDROCK_SCHEMAS, { force });
}

/**
 * Recursively packages a local directory into a ZIP file using JSZip.
 */
export async function packageDirectoryToZip(srcDir, destZipPath) {
    console.log(`[Fetch] Packaging ${srcDir} -> ${destZipPath}...`);
    const zip = new JSZip();

    function addDir(dirPath, zipFolder) {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === ".git") continue;
                addDir(fullPath, zipFolder.folder(entry.name));
            } else if (entry.isFile()) {
                zipFolder.file(entry.name, fs.readFileSync(fullPath));
            }
        }
    }

    addDir(srcDir, zip);

    const buffer = await zip.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
    });

    fs.mkdirSync(path.dirname(destZipPath), { recursive: true });
    fs.writeFileSync(destZipPath, buffer);
    console.log(`[Fetch] Created ${destZipPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    return destZipPath;
}

// -----------------------------------------------------------------------------
// CLI Handler
// -----------------------------------------------------------------------------
function printHelp() {
    console.log(`
WebCraft Resource Fetcher & Cache Manager

Usage:
  node scripts/fetch-default-pack.mjs [options]

Options:
  --all              Fetch all upstream resources (Bedrock samples, Java assets, schemas)
  --bedrock          Fetch Mojang/bedrock-samples and package src/assets/rp.zip
  --java             Download Java block models & blockstates (_all.json)
  --schemas          Fetch Blockception/Minecraft-bedrock-json-schemas
  --pack             Re-package src/assets/rp.zip from cached bedrock-samples/resource_pack
  --version <ver>    Java assets version (default: "26.2")
  --force            Force fresh re-download/re-clone even if already cached
  --help, -h         Show this help message
`);
}

async function main() {
    const args = process.argv.slice(2);

    if (args.includes("--help") || args.includes("-h")) {
        printHelp();
        return;
    }

    const force = args.includes("--force");
    const verIdx = args.indexOf("--version");
    const javaVersion = verIdx !== -1 && args[verIdx + 1] ? args[verIdx + 1] : "26.2";

    const doAll = args.includes("--all") || args.length === 0;
    const doBedrock = doAll || args.includes("--bedrock") || args.includes("--bedrock-samples");
    const doJava = doAll || args.includes("--java");
    const doSchemas = doAll || args.includes("--schemas");
    const doPackOnly = args.includes("--pack") && !doAll;

    try {
        if (doPackOnly) {
            const vanillaRpDir = path.join(CACHE_PATHS.BEDROCK_SAMPLES, "resource_pack");
            if (!fs.existsSync(vanillaRpDir)) {
                console.error(`Error: Cached bedrock-samples not found at ${vanillaRpDir}. Run with --bedrock first.`);
                process.exit(1);
            }
            await packageDirectoryToZip(vanillaRpDir, CACHE_PATHS.DEFAULT_RP_ZIP);
            return;
        }

        if (doJava) {
            await fetchJavaAssets({ force, version: javaVersion });
        }

        if (doBedrock) {
            await fetchBedrockSamples({ force });
        }

        if (doSchemas) {
            fetchBedrockSchemas({ force });
        }

        console.log("\n[Fetch] All requested resources are cached and ready!");
    } catch (err) {
        console.error("\n[Fetch] Error:", err.message);
        process.exit(1);
    }
}

if (process.argv[1] && process.argv[1].endsWith("fetch-default-pack.mjs")) {
    main();
}

