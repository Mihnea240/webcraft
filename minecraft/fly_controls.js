import * as THREE from 'three';

export default class CreativeFly {
	/**
	 * @param {THREE.Camera} camera*/
	constructor(camera, domElement) {
		this.camera = camera;
		this.domElement = domElement;
		this.speed = 0.05; // Movement speed
		this.activeKeys = {};

		this.domElement.addEventListener('keydown', this.onKeyDown.bind(this));
		this.domElement.addEventListener('keyup', this.onKeyUp.bind(this));
		this.domElement.addEventListener('pointermove', this.onPointerMove.bind(this));
		this.domElement.addEventListener("click", () => {
			this.domElement.requestPointerLock();
		});

		window.addEventListener('blur', () => {
			for (let key in this.activeKeys) this.activeKeys[key] = false;
		});

		this.new_position = camera.position.clone();
		this.new_quaternion = camera.quaternion.clone();
	}

	onKeyDown(ev) {
		switch (ev.key) {
			case 'w': case 'W': this.activeKeys['w'] = true; break; // Move forward
			case 's': case 'S': this.activeKeys['s'] = true; break; // Move backward
			case 'd': case 'D':this.activeKeys['d'] = true; break; // Move left
			case 'a': case 'A':this.activeKeys['a'] = true; break; // Move right
			case ' ':this.activeKeys[' '] = true; break; // Move up
			case 'Shift': this.activeKeys['Shift'] = true; break; // Move down
			default: return; // Exit this handler for other keys
		}
	}
	onKeyUp(ev) {
		switch (ev.key) {
			case 'w': case 'W': this.activeKeys['w'] = false; break; // Move forward
			case 's': case 'S': this.activeKeys['s'] = false; break; // Move backward
			case 'd': case 'D': this.activeKeys['d'] = false; break; // Move left
			case 'a': case 'A': this.activeKeys['a'] = false; break; // Move right
			case ' ': this.activeKeys[' '] = false; break; // Move up
			case 'Shift': this.activeKeys['Shift'] = false; break; // Move down
			default: return; // Exit this handler for other keys
		}
	}

	move() {
		let cameraDirection = new THREE.Vector3();
		this.camera.getWorldDirection(cameraDirection);

		// Get the right vector (cross product of up and forward)
		let cameraRight = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
		cameraDirection.normalize();
		cameraRight.normalize();
		
		for (const key in this.activeKeys) {
			if (!this.activeKeys[key]) continue; // Skip if the key is not pressed
			switch (key) {
				case 'w': this.new_position.addScaledVector(cameraDirection, this.speed); break; // Move forward
				case 's': this.new_position.addScaledVector(cameraDirection, -this.speed); break; // Move backward
				case 'd': this.new_position.addScaledVector(cameraRight, this.speed); break; // Move right
				case 'a': this.new_position.addScaledVector(cameraRight, -this.speed); break; // Move left
				case ' ': this.new_position.y += this.speed; break; // Move up
				case 'Shift': this.new_position.y -= this.speed; break; // Move down
			}
		}
	}

	onPointerMove(ev) {
		const sensitivity = 0.002;
		const pixelRatio = window.devicePixelRatio || 1;

		// Get current euler angles in world space
		const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');

		// Update yaw (Y-axis rotation) and pitch (X-axis rotation) in world space
		// Adjust sensitivity based on device pixel ratio for consistent feel across devices
		euler.y -= (ev.movementX * sensitivity) / pixelRatio;
		euler.x -= (ev.movementY * sensitivity) / pixelRatio;

		// Clamp pitch to prevent camera flipping
		euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

		// Prevent roll by keeping Z rotation at 0
		euler.z = 0;

		// Apply the normalized rotation back to the camera
		this.new_quaternion.setFromEuler(euler);
	}

	update(deltaTime) {
		// Update camera position
		this.move();
		this.camera.position.copy(this.new_position);

		// Update camera rotation
		this.camera.quaternion.copy(this.new_quaternion);
		
		// Force Three.js to update matrix calculations
		this.camera.updateMatrix();
		this.camera.updateMatrixWorld();
		this.camera.updateWorldMatrix(true, false); // Force update world matrix
	}
}