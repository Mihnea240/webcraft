import * as THREE from 'three';

export class CreativeFly {
	/**@param {THREE.PerspectiveCamera} camera  */
	constructor(camera, domElement) {
		this.camera = camera;
		this.domElement = domElement;
		this.speed = 10.0; // Units per second
		this.sensitivity = 0.002;
		this.sprint_factor = 5.0
		this.pixelRatio = window.devicePixelRatio || 1;

		this.camera_direction = new THREE.Vector3();
		this.camera_right = new THREE.Vector3();
		this.camera_forward = new THREE.Vector3();
		this.up = new THREE.Vector3(0, 1, 0);
		this.forward = new THREE.Vector3(0, 0, -1);
		this.camera_euler = new THREE.Euler();
		
		// Direction vector that accumulates movement input
		this.movementDirection = new THREE.Vector3();
	}

	update(deltaTime) {		
		// Apply accumulated movement direction to camera position
		if (this.movementDirection.lengthSq() > 0) {
			const movement = new THREE.Vector3();
			
			// Apply forward/backward movement
			movement.addScaledVector(this.camera_forward, this.movementDirection.z);
			
			// Apply left/right movement  
			movement.addScaledVector(this.camera_right, this.movementDirection.x);
			
			// Apply up/down movement
			movement.y += this.movementDirection.y;
			
			// Scale by speed and deltaTime, then apply to camera
			movement.setLength(this.speed * deltaTime);
			this.camera.position.add(movement);
			
			// Reset movement direction for next frame
			this.movementDirection.set(0, 0, 0);
		}
		
		this.camera.updateMatrix();
		this.camera.updateMatrixWorld();
		this.updateCameraVectors();

	}

	updateCameraVectors() {
		this.camera.getWorldDirection(this.camera_direction);
		this.camera_right.crossVectors(this.camera_direction, this.up).normalize();
		this.camera_forward.set(this.camera_direction.x, 0, this.camera_direction.z).normalize();
	}

	handleMouseMove(movementX, movementY) {
		this.camera_euler.setFromQuaternion(this.camera.quaternion, 'YXZ');

		this.camera_euler.y -= (movementX * this.sensitivity) / this.pixelRatio;
		this.camera_euler.x -= (movementY * this.sensitivity) / this.pixelRatio;

		// Clamp pitch to prevent camera flipping
		this.camera_euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera_euler.x));

		// Prevent roll by keeping Z rotation at 0
		this.camera_euler.z = 0;

		this.camera.quaternion.setFromEuler(this.camera_euler);
	}

	startSprint() {
		this.speed *= this.sprint_factor;
		console.log(this.speed)
	}
	endSprint() {
		this.speed /= this.sprint_factor;
		console.log(this.speed)
	}

	moveForward() {
		this.movementDirection.z += 1;
	}

	moveBackward() {
		this.movementDirection.z -= 1;
	}

	moveLeft() {
		this.movementDirection.x -= 1;
	}

	moveRight() {
		this.movementDirection.x += 1;
	}

	moveUp() {
		this.movementDirection.y += 1;
	}

	moveDown() {
		this.movementDirection.y -= 1;
	}
}