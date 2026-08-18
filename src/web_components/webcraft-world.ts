import { ResourcePack } from "src/engine/resource_manager/RP";
import World from "@world/world";
import { compose, event, shadowRoot, shadowStyle } from 'web-components';

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

	public world = new World();

	constructor() {
		super();
	}

	@event("player-join")
	onPlayerJoin(e: CustomEvent) {
		const { player } = e.detail;
		this.registerPlayer(player);
	}

	set resourcePack(pack: ResourcePack) {
		this.world.setResourcePack(pack);
	}

	get resourcePack(): ResourcePack {
		return this.world.resourcePack;
	}

	connectedCallback() {
		// Connection-time setup (the parent app or controller binds the resourcePack directly)
	}

	private registerPlayer(player: any) {
		this.world.addPlayer(player);
	}

	public unregisterPlayer(player: any) {
		this.world.removePlayer(player);
	}
}
