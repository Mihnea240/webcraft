import { States } from "src/bedrock-types/bp/blocks/blocks";
import { componentRegistry } from "../componentRegistry";
import type { BlockType } from "../type";
import { BlockComponent } from "./base";

import { Bit, DataViewPacker, Struct } from "bitpacker";
import { ResourcePack } from "src/engine/resource_manager/RP";

export class BlockStates extends BlockComponent {
    public packer!: DataViewPacker; 

    // An array of arrays, where each inner array contains the possible values for a specific state.
    public states: any[][] = [];

    // A map that associates state names with their corresponding index in the states array.
    public stateNameToId: Map<string, number> = new Map();
    
    private fields: Record<string, Bit> = {};

    static fromJson(json: States) { 
        const instance = new BlockStates();

        for (const key in json) {
            const value = json[key];
            instance.addState(key, json[key]);
        }

        return instance;
    }

    addState(stateName: string, values: States[string]) {
        const stateIndex = this.states.length;
        this.stateNameToId.set(stateName, stateIndex);
        this.states.push([]);

        if (Array.isArray(values)) {
            for (const key in values) {
                const value = values[key];

                if (Array.isArray(value)) {
                    this.states[stateIndex].push(...value);
                } else if (typeof value === "object") {
                    const { min, max } = value;
                    for (let i = min; i <= max; i++) {
                        this.states[stateIndex].push(i);
                    }
                } else {
                    this.states[stateIndex].push(value);
                }
            }
        } else if (typeof values === "object") {
            const { min, max } = values.values;
            for (let i = min; i <= max; i++) {
                this.states[stateIndex].push(i);
            }
        }

        const numBits = Math.ceil(Math.log2(this.states[stateIndex].length));
        this.fields[stateName] = new Bit(numBits);
    }

    // Translates a state name to its index in the states array
    getStateId(stateName: string) {
        return this.stateNameToId.get(stateName);
    }

    // Retrieves the possible values for a given state index
    getStateValues(stateIndex: number) {
        return this.states[stateIndex];
    }

    // Retrieves the index of a specific value for a given state index
    getStateValueIndex(stateIndex: number, value: any) {
        return this.states[stateIndex].indexOf(value);
    }

    bindToRp(blockType: BlockType, rp: ResourcePack) {
        this.createPacker();
    }

    createPacker() {
        this.packer = new DataViewPacker(new Struct(this.fields));
    }
}

componentRegistry.registerImplementation("state", BlockStates);