import { ResourcePack } from "src/engine/resource_manager/RP";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";
import { BlockComponent } from "./base";

import { Permutations } from "@bedrock-types/bp/blocks/blocks";

export class PermutationEntry {
    public truthValue: boolean = false;
    constructor(
        public condition: string,
        public components: BlockComponent[]
    ) {
    }
}

export const conditionEvaluator = {
    evaluate(condition: string, state: number): boolean {
        if (!condition) return false;
        return false;
    }
};

export class BlockPermutations extends BlockComponent {
    public rules: PermutationEntry[] = [];

    fromJson(json: Permutations) {
        this.rules = (json || []).map(entry => new PermutationEntry(
            entry.condition as string,
            [...BlockComponent.getComponentsFromJson(entry.components || {})]
        ));
    }

    static fromJson(json: Permutations) {
        const instance = new BlockPermutations();
        instance.fromJson(json);
        return instance;
    }

    bindToRp(type: BlockType, rp: ResourcePack) {
        for (const comp of this.components()) {
            comp.bindToRp(type, rp);
        }
    }

    *components() {
        yield* this.rules.values().flatMap(rule => rule.components); 
    }

    onStateChange(blockType: BlockType, state: number) {
        const newComponents = new Array<BlockComponent | null>(blockType.maxComponentCount).fill(null);
        for (let i = this.rules.length - 1; i >= 0; i--) {
            const rule = this.rules[i];

            // Evaluate the condition for this rule
            if (conditionEvaluator.evaluate(rule.condition, state)) { 
                for (const component of rule.components) {
                    const index = blockType.getComponentIndexInComponentArray(component.getId());
                    newComponents[index] ??= component;
                }
            }
        }

        return newComponents;
    }
}

componentRegistry.registerImplementation("permutations", BlockPermutations);
