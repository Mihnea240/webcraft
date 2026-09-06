import { World } from "../world";
import { Chunk } from "./chunk";

import { DataViewPacker } from "bitpacker";
import { QuadStruct } from "../packing_schemas";
import * as Constants from "../resource_manager/constants";
import { AtlasTileRegistry } from "../resource_manager/registry/atlasTileRegistry";

export class ChunkMesher {
    public chunk!: Chunk;
    public world!: World;

    private writePointer = 0;
    quadBuffer = new Uint32Array(Constants.INITIAL_QUAD_BUFFER_SIZE / 4);
    packer = new DataViewPacker(QuadStruct, true, true);

    constructor() {
        this.packer.setBuffer(this.quadBuffer.buffer);
    }

    setChunk(chunk: Chunk) {
        this.chunk = chunk;
        this.world = chunk.world;
    }

    mesh(): Uint32Array {
        this.writePointer = 0;
        if (!this.chunk || !this.chunk.data) {
            return new Uint32Array(0);
        }

        const tileRegistry = this.world.resourcePack.get(AtlasTileRegistry);
        const [cx, cy, cz] = this.chunk.worldPosition;
        const worldBaseX = cx * Constants.CHUNK_SIZE;
        const worldBaseY = cy * Constants.CHUNK_SIZE;
        const worldBaseZ = cz * Constants.CHUNK_SIZE;

        const size = Chunk.SIZE;
        const data = this.chunk.data;
        const pallet = this.chunk.pallet;

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    const palletId = data.get(x, y, z);
                    if (palletId === undefined) continue;

                    const permutation = pallet.getPermutation(palletId);
                    if (!permutation) continue;

                    const bakedGeometry = permutation.bakedGeometry;
                    if (!bakedGeometry || bakedGeometry.cubes.length === 0) continue;

                    const worldX = worldBaseX + x;
                    const worldY = worldBaseY + y;
                    const worldZ = worldBaseZ + z;

                    for (let c = 0; c < bakedGeometry.cubes.length; c++) {
                        const cube = bakedGeometry.cubes[c];

                        for (let face = 0; face < 6; face++) {
                            const tileId = cube.faceTileIds[face];
                            const textureId = tileRegistry.getTextureId(tileId, 0, worldX, worldY, worldZ);

                            // Zero out the 4 uint32s for this quad before writing
                            const u32Offset = this.writePointer * (QuadStruct.bucketStride);
                            this.quadBuffer[u32Offset] = 0;
                            this.quadBuffer[u32Offset + 1] = 0;
                            this.quadBuffer[u32Offset + 2] = 0;
                            this.quadBuffer[u32Offset + 3] = 0;

                            // Set byte offset and pack quad fields
                            this.packer.byteOffset = u32Offset * 4;
                            const quadView = this.packer.view;

                            quadView.x = x;
                            quadView.y = y;
                            quadView.z = z;
                            quadView.normal = face;
                            quadView.geometry_id = cube.cubeId;
                            quadView.texture_id = textureId;

                            this.writePointer++;
                        }
                    }
                }
            }
        }
        const buffer = new Uint32Array(
            this.quadBuffer.buffer,
            0,
            this.writePointer * QuadStruct.bucketStride
        );

        return buffer;
    }

    unpackChunData() {

    }
}