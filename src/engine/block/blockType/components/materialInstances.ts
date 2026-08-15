import { Components } from "../componentEnum";
import { componentRegistry } from "../type";
import { BlockComponent } from "./base";

export interface MaterialInstanceEntry {
    texture: string;
    render_method?: string;
    face_dimming?: boolean;
    ambient_occlusion?: boolean;
}

export class BlockMaterialInstances extends BlockComponent {
    public static id = Components.MaterialInstances;
    public instances: Map<string, MaterialInstanceEntry> = new Map();

    constructor(json: Record<string, any>) {
        super();
    }
}

componentRegistry.registerImplementation("minecraft:material_instances", BlockMaterialInstances);
componentRegistry.registerImplementation("material_instances", BlockMaterialInstances);
