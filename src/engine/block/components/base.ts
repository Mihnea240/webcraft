import { ResourcePack } from "src/engine/resource_manager/RP";
import { RemeshFlags } from "../blockDescriptorView";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";


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

    abstract fromJson(json: any): void;

    abstract bindToRp(blockType: BlockType, rp: ResourcePack): void;

    public static *getComponentsFromJson(json: Record<string, any>) {
        for (const [key, value] of Object.entries(json)) {
            const implementation = componentRegistry.getImplementation(key);
            if (!implementation) continue;

            const comp = new implementation();
            comp.fromJson(value);
            yield comp;
        }
    }
}