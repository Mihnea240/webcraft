import { AtlasRegistry } from "src/engine/resource_manager/registry/atlasRegistry";
import { ResourcePack } from "src/engine/resource_manager/RP";
import { PlayerRegistry } from "./playerRegistry";
import { SceneManager } from "./sceneManager";

import { Player } from "@engine/player";
import * as THREE from "three/webgpu";

import * as Constants from "@engine/resource_manager/constants";
import { ChunkManager } from "../chunk/chunkManager";
import { BlockTypeRegistry } from "../resource_manager/registry/blockTypeRegistry";

export class World {
	playerRegistry = new PlayerRegistry();
	sceneManager = new SceneManager();
	chunkManager: ChunkManager;

	public resourcePack!: ResourcePack;
	private lastTime = 0;

	constructor() {
		this.chunkManager = new ChunkManager(this);
	}

	setResourcePack(resourcePack: ResourcePack) {
		this.resourcePack = resourcePack;
		this.chunkManager.initMaterial();
		this.init();
	}

	async init() {
		const { scene, renderer } = this.sceneManager;
		await renderer.init();
		renderer.shadowMap.enabled = true;

		// Pre-compile terrain shader in background while assets load
		if (this.chunkManager.chunkMaterial && this.resourcePack?.pipeline) {
			this.resourcePack.pipeline.precompile(renderer, this.chunkManager.chunkMaterial).catch(console.error);
		}

		// 1. Retrieve the compiled textures from AtlasRegistry
		const atlasRegistry = this.resourcePack.get(AtlasRegistry);
		
		const [atlasWidth, atlasHeight] = Constants.ATLAS_DIMENSIONS;
		const layerSize = atlasWidth * atlasHeight * 4;

		// Color Atlas: First layer
		const colorData = new Uint8Array(atlasRegistry.atlasBuffer, 0, layerSize);
		const colorTexture = new THREE.DataTexture(colorData, atlasWidth, atlasHeight, THREE.RGBAFormat);
		colorTexture.minFilter = THREE.NearestFilter;
		colorTexture.magFilter = THREE.NearestFilter;
		colorTexture.generateMipmaps = false; // Disable mipmapping for sharp pixel art
		colorTexture.needsUpdate = true;

		// MERS Atlas: Second layer
		const mersData = new Uint8Array(atlasRegistry.atlasBuffer, layerSize, layerSize);
		const mersTexture = new THREE.DataTexture(mersData, atlasWidth, atlasHeight, THREE.RGBAFormat);
		mersTexture.minFilter = THREE.NearestFilter;
		mersTexture.magFilter = THREE.NearestFilter;
		mersTexture.generateMipmaps = false;
		mersTexture.needsUpdate = true;

		// 2. Create test quads
		const planeGeometry = new THREE.PlaneGeometry(10, 10);
		
		// Color Atlas Quad (left side)
		const colorMaterial = new THREE.MeshBasicNodeMaterial({
			map: colorTexture
		});
		const colorQuad = new THREE.Mesh(planeGeometry, colorMaterial);
		colorQuad.position.set(-6, 5, -15);
		scene.add(colorQuad);

		// MERS Atlas Quad (right side)
		const mersMaterial = new THREE.MeshBasicNodeMaterial({
			map: mersTexture
		});
		const mersQuad = new THREE.Mesh(planeGeometry, mersMaterial);
		mersQuad.position.set(6, 5, -15);
		scene.add(mersQuad);

		const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
		const cubeMaterial = new THREE.MeshPhongNodeMaterial({
			color: 0x00ff00,
		});
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.position.set(0, 0, -5); // Move the cube in front of the camera
		cube.castShadow = true;
		cube.receiveShadow = true;
		scene.add(cube);

		// Add a floor plane to receive the shadows
		const floorGeometry = new THREE.PlaneGeometry(20, 20);
		const floorMaterial = new THREE.MeshPhongNodeMaterial({
			color: 0x888888,
		});
		const floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.rotation.x = -Math.PI / 2;
		floor.position.set(0, -1, -5); // Position just below the cube
		floor.receiveShadow = true;
		scene.add(floor);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
		scene.add(ambientLight);

		// Use white light and place it closer to the cube (in front-right-top) so it's bright enough and visible
		const pointLight = new THREE.PointLight(0xffffff, 50, 20);
		pointLight.position.set(2, 3, -3); 
		pointLight.castShadow = true;
		scene.add(pointLight);

		renderer.setAnimationLoop(this.renderLoop.bind(this));
	}

	renderLoop(time: number) {
		const delta = time ? (time - this.lastTime) / 1000 : 0;
		this.lastTime = time || 0;

		this.sceneManager.render(this.playerRegistry, delta);
	}

	addPlayer(player: Player) {
		player.setWorld(this);
		this.playerRegistry.addPlayer(player);
	}

	removePlayer(player: Player) {
		player.cleanup();
		this.playerRegistry.removePlayer(player);
	}
}


function testWorld(world: World) {
	const typeRegistry = world.resourcePack.get(BlockTypeRegistry);

	const stoneType = typeRegistry.get
}