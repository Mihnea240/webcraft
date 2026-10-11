import { BakedCube, BakedGeometry } from "@engine/block/bakedGeometry";
import { ComponentConstructor } from "@engine/block/componentRegistry";
import { BlockComponent } from "@engine/block/components/base";
import { BlockGeometry } from "@engine/block/components/geometry";
import { BlockMaterialInstances } from "@engine/block/components/materialInstances";
import { BlockType } from "@engine/block/type";
import { ArrayStorageUnit } from "../memory_management";
import { ResourcePack } from "../RP";
import { BlockModelRegistry } from "./blockModelRegistry";
import { CubeGeometryRegistry } from "./cubeGeometryRegistry";
import { ResourceRegistry } from "./resourceRegistry";

/** 32-bit descriptor for a block type and its state:
 * High 16 bits: packed state bitfield
 * Low 16 bits: block type ID
 */
export type BlockDescriptor = number;

export class BlockPermutation {
    constructor(
        public components: (BlockComponent | null)[]
    ) {
    }

    get bakedGeometry(): BakedGeometry{
        return (this.components[0] as unknown as BakedGeometry);
    }

    getComponentById(blockType: BlockType, id: number): BlockComponent | null {
        const index = blockType.getComponentIndexInComponentArray(id);
        return index !== -1 ? this.components[index] : null;
    }

    getComponent<T extends BlockComponent>(blockType: BlockType, ctor: ComponentConstructor): T | null {
        const ctorId = ctor.id;
        const index = blockType.getComponentIndexInComponentArray(ctorId);
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
        const count = this.writePointer();
        for (let id = 0; id < count; id++) {
            const blockType = this.get(id);
            if (!blockType) continue;

            blockType.bindToRp(rp);
        }

        const permutationRegistry = rp.get(BlockPermutationRegistry);
        permutationRegistry.bindToRp(rp);
    }

    public bakePermutation(
        permutation: BlockPermutation,
        blockType: BlockType,
        rp: ResourcePack
    ) {
        const geometry = permutation.getComponent<BlockGeometry>(blockType, BlockGeometry);
        const materials = permutation.getComponent<BlockMaterialInstances>(blockType, BlockMaterialInstances);

        if (!geometry) {
            permutation.components[0] = null;
            return;
        }

        const modelRegistry = rp.get(BlockModelRegistry);
        const cubeRegistry = rp.get(CubeGeometryRegistry);
        let model = modelRegistry.get(geometry.modelId);

        if (!model) {
            model = modelRegistry.get(0);
            if (!model) {
                throw new Error(`Failed to bake permutation for ${blockType.description}: model not found for ${geometry.identifier} (modelId ${geometry.modelId})`);
            }
        }

        const bakedCubes: BakedCube[] = [];

        for (let boneIdx = 0; boneIdx < model.boneData.length; boneIdx++) {
            if (geometry.boneData && geometry.boneData[boneIdx] && geometry.boneData[boneIdx].visible === false) {
                continue;
            }
            const bone = model.boneData[boneIdx];
            for (let i = 0; i < bone.cubeCount; i++) {
                const cubeId = bone.cubeStartId + i;
                const faceMatNames = cubeRegistry.getMeta(cubeId) || ["*", "*", "*", "*", "*", "*"];
                const faceTileIds: [number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0];

                for (let f = 0; f < 6; f++) {
                    const matName = faceMatNames[f];
                    let matId = materials?.nameToId.get(matName);
                    if (matId === undefined) {
                        matId = materials?.nameToId.get("*");
                    }
                    if (matId === undefined) {
                        matId = materials?.nameToId.get("all");
                    }
                    faceTileIds[f] = matId !== undefined ? (materials?.tiles[matId] ?? 0) : 0;
                }

                bakedCubes.push({ cubeId, boneIndex: boneIdx, faceTileIds });
            }
        }

        const bakedGeo = (permutation.components[0] = new BakedGeometry(bakedCubes) as any);
        bakedGeo.cullingLayer = geometry.cullingLayerId;
        bakedGeo.cullingId = geometry.cullingId;
    }
}

/** Registry for runtime BlockPermutations (descriptor -> permutationId) */
export class BlockPermutationRegistry extends ResourceRegistry<BlockPermutation, void, BlockDescriptor> {
    createStorageUnit() {
        return new ArrayStorageUnit<BlockPermutation, void>(4096, true);
    }

    public override get(descriptorOrId: BlockDescriptor): BlockPermutation {
        const mappedId = this.keyToId(descriptorOrId);
        const id = mappedId !== undefined ? mappedId : descriptorOrId;
        return this.storage.get(id) as BlockPermutation;
    }

    public getByDescriptor(descriptor: BlockDescriptor): BlockPermutation | undefined {
        const id = this.keyToId(descriptor);
        return id !== undefined ? (this.storage.get(id) as BlockPermutation) : undefined;
    }

    public bindToRp(rp: ResourcePack) {
        const blockTypeRegistry = rp.get(BlockTypeRegistry);
        for (const [descriptor, id] of this.keyToIdMap) {
            const permutation = this.storage.get(id);
            if (!permutation) continue;

            const blockType = blockTypeRegistry.getByDescriptor(descriptor);
            if (!blockType) continue;

            for (const comp of permutation.components) {
                comp?.bindToRp(blockType, rp);
            }

            blockTypeRegistry.bakePermutation(permutation, blockType, rp);
        }
    }
}