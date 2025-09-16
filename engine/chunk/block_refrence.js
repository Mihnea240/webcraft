import BlockState from "@chunk/block_state";
import Chunk from "@chunk/chunk";
import World from "@world/world";
import { ChunkSettings } from "@utils/constants";
import Faces from "@utils/faces";

export default class BlockRefrence{
	constructor(world, causes_remesh = true) {
		this.chunk_position = causes_remesh ? 1 << 13 : 0;
		/**@type {Chunk} */
		this.chunk = null;
		/**@type {World} */
		this.world = world;
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
		return (this.chunk_position >> 4) & 0xf;
	}

	set z(value) {
		this.chunk_position = (this.chunk_position & 0xfffff0f) | ((value & 0xf) << 0);
	}
	get z() {
		return this.chunk_position & 0xf;
	}

	set causes_remesh(value) {
		this.chunk_position = value
			? this.chunk_position | (1 << 13)
			: this.chunk_position & ~(1 << 13);
	}
	get causes_remesh() {
		return (this.chunk_position & (1 << 13)) !== 0;
	}

	set state(value) {
		this.chunk.setBlockType(this.x, this.y, this.z, value);
		this.triggerRemesh();
	}
	get state() {
		return this.chunk?.getBlockType(this.x, this.y, this.z);
	}

	setChunkPosition(x, y, z) {
		this.chunk_position = (this.chunk_position & ~0xFFF) | ((x & 0xF) << 8) | ((y & 0xF) << 4) | ((z & 0xF) << 0);
		return this;
	}

	setWorldPosition(x, y, z) {
		const size = ChunkSettings.SIZE;
		const chunk_x = Math.floor(x / size);
		const chunk_y = Math.floor(y / size);
		const chunk_z = Math.floor(z / size);
		
		this.chunk = this.world.getChunk(chunk_x, chunk_y, chunk_z);
		if (!this.chunk) return;

		this.setChunkPosition(
			x - chunk_x * size,
			y - chunk_y * size,
			z - chunk_z * size
		);
		return this;
	}

	triggerRemesh() {
		if (this.causes_remesh && this.chunk) {
			this.world?.makeChunkDirty(this.chunk);
		}
	}

	getWorldPosition() {
		if (!this.chunk) return null;
		return [
			this.chunk.position[0] * ChunkSettings.SIZE + this.x,
			this.chunk.position[1] * ChunkSettings.SIZE + this.y,
			this.chunk.position[2] * ChunkSettings.SIZE + this.z
		]
	}

	clone() {
		const br = new BlockRefrence(this.world, this.causes_remesh);
		br.chunk_position = this.chunk_position;
		br.chunk = this.chunk;
		return br;
	}

	copy(br) {
		this.chunk_position = br.chunk_position;
		this.chunk = br.chunk;
		this.world = br.world;
		return this;
	}

	getProperty(property_name) {
		return this.state.getProperty(property_name);
	}

	setProperty(property_name, value) {
		this.state.setProperty(property_name, value);
		this.chunk.block_repaints.push(this.chunk_position);
		
		this.triggerRemesh();
		return this;
	}

	translate(dx, dy, dz) {
		const chunk_position = this.chunk.position;
		let x = chunk_position[0] * ChunkSettings.SIZE + this.x + dx;
		let y = chunk_position[1] * ChunkSettings.SIZE + this.y + dy;
		let z = chunk_position[2] * ChunkSettings.SIZE + this.z + dz;

		this.setWorldPosition(x, y, z);
		return this;
	}

	moveToNeighbor(face) {
		this.translate(...Faces.to_vector[face]);
	}

	isOutOfWorld() {
		return !this.chunk;
	}
}