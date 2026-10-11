import { fileToJson, ZipFileEntry } from "src/engine/utils/decoders";
import { CullingLayerRegistry, CullingRegistry, CullingRule } from "../registry/cullingRegistry";

import { BlockCulling } from "@bedrock-types/rp/block_culling/block_culling";
import Faces from "src/engine/utils/faces";
import { BlockModelRegistry } from "../registry";


export const enum CullingCondition {
    OPAQUE = 0,
    SAME_BLOCK = 1,
    SAME_BLOCK_PERMUTATION = 2,
    SAME_CULLING_LAYER = 3,
}

const cullingConditionStrings = ["default", "same_block", "same_block_permutation", "same_culling_layer"];

function parseCullingCondition(condition: string): CullingCondition {
    const index = cullingConditionStrings.indexOf(condition.toLowerCase());
    return index !== -1 ? (index as CullingCondition) : CullingCondition.OPAQUE;
}


export class CullingMapper {
    constructor(
        public zipBuffer: ArrayBuffer,
        public headers: Map<string, ZipFileEntry>,
        public blockModelRegistry: BlockModelRegistry,
        public cullingRegistry: CullingRegistry,
        public cullingLayerRegistry: CullingLayerRegistry,

    ) {

        const ruleDefinitions = headers.entries()
            .filter(([path]) => path.match(/^(?:resource_pack\/block_culling)\/.*\.json$/))
            .map(([, entry]) => fileToJson(zipBuffer, entry[1]));

        for (const ruleDefinition of ruleDefinitions) {
            this.parseRule(ruleDefinition as BlockCulling);
        }
    }

    parseRule(ruleDefinition: BlockCulling) {
        const ruleBody = ruleDefinition["minecraft:block_culling_rules"]!;
        const name = ruleDefinition["minecraft:block_culling_rules"]!.description!.identifier;

        const rules: CullingRule[] = [];
        const boneNames: string[] = []; 

        for (const rule of ruleBody.rules!) {

            const ruleCondition: CullingRule = {
                cullingCondition: parseCullingCondition(rule.condition || "default"),
                direction: Faces.fromString(rule.direction || "up"),
                cullAgainstFullAndOpaque: rule.cull_against_full_and_opaque ?? true,
                boneId: 0,
                cubeRelativeId: rule.geometry_part?.cube ?? -1,
                face: rule.geometry_part?.face ? Faces.fromString(rule.geometry_part!.face!) : -1
            }

            boneNames.push(rule.geometry_part?.bone ?? "");
            rules.push(ruleCondition);
        }

        this.cullingRegistry.push(name!, rules, boneNames);
    }
}