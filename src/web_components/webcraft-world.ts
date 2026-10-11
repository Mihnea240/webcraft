import { World } from "@engine/world";
import { ResourcePack } from "src/engine/resource_manager/RP";
import { compose, event, shadowRoot, shadowStyle } from 'web-components';

declare global {
	interface DocumentEventMap {
		"request-resource-pack": CustomEvent<World>;
	}
}

@compose("webcraft-world")
export class WebcraftWorld extends HTMLElement {
	@shadowRoot()
	accessor html = `<slot></slot>`;

	@shadowStyle()
	accessor css = `
		:host {
			display: block;
		}
	`;

	public world = new World();

	constructor() {
		super();

		this.addEventListener("player-join", (e: any) => {
			const { player } = e.detail;
			this.registerPlayer(player);
		});
	}

	@event("player-join")
	onPlayerJoin(e: CustomEvent) {
		const { player } = e.detail;
		console.log(`Player ${player.id()} joined the world.`);
		this.registerPlayer(player);
	}

	set resourcePack(pack: ResourcePack) {
		this.world.setResourcePack(pack);
	}

	get resourcePack(): ResourcePack {
		return this.world.resourcePack;
	}

	connectedCallback() {
		const event = new CustomEvent("request-resource-pack", { detail: this.world });
		document.dispatchEvent(event);
	}

	private registerPlayer(player: any) {
		this.world.addPlayer(player);
	}

	public unregisterPlayer(player: any) {
		this.world.removePlayer(player);
	}
}
