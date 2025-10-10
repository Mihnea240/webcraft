export class BitView {
	constructor(buffer, offset = 0) {
		this.view = new DataView(buffer);
		this.offset = offset;
		this.onPropertyAccess = null;
	}
}

function showBytes(value, size) {
	const bytes = [];
	for (let i = 0; i < size; i++) {
		bytes.push((value >> ((size - i - 1) * 8)) & 0xFF);
	}
	return bytes.map(b => b.toString(2).padStart(8, '0')).join(' ');
}

function getEndianness() {
	const buffer = new Uint16Array(1);
	const view = new DataView(buffer.buffer);

	buffer[0] = 0x00FF;
	return view.getUint8(0) === 0xFF ? false : true;
}

const ENDIAN = getEndianness();

export class BitArrayField extends Array {
	constructor(bitview, field) {
		super(0);

		this.bitview = bitview;
		this.field = field;

		const { setElement, getElement } = field.getArrayAccessInterface();
		this.setElement = setElement.bind(this);
		this.getElement = getElement.bind(this);

		return new Proxy(this, {
			get: BitArrayField.proxyGet,
			set: BitArrayField.proxySet,
			has: BitArrayField.proxyHas,
			ownKeys: BitArrayField.proxyOwnKeys,
			getOwnPropertyDescriptor: BitArrayField.proxyGetOwnPropertyDescriptor
		});
	}
	static proxyGet(target, prop, receiver) {
		// Handle length property specially
		if (prop === 'length') {
			return target.field.array_length;
		}
		
		// Handle numeric indices - read directly from bit field buffer
		if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
			const index = parseInt(prop);
			if (index >= 0 && index < target.field.array_length) {
				return target.getElement(index);
			}
			// Out of bounds - throw error for consistency with setElement
			throw new Error(`Index out of bounds: ${index} for array length ${target.field.array_length}`);
		}

		return Reflect.get(target, prop, receiver);
	}

	static proxySet(target, prop, value, receiver) {
		// Handle numeric indices - write directly to bit field buffer
		if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
			const index = parseInt(prop);
			if (index >= 0 && index < target.length) {
				target.setElement(index, value);
				return true;
			}
			// Out of bounds - throw error for consistency with getElement
			throw new Error(`Index out of bounds: ${index} for array length ${target.length}`);
		}

		if (prop === 'length') {
			return false;
		}

		return Reflect.set(target, prop, value, receiver);
	}

	static proxyHas(target, prop) {
		if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
			const index = parseInt(prop);
			return index >= 0 && index < target.field.array_length;
		}
		return prop in target;
	}

	static proxyOwnKeys(target) {
		const keys = [];
		for (let i = 0; i < target.field.array_length; i++) {
			keys.push(String(i));
		}
		keys.push('length');
		return keys;
	}

	static proxyGetOwnPropertyDescriptor(target, prop) {
		if (typeof prop === 'string' && /^-?\d+$/.test(prop)) {
			const index = parseInt(prop);
			if (index >= 0 && index < target.field.array_length) {
				return {
					enumerable: true,
					configurable: true,
					value: target.getElement(index)
				};
			}
		}
		if (prop === 'length') {
			return {
				enumerable: false,
				configurable: false,
				writable: false,
				value: target.field.array_length
			};
		}
		return Reflect.getOwnPropertyDescriptor(target, prop);
	}

	get length() {
		return this.field.array_length;
	}

	// Method to handle bulk assignment from arrays
	set(values) {
		if (!Array.isArray(values)) {
			throw new Error('Array field assignment requires an array value');
		}
		for (let i = 0; i < Math.min(values.length, this.length); i++) {
			this.setElement(i, values[i]);
		}
		return this;
	}

	// Convert BitArrayField to regular JavaScript array
	get() {
		const result = [];
		for (let i = 0; i < this.length; i++) {
			result[i] = this.getElement(i);
		}
		return result;
	}

	map() {
		return Array.prototype.map.apply(this.get(), arguments);
	}

	filter() {
		return Array.prototype.filter.apply(this.get(), arguments);
	}

	slice() {
		return Array.prototype.slice.apply(this.get(), arguments);
	}

	flat() {
		return Array.prototype.flat.apply(this.get(), arguments);
	}

	flatMap() {
		return Array.prototype.flatMap.apply(this.get(), arguments);
	}

	concat() {
		return Array.prototype.concat.apply(this.get(), arguments);
	}

	push() {
		throw new Error('BitArrayField has fixed length, cannot use push()');
		return this.length;
	}

	pop() {
		throw new Error('BitArrayField has fixed length, cannot use pop()');
	}

	shift() {
		throw new Error('BitArrayField has fixed length, cannot use shift()');
	}

	unshift() {
		throw new Error('BitArrayField has fixed length, cannot use unshift()');
		return this.length;
	}

	splice() {
		throw new Error('BitArrayField has fixed length, cannot use splice()');
		return [];
	}
}

export class BitField {
	static type_data = {
		u8: { size: 8, getter: 'getUint8', setter: 'setUint8' },
		u16: { size: 16, getter: 'getUint16', setter: 'setUint16' },
		u32: { size: 32, getter: 'getUint32', setter: 'setUint32' },
		u64: { size: 64, getter: 'getBigUint64', setter: 'setBigUint64' },
		i8: { size: 8, getter: 'getInt8', setter: 'setInt8' },
		i16: { size: 16, getter: 'getInt16', setter: 'setInt16' },
		i32: { size: 32, getter: 'getInt32', setter: 'setInt32' },
		i64: { size: 64, getter: 'getBigInt64', setter: 'setBigInt64' },
		f32: { size: 32, getter: 'getFloat32', setter: 'setFloat32' },
		f64: { size: 64, getter: 'getFloat64', setter: 'setFloat64' },
		f16: { size: 16, getter: 'getFloat16', setter: 'setFloat16' },
	}

	/**@param {string} type  */
	constructor(type) {
		this.size = 0;
		this.bit_offset = null;
		this.array_length = -1;
		this.alignment = null;
		this.type = "";
		if (type) {
			this.fromString(type);
		}

		this.input_sanitizer = this.getInputSanitezer();
		this.output_sanitizer = this.getOutputSanitezer();
	}

	fromString(type) {
		type = type.toLowerCase();
		const match = type.match(/^([a-z]+)(\d+)(?:\[(\d+)\])?/);
		if (!match) {
			throw new Error(`Invalid field type format: ${type}`);
		}

		const base_type = match[1];
		const size = parseInt(match[2]);
		const array_length = match[3] ? parseInt(match[3]) : -1;

		if (isNaN(size) || size <= 0 || size > 64) {
			throw new Error(`Invalid bit size in type: ${type}`);
		}

		if (base_type === 'bit' && (size < 1 || size > 32)) {
			throw new Error(`Bit field size must be between 1 and 32: ${type}`);
		}

		this.size = size;
		this.type = base_type === 'bit' ? 'bit' : base_type + size;
		this.array_length = array_length;
	}

	get bit_mask() {
		if (this.size >= 32) return 0xFFFFFFFF;
		return (1 << this.size) - 1;
	}

	get setter_method() {
		return BitField.type_data[this.type]?.setter || `setUint${this.quant_size}`;
	}

	get getter_method() {
		return BitField.type_data[this.type]?.getter || `getUint${this.quant_size}`;
	}

	// Derived properties from bit_offset
	get byte_offset() {
		if (this.alignment) {
			// With alignment, calculate byte offset relative to alignment units
			const quant_bits = this.alignment * 8;
			return Math.floor(this.bit_offset / quant_bits) * this.alignment;
		}
		return this.bit_offset >> 3;
	}

	get offset_in_quant() {
		const quant_size = this.quant_size;
		if (this.alignment) {
			// With alignment, bit position within the aligned unit
			const bit_pos_in_unit = this.bit_offset % quant_size;
			return quant_size - this.size - bit_pos_in_unit;
		}
		return quant_size - this.size - (this.bit_offset % quant_size);
	}

	// Derive quantization size based on field requirements
	get quant_size() {
		if (this.alignment) {
			return this.alignment * 8;
		}
		const val = this.bit_offset % 8 + this.size;
		if (val > 32) return 64;
		if (val > 16) return 32;
		if (val > 8) return 16;
		return 8;
	}

	get field_size() {
		if (this.array_length <= 0) {
			return this.size;
		}

		// For arrays, we need to account for alignment padding
		if (this.alignment && this.alignment > 0) {
			const bit_alignment = this.alignment * 8;
			const elements_per_block = Math.floor(bit_alignment / this.size);

			if (elements_per_block === 0) {
				// Element size is larger than alignment block, each element gets its own aligned block
				const element_aligned_size = Math.ceil(this.size / bit_alignment) * bit_alignment;
				return element_aligned_size * Math.abs(this.array_length);
			} else if (elements_per_block >= Math.abs(this.array_length)) {
				// All elements fit in one alignment block
				return this.size * Math.abs(this.array_length);
			} else {
				// Elements span multiple alignment blocks
				const full_blocks = Math.floor(Math.abs(this.array_length) / elements_per_block);
				const remaining_elements = Math.abs(this.array_length) % elements_per_block;
				let total_size = full_blocks * bit_alignment;
				if (remaining_elements > 0) {
					total_size += remaining_elements * this.size;
				}
				return total_size;
			}
		}

		// No alignment, just multiply size by array length
		return this.size * Math.abs(this.array_length);
	}

	get endian() {
		return this.alignment ? true : false;
	}

	isArrayType() {
		return this.array_length > 0;
	}

	applyAlignment() {
		if (this.alignment) {
			const alignmentBits = this.alignment * 8;
			const currentPositionInUnit = this.bit_offset % alignmentBits;
			const remainingBitsInUnit = alignmentBits - currentPositionInUnit;

			// Only apply alignment padding if the field doesn't fit in the current unit
			if (currentPositionInUnit !== 0 && this.field_size > remainingBitsInUnit) {
				const padding = remainingBitsInUnit;
				this.bit_offset += padding;
				return padding;
			}
		}
		return 0;
	}

	getInputSanitezer() {
		if (this.type === 'bit') {
			const mask = this.bit_mask;
			return function (value) {
				return value & mask;
			}
		} else if (this.type === 'f16') {
			return function (value) {
				const aux = this.view.getUint16(0, true);
				this.view.setFloat16(0, value, true);
				const result = this.view.getUint16(0, true);
				this.view.setUint16(0, aux, true);
				return result;
			}
		}
		return function (value) { return value; };
	}

	getOutputSanitezer() {
		if (this.type === 'f16') {
			return function (value) {
				const aux = this.view.getUint16(0, true);
				this.view.setUint16(0, value, true);
				const result = this.view.getFloat16(0, true);
				this.view.setUint16(0, aux, true);
				return result;
			}
		}
		return function (value) { return value; }
	}

	getOffsetOfIndex(index) {
		if (index < 0 || index >= this.array_length) {
			throw new Error(`Index out of bounds: ${index} for array length ${this.array_length}`);
		}

		if (!this.alignment) {
			return this.bit_offset + this.size * index;
		}

		const bit_alignment = this.alignment * 8;
		const elements_per_block = Math.floor(bit_alignment / this.size);

		if (elements_per_block === 0) {
			// Each element gets its own aligned block
			const element_aligned_size = Math.ceil(this.size / bit_alignment) * bit_alignment;
			return this.bit_offset + element_aligned_size * index;
		} else {
			// Elements fit within alignment blocks
			const full_blocks = Math.floor(index / elements_per_block);
			const index_in_block = index % elements_per_block;
			return this.bit_offset + full_blocks * bit_alignment + index_in_block * this.size;
		}
	}

	setter(view, offset, value) {
		const {
			setter_method,
			getter_method,
			size,
			offset_in_quant,
			endian,
			quant_size,
			byte_offset,
			alignment,
			bit_mask,
			input_sanitizer
		} = this;

		value = input_sanitizer(value);
		if (alignment && size === quant_size && offset_in_quant === 0) {
			view[setter_method](offset + byte_offset, value, endian);
		} else {
			const data = view[getter_method](offset + byte_offset, endian);
			view[setter_method](offset + byte_offset, (data & ~(bit_mask << offset_in_quant) | (value << offset_in_quant)), endian);
		}
		return true;
	}

	getter(view, offset) {
		const {
			getter_method,
			size,
			offset_in_quant,
			endian,
			quant_size,
			byte_offset,
			alignment,
			bit_mask,
			output_sanitizer
		} = this;

		if (alignment && size === quant_size && offset_in_quant === 0) {
			const value = view[getter_method](offset + byte_offset, endian);
			return output_sanitizer(value)
		}

		const data = view[getter_method](offset + byte_offset, endian);
		const value = (data >> offset_in_quant) & bit_mask;
		return output_sanitizer(value);
	}

	getFunctionInterface() {
		const field = this;
		return {
			setter: function (value) {
				return field.setter(this.view, this.offset, value);
			},
			getter: function () {
				return field.getter(this.view, this.offset);
			}
		}
	}

	getArrayAccessInterface() {
		const field = this;
		return {
			setElement: function (index, value) {
				const new_offset = field.getOffsetOfIndex(index), start_offset = field.bit_offset;
				const { view, offset } = this.bitview;
				field.bit_offset = new_offset;
				const result = field.setter(view, offset, value);
				field.bit_offset = start_offset;
				return result;
			},
			getElement: function (index) {
				const new_offset = field.getOffsetOfIndex(index), start_offset = field.bit_offset;
				const { view, offset } = this.bitview;

				field.bit_offset = new_offset;
				const result = field.getter(this.bitview.view, this.bitview.offset);
				field.bit_offset = start_offset;
				return result;
			}
		};
	}
}

export class BitPacker {
	static default_options = {
		bit_flow: 'MSB', // MSB or LSB
		alignment: 4,
	}

	constructor(fields, options = {}) {
		this.options = { ...BitPacker.default_options, ...options };
		this.wasted_bits = 0;
		this.bucket_cnt = 0;
		this.fields = this.computeFieldData(fields);
		this.class = this.computeClass();
	}

	/**
	 * Get the generated BitView class with dynamic field properties
	 * @returns {typeof BitView & {[fieldName: string]: any}} BitView class with field properties
	 */
	get BitView() {
		return this.class;
	}

	computeClass() {
		const arrayFields = {};
		const fields = this.fields;

		for (const field in fields) {
			const fieldData = fields[field];
			if (fieldData.isArrayType()) {
				arrayFields[field] = fieldData;
			}
		}

		const new_class = class extends BitView {

			constructor(buffer, offset = 0) {
				super(buffer, offset);
				for (const fieldName in arrayFields) {
					this[fieldName] = new BitArrayField(this, arrayFields[fieldName]);
				}
			}
		};

		for (const field_name in fields) {
			const field = fields[field_name];

			if (!field.isArrayType()) {
				const { setter, getter } = field.getFunctionInterface();
				const fieldName = field_name; // Capture field name in closure

				Object.defineProperty(new_class.prototype, field_name, {
					set: function (value) {
						this.onPropertyAccess?.('set', fieldName, value);
						return setter.call(this, value);
					},
					get: function () {
						const result = getter.call(this);
						this.onPropertyAccess?.('get', fieldName, result);
						return result;
					},
					enumerable: true
				});
			}
		}

		return new_class;
	}

	parseField(field_data) {
		const field = new BitField(field_data.type || field_data);
		if (typeof field_data === 'object') {
			field.alignment = field_data.alignment ?? null;
			field.bit_offset = field_data.bit_offset ?? null;
		}

		return field;
	}

	computeFieldData(fields) {
		const result = {};
		let offset = 0;
		const alignment = this.options.alignment;

		for (const field in fields) {
			const field_data = this.parseField(fields[field]);

			field_data.alignment ??= alignment;
			if (field_data.bit_offset !== null) {
				continue;
			}
			field_data.bit_offset = offset;
			this.wasted_bits += field_data.applyAlignment();

			offset = field_data.bit_offset + field_data.field_size;
			result[field] = field_data;
		}

		this.fields = result;
		this.bit_size = offset;
		return result;
	}

	get bytes() {
		return Math.ceil(this.bit_size / 8);
	}
}


// function test1() {
// 	const packer = new BitPacker({
// 		x: 'bit4',             // bits 31-28 (MSB)
// 		y: 'bit4',             // bits 27-24
// 		z: 'bit4',             // bits 23-20
// 		texture_id: 'bit12',   // bits 19-8
// 		quad_normal: 'bit3',   // bits 7-5
// 		placing_face: 'bit3',  // bits 4-2
// 		facing: 'bit2',        // bits 1-0 (LSB)

// 		// Second uint32 (quad.y) - natural order with MSB bit_flow
// 		transform: 'bit10',    // bits 31-22 (MSB)
// 		ao: 'bit8',            // bits 21-14
// 		ao_exponent: 'bit8',   // bits 13-6
// 		light: 'bit4',         // bits 5-2
// 		flag: 'bit1',          // bit 1
// 		isotropic: 'bit1',     // bit 0 (LSB)

// 		// Third uint32 (quad.z) - natural order with MSB bit_flow
// 		light_corners: 'bit4', // bits 31-28 (MSB)
// 		sky_light: 'bit4',     // bits 27-24
// 		temperature: 'bit8',   // bits 23-16
// 		humidity: 'bit8',      // bits 15-8
// 		_reserved: 'bit8',     // bits 7-0 (LSB, for future use)
// 	});

// 	const buffer = new Uint32Array(3);
// 	const view = new packer.BitView(buffer.buffer);
// 	const uint_view = new DataView(buffer.buffer);

// 	view.x = 7;
// 	view.y = 7;
// 	// view.z = 15;
// 	// view.texture_id = 2048;
// 	// view.quad_normal = 4;
// 	// view.placing_face = 2;
// 	// view.facing = 1;

// 	for (const field_name in packer.fields) {
// 		const field = packer.fields[field_name];
// 		console.log(field_name, field.byte_offset, field.quant_size, field.offset_in_quant);
// 	}

// 	for (let i = 0; i < 4; i++) {
// 		console.log(showBytes(uint_view.getUint8(i), 1));
// 	}
// 	console.log(showBytes(uint_view.getUint32(0, false), 4));
// }

// function test2() {
// 	const buffer = new Uint32Array(4);
// 	const view = new DataView(buffer.buffer);
// 	view.setUint32(0, 0x12345678, false);
// 	console.log("little", view.getUint32(0, true).toString(16), 4);
// 	console.log("big", (view.getUint32(0, false) << 8).toString(16), 4);
// }

// function test3() {
// 	const packer = new BitPacker({
// 		a: "u32[8]"
// 	}, { alignment: 4 });
// 	console.log(packer.fields);
// 	const buffer = new Uint32Array(8);
// 	const view = new packer.BitView(buffer.buffer, 0);

// 	view.a.set([1, 2, 3, 4, 5, 6, 7, 8]);
// 	console.log(view.a.get());
// }

// test3();
