import type { World } from "@engine/world";
import { DataViewPacker } from "bitpacker";
import { BlockDescriptor, BlockPermutation, BlockPermutationRegistry, BlockTypeRegistry } from "src/engine/resource_manager/registry/blockTypeRegistry";
import { BlockType } from "./type";

export const enum RemeshFlags {
    None = 0,
    Visual = 1 << 0,     // Geometry, material, or UV transformation changed -> requires chunk remesh
    Lighting = 1 << 1,   // Light emission changed -> requires relighting
    Collision = 1 << 2,  // Collision or selection box changed -> requires physics/DDA update
}

export class BlockDescriptorView { 
    public descriptor!: BlockDescriptor;
    public packer?: DataViewPacker;

    blockType?: BlockType;
    blockPermutation?: BlockPermutation;

    beforeUpdate?: (oldDescriptor: BlockDescriptor, newDescriptor: BlockDescriptor, flags: RemeshFlags) => void;

    private tempArray = new Uint32Array(1);

    constructor(private context: World, descriptor?: BlockDescriptor) { 
        if(descriptor !== undefined) {
            this.setDescriptor(descriptor);
        }
    }

    get typeRegistry() {
        return this.context.resourcePack.get(BlockTypeRegistry);
    }

    get permutationRegistry() { 
        return this.context.resourcePack.get(BlockPermutationRegistry);
    }

    setDescriptor(descriptor: BlockDescriptor) {
        this.descriptor = descriptor;
        this.blockType = undefined;
        this.blockPermutation = undefined;
        this.packer = undefined;
    }

    getDescriptor() {
        return this.descriptor;
    }

    getBlockType() {
        return this.blockType ??= this.typeRegistry.getByDescriptor(this.descriptor)!;
    }

    getBlockPermutation() {
        return this.blockPermutation ??= this.permutationRegistry.get(this.descriptor);
    }

    getStateView() { 
        const blockType = this.getBlockType();
        if (!blockType) return undefined;
        
        const packer = this.packer = blockType.states.packer;

        // State is stored in the MSB (high 16 bits) of the 32-bit descriptor
        this.tempArray[0] = (this.descriptor & 0xFFFF0000) >>> 0;

        packer.setBuffer(this.tempArray.buffer);
        return packer.view;
    }

    update() { 
        if (!this.packer) return RemeshFlags.None;
        const currentRawState = (this.descriptor & 0xFFFF0000) >>> 0;
        const newState = (this.tempArray[0] & 0xFFFF0000) >>> 0;
        if (newState === currentRawState) return RemeshFlags.None;

        const baseTypeId = this.descriptor & 0xFFFF;
        const newDescriptor = (newState | baseTypeId) >>> 0;
        const oldDescriptor = this.descriptor;
        const blockType = this.getBlockType()!;
        const oldPermutation = this.getBlockPermutation()!;

        // Check if permutation already exists in registry
        let newPermutation = this.permutationRegistry.getByDescriptor(newDescriptor);
        if (!newPermutation) {
            newPermutation = blockType.onStateChanges(newState, oldPermutation) ?? oldPermutation;
            if (newPermutation !== oldPermutation) {
                this.typeRegistry.bakePermutation(newPermutation, blockType, this.context.resourcePack);
            }
            this.permutationRegistry.push(newDescriptor, newPermutation);
        }

        this.descriptor = newDescriptor;
        this.blockPermutation = newPermutation;

        // Determine what needs to be remeshed based on the changes in components
        let remeshFlags = RemeshFlags.None;
        for (let i = 0; i < oldPermutation.components.length; i++) {
            const oldComponent = oldPermutation.components[i];
            const newComponent = newPermutation.components[i];

            if (oldComponent !== newComponent) {
                remeshFlags |= oldComponent?.remeshFlags() || RemeshFlags.None;
                remeshFlags |= newComponent?.remeshFlags() || RemeshFlags.None;
            }
        }

        this.beforeUpdate?.(oldDescriptor, newDescriptor, remeshFlags);
        return remeshFlags;
    }
}