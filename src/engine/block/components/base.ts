import { ResourcePack } from "src/engine/resource_manager/RP";
import { RemeshFlags } from "../blockDescriptorView";
import { type BlockType, componentRegistry } from "../type";


export abstract class BlockComponent{
    public static id: number;

    public getId() {
        return (this.constructor as typeof BlockComponent).id;
    }

    remeshFlags(): number { 
        return RemeshFlags.None;
    }

    onStateChange(blockType: BlockType, state: number): (BlockComponent | null)[] | null { 
        return null;
    }

    bindToRp(blockType: BlockType, rp: ResourcePack) { 
        
    }

    public static *getComponentsFromJson(json: Record<string, any>) {
        for (const [key, value] of Object.entries(json)) {
            const implementation = componentRegistry.getImplementation(key);
            if (!implementation) continue;

            yield new implementation(value);
        }
    }
}