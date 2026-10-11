import * as glm from "gl-matrix"

/**
 * @param {WebGL2RenderingContext} gl
 * @param {string} source
 * @param {} type
 * */
function createShader(gl, source, type) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}
/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLShader} vertex
 * @param {WebGLShader} fragment
 * */
function createProgram(gl, vertex, fragment) {
	const program = gl.createProgram();
	if (!program) {
		console.error("Failed to create program");
		return null;
	}

	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.warn(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	return program;
}


function resizeCanvasToDisplaySize(canvas) {
	const dpr = window.devicePixelRatio || 1;
	const width = canvas.clientWidth * dpr;
	const height = canvas.clientHeight * dpr;

	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
	}
}


export default class MinecraftView extends HTMLElement {

	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host {
				display: block;
			}

			#canvas{
				width: 100%;
				height: 100%;
			}
		`);
		return style;
	})();

	static shadowDom =/*html*/`
		<canvas id="canvas"></canvas>
	`;
	static observedAttributes = ["src"]
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = MinecraftView.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [MinecraftView.css];
	}

	/**@returns {HTMLCanvasElement} */
	get canvas() {
		return this.shadowRoot.querySelector('#canvas');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "src") {

		}
	}

	connectedCallback() {
		this.main();

		let theta = Math.PI / 2;
		const arrayBuffer = new Float32Array([0, 0]);
		document.addEventListener("keydown", (ev) => {
			if (ev.key !== "ArrowLeft") return;

			theta += 0.1;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
			arrayBuffer[0] = Math.cos(theta);
			arrayBuffer[1] = Math.sin(theta);
			this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, arrayBuffer);

			this.render();
		})
	}

	bindBuffers() {
		const buffers = {
			position: this.gl.createBuffer(),
			color: this.gl.createBuffer()
		}
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.color);

		return buffers;
	}

	glSetup() {
		this.gl = this.canvas.getContext('webgl2');
		if (!this.gl) {
			console.error("WebGL2 not supported");
			return;
		}
		resizeCanvasToDisplaySize(this.gl.canvas)
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

		this.buffers = this.bindBuffers();
		this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	async loadProgram(path) {
		const [vertexShaderSource, fragmentShaderSource] = await Promise.all([
			fetch(`${path}/vertex.glsl`).then(res => res.text()),
			fetch(`${path}/fragment.glsl`).then(res => res.text())
		])

		return createProgram(
			this.gl,
			createShader(this.gl, vertexShaderSource, this.gl.VERTEX_SHADER),
			createShader(this.gl, fragmentShaderSource, this.gl.FRAGMENT_SHADER)
		)
	}

	async main() {

		this.glSetup();
		const program = await this.loadProgram("./shaders/test");
		this.gl.useProgram(program);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);

		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([0, 1, 1, -1, -1, -1]),
			this.gl.STATIC_DRAW
		);

		const posLoc = this.gl.getAttribLocation(program, "a_position");
		this.gl.enableVertexAttribArray(posLoc);
		this.gl.vertexAttribPointer(
			posLoc,
			2, this.gl.FLOAT,
			false,
			0, 0
		);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);

		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1]),
			this.gl.STATIC_DRAW
		)

		const colorLoc = this.gl.getAttribLocation(program, "a_color");
		this.gl.enableVertexAttribArray(colorLoc);
		this.gl.vertexAttribPointer(
			colorLoc,
			4, this.gl.FLOAT,
			false,
			0, 0
		);

		this.render();
	}
	
	render() {
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
	}
}

customElements.define('minecraft-view', MinecraftView);


// generateAxisBitArrays() {
// 		let value, x_index, y_index, z_index;
// 		for (let x = 0; x < Chunk.size; x++) {
// 			for (let y = 0; y < Chunk.size; y++) {
// 				for (let z = 0; z < Chunk.size; z++) {
// 					value = this.data.get(x, y, z);
// 					if (value) {
// 						x_index = this.axis_bit_arrays.index(y, z, 0);
// 						this.axis_bit_arrays.data[x_index] |= 1 << x; // x axis

// 						y_index = this.axis_bit_arrays.index(x, z, 1);
// 						this.axis_bit_arrays.data[y_index] |= 1 << y; // y axis

// 						z_index = this.axis_bit_arrays.index(x, y, 2);
// 						this.axis_bit_arrays.data[z_index] |= 1 << z; // z axis
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

// 	*faces(axis) {
// 		for (let i = 0; i < Chunk.size; i++) {
// 			for (let j = 0; j < Chunk.size; j++) {
// 				let mask = this.face_masks.get(i, j, axis);
// 				while (mask) {
// 					let face_index = ctz32(mask); // Get the index of the first set bit
// 					mask &= (mask - 1); // Clear the lowest set bit

// 					switch (axis < 3 ? axis : 5 - axis) { // Convert to 0-2 range for axis
// 						case 0: // X axis
// 							this.util_vec.set(face_index, i, j);
// 							break;
// 						case 1: // Y axis
// 							this.util_vec.set(i, face_index, j);
// 							break;
// 						case 2: // Z axis
// 							this.util_vec.set(i, j, face_index);
// 							break;
// 					}


// 					yield this.util_vec;
// 				}
// 			}
// 		}
// 	}
// 	*quadsFromBinaryArray(array) {
// 		for (let i = 0; i < Chunk.size; i++) {

// 			while (array[i]) {
// 				let y = ctz32(array[i]); // Get the index of the first set bit
// 				let h = ctz32(~(array[i] >> y)); // Get the height of the layer
// 				let w = 1, j = i + 1;
// 				let slice_mask = ((1 << h) - 1) << y; // Create a mask for the slice

// 				while (j < Chunk.size && (slice_mask & array[j]) == slice_mask) {
// 					w++;
// 					array[j] &= ~slice_mask; // Clear the slice from the array
// 					j++;
// 				}
// 				array[i] &= ~slice_mask; // Clear the slice from the array

// 				yield {
// 					at_bit: y,
// 					at_index: i,
// 					width: w,
// 					height: h
// 				};
// 			}
// 		}
// 	}

// 	greedyMesher() {
// 		this.generateAxisBitArrays();
// 		this.generateFaceMasks();

// 		const layers_map = new Array(Chunk.size).fill(null).map(() => new Map());
// 		for (let axis = 0; axis < 6; axis++) {

// 			for (const face of this.faces(axis)) {
// 				let x = face.x, y = face.y, z = face.z;
// 				let blockType = this.getBlock(x, y, z);
// 				let layer_map = null;

// 				switch (axis < 3 ? axis : 5 - axis) {
// 					case Faces.RIGHT: layer_map = layers_map[x]; break;
// 					case Faces.TOP: layer_map = layers_map[y]; break;
// 					case Faces.FRONT: layer_map = layers_map[z]; break;
// 				}

// 				let mask_array = layer_map.get(blockType);
// 				if (!mask_array) {
// 					mask_array = new Uint16Array(Chunk.size);
// 					layer_map.set(blockType, mask_array);
// 				}

// 				switch (axis < 3 ? axis : 5 - axis) { // Convert to 0-2 range for axis
// 					case Faces.RIGHT: mask_array[y] |= 1 << z; break;
// 					case Faces.TOP: mask_array[x] |= 1 << z; break;
// 					case Faces.FRONT: mask_array[y] |= 1 << x; break;
// 				}

// 			}

// 			for (let i = 0; i < Chunk.size; i++) {
// 				for (let [blockType, mask_array] of layers_map[i]) {

// 					for (const data of this.quadsFromBinaryArray(mask_array)) {
// 						switch (axis < 3 ? axis : 5 - axis) { // Convert to 0-2 range for axis
// 							case Faces.RIGHT:
// 								this.addQuad(i, data.at_index, data.at_bit, data.width, data.height, axis, blockType);
// 								break;
// 							case Faces.TOP:
// 								this.addQuad(data.at_index, i, data.at_bit, data.width, data.height, axis, blockType);
// 								break;
// 							case Faces.FRONT:
// 								this.addQuad(data.at_bit, data.at_index, i, data.width, data.height, axis, blockType);
// 								break;
// 						}

// 					}
// 				}
// 			}
// 			for (let i = 0; i < Chunk.size; i++) {
// 				layers_map[i].clear(); // Clear the map for the next axis
// 			}
// 		}

// 	}

// 	addQuad(x, y, z, width, height, axis, type) {
// 		let vertex_index = this.vertices.length / 3;

// 		switch (axis) {
// 			case Faces.RIGHT: {
// 				// +X face - YZ plane (width along Y, height along Z)
// 				this.vertices.push(
// 					x + 1, y, z,                    // v0: bottom-left
// 					x + 1, y + width, z,           // v1: bottom-right  
// 					x + 1, y + width, z + height,  // v2: top-right
// 					x + 1, y, z + height           // v3: top-left
// 				);
// 				break;
// 			}
// 			case Faces.LEFT: {
// 				// -X face - YZ plane (width along Y, height along Z)
// 				this.vertices.push(
// 					x, y + width, z,               // v0: bottom-left
// 					x, y, z,                       // v1: bottom-right
// 					x, y, z + height,              // v2: top-right
// 					x, y + width, z + height       // v3: top-left
// 				);
// 				break;
// 			}
// 			case Faces.TOP: {
// 				// +Y face - XZ plane (width along X, height along Z)
// 				this.vertices.push(
// 					x, y + 1, z,                   // v0: front-left
// 					x + width, y + 1, z,           // v1: front-right
// 					x + width, y + 1, z + height,  // v2: back-right
// 					x, y + 1, z + height           // v3: back-left
// 				);
// 				break;
// 			}
// 			case Faces.BOTTOM: {
// 				// -Y face - XZ plane (width along X, height along Z)
// 				this.vertices.push(
// 					x, y, z + height,              // v0: front-left
// 					x + width, y, z + height,      // v1: front-right
// 					x + width, y, z,               // v2: back-right
// 					x, y, z                        // v3: back-left
// 				);
// 				break;
// 			}
// 			case Faces.FRONT: {
// 				// +Z face - XY plane (width along Y, height along X)
// 				this.vertices.push(
// 					x, y, z + 1,                   // v0: bottom-left
// 					x, y + width, z + 1,           // v1: bottom-right
// 					x + height, y + width, z + 1,  // v2: top-right
// 					x + height, y, z + 1           // v3: top-left
// 				);
// 				break;
// 			}
// 			case Faces.BACK: {
// 				// -Z face - XY plane (width along Y, height along X)
// 				this.vertices.push(
// 					x, y + width, z,               // v0: bottom-left
// 					x, y, z,                       // v1: bottom-right
// 					x + height, y, z,              // v2: top-right
// 					x + height, y + width, z       // v3: top-left
// 				);
// 				break;
// 			}
// 		}

// 		this.indices.push(
// 			vertex_index, vertex_index + 1, vertex_index + 2,
// 			vertex_index, vertex_index + 2, vertex_index + 3)
// 	}
	

// 	getMesh() {
// 		const geometry = new THREE.BufferGeometry();
// 		geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));
// 		geometry.setIndex(this.indices);
// 		geometry.computeVertexNormals();
// 		geometry.computeBoundingBox();
// 		geometry.computeBoundingSphere();

// 		const material = new THREE.MeshNormalMaterial(
// 			{ wireframe: true }
// 		);
// 		const mesh = new THREE.Mesh(geometry, material);
// 		mesh.position.set(0, 0, 0);
// 		return mesh;
// 	}