import * as THREE from "three"
import World from "@world/world";
import { CreativeFly } from "./fly_controls.js";
import Chunk from "@chunk/chunk";
import { ChunkRenderer } from "@world/gpu_manager.js";
import InputManager from "@engine/utils/input_manager.js";

export default class Player {
	/**
	 * @param {string} name
	 * @param {import('../../types/core').PlayerOptions} options
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
			.addEventListener('w:hold', this.controls.moveForward.bind(this.controls))
			.addEventListener('s:hold', this.controls.moveBackward.bind(this.controls))
			.addEventListener('a:hold', this.controls.moveLeft.bind(this.controls))
			.addEventListener('d:hold', this.controls.moveRight.bind(this.controls))
			.addEventListener('space:hold', this.controls.moveUp.bind(this.controls))
			.addEventListener('shift:hold', this.controls.moveDown.bind(this.controls))
			.addEventListener('w,w:press', this.controls.startSprint.bind(this.controls))
			.addEventListener('w,w:release', this.controls.endSprint.bind(this.controls))
			.addEventListener('mousemove:hold', (ev) => {
				this.controls.handleMouseMove(ev.movementX, ev.movementY);
			})
			.addEventListener('resize:hold', this.web_component.setCanvasSize.bind(this.web_component))
			.addEventListener('mouse0:press', () => {
				this.rayToWorld();
			});
	}

	rayToWorld() {
		const dir = new THREE.Vector3();
		this.world.raycast(this.camera.position, this.camera.getWorldDirection(dir));
	}
}