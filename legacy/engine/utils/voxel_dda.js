import * as THREE from "three"
import { Array3D } from "./memory_management";
import BlockRefrence from "@chunk/block_refrence";
import Faces from "@engine/utils/faces";

export class Raycaster {
	constructor(world) {
		this.start = new THREE.Vector3();
		this.dir = new THREE.Vector3();
		this.world = world;
		this.voxel_position = new THREE.Vector3();
		this.max_distance = 1000;

		this.current_voxel = new THREE.Vector3();

		this.voxel_data = {
			position: [ 0, 0, 0 ],
			hit_data: {
				distance: 0,
				face: null,
				position: [0, 0, 0]
			}
		}
	}

	*base_line() {
		const voxel_position = this.voxel_position;
		const dir = this.dir;
		const start = this.start;
		const voxel_data = this.voxel_data;
		
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
		let face = null; // Track which face was hit
		console.log(dir, start)
		while (distance < this.max_distance) {
			
			voxel_data.position[0] = voxel_position.x;
			voxel_data.position[1] = voxel_position.y;
			voxel_data.position[2] = voxel_position.z;
			voxel_data.hit_data.distance = distance;
			voxel_data.hit_data.face = face;
			voxel_data.hit_data.position[0] = start.x + dir.x * distance;
			voxel_data.hit_data.position[1] = start.y + dir.y * distance;
			voxel_data.hit_data.position[2] = start.z + dir.z * distance;

			yield voxel_data

			// Step to next voxel
			if (tMaxX < tMaxY) {
				if (tMaxX < tMaxZ) {
					// Step in X
					distance = tMaxX;
					voxel_position.x += stepX;
					tMaxX += tDeltaX;
					face = stepX > 0 ? Faces.WEST : Faces.EAST; // Hit face depends on direction
				} else {
					// Step in Z
					distance = tMaxZ;
					voxel_position.z += stepZ;
					tMaxZ += tDeltaZ;
					face = stepZ > 0 ? Faces.NORTH : Faces.SOUTH;
				}
			} else {
				if (tMaxY < tMaxZ) {
					// Step in Y
					distance = tMaxY;
					voxel_position.y += stepY;
					tMaxY += tDeltaY;
					face = stepY > 0 ? Faces.BOTTOM : Faces.TOP;
				} else {
					// Step in Z
					distance = tMaxZ;
					voxel_position.z += stepZ;
					tMaxZ += tDeltaZ;
					face = stepZ > 0 ? Faces.NORTH : Faces.SOUTH;
				}
			}
		}
	}

	*voxel_line() {
		const br = new BlockRefrence(this.world);

		for (const { position, hit_data  } of this.base_line()) {
			br.setWorldPosition(...position);
			if (br.isOutOfWorld()) continue;
			
			yield { br };
		}
	}
}