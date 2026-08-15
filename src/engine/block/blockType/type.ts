import { generatorAppend } from "@engine/utils/generatorAppend";
import { popcount32 } from "@engine/utils/popcount";
import { Components } from "./componentEnum";
import { ComponentRegistry, ComponentSlot } from "./componentRegistry";
import { BlockComponent } from "./components/base";
import { MenuCategory } from "./components/menuCategory";
import { BlockPermutations } from "./components/permutations";
import { BlockStates } from "./components/states";

export const componentRegistry = new ComponentRegistry();

export class BlockType {
    public description: string;
    public permutations: BlockPermutations;
    public states: BlockStates;
    public menuCategory: MenuCategory; 
    private components!: ComponentSlot<BlockComponent>[];

    // A bitmask representing the potential components that this block type has.
    private componentMask1: number = 0;

    constructor(json: Record<string, any>) {
        this.description = json.description.identifier || "";
        this.states = new BlockStates(json.description.states || {});
        this.menuCategory = new MenuCategory(json.description.menuCategory || {});
        
        this.permutations = new BlockPermutations(json.permutations || []);

        this.setupComponentsFormat(json);

        //Handle traits

        this.computeStateListenerPermutations();
    }

    setupComponentsFormat(json: Record<string, any>) {
        // Count the number of components and build the component mask
        // This includes permuations components so the array order is not wrong when adding optional components from the permiutations
        let componentCnt = 0;
        const componentStream = BlockComponent.getComponentsFromJson(json.components || {});
        for (const component of generatorAppend(componentStream, this.permutations.components())) {
            this.componentMask1 |= component.constructor.id;
            componentCnt++;
        }
    
        this.components = new Array(componentCnt).map(() => new ComponentSlot<BlockComponent>());

        for (const component of componentStream) {
            const index = this.getComponentImdexInComponentArray((component.constructor as any).id);
            if (index === -1) continue;
            this.components[index]!.push(component);
        }
    }

    computeStateListenerPermutations() {
        const states = this.states;
        const permutations = this.permutations;

        for (let i = 0; i < permutations.rules.length; i++) {
            const rule = permutations.rules[i];

            for (const stateName of rule.involvedProperties()) {
                const stateIndex = states.getStateIndex(stateName);
                if (stateIndex === undefined) {
                    console.warn(`State ${stateName} referenced in permutation rule but not defined in block states.`);
                    continue;
                }

                states.addListeningPermutation(stateIndex, i);
            }
        }
    }

    onStateChange(stateIndex: number) {
        
    }

    getComponentImdexInComponentArray(id: Components) {
        const mask1 = this.componentMask1;
        if (mask1 & id) {
            const tail = mask1 & (id - 1);
            return popcount32(tail);
        }
        return -1;
    }

    // Retrieves a component of the specified type from the block type.
    getComponentById(id: Components) {
        const index = this.getComponentImdexInComponentArray(id);
        if (index === -1) return null;
        return this.components[index]!.get();
    }

    // Retrieves a component of the specified type from the block type.
    getComponentByType<T extends BlockComponent>(componentType: new (...args: any[]) => T): T | null {
        const id = (componentType as any).id as Components;
        const index = this.getComponentImdexInComponentArray(id);
        if (index === -1) return null;
        return this.components[index]!.get() as T | null;
    }

    clone() {
          
    }
}