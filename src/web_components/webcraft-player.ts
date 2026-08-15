import Player from "@player/player";
import { PlayerData } from "@player/playerData";
import { compose, event, query, shadowRoot, shadowStyle } from 'web-components';

@compose("webcraft-player")
export default class WebcraftPlayer extends HTMLElement {
	@shadowRoot()
	accessor html = /*html */`
		<canvas id="canvas"></canvas>
		<slot name="crosshair"></slot>
	`;

	@shadowStyle()
	accessor css = /*css */`
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
			/* mix-blend-mode: difference; */
		}
	`;

	@query("#canvas")
	accessor canvas!: HTMLCanvasElement;

	public player!: Player;
	private resizeObserver!: ResizeObserver;

	constructor() {
		super();
		this.tabIndex = 0;
	}

	public setCanvasSize(renderer?: any): void {
		const update = () => {
			const bounds = this.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			
			// Set canvas buffer size (actual resolution) based on device pixel ratio
			this.canvas.width = bounds.width * dpr;
			this.canvas.height = bounds.height * dpr;
			
			// Set display size (CSS size) to the element bounds
			this.canvas.style.width = bounds.width + 'px';
			this.canvas.style.height = bounds.height + 'px';
			
			// Update camera aspect ratio and canvas target size
			this.player.camera.aspect = bounds.width / bounds.height;
			this.player.camera.updateProjectionMatrix();
			this.player.canvasTarget.setSize(bounds.width * dpr, bounds.height * dpr);

			if (renderer && typeof renderer.updateCanvasContext === "function") {
				renderer.updateCanvasContext();
			}
		};

		const device = renderer?.device || renderer?.backend?.device;
		if (device?.queue?.onSubmittedWorkDone) {
			device.queue.onSubmittedWorkDone().then(update);
		} else {
			update();
		}
	}

	@event("keydown")
	onKeyDown(e: KeyboardEvent) {
		this.player.handleKeyDown(e);
	}

	@event("keyup", { target: () => window })
	onKeyUp(e: KeyboardEvent) {
		this.player.handleKeyUp(e);
	}

	@event("click")
	onClick() {
		this.player.controls.lock();
	}

	connectedCallback() {
		const playerData = new PlayerData();
		playerData.name = "Steve";
		
		this.player = new Player(this, playerData);

		const event = new CustomEvent("player-join", {
			bubbles: true,
			composed: true,
			detail: {
				player: this.player
			}
		});

		this.dispatchEvent(event); 

		// Because custom event dispatch is synchronous, the world reference is set immediately
		const world = this.player.getWorld();

		// Watch for size changes and update layout automatically
		this.resizeObserver = new ResizeObserver(() => {
			this.setCanvasSize(world?.sceneManager.renderer);
		});
		this.resizeObserver.observe(this);
	}

	disconnectedCallback() {
		this.resizeObserver.disconnect();

		const world = this.player.getWorld();
		if (world) {
			world.removePlayer(this.player);
		}
	}
}
