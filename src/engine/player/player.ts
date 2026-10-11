import { World } from "@engine/world";
import { WebcraftPlayer } from "@web_components";
import { PlayerData as PlayerInfo } from "./playerData";

import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import * as THREE from "three/webgpu";

export class Player {
	private readonly _id: string;
	private world: World | null = null;
	public camera: THREE.PerspectiveCamera;
	public controls: PointerLockControls;
	public canvasTarget: THREE.CanvasTarget;

	// Keyboard state tracking
	public keys = { w: false, a: false, s: false, d: false, space: false, shift: false };
	private direction = new THREE.Vector3();

	constructor(
		public readonly webcraftPlayer: WebcraftPlayer,
		public readonly info: PlayerInfo
	) {
		this._id = crypto.randomUUID();
		this.canvasTarget = new THREE.CanvasTarget(webcraftPlayer.canvas);

		this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 3000); 
		this.camera.lookAt(new THREE.Vector3(0, 0, -1));

		this.controls = new PointerLockControls(this.camera, webcraftPlayer);
	}

	public id(): string {
		return this._id;
	}

	public getWorld(): World | null {
		return this.world;
	}

	public setWorld(world: World | null) {
		this.world = world;
		if (world) {
			this.camera.position.set(0, 0, 0);
			this.camera.lookAt(new THREE.Vector3(0, 0, -1));
		}
	}

	public cleanup() {
		this.setWorld(null);
		this.canvasTarget.dispose();
		this.controls.dispose();
	}

	public handleKeyDown(event: KeyboardEvent) {

		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				this.keys.w = true;
				break;
			case 'KeyA':
			case 'ArrowLeft':
				this.keys.a = true;
				break;
			case 'KeyS':
			case 'ArrowDown':
				this.keys.s = true;
				break;
			case 'KeyD':
			case 'ArrowRight':
				this.keys.d = true;
				break;
			case 'Space':
				this.keys.space = true;
				break;
			case 'ShiftLeft':
			case 'ShiftRight':
				this.keys.shift = true;
				break;
		}
	}

	public handleKeyUp(event: KeyboardEvent) {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				this.keys.w = false;
				break;
			case 'KeyA':
			case 'ArrowLeft':
				this.keys.a = false;
				break;
			case 'KeyS':
			case 'ArrowDown':
				this.keys.s = false;
				break;
			case 'KeyD':
			case 'ArrowRight':
				this.keys.d = false;
				break;
			case 'Space':
				this.keys.space = false;
				break;
			case 'ShiftLeft':
			case 'ShiftRight':
				this.keys.shift = false;
				break;
		}
	}

	public renderWorld(delta: number) {
		const speed = 10.0; // Units per second

		// Calculate direction
		this.direction.z = Number(this.keys.w) - Number(this.keys.s);
		this.direction.x = Number(this.keys.d) - Number(this.keys.a);
		this.direction.normalize();

		// Apply forward/backward and left/right movement relative to camera orientation
		if (this.keys.w || this.keys.s) {
			this.controls.moveForward(this.direction.z * speed * delta);
		}
		if (this.keys.a || this.keys.d) {
			this.controls.moveRight(this.direction.x * speed * delta);
		}

		// Apply vertical movement (fly controls style)
		if (this.keys.space) {
			this.camera.position.y += speed * delta;
		}
		if (this.keys.shift) {
			this.camera.position.y -= speed * delta;
		}
	}
}
