import { ResourcePack } from "src/engine/resource_manager/RP";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";
import { BlockComponent } from "./base";

import { MaterialInstance, MaterialInstances } from "@bedrock-types/bp/blocks/blocks";
import { AtlasTileRegistry } from "src/engine/resource_manager/registry";

export type Material = Exclude<MaterialInstance, string>;

export class BlockMaterialInstances extends BlockComponent {
    nameToId: Map<string, number> = new Map();
    materials: Material[] = [];

    tiles: number[] = [];

    fromJson(value: MaterialInstances) { 
        this.parse(value);
    }

    parse(materials: MaterialInstances) {

        const evalMaterial = (name: string) => {
            let id = this.nameToId.get(name);
            if(id !== undefined) return id;

            const material = materials[name];

            if (typeof material === "string") { 
                return evalMaterial(material);
            }

            id = this.materials.length;
            this.materials.push(material);
            this.tiles.push(-1); 
            this.nameToId.set(name, id);
            return id;
        }

        for (const name in materials) {
            evalMaterial(name);
        }
    }

    bindToRp(blockType: BlockType, rp: ResourcePack) {
        const atlasTileRegistry = rp.get(AtlasTileRegistry);

        for (let i = 0; i < this.materials.length; i++) {
            const material = this.materials[i];
            const tileId = atlasTileRegistry.keyToId(material.texture!);
            this.tiles[i] = tileId !== undefined ? tileId : 0;
        }
    }
}

componentRegistry.registerImplementation("minecraft:material_instances", BlockMaterialInstances);
componentRegistry.registerImplementation("material_instances", BlockMaterialInstances);
