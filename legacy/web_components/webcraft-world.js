import World from "@world/world";
import WebcraftPlayer from "./webcraft-player";
import WebcraftItem from "./webcraft-item";
 
export default class WebcraftWorld extends HTMLElement {
	static css = (function () {
		const style = new CSSStyleSheet();
		style.replaceSync(/*css*/`
			:host {
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
		this.shadowRoot.innerHTML = WebcraftWorld.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [WebcraftWorld.css];
		this.world = null;

		this.addEventListener("resource-loaded", (ev) => {
			const customEvent = /** @type {CustomEvent} */ (ev);
			this.world = new World(customEvent.detail);
			
			for (const player of this.players) {
				this.world.addPlayer(player.player);
				player.player.createRenderer(player.canvas);
				player.player.setControls(player.canvas);
			}
			this.world.animate();
		});
	}

	get players() {
		return this.querySelectorAll("webcraft-player");
	}

	connectedCallback() {
		if(this.players.length === 0) {
			const player = document.createElement("webcraft-player");
			this.appendChild(player);
		}
	}
}

customElements.define('webcraft-world', WebcraftWorld);