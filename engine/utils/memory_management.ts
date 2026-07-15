export class Array3D {
	public readonly data: Uint16Array;
	public readonly x: number;
	public readonly y: number;
	public readonly z: number;

	constructor(x: number, y: number = x, z: number = x) {
		this.data = new Uint16Array(x * y * z);
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public index(x: number, y: number, z: number): number {
		return x + z * this.x + y * this.x * this.z;
	}

	public get(x: number, y: number, z: number): number {
		return this.data[this.index(x, y, z)];
	}

	public set(x: number, y: number, z: number, value: number): void {
		this.data[this.index(x, y, z)] = value;
	}

	public fill(value: number): Uint16Array {
		return this.data.fill(value);
	}
}

/**
 * Packs integers of a specific bit size into a byte array.
 */
export function packIntegers(
	input_array: number[] | Uint16Array, 
	input_element_size: number, 
	output_byte_array: Uint8Array
): void {
	let output_index = 0;
	let bit_position = 7;
	const mask = (1 << input_element_size) - 1;

	for (let i = 0; i < input_array.length; i++) {
		const value = input_array[i] & mask;
		let pointer = input_element_size - 1;
		for (let j = 0; j < input_element_size; j++) {
			output_byte_array[output_index] |= ((value >> pointer) & 1) << bit_position;
			pointer--;
			bit_position--;
			if (bit_position < 0) {
				bit_position = 7;
				output_index++;
			}
		}
	}
}
