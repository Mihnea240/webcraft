import Faces from "../voxel_engine/faces";

export class AtlasBuilder {
	constructor() {
		this.terrain_settings = {
			width: 1024,
			height: 2048,
			cell_width: 16,
			cell_height: 16,
			padding: 8,
			get grid_size() {
				return {
					width: Math.floor(this.width / (this.cell_width + this.padding)),
					height: Math.floor(this.height / (this.cell_height + this.padding))
				};
			},
			get tile_padding() {
				return this.padding / 2;
			}
		}

		this.offscreen_canvas = new OffscreenCanvas(0, 0);

		this.cell_map_max_size = {width: 256, height: 256};
		this.cell_byte_map_size = { ... this.cell_map_max_size };
		this.cell_byte_map = new Uint8Array(this.cell_byte_map_size.width * this.cell_byte_map_size.height);

		this.util_size_obj = { width: 0, height: 0 };
		this.util_position_obj = { x: 0, y: 0 };

		this.atlas = {
			terrain: null,
		}
	}

	setCanvas(settings) {
		this.offscreen_canvas.width = settings.width;
		this.offscreen_canvas.height = settings.height;
		this.ctx = this.offscreen_canvas.getContext('2d');
	}

	setTerrainSettings(settings) {
		this.terrain_settings = {...this.terrain_settings, ...settings};
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.offscreen_canvas.width, this.offscreen_canvas.height);
	}

	getBitmapTileSize(bitmap, settings) {
		const { cell_width, cell_height, padding, tile_padding } = settings;
		const image_width = Math.ceil((bitmap.width + tile_padding) / (cell_width + padding));
		const image_height = Math.ceil((bitmap.height + tile_padding) / (cell_height + padding));

		this.util_size_obj.width = image_width;
		this.util_size_obj.height = image_height;
		return this.util_size_obj; 
	}

	setCellMapSize(width, height) {
		this.cell_byte_map_size.width = width;
		this.cell_byte_map_size.height = height;
	}

	clearCellMap() {
		this.cell_byte_map.fill(0);
	}

	setCell(x, y, value = 1) {
		const {width, height} = this.cell_byte_map_size;
		if (x < 0 || x >= width || y < 0 || y >= height) return false;

		this.cell_byte_map[x + y * width] = value;
		return true;
	}

	getCell(x, y) {
		const { width, height } = this.cell_byte_map_size;
		return this.cell_byte_map[x + y * width];
	}

	isBounded(x, y) {
		const {width, height} = this.cell_byte_map_size;
		return !(x < 0 || x >= width || y < 0 || y >= height);
	}

	isAvailable(x, y, w = 1, h = 1) {
		const {width, height} = this.cell_byte_map_size;
		if (x < 0 || x + w > width || y < 0 || y + h > height) return false;

		for(let i = 0; i < w; i++) {
			for(let j = 0; j < h; j++) {
				if (this.getCell(x + i, y + j) !== 0) return false;
			}
		}

		return true;
	}

	getAvailbleCell(x, y, w = 1, h = 1) {
		const { width, height } = this.cell_byte_map_size;
		
		while (y < height - h) {
			if (this.isAvailable(x, y, w, h)) {
				this.util_position_obj.x = x;
				this.util_position_obj.y = y;
				return this.util_position_obj;
			};

			x++;
			if (x >= width - w) {
				x = 0;
				y++;
			}
		}
	}

	fillAvailableCell(x, y, w = 1, h = 1, value = 1) {
		for (let i = 0; i < w; i++) {
			for (let j = 0; j < h; j++) {
				this.setCell(x + i, y + j, value);
			}
		}
	}

	copyToCanvas(image, x, y, settings) {
		const { cell_width, cell_height, padding } = settings;
		const tile_padding = padding / 2;
		const pixel_x = x * (cell_width + padding) + tile_padding;
		const pixel_y = y * (cell_height + padding) + tile_padding;

		this.ctx.drawImage(image, pixel_x, pixel_y);

		for (let i = 0; i < tile_padding; i++) {
			// Copy top row 
			this.ctx.drawImage(image, 0, 0, image.width, 1,
				pixel_x, pixel_y - i, image.width, 1);
			// Copy left column
			this.ctx.drawImage(image, 0, 0, 1, image.height,
				pixel_x - i, pixel_y, 1, image.height,);
			// Copy right column
			this.ctx.drawImage(image, image.width - 1, 0, 1, image.height,
				pixel_x + image.width + i, pixel_y, 1, image.height,);
			// Copy bottom row
			this.ctx.drawImage(image, 0, image.height - 1, image.width, 1,
				pixel_x, pixel_y + image.height + i, image.width, 1);
		}
	}

	createAtlasImage(path_to_bitmap) {
		this.setCanvas(this.terrain_settings);
		this.clearCanvas();
		this.clearCellMap();
		this.setCellMapSize(...Object.values(this.terrain_settings.grid_size));

		let last_x = 0, last_y = 0;
		const path_to_uv = new Map();

		for (const [path, bitmap] of path_to_bitmap.entries()) {
			const { width, height } = this.getBitmapTileSize(bitmap, this.terrain_settings);
			const available_pos = this.getAvailbleCell(last_x, last_y, width, height);

			if (!available_pos) {
				throw new Error(`Atlas texture size exceeded for ${path}`);
			}
			this.fillAvailableCell(available_pos.x, available_pos.y, width, height);

			this.copyToCanvas(bitmap, available_pos.x, available_pos.y, this.terrain_settings);

			last_x = available_pos.x;
			last_y = available_pos.y;

			path_to_uv.set(path, last_x << 8 | last_y);

			bitmap.close();
		}

		return path_to_uv;
	}

	async getBitmap() {
		const bitmap = await createImageBitmap(this.offscreen_canvas);
		return bitmap;
	}
}

export class TextureView {
	// 2 bytes for uv
	// 1 bytes for tint method
	// 1 byte for animation id
	// 2 bytes for overlay texture id
	// 3 bytes for tint color
	// 3 bytes for overlay color
	static elements_per_texture_entry = 4;
	constructor(buffer, id) {
		this.buffer = buffer;
		this.id = id;
	}

	set id(value) { this.offset = value * TextureView.elements_per_texture_entry; }
	get id() { return this.offset / TextureView.elements_per_texture_entry; }
	
	set u(value) { 
		this.buffer[this.offset] = (this.buffer[this.offset] & 0x00FFFFFF) | ((value & 0xFF) << 24); 
	}
	get u() { return this.buffer[this.offset] >> 24; }

	set v(value) { 
		this.buffer[this.offset] = (this.buffer[this.offset] & 0xFF00FFFF) | ((value & 0xFF) << 16); 
	}
	get v() { return (this.buffer[this.offset] >> 16) & 0xFF; }

	set uv(value) {
		const u = (value >> 8) & 0xFF;
		const v = value & 0xFF;
		this.buffer[this.offset] = (this.buffer[this.offset] & 0x0000FFFF) | (u << 24) | (v << 16);
	}

	get uv() {
		return ((this.buffer[this.offset] >> 16) & 0xFFFF); 
	}

	set overlay_color(value) {
		this.buffer[this.offset + 1] = value & 0xFFFFFF;
	}
	get overlay_color() {
		return this.buffer[this.offset + 1] & 0xFFFFFF;
	}

	set tint_color(value) {
		this.buffer[this.offset + 2] = value & 0xFFFFFF;
	}
	get tint_color() {
		return this.buffer[this.offset + 2] & 0xFFFFFF;
	}
}

export class AtlasView{
	constructor(buffer, id) {
		this.buffer = buffer;
		this.id = id;
	}

	get length() {
		return this.buffer[this.id];
	}

	push(texture_id) {
		this.buffer[this.id + this.length + 1] = texture_id;
		this.buffer[this.id] += 1;
	}

	get(variant = 0) {
		return this.buffer[this.id + variant + 1];
	}
}

export class TextureRegistry {
	static max_texture_entries = 4096;
	static bytes_per_texture_entry = 8;
	static bytes_per_terrain_atlas = 8192;
	constructor() {
		this.default_overlay_color = 0;
		this.default_tint_color = 0xFFFFFF;

		this.atlasBuilder = new AtlasBuilder();

		this.texture_data = {
			buffer: new Uint32Array(
				TextureView.elements_per_texture_entry * 
				TextureRegistry.max_texture_entries
			),
			next_offset: 0,
		}
		this.atlas_tile_data = {
			name_to_offset: new Map(),
			buffer: new Uint16Array(TextureRegistry.bytes_per_terrain_atlas / Uint16Array.BYTES_PER_ELEMENT),
			next_offset: 0,
		}

		this.texture_view = this.textureView(0);
		this.atlas_view = this.atlasView(0);
	}

	textureView(id) {
		return new TextureView(this.texture_data.buffer, id);
	}

	atlasView(offset) {
		return new AtlasView(this.atlas_tile_data.buffer, offset);
	}

	getTextureUV(path) { 
		return this.path_to_uv_map.get(path) ?? this.default_texture_uv;
	}

	getAtlasTileId(name) {
		return this.atlas_tile_data.name_to_offset.get(name);
	}

	getAtlasTileByName(name) {
		const offset = this.getAtlasTileId(name);
		this.atlas_view.id = offset;
		return this.atlas_view;
	}

	parseTextureEntry(json_data) {
		const id = this.texture_data.next_offset;
		this.texture_view.id = id;
		
		switch (typeof json_data) {
			case "string": {
				this.texture_view.uv = this.getTextureUV(json_data);
				break;
			}
			case "object": {
				this.texture_view.uv = this.getTextureUV(json_data.path);
				break;
			}
		}
		
		this.texture_data.next_offset++;
		return id;
	}

	parseAtlasEntry(json_data) {
		const textures = json_data.textures;
		this.atlas_view.id = this.atlas_tile_data.next_offset;

		if(typeof textures === "string") {
			this.atlas_view.push(this.parseTextureEntry(textures));
		} else if(Array.isArray(textures)) {
			for (const texture of textures) {
				this.atlas_view.push(this.parseTextureEntry(texture));
			}
		}

		this.atlas_tile_data.next_offset += this.atlas_view.length + 1;
		return this.atlas_view.id;
	}

	async parseTerrainJson(json, path_to_bitmap) {
		//TO DO: Metada handle
		const name = json.texture_name.split(".")[1];

		this.path_to_uv_map = this.atlasBuilder.createAtlasImage(path_to_bitmap);
		this.default_texture_uv = this.path_to_uv_map.get(" ");

		this.atlasBuilder.atlas[name] = await this.atlasBuilder.getBitmap();
		const texture_data = json.texture_data;

		for (const name in texture_data) {
			const id = this.parseAtlasEntry(texture_data[name]);
			if(name=="flattened_dirt") console.log(name, id);
			this.atlas_tile_data.name_to_offset.set(name, id);
		}

		return this.atlasBuilder.atlas[name];
	}
}

export class MaterialView {
	//12 bytes for 6 faces texture ids
	//1 byte for isotropic mask
	//1 byte for ao exponent
	//2 bytes for carried texture id
	static elements_per_material = 8;
	constructor(buffer, id) {
		this.buffer = buffer;
		this.id = id;
	}

	set id(value) { this.offset = value * MaterialView.elements_per_material; }
	get id() { return this.offset / MaterialView.elements_per_material; }

	setTile(face, texture_id) {
		this.buffer[this.offset + face] = texture_id & 0xFFFF;
	}

	setAllTiles(texture_ids) {
		for (let i = 0; i < 6; i++) {
			this.setTile(i, texture_ids[i]);
		}
	}

	setSideTile(texture_id) {
		this.setTile(Faces.EAST, texture_id);
		this.setTile(Faces.WEST, texture_id);
		this.setTile(Faces.NORTH, texture_id);
		this.setTile(Faces.SOUTH, texture_id);
	}

	setIsotropicMask(face, value) {
		this.buffer[this.offset + 6] =
			this.buffer[this.offset + 6] & ~(1 << (face + 8)) |
			(value ? (1 << face + 8) : 0);
	}

	setIsotropicMaskAll(value) {
		const val = value ? 63 : 0;
		this.buffer[this.offset + 6] = this.buffer[this.offset + 6] & 0xFFFF | (val << 8);
	}

	setIsotropicMaskSide(value) {
		this.setIsotropicMask(Faces.EAST, value);
		this.setIsotropicMask(Faces.WEST, value);
		this.setIsotropicMask(Faces.NORTH, value);
		this.setIsotropicMask(Faces.SOUTH, value);
	}

	set ao_exponent(value) { this.buffer[this.offset + 6] = Math.round(value * 63.75) & 0xFF; }
	get ao_exponent() { return (this.buffer[this.offset + 6] & 0xFF) / 63.75; }

	set carried_texture_id(value) { this.buffer[this.offset + 7] = value & 0xFFFF; }
	get carried_texture_id() { return this.buffer[this.offset + 7] & 0xFFFF; }

	getTile(face) {
		return this.buffer[this.offset + face] & 0xFFFF;
	}
}

export class MaterialRegistry {
	constructor() {
		this.textureRegistry = new TextureRegistry();

		this.material_data = {
			name_to_id: new Map(),
			buffer: new Uint16Array(
				MaterialView.elements_per_material * 2048
			),
		}

		this.carried_data = {
			name_to_id: new Map(),
			buffer: new Uint16Array(256 * 12), // 256 entries for carried textures
		}

		this.cube_material_view = this.materialView(0);
	}

	materialView(id) {
		return new MaterialView(this.material_data.buffer, id);
	}

	parseMaterialEntry(json_data) {
		const id = this.material_data.name_to_id.size;
		const view = this.cube_material_view;
		view.id = id;

		const textures = json_data.textures;
		if (typeof textures === "string") {
			const atlas_id = this.textureRegistry.getAtlasTileId(textures);
			view.setAllTiles(new Array(6).fill(atlas_id));
		} else if (typeof textures === "object") {
			for (const face_string in textures) {
				if(face_string === "side") {
					view.setSideTile(
						this.textureRegistry.getAtlasTileId(textures[face_string])
					);
					continue;
				}

				const face = Faces.fromString(face_string);
				if (face === undefined) continue; // Skip invalid faces
				const atlas_id = this.textureRegistry.getAtlasTileId(textures[face_string]);
				view.setTile(face, atlas_id);
			}
		}
		
		view.ao_exponent = json_data.ambient_occlusion_exponent ?? 1.0;
		
		const isotropic = json_data.isotropic ?? false;
		if (typeof isotropic === "boolean") {
			view.setIsotropicMaskAll(isotropic);
		} else if (typeof isotropic === "object") {
			for (const face_string in isotropic) {
				if (face_string === "side") {
					view.setIsotropicMaskSide(isotropic[face_string]);
					continue;
				}
				const face = Faces.fromString(face_string);
				if (face === undefined) continue; // Skip invalid faces
				view.setIsotropicMask(face, isotropic[face_string]);
			}
		}

		return id;
	}

	parseMaterialJson(json) {
		for (const name in json) {
			const id = this.parseMaterialEntry(json[name]);
			this.material_data.name_to_id.set(name, id);
		}
	}

	getMaterialId(name) {
		return this.material_data.name_to_id.get(name);
	}

	getMaterialById(id) {
		this.cube_material_view.id = id;
		return this.cube_material_view;
	}
}