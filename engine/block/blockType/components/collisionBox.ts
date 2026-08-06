import { Components } from "../componentEnum";
import { componentRegistry } from "../type";
import { BlockComponent } from "./base";

export class BlockCollisionBox extends BlockComponent {
    public static id = Components.CollisionBox;
    public isEnabled: boolean = true;
    public origin: [number, number, number] = [-8, 0, -8];
    public size: [number, number, number] = [16, 16, 16];

    constructor(json: any) {
        super();
        if (typeof json === "boolean") {
            this.isEnabled = json;
        } else if (json && typeof json === "object") {
            this.origin = json.origin as [number, number, number];
            this.size = json.size as [number, number, number];
        }
    }
}

componentRegistry.registerImplementation("minecraft:collision_box", BlockCollisionBox);
componentRegistry.registerImplementation("collision_box", BlockCollisionBox);
