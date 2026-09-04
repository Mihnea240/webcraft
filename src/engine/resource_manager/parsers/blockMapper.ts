import { BlockType } from "src/engine/block/type";
import { BlockDescriptor, BlockPermutationRegistry, BlockTypeRegistry } from "../registry/blockTypeRegistry";

import { BlockBehavior, BlockDefinitions } from "@bedrock-types/bp/blocks/blocks";
import { Block } from "@bedrock-types/rp/blocks";

import { fileToJson, ZipFileEntry } from "src/engine/utils/decoders";

export class BlockMapper {

    blocks: Iterable<[string, BlockDefinitions | BlockBehavior]>;
    blocksJson: Record<string, Block> = {};

    constructor(
        public zipBuffer: ArrayBuffer,
        public headers: Map<string, ZipFileEntry>,
        public blockTypeRegistry: BlockTypeRegistry,
        public blockPermutationRegistry: BlockPermutationRegistry,
    ) {
        this.blocks = this.headers.entries()
            .filter(([path]) => path.match(/^(?:behavior_pack|bp|blocks)\/.*\.json$/))
            .map<[string, BlockDefinitions | BlockBehavior]>(entry => [
                entry[0].replace(/^(?:behavior_pack\/blocks|bp\/blocks|blocks)\//, ""),
                fileToJson(zipBuffer, entry[1]!) as BlockDefinitions | BlockBehavior
            ]).toArray();

        const blocksJsonFile = this.headers.get("resource_pack/blocks.json");
        if (blocksJsonFile) {
            this.blocksJson = fileToJson(zipBuffer, blocksJsonFile);
        }
    }

    parse() {
        for (const [name, blockDef] of this.blocks) {
            if (name === "__default.json") {
                //Handle vanilla blocks of which format is not determined yet
                continue; 
            }
            this.parseBlock(blockDef);
        }
    }

    parseBlock(blockJson: BlockDefinitions | BlockBehavior) { 
        const blockDef: BlockDefinitions = (blockJson as any)["minecraft:block"] || blockJson;
        if (!blockDef || !blockDef.description) return;

        const type = new BlockType();
        const defaultPermutation = type.fromJson(blockDef);

        const typeId = this.blockTypeRegistry.push(type.description, type);
        // Default permutation: blockType ID with state 0
        const defaultDescriptor: BlockDescriptor = (0 << 16) | (typeId & 0xFFFF);
        this.blockPermutationRegistry.push(defaultDescriptor, defaultPermutation);
    }


}