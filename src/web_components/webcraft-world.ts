import { ResourceRegistry } from "src/engine/resource_manager/registry/resourceRegistry";
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

	connectedCallback() {
		// Dispatch event to retrieve the resource loader context from parent webcraft-context
		const event = new CustomEvent("request-context", {
			bubbles: true,
			composed: true,
			detail: {
				callback: (resourceRegistry: ResourceRegistry<any>) => {
					this.world.setResourceRegistry(resourceRegistry);
				}
			}
		});

		this.dispatchEvent(event);
	}

	private registerPlayer(player: any) {
		this.world.addPlayer(player);
	}

	public unregisterPlayer(player: any) {
		this.world.removePlayer(player);
	}
}
