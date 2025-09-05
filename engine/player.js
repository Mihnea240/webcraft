import * as THREE from "three/webgpu"
import World from "./world.js";
import { CreativeFly } from "./fly_controls.js";
import Chunk from "./voxel/chunk.js";
import { ChunkRenderer } from "./gpu_manager.js";

// export default class Player {
// 	constructor(name) {
// 		this.name = name;

// 		this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
// 		/**@type {World | null} */
// 		this.world = null;
// 	}

// 	createRenderer(canvas) {
// 		// this.renderer = new THREE.WebGLRenderer({
// 		// 	canvas: canvas,
// 		// 	antialias: true,
// 		// });
// 		// this.renderer.setSize(canvas.width, canvas.height);
// 		// this.renderer.setPixelRatio(window.devicePixelRatio);
// 		// this.renderer.setClearColor(0); // Sky blue color
// 		this.renderer = new THREE.WebGPURenderer({
// 			canvas: canvas,
// 			antialias: true,
// 		})
// 		this.renderer.setSize(canvas.width, canvas.height);
// 		this.renderer.setPixelRatio(window.devicePixelRatio);
// 		this.renderer.setClearColor(0); // Sky blue color
// 	}

// 	setControls(canvas) {
// 		this.controls = new CreativeFly(this.camera, canvas);
// 	}

// 	setWorld(world) {
// 		if (world === this.world) return;
// 		if (this.world) this.world.removePlayer(this);

// 		this.world.addPlayer(this);
// 		this.camera.position.set(0, 0, 0); // Set initial position
// 		this.camera.lookAt(new THREE.Vector3(0, 1, -1));
// 	}

// 	async renderWorld(delta) {
// 		this.controls.update();
// 		await this.renderer.renderAsync(this.world.scene, this.camera);
// 	}
// }

export default class Player {
	constructor(name) {
		this.name = name;

		this.camera = new THREE.PerspectiveCamera(75, 1, 0.001, 1000);
		this.camera.lookAt(new THREE.Vector3(5, 0, 1));
		this.camera.matrixAutoUpdate = true;
		this.world = null;
	}

	createRenderer(canvas) {
		this.renderer = new ChunkRenderer(canvas, this.camera, this.world.chunkPipeline);
	}

	setControls(canvas) {
		this.controls = new CreativeFly(this.camera, canvas);
		this.camera.lookAt(new THREE.Vector3(1, 1, 1));
		this.camera.updateProjectionMatrix();
	}
	/**@param {World} world*/
	setWorld(world) {
		if (world === this.world) return;
		if (this.world) this.world.removePlayer(this);

		this.world = world;
		this.world.addPlayer(this);
		this.camera.position.set(0, 0, 0); // Set initial position
		this.camera.lookAt(new THREE.Vector3(0, 1, -1));
	}

	async renderWorld(delta) {
		this.controls.update();
	}
}