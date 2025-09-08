import * as THREE from "three"
import World from "./world.js";
import { CreativeFly } from "./fly_controls.js";
import Chunk from "./voxel/chunk.js";
import { ChunkRenderer } from "./gpu_manager.js";
import InputManager from "../utils/input_manager.js";

export default class Player {
	/**
	 * @param {string} name
	 * @param {import('../types/core.js').PlayerOptions} options
	 */
	constructor(name, options = {}) {
		this.name = name;
		this.options = { tickMode: 'continuous', ...options };

		this.camera = new THREE.PerspectiveCamera(75, 1, 0.001, 1000);
		this.camera.lookAt(new THREE.Vector3(5, 0, 1));
		this.camera.matrixAutoUpdate = true;
		this.world = null;
		this.inputManager = null;
	}

	/**
	 * @param {HTMLCanvasElement} canvas
	 */
	createRenderer(canvas) {
		this.renderer = new ChunkRenderer(canvas, this.camera, this.world.chunkPipeline);
		/** @type {any} */
		const rootNode = canvas.getRootNode();
		this.web_component = rootNode.host;
	}

	/**@param {HTMLCanvasElement} canvas*/
	setControls(canvas) {
		this.controls = new CreativeFly(this.camera, canvas);
		this.camera.lookAt(new THREE.Vector3(1, 1, 1));
		this.camera.updateProjectionMatrix();
		
		// Set up input handling
		this.setupInputHandling(canvas);
		
		return this.controls;
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
		// Update input manager first
		if (this.inputManager) {
			this.inputManager.tick(delta);
		}
		
		if (this.controls) {
			this.controls.update(delta);
		}
	}

	/**
	 * @param {HTMLCanvasElement} canvas
	 */
	setupInputHandling(canvas) {
		// Make sure the canvas can receive focus for keyboard events
		canvas.setAttribute('tabindex', '0');
		canvas.focus();
		
		/** @type {any} */
		const rootNode = canvas.getRootNode();
		const webHandler = rootNode.host;
		this.inputManager = new InputManager(webHandler, { tickMode: this.options.tickMode });
		
		// Set up pointer lock request
		canvas.addEventListener("click", () => {
			canvas.requestPointerLock();
			canvas.focus();
		});

		// Set up mouse move handling with new addEventListener syntax
		this.inputManager.addEventListener('mousemove', this.controls.handleMouseMove.bind(this.controls));

		this.inputManager.addEventListener('resize', () => {
			webHandler.setCanvasSize();
		}, { throttle: 16 });

		// Set up movement shortcuts
		this.addMovementShortcuts();
	}

	addMovementShortcuts() {
		if (!this.inputManager || !this.controls) {
			console.warn('Cannot add shortcuts: missing inputManager or controls');
			return;
		}

		this.inputManager
			.addEventListener('w', this.controls.moveForward.bind(this.controls), { continuous: true })
			.addEventListener('s', this.controls.moveBackward.bind(this.controls), { continuous: true })
			.addEventListener('a', this.controls.moveLeft.bind(this.controls), { continuous: true })
			.addEventListener('d', this.controls.moveRight.bind(this.controls), { continuous: true })
			.addEventListener(' ', this.controls.moveUp.bind(this.controls), { continuous: true })
			.addEventListener('shift', this.controls.moveDown.bind(this.controls), { continuous: true });
	}

	rayToWorld() {
		// TODO: Implement raycast to world
		// this.world.raycast(this.camera.position, this.camera.getWorldDirection());
	}
}