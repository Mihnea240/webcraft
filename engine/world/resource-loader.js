import JSZip from 'jszip';
import * as THREE from "three"
import BlockModel from "@block_model/blocks";
import { ChunkPipeline } from "./gpu_manager.js";

export default class ResourceLoader {
	constructor(resorce_path = "engine/static_data/") {
		this.chunkPipeline = new ChunkPipeline();
		this.blockModel = new BlockModel();
		this.wgsl_chunk_shader_code = "";
		this.resorce_path = resorce_path;
	}

	async init() {
		const [_, block_data, terrain_texture, zip, flipbook, geometry, classes]
			= await Promise.all([
				this.loadShaders(),
				this.loadBlockMaterials(),
				this.loadTerrainTexture(),
				this.loadTextureFiles(),
				this.loadFlipbook(),
				this.loadGeometry(),
				this.loadBlockClasses(),
			]);
		const path_to_bitmap = await this.extractTextureBitmaps(zip, terrain_texture);
		
		const terrain_bitmap =
			await this.blockModel.textureRegistry.parseTerrainJson(terrain_texture, path_to_bitmap);

		this.blockModel.geometryRegistry.parseJson(geometry);
		this.blockModel.materialRegistry.parseMaterialJson(block_data);
		this.blockModel.classParser.parseJson(classes);
		
		const geometry_buffer = this.blockModel.geometryRegistry.transform_data.tarnsform_buffer;
		const texture_buffer = this.blockModel.materialRegistry.textureRegistry.texture_data.buffer;

		await this.chunkPipeline.init(
			this.wgsl_chunk_shader_code,
			terrain_bitmap,
			geometry_buffer,
			texture_buffer
		);
	}

	minecraftPathTrim(path) {
		return path.replace('textures/', '') + ".png";
	}

	getFileNameFromPath(path) {
		const parts = path.split('/');
		return parts[parts.length - 1].replace(/\..*/, '');
	}

	//TODO
	cachhData() {

	}

	loadShaders() {
		return Promise.all([
			fetch(`${this.resorce_path}/shaders/chunk.wgsl`)
				.then(response => response.text())
				.then(text => this.wgsl_chunk_shader_code = text),
		]);
	}

	async loadBlockMaterials() {
		const response = await fetch(`${this.resorce_path}/blocks.json`);
		return await response.json();
	}
	async loadTerrainTexture() {
		const response = await fetch(`${this.resorce_path}/terrain_texture.json`);
		return await response.json();
	}
	async loadTextureFiles() {
		const response = await fetch(`${this.resorce_path}/blocks.zip`);
		const zipData = await response.arrayBuffer();
		return await JSZip.loadAsync(zipData);
	}
	async loadFlipbook() {
		const response = await fetch(`${this.resorce_path}/flipbook_textures.json`);
		return await response.json();
	}
	async loadGeometry() {
		const response = await fetch(`${this.resorce_path}/geometry.json`);
		return await response.json();
	}
	async loadBlockClasses() {
		const response = await fetch(`${this.resorce_path}/block_classes.json`);
		return await response.json();
	} 

	async extractTextureBitmaps(zip, terrain) {
		const loaded_texture_map = new Map();
		let temp_array = [], path_array, promises = [];

		//Parse terrain_texture.json
		for (const key in terrain.texture_data) {
			const textureData = terrain.texture_data[key].textures;

			if (typeof textureData === "string") {
				temp_array = [textureData];
				path_array = temp_array;
			} else if (Array.isArray(textureData)) {
				path_array = textureData;
			}
			for (let path of path_array) {
				let path_str = path.path || path;
				if (loaded_texture_map.has(path_str)) continue;

				const file = zip.file(this.minecraftPathTrim(path_str));
				if (!file) continue;

				loaded_texture_map.set(path_str, true);
				promises.push(file.async("blob"))
			}

		}
		// Create atlas texture
		const textures = await Promise.all(promises);
		const bitmaps = await Promise.all(textures.map(blob => createImageBitmap(blob)));
		let cnt = 0;

		for (const key of loaded_texture_map.keys()) {
			loaded_texture_map.set(key, bitmaps[cnt++]);
		}

		return loaded_texture_map;
	}
}
