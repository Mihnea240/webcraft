import JSZip from 'jszip';
import { TGALoader } from 'three/addons/loaders/TGALoader.js';
import BlockModel from "@engine/block/model";
import { ChunkPipeline } from "@world/gpu_manager.js";

class TgaToBitmap{
	constructor(){
		this.tga_loader = new TGALoader();
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
	}

	load(blob) {
		return new Promise((resolve, reject) => {
			const url = URL.createObjectURL(blob);
			this.tga_loader.load(url, (dataTexture) => {
				const { width, height } = dataTexture.image;
				const imageData = dataTexture.image.data;
				this.canvas.width = width;
				this.canvas.height = height;
				
				// Create ImageData and set the pixel data
				const canvasImageData = this.ctx.createImageData(width, height);
				canvasImageData.data.set(imageData);
				this.ctx.putImageData(canvasImageData, 0, 0);
				
				// Convert canvas to ImageBitmap
				createImageBitmap(this.canvas).then(bitmap => {
					URL.revokeObjectURL(url);
					resolve(bitmap);
				}).catch(err => {
					URL.revokeObjectURL(url);
					reject(err);
				});
			}, undefined, (error) => {
				URL.revokeObjectURL(url);
				reject(error);
			});
		});
	}
}


export default class ResourceLoader {
	constructor(resorce_path = "/resources/") {
		this.chunkPipeline = new ChunkPipeline();
		this.blockModel = new BlockModel();
		this.wgsl_chunk_shader_code = "";
		this.resorce_path = resorce_path;

		this.tgaToBitmap = new TgaToBitmap();
	}

	async init() {
		const [_, block_data, terrain_texture, item_texture, zip, flipbook, geometry, classes]
			= await Promise.all([
				this.loadShaders(),
				this.loadBlockMaterials(),
				this.loadTerrainTexture(),
				this.loadItemTexture(),
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
	async loadItemTexture() {
		const response = await fetch(`${this.resorce_path}/item_texture.json`);
		return await response.json();
	}
	async loadTextureFiles() {
		const response = await fetch(`${this.resorce_path}/textures.zip`);
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

	*pathsOfTextureJson(textureData) {
		const data = textureData.texture_data;

		for (const key in data) {
			const entry = data[key];
			if (typeof entry.textures === "string") {
				yield entry.textures;
			} else if (Array.isArray(entry.textures)) {
				for (const tex of entry.textures) {
					yield tex.path || tex;
				}
			}
		}
	}

	/**@param {JSZip} zip  */
	getFullPath(zip, path) {
		const pngPath = path + ".png";

		if (zip.files[pngPath]) return pngPath;
		const tgaPath = path + ".tga";
		if (zip.files[tgaPath]) return tgaPath;
	}

	/**@param {JSZip} zip  */
	async extractTextureBitmaps(zip, texture_json) {
		const loaded_texture_map = new Map();
		const promises = [];

		for (const path of this.pathsOfTextureJson(texture_json)) {
			if (loaded_texture_map.has(path)) continue;
			const file_path = this.getFullPath(zip, path);

			const file = zip.file(file_path);
			if (!file) {
				console.log("Missing file", file_path, path);
				continue;
			}

			loaded_texture_map.set(path, true);
			promises.push({
				blob: file.async("blob"),
				type: file.name.endsWith('.tga') ? 'image/x-targa' : 'image/png'
			});
		}

		const textures = await Promise.all(promises.map(p => p.blob));

		const bitmaps = await Promise.all(textures.map((blob, index) => {
			if (promises[index].type === 'image/x-targa') {
				return this.tgaToBitmap.load(blob);
			} else {
				return createImageBitmap(blob);
			}
		}));

		let cnt = 0;

		for (const key of loaded_texture_map.keys()) {
			loaded_texture_map.set(key, bitmaps[cnt++]);
		}

		return loaded_texture_map;
	}
}
