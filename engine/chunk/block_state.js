import BlockModel from "@engine/block/model";
import Faces from "@engine/utils/faces";

export default class BlockState {
	/**@type {BlockModel} */
	static blockModel = null;
	static FULL_BLOCK = 0; // 0: non full block, 1: full block
	static FACING = 1; // 0: east, 1: north, 2: west, 3: south
	static PLACING = 2;
	static DOUBLE_SLAB = 3; // 0: single, 1: double
	static WATERLOGGED = 4; // 0: not waterlogged, 1: waterlogged
	static ACTIVE = 5; // redstone, hopper lock, door, fence_gate
	static MODE = 6; // comparator mode, copper bulb,
	static VALUE = 7; // redstone signal, crops age, sign rotation, cake bites, farmland wetness
	static NOTE_PITCH = 8; // note block pitch
	static GEOMETRY = 9; // geometry id
	static MATERIAL = 10; // material id
	static bit_packing = [
		//  0: size in bits, 1: mask
		// the mask will be shifted on init
		// the size will be changed for offset on init
		[1, 0b1], // 0: non full block, 1: full block
		[2 , 0b11], // 0: east, 1: north, 2: west, 3: south
		[3, 0b111], // face placing, 0: east, 1: north, 2: west, 3: south, 4: up, 5: down
		[1, 0b1], // 0: single, 1: double
		[1, 0b1], // 0: not waterlogged, 1: waterlogged
		[1, 0b1], //redstone, hopper lock, door, fance_gate,
		[1, 0b1], // comparator mode, copper bulb, 
		[4, 0b1111], // redstone signal, crops age, sign rotation, cake bites, farmland wetness,
		[5, 0b11111], // note block pitch  
	];

	static events = [
		[], // FULL_BLOCK
		[], // FACING
		[], // HALF
		[], // PLACING
		[], // DOUBLE_SLAB
		[], // WATERLOGGED
		[], // ACTIVE
		[], // MODE
		[], // VALUE
		[], // NOTE_PITCH
		[], // GEOMETRY
		[], // MATERIAL
	]


	static computePackingMasks() {
		let offset = 0, data = this.bit_packing, size = 0;
		console.log("Computing packing masks for BlockState"); 
		for (const entry of data) {
			size = entry[0];
			entry[1] <<= offset; // shift the mask
			entry[0] = offset; // set the offset 
			offset += size;
		}
	}

	constructor(block_name) {
		this.name = block_name;
		this.data = 4 << 3; // Convert to 32 bits integer
		this.geometry_id = 0; // Default geometry ID
		this.material_id = 0; // Default material
	}

	getPacking(property) {
		return this.constructor.bit_packing[property];
	}

	getProperty(property) {
		const packing = this.getPacking(property);
		if(!packing) {
			throw new Error(`Property ${property} does not exist in block state.`);
		}
		return (this.data & packing[1]) >> packing[0];
	}

	setProperty(property, value) {
		const packing = this.getPacking(property);
		this.data = (this.data & ~packing[1]) | ((value << packing[0]) & packing[1]);
		this.callEvent(property, value);
		return this;
	}
	
	callEvent(property, value) {
		const events = this.constructor.events[property];
		for (const event of events) {
			event.call(this, value);
		}
	}


	getCubes() {
		return this.blockModel.getGeometryById(this.geometry_id);
	}
	getUvs(axis, variant = 0) {
		let textures = this.blockModel.getMaterialById(this.material_id)[axis][variant];
		return textures;
	}

	isSolid() {
		return this.getProperty(BlockState.FULL_BLOCK);
	}
	isWaterlogged() {
		return this.getProperty(BlockState.WATERLOGGED);
	}
	isActive() { 
		return this.getProperty(BlockState.ACTIVE);
	}

	clone() {
		const new_class = new this.constructor(this.data);
		console.log(
			new_class.getProperty(BlockState.PLACING),
			this.getProperty(BlockState.PLACING)
		);
		return new_class;
	}
}

BlockState.computePackingMasks();