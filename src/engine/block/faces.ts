export enum Face {
	RIGHT = 0, // +X face
	TOP = 1, // +Y face	
	FRONT = 2, // +Z face
	BACK = 3, // -Z face
	BOTTOM = 4, // -Y face
	LEFT = 5, // -X face

	EAST = 0,
	WEST = 5,
	SOUTH = 2,
	NORTH = 3,
	UP = 1,
	DOWN = 4
}

export enum Facing {
	EAST = 0,
	NORTH = 1,
	WEST = 2,
	SOUTH = 3
}

export default class Faces {
	static readonly RIGHT = Face.RIGHT;
	static readonly TOP = Face.TOP;
	static readonly FRONT = Face.FRONT;
	static readonly BACK = Face.BACK;
	static readonly BOTTOM = Face.BOTTOM;
	static readonly LEFT = Face.LEFT;
	
	static readonly EAST = Face.EAST;
	static readonly WEST = Face.WEST;
	static readonly SOUTH = Face.SOUTH;
	static readonly NORTH = Face.NORTH;
	static readonly UP = Face.UP;
	static readonly DOWN = Face.DOWN;

	static readonly FACING_EAST = Facing.EAST;
	static readonly FACING_NORTH = Facing.NORTH;
	static readonly FACING_WEST = Facing.WEST;
	static readonly FACING_SOUTH = Facing.SOUTH;

	static readonly face_string_array_cardinal: readonly string[] = [
		"east", "up", "south", "north", "down", "west"
	];
	static readonly face_string_array: readonly string[] = [
		"right", "top", "front", "back", "bottom", "left"
	];

	static readonly to_vector: Record<Face, [number, number, number]> = {
		[Face.RIGHT]: [1, 0, 0],
		[Face.LEFT]: [-1, 0, 0],
		[Face.TOP]: [0, 1, 0],
		[Face.BOTTOM]: [0, -1, 0],
		[Face.FRONT]: [0, 0, 1],
		[Face.BACK]: [0, 0, -1],
	};

	/**
	 * Converts a face enum value to a 3D offset direction vector.
	 */
	static toVec3(face_enum: Face): [number, number, number] {
		return Faces.to_vector[face_enum];
	}

	/**
	 * Returns the opposite face.
	 */
	static opposite(face_enum: Face): Face {
		return (5 - face_enum) as Face; // 0 -> 5, 1 -> 4, 2 -> 3, etc.
	}

	/**
	 * Converts a face enum value to its string representation.
	 */
	static toString(face_enum: Face): string {
		switch (face_enum) {
			case Face.RIGHT: return "east";
			case Face.LEFT: return "west";
			case Face.TOP: return "up";
			case Face.BOTTOM: return "down";
			case Face.FRONT: return "south";
			case Face.BACK: return "north";
			default: throw new Error("Invalid face enum value");
		}
	}

	/**
	 * Parses a face string representation to its enum value.
	 */
	static fromString(face_string: string): Face | -1 {
		const id_1 = Faces.face_string_array.indexOf(face_string);
		if (id_1 !== -1) return id_1 as Face;
		const id_2 = Faces.face_string_array_cardinal.indexOf(face_string);
		if (id_2 !== -1) return id_2 as Face;
		return -1;
	}

	static horizontalOrder = [Face.EAST, Face.SOUTH, Face.WEST, Face.NORTH];
	/**
	 * Rotates a face around the Y-axis based on the looking direction.
	 */
	static rotated(face: Face, lookDirection: Facing): Face {
		if (face === Face.TOP || face === Face.BOTTOM) return face;
		
		const index = Faces.horizontalOrder.indexOf(face);
		const rotatedIndex = (index + lookDirection) % Faces.horizontalOrder.length;
		
		return Faces.horizontalOrder[rotatedIndex];
	}
}