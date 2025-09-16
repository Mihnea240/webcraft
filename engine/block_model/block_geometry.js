import Faces from "@utils/faces";

const DEG2RAD = Math.PI / 180;

// Utility functions
function arrayCheck(array) {
	if (!array || !Array.isArray(array)) return false;
	if (array.length !== 3) throw new Error("Array must be a 3-element array");
	return true;
}
// origin_x scale_x rotation_x inset       uv_data
// origin_y scale_y rotation_y inset_angle uv_data
// origin_z scale_z rotation_z idk         uv_data
// pivot_x  pivot_y pivot_z    idk         uv_data
export class TransformView{
	static floats_per_transform = 20;
	static shorts_per_data = 1;
	static transform_cnt = 1000; // Maximum number of transforms
	static cube_size = 16; // Default cube size
	static texture_size = 16; // Default texture size
	
	static default_scale = [TransformView.cube_size, TransformView.cube_size, TransformView.cube_size];
	static default_array = [0, 0, 0];
	static default_pivot = [0, 0, 0];

	constructor(transform_buffer, data_buffer  ,id) {
		this.transform_buffer = transform_buffer;
		this.data_buffer = data_buffer;
		this.transform_offset = id * (TransformView.floats_per_transform);
		this.data_offset = id;
		
		this.uint_transform_view = new Uint32Array(this.transform_buffer.buffer);
		this.face_uvs = new Array(6);
	}

	set id(value) { 
		this.transform_offset = value * (TransformView.floats_per_transform);
		this.data_offset = value;
	}
	get id() { 
		return this.transform_offset / (TransformView.floats_per_transform);
	}

	// Direct buffer access properties
	set inset(value) {
		const base = this.transform_offset + 12;
		this.transform_buffer[base] = value;
	}
	get inset() {
		const base = this.transform_offset + 12;
		return this.transform_buffer[base];
	}
	offsetInset(value) {
		this.transform_buffer[this.transform_offset + 12] += value;
	}


	set inset_angle(value) {
		this.transform_buffer[this.transform_offset + 17] = value * DEG2RAD;
	}
	get inset_angle() {
		return this.transform_buffer[this.transform_offset + 17];
	}
	offsetInsetAngle(value) {
		this.transform_buffer[this.transform_offset + 17] += value;
	}
	
	set random_offset(value) {
		const base = this.transform_offset + 16;
		this.uint_transform_view[base] = (this.uint_transform_view[base] & ~1) | (value ? 1 : 0);
	}
	get random_offset() { return this.uint_transform_view[this.transform_offset + 16] & 1; }

	set uv_lock(value) {
		const base = this.transform_offset + 17;
		const buffer = this.uint_transform_view;
		value &= 63; // Keep only the first 6 bits
		buffer[base] = (buffer[base] & ~3) | ((value >> 4) & 3);
		buffer[base + 1] = (buffer[base + 1] & ~3) | ((value >> 2) & 3);
		buffer[base + 2] = (buffer[base + 2] & ~3) | (value & 3);
	}
	get uv_lock() {
		const base = this.transform_offset + 17;
		const buffer = this.uint_transform_view;
		return ((buffer[base] & 3) << 4) | ((buffer[base + 1] & 3) << 2) | (buffer[base + 2] & 3);
	}

	set use_placing_rotation(value) {
		const base = this.transform_offset + 16;
		const buffer = this.uint_transform_view;
		buffer[base] = (buffer[base] & ~2) | (value ? 2 : 0);
	}
	get use_placing_rotation() {
		return (this.uint_transform_view[this.transform_offset + 16] & 2) !== 0;
	}

	set mask(value) {
		this.data_buffer[this.data_offset] &= ~(0xFF << 10);
		this.data_buffer[this.data_offset] |= (value & 0xFF) << 10;
	}
	get mask() {
		return (this.data_buffer[this.data_offset] >> 10) & 0xFF;
	}

	set cull_rule(value) {
		this.data_buffer[this.data_offset] &= ~0xFF;
		this.data_buffer[this.data_offset] |= value & 0xFF;
	}
	get cull_rule() {
		return this.data_buffer[this.data_offset] & 0xFF;
	}

	set origin(array) {
		if(!arrayCheck(array)) return;
		const base = this.transform_offset;
		this.transform_buffer[base + 0] = array[0];
		this.transform_buffer[base + 1] = array[1];
		this.transform_buffer[base + 2] = array[2];
	}

	get origin() {
		return new Float32Array(this.transform_buffer.buffer, this.transform_offset * Float32Array.BYTES_PER_ELEMENT, 3);
	}
	
	offsetOrigin(array) {
		if(!arrayCheck(array)) return this;
		const base = this.transform_offset;
		this.transform_buffer[base + 0] += array[0];
		this.transform_buffer[base + 1] += array[1];
		this.transform_buffer[base + 2] += array[2];
		return this;
	}

	// Scale methods (offset 4-6)
	set scale(array) {
		if(!arrayCheck(array)) return;
		const base = this.transform_offset + 4;
		this.transform_buffer[base + 0] = array[0];
		this.transform_buffer[base + 1] = array[1];
		this.transform_buffer[base + 2] = array[2];
	}
	get scale() {
		return new Float32Array(this.transform_buffer.buffer, (this.transform_offset + 4) * Float32Array.BYTES_PER_ELEMENT, 3);
	}
	
	offsetScale(array) {
		if(!arrayCheck(array)) return;
		const base = this.transform_offset + 4;
		this.transform_buffer[base + 0] += array[0];
		this.transform_buffer[base + 1] += array[1];
		this.transform_buffer[base + 2] += array[2];
		return this;
	}

	// Rotation methods (offset 8-10)
	set rotation(array) { 
		if(!arrayCheck(array)) return;
		const base = this.transform_offset + 8;
		this.transform_buffer[base + 0] = array[0] * DEG2RAD;
		this.transform_buffer[base + 1] = array[1] * DEG2RAD;
		this.transform_buffer[base + 2] = array[2] * DEG2RAD;
	}
	get rotation() {
		return new Float32Array(this.transform_buffer.buffer, (this.transform_offset + 8) * Float32Array.BYTES_PER_ELEMENT, 3);
	}
	
	offsetRotation(array) {
		if(!arrayCheck(array)) return this;
		const base = this.transform_offset + 8;
		this.transform_buffer[base + 0] += array[0];
		this.transform_buffer[base + 1] += array[1];
		this.transform_buffer[base + 2] += array[2];
	}

	// Pivot methods (offset 12-14)
	set pivot(array) {
		if (!arrayCheck(array)) return;
		const base = this.transform_offset;
		this.transform_buffer[base + 3] = array[0];
		this.transform_buffer[base + 7] = array[1];
		this.transform_buffer[base + 11] = array[2];
	}
	get pivot() {
		return new Float32Array(this.transform_buffer.buffer, (this.transform_offset + 12) * Float32Array.BYTES_PER_ELEMENT, 3);
	}
	offsetPivot(array) {
		if(!arrayCheck(array)) return this;
		const base = this.transform_offset + 12;
		this.transform_buffer[base + 0] += array[0];
		this.transform_buffer[base + 1] += array[1];
		this.transform_buffer[base + 2] += array[2];
		return this;
	}

	packUVs() {
		const base = this.transform_offset + 16;
		const buffer = this.uint_transform_view;
		let face = 0;

		for (let i = 0; i < 4; i++){
			let last2_bits = this.uint_transform_view[base + i] & 3;
			this.uint_transform_view[base + i] = 0;
			for (let j = 0; j < 6; j++){
				this.uint_transform_view[base + i] <<= 5;
				this.uint_transform_view[base + i] += this.face_uvs[j][i] & 31;
				face++;
			}
			this.uint_transform_view[base + i] <<= 2;
			this.uint_transform_view[base + i] |= last2_bits; // Restore last 2 bits
		}
		return this.mask;
	}
	defaultFaceUvs() {
		for (let i = 0; i < 6; i++) {
			this.face_uvs[i] = [0, 0, TransformView.texture_size, TransformView.texture_size];
		}
	}
	parseFaceUvs(face_uv_json) {
		for(let i = 0; i < 6; i++) {
			const face = Faces.face_string_array_cardinal[i];
			let value = face_uv_json?.[face];

			if (face_uv_json?.side && i != Faces.TOP && i != Faces.BOTTOM) value = face_uv_json.side;
			if (value === "none") this.mask |= 1 << i;
			
			if (!value) value = [0, 0, TransformView.texture_size, TransformView.texture_size];
			if (Array.isArray(value)) this.face_uvs[i] = value;
		}

		this.packUVs();
	}

	parseUvLock(uv_lock) {
		if(typeof uv_lock === 'boolean') {
			this.uv_lock = uv_lock ? 63 : 0;
			return;
		}
		if (typeof uv_lock === 'object') {
			let value = 0;
			for (let i = 0; i < 6; i++) {
				const face = Faces.face_string_array_cardinal[i];
				if (uv_lock?.side && i != Faces.TOP && i != Faces.BOTTOM) {
					if (uv_lock.side) value |= 1 << i;
				}
				if (uv_lock?.[face]) {
					value |= 1 << i;
				}
			}
			this.uv_lock = value;
			return;
		}
	}

	getFaceUv() {
		return [
			this.uint_transform_view[this.transform_offset + 16],
			this.uint_transform_view[this.transform_offset + 17],
			this.uint_transform_view[this.transform_offset + 18],
			this.uint_transform_view[this.transform_offset + 19],
		]
	}
	/**@param {TransformView} other*/
	copy(other) {
		for (let i = 0; i < 14; i++) {
			this.transform_buffer[this.transform_offset + i] =
				other.transform_buffer[other.transform_offset + i];
		}
		for (let i = 14; i < 20; i++) {
			this.uint_transform_view[this.transform_offset + i] =
				other.uint_transform_view[other.transform_offset + i];
		}

		this.data_buffer[this.data_offset] = other.data_buffer[other.data_offset];
	}

	// fromJson(json_data, parent_transform) {
	// 	this.defaultFaceUvs();

	// 	this.origin = json_data.origin || TransformView.default_array;
	// 	this.scale = json_data.scale || TransformView.default_scale;
	// 	this.rotation = json_data.rotation || TransformView.default_array;
	// 	this.inset = json_data.inset || 0;
	// 	this.inset_angle = json_data.inset_angle || 0;
	// 	this.random_offset = json_data.random_offset || false;
	// 	this.parseFaceUvs(json_data.face_uvs);

	// 	if(parent_transform) {
	// 		this.offsetOrigin(parent_transform.origin);
	// 		this.offsetScale(parent_transform.scale);
	// 		this.offsetRotation(parent_transform.rotation);
	// 		this.offsetInset(parent_transform.inset);
	// 		this.offsetInsetAngle(parent_transform.inset_angle);
	// 	}
	// }
}

export class GeometryView {
	constructor(buffer, id) {
		this.buffer = buffer;
		this.id = id;
	}

	get transform_cnt() { return this.buffer[this.id]; }

	pushTransform(transform_id) {
		const cnt = this.buffer[this.id]++;
		this.buffer[this.id + 1 + cnt] = transform_id;
	}

	*transforms() {
		const cnt = this.buffer[this.id];
		for (let i = 0; i < cnt; i++) {
			yield this.buffer[this.id + 1 + i];
		}
	}
}

export class GeometryRegistry {
	constructor() {
		this.geometry_data = {
			name_to_offset: new Map(),
			buffer: new Uint16Array(1000),
			next_offset: 0,
		}

		this.transform_data = {
			tarnsform_buffer: new Float32Array(TransformView.floats_per_transform * TransformView.transform_cnt),
			data_buffer: new Uint16Array(TransformView.shorts_per_data * TransformView.transform_cnt),
			next_offset: 0,
		}

		this.geometry_view = this.geometryView(0);
		this.geometry_parent_view = this.geometryView(0);

		this.transform_view = this.transformView(0);
		this.transform_parent_view = this.transformView(0);
	}

	geometryView(id) {
		return new GeometryView(this.geometry_data.buffer, id);
	}
	transformView(id) {
		return new TransformView(
			this.transform_data.tarnsform_buffer, this.transform_data.data_buffer, id
		);
	}

	parseTransform(json_data, parent_transform) {
		if (Object.keys(json_data).length === 1) {
			return parent_transform; // No transform data, return parent
		}
		const view = this.transform_view;
		view.id = this.transform_data.next_offset;

		if (parent_transform) {
			view.copy(parent_transform);
			for (const key in json_data) {
				if (view[key] === undefined) continue;
				view[key] = json_data[key];
			}
			console.log(parent_transform.getFaceUv(), view.getFaceUv());

			if (json_data.face_uvs) {
				view.defaultFaceUvs();
				view.parseFaceUvs(json_data.face_uvs);
			}
			if (json_data.uv_lock !== undefined) view.parseUvLock(json_data.uv_lock);
			if (json_data.offset_origin !== undefined) view.offsetOrigin(json_data.offset_origin);
			if (json_data.offset_scale !== undefined) view.offsetScale(json_data.offset_scale);
			if (json_data.offset_rotation !== undefined) view.offsetRotation(json_data.offset_rotation);
			if (json_data.offset_inset !== undefined) view.offsetInset(json_data.offset_inset);
			if (json_data.offset_inset_angle !== undefined) view.offsetInsetAngle(json_data.offset_inset_angle);
			if (json_data.offset_pivot !== undefined) view.offsetPivot(json_data.offset_pivot);

		} else {
			view.origin        = json_data.origin        ?? TransformView.default_array;
			view.scale         = json_data.scale         ?? TransformView.default_scale;
			view.rotation      = json_data.rotation      ?? TransformView.default_array;
			view.pivot         = json_data.pivot         ?? TransformView.default_pivot;
			view.inset         = json_data.inset         ?? 0;
			view.inset_angle   = json_data.inset_angle   ?? 0;
			view.random_offset = json_data.random_offset ?? false;
			view.use_placing_rotation = json_data.use_placing_rotation ?? true;
			
			view.defaultFaceUvs();
			view.parseFaceUvs(json_data.face_uvs);
			view.parseUvLock(json_data.uv_lock);
		}

		
		// if (parent_transform) {
		// 	view.offsetOrigin(parent_transform.origin);
		// 	view.offsetScale(parent_transform.scale);
		// 	view.offsetRotation(parent_transform.rotation);
		// 	view.offsetInset(parent_transform.inset);
		// 	view.offsetInsetAngle(parent_transform.inset_angle);

		// 	if(json_data.uv_lock === undefined) {
		// 		view.uv_lock = parent_transform.uv_lock;
		// 	}
		// 	if(json_data.use_placing_rotation === undefined) {
		// 		view.use_placing_rotation = parent_transform.use_placing_rotation;
		// 	}
		// }
	
		this.transform_data.next_offset++;
		return view;
	}

	parseGeometryEntry(json_data) {
		const name = json_data.identifier;
		this.geometry_view.id = this.geometry_data.next_offset;

		for (const cube of json_data.cubes) {
			if (cube.inherit) {
				const parent_geometry = this.getGeometryByName(cube.inherit, this.geometry_parent_view);
				if (!parent_geometry) {
					console.warn(`Parent geometry ${cube.inherit} not found for cube in geometry ${name}`);
					continue;
				}

				for (const transform_id of (cube.cubes || parent_geometry.transforms())) {
					this.transform_parent_view.id = transform_id;
					const new_transform = this.parseTransform(cube, this.transform_parent_view);
					this.geometry_view.pushTransform(new_transform.id);
				}
				continue;
			}

			const new_transform = this.parseTransform(cube, null);
			this.geometry_view.pushTransform(new_transform.id);
		}

		this.geometry_data.next_offset += this.geometry_view.transform_cnt + 1;
		return name;
	}

	parseJson(json) {
		for (const geometry_json of json) {
			const name = this.parseGeometryEntry(geometry_json);
			this.geometry_data.name_to_offset.set(name, this.geometry_view.id);
		}
	}

	getGeometryByName(name, view = this.geometry_view) {
		view.id = this.getGeometryId(name);
		return view;
	}
	
	getGeometryId(name) { 
		return this.geometry_data.name_to_offset.get(name);
	}
}