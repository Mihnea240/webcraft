import { execSync } from "child_process";
import fs from "fs";
import { glob } from "glob";
import { compile } from "json-schema-to-typescript";
import path from "path";

const TEMP_DIR = "./.temp-bedrock-schemas";
const OUTPUT_DIR = "./src/bedrock-types/rp";

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
  console.log("1. Fetching latest schemas...");
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  execSync(
    `git clone --depth 1 https://github.com/Blockception/Minecraft-bedrock-json-schemas.git ${TEMP_DIR}`,
    { stdio: "ignore" }
  );

  console.log("2. Discovering Resource Pack schemas...");
  const files = await glob(`${TEMP_DIR}/resource/**/*.json`);
  console.log(`Found ${files.length} schemas. Generating TypeScript definitions...`);

  for (const file of files) {
    const relativePath = path.relative(`${TEMP_DIR}/resource`, file);
    const destPath = path.join(OUTPUT_DIR, relativePath).replace(/\.json$/, ".d.ts");
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    try {
      const schema = JSON.parse(fs.readFileSync(file, "utf8"));
      sanitizeSchemaTitles(schema);

      const ts = await compile(schema, path.basename(file), {
        bannerComment: "/* Auto-generated from Blockception Bedrock Schemas */",
        unreachableDefinitions: true,
        cwd: path.dirname(file),
      });

      fs.writeFileSync(destPath, ts);
      console.log(`✓ Generated: ${relativePath.replace(/\.json$/, ".d.ts")}`);
    } catch (err) {
      console.warn(`✗ Skipped ${relativePath}: ${err}`);
    }
  }

  console.log("3. Cleaning up temporary files...");
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log(`Done! All definitions saved to ${OUTPUT_DIR}`);
}

generate();