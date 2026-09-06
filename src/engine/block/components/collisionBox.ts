import { componentRegistry } from "../componentRegistry";
import { BlockComponent } from "./base";

export class BlockCollisionBox extends BlockComponent {
    public isEnabled: boolean = true;
    public origin: [number, number, number] = [-8, 0, -8];
    public size: [number, number, number] = [16, 16, 16];

    fromJson(json: any) { 
        if (typeof json === "boolean") {
            this.isEnabled = json;
        } else if (json && typeof json === "object") {
            if (Array.isArray(json.origin)) this.origin = json.origin;
            if (Array.isArray(json.size)) this.size = json.size;
        }
    }

    bindToRp() {}
}

componentRegistry.registerImplementation("minecraft:collision_box", BlockCollisionBox);
componentRegistry.registerImplementation("collision_box", BlockCollisionBox);
