import { ComponentConstructor } from "@engine/block/componentRegistry";
import { BlockComponent } from "@engine/block/components/base";
import { BlockType } from "@engine/block/type";
import { ArrayStorageUnit } from "../memory_management";
import { ResourceRegistry } from "./resourceRegistry";
import { ResourcePack } from "../RP";

/** 32-bit descriptor for a block type and its state:
 * High 16 bits: packed state bitfield
 * Low 16 bits: block type ID
 */
export type BlockDescriptor = number;

export class BlockPermutation {
    constructor(public components: (BlockComponent | null)[]) {
    }

    getComponentById(blockType: BlockType, id: number): BlockComponent | null {
        const index = blockType.getComponentIndexInComponentArray(id);
        return index !== -1 ? this.components[index] : null;
    }

    getComponent<T extends BlockComponent>(blockType: BlockType, ctor: ComponentConstructor): T | null {
        const index = blockType.getComponentIndexInComponentArray(ctor.id);
        return index !== -1 ? (this.components[index] as T | null) : null;
    }
}

/** Registry for static BlockType definitions (string name -> typeId) */
export class BlockTypeRegistry extends ResourceRegistry<BlockType, void, string> {
    createStorageUnit() {
        return new ArrayStorageUnit<BlockType, void>(1024, true);
    }

    getByDescriptor(descriptor: BlockDescriptor): BlockType | null {
        return this.get(descriptor & 0xFFFF);
    }

    bindToRp(rp: ResourcePack) {
        
    }
}

/** Registry for runtime BlockPermutations (descriptor -> permutationId) */
export class BlockPermutationRegistry extends ResourceRegistry<BlockPermutation, void, BlockDescriptor> {
    createStorageUnit() {
        return new ArrayStorageUnit<BlockPermutation, void>(4096, true);
    }
}