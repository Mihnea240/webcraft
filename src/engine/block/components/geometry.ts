import { ResourcePack } from "src/engine/resource_manager/RP";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";
import { BlockComponent } from "./base";

import { Geometry } from "@bedrock-types/bp/blocks/blocks";
import { BlockModelRegistry } from "src/engine/resource_manager/registry";

export class MolangEntry {
    condition: string;
    truthValue: boolean;

    constructor(condition: string, truthValue: boolean) {
        this.condition = condition;
        this.truthValue = truthValue;
    }

}

type BoneData = {
    visible: boolean;
    uv_locked: boolean;
    visibilityCondition?: string;
}

export class BlockGeometry extends BlockComponent {
    public identifier: string = "";
    public boneVisibility?: Record<string, boolean | string>;
    public uv_lock: boolean | string[] = false;

    modelId: number = 0;
    boneData: BoneData[] = [];

    static fromJson(geometry: Geometry) {
        const instance = new BlockGeometry();

        if (typeof geometry === "string") {
            instance.identifier = geometry;
            return instance;
        }

        instance.identifier = geometry.identifier!;
        instance.boneVisibility = geometry.bone_visibility
        instance.uv_lock = geometry.uv_lock || false;

        return instance;
    }

    bindToRp(blockType: BlockType, rp: ResourcePack) {
        const modelRegistry = rp.get(BlockModelRegistry);
        this.modelId = modelRegistry.keyToId(this.identifier)!;

        const model = modelRegistry.get(this.modelId)!;
        const boneCount = model.boneData.length;

        this.boneData = Array.from({ length: boneCount }, () => ({ visible: true, uv_locked: false }));

        for (const [boneName, visibility] of Object.entries(this.boneVisibility || {})) {
            const boneIndex = model.boneNameToId.get(boneName);
            if (boneIndex === undefined) continue;

            if (typeof visibility === "boolean") {
                this.boneData[boneIndex].visible = visibility;
            } else {
                this.boneData[boneIndex].visibilityCondition = visibility;
            }
        }

        if (this.uv_lock === true) {
            for (const bone of this.boneData) {
                bone.uv_locked = true;
            }
        } else if (this.uv_lock != false) {
            for (const boneName of this.uv_lock) { 
                const boneIndex = model.boneNameToId.get(boneName);
                if (boneIndex === undefined) continue;

                this.boneData[boneIndex].uv_locked = true;
            }
        }
    }
}

componentRegistry.registerImplementation("minecraft:geometry", BlockGeometry);
componentRegistry.registerImplementation("geometry", BlockGeometry);
