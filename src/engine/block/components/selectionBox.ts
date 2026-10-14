

import { SelectionBox } from "@bedrock-types/bp/blocks/blocks";
import { ResourcePack } from "src/engine/resource_manager/RP";
import { BlockType, componentRegistry } from "../type";
import { BlockComponent } from "./base";

export class SelectionBoxComponent extends BlockComponent {
    data: number[] = [];
    selectable: boolean = true;
    
    static defaultSelectionBox = new SelectionBoxComponent();
    static {
        SelectionBoxComponent.defaultSelectionBox.data = [0, 0, 0, 1, 1, 1];
    }
    

    fromJson(json: SelectionBox) {
        if (typeof json === "boolean") {
            this.selectable = json;
        } else {
            this.selectable = true;
            this.data.push(...json.origin!, ...json.size!);
        }
    }

    bindToRp(blockType: BlockType, rp: ResourcePack): void {
        return;
    }


}

componentRegistry.registerImplementation("minecraft:selection_box", SelectionBoxComponent);
