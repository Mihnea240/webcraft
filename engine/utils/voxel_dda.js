import { Array3D } from "./memory_management";

export default class VoxelDDA {
	constructor() {
		this.voxel_position = new THREE.Vector3();

	}

	setChunk(chunk) {
		this.chunk = chunk;

	}

	cast(start, end, distance, filter = () => true) {

	}

	*voxels(start, end, distance) {
		
	}
}