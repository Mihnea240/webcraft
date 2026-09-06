export const enum Face {
	/** +X face */
	RIGHT = 0, 
	/** +Y face */
	TOP = 1, 
	/** +Z face */
	FRONT = 2, 
	/** -Z face */
	BACK = 3, 
	/** -Y face */
	BOTTOM = 4, 
	/** -X face */
	LEFT = 5, 

	/** +X face */
	EAST = 0,
	/** +Y face */
	UP = 1,
	/** +Z face */
	SOUTH = 2,
	/** -Z face */
	NORTH = 3,
	/** -Y face */
	DOWN = 4,
	/** -X faces */
	WEST = 5,
}

export const enum Facing {
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

	static readonly Values: readonly Face[] = [
		Face.RIGHT, Face.TOP, Face.FRONT, Face.BACK, Face.BOTTOM, Face.LEFT
	] as const;

	static readonly Cardinal: readonly string[] = [
		"east", "up", "south", "north", "down", "west"
	] as const;

	static readonly Directional: readonly string[] = [
		"right", "top", "front", "back", "bottom", "left"
	] as const;

	static readonly Vector: Record<Face, [number, number, number]> = {
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
		return Faces.Vector[face_enum];
	}

	/**
	 * Returns the opposite face.
	 */
	static opposite(face_enum: Face): Face {
		return ((Face.LEFT - face_enum) as Face); // 0 -> 5, 1 -> 4, 2 -> 3, etc.
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
		const id_1 = Faces.Directional.indexOf(face_string);
		if (id_1 !== -1) return id_1 as Face;
		const id_2 = Faces.Cardinal.indexOf(face_string);
		if (id_2 !== -1) return id_2 as Face;
		return -1;
	}

	static readonly Horizontal: readonly Face[] = [Face.EAST, Face.SOUTH, Face.WEST, Face.NORTH] as const;
	/**
	 * Rotates a face around the Y-axis based on the looking direction.
	 */
	static rotated(face: Face, lookDirection: Facing): Face {
		if (face === Face.TOP || face === Face.BOTTOM) return face;
		
		const index = Faces.Horizontal.indexOf(face);
		const rotatedIndex = (index + lookDirection) % Faces.Horizontal.length;
		
		return Faces.Horizontal[rotatedIndex];
	}
}