import ResourceLoader from "@world/resource-loader";

export default class MinecraftContext extends HTMLElement {
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
		this.shadowRoot.innerHTML = MinecraftContext.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [MinecraftContext.css];

		this.resourceLoader = new ResourceLoader();
		this.event = new CustomEvent("resource-loaded", {
			bubbles: false,
			detail: this.resourceLoader
		});
	}

	get worlds() {
		return this.querySelectorAll(":scope > minecraft-world");
	}

	connectedCallback() {
		this.resourceLoader.init().then(_ => { 
			for (const world of this.worlds) world.dispatchEvent(this.event);
		});
	}
}

customElements.define('minecraft-context', MinecraftContext);