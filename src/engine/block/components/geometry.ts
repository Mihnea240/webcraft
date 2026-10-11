import { ResourcePack } from "src/engine/resource_manager/RP";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";
import { BlockComponent } from "./base";

import { Geometry } from "@bedrock-types/bp/blocks/blocks";
import { BlockModelRegistry } from "src/engine/resource_manager/registry";
import { CullingLayerRegistry, CullingRegistry } from "src/engine/resource_manager/registry/cullingRegistry";

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
    public cullingLayer: string = "default";
    public cullingRule: string | undefined;

    modelId: number = 0;
    cullingId: number = 0;
    cullingLayerId: number = 0;
    boneData: BoneData[] = [];

    fromJson(geometry: Geometry) {
        if (typeof geometry === "string") {
            this.identifier = geometry;
            return;
        }

        this.identifier = geometry.identifier!;
        this.boneVisibility = geometry.bone_visibility;
        this.uv_lock = geometry.uv_lock || false;
        this.cullingLayer = geometry.culling_layer || "default";
        this.cullingRule = geometry.culling;
    }

    bindToRp(blockType: BlockType, rp: ResourcePack) {
        const modelRegistry = rp.get(BlockModelRegistry);
        const cullingLayerRegistry = rp.get(CullingLayerRegistry);

        let modelId = modelRegistry.keyToId(this.identifier);
        if (modelId === undefined) {
            modelId = 0;
        }
        this.modelId = modelId;

        const model = modelRegistry.get(this.modelId);
        if (!model) {
            throw new Error(`BlockModel not found for modelId ${this.modelId} (identifier: "${this.identifier}") in block ${blockType.description}`);
        }

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
        } else if (this.uv_lock != false && Array.isArray(this.uv_lock)) {
            for (const boneName of this.uv_lock) { 
                const boneIndex = model.boneNameToId.get(boneName);
                if (boneIndex === undefined) continue;

                this.boneData[boneIndex].uv_locked = true;
            }
        }

        this.cullingLayerId = cullingLayerRegistry.push(this.cullingLayer);

        const cullingRegistry = rp.get(CullingRegistry);
        this.cullingId = cullingRegistry.moldToModel(this.cullingRule || this.identifier, model.boneNameToId);
    }
}

componentRegistry.registerImplementation("minecraft:geometry", BlockGeometry);
componentRegistry.registerImplementation("geometry", BlockGeometry);
