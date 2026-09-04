import { componentRegistry } from "../componentRegistry";
import { BlockComponent } from "./base";

export class BlockCollisionBox extends BlockComponent {
    public isEnabled: boolean = true;
    public origin: [number, number, number] = [-8, 0, -8];
    public size: [number, number, number] = [16, 16, 16];

    static fromJson(json: any) { 
        return new BlockCollisionBox();
    }
}

componentRegistry.registerImplementation("minecraft:collision_box", BlockCollisionBox);
componentRegistry.registerImplementation("collision_box", BlockCollisionBox);
