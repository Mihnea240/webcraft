import Player from "@player/player";

export default class MinecraftPlayer extends HTMLElement {
	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host {
				display: block;
				position: relative;
				resize: both;
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

		this.player = new Player("Steve", { mode: "creative" });
	}

	setCanvasSize() {
		this.player.renderer?.device.queue.onSubmittedWorkDone().then(() => {
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
		});
	}

	get canvas() {
		/** @type {HTMLCanvasElement} */
		const canvas = this.shadowRoot.querySelector('#canvas');
		return canvas;
	}

	connectedCallback() {
		this.tabIndex = 0;
		this.canvas.tabIndex = 0;

		this.setCanvasSize();
	}
}

customElements.define('minecraft-player', MinecraftPlayer);