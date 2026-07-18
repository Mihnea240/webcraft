import ResourceLoader from "@engine/resource-loader";
import { compose, event, shadowRoot, shadowStyle } from 'web-components';

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
	public ready!: Promise<void>;

	constructor() {
		super();
		this.resourceLoader = new ResourceLoader();
	}   

	@event("request-context")
	onRequestContext(e: CustomEvent) {
		const { callback } = e.detail;
		callback(this.resourceLoader);
	}
}
