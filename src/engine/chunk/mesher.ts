import { World } from "../world";
import { Chunk } from "./chunk";

import { DataViewPacker } from "bitpacker";
import { QuadStruct } from "../packing_schemas";
import * as Constants from "../resource_manager/constants";
import { AtlasTileRegistry } from "../resource_manager/registry/atlasTileRegistry";
import Faces from "../utils/faces";

const stride = QuadStruct.bucketStride * 4; // 4 bytes per uint32
const clearSideBits = ~((1 << 0) | (1 << (Constants.CHUNK_SIZE + 1))); // Clear the bits for the sides of the chunk

export class ChunkMesher {
    public chunk!: Chunk;
    public world!: World;

    chunkNeighbors: (Chunk | undefined)[] = [];

    private writePointer = 0;
    quadBuffer = new Uint32Array(Constants.INITIAL_QUAD_BUFFER_SIZE / 4);
    packer = new DataViewPacker(QuadStruct, false);
    view = this.packer.view;

    axisBuffers = new Array(Constants.MESHING_LAYERS_MAX * 3 * 256); // 3 axes, 256 layers per axis
    cullingLayerToBufferAxis = new Map<number, number>();

    palletToAxisBuffer: number[] = [];
    specialCullingPositions: number[] = [];

    unitCubeStructId = 0;

    tileRegistry!: AtlasTileRegistry;

    chunkX = 0;
    chunkY = 0;
    chunkZ = 0;

    constructor() {
        this.packer.setBuffer(this.quadBuffer.buffer);
    }

    setChunk(chunk: Chunk) {
        this.chunk = chunk;
        this.world = chunk.world;
        this.chunkNeighbors = this.world.chunkManager.getChunkNeighbors(chunk);

        this.axisBuffers.fill(0);
        this.cullingLayerToBufferAxis.clear();
        this.palletToAxisBuffer = new Array(chunk.pallet.size).fill(-1);

        this.specialCullingPositions = [];
        this.unitCubeStructId = 0;

        this.tileRegistry = this.world.resourcePack.get(AtlasTileRegistry);

        this.chunkX = chunk.worldPosition[0] * Constants.CHUNK_SIZE;
        this.chunkY = chunk.worldPosition[1] * Constants.CHUNK_SIZE;
        this.chunkZ = chunk.worldPosition[2] * Constants.CHUNK_SIZE;

        this.writePointer = 0;
        this.packer.byteOffset = 0;
    }

    createCullingLayerMapping() {
        for (let i = 1; i < this.chunk.pallet.size; i++) {
            const permutation = this.chunk.pallet.getPermutation(i);
            const bakedGeo = permutation?.bakedGeometry;
            if (!bakedGeo || !bakedGeo.isSolid()) {
                // Custom geometry or non-solid block: skip slice buffer (remains -1)
                continue;
            }

            const layer = bakedGeo.cullingLayer;

            let axisBufferIndex = this.cullingLayerToBufferAxis.get(layer);
            if (axisBufferIndex === undefined) {
                axisBufferIndex = this.cullingLayerToBufferAxis.size;
                this.cullingLayerToBufferAxis.set(layer, axisBufferIndex);
            }

            this.palletToAxisBuffer[i] = axisBufferIndex;
        }
    }

    sliceChunk() {
        const step = Constants.CHUNK_SIZE ** 2;
        const chunk = this.chunk;

        for (let x = 0; x < Constants.CHUNK_SIZE; x++) {
            for (let y = 0; y < Constants.CHUNK_SIZE; y++) {
                for (let z = 0; z < Constants.CHUNK_SIZE; z++) {
                    const palletId = chunk.data!.get(x, y, z);
                    // Skip empty blocks
                    if (!palletId) continue;

                    const axisBufferIndex = this.palletToAxisBuffer[palletId];

                    // Blocks that have special culling rules or custom geometry
                    if (axisBufferIndex === -1) {
                        this.specialCullingPositions.push(Chunk.compressPosition(x, y, z));
                        continue;
                    }

                    const baseOffset = axisBufferIndex * step * 3; // 3 axes

                    // X axis slices (axis 0: perpendicular coords y, z)
                    this.axisBuffers[baseOffset + y * Constants.CHUNK_SIZE + z] |= 1 << (x + 1);
                    // Y axis slices (axis 1: perpendicular coords x, z)
                    this.axisBuffers[baseOffset + step + x * Constants.CHUNK_SIZE + z] |= 1 << (y + 1);
                    // Z axis slices (axis 2: perpendicular coords x, y)
                    this.axisBuffers[baseOffset + step * 2 + x * Constants.CHUNK_SIZE + y] |= 1 << (z + 1);
                }
            }
        }
    }

    completeWithNeighbours() {
        const step = Constants.CHUNK_SIZE ** 2;

        for (let u = 0; u < Constants.CHUNK_SIZE; u++) {
            for (let v = 0; v < Constants.CHUNK_SIZE; v++) {
                for (let axis = 0; axis < 3; axis++) {
                    const chunkPosNeighbor = this.chunkNeighbors[axis];
                    const chunkNegNeighbor = this.chunkNeighbors[Faces.opposite(axis)];

                    const pos: [number, number, number] = [0, 0, 0];

                    if (chunkPosNeighbor) {
                        // In positive neighbor, touching face is at coord 0
                        if (axis === 0) { pos[0] = 0; pos[1] = u; pos[2] = v; }
                        else if (axis === 1) { pos[0] = u; pos[1] = 0; pos[2] = v; }
                        else { pos[0] = u; pos[1] = v; pos[2] = 0; }

                        const palletNeighbor = chunkPosNeighbor.getPallet(pos[0], pos[1], pos[2]);
                        if (palletNeighbor) {
                            const neighborPerm = chunkPosNeighbor.pallet.getPermutation(palletNeighbor);
                            if (neighborPerm?.bakedGeometry?.isSolid()) {
                                const layer = neighborPerm.bakedGeometry.cullingLayer;

                                if (!this.cullingLayerToBufferAxis.has(layer)) {
                                    const axisBufferIndex = this.cullingLayerToBufferAxis.size;
                                    this.cullingLayerToBufferAxis.set(layer, axisBufferIndex);
                                }

                                const axisBufferIndex = this.cullingLayerToBufferAxis.get(layer)!;
                                const baseOffset = axisBufferIndex * step * 3;

                                this.axisBuffers[baseOffset + step * axis + u * Constants.CHUNK_SIZE + v] |= (1 << (Constants.CHUNK_SIZE + 1));
                            }
                        }
                    }

                    if (chunkNegNeighbor) {
                        // In negative neighbor, touching face is at coord CHUNK_SIZE - 1
                        if (axis === 0) { pos[0] = Constants.CHUNK_SIZE - 1; pos[1] = u; pos[2] = v; }
                        else if (axis === 1) { pos[0] = u; pos[1] = Constants.CHUNK_SIZE - 1; pos[2] = v; }
                        else { pos[0] = u; pos[1] = v; pos[2] = Constants.CHUNK_SIZE - 1; }

                        const palletNeighbor = chunkNegNeighbor.getPallet(pos[0], pos[1], pos[2]);
                        if (palletNeighbor) {
                            const neighborPerm = chunkNegNeighbor.pallet.getPermutation(palletNeighbor);
                            if (neighborPerm?.bakedGeometry?.isSolid()) {
                                const layer = neighborPerm.bakedGeometry.cullingLayer;

                                if (!this.cullingLayerToBufferAxis.has(layer)) {
                                    const axisBufferIndex = this.cullingLayerToBufferAxis.size;
                                    this.cullingLayerToBufferAxis.set(layer, axisBufferIndex);
                                }

                                const axisBufferIndex = this.cullingLayerToBufferAxis.get(layer)!;
                                const baseOffset = axisBufferIndex * step * 3;

                                this.axisBuffers[baseOffset + step * axis + u * Constants.CHUNK_SIZE + v] |= (1 << 0);
                            }
                        }
                    }
                }
            }
        }
    }

    cullLayer(layerId: number) {
        const step = Constants.CHUNK_SIZE ** 2;
        const baseOffset = layerId * step * 3;

        for (let axis = 0; axis < 3; axis++) {
            const positiveFace = axis;
            const negativeFace = Faces.opposite(axis);

            for (let i = 0; i < Constants.CHUNK_SIZE ** 2; i++) {
                const slice = this.axisBuffers[baseOffset + step * axis + i];
                if (slice === 0) continue;

                const u = Math.floor(i / Constants.CHUNK_SIZE);
                const v = i % Constants.CHUNK_SIZE;

                // Compute faces where neighbor is empty:
                // - (slice << 1) brings bit c (the c-1 negative neighbor) to bit c+1
                // - (slice >> 1) brings bit c+2 (the c+1 positive neighbor) to bit c+1
                const negativeFaces = slice & ~(slice << 1);
                const positiveFaces = slice & ~(slice >> 1);

                if (negativeFaces) {
                    const chunkNegativeFaces = (negativeFaces & clearSideBits) >>> 1;
                    if (chunkNegativeFaces) {
                        this.unwrapSlice(chunkNegativeFaces, axis, negativeFace, u, v);
                    }
                }

                if (positiveFaces) {
                    const chunkPositiveFaces = (positiveFaces & clearSideBits) >>> 1;
                    if (chunkPositiveFaces) {
                        this.unwrapSlice(chunkPositiveFaces, axis, positiveFace, u, v);
                    }
                }
            }
        }
    }

    unwrapSlice(slice: number, axis: number, face: number, u: number, v: number) {
        let location = 31;

        while (slice) {
            const leadingZeros = Math.clz32(slice);
            location -= leadingZeros;
            slice <<= leadingZeros;

            let x = 0, y = 0, z = 0;
            if (axis === 0) {
                x = location;
                y = u;
                z = v;
            } else if (axis === 1) {
                x = u;
                y = location;
                z = v;
            } else {
                x = u;
                y = v;
                z = location;
            }

            this.pushBlockQuad(x, y, z, face);

            slice <<= 1;
            location--;
        }
    }

    cullSpecialPositions() {
        // Blocks that have unique visibility rules or custom geometry without culling rules
        for (const compressedPosition of this.specialCullingPositions) {
            const x = compressedPosition & 0xF;
            const z = (compressedPosition >> 4) & 0xF;
            const y = (compressedPosition >> 8) & 0xF;

            this.pushModelQuads(x, y, z);
        }
    }

    pushBlockQuad(x: number, y: number, z: number, face: number) {
        const view = this.packer.view;

        const bakedGeometry = this.chunk.getPermutation(x, y, z)!.bakedGeometry;
        const cube = bakedGeometry.cubes[0]; // Assuming one cube per block for simplicity

        const worldX = this.chunkX + x;
        const worldY = this.chunkY + y;
        const worldZ = this.chunkZ + z;

        view.x = x;
        view.y = y;
        view.z = z;
        view.normal = face;
        view.geometry_id = cube.cubeId;
        view.texture_id = this.tileRegistry.getTextureId(cube.faceTileIds[face], 0, worldX, worldY, worldZ);

        this.writePointer += stride;
        this.packer.byteOffset = this.writePointer;
    }

    pushModelQuads(x: number, y: number, z: number) {
        const view = this.packer.view;

        const bakedGeometry = this.chunk.getPermutation(x, y, z)!.bakedGeometry;
        const worldX = this.chunkX + x;
        const worldY = this.chunkY + y;
        const worldZ = this.chunkZ + z;

        for (const cube of bakedGeometry.cubes) {
            for (let face = 0; face < 6; face++) {
                view.x = x;
                view.y = y;
                view.z = z;
                view.normal = face;
                view.geometry_id = cube.cubeId;
                view.texture_id = this.tileRegistry.getTextureId(cube.faceTileIds[face], 0, worldX, worldY, worldZ);

                this.writePointer += stride;
                this.packer.byteOffset = this.writePointer;
            }
        }
    }

    mesh() {
        this.createCullingLayerMapping();
        this.sliceChunk();
        this.completeWithNeighbours();

        for (const axisBufferIndex of this.cullingLayerToBufferAxis.values()) {
            this.cullLayer(axisBufferIndex);
        }

        this.cullSpecialPositions();

        return new Uint32Array(this.quadBuffer.buffer, 0, this.writePointer / 4);
    }

    // mesh(): Uint32Array {
    //     this.writePointer = 0;
    //     if (!this.chunk || !this.chunk.data) {
    //         return new Uint32Array(0);
    //     }

    //     const tileRegistry = this.world.resourcePack.get(AtlasTileRegistry);
    //     const [cx, cy, cz] = this.chunk.worldPosition;
    //     const worldBaseX = cx * Constants.CHUNK_SIZE;
    //     const worldBaseY = cy * Constants.CHUNK_SIZE;
    //     const worldBaseZ = cz * Constants.CHUNK_SIZE;

    //     const size = Chunk.SIZE;
    //     const data = this.chunk.data;
    //     const pallet = this.chunk.pallet;

    //     for (let x = 0; x < size; x++) {
    //         for (let y = 0; y < size; y++) {
    //             for (let z = 0; z < size; z++) {
    //                 const palletId = data.get(x, y, z);
    //                 if (palletId === undefined) continue;

    //                 const permutation = pallet.getPermutation(palletId);
    //                 if (!permutation) continue;

    //                 const bakedGeometry = permutation.bakedGeometry;
    //                 if (!bakedGeometry || bakedGeometry.cubes.length === 0) continue;

    //                 const worldX = worldBaseX + x;
    //                 const worldY = worldBaseY + y;
    //                 const worldZ = worldBaseZ + z;

    //                 for (let c = 0; c < bakedGeometry.cubes.length; c++) {
    //                     const cube = bakedGeometry.cubes[c];

    //                     for (let face = 0; face < 6; face++) {
    //                         const tileId = cube.faceTileIds[face];
    //                         const textureId = tileRegistry.getTextureId(tileId, 0, worldX, worldY, worldZ);

    //                         // Zero out the 4 uint32s for this quad before writing
    //                         const u32Offset = this.writePointer * (QuadStruct.bucketStride);
    //                         this.quadBuffer[u32Offset] = 0;
    //                         this.quadBuffer[u32Offset + 1] = 0;
    //                         this.quadBuffer[u32Offset + 2] = 0;
    //                         this.quadBuffer[u32Offset + 3] = 0;

    //                         // Set byte offset and pack quad fields
    //                         this.packer.byteOffset = u32Offset * 4;
    //                         const quadView = this.packer.view;

    //                         quadView.x = x;
    //                         quadView.y = y;
    //                         quadView.z = z;
    //                         quadView.normal = face;
    //                         quadView.geometry_id = cube.cubeId;
    //                         quadView.texture_id = textureId;

    //                         this.writePointer++;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     const buffer = new Uint32Array(
    //         this.quadBuffer.buffer,
    //         0,
    //         this.writePointer * QuadStruct.bucketStride
    //     );

    //     return buffer;
    // }

    // unpackChunData() {

    // }
}