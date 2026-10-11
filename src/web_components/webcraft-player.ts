import { Player, PlayerData } from "@engine/player";
import { compose, event, query, shadowRoot, shadowStyle } from 'web-components';

@compose("webcraft-player")
export class WebcraftPlayer extends HTMLElement {
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
			display: block;
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
	private handleResize = () => {
		const world = this.player?.getWorld();
		this.setCanvasSize(world?.sceneManager.renderer);
	};

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

		// Defer to ensure parent webcraft-world has finished upgrading and listening
		setTimeout(() => {
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

			if (!world) {
				console.error("Player is not associated with a world");
				return;
			}
			
			// Set initial canvas size immediately
			this.setCanvasSize(world.sceneManager.renderer);
			
			// Listen to window resize instead of element ResizeObserver to prevent layout loop crashes
			window.addEventListener("resize", this.handleResize);
		}, 0);
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this.handleResize);

		const world = this.player.getWorld();
		if (world) {
			world.removePlayer(this.player);
		}
	}
}
