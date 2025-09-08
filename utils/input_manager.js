export default class InputManager {
	constructor(html_element, options = {}) {
		this._html_element = null;
		this.html_bounds = null;
		this.eventHandlers = new Map(); // Single map for all event bindings

		this.activeShortcuts = new Set();
		this.frozenShortcuts = new Set();

		this.timer = null;
		this.sequence_timeout = 1000;

		// Set tick mode: 'continuous' (default) or 'immediate'
		this.tickMode = options.tickMode || 'continuous';

		this.key_pressed = this.handleKeyDown.bind(this);
		this.key_released = this.handleKeyUp.bind(this);
		this.mouse_moved = this.handleMouseMove.bind(this);

		// Create instance-specific ResizeObserver
		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				// Only handle resize for our specific element
				if (entry.target === this._html_element) {
					this.html_bounds = entry.contentRect;
					this.handleResize(entry.contentRect);
				}
			}
		});

		this.html_element = html_element;

		this.emptyHandlers = [];
	}

	set html_element(element) {
		if (this._html_element === element) return;
		if (this._html_element) {
			this._html_element.removeEventListener('keydown', this.key_pressed);
			this._html_element.removeEventListener('keyup', this.key_released);
			this._html_element.removeEventListener("pointermove", this.mouse_moved);
			this.resizeObserver.unobserve(this._html_element);
		}
		this._html_element = element;
		if (this._html_element) {
			this._html_element.addEventListener('keydown', this.key_pressed);
			this._html_element.addEventListener('keyup', this.key_released);
			this._html_element.addEventListener("pointermove", this.mouse_moved);
			this.resizeObserver.observe(this._html_element);
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

	handleKeyDown(ev) {
		const keys = this.normalizeKey(ev);
		for (const key of keys) {
			if (this.tickMode === 'continuous') {
				// In continuous mode, just track active keys for tick processing
				this.activeShortcuts.add(key);
			} else {
				// In immediate mode, execute all handlers right away
				const handlers = this.eventHandlers.get(key) || this.emptyHandlers;
				for (const handler of handlers) {
					if (handler.triggers === "keydown") {
						handler.callback(ev);
					}
				}
			}
		}
	}

	handleKeyUp(ev) {
		const keys = this.normalizeKey(ev);
		for (const key of keys) {
			if (this.tickMode === 'continuous') {
				// In continuous mode, remove from active keys
				this.activeShortcuts.delete(key);
			} else {
				// In immediate mode, execute keyup handlers right away
				const handlers = this.eventHandlers.get(key) || this.emptyHandlers;
				for (const handler of handlers) {
					if (handler.triggers === "keyup") {
						handler.callback(ev);
					}
				}
			}
		}
	}

	tick(delta) {
		// Only process tick in continuous mode
		if (this.tickMode !== 'continuous') return;
		
		for (const key of this.activeShortcuts) {
			if (this.frozenShortcuts.has(key)) continue;
			const handlers = this.eventHandlers.get(key) || this.emptyHandlers;
			
			for (const handler of handlers) {
				if (!handler.continuous || handler.freeze || handler.triggers !== "keydown") continue;
				handler.callback(delta);
			}
		}
	}

	handleMouseMove(ev) {
		const handlers = this.eventHandlers.get('mousemove') || [];
		const bounds = this.html_bounds || this.html_element.getBoundingClientRect();
		
		// Create a more complex object with relative coordinates and event
		const mouseData = {
			relative: {
				x: (ev.clientX - bounds.left) / bounds.width,
				y: (ev.clientY - bounds.top) / bounds.height
			},
			absolute: {
				x: ev.clientX - bounds.left,
				y: ev.clientY - bounds.top
			},
			movement: {
				x: ev.movementX,
				y: ev.movementY
			},
			bounds: {
				width: bounds.width,
				height: bounds.height,
				left: bounds.left,
				top: bounds.top
			},
			event: ev
		};

		handlers.forEach(handler => {
			handler.callback(mouseData);
		});
	}

	handleResize(bounds) {
		const handlers = this.eventHandlers.get('resize') || [];
		handlers.forEach(handler => {
			handler.callback(bounds);
		});
	}

	// Create throttled function wrapper
	createThrottledFunction(fn, throttleMs) {
		let lastCall = 0;
		let timeoutId = null;
		
		return function(...args) {
			const now = Date.now();
			const timeSinceLastCall = now - lastCall;
			
			if (timeSinceLastCall >= throttleMs) {
				lastCall = now;
				fn.apply(this, args);
			} else if (!timeoutId) {
				timeoutId = setTimeout(() => {
					lastCall = Date.now();
					timeoutId = null;
					fn.apply(this, args);
				}, throttleMs - timeSinceLastCall);
			}
		};
	}

	// Unified addEventListener for all event types
	addEventListener(eventType, callback, options = {}) {
		const { throttle, continuous = false, triggers = "keydown", cooldown } = options;
		
		if (!this.eventHandlers.has(eventType)) {
			this.eventHandlers.set(eventType, []);
		}
		
		const handlers = this.eventHandlers.get(eventType);
		const wrappedCallback = (throttle !== undefined && throttle > 0) ? 
			this.createThrottledFunction(callback, throttle) : 
			callback;
		
		const handlerData = {
			callback: wrappedCallback,
			originalCallback: callback,
			continuous,
			triggers,
			cooldown,
			throttle,
			composed: eventType.indexOf(',') !== -1
		};
		
		handlers.push(handlerData);
		return this;
	}

	// Remove event listener
	removeEventListener(eventType, callback) {
		const handlers = this.eventHandlers.get(eventType);
		if (!handlers) return this;
		
		const index = handlers.findIndex(h => h.originalCallback === callback);
		if (index !== -1) {
			handlers.splice(index, 1);
		}
		
		return this;
	}
	
	removeListenersOfType(eventType) {
		this.eventHandlers.delete(eventType);
		return this;
	}

	// Deprecated method - use addEventListener instead
	addShortcut({ shortcut, callback, continuous = false, triggers = "keydown", cooldown, throttle }) {
		return this.addEventListener(shortcut, callback, {
			continuous,
			triggers,
			cooldown,
			throttle
		});
	}

	// Cleanup method for proper disposal
	dispose() {
		if (this._html_element) {
			this._html_element.removeEventListener('keydown', this.key_pressed);
			this._html_element.removeEventListener('keyup', this.key_released);
			this._html_element.removeEventListener("pointermove", this.mouse_moved);
			this.resizeObserver.unobserve(this._html_element);
		}
		this.resizeObserver.disconnect();
		this.eventHandlers.clear();
		this.activeShortcuts.clear();
		this.frozenShortcuts.clear();
		this._html_element = null;
	}
}