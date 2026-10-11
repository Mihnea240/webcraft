import { ResourcePack } from "src/engine/resource_manager/RP";
import { PlayerRegistry } from "./playerRegistry";
import { SceneManager } from "./sceneManager";

import { Player } from "@engine/player";
import Stats from "three/addons/libs/stats.module.js";
import * as THREE from "three/webgpu";

import { BlockRefrence } from "@engine/block/blockRefrence";
import { Chunk } from "../chunk";
import { ChunkManager } from "../chunk/chunkManager";
import { BlockDescriptor, BlockPermutationRegistry, BlockTypeRegistry } from "../resource_manager/registry/blockTypeRegistry";

export class World {
	playerRegistry = new PlayerRegistry();
	sceneManager = new SceneManager();
	chunkManager: ChunkManager;
	readonly blockCursor: BlockRefrence;

	public resourcePack!: ResourcePack;
	private lastTime = 0;
	private stats?: Stats;

	constructor() {
		this.chunkManager = new ChunkManager(this);
		this.blockCursor = new BlockRefrence(this);
	}

	setResourcePack(resourcePack: ResourcePack) {
		this.resourcePack = resourcePack;
		this.chunkManager.initMaterial();

		this.init();
	}

	async init() {
		const { scene, renderer } = this.sceneManager;
		await renderer.init();

		// scene.background = new THREE.Color(0x87ceeb); // Sky blue background
		renderer.shadowMap.enabled = false;

		// Display color texture atlas layer on plane (layer 0)
		if (this.resourcePack?.pipeline) {
			const planeGeometry = new THREE.PlaneGeometry(10, 10);

			const colorQuad = new THREE.Mesh(
				planeGeometry,
				this.resourcePack.pipeline.createAtlasPlaneMaterial(0)
			);
			colorQuad.position.set(0, 5, -15);
			scene.add(colorQuad);
		}

		// const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
		// scene.add(ambientLight);

		// Pre-compile terrain shader in background matching full scene state
		if (this.chunkManager.chunkMaterial && this.resourcePack?.pipeline) {
			this.resourcePack.pipeline.precompile(renderer, this.chunkManager.chunkMaterial, scene).catch(console.error);
		}

		// Helpers: Coordinate axes (X=Red, Y=Green, Z=Blue) & ground grid
		const axesHelper = new THREE.AxesHelper(16);
		axesHelper.position.set(0, 0.02, 0);
		scene.add(axesHelper);

		const gridHelper = new THREE.GridHelper(64, 64, 0xff4444, 0x444444);
		gridHelper.position.set(16, 0.01, 16);
		scene.add(gridHelper);

		// FPS / Performance Tracker
		if (typeof document !== "undefined" && !this.stats) {
			this.stats = new Stats();
			this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
			this.stats.dom.style.position = "absolute";
			this.stats.dom.style.top = "10px";
			this.stats.dom.style.left = "10px";
			this.stats.dom.style.zIndex = "99999";
			document.body.appendChild(this.stats.dom);
		}

		renderer.setAnimationLoop(this.renderLoop.bind(this));
	}

	renderLoop(time: number) {
		this.stats?.begin();

		const delta = time ? (time - this.lastTime) / 1000 : 0;
		this.lastTime = time || 0;

		this.chunkManager.meshChunks();

		this.sceneManager.render(this.playerRegistry, delta);

		this.stats?.end();
	}

	getBlock(x: number, y: number, z: number): BlockRefrence {
		return this.blockCursor.setPosition(x, y, z);
	}

	addPlayer(player: Player) {
		player.setWorld(this);
		this.playerRegistry.addPlayer(player);
	}

	removePlayer(player: Player) {
		player.cleanup();
		this.playerRegistry.removePlayer(player);
	}

	getBlockDescriptor(name: string, states?: Record<string, any>): BlockDescriptor {
		const typeRegistry = this.resourcePack.get(BlockTypeRegistry);
		const permutationRegistry = this.resourcePack.get(BlockPermutationRegistry);

		let typeId = typeRegistry.keyToId(name);
		if (typeId === undefined && !name.includes(":")) {
			typeId = typeRegistry.keyToId(`minecraft:${name}`);
		}
		if (typeId === undefined) {
			throw new Error(`BlockType not found for "${name}"`);
		}

		const blockType = typeRegistry.get(typeId)!;
		const stateBits = states ? blockType.states.encode(states) : 0;
		const descriptor: BlockDescriptor = (stateBits | typeId) >>> 0;

		const existing = permutationRegistry.getByDescriptor(descriptor);
		if (existing) {
			return descriptor;
		}

		let basePermutation = permutationRegistry.getByDescriptor(typeId)!;
		const newPermutation = blockType.onStateChanges(stateBits, basePermutation) ?? basePermutation;

		if (newPermutation !== basePermutation) {
			typeRegistry.bakePermutation(newPermutation, blockType, this.resourcePack);
		}
		permutationRegistry.push(descriptor, newPermutation);

		return descriptor;
	}

	// Placeholder for future world loading logic
	loadWorld() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const chunk = new Chunk(this, [i, 0, j]);
				this.chunkManager.addChunk(chunk);
			}
		}

		testWorld(this);
	}
}


function testWorld(world: World) {
	const blocks = [
		world.getBlockDescriptor("minecraft:magma_block"),
		world.getBlockDescriptor("minecraft:dirt"),
		world.getBlockDescriptor("minecraft:stone"),
		world.getBlockDescriptor("minecraft:warped_nylium"),
		world.getBlockDescriptor("minecraft:diamond_block"),
		world.getBlockDescriptor("minecraft:warped_stairs")
	]

	// Place a dirt ground plane across chunks using the reusable cursor
	const cursor = world.blockCursor;
	for (let x = 0; x < 32; x++) {
		for (let z = 0; z < 32; z++) {
			for (let y = 0; y < 32; y++) {
				const pick = Math.floor(Math.random() * blocks.length);
				cursor.setPosition(x, y, z).setBlock(blocks[pick]);
			}
		}
	}
}