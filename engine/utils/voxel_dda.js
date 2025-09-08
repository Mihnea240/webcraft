import * as THREE from "three"
import { Array3D } from "./memory_management";

export class RayHit{
	constructor() {
		this.position = new THREE.Vector3();
		this.normal = new THREE.Vector3();
		this.block = null;
		this.chunk = null;
	}
}

export class Raycaster {
	constructor() {
		this.start = new THREE.Vector3();
		this.dir = new THREE.Vector3();
		this.chunk = null;
		this.voxel_position = new THREE.Vector3();
		this.max_distance = 20;

		this.current_voxel = new THREE.Vector3();
	}

	setChunk(chunk) {
		this.chunk = chunk;
	}

	*voxel_line() {
		const voxel_position = this.voxel_position;
		const dir = this.dir;
		const start = this.start;
		const chunk = this.chunk;
		if (!chunk) return null;
		const data = chunk.voxels.data;
		
		voxel_position.copy(this.start).floor();
		const stepX = dir.x > 0 ? 1 : -1;
		const stepY = dir.y > 0 ? 1 : -1;
		const stepZ = dir.z > 0 ? 1 : -1;

		const tDeltaX = Math.abs(1 / dir.x);
		const tDeltaY = Math.abs(1 / dir.y);
		const tDeltaZ = Math.abs(1 / dir.z);

		// Calculate initial tMax values
		let tMaxX = (voxel_position.x + (dir.x > 0 ? 1 : 0) - start.x) / dir.x;
		let tMaxY = (voxel_position.y + (dir.y > 0 ? 1 : 0) - start.y) / dir.y;
		let tMaxZ = (voxel_position.z + (dir.z > 0 ? 1 : 0) - start.z) / dir.z;

		let distance = 0;
		
		while (distance < this.max_distance) {
			// Check bounds
			if (voxel_position.x < 0 || voxel_position.x >= chunk.size ||
				voxel_position.y < 0 || voxel_position.y >= chunk.size ||
				voxel_position.z < 0 || voxel_position.z >= chunk.size) {
				break;
			}

			// Yield current voxel
			yield {
				x: voxel_position.x,
				y: voxel_position.y,
				z: voxel_position.z,
				distance: distance
			};

			// Step to next voxel
			if (tMaxX < tMaxY) {
				if (tMaxX < tMaxZ) {
					// Step in X
					distance = tMaxX;
					voxel_position.x += stepX;
					tMaxX += tDeltaX;
				} else {
					// Step in Z
					distance = tMaxZ;
					voxel_position.z += stepZ;
					tMaxZ += tDeltaZ;
				}
			} else {
				if (tMaxY < tMaxZ) {
					// Step in Y
					distance = tMaxY;
					voxel_position.y += stepY;
					tMaxY += tDeltaY;
				} else {
					// Step in Z
					distance = tMaxZ;
					voxel_position.z += stepZ;
					tMaxZ += tDeltaZ;
				}
			}
		}
	}
}