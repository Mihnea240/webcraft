import * as THREE from "three";
import Faces from "./faces";
import BlockModel from "../block_model/blocks.js";
import BlockState from "./block_state.js";
import { Array3D } from "./memory_management.js";
import Chunk from "./chunk.js";
import { ChunkPipeline } from "../gpu_manager";
import { BitPacker } from "./bit_packer.js";
import { ao } from "three/examples/jsm/tsl/display/GTAONode.js";

function ctz32(x) {
	if (x === 0) return 32;
	return Math.clz32(x & -x) ^ 31;
}

export default class ChunkMesher {
	/**
	 * @param {BlockModel} blockModel
	 */
	constructor(blockModel) {
		this.blockModel = blockModel;
		this.chunk = null;

		this.axis_bit_arrays = new Array3D(Chunk.size, Chunk.size, 3);
		this.face_masks = new Array3D(Chunk.size, Chunk.size, 6); // 6 faces
		this.quad_buffer = new Uint32Array(ChunkPipeline.bytes_per_chunk / 4);
		this.non_full_blocks = [];
		this.util_vec = new THREE.Vector3();

		this.quad_cnt = 0;
		this.util_array = new Array(2);

		this.bit_packer = new BitPacker({
			x: 4,
			y: 4,
			z: 4,
			texture_id: 12,
			quad_normal: 3,
			placing_face: 3,
			facing: 2,

			transform: 10,
			ao_exponent: 8,
			ao: 8,
			light: 4,
			isotropic: 1,
			flag: 1,

			light_corners: 4,
			sky_light: 4,
			temperature: 8,
			humidity: 8,
		}, 4);
		this.bitView = new this.bit_packer.BitView();
		console.log(this.bit_packer);
	}

	/**
	 * @param {number} x - x in chunk
	 * @param {number} y - y in chunk
	 * @param {number} z - z in chunk
	 * @param {BlockState} state - BlockState instance
	 * @param {number} axis - Axis of the quad (0-5)
	 * @param {number} rotation - Rotation of the quad (0-3)
	 * ```  
	 * Red channel                                     Green channel     
	 * 4---- 4---- 4---- 3--- 3--- 7------- 7------- | 2-- 9--------- 4---- 1-
	 * 1     2     3     4    5    6        7          8   9          10    11
	 *```
	 * 1 - x in chunk (0-15)  
	 * 2 - y in chunk (0-15)  
	 * 3 - z in chunk (0-15)  
	 * 4 - quad axis facing (0-5)  
	 * 5 - block placing face (0-5)
	 * 6 - atlas u (0-127)   
	 * 7 - atlas v (0-127)  
	 * 8 - block rotation around the placing axis (0-3)  
	 * 9 - geometry transform id (0-511)  
	 * 10 - geometry animation id that points to a pair of a destination transform and a time variable for interpolation
	 * 11 - random uv rotation (false/true)
	 */
	packQuadData(x, y, z, state, geometry_id, axis) {
		let data_r = 0 >>> 0;
		data_r += (x & 15) << 28;
		data_r += (y & 15) << 24;
		data_r += (z & 15) << 20;
		data_r += (axis & 7) << 17;

		const placing = state.getProperty(BlockState.PLACING) || 0;
		const facing = state.getProperty(BlockState.FACING) || 0;
		const uvs = state.getUvs(axis);

		data_r += (placing & 7) << 14;
		data_r += uvs;

		let data_g = 0 >>> 0;
		data_g += (facing & 3) << 30;
		data_g += (geometry_id & 511) << 21;

		this.util_array[0] = data_r;
		this.util_array[1] = data_g;

		return this.util_array;
	}

	generateAxisBitArrays() {
		let value, x_index, y_index, z_index;
		const prop_id = BlockState.FULL_BLOCK;
		for (let x = 0; x < Chunk.size; x++) {
			for (let y = 0; y < Chunk.size; y++) {
				for (let z = 0; z < Chunk.size; z++) {
					value = this.chunk.getBlockType(x, y, z);
					if (!value) continue;
					if (value.getProperty(BlockState.FULL_BLOCK)) {
						x_index = this.axis_bit_arrays.index(y, z, 0);
						this.axis_bit_arrays.data[x_index] |= 1 << x; // x axis

						y_index = this.axis_bit_arrays.index(x, z, 1);
						this.axis_bit_arrays.data[y_index] |= 1 << y; // y axis

						z_index = this.axis_bit_arrays.index(x, y, 2);
						this.axis_bit_arrays.data[z_index] |= 1 << z; // z axis
					} else {
						this.non_full_blocks.push([x, y, z, value]);
					}
				}
			}
		}
	}

	generateFaceMasks() {
		let index = 0, value = 0;
		for (let axis = 0; axis < 3; axis++) {
			for (let x = 0; x < Chunk.size; x++) {
				for (let y = 0; y < Chunk.size; y++) {
					value = this.axis_bit_arrays.get(x, y, axis);

					this.face_masks.set(x, y, axis, value & ~(value >> 1));
					this.face_masks.set(x, y, Faces.opposite(axis), value & ~(value << 1));
				}
			}
		}
	}

	*visibleFaces(axis) {
		for (let i = 0; i < Chunk.size; i++) {
			for (let j = 0; j < Chunk.size; j++) {
				let mask = this.face_masks.get(i, j, axis);

				while (mask) {
					let face_index = ctz32(mask); // Get the index of the first set bit
					mask &= (mask - 1); // Clear the lowest set bit

					switch (axis < 3 ? axis : 5 - axis) { // Convert to 0-2 range for axis
						case 0: this.util_vec.set(face_index, i, j); break;
						case 1: this.util_vec.set(i, face_index, j); break;
						case 2: this.util_vec.set(i, j, face_index); break;
					}
					yield this.util_vec;
				}
			}
		}
	}

	simpleMesher() {
		this.generateAxisBitArrays();
		this.generateFaceMasks();

		// for (let axis = 0; axis < 6; axis++) {
		// 	for (const face of this.visibleFaces(axis)) {
		// 		let x = face.x, y = face.y, z = face.z;
		// 		let block_type = this.chunk.getBlockType(x, y, z);
		// 		this.pushCubes(x, y, z, block_type);
		// 	}
		// }

		// for (const [x, y, z, type] of this.non_full_blocks) {
		// 	// const geometry_id = type.getProperty(BlockState.GEOMETRY);
		// 	const cubes = type.getCubes();
		// 	this.pushCubes(x, y, z, type);
		// }
		for (let axis = 0; axis < 6; axis++) {
			for (const face of this.visibleFaces(axis)) {
				let x = face.x, y = face.y, z = face.z;
				let block_type = this.chunk.getBlockType(x, y, z);
				this.pushCubes(x, y, z, block_type, axis);
			}
		}

		for (const [x, y, z, type] of this.non_full_blocks) {
			this.pushCubes(x, y, z, type);
		}



		console.log(`Generated ${this.quad_cnt} quads.`);
	}
	/**
	 * @param {BlockState} type  
	 */
	pushCubes(x, y, z, type, axis = -1) {
		const buffer = this.quad_buffer;
		let offset = this.quad_cnt * 3;
		buffer.set([0, 0, 0], offset);

		const blockModel = this.blockModel;
		const bitView = this.bitView;
		const material_view = blockModel.getMaterialById(type.material_id);
		const atlas_view = blockModel.textureRegistry.atlas_view;

		const facing = type.getProperty(BlockState.FACING);
		const placing = type.getProperty(BlockState.PLACING);
		const ao_exponent = material_view.ao_exponent;

		for (const cube of blockModel.cubes(type.geometry_id)) {
			const mask = cube.mask, id = cube.id;

			if (axis >= 0 && (mask & (1 << axis)) === 0) {
				const atlas_id = material_view.getTile(axis);
				atlas_view.id = atlas_id;
				const texture_id = atlas_view.get();

				bitView.set_all(buffer, offset,
					x, y, z, texture_id, axis, placing, facing, id, ao_exponent, 0,
					0, 0, 0, 0, 0, 0, 0
				);
				offset += 3;
				this.quad_cnt++;

				break;
			}
			for (let i = 0; i < 6; i++) {
				if ((mask & (1 << i))) continue;
				const atlas_id = material_view.getTile(i);
				atlas_view.id = atlas_id;
				const texture_id = atlas_view.get();
				bitView.set_all(buffer, offset,
					x, y, z, texture_id, i, placing, facing, id, ao_exponent, 0,
					0, 0, 0, 0, 0, 0, 0
				);
				// bitView.set_all(buffer, offset, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				offset += 3;
				this.quad_cnt++;

				// console.log(material_view,material_view.id, atlas_id, texture_id)
				// console.log(
				// 	texture_id,
				// 	blockModel.textureRegistry.textureView(texture_id).u,
				// 	blockModel.textureRegistry.textureView(texture_id).v,
				// 	blockModel.textureRegistry.texture_data.buffer[texture_id * 4],
				// 	blockModel.textureRegistry.atlas_tile_data.buffer
				// );

				console.log(blockModel.geometryRegistry.transformView(id).inset);
			}

		}
	}



	computeChunk(chunk) {
		this.chunk = chunk;
		this.quad_cnt = 0;

		this.simpleMesher();
		this.chunk.draw_details.quad_cnt = this.quad_cnt;
	}
}