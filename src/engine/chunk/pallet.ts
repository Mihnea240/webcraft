import { BlockDescriptor, BlockPermutation, BlockPermutationRegistry, BlockTypeRegistry } from "src/engine/resource_manager/registry/blockTypeRegistry";
import { World } from "src/engine/world";



export class BlockPallet { 
    permutations: BlockPermutation[] = [];
    descriptors: BlockDescriptor[] = [-1];
    descriptorInstances: number[] = [0];

    descriptorToId: Map<BlockDescriptor, number> = new Map();

    constructor(public world: World) {

    }

    get blockTypeRegistry() {
        return this.world.resourcePack.get(BlockTypeRegistry);
    }

    get permutationRegistry() { 
        return this.world.resourcePack.get(BlockPermutationRegistry);
    }

    get size() {
        return this.descriptors.length;
    }

    addBlock(descriptor: BlockDescriptor) { 
        const existingId = this.descriptorToId.get(descriptor);
        if (existingId !== undefined) {
            this.descriptorInstances[existingId]++;
            return existingId;
        }

        const blockType = this.blockTypeRegistry.getByDescriptor(descriptor);
        const permutation = this.permutationRegistry.get(descriptor);

        if (!blockType || !permutation) {
            throw new Error(`Block type or permutation not found for descriptor ${descriptor}`);
        }

        const id = this.descriptors.length;
        this.descriptorToId.set(descriptor, id);
        this.descriptors.push(descriptor);
        this.descriptorInstances.push(1);
        this.permutations.push(permutation);

        return id;
    }

    removeBlock(id: number) {
        this.descriptorInstances[id]--;
    }

    getPermutation(id: number) { 
        return this.permutations[id - 1];
    }

    getDescriptor(id: number): BlockDescriptor | undefined {
        return this.descriptors[id];
    }
}