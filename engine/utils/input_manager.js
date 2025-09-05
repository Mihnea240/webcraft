export default class InputManager {
	static sizeObserver = new ResizeObserver(entries => {
		for (const entry of entries) {
			entry.target.html_bounds = entry.contentRect;
		}
	});

	constructor(html_element) {
		this._html_element = null;
		this.html_bounds = null;
		this.shortcuts = new Map();

		this.activeShortcuts = new Set();
		this.frozenShortcuts = new Set();

		this.timer = null;
		this.sequence_timeout = 1000;

		this.mouseMoveHandle = null;

		this.key_pressed = this.handleKeyDown.bind(this);
		this.key_released = this.handleKeyUp.bind(this);
		this.mouse_moved = this.handleMouseMove?.bind(this);

		this.html_element = html_element;
	}

	set html_element(element) {
		if (this._html_element === element) return;
		if (this._html_element) {
			this._html_element.removeEventListener('keydown', this.key_pressed);
			this._html_element.removeEventListener('keyup', this.key_released);
			this._html_element.removeEventListener("pointermove", this.mouse_moved);
			InputManager.sizeObserver.unobserve(this._html_element);
		}
		this._html_element = element;
		if (this._html_element) {
			this._html_element.addEventListener('keydown', this.key_pressed);
			this._html_element.addEventListener('keyup', this.key_released);
			this._html_element.addEventListener("pointermove", this.mouse_moved);
			InputManager.sizeObserver.observe(this._html_element);
		}
	}

	get html_element() {
		return this._html_element;
	}

	normalizeKey(ev) {
		let keys = [];
		if (ev.ctrlKey && ev.key !== 'Control') keys.push('ctrl');
		if (ev.altKey && ev.key !== 'Alt') keys.push('alt');
		if (ev.shiftKey && ev.key !== 'Shift') keys.push('shift');
		if (ev.metaKey && ev.key !== 'Meta') keys.push('meta');

		keys.push(ev.key.toLowerCase());
		keys.push(keys.join('+'));
		return keys;
	}

	getShortcutsContainingKey(key) {
		return this.shortcuts.entries().filter(([k, v]) => {
			return v.composed && v.shortcut.indexOf(key) !== -1;
		});
	}

	handleKeyDown(ev) {
		const keys = this.normalizeKey(ev);
		for (const key of keys) {
			this.activeShortcuts.add(key);
		}
	}

	handleKeyUp(ev) {
		const keys = this.normalizeKey(ev);
		for (const key of keys) {
			this.activeShortcuts.delete(key);
		}
	}

	tick(delta) {
		for (const key of this.activeShortcuts) {
			if (this.frozenShortcuts.has(key)) continue;
			const data = this.shortcuts.get(key);
			if (!data || !data.continuous || data.freeze || data.triggers !== "keydown") continue;
			data.callback(delta);
		}
	}

	handleMouseMove(ev) {
		if (!this.mouseMoveHandle) return;
		const bounds = this.html_bounds || this.html_element.getBoundingClientRect();
		const x = (ev.clientX - bounds.left) / bounds.width;
		const y = (ev.clientY - bounds.top) / bounds.height;

		this.mouseMoveHandle(x, y, ev);
	}

	addShortcut({ shortcut, callback, continuous = false, triggers = "keydown", cooldown }) {
		const data = {
			shortcut,
			callback,
			continuous,
			composed: shortcut.indexOf(',') !== -1,
			triggers,
			cooldown
		}

		this.shortcuts.set(shortcut, data);
		return this;
	}
}