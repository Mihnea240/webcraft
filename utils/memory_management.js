export class Array3D {
	constructor(x, y = x, z = x) {
		this.data = new Uint16Array(x * y * z);
		this.x = x;
		this.y = y;
		this.z = z;
	}

	index(x, y, z) {
		return x + z * this.x + y * this.x * this.z;
	}
	get(x, y, z) {
		return this.data[this.index(x, y, z)];
	}
	set(x, y, z, value) {
		this.data[this.index(x, y, z)] = value;
	}
	fill(value) {
		return this.data.fill(value);
	}
}

/**
 * @param {int[]} input_array 
 * @param {int} input_element_size 
 * @param {Uint8Array} output_byte_array 
 */
export function packIntegers(input_array, input_element_size, output_byte_array) {
	let output_index = 0, input_index = 0, bit_position = 7;
	let mask = (1 << input_element_size) - 1; // Mask to extract bits

	for (let i = 0; i < input_array.length; i++) {
		let value = input_array[i] & mask;
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



export class MemoryPool {
	constructor(size) {
		this.size = size;
		this.data = new ArrayBuffer(size);
		this.freeList = [];
	}
	// To do
}