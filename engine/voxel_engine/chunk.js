import * as THREE from "three";
import { Array3D } from "./memory_management.js";
import BlockPallet from "./block_pallet";
import BlockState from "./block_state.js";
import Faces from "./faces.js";
import BlockModel from "../block_model/blocks.js";


export default class Chunk {
	static size = 16;
	static RENDERED = 0
	static EMPTY = 1;
	static PENDING = 2;
	static DIRTY = 3; // Marked for remeshing
	constructor(x, y, z) {
		this.data = new Array3D(Chunk.size);
		this.position = new Int32Array([x, y, z]);
		this.pallet = new BlockPallet();

		// /**@type {THREE.MeshBasicMaterial | null} */
		// this.mesh = null;

		this.draw_details = {
			quad_offset: 0,
			quad_cnt: 0,			
		}

		this.block_repaints = [];
		this.status = Chunk.EMPTY;
		this.id = 0;

		this.world = null;
	}

	needsRepaint() {
		return this.block_repaints.length > 0;
	}

	isEmpty() {
		return this.mesh
	}
	
	getData(x, y, z) {
		return this.data.get(x, y, z);
	}

	getDataAtIndex(index) {
		return this.data.data[index];
	}

	getBlockType(x, y, z) {
		return this.pallet.getType(this.data.get(x, y, z));
	}

	setBlockType(x, y, z, type) {
		let id = this.pallet.add(type);
		this.data.set(x, y, z, id);
	}

	setBlockTypeAtIndex(index, type) {
		let id = this.pallet.add(type);
		this.data.data[index] = id;
	}

	repaint() {
		for(const coord_id of this.block_repaints) {
			const block = this.getBlockTypeAtIndex(coord_id);
			const texture_id = this.block_to_texture_id.data[coord_id];


		}
	}

}