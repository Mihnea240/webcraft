import WebcraftContext from "./webcraft-context";

export default class WebcraftItem extends HTMLElement {
	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host {
				display: inline-block;
				width: 64px;
				height: 64px;
				background-color: #000000;
			}
			`);
		return style;
	})();

	static shadowDom =/*html*/`
		<canvas></canvas>
	`;

	static observedAttributes = ["item"];

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = WebcraftItem.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [WebcraftItem.css];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "item" && oldValue !== newValue) {
			this.loadItem(newValue);
		}
	}

	loadItem(itemName) {
		//To do
	}
}

customElements.define('webcraft-item', WebcraftItem);