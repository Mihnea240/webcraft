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