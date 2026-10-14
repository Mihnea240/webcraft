import { BlockDescriptor, BlockPermutation, BlockPermutationRegistry, BlockTypeRegistry } from "src/engine/resource_manager/registry/blockTypeRegistry";
import { World } from "src/engine/world";
import { Chunk } from "./chunk";



export class BlockPallet { 
    permutations: BlockPermutation[] = [];
    descriptors: BlockDescriptor[] = [0];
    descriptorInstances: number[] = [0];

    palletHoles = 0;
    descriptorToId: Map<BlockDescriptor, number> = new Map();

    constructor(public world: World) {
        this.descriptorToId.set(0, 0);
        this.descriptorInstances[0] = Chunk.SIZE ** 3;
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
        if (descriptor === 0) {
            this.descriptorInstances[0]--;
            return 0;
        }
            
        const existingId = this.descriptorToId.get(descriptor);
        if (existingId !== undefined) {
            this.descriptorInstances[existingId]++;
            if (this.descriptorInstances[existingId] === 1) {
                this.palletHoles--;
            }

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

        if (this.descriptorInstances[id] === 1) {
            this.palletHoles--;
        }

        return id;
    }

    removeBlock(id: number) {
        this.descriptorInstances[id]--;
        if (this.descriptorInstances[id] <= 0) {
            this.palletHoles++;
        }
    }

    getPermutation(id: number) { 
        return this.permutations[id - 1];
    }

    getDescriptor(id: number): BlockDescriptor | undefined {
        return this.descriptors[id];
    }

    remap() {
        const newDescriptors: BlockDescriptor[] = [0];
        const newDescriptorInstances: number[] = [0];
        const newPermutations: BlockPermutation[] = [];
        const newDescriptorToId: Map<BlockDescriptor, number> = new Map();
        newDescriptorToId.set(0, 0);

        for (let id = 1; id < this.descriptors.length; id++) {
            if (this.descriptorInstances[id] > 0) {
                const descriptor = this.descriptors[id];
                const permutation = this.permutations[id - 1];

                const newId = newDescriptors.length;
                newDescriptors.push(descriptor);
                newDescriptorInstances.push(this.descriptorInstances[id]);
                newPermutations.push(permutation);
                newDescriptorToId.set(descriptor, newId);
            }
        }

        this.descriptors = newDescriptors;
        this.descriptorInstances = newDescriptorInstances;
        this.permutations = newPermutations;
        this.descriptorToId = newDescriptorToId;
        this.palletHoles = 0;
    }
}