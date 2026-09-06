import { componentRegistry } from "../componentRegistry";
import { BlockComponent } from "./base";

export class BlockLightEmission extends BlockComponent {
    public lightLevel: number = 0;

    fromJson(json: any) {
        if (typeof json === "number") {
            this.lightLevel = json;
        }
    }

    bindToRp() {}
}

componentRegistry.registerImplementation("minecraft:light_emission", BlockLightEmission);
componentRegistry.registerImplementation("light_emission", BlockLightEmission);
