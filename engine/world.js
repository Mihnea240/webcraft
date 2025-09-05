import * as THREE from "three";
import Faces from "./voxel/faces.js";
import ResourceLoader from "./resource-loader.js";
import BlockModel from "./block_model/blocks.js";
import Chunk from "./voxel/chunk.js";
import BlockState from "./voxel/block_state.js";
import ChunkMesher from "./voxel/chunk_mesher.js";
import Player from "./player.js";
import { ChunkPipeline } from "./gpu_manager.js";


export default class World {
	/**@param {ResourceLoader} resourceLoader */
	constructor(resourceLoader) {
		this.chunkMap = new Map();
		this.resourceLoader = resourceLoader;

		/**@type {Array<Player>} */
		this.players = [];
		this.dirty_chunks = [];

		this.scene = new THREE.Scene();
		this.chunkPipeline = resourceLoader.chunkPipeline;

		this.animateFunction = this.animate.bind(this);
		this.clock = new THREE.Clock();

		this.blockModel = this.resourceLoader.blockModel;
		this.chunkMesher = new ChunkMesher(this.blockModel);
 
		/**@type {Record<string, new () => BlockState>} */
		this.Blocks = this.blockModel.Blocks;

		this.doStuff();
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
			this.chunkPipeline.setQuadBuffer(
				chunk.draw_details.quad_offset,
				this.chunkMesher.quad_buffer,
				chunk.draw_details.quad_cnt
			);
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

	createChunk(x, z) {
		const chunk = new Chunk(x, 0, z);
		chunk.world = this;
		return chunk;
	}

	addChunk(x, z) {
		const identifier = `${x},${z}`;
		if (this.chunkMap.has(identifier)) return;

		const chunk = this.createChunk(x, z);
		this.dirty_chunks.push(chunk);
		this.chunkMap.set(identifier, chunk);

	chunk.id = this.chunkMap.size - 1;
		chunk.status = Chunk.DIRTY;

		return chunk;
	}

	reomoveChunk(x, z) {
		const identifier = `${x},${z}`;
		if (!this.chunkMap.has(identifier)) return;
	}

	doStuff() {
		const chunk1 = this.addChunk(0, 0);
		const chunk2 = this.addChunk(1, 0);

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
				
				
				if ((x + z) % 2==0) continue;
				chunk1.setBlockType(x, 0, z, r[Math.floor(Math.random() * r.length)]);
			}
		}
		// chunk.setBlockType(1, 0, 1, button);
		// chunk.setBlockType(1, 0, 1, torch);
		// chunk.setBlockType(1, 0, 0, planks);
		// chunk.setBlockType(0, 0, 1, planks);
		// chunk.setBlockType(2, 0, 1, planks);
		// chunk.setBlockType(1, 0, 2, planks);

		const buttons = new Array(6);
		for(let i = 0; i < 6; i++) {
			buttons[i] = new this.Blocks.WarpedButton()
				.setProperty(BlockState.PLACING, i)
				// .setProperty(BlockState.PLACING, i === Faces.FACING_UP ? Faces.DOWN : Faces.UP);
		}

		chunk1.setBlockType(2, 2, 2, planks);
		chunk1.setBlockType(2, 3, 2, buttons[Faces.DOWN]);
		chunk1.setBlockType(2, 1, 2, buttons[Faces.UP]);
		chunk1.setBlockType(2, 2, 3, buttons[Faces.SOUTH]);
		chunk1.setBlockType(2, 2, 1, buttons[Faces.NORTH]);
		chunk1.setBlockType(3, 2, 2, buttons[Faces.WEST]);
		chunk1.setBlockType(1, 2, 2, buttons[Faces.EAST]);

		chunk2.setBlockType(2, 3, 2, torch);
		chunk2.setBlockType(0, 0, 0, sapling);

		// console.log(buttons[Faces.UP].getProperty(BlockState.PLACING))

	}
}