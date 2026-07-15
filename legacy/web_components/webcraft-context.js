import ResourceLoader from "@world/resource-loader";
import WebcraftWorld from "./webcraft-world";

export default class WebcraftContext extends HTMLElement {
	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host{
				display: block;
			}
		`);
		return style;
	})();

	static shadowDom =/*html*/`
		<slot></slot>
	`;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = WebcraftContext.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [WebcraftContext.css];

		this.resourceLoader = new ResourceLoader();
		this.event = new CustomEvent("resource-loaded", {
			bubbles: false,
			detail: this.resourceLoader
		});
	}

	get worlds() {
		return this.querySelectorAll(":scope > webcraft-world");
	}

	connectedCallback() {
		this.resourceLoader.init().then(_ => { 
			for (const world of this.worlds) world.dispatchEvent(this.event);
		});
	}
}

customElements.define('webcraft-context', WebcraftContext);