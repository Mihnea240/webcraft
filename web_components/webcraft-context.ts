import { compose, shadowRoot, shadowStyle } from 'web-components';
import ResourceLoader from "@world/resource-loader";

@compose("webcraft-context")
export default class WebcraftContext extends HTMLElement {
	@shadowRoot()
	accessor html = `<slot></slot>`;

	@shadowStyle()
	accessor css = `
		:host {
			display: block;
		}
	`;

	public readonly resourceLoader: ResourceLoader;
	private readonly event: CustomEvent<ResourceLoader>;

	constructor() {
		super();
		this.resourceLoader = new ResourceLoader();
		this.event = new CustomEvent("resource-loaded", {
			bubbles: false,
			detail: this.resourceLoader
		});
	}

	get worlds(): NodeListOf<HTMLElement> {
		return this.querySelectorAll(":scope > webcraft-world");
	}

	connectedCallback() {
		this.resourceLoader.init().then(() => { 
			for (const world of this.worlds) {
				world.dispatchEvent(this.event);
			}
		});
	}
}
