class BitView {
	constructor(buffer = undefined, offset = 0) {
		this.buffer = buffer;
		this.offset = offset;
	}
}

export class BitPacker {
	static default_options = {
		bytes_per_bucket: 1,
		use_internal_state: false,
		bit_flow: 'MSB', // MSB or LSB
	}
	constructor(fields, options = {}) {
		console.log(options.bytes_per_bucket)
		this.options = { ...BitPacker.default_options, ...options };
		this.wasted_bits = 0;
		this.bucket_cnt = 0;
		this.fields = this.computeFieldOffsets(fields);

		this.class = this.computeClass();
		console.log(this.class.prototype)
	}

	get BitView() {
		return this.class;
	}

	get bits_per_bucket() {
		return this.options.bytes_per_bucket * 8;
	}

	computeClass() {
		const new_class = class extends BitView { };
		let set_all_body = ``, get_all_body = `let result={};`, clear_all_body = ``;
		
		for (const field in this.fields) {
			const { bucket, bit, size } = this.fields[field];
			const [clear_body, set_body, get_body] = this.createFunctionDefinitions(bucket, bit, size);
			
			if (this.options.use_internal_state) {
				const set = /** @type {(v: number) => void} */ (new Function('value', clear_body + set_body) );
				const get = /** @type {() => number} */ (new Function(get_body) );
				
				Object.defineProperty(new_class.prototype, field, { set, get, enumerable: true });
			} else {
				Object.defineProperty(new_class.prototype, `set_${field}`, {
					value: new Function('buffer', 'offset', 'value', clear_body + set_body),
				});
				Object.defineProperty(new_class.prototype, `get_${field}`, {
					value: new Function('buffer', 'offset', get_body),
				});
				Object.defineProperty(new_class.prototype, `clear_${field}`, {
					value: new Function('buffer', 'offset', clear_body),
				});
			}

			set_all_body += set_body.replace('value', field);
			get_all_body += `result.${field} = ${get_body.replace('return ', '')};`;
		}

		if (this.options.use_internal_state) {
			Object.defineProperty(new_class.prototype, 'set_all', {
				value: new Function(...Object.keys(this.fields), set_all_body),
			});
			Object.defineProperty(new_class.prototype, 'get_all', {
				value: new Function(get_all_body + 'return result;'),
			});
		} else {
			Object.defineProperty(new_class.prototype, 'set_all', {
				value: new Function('buffer', 'offset', ...Object.keys(this.fields), set_all_body),
			});
			Object.defineProperty(new_class.prototype, 'get_all', {
				value: new Function('buffer', 'offset', get_all_body + 'return result;'),
			});
		}

		return new_class;
	}

	computeFieldOffsets(fields) {
		const max_bits = this.bits_per_bucket, offsets = {};
		let bucket_offset = 0;

		if(this.options.bit_flow === 'LSB') {
			let bit_offset = 0;
			for (const field in fields) {
				const bit_length = fields[field];

				if (bit_length > max_bits) {
					throw new Error("Field cannot be larger than bucket size");
				}

				if (bit_offset + bit_length > max_bits) {
					bucket_offset++;
					this.wasted_bits += max_bits - bit_offset;
					bit_offset = 0;
				}

				bit_offset += bit_length;
				offsets[field] = { bucket: bucket_offset, bit: bit_offset - bit_length, size: bit_length };
			}

			this.bucket_cnt = bucket_offset + 1; // Update bucket count
			return offsets;
		}

		let bit_offset = max_bits;

		for (const field in fields) {
			const bit_length = fields[field];
			if (bit_length > max_bits) {
				throw new Error("Field cannot be larger than bucket size");
			}

			if (bit_offset < bit_length) {
				bucket_offset++;
				this.wasted_bits += bit_offset;
				bit_offset = max_bits;
			}

			bit_offset -= bit_length;
			offsets[field] = { bucket: bucket_offset, bit: bit_offset, size: bit_length };
		}

		this.bucket_cnt = bucket_offset + 1; // Update bucket count
		return offsets;
	}

	createFunctionDefinitions(bucket_offset, bit_offset, size) { 
		const mask = (1 << size) - 1;
		const getter_mask = mask << bit_offset;
		console.log(bit_offset)

		const lhs = this.options.use_internal_state ? 
			`this.buffer[this.offset + ${bucket_offset}]` :
			`buffer[offset + ${bucket_offset}]`;

		const clear_func = `${lhs} &= ~${getter_mask};`;
		const set_func = `${lhs} |= (value & ${mask}) << ${bit_offset};`;
		const get_func = `return (${lhs} & ${getter_mask}) >> ${bit_offset};`;

		return [clear_func, set_func, get_func];
	}
}