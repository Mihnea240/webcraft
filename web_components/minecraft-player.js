import * as THREE from "three";
import Player from "./minecraft/player.js";
import MinecraftWorld from "./minecraft-world.js";

export default class MinecraftPlayer extends HTMLElement {
	static sizeObserver = new ResizeObserver(entries => {
		let timeoutId;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			timeoutId = null;
			for (const entry of entries) {
				entry.target.setCanvasSize();
			}
		}, 8);
	});

	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host {
				display: block;
				position: relative;
			}

			#canvas{
				overflow: hidden;
				width: 100%;
				height: 100%;
			}
		`);
		return style;
	})();

	static shadowDom =/*html*/`
		<canvas id="canvas"></canvas>
	`;
	// static observedAttributes = ["src"]
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = MinecraftPlayer.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [MinecraftPlayer.css];

		this.player = new Player("Steve", "creative");
	}

	setCanvasSize() {
		const bounds = this.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		
		// Set canvas buffer size (actual resolution) based on device pixel ratio
		this.canvas.width = bounds.width * dpr;
		this.canvas.height = bounds.height * dpr;
		
		// Set display size (CSS size) to the element bounds
		this.canvas.style.width = bounds.width + 'px';
		this.canvas.style.height = bounds.height + 'px';
		
		// Update camera aspect ratio
		this.player.camera.aspect = bounds.width / bounds.height;
		this.player.camera.updateProjectionMatrix();
		this.player.renderer?.updateCanvasContext();
	}

	get canvas() {
		return this.shadowRoot.querySelector('#canvas');
	}

	connectedCallback() {
		this.tabIndex = 0;
		this.canvas.tabIndex = 0;
		MinecraftPlayer.sizeObserver.observe(this);

		// if (this.parentElement instanceof MinecraftWorld) {
		// 	this.player.setWorld(this.parentElement.world);
		// 	this.player.createRenderer(this.canvas);
		// 	this.player.setControls(this.canvas);
		// }
	}
}

customElements.define('minecraft-player', MinecraftPlayer);