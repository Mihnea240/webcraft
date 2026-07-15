import { compose, shadowRoot, shadowStyle } from 'web-components';
import World from "@world/world";
import WebcraftPlayer from "./webcraft-player";

@compose("webcraft-world")
export default class WebcraftWorld extends HTMLElement {
	@shadowRoot()
	accessor html = `<slot></slot>`;

	@shadowStyle()
	accessor css = `
		:host {
			display: block;
		}
	`;

	public world: World | null = null;

	constructor() {
		super();

		this.addEventListener("resource-loaded", (ev: Event) => {
			const customEvent = ev as CustomEvent;
			this.world = new World(customEvent.detail);
			
			for (const player of this.players) {
				this.world.addPlayer(player.player);
				player.player.createRenderer(player.canvas);
				player.player.setControls(player.canvas);
			}
			this.world.animate();
		});
	}

	get players(): NodeListOf<WebcraftPlayer> {
		return this.querySelectorAll("webcraft-player");
	}

	connectedCallback() {
		if (this.players.length === 0) {
			const player = document.createElement("webcraft-player") as WebcraftPlayer;
			this.appendChild(player);
		}
	}
}
