import { componentRegistry } from "../type";
import { BlockComponent } from "./base";

interface BitField {
    name: string;
    type: string;
}

export class BlockStates extends BlockComponent {
    public packerSchema: BitField[] = [];
    // An array of arrays, where each inner array contains the possible values for a specific state.
    public states: any[][] = [];
    public listeningPermutations: number[][] = [];

    // A map that associates state names with their corresponding index in the states array.
    public stateValues: Map<string, number> = new Map();

    constructor(json: Record<string, any>) {
        super();

        for (const key in json) {
            this.addState(key, json[key]);
        }
    }

    addState(stateName: string, values: any[] | { min: number, max: number }) {
        if (!Array.isArray(values)) {
            const { min, max } = values;
            values = Array.from({ length: max - min + 1 }, (_, i) => i + min);
        }
        
        const bitField: BitField = {
            name: stateName,
            type: `bits${Math.ceil(Math.log2(values.length))}`,
        }

        this.packerSchema.push(bitField);
        this.stateValues.set(stateName, this.states.length);
        this.states.push(values);

        this.listeningPermutations.push([]);
    }

    addListeningPermutation(stateIndex: number, ...permutationIndeces: number[]) {
        this.listeningPermutations[stateIndex].push(...permutationIndeces);
    }

    // Translates a state name to its index in the states array
    getStateIndex(stateName: string) {
        return this.stateValues.get(stateName);
    }

    // Retrieves the possible values for a given state index
    getStateValues(stateIndex: number) {
        return this.states[stateIndex];
    }

    // Retrieves the index of a specific value for a given state index
    getStateValueIndex(stateIndex: number, value: any) {
        return this.states[stateIndex].indexOf(value);
    }

    
}

componentRegistry.registerImplementation("state", BlockStates);