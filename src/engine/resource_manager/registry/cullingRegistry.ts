import { ArrayStorageUnit } from "../memory_management";
import { CullingCondition } from "../parsers/cullingMapper";
import { ResourceRegistry } from "./resourceRegistry";



export class CullingLayerRegistry {
    nameToId: Map<string, number> = new Map();

    constructor() {
        this.nameToId.set("default", 0);
    }

    push(name: string) {
        const id = this.nameToId.get(name);
        if (id !== undefined) {
            return id;
        }

        const newId = this.nameToId.size;
        this.nameToId.set(name, newId);
        return newId;
    }

    keyToId(name: string) {
        return this.nameToId.get(name);
    }
}

export interface CullingRule {
    cullingCondition: CullingCondition;
    direction: number;
    cullAgainstFullAndOpaque: boolean;
    boneId: number;
    cubeRelativeId: number;
    face: number;
}


export const enum CullingMode {
    NONE = 0,
    FULL_OPAQUE = 1,
    FULL_LAYER = 2,
    CUSTOM_START = 3,
}

export class CullingRegistry extends ResourceRegistry<CullingRule[], string[]> {

    static default = {
        cullingCondition: CullingCondition.OPAQUE,
        direction: 0,
        cullAgainstFullAndOpaque: true,
        boneId: 0,
        cubeRelativeId: 0,
        face: 0
    }

    constructor(parent?: ResourceRegistry<CullingRule[], string[]>) {
        super(parent);
        if (!parent) {
            this.push("none", [], []);
            this.push("geometry.full_block", [], []);
            this.push("full_layer", [], []);
        }
    }

    createStorageUnit(): ArrayStorageUnit<CullingRule[], any> {
        return new ArrayStorageUnit<CullingRule[], any>(1024, true);
    }

    moldToModel(cullingRule: string, boneNamesToId: Map<string, number>) {
        const id = this.keyToId(cullingRule);
        if (!id) {
            return 0;
        }

        const rules = this.get(id);
        const meta = this.getMeta(id);

        for(let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const boneName = meta[i];
            const boneId = boneNamesToId.get(boneName) ?? 0;
            rule.boneId = boneId;
        }

        return id;
    }
}