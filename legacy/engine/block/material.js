import Faces from "@engine/utils/faces";
import AtlasBuilder from "@engine/utils/atlas_builder.js";

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