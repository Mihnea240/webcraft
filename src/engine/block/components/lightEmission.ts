import { Components } from "../componentEnum";
import { componentRegistry } from "../componentRegistry";
import { BlockComponent } from "./base";

export class BlockLightEmission extends BlockComponent {
    public static id = Components.LightEmission;
    public lightLevel: number = 0;

    constructor(json: any) {
        super();
        this.lightLevel = json;
    }
}

componentRegistry.registerImplementation("minecraft:light_emission", BlockLightEmission);
componentRegistry.registerImplementation("light_emission", BlockLightEmission);
