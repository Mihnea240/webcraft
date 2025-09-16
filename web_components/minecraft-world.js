import World from "@world/world";
 
export default class MinecraftWorld extends HTMLElement {
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
		this.shadowRoot.innerHTML = MinecraftWorld.shadowDom;
		this.shadowRoot.adoptedStyleSheets = [MinecraftWorld.css];
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
		return this.querySelectorAll("minecraft-player");
	}

	connectedCallback() {
		if(this.players.length === 0) {
			const player = document.createElement("minecraft-player");
			this.appendChild(player);
		}
	}
}

customElements.define('minecraft-world', MinecraftWorld);