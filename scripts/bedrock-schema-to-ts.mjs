import fs from "fs";
import { glob } from "glob";
import { compile } from "json-schema-to-typescript";
import path from "path";

import { CACHE_PATHS, fetchBedrockSchemas } from "./fetch-default-pack.mjs";

const SCHEMAS_DIR = CACHE_PATHS.BEDROCK_SCHEMAS;
const RP_OUTPUT_DIR = "./src/bedrock-types/rp";
const BP_OUTPUT_DIR = "./src/bedrock-types/bp";

function sanitizeSchemaTitles(value) {
  if (Array.isArray(value)) {
    value.forEach(sanitizeSchemaTitles);
  } else if (value && typeof value === "object") {
    if (typeof value.title === "string" && /^\d/.test(value.title)) {
      value.title = `Type ${value.title}`;
    }

    Object.values(value).forEach(sanitizeSchemaTitles);
  }

  return value;
}

async function generate() {
  console.log("1. Ensuring schemas in cache...");
  fetchBedrockSchemas();

  async function compileFolder(srcFolder, destDir) {
    console.log(`2. Discovering ${srcFolder} schemas...`);
    const files = await glob(`${SCHEMAS_DIR}/${srcFolder}/**/*.json`);
    console.log(`Found ${files.length} schemas in ${srcFolder}. Generating TypeScript definitions...`);

    for (const file of files) {
      const relativePath = path.relative(`${SCHEMAS_DIR}/${srcFolder}`, file);
      const destPath = path.join(destDir, relativePath).replace(/\.json$/, ".d.ts");
      const destDirName = path.dirname(destPath);

      if (!fs.existsSync(destDirName)) {
        fs.mkdirSync(destDirName, { recursive: true });
      }

      try {
        const schema = JSON.parse(fs.readFileSync(file, "utf8"));
        sanitizeSchemaTitles(schema);

        const ts = await compile(schema, path.basename(file), {
          bannerComment: `/* Auto-generated from Blockception Bedrock Schemas: ${srcFolder} */`,
          unreachableDefinitions: true,
          cwd: path.dirname(file),
        });

        fs.writeFileSync(destPath, ts);
      } catch (err) {
        // Skip files that fail compiling (e.g. references to missing schemas)
      }
    }
  }

  await compileFolder("resource", RP_OUTPUT_DIR);
  await compileFolder("behavior", BP_OUTPUT_DIR);

  console.log(`Done! All definitions saved.`);
}

generate();