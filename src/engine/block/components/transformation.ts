import { componentRegistry } from "../componentRegistry";
import { BlockComponent } from "./base";

export class BlockTransformation extends BlockComponent {
    public translation: [number, number, number] = [0, 0, 0];
    public rotation: [number, number, number] = [0, 0, 0];
    public scale: [number, number, number] = [1, 1, 1];
    public pivot: [number, number, number] = [0, 0, 0];

    fromJson(json: any) {
        if (!json || typeof json !== "object") return;

        if (Array.isArray(json.translation)) {
            this.translation = json.translation as [number, number, number];
        }
        if (Array.isArray(json.rotation)) {
            this.rotation = json.rotation as [number, number, number];
        }
        if (Array.isArray(json.scale)) {
            this.scale = json.scale as [number, number, number];
        }
        if (Array.isArray(json.rotation_pivot)) {
            this.pivot = json.rotation_pivot as [number, number, number];
        }
    }

    bindToRp() {}
}

componentRegistry.registerImplementation("minecraft:transformation", BlockTransformation);
componentRegistry.registerImplementation("transformation", BlockTransformation);
