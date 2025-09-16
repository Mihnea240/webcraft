export class BitPacker {
	constructor(fields, bytes_per_bucket = 1) {
		this.bytes_per_bucket = bytes_per_bucket;
		this.bucket_cnt = this.computeBucketsCnt(fields);

		this.fields = fields;
		this.padding = 0;

		this.class = class {
			constructor() { 

			}
		};

		this.computeClass();
	}

	computeClass() {
		const max_bits = this.bytes_per_bucket * 8;
		let bucket_offset = 0, bit_offset = max_bits;
		let set_all = ``, get_all = `let result={};`,field_cnt = 2;

		for(const [field, bits] of Object.entries(this.fields)) {
			if (bits > max_bits) {
				throw new Error("Field cannot be larger than bucket size");
			}

			if(bit_offset < bits) {
				bucket_offset++;
				bit_offset = max_bits;
			}

			bit_offset -= bits;
			const [clear_func, set_func, get_func] = this.createFunctionDefinitions(bucket_offset, bit_offset, bits);


			this.class.prototype[`set_${field}`] = new Function('buffer', 'offset', 'value', clear_func + set_func);
			this.class.prototype[`get_${field}`] = new Function('buffer','offset', get_func);

			set_all += set_func.replace('value', field);
			get_all += `result.${field} = this.get_${field}(buffer, offset);`;
		}

		this.class.prototype.set_all = new Function('buffer', 'offset', ...Object.keys(this.fields), set_all);
		this.class.prototype.get_all = new Function('buffer', 'offset', get_all + 'return result;');
	}

	createFunctionDefinitions(bucket_offset, bit_offset, size) { 
		const mask = (1 << size) - 1;
		const getter_mask = mask << bit_offset;

		const clear_func = `buffer[offset + ${bucket_offset}] &= ~${getter_mask};`;
		const set_func = `buffer[offset + ${bucket_offset}] |= (value & ${mask}) << ${bit_offset};`;
		const get_func = `return (buffer[offset + ${bucket_offset}] & ${getter_mask}) >> ${bit_offset};`;

		return [clear_func, set_func, get_func];
	}

	computeBucketsCnt(fields) {
		let val = 0, bpb = this.bytes_per_bucket * 8;
		for (const field in fields) {
			val += fields[field];
		}
		return (val + (bpb - val % bpb) % bpb) / bpb;
	}

	get BitView() {
		return this.class;
	}
}