import BlockState from "./block_state";
import Chunk from "./chunk";
import World from "../world";
import { ChunkSettings } from "../utils/constants";

export default class BlockRefrence{
	/**@param {BlockState} block_state*/
	
	constructor() {
		this.chunk_position = 0;
		
		/**@type {BlockState} */
		this.block_state = null;
		/**@type {Chunk} */
		this.chunk = null;
		/**@type {World} */
		this.world = null;
	}
	set x(value) {
		this.chunk_position = (this.chunk_position & 0xffff0ff) | ((value & 0xf) << 8);
	}
	get x() {
		return (this.chunk_position >> 8) & 0xf;
	}

	set y(value) {
		this.chunk_position = (this.chunk_position & 0xfff0ff) | ((value & 0xf) << 4);
	}
	get y() {
		return this.chunk_position & 0xf;
	}

	set z(value) {
		this.chunk_position = (this.chunk_position & 0xfffff0f) | ((value & 0xf) << 0);
	}
	get z() {
		return (this.chunk_position >> 4) & 0xf;
	}

	getWorldPosition() {
		if (!this.chunk || !this.world) return null;
		return [
			this.chunk.position[0] * ChunkSettings.SIZE + this.x,
			this.chunk.position[1] * ChunkSettings.SIZE + this.y,
			this.chunk.position[2] * ChunkSettings.SIZE + this.z
		]
	}

	clone() {
		const br = new BlockRefrence();
		br.chunk_position = this.chunk_position;
		br.block_state = this.block_state;
		br.chunk = this.chunk;
		br.world = this.world;
		return br;
	}

	getProperty(property_name) {
		return this.block_state.getProperty(property_name);
	}

	setProperty(property_name, value) {
		this.block_state.setProperty(property_name, value);
		this.chunk.block_repaints.push(this.chunk_position);
		
		this.world.pushDirtyChunk(this.chunk);
		return this;
	}

	setBlockState(block_state) {
		this.chunk.setBlockType(this.x, this.y, this.z, block_state);

		// if (this.block_state.geometry_id !== block_state.geometry_id) {
		// 	this.chunk.status = Chunk.DIRTY;
		// }
		this.chunk.status = Chunk.DIRTY;
		this.block_state = block_state;
	}
}