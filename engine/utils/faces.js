export default class Faces {
	static RIGHT = 0; // +X face
	static TOP = 1; // +Y face	
	static FRONT = 2; // +Z face
	static BACK = 3; // -Z face
	static BOTTOM = 4; // -Y face
	static LEFT = 5; // -X face
	static EAST = Faces.RIGHT;
	static WEST = Faces.LEFT;
	static SOUTH = Faces.FRONT;
	static NORTH = Faces.BACK;
	static UP = Faces.TOP;
	static DOWN = Faces.BOTTOM;

	static FACING_EAST = 0;
	static FACING_NORTH = 1;
	static FACING_WEST = 2;
	static FACING_SOUTH = 3;

	static  face_string_array_cardinal = [
		"east", "up", "south", "north", "down", "west"
	];
	static face_string_array = [
		"right", "top", "front", "back", "bottom", "left"
	];

	static to_vector = {
		[Faces.RIGHT]: [1, 0, 0],
		[Faces.LEFT]: [-1, 0, 0],
		[Faces.TOP]: [0, 1, 0],
		[Faces.BOTTOM]: [0, -1, 0],
		[Faces.FRONT]: [0, 0, 1],
		[Faces.BACK]: [0, 0, -1],
	}
	/**
	 * @param {number} face_enum
	 * @returns {Array<number, number, number>} 
	 */
	static toVec3(face_enum) {
		return Faces.to_vector[face_enum];
	}

	static opposite(face_enum) {
		return 5 - face_enum; // 0 -> 5, 1 -> 4, 2 -> 3, etc.
	}

	static toString(face_enum) {
		switch (face_enum) {
			case Faces.RIGHT: return "east";
			case Faces.LEFT: return "west";
			case Faces.TOP: return "up";
			case Faces.BOTTOM: return "down";
			case Faces.FRONT: return "south";
			case Faces.BACK: return "north";
			default: throw new Error("Invalid face enum value");
		}
	}

	static fromString(face_string) {
		const id_1 = Faces.face_string_array.indexOf(face_string);
		if (id_1 !== -1) return id_1;
		return Faces.face_string_array_cardinal.indexOf(face_string);
	}

	static rotated(face_enum, look_direction) {
		
	}
}