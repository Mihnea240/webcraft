import { Components } from "../componentEnum";
import { componentRegistry } from "../type";
import { BlockComponent } from "./base";

export class BlockGeometry extends BlockComponent {
    public static id = Components.Geometry;
    public identifier: string = "";
    public boneVisibility?: Record<string, boolean>;

    constructor(json: any) {
        super();
        if (typeof json === "string") {
            this.identifier = json;
        } else if (json && typeof json === "object") {
            this.identifier = json.identifier || "";
            this.boneVisibility = json.bone_visibility;
        }
    }
}

componentRegistry.registerImplementation("minecraft:geometry", BlockGeometry);
componentRegistry.registerImplementation("geometry", BlockGeometry);
