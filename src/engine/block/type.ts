import { popcount32 } from "@engine/utils/popcount";
import { BlockDefinitions } from "src/bedrock-types/bp/blocks/blocks";
import { BlockPermutation } from "src/engine/resource_manager/registry/blockTypeRegistry";
import { ResourcePack } from "../resource_manager/RP";
import { componentRegistry } from "./componentRegistry";
import { BlockComponent } from "./components/base";
import { MenuCategory } from "./components/menuCategory";
import { BlockPermutations } from "./components/permutations";
import { BlockStates } from "./components/states";

export { componentRegistry };

export class BlockType {
    public description!: string;
    public permutations!: BlockPermutations;
    public states!: BlockStates;
    public menuCategory!: MenuCategory; 

    // A bitmask representing the potential components that this block type has.
    private masks: number[] = [];
    private masksPrefixPopCount: number[] = [];

    fromJson(json: BlockDefinitions): BlockPermutation {
        this.description = json.description?.identifier || "";
        this.states = BlockStates.fromJson(json.description?.states || {});
        this.menuCategory = MenuCategory.fromJson(json.description?.menu_category || {});
        
        this.permutations = BlockPermutations.fromJson(json.permutations || []);

        const baseComponents = [...BlockComponent.getComponentsFromJson(json.components || {})];
        this.setupComponentsFormat(json, baseComponents);

        //Handle traits
        const denseComponents = new Array<BlockComponent | null>(this.maxComponentCount).fill(null);
        for (const comp of baseComponents) {
            const index = this.getComponentIndexInComponentArray(comp.getId());
            if (index !== -1) {
                denseComponents[index] = comp;
            }
        }

        return new BlockPermutation(denseComponents);
    }

    get maxComponentCount() {
        const a = this.masksPrefixPopCount.at(-1)!;
        const b = popcount32(this.masks.at(-1)!);
        return a + b;
    }

    setupComponentsFormat(json: BlockDefinitions, baseComponents: BlockComponent[]) {
        // Count the number of components and build the component mask
        // This includes permuations components so the array order is not wrong when adding optional components from the permiutations
        let componentCnt = 0;
        const components = [...baseComponents, ...this.permutations.components()];

        // Ensure bit 0 in masks[0] is always set to reserve slot 0 for BakedGeometry
        this.masks = [1];
        this.masksPrefixPopCount = [0];

        for(const component of components) {
            const id = component.getId();
            const maskId = id >> 5;
            const maskBit = 1 << (id & 31);

            while (this.masks.length <= maskId) {
                this.masks.push(0);
                this.masksPrefixPopCount.push(0);
            }
            this.masks[maskId] |= maskBit;
            componentCnt++;
        }

        for (let i = 0, acc = 0; i < this.masks.length; i++) {
            this.masksPrefixPopCount[i] = acc;
            acc += popcount32(this.masks[i]);
        }
    }

    bindToRp(rp: ResourcePack) {
        this.states.bindToRp(this, rp);
        this.permutations.bindToRp(this, rp);
    }

    /** Dispatches a batch of changed state indices to all interested component listeners */
    onStateChanges(newState: number, currentPermutation: BlockPermutation) {
        const components = currentPermutation.components;
        const newComponents = this.permutations.onStateChange(this, newState);
        let changed = false;

        for (let i = 0; i < components.length; i++) {
            const oldComponent = components[i];
            const newComponent = newComponents[i];

            if (oldComponent === newComponent) {
                oldComponent?.onStateChange(this, newState);
                continue;
            }

            changed = true;
            if (newComponent) {
                newComponent.onStateChange(this, newState);
            } else {
                oldComponent?.onStateChange(this, newState);
                newComponents[i] = oldComponent;
            }
        }

        if (changed) {
            return new BlockPermutation(newComponents);
        }
    }

    getComponentIndexInComponentArray(id: number) {
        const masks = this.masks;
        const maskId = id >> 5;
        const maskBit = 1 << (id & 31);

        if(maskId >= masks.length || (masks[maskId] & maskBit) === 0) {
            return -1;
        }

        const prefixPopCount = this.masksPrefixPopCount;
        const tail = masks[maskId] & (maskBit - 1);
        return prefixPopCount[maskId] + popcount32(tail);
    }
}