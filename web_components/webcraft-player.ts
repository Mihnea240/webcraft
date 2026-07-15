import { compose, shadowRoot, shadowStyle, query } from 'web-components';
import Player from "@player/player";

@compose("webcraft-player")
export default class WebcraftPlayer extends HTMLElement {
	@shadowRoot()
	accessor html = `
		<canvas id="canvas"></canvas>
		<slot name="crosshair"></slot>
	`;

	@shadowStyle()
	accessor css = `
		:host {
			display: block;
			position: relative;
			resize: both;
		}

		#canvas {
			overflow: hidden;
			width: 100%;
			height: 100%;
		}

		::slotted([slot="crosshair"]) {
			pointer-events: none;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 32px;
			image-rendering: pixelated;
			mix-blend-mode: difference;
		}
	`;

	@query("#canvas")
	accessor canvas!: HTMLCanvasElement;

	public readonly player: Player;

	constructor() {
		super();
		this.player = new Player("Steve", { mode: "creative" });
	}

	public setCanvasSize(): void {
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

	connectedCallback() {
		this.tabIndex = 0;
		this.canvas.tabIndex = 0;

		this.setCanvasSize();
	}
}
