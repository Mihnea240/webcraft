import { ResourceRegistry } from "@engine/resource_manager/resourceRegistry";
import { PlayerRegistry } from "./playerRegistry";
import { SceneManager } from "./sceneManager";

import Player from "@engine/player/player";
import * as THREE from "three/webgpu";

export default class World {
	playerRegistry = new PlayerRegistry();
	sceneManager = new SceneManager();
	public resourceRegistry!: ResourceRegistry;
	private lastTime = 0;

	setResourceRegistry(resourceRegistry: ResourceRegistry) {
		this.resourceRegistry = resourceRegistry;
		this.init();
	}

	async init() {
		const { scene, renderer } = this.sceneManager;
		await renderer.init();
		renderer.shadowMap.enabled = true;

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
