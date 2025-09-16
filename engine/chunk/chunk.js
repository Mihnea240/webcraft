import * as THREE from "three";
import { Array3D } from "@engine/utils/memory_management";
import BlockPallet from "@voxel/block_pallet";
import BlockState from "@chunk/block_state";
import Faces from "@engine/utils/faces";
import BlockModel from "@engine/block/model";
import { ChunkSettings } from "@engine/utils/constants";


export default class Chunk {
	static size = 16;
	static RENDERED = 0
	static EMPTY = 1;
	static PENDING = 2;
	static DIRTY = 3; // Marked for remeshing
	constructor(x, y, z) {
		this.voxels = new Array3D(Chunk.size);
		this.voxel_to_first_quad = new Array3D(Chunk.size);
		this.pallet = new BlockPallet();
		
		this.gpu_data = new Float32Array(ChunkSettings.BYTES_PER_CHUNK_DATA / 4);
		this.position = new Float32Array(this.gpu_data.buffer, 0, 3);
		this.position[0] = x;
		this.position[1] = y;
		this.position[2] = z;

		this.draw_details = {
			quad_offset: 0,
			quad_cnt: 0,			
		}

		this.block_repaints = [];
		this.status = Chunk.EMPTY;
		this.id = 0;

		this.world = null;
	}

	pushRepaint(x, y, z) {
		const index = (x << 8) | (z << 4) | y;
	}

	needsRepaint() {
		return this.block_repaints.length > 0;
	}
	
	getData(x, y, z) {
		return this.voxels.get(x, y, z);
	}

	getDataAtIndex(index) {
		return this.voxels.data[index];
	}

	getBlockType(x, y, z) {
		return this.pallet.getType(this.voxels.get(x, y, z));
	}

	setBlockType(x, y, z, type) {
		let id = this.pallet.add(type);
		this.voxels.set(x, y, z, id);
	}

	setBlockTypeAtIndex(index, type) {
		let id = this.pallet.add(type);
		this.voxels.data[index] = id;
	}

	repaint() {
		for (const coord_id of this.block_repaints) {
			const x = (coord_id >> 8) & 0xf;
			const z = (coord_id >> 4) & 0xf;
			const y = (coord_id >> 0) & 0xf;
		}
	}

}