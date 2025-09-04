import * as THREE from "three";
import Chunk from "./voxel_engine/chunk.js";
import { buffer } from "three/tsl";


export class ChunkPipeline {
	static dynamic_layout = [
		{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: "uniform" } }, // Camera transform
	];
	static static_layout = [
		{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: "read-only-storage" } }, // Geometry data
		{ binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: "read-only-storage" } }, // Texture data
		{ binding: 2, visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX, texture: { viewDimension: "2d" } }, // Terrain texture
		{ binding: 3, visibility: GPUShaderStage.FRAGMENT | GPUShaderStage.VERTEX, sampler: { type: "filtering" } } // Terrain sampler
	]
	static bytes_per_chunk = 16 ** 3 * 12 * 54;
	static bytes_per_chunk_uniform = 4 * 4; // 3 ints 
	static bytes_per_quad_instance = 3 * 4; // 2 uint32s
	static bytes_per_chunk_id = 4;

	constructor() {
		this.render_format = navigator.gpu.getPreferredCanvasFormat();
		this.sample_count = 4; // 4x MSAA - can be 1, 4, or 8

		this.chunk_cnt = 20;
	}

	async getGpuContext() {
		const gpu = navigator.gpu;
		if (!gpu) {
			throw new Error("WebGPU is not supported in this browser.");
		}
		const adapter = await gpu.requestAdapter();
		if (!adapter) {
			throw new Error("No WebGPU adapter found.");
		}
		const device = await adapter.requestDevice();
		return this.device = device;
	}

	createShaderModule(code) {
		this.module = this.device.createShaderModule({
			code: code,
			label: "Chunk shader"
		});
	}

	createTerrainTexture(bitmap) {
		this.terrain_sampler = this.device.createSampler({
			magFilter: "nearest",
			minFilter: "nearest",
		});
		this.terrain_texture = this.device.createTexture({
			dimension: "2d",
			format: this.render_format,
			size: [bitmap.width, bitmap.height],
			usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
		})
		this.device.queue.copyExternalImageToTexture(
			{ source: bitmap },
			{ texture: this.terrain_texture },
			[bitmap.width, bitmap.height]
		);
	}

	createBuffers(geometry_data, texture_data) {
		this.quad_buffer = this.device.createBuffer({
			size: this.chunk_cnt * ChunkPipeline.bytes_per_chunk,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
		});

		this.geometry_ssbo = this.device.createBuffer({
			size: geometry_data.byteLength,
			usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
		});
		this.device.queue.writeBuffer(this.geometry_ssbo, 0, geometry_data);

		// this.mvp_buffer = this.device.createBuffer({
		// 	size: 16 * 4, // 16 floats for a 4x4 matrix
		// 	usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		// });

		// this.chunk_id_buffer = this.device.createBuffer({
		// 	size: ChunkPipeline.bytes_per_chunk_id * 4, // 4 uints for 4 vertices
		// 	usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
		// });

		// this.chunk_uniform_buffer = this.device.createBuffer({
		// 	size: this.chunk_cnt * ChunkPipeline.bytes_per_chunk_uniform,
		// 	usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
		// });
		this.uniform_buffer = this.device.createBuffer({
			size: 24 * 4, // 16 floats for a 4x4 matrix + 4 uints for chunk position + 1 uint for time
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		})

		this.texture_ssbo = this.device.createBuffer({
			size: texture_data.byteLength,
			usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.VERTEX,
		});
		console.log(texture_data[1200], texture_data);
		this.device.queue.writeBuffer(this.texture_ssbo, 0, texture_data);
	}

	createBindGroups() {
		this.static_data_layout = this.device.createBindGroupLayout({ entries: ChunkPipeline.static_layout });
		this.dynamic_data_layout = this.device.createBindGroupLayout({ entries: ChunkPipeline.dynamic_layout });

		this.static_data_bind_group = this.device.createBindGroup({
			layout: this.static_data_layout,
			entries: [
				{ binding: 0, resource: { buffer: this.geometry_ssbo } },
				{ binding: 1, resource: { buffer: this.texture_ssbo } },
				{ binding: 2, resource: this.terrain_texture.createView() },
				{ binding: 3, resource: this.terrain_sampler }
			]
		});
		this.dynamic_data_bind_group = this.device.createBindGroup({
			layout: this.dynamic_data_layout,
			entries: [
				{ binding: 0, resource: { buffer: this.uniform_buffer } },
			]
		});
	}

	createPipeline() {
		this.pipeline = this.device.createRenderPipeline({
			label: "Chunk render pipeline",
			layout: this.device.createPipelineLayout({
				bindGroupLayouts: [this.static_data_layout, this.dynamic_data_layout]
			}),
			primitive: {
				topology: "triangle-strip",
				cullMode: "back",
				frontFace: "ccw",
			},
			vertex: {
				module: this.module,
				entryPoint: "vs_main",
				buffers: [
					{
						arrayStride: ChunkPipeline.bytes_per_quad_instance,
						stepMode: "instance",
						attributes: [
							{ shaderLocation: 0, offset: 0, format: "uint32x3" },
						]
					},
					// {
					// 	arrayStride: ChunkPipeline.bytes_per_chunk_id,
					// 	stepMode: "vertex",
					// 	attributes: [
					// 		{ shaderLocation: 1, offset: 0, format: "uint32" },
					// 	]	
					// }
				]
			},
			fragment: {
				module: this.module,
				entryPoint: "fs_main",
				targets: [{ format: this.render_format }]
			},
			depthStencil: {
				format: "depth24plus-stencil8",
				depthWriteEnabled: true,
				depthCompare: "less"
			},
			multisample: {
				count: this.sample_count, // Enable MSAA
			}
		});
	}

	async init(code, terrain_bitmap, geometry_data, texture_data) {
		await this.getGpuContext();
		this.createShaderModule(code);
		this.createTerrainTexture(terrain_bitmap);
		this.createBuffers(geometry_data, texture_data);
		this.createBindGroups();
		this.createPipeline();
	}

	setQuadBuffer(offset, buffer, cnt) {
		this.device.queue.writeBuffer(
			this.quad_buffer,
			offset,
			buffer,
			0,
			cnt * ChunkPipeline.bytes_per_quad_instance
		);
	}
}


export class ChunkRenderer {
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @param {THREE.PerspectiveCamera} camera
	 * @param {ChunkPipeline} pipeline
	 */
	constructor(canvas, camera, pipeline) {
		this.canvas = canvas;
		this.camera = camera;
		this.chunk_pipeline = pipeline;
		this.device = pipeline.device;

		this.canvas_size = {
			width: canvas.width,
			height: canvas.height
		}
		this.context = canvas.getContext("webgpu");

		this.util_uint32_array = new Uint32Array(4);
		this.util_matrix = new THREE.Matrix4();
		this.util_matrix_array = new Float32Array(16);
		this.uniform_buffer = new Float32Array(16 + 4 + 4);
		this.uniform_buffer_uint_view = new Uint32Array(this.uniform_buffer.buffer);

		this.updateCanvasContext();
		this.active_pass = false;
	}

	updateCanvasContext() {
		const canvas_context = this.canvas.getContext("webgpu");
		canvas_context.configure({
			device: this.device,
			format: this.chunk_pipeline.render_format,
			alphaMode: "opaque",
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
		});

		// Clean up existing textures
		if(this.depth_texture) this.depth_texture.destroy();
		if(this.multisample_texture) this.multisample_texture.destroy();

		// Create depth buffer
		this.depth_texture = this.device.createTexture({
			size: [this.canvas.width, this.canvas.height],
			format: "depth24plus-stencil8",
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
			sampleCount: this.chunk_pipeline.sample_count, // MSAA depth buffer
		});

		// Create multisample texture for MSAA
		this.multisample_texture = this.device.createTexture({
			size: [this.canvas.width, this.canvas.height],
			format: this.chunk_pipeline.render_format,
			usage: GPUTextureUsage.RENDER_ATTACHMENT,
			sampleCount: this.chunk_pipeline.sample_count, // MSAA color buffer
		});
	}

	createRenderPass() {
		this.encoder = this.device.createCommandEncoder({label: "Chunk render pass encoder"});
		this.render_pass = this.encoder.beginRenderPass({
			colorAttachments: [{
				view: this.multisample_texture.createView(), // Render to MSAA texture
				resolveTarget: this.context.getCurrentTexture().createView(), // Resolve to canvas
				loadOp: "clear",
				storeOp: "store",
				clearValue: { r: 0, g: 0, b: 0, a: 1 }
			}],
			depthStencilAttachment: {
				view: this.depth_texture.createView(),
				depthLoadOp: "clear",
				depthStoreOp: "store",
				depthClearValue: 1.0,
				stencilLoadOp: "clear",
				stencilStoreOp: "store"
			}
		});
	}

	beginPass(time) {
		// if(this.active_pass) {
		// 	throw new Error("Render pass already active. Call endPass() before beginning a new pass.");
		// }
		// this.active_pass = true;
		this.createRenderPass();
		if (this.canvas.width !== this.canvas_size.width || this.canvas.height !== this.canvas_size.height) {
			this.canvas_size.width = this.canvas.width;
			this.canvas_size.height = this.canvas.height;
			this.updateCanvasContext();
		}

		this.util_matrix.multiplyMatrices(
			this.camera.projectionMatrix,
			this.camera.matrixWorldInverse
		);
		this.util_matrix.toArray(this.util_matrix_array);
		this.setMVPMatrix(this.util_matrix_array);
		this.setTime(time);
	
		this.render_pass.setPipeline(this.chunk_pipeline.pipeline);
		this.render_pass.setBindGroup(0, this.chunk_pipeline.static_data_bind_group);
		this.render_pass.setBindGroup(1, this.chunk_pipeline.dynamic_data_bind_group);
		this.render_pass.setVertexBuffer(1, this.chunk_pipeline.chunk_id_buffer);
	}

	setTime(time) {
		this.uniform_buffer_uint_view[20] = time;
	}

	setMVPMatrix(matrix) {
		this.uniform_buffer.set(matrix, 0);
	}

	setChunkPosition(chunk_position) {
		this.uniform_buffer_uint_view.set(chunk_position, 16);
	}

	updateUniforms() {
		this.device.queue.writeBuffer(this.chunk_pipeline.uniform_buffer, 0, this.uniform_buffer);
	}

	/**@param {Chunk} chunk*/
	renderChunk(chunk) {
		// if(!this.active_pass) {
		// 	throw new Error("No active render pass. Call beginPass() before rendering.");
		// }
		this.setChunkPosition(chunk.position);
		this.updateUniforms();
		const { quad_offset, quad_cnt } = chunk.draw_details;
		
		this.render_pass.setVertexBuffer(0, this.chunk_pipeline.quad_buffer, quad_offset);
		
		this.render_pass.draw(4, quad_cnt, 0, 0);
	}

	endPass() {
		// if(!this.active_pass) {
		// 	throw new Error("No active render pass to end.");
		// }
		this.active_pass = false;
		this.render_pass.end();
		this.device.queue.submit([this.encoder.finish()]);
	}
}