import * as THREE from "three";
import Faces from "@engine/utils/faces";
import BlockModel from "@engine/block/model";
import BlockState from "@chunk/block_state";
import Chunk from "@chunk/chunk";
import { Array3D } from "@engine/utils/memory_management";
import { ChunkPipeline } from "@world/gpu_manager";
import { BitPacker } from "@utils/bit_packer";
import { ChunkSettings } from "@engine/utils/constants";

function ctz32(x) {
	if (x === 0) return 32;
	return Math.clz32(x & -x) ^ 31;
}

export default class ChunkMesher {
	/**
	 * @param {BlockModel} blockModel
	 * @param {ChunkPipeline} pipeline
	 */
	constructor(blockModel, pipeline) {
		this.blockModel = blockModel;
		this.chunkPipeline = pipeline;
		/**@type {Chunk} */
		this.chunk = null;

		this.axis_bit_arrays = new Array3D(Chunk.size, Chunk.size, 3);
		this.face_masks = new Array3D(Chunk.size, Chunk.size, 6); // 6 faces
		this.quad_buffer = new Uint32Array(ChunkSettings.BYTES_PER_CHUNK_QUADS / 4);
		this.non_full_blocks = [];
		this.util_vec = new THREE.Vector3();

		this.quad_cnt = 0;
		this.util_array = new Array(2);

		// BitPacker layout with MSB ordering - now matches shader expectations naturally
		this.bit_packer = new BitPacker({
			// First uint32 (quad.x) - natural order with MSB bit_flow
			x: 'bit4',             // bits 31-28 (MSB)
			y: 'bit4',             // bits 27-24
			z: 'bit4',             // bits 23-20
			texture_id: 'bit12',   // bits 19-8
			quad_normal: 'bit3',   // bits 7-5
			placing_face: 'bit3',  // bits 4-2
			facing: 'bit2',        // bits 1-0 (LSB)

			// Second uint32 (quad.y) - natural order with MSB bit_flow
			transform: 'bit10',    // bits 31-22 (MSB)
			ao: 'bit8',            // bits 21-14
			ao_exponent: 'bit8',   // bits 13-6
			light: 'bit4',         // bits 5-2
			flag: 'bit1',          // bit 1
			isotropic: 'bit1',     // bit 0 (LSB)

			// Third uint32 (quad.z) - natural order with MSB bit_flow
			light_corners: 'bit4', // bits 31-28 (MSB)
			sky_light: 'bit4',     // bits 27-24
			temperature: 'bit8',   // bits 23-16
			humidity: 'bit8',      // bits 15-8
			_reserved: 'bit8',     // bits 7-0 (LSB, for future use)
		}, { bit_flow: 'MSB', alignment: 4 });
		
		this.quadView = new this.bit_packer.BitView(this.quad_buffer.buffer, 0);

		// for (const field_name in this.bit_packer.fields) {
		// 	const field = this.bit_packer.fields[field_name];
		// 	console.log(field_name, field, field.quant_size, field.bit_offset_in_quant);
		// }
	}

	generateAxisBitArrays(){
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

	clear() {
		this.axis_bit_arrays.data.fill(0);
		this.face_masks.data.fill(0);
		this.non_full_blocks.length = 0;
		this.quad_cnt = 0;
		// this.quad_buffer.fill(0);
	}

	simpleMesher() {
		this.generateAxisBitArrays();
		this.generateFaceMasks();

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
	}
	/**
	 * @param {BlockState} type  
	 */
	pushCubes(x, y, z, type, axis = -1) {
		const buffer = this.quad_buffer;
		let offset = this.quad_cnt * 3;
		
		const blockModel = this.blockModel;
		const material_view = blockModel.getMaterialById(type.material_id);
		const atlas_view = blockModel.textureRegistry.atlas_view;

		const facing = type.getProperty(BlockState.FACING);
		const placing = type.getProperty(BlockState.PLACING);
		const ao_exponent = material_view.ao_exponent;

		for (const cube of blockModel.cubes(type.geometry_id)) {
			const mask = cube.mask, id = cube.id;
			for(let i = 0; i < 3; i++) buffer[offset + i] = 0;

			if (axis >= 0 && (mask & (1 << axis)) === 0) {
				const atlas_id = material_view.getTile(axis);
				atlas_view.id = atlas_id;
				const texture_id = atlas_view.get();

				this.setQuadData(offset, x, y, z, texture_id, axis, placing, facing, id, ao_exponent);
				this.chunk.voxel_to_first_quad.set(x, y, z, offset);
				offset += 3;
				this.quad_cnt++;

				break;
			}
			for (let i = 0; i < 6; i++) {
				if ((mask & (1 << i))) continue;
				const atlas_id = material_view.getTile(i);
				atlas_view.id = atlas_id;
				const texture_id = atlas_view.get();

				for(let i = 0; i < 3; i++) buffer[offset + i] = 0;


				this.setQuadData(offset, x, y, z, texture_id, i, placing, facing, id, ao_exponent);
				this.chunk.voxel_to_first_quad.set(x, y, z, offset);
				offset += 3;
				this.quad_cnt++;
			}

		}
	}

	/**
	 * Set quad data using BitPacker with correct MSB layout to match shader
	 * @param {number} offset - Offset in uint32s (will be converted to bytes)
	 * @param {number} x - X coordinate (0-15)
	 * @param {number} y - Y coordinate (0-15)
	 * @param {number} z - Z coordinate (0-15)
	 * @param {number} texture_id - Texture ID
	 * @param {number} axis - Face axis
	 * @param {number} placing - Placing face
	 * @param {number} facing - Facing direction
	 * @param {number} id - Transform/geometry ID
	 * @param {number} ao_exponent - AO exponent
	 */
	setQuadData(offset, x, y, z, texture_id, axis, placing, facing, id, ao_exponent) {
		const view = this.quadView;
		view.offset = offset * 4; 

		view.x = x;
		view.y = y;
		view.z = z;
		view.texture_id = texture_id;
		view.quad_normal = axis;
		view.placing_face = placing;
		view.facing = facing;
		view.transform = id;
		view.ao_exponent = ao_exponent;
		view.ao = 0;
		view.light = 0;
		view.isotropic = 0;
		view.flag = 0;
		view.light_corners = 0;
		view.sky_light = 0;
		view.temperature = 0;
		view.humidity = 0;

		// console.log(view.x, view.y, view.z, view.texture_id, view.quad_normal, view.placing_face, view.facing, view.transform);
	}

	computeChunk(chunk) {
		this.chunk = chunk;
		this.clear();

		this.simpleMesher();
		this.chunk.draw_details.quad_cnt = this.quad_cnt;

		this.chunkPipeline.setQuadBuffer(
			chunk.draw_details.quad_offset,
			this.quad_buffer,
			this.quad_cnt
		);
	}
}