import * as THREE from "three";
import Faces from "./voxel/faces.js";
import ResourceLoader from "./resource-loader.js";
import BlockModel from "./block_model/blocks.js";
import Chunk from "./voxel/chunk.js";
import BlockState from "./voxel/block_state.js";
import ChunkMesher from "./voxel/chunk_mesher.js";
import Player from "./player.js";
import { ChunkPipeline } from "./gpu_manager.js";
import { ChunkSettings } from "../utils/constants.js";
import BlockRefrence from "./voxel/block_refrence.js";
import { Raycaster } from "../utils/voxel_dda.js";


export default class World {
	/**@param {ResourceLoader} resourceLoader */
	constructor(resourceLoader) {
		this.chunkMap = new Map();
		this.resourceLoader = resourceLoader;
		this.rayCaster = new Raycaster();

		/**@type {Array<Player>} */
		this.players = [];
		this.dirty_chunks = [];

		this.scene = new THREE.Scene();
		this.chunkPipeline = resourceLoader.chunkPipeline;

		this.animateFunction = this.animate.bind(this);
		this.clock = new THREE.Clock();

		this.blockModel = this.resourceLoader.blockModel;
		this.chunkMesher = new ChunkMesher(this.blockModel, this.chunkPipeline);

		/**@type {Record<string, new () => BlockState>} */
		this.Blocks = this.blockModel.Blocks;

		this.doStuff();
	}
	pushDirtyChunk(chunk) {
		if (this.dirty_chunks.indexOf(chunk) === -1) {
			this.dirty_chunks.push(chunk);
			chunk.status = Chunk.DIRTY;
		}
	}

	getBlockRefrence(x, y, z) {
		const br = new BlockRefrence();
		const chunk_x = Math.floor(x / ChunkSettings.SIZE);
		const chunk_y = Math.floor(y / ChunkSettings.SIZE);
		const chunk_z = Math.floor(z / ChunkSettings.SIZE);
		const chunk = this.getChunk(chunk_x, chunk_y, chunk_z);
		if (!chunk) return null;
		br.chunk = chunk;
		br.world = this;
		
		const local_x = x - chunk_x * ChunkSettings.SIZE;
		const local_y = y - chunk_y * ChunkSettings.SIZE;
		const local_z = z - chunk_z * ChunkSettings.SIZE;
		br.x = local_x;
		br.y = local_y;
		br.z = local_z;

		br.block_state = chunk.getBlockType(local_x, local_y, local_z);
		return br;
	}

	addPlayer(player) {
		this.players.push(player);
		player.world = this;
		this.scene.add(player.camera);
	}

	removePlayer(player) {
		const index = this.players.indexOf(player);
		if (index !== -1) {
			this.players.splice(index, 1);
			player.world = null;
			this.scene.remove(player.camera);
		}
	}

	async render(delta) {
		for (let i = 0; i < this.dirty_chunks.length; i++) {
			const chunk = this.dirty_chunks[i];
			if (chunk.status === Chunk.EMPTY) continue;
			if (chunk.status === Chunk.RENDERED) {
				this.dirty_chunks.splice(i, 1);
				i--;
				continue;
			}

			this.chunkMesher.computeChunk(chunk);
			chunk.status = Chunk.RENDERED;
		}

		for (const player of this.players) {
			player.renderWorld(delta);
			const renderer = player.renderer;
			if (!renderer) continue;

			renderer.beginPass();
			renderer.setChunkData(this.chunkMap.values());
			for (const [identifier, chunk] of this.chunkMap) {
				renderer.renderChunk(chunk);
			}
			renderer.endPass();
		}
	}

	async animate() {
		requestAnimationFrame(this.animateFunction);

		const delta = this.clock.getDelta();
		this.render(delta);
	}

	createChunk(x, y, z) {
		const chunk = new Chunk(x, y, z);
		chunk.world = this;
		return chunk;
	}

	addChunk(x, y, z) {
		const identifier = `${x},${y},${z}`;
		if (this.chunkMap.has(identifier)) return;

		const chunk = this.createChunk(x, y, z);
		this.dirty_chunks.push(chunk);
		this.chunkMap.set(identifier, chunk);

		chunk.id = this.chunkMap.size - 1;
		// Set quad_offset based on chunk ID to avoid overlapping in the quad buffer
		chunk.draw_details.quad_offset = chunk.id * ChunkSettings.BYTES_PER_CHUNK_QUADS;
		chunk.status = Chunk.DIRTY;

		return chunk;
	}

	getChunk(x, y, z) {
		return this.chunkMap.get(`${x},${y},${z}`);
	}

	reomoveChunk(x, y, z) {
		const identifier = `${x},${y},${z}`;
		if (!this.chunkMap.has(identifier)) return;
		this.chunkMap.delete(identifier);
	}

	raycast(start, direction) {
		const dir = direction.clone().normalize();
		const chunk = this.getChunk(0, 0, 0);
		if (!chunk) return;

		this.rayCaster.start = start;
		this.rayCaster.dir = dir;
		this.rayCaster.max_distance = 100;
		this.rayCaster.chunk = chunk;

		for (const voxel of this.rayCaster.voxel_line()) {
			const block = chunk.getBlockType(voxel.x, voxel.y, voxel.z);
			console.log(voxel);
			if (block) {
				console.log(block);
			}			
		}
	}

	doStuff() {
		const chunk1 = this.addChunk(0, 0, 0);
		const chunk2 = this.addChunk(1, 0, 0);
		const chunk3 = this.addChunk(0, 0, 1);
		const chunk4 = this.addChunk(1, 0, 1);

		if (!chunk1) return;

		const stairs = new this.Blocks.WarpedStairs()
			.setProperty(BlockState.PLACING, Faces.BOTTOM)
			.setProperty(BlockState.FACING, Faces.FACING_SOUTH);
		const planks = new this.Blocks.WarpedPlanks();
		const torch = new this.Blocks.RedstoneTorch()
			.setProperty(BlockState.FACING, Faces.FACING_SOUTH)
			.setProperty(BlockState.PLACING, Faces.WEST)
			.setProperty(BlockState.ACTIVE, 1);
		const button = new this.Blocks.WarpedButton()
			.setProperty(BlockState.FACING, Faces.FACING_EAST)
			.setProperty(BlockState.PLACING, Faces.DOWN);
		const sapling = new this.Blocks.DarkOakSapling();

		// const r = [planks, stairs, torch, button, sapling];
		const r = [sapling]
		for (let x = 0; x < Chunk.size; x++) {
			for (let z = 0; z < Chunk.size; z++) {


				// if ((x + z) % 2 == 0) continue;
				// chunk1.setBlockType(x, 0, z, planks);
			}
		}
		const buttons = new Array(6);
		for (let i = 0; i < 6; i++) {
			buttons[i] = new this.Blocks.WarpedButton()
				.setProperty(BlockState.PLACING, i)
			// .setProperty(BlockState.PLACING, i === Faces.FACING_UP ? Faces.DOWN : Faces.UP);
		}

		chunk1.setBlockType(0, 0, 0, stairs);
		// chunk2.setBlockType(2, 3, 2, buttons[Faces.DOWN]);
		// chunk2.setBlockType(2, 1, 2, buttons[Faces.UP]);
		// chunk2.setBlockType(2, 2, 3, buttons[Faces.SOUTH]);
		// chunk2.setBlockType(2, 2, 1, buttons[Faces.NORTH]);
		// chunk2.setBlockType(3, 2, 2, buttons[Faces.WEST]);
		// chunk2.setBlockType(1, 2, 2, buttons[Faces.EAST]);

		chunk2.setBlockType(0, 0, 0, torch);

		// console.log(chunk2.getData(2, 2, 2));
		chunk3.setBlockType(0, 0, 0, sapling);

		chunk4.setBlockType(0, 0, 0, stairs);

		// console.log(buttons[Faces.UP].getProperty(BlockState.PLACING))

		const ref = this.getBlockRefrence(0, 0, 0);
		console.log(ref);
		setInterval(() => {
			if (!ref) return;
			const current = ref.getProperty(BlockState.FACING);
			const next = (current + 1) % 4;
			console.log("Changing PLACING from", current, "to", next);
			ref.setProperty(BlockState.FACING, next);
		}, 3000);

	}
}