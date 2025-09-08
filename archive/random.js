// // parseFlipbook(flipbook_json) {
// // 		this.flipbook_uniform = new Array(this.flipbook_json.length);
// // 		for (let i = 0; i < this.flipbook_json.length; i++) {
// // 			const flipbook = this.flipbook_json[i];
// // 			const uv_data = this.textureUV.get(flipbook.atlas_tile);
// // 			if (!uv_data) {
// // 				// console.warn(`Flipbook texture not found for ${flipbook.atlas_tile}`);
// // 				continue;
// // 			}
// // 			const data = {
// // 				id: i,
// // 				size: uv_data.height,
// // 				...flipbook
// // 			}

// // 			this.flipbook_data.set(flipbook.atlas_tile, data);
// // 			this.flipbook_uniform[i] = this.getAnimationFrame(data, 0);
// // 		}
// // 	}
// // 	updateFlipbook(time) {
// // 		for (const [key, flipbook_data] of this.flipbook_data.entries()) {
// // 			const frame = this.getAnimationFrame(flipbook_data, time);
// // 			this.flipbook_uniform[flipbook_data.id] = frame;
// // 		}
// // 	}
// // 	getAnimationFrame(flipbook_data, time) {
// // 		let speed = (flipbook_data.ticks_per_frame || 1) * 20;
// // 		let frame_index = Math.floor(time / speed);

// // 		if (flipbook_data.frames) {
// // 			return flipbook_data.frames[frame_index % flipbook_data.frames.length];
// // 		}

// // 		return frame_index;
// // 	}

// // 	parseTerrainEntry(entry) {
// // 		let texture_array = Array.isArray(entry.textures) ? entry.textures : [entry.textures];
// // 		for (let i = 0; i < texture_array.length; i++) {
// // 			const texture_name = texture_array[i];
// // 			const id = this.getTextureUVByName(texture_name);
// // 			texture_array[i] = id;
// // 		}

// // 		return texture_array;
// // 	}

// // 	parseTerrainTexture() {
// // 		const texture_data = this.json_data.terrain.texture_data;
// // 		for (const entry in texture_data) {
// // 			const textures_uvs = this.parseTerrainEntry(texture_data[entry]);
// // 			this.name_to_id.atlas_entry.set(entry, this.atlas_entries.length);
// // 			this.atlas_entries.push(textures_uvs);
// // 		}

// // 		delete this.json_data.terrain;
// // 	}

// // 	parseMaterial() {
// // 		for (const entry in this.json_data.blocks) {
// // 			const block = this.json_data.blocks[entry];
// // 			let data = new Array(6);
// // 			if (typeof block.textures === "string") {
// // 				const id = this.getTileByName(block.textures);
// // 				if (id === undefined) {
// // 					console.warn(`Texture ${block.textures} not found for block ${entry}`);
// // 					continue;
// // 				}
// // 				data.fill(id); // Fill all faces with the same texture
// // 				this.name_to_id.material.set(entry, this.materials.length);
// // 				this.materials.push(data);
// // 				continue;
// // 			}

// // 			for (const face in block.textures) {
// // 				const texture_name = block.textures[face];
// // 				const id = this.getTileByName(texture_name);
// // 				if (id === undefined) {
// // 					console.warn(`Texture ${texture_name} not found for block ${entry}`);
// // 					continue;
// // 				}
// // 				if (face === "side") {
// // 					data[Faces.EAST] = id;
// // 					data[Faces.WEST] = id;
// // 					data[Faces.NORTH] = id;
// // 					data[Faces.SOUTH] = id;
// // 					continue;
// // 				}
// // 				const face_id = Faces.fromString(face);
// // 				if (face_id === undefined) {
// // 					console.warn(`Unknown face ${face} for block ${entry}`);
// // 					continue;
// // 				}
// // 				data[face_id] = id;
// // 			}
// // 			this.name_to_id.material.set(entry, this.materials.length);
// // 			this.materials.push(data);
// // 		}
// // 	}

// // 	getMaterialByName(name) {
// // 		const id = this.name_to_id.material.get(name);
// // 		return this.materials[id];
// // 	}
// // 	getMaterialById(id) {
// // 		return this.materials[id];
// // 	}
// // 	getMaterialId(name) {
// // 		return this.name_to_id.material.get(name);
// // 	}

// // 	getTextureUVByName(name) {
// // 		return this.json_data.textureUV.get(name);
// // 	}

// // 	getTileByName(name) {
// // 		const id = this.name_to_id.atlas_entry.get(name);
// // 		return this.atlas_entries[id];
// // 	}
// // 	getTileById(id) {
// // 		return this.atlas_entries[id];
// // 	}
// // 	getTileId(name) {
// // 		return this.name_to_id.atlas_entry.get(name);
// // 	}

// get_texture_name(type, face) {
// 		let block = this.blocks_json[type];
// 		if (!block) return;
// 		let face_string = Faces.toString(face);

// 		if (block.textures[face_string]) {
// 			return block.textures[face_string];
// 		}
// 		if (face !== Faces.TOP && face != Faces.BOTTOM && block.textures.side) {
// 			return block.textures.side;
// 		}

// 		return block.textures;
// 	}

// 	getFaceTextureUV(type, face, variant = 0) {
// 		let texture_name = this.get_texture_name(type, face);
// 		if (!texture_name) return;

// 		let uv = this.textureUV[texture_name];
// 		if (!uv) {
// 			console.warn(`Texture UV not found for ${texture_name}`);
// 			return;
// 		}
// 		return uv;
// 	}

// 	getClassByName(name) {
// 		const class_name = toCammelCase(name);
// 		return this.Blocks[class_name];
// 	}

// createAtlasTexture(path_to_bitmap, settings = this.atlas_settings) {
// 		const ctx = this.offscreen_canvas.getContext('2d');
// 		const { cell_width, cell_height, padding } = settings;
// 		const grid_width = Math.floor(settings.width / (cell_width + padding));
// 		const grid_height = Math.floor(settings.height / (cell_height + padding));
// 		const textureUV = new Map();;
// 		let cell_bit_map = new Array(grid_width * grid_height).fill(null);
// 		let x = 0, y = 0, tile_padding = padding / 2;

// 		for (const [path, bitmap] of path_to_bitmap.entries()) {
// 			const image_width = Math.ceil((bitmap.width + tile_padding) / (cell_width + padding));
// 			const image_height = Math.ceil((bitmap.height + tile_padding) / (cell_height + padding));
// 			let found = false;
// 			// if (image_width !== 1 || image_height !== 1) {
// 			// 	continue;
// 			// }

// 			while (!found) {
// 				let i = 0, j = 0, available = true;
// 				for (i = 0; i < image_width; i++) {
// 					if (!available) break;
// 					for (j = 0; j < image_height; j++) {
// 						let nx = x + i;
// 						let ny = y + j;
// 						if (nx >= grid_width && ny >= grid_height) {
// 							throw new Error(`Atlas texture size exceeded ${nx} ${ny}`);
// 						}
// 						// if (nx > grid_width || ny > grid_height) continue;

// 						if (cell_bit_map[nx + ny * grid_width] !== null) {
// 							available = false;
// 							break;
// 						}
// 					}
// 				}
// 				if (!available) {
// 					x++;
// 					if (x >= grid_width) x = 0, y++;
// 					// y = y % grid_height;
// 					if (y >= grid_height) throw new Error(`Atlas texture size exceeded ${x} ${y}`);
// 					continue;
// 				}
// 				found = true;
// 				for (let i = 0; i < image_width; i++) {
// 					for (let j = 0; j < image_height; j++) {
// 						let nx = x + i;
// 						let ny = y + j;
// 						// nx = nx % grid_width;
// 						// ny = ny % grid_height;
// 						cell_bit_map[nx + ny * grid_width] = 1;
// 					}
// 				}
// 				const pixel_x = x * (cell_width + padding) + tile_padding;
// 				const pixel_y = y * (cell_height + padding) + tile_padding;


// 				ctx.drawImage(bitmap, pixel_x, pixel_y);

// 				for (let i = 0; i < tile_padding; i++) {
// 					// Copy top row 
// 					ctx.drawImage(bitmap, 0, 0, bitmap.width, 1,
// 						pixel_x, pixel_y - i, bitmap.width, 1);
// 					// Copy left column
// 					ctx.drawImage(bitmap, 0, 0, 1, bitmap.height,
// 						pixel_x - i, pixel_y, 1, bitmap.height,);
// 					// Copy right column
// 					ctx.drawImage(bitmap, bitmap.width - 1, 0, 1, bitmap.height,
// 						pixel_x + bitmap.width + i, pixel_y, 1, bitmap.height,);
// 					// Copy bottom row
// 					ctx.drawImage(bitmap, 0, bitmap.height - 1, bitmap.width, 1,
// 						pixel_x, pixel_y + bitmap.height + i, bitmap.width, 1);
// 				}

// 				let packed_data = x << 8 | y;
// 				textureUV.set(path, packed_data);
// 				bitmap.close();
// 			}
// 		}

// 		// const texture = new THREE.CanvasTexture(ctx.canvas);
// 		// texture.minFilter = texture.magFilter = THREE.NearestFilter;
// 		// texture.generateMipmaps = true;
// 		// this.atlas.terrain = texture;

// 		return textureUV;
// 	}


// export default class ChunkMesher{
// 	static maxQuads = 20000;
// 	/**
// 	 * @param {ResourceLoader} resources
// 	 * @param {BlockModel} blocks
// 	 * */
// 	constructor(resources, blocks) {
// 		this.resources = resources;
// 		this.blockModel = blocks;
// 		/**@type {Chunk} */
// 		this.chunk = null;

// 		this.texture_buffer = this.createTextureBuffer();
// 		this.axis_bit_arrays = new Array3D(Chunk.size, Chunk.size, 3);
// 		this.face_masks = new Array3D(Chunk.size, Chunk.size, 6); // 6 faces
// 		this.non_full_blocks = [];
// 		this.util_vec = new THREE.Vector3();
// 		this.util_array = new Array(2);


// 		this.quads_cnt = 0;
// 		this.shared_index_buffer = this.createSharedIndexBuffer();
// 		// this.shared_position_buffer = this.createSharedPositionBuffer();

// 		this.global_uniforms = {
// 			terrain_atlas: {value: this.resources.atlas.terrain},
// 			time: { value: 0 },
// 			atlas_size: { value: new THREE.Vector2(this.resources.atlas.terrain.image.width, this.resources.atlas.terrain.image.height) },
// 			animation_frames: { value: this.blockModel.flipbook_uniform },
// 			geometry_texture: { value: this.blockModel.geometry_texture },
// 			geometry_texture_size: { value: this.blockModel.geometry_texture.image.height } 
// 		}
// 	}

// 	computeChunk(chunk) {
// 		this.chunk = chunk;
// 		this.quads_cnt = 0;
// 		this.texture_buffer.image.data.fill(0);

// 		this.simpleMesher();
// 		return this.createChunkMesh();
// 	}
// 	createSharedIndexBuffer() {
// 		let data = new Uint16Array(ChunkMesher.maxQuads * 6);
// 		let index = 0;
// 		for (let i = 0; i < ChunkMesher.maxQuads; i++) {
// 			data[index++] = i * 4;     // v0
// 			data[index++] = i * 4 + 1; // v1
// 			data[index++] = i * 4 + 2; // v2
// 			data[index++] = i * 4;     // v0
// 			data[index++] = i * 4 + 2; // v2
// 			data[index++] = i * 4 + 3; // v3
// 		}

// 		return new THREE.BufferAttribute(data, 1);
// 	}

// 	createSharedPositionBuffer() {
// 		const data = new Float32Array(ChunkMesher.maxQuads * 4 * 3).fill(1);
// 		return new THREE.BufferAttribute(data, 3);
// 	}

// 	createTextureBuffer(width = 256, height = 256) {
// 		// const data = new Uint32Array(width * height);
// 		// const texture = new THREE.DataTexture(data, width, height);

// 		// texture.format = THREE.RedIntegerFormat;
// 		// texture.type = THREE.UnsignedIntType;
// 		// texture.internalFormat = "R32UI"; // Use 32-bit unsigned integer format
// 		// texture.generateMipmaps = false; // No mipmaps for integer textures
// 		// texture.magFilter = texture.minFilter = THREE.NearestFilter;
// 		// texture.needsUpdate = true;

// 		// return texture;

// 		const data = new Uint32Array(width * height * 2);
// 		const texture = new THREE.DataTexture(data, width, height);
// 		texture.format = THREE.RGIntegerFormat;
// 		texture.type = THREE.UnsignedIntType;
// 		texture.internalFormat = "RG32UI"; // Use 32-bit unsigned integer format
// 		texture.generateMipmaps = false; // No mipmaps for integer textures
// 		texture.magFilter = texture.minFilter = THREE.NearestFilter;
// 		texture.needsUpdate = true;
// 		return texture;
// 	}

// 	putPixel(x, y, value_r, value_g = 0) {
// 		const index = (x + y * this.texture_buffer.image.width) * 2;
// 		this.texture_buffer.image.data[index] = value_r;
// 		this.texture_buffer.image.data[index + 1] = value_g;
// 	}
// 	/**
// 	 * @param {number} x - x in chunk
// 	 * @param {number} y - y in chunk
// 	 * @param {number} z - z in chunk
// 	 * @param {BlockState} state - BlockState instance
// 	 * @param {number} axis - Axis of the quad (0-5)
// 	 * @param {number} rotation - Rotation of the quad (0-3)
// 	 * ```  
// 	 * Red channel                                     Green channel     
// 	 * 4---- 4---- 4---- 3--- 3--- 7------- 7------- | 2-- 9--------- 4---- 1-
// 	 * 1     2     3     4    5    6        7          8   9          10    11
// 	 *```
// 	 * 1 - x in chunk (0-15)  
// 	 * 2 - y in chunk (0-15)  
// 	 * 3 - z in chunk (0-15)  
// 	 * 4 - quad axis facing (0-5)  
// 	 * 5 - block placing face (0-5)
// 	 * 6 - atlas u (0-127)   
// 	 * 7 - atlas v (0-127)  
// 	 * 8 - block rotation around the placing axis (0-3)  
// 	 * 9 - geometry transform id (0-511)  
// 	 * 10 - geometry animation id that points to a pair of a destination transform and a time variable for interpolation
// 	 * 11 - random uv rotation (false/true)
// 	 */
// 	packQuadData(x, y, z, state, geometry_id, axis) {
// 		let data_r = 0 >>> 0;
// 		data_r += (x & 15) << 28;
// 		data_r += (y & 15) << 24;
// 		data_r += (z & 15) << 20;
// 		data_r += (axis & 7) << 17;

// 		const placing = state.getProperty(BlockState.PLACING) || 0;
// 		const facing = state.getProperty(BlockState.FACING) || 0;
// 		const uvs = state.getUvs(axis);

// 		data_r += (placing & 7) << 14;
// 		data_r += uvs;

// 		// const geometry_id = state.getProperty(BlockState.GEOMETRY);
// 		let data_g = 0 >>> 0;
// 		data_g += (facing & 3) << 30;
// 		data_g += (geometry_id & 511) << 21; 
// 		// data_g += (state.getProperty(BlockState.ANIMATION) & 255) << 16; // Animation ID

// 		this.util_array[0] = data_r;
// 		this.util_array[1] = data_g;

// 		return this.util_array;
// 	}

// 	generateAxisBitArrays() {
// 		let value, x_index, y_index, z_index;
// 		const prop_id = BlockState.FULL_BLOCK;
// 		for (let x = 0; x < Chunk.size; x++) {
// 			for (let y = 0; y < Chunk.size; y++) {
// 				for (let z = 0; z < Chunk.size; z++) {
// 					value = this.chunk.getBlockType(x, y, z);
// 					if(!value) continue;
// 					if (value.getProperty(BlockState.FULL_BLOCK)) {
// 						x_index = this.axis_bit_arrays.index(y, z, 0);
// 						this.axis_bit_arrays.data[x_index] |= 1 << x; // x axis

// 						y_index = this.axis_bit_arrays.index(x, z, 1);
// 						this.axis_bit_arrays.data[y_index] |= 1 << y; // y axis

// 						z_index = this.axis_bit_arrays.index(x, y, 2);
// 						this.axis_bit_arrays.data[z_index] |= 1 << z; // z axis
// 					} else {
// 						this.non_full_blocks.push([x, y, z, value]);
// 					}
// 				}
// 			}
// 		}
// 	}

// 	generateFaceMasks() {
// 		let index = 0, value = 0;
// 		for (let axis = 0; axis < 3; axis++) {
// 			for (let x = 0; x < Chunk.size; x++) {
// 				for (let y = 0; y < Chunk.size; y++) {
// 					value = this.axis_bit_arrays.get(x, y, axis);

// 					this.face_masks.set(x, y, axis, value & ~(value >> 1));
// 					this.face_masks.set(x, y, Faces.opposite(axis), value & ~(value << 1));
// 				}
// 			}
// 		}
// 	}

// 	*visibleFaces(axis) {
// 		for (let i = 0; i < Chunk.size; i++) {
// 			for (let j = 0; j < Chunk.size; j++) {
// 				let mask = this.face_masks.get(i, j, axis);

// 				while (mask) {
// 					let face_index = ctz32(mask); // Get the index of the first set bit
// 					mask &= (mask - 1); // Clear the lowest set bit

// 					switch (axis < 3 ? axis : 5 - axis) { // Convert to 0-2 range for axis
// 						case 0: this.util_vec.set(face_index, i, j); break;
// 						case 1: this.util_vec.set(i, face_index, j); break;
// 						case 2: this.util_vec.set(i, j, face_index); break;
// 					}
// 					yield this.util_vec;
// 				}
// 			}
// 		}
// 	}

// 	simpleMesher() {
// 		this.generateAxisBitArrays();
// 		this.generateFaceMasks();

// 		for (let axis = 0; axis < 6; axis++) {
// 			for (const face of this.visibleFaces(axis)) {
// 				let x = face.x, y = face.y, z = face.z;
// 				let block_type = this.chunk.getBlockType(x, y, z);

// 				const cubes = block_type.getCubes();
// 				for (let i = 0; i < cubes.length; i++) { 
// 					let packed_data = this.packQuadData(x, y, z, block_type, cubes[i], axis);

// 					let quad_x = this.quads_cnt % this.texture_buffer.image.width;
// 					let quad_y = Math.floor(this.quads_cnt / this.texture_buffer.image.width);

// 					this.putPixel(quad_x, quad_y, packed_data[0], packed_data[1]);
// 					this.quads_cnt++;
// 				}
// 			}
// 		}

// 		for (const [x, y, z, type] of this.non_full_blocks) {
// 			// const geometry_id = type.getProperty(BlockState.GEOMETRY);
// 			const cubes = type.getCubes();

// 			for (let i = 0; i < cubes.ids.length; i++) {
// 				for (let axis = 0; axis < 6; axis++) {
// 					if ((cubes.masks[i] & (1 << axis))) continue;
// 					// console.log(cubes.masks[i], axis, cubes.ids[i]);
// 					let packed_data = this.packQuadData(x, y, z, type, cubes.ids[i], axis);

// 					let quad_x = this.quads_cnt % this.texture_buffer.image.width;
// 					let quad_y = Math.floor(this.quads_cnt / this.texture_buffer.image.width);

// 					this.putPixel(quad_x, quad_y, packed_data[0], packed_data[1]);
// 					this.quads_cnt++;
// 				}
// 			}
// 		}

// 		console.log(`Generated ${this.quads_cnt} quads.`);
// 	}
// 	/**
// 	 * @param {BlockState} type  
// 	 */
// 	pushCubes(x, y, z, type) {
// 		const cubes = type.getCubes();
// 		for (let i = 0; i < cubes.ids.length; i++) {
// 			for (let axis = 0; axis < 6; axis++) {
// 				if ((cubes.masks[i] & (1 << axis))) continue;
// 				const packed_data = this.packQuadData(x, y, z, type, cubes.ids[i], axis);

// 				const quad_x = this.quads_cnt % this.texture_buffer.image.width;
// 				const quad_y = Math.floor(this.quads_cnt / this.texture_buffer.image.width);

// 				this.chunk.block_to_texture_id.set(x, y, z, this.quads_cnt);

// 				this.putPixel(quad_x, quad_y, packed_data[0], packed_data[1]);
// 				this.quads_cnt++;
// 			}
// 		}
// 	}


// 	createChunkMesh() {
// 		const uniforms = {
// 			vertex_data: { value: this.texture_buffer },
// 			chunk_position: { value: this.chunk.position },
// 			vertex_data_size: { value: new THREE.Vector2(this.texture_buffer.image.width, this.texture_buffer.image.height) },
// 			...this.global_uniforms
// 		}
// 		const material = new THREE.ShaderMaterial({
// 			uniforms: uniforms,
// 			vertexShader: this.resources.greedyVertexText,
// 			fragmentShader: this.resources.greedyFragmentText,
// 			glslVersion: THREE.GLSL3,
// 			// transparent: true,
// 			alphaTest: 0.5,	
// 			depthWrite: true,
// 			depthTest: true,
// 			blending: THREE.NormalBlending,
// 			// side: THREE.DoubleSide,
// 		});

// 		const geometry = new THREE.BufferGeometry();
// 		// geometry.setAttribute("position", this.shared_position_buffer);
// 		geometry.setIndex(this.shared_index_buffer);
// 		geometry.setDrawRange(0, this.quads_cnt * 6); // 6 indices per quad, not 4 vertices
// 		geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1000);

// 		return this.chunk.mesh = new THREE.Mesh(geometry, material);
// 	}
// }

// createQuadInstanceBase() {
	// // 	const vertecies = new Float32Array(4 * 3);
	// // 	const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);

	// // 	const geometry = new THREE.BufferGeometry();
	// // 	geometry.setAttribute("position", new THREE.BufferAttribute(vertecies, 3));
	// // 	geometry.setIndex(new THREE.BufferAttribute(indices, 1));

	// // 	return geometry;
	// // }

	// // createTransformsSSBO() {
	// // 	const data = this.resources.blockModel.geometry_texture.image.data;
	// // 	const ssbo = new THREE.StorageBufferAttribute(data, 16);
	// // 	return ssbo;
	// // }

	// // createQuadSSBO() {
	// // 	return new THREE.StorageBufferAttribute(
	// // 		new Uint32Array(Chunk.size * Chunk.size * Chunk.size * 6 * 2)
	// // 	);
	// // }

	// // createMaterial() {
	// // 	const material = new THREE.MeshBasicNodeMaterial();
	// // 	const transformsNode = storage(this.transforms_ssbo, 'transform', this.transforms_ssbo.count);
	// // 	const atlasNode = texture(this.resources.atlas.terrain);
	// // 	const timeNode = uniform(0, 'f32');
	// // 	const chunkPositionNode = uniform(new THREE.Vector3(0), 'vec3');

	// // 	const vertexCode = wgsl(this.resources.vertexShaderWGSL);
	// // 	const fragmentCode = wgsl(this.resources.fragmentShaderWGSL);

	// // 	// Add the nodes to the material
	// // 	material.transformsStorage = transformsNode;
	// // 	material.terrainAtlas = atlasNode;
	// // 	material.time = timeNode;
	// // 	material.chunkPosition = chunkPositionNode;

	// // 	material.vertexNode = vertexCode;
	// // 	material.fragmentNode = fragmentCode;

	// // 	return material;
	// // }

	// // createMaterial() {
	// // 	// Use a concrete NodeMaterial subclass, not NodeMaterial directly
	// // 	const material = new THREE.MeshBasicNodeMaterial();

	// // 	// Storage buffer (make sure this.transforms_ssbo is a WebGPU-compatible buffer!)
	// // 	const transformsNode = storage(this.transforms_ssbo, 'transform', this.transforms_ssbo.count);

	// // 	// Texture
	// // 	const atlasNode = texture(this.resources.atlas.terrain);

	// // 	// Uniforms
	// // 	const timeNode = uniform(0); // type inferred
	// // 	const chunkPositionNode = uniform(new THREE.Vector3(0));

	// // 	// Wrap WGSL source in WGSLNode
	// // 	const vertexNode = wgslFn(this.resources.vertexShaderWGSL);
	// // 	const fragmentNode = wgslFn(this.resources.fragmentShaderWGSL);

	// // 	// Attach nodes to material (so you can pass them into WGSL)
	// // 	material.transformsStorage = transformsNode;
	// // 	material.terrainAtlas = atlasNode;
	// // 	material.time = timeNode;
	// // 	material.chunkPosition = chunkPositionNode;

	// // 	// Replace shader stages
	// // 	material.vertexNode = vertexNode();
	// // 	material.fragmentNode = fragmentNode;

	// // 	return material;
	// // }

	// createMaterial() {
	// 	return createChunkMaterial(this.resources, this.transforms_ssbo);
	// }


	// createMesh() {
	// 	// const geometry = this.createQuadInstanceBase();
	// 	// geometry.setAttribute("quad_instance", this.instance_storage);

	// 	// return new THREE.InstancedMesh(geometry, this.material, this.quad_cnt);

	// 	const geometry = new THREE.BoxGeometry(1);
	// 	const mesh = new THREE.Mesh(geometry, this.material);
	// 	return mesh;
// }
	
/**
	//  * @param {BlockState} type  
	//  */
	// pushCubes(x, y, z, type) {
	// 	const cubes = type.getCubes();
	// 	for (let i = 0; i < cubes.ids.length; i++) {
	// 		for (let axis = 0; axis < 6; axis++) {
	// 			if ((cubes.masks[i] & (1 << axis))) continue;
	// 			const packed_data = this.packQuadData(x, y, z, type, cubes.ids[i], axis);

	// 			this.chunk.block_to_texture_id.set(x, y, z, this.quad_cnt);
	// 			this.instance_storage.array[this.quad_cnt * 2] = packed_data[0];
	// 			this.instance_storage.array[this.quad_cnt * 2 + 1] = packed_data[1];
	// 			this.quad_cnt++;
	// 		}
	// 	}
// }
	
	// import * as THREE from "three"
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import World from "./minecraft/world.js";
// import ChunkMesher from "./minecraft/voxel_engine/chunk_mesher.js";
// import Chunk from "./minecraft/voxel_engine/chunk.js";
// import BlockModel from "./minecraft/blocks.js";
// import CreativeFly from "./minecraft/fly-controls.js";
// import ResourceLoader from "./minecraft/resource-loader.js";
// import Stats from "stats.js"
// import BlockState from "./minecraft/voxel_engine/block_state.js";

// export default class MinecraftView extends HTMLElement {

// 	static css = (function () {
// 		const style = new CSSStyleSheet();
// 		style.replaceSync(/*css*/`
// 			:host {
// 				display: block;
// 			}
// 			div{
// 				position: absolute;
// 			}

// 			#canvas{
// 				width: 100%;
// 				height: 100%;
// 			}
// 		`);
// 		return style;
// 	})();

// 	static shadowDom =/*html*/`
// 		<canvas id="canvas"></canvas>
// 	`;
// 	static observedAttributes = ["src"]
// 	constructor() {
// 		super();
// 		this.attachShadow({ mode: 'open' });
// 		this.shadowRoot.innerHTML = MinecraftView.shadowDom;
// 		this.shadowRoot.adoptedStyleSheets = [MinecraftView.css];

// 		this.resourceLoader = new ResourceLoader();
// 	}

// 	/**@returns {HTMLCanvasElement} */
// 	get canvas() {
// 		return this.shadowRoot.querySelector('#canvas');
// 	}

// 	attributeChangedCallback(name, oldValue, newValue) {
// 		if (name === "src") {

// 		}
// 	}

// 	connectedCallback() {
// 		this.initThree();
// 	}
	

// 	initThree() {
// 		this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
// 		this.scene = new THREE.Scene();
// 		this.setCanvasSize();

// 		this.camera = new THREE.PerspectiveCamera(70, this.canvas.width / this.canvas.height, 0.0001, 100);

// 		this.camera.position.set(0, 20, 0);
// 		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
// 		this.scene.add(this.camera);

// 		this.controls = new CreativeFly(this.camera, this.canvas);

// 		// this.renderer.setClearColor(0x87CEEB); // Sky blue color
// 		// Setup canvas for keyboard events
// 		this.canvas.tabIndex = 0;
// 		this.canvas.focus();

// 		// Initialize clock for delta time
// 		this.clock = new THREE.Clock();

// 		const axesHelper = new THREE.AxesHelper(16); // size = 1 unit
// 		this.scene.add(axesHelper);

// 		this.stats = new Stats();
// 		this.stats.showPanel(0); // 0: fps, 1: ms, 2: memory
// 		// this.stats.showPanel(2);
// 		document.body.appendChild(this.stats.dom);
// 		this.main();
// 	}

// 	async testAtlas() {
// 		const geometry = new THREE.BoxGeometry(1, 1, 1);
// 		const material = new THREE.MeshBasicMaterial({
// 			map: this.resourceLoader.atlas.terrain,
// 			side: THREE.DoubleSide,
// 			transparent: true,
// 		});
// 		const mesh = new THREE.Mesh(geometry, material);
// 		mesh.position.set(0, 20, 0);
// 		mesh.scale.set(10, 10, 10)
// 		this.scene.add(mesh);
// 	}

// 	async main() {
// 		// await this.testAtlas();
// 		// await this.resourceLoader.loadShaders();
// 		this.blockModel = await this.resourceLoader.init();
// 		BlockState.blockModel = this.blockModel;
// 		BlockState.computePackingMasks();
// 		this.testAtlas();

// 		this.chunk = new Chunk();
// 		this.chunk.generetaChunkData();

		
// 		this.mesher = new ChunkMesher(this.resourceLoader, this.blockModel);
// 		const mesh = this.mesher.computeChunk(this.chunk);

// 		this.scene.add(mesh);
// 		this.renderer.setAnimationLoop(this.animate.bind(this));
// 	}

// 	animate(time) {
// 		this.chunk.mesh.material.uniforms.time.value = time / 1000; // Convert to seconds
// 		this.stats.update();
// 		this.controls?.update(0.01);
// 		this.renderer.render(this.scene, this.camera);
// 	}
// }

// customElements.define('minecraft-view', MinecraftView);

/**
	 * @param {number} x - x in chunk
	 * @param {number} y - y in chunk
	 * @param {number} z - z in chunk
	 * @param {BlockState} state - BlockState instance
	 * @param {number} axis - Axis of the quad (0-5)
	 * @param {number} rotation - Rotation of the quad (0-3)
	 * ```  
	 * Red channel                                     Green channel     
	 * 4---- 4---- 4---- 3--- 3--- 7------- 7------- | 2-- 9--------- 4---- 1-
	 * 1     2     3     4    5    6        7          8   9          10    11
	 *```
	 * 1 - x in chunk (0-15)  
	 * 2 - y in chunk (0-15)  
	 * 3 - z in chunk (0-15)  
	 * 4 - quad axis facing (0-5)  
	 * 5 - block placing face (0-5)
	 * 6 - atlas u (0-127)   
	 * 7 - atlas v (0-127)  
	 * 8 - block rotation around the placing axis (0-3)  
	 * 9 - geometry transform id (0-511)  
	 * 10 - geometry animation id that points to a pair of a destination transform and a time variable for interpolation
	 * 11 - random uv rotation (false/true)
	 */
	// packQuadData(x, y, z, state, geometry_id, axis) {
	// 	let data_r = 0 >>> 0;
	// 	data_r += (x & 15) << 28;
	// 	data_r += (y & 15) << 24;
	// 	data_r += (z & 15) << 20;
	// 	data_r += (axis & 7) << 17;

	// 	const placing = state.getProperty(BlockState.PLACING) || 0;
	// 	const facing = state.getProperty(BlockState.FACING) || 0;
	// 	const uvs = state.getUvs(axis);

	// 	data_r += (placing & 7) << 14;
	// 	data_r += uvs;

	// 	let data_g = 0 >>> 0;
	// 	data_g += (facing & 3) << 30;
	// 	data_g += (geometry_id & 511) << 21;

	// 	this.util_array[0] = data_r;
	// 	this.util_array[1] = data_g;

	// 	return this.util_array;
	// }

	// testAtlas() {
		// 	const geometry = new THREE.BoxGeometry(1, 1, 1);
		// 	const material = new THREE.MeshBasicMaterial({
		// 		map: this.,
		// 		transparent: true,
		// 	});
		// 	const mesh = new THREE.Mesh(geometry, material);
		// 	mesh.position.set(0, 20, 0);
		// 	mesh.scale.set(10, 10, 10)
		// 	this.scene.add(mesh);
		// }
	
		// showDebugInfo() {
		// 	const axesHelper = new THREE.AxesHelper(16); 
		// 	this.stats = new Stats();
	
		// 	this.stats.showPanel(0); // 0: fps, 1: ms,
		// 	document.body.appendChild(this.stats.dom);
	
		// 	this.scene.add(axesHelper);
		// 	this.scene.add(axesHelper);
	
		// 	this.testAtlas();
		// }

		// export default class Player {
// 	constructor(name) {
// 		this.name = name;

// 		this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
// 		/**@type {World | null} */
// 		this.world = null;
// 	}

// 	createRenderer(canvas) {
// 		// this.renderer = new THREE.WebGLRenderer({
// 		// 	canvas: canvas,
// 		// 	antialias: true,
// 		// });
// 		// this.renderer.setSize(canvas.width, canvas.height);
// 		// this.renderer.setPixelRatio(window.devicePixelRatio);
// 		// this.renderer.setClearColor(0); // Sky blue color
// 		this.renderer = new THREE.WebGPURenderer({
// 			canvas: canvas,
// 			antialias: true,
// 		})
// 		this.renderer.setSize(canvas.width, canvas.height);
// 		this.renderer.setPixelRatio(window.devicePixelRatio);
// 		this.renderer.setClearColor(0); // Sky blue color
// 	}

// 	setControls(canvas) {
// 		this.controls = new CreativeFly(this.camera, canvas);
// 	}

// 	setWorld(world) {
// 		if (world === this.world) return;
// 		if (this.world) this.world.removePlayer(this);

// 		this.world.addPlayer(this);
// 		this.camera.position.set(0, 0, 0); // Set initial position
// 		this.camera.lookAt(new THREE.Vector3(0, 1, -1));
// 	}

// 	async renderWorld(delta) {
// 		this.controls.update();
// 		await this.renderer.renderAsync(this.world.scene, this.camera);
// 	}
// }

// export default class CreativeFly {
// 	/**
// 	 * @param {THREE.Camera} camera*/
// 	constructor(camera, domElement) {
// 		this.camera = camera;
// 		this.domElement = domElement;
// 		this.speed = 0.05; // Movement speed
// 		this.activeKeys = {};

// 		this.domElement.addEventListener('keydown', this.onKeyDown.bind(this));
// 		this.domElement.addEventListener('keyup', this.onKeyUp.bind(this));
// 		this.domElement.addEventListener('pointermove', this.onPointerMove.bind(this));
// 		this.domElement.addEventListener("click", () => {
// 			this.domElement.requestPointerLock();
// 		});

// 		window.addEventListener('blur', () => {
// 			for (let key in this.activeKeys) this.activeKeys[key] = false;
// 		});

// 		this.new_position = camera.position.clone();
// 		this.new_quaternion = camera.quaternion.clone();
// 	}

// 	onKeyDown(ev) {
// 		switch (ev.key) {
// 			case 'w': case 'W': this.activeKeys['w'] = true; break; // Move forward
// 			case 's': case 'S': this.activeKeys['s'] = true; break; // Move backward
// 			case 'd': case 'D':this.activeKeys['d'] = true; break; // Move left
// 			case 'a': case 'A':this.activeKeys['a'] = true; break; // Move right
// 			case ' ':this.activeKeys[' '] = true; break; // Move up
// 			case 'Shift': this.activeKeys['Shift'] = true; break; // Move down
// 			default: return; // Exit this handler for other keys
// 		}
// 	}
// 	onKeyUp(ev) {
// 		switch (ev.key) {
// 			case 'w': case 'W': this.activeKeys['w'] = false; break; // Move forward
// 			case 's': case 'S': this.activeKeys['s'] = false; break; // Move backward
// 			case 'd': case 'D': this.activeKeys['d'] = false; break; // Move left
// 			case 'a': case 'A': this.activeKeys['a'] = false; break; // Move right
// 			case ' ': this.activeKeys[' '] = false; break; // Move up
// 			case 'Shift': this.activeKeys['Shift'] = false; break; // Move down
// 			default: return; // Exit this handler for other keys
// 		}
// 	}

// 	move() {
// 		let cameraDirection = new THREE.Vector3();
// 		this.camera.getWorldDirection(cameraDirection);

// 		// Get the right vector (cross product of up and forward)
// 		let cameraRight = new THREE.Vector3().crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
// 		cameraDirection.normalize();
// 		cameraRight.normalize();
		
// 		for (const key in this.activeKeys) {
// 			if (!this.activeKeys[key]) continue; // Skip if the key is not pressed
// 			switch (key) {
// 				case 'w': this.new_position.addScaledVector(cameraDirection, this.speed); break; // Move forward
// 				case 's': this.new_position.addScaledVector(cameraDirection, -this.speed); break; // Move backward
// 				case 'd': this.new_position.addScaledVector(cameraRight, this.speed); break; // Move right
// 				case 'a': this.new_position.addScaledVector(cameraRight, -this.speed); break; // Move left
// 				case ' ': this.new_position.y += this.speed; break; // Move up
// 				case 'Shift': this.new_position.y -= this.speed; break; // Move down
// 			}
// 		}
// 	}

// 	onPointerMove(ev) {
// 		const sensitivity = 0.002;
// 		const pixelRatio = window.devicePixelRatio || 1;

// 		// Get current euler angles in world space
// 		const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');

// 		// Update yaw (Y-axis rotation) and pitch (X-axis rotation) in world space
// 		// Adjust sensitivity based on device pixel ratio for consistent feel across devices
// 		euler.y -= (ev.movementX * sensitivity) / pixelRatio;
// 		euler.x -= (ev.movementY * sensitivity) / pixelRatio;

// 		// Clamp pitch to prevent camera flipping
// 		euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

// 		// Prevent roll by keeping Z rotation at 0
// 		euler.z = 0;

// 		// Apply the normalized rotation back to the camera
// 		this.new_quaternion.setFromEuler(euler);
// 	}

// 	update(deltaTime) {
// 		// Update camera position
// 		this.move();
// 		this.camera.position.copy(this.new_position);

// 		// Update camera rotation
// 		this.camera.quaternion.copy(this.new_quaternion);
		
// 		// Force Three.js to update matrix calculations
// 		this.camera.updateMatrix();
// 		this.camera.updateMatrixWorld();
// 		this.camera.updateWorldMatrix(true, false); // Force update world matrix
// 	}
// }
