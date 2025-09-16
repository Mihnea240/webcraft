class InputHandler {
	constructor() {
		this.callback = null;
		this.originalCallback = null;
		this.constant = true;
		this.trigger = InputManager.PRESS; // Use static constant from InputManager
		this.cooldown = null;
		this.throttle = null;
		this.throttel_timer = null;
	}

	applyThrottle() {
		if (this.throttle == null) return;

		this.callback = (...args) => {
			const now = Date.now();
			const delta = now - this.lastCall;

			if (delta >= this.throttle) {
				this.lastCall = now;
				this.originalCallback.apply(this, args);
			} else if (!this.throttel_timer) {
				this.throttel_timer = setTimeout(() => {
					this.lastCall = Date.now();
					this.throttel_timer = null;
					this.originalCallback.apply(this, args);
				}, this.throttle - delta);
			}
		};
	}
}

class Sequence {
	/** @param {string} pattern*/
	constructor(pattern) {
		this.pattern = pattern;
		this.steps = pattern.split(',').map(step => {
			const trimmedStep = step.trim();
			// const finalStep = trimmedStep === 'space' ? ' ' : trimmedStep;
			const keys = trimmedStep.split('+').map(key => key === 'space' ? ' ' : key);
			return {
				keys: keys,
				chord: trimmedStep // Store the concatenated string for history placement
			};
		});
	}

	isSequence() {
		return this.steps.length > 1;
	}
}

class KeyEntry{
	constructor(ev, pressTime = 0, releaseTime = null, time_out = pressTime) {
		this.pressTime = pressTime;
		this.releaseTime = releaseTime;
		this.time_out = time_out;

		this.sequence_timeout = 100;
		
		// Event objects - store actual events
		this.pressEvent = null;
		this.releaseEvent = null;
		
		// Trigger flags - track if handlers have been called
		this.pressEventTriggered = false;
		this.releaseEventTriggered = false;
	}

	canBePArtOfSequence(now = Date.now()) {
		return this.releaseTime && now - this.time_out <= this.sequence_timeout;
	}

	isActive() {
		return this.releaseTime === null;
	}

	isReleased() {
		return this.releaseTime !== null;
	}

	isExpiered(now = Date.now()) {
		return now - this.time_out > this.sequence_timeout;
	}

	resetTimeout(now = Date.now()) {
		this.time_out = now;
	}

	setPressEventTriggered(event) {
		this.pressEventTriggered = true;
	}

	setReleaseEventTriggered(event) {
		this.releaseEventTriggered = true;
	}

	hasPressEventTriggered() {
		return this.pressEventTriggered;
	}

	hasReleaseEventTriggered() {
		return this.releaseEventTriggered;
	}
}

class KeyHistory{
	constructor() {
		/** @type {Map<string, KeyEntry[]>} */
		this.map = new Map();
		this.sequence_timeout = 5000; // Default 2 seconds

		/**@type {KeyEntry[]} */
		this.empty_history = [];
	}

	getHistory(key) {
		return this.map.get(key) || this.empty_history;
	}

	addKey(key, type, ev = null) {
		const now = Date.now();
		let history = this.map.get(key);

		if (!history) {
			history = [];
			this.map.set(key, history);
		}

		switch (type) {
			case InputManager.PRESS:
				if (this.isKeyActive(key)) {
					const entry = this.getActiveEntry(key);
					entry.pressTime = now;
					entry.pressEvent = ev; // Store the press event
					break;
				}

				const newEntry = new KeyEntry(ev, now, null, now);
				newEntry.pressEvent = ev; // Store the press event
				history.push(newEntry);
				break;
			case InputManager.RELEASE:
				for (let i = history.length - 1; i >= 0; i--) {
					const entry = history[i];

					if(!entry.isReleased()) {
						entry.releaseTime = now;
						entry.time_out = now; // Set timeout to same as release time
						entry.releaseEvent = ev; // Store the release event
						break;
					}
				}
				break;
		}
	}

	resetTimeout(key) {
		const now = Date.now();
		for (const entry of this.getHistory(key)) {
			if(!entry.isReleased()) entry.resetTimeout(now);
		}
	}

	cleanup() {
		const now = Date.now();
		for (const [key, history] of this.map.entries()) {
			const filtered = history.filter((entry) => 
				entry.canBePArtOfSequence(now) || entry.isActive()
			);
			if (filtered.length === 0) {
				this.map.delete(key);
			} else {
				this.map.set(key, filtered);
			}
		}
	}

	clear() {
		this.map.clear();
	}

	isKeyActive(key) {
		return this.getHistory(key)?.some(entry => entry.isActive());
	}
	getActiveEntry(key) {
		return this.getHistory(key)?.findLast(entry => entry.isActive());
	}

	isKeyReleased(key) {
		return this.getHistory(key)?.some(entry => entry.isReleased());
	}
	getReleasedEntry(key) {
		return this.getHistory(key)?.findLast(entry => entry.isReleased());
	}

	getSequencePartCandidates(key, now = Date.now()) {
		return this.getHistory(key)?.findLast(entry => entry.canBePArtOfSequence(now));
	}

	/**@param {string[]} chord  */
	checkChord(chord) {
		return chord.every(key => this.isKeyActive(key));
	}

	updateChord(data) {
		// Skip chord updates for continuous events that are already handled directly
		// to prevent redundant addKey calls that cause event sync issues
		if (data.chord === 'mousemove' || data.chord === 'resize' || data.chord === 'scroll') {
			return;
		}
		
		if (this.checkChord(data.keys)) {
			const ev = this.getActiveEntry(data.chord)?.pressEvent || null;
			this.addKey(data.chord, InputManager.PRESS, ev);
		} else if (this.isKeyActive(data.chord)) {
			const ev = this.getReleasedEntry(data.chord)?.releaseEvent || null;
			this.addKey(data.chord, InputManager.RELEASE, ev);
		}
	}

	/**@param {Sequence} sequence  */
	checkSequence(sequence) {
		if (!sequence.isSequence()) {
			this.updateChord(sequence.steps[0]);
			return this.isKeyActive(sequence.pattern);
		}

		const lastStep = sequence.steps.at(-1);
		this.updateChord(lastStep);
		if (!this.isKeyActive(lastStep.chord)) {
			return false;
		}
		
		let previousReleaseTime = null;
		for (let i = 0; i < sequence.steps.length; i++) {
			const step = sequence.steps[i];
			this.updateChord(step);

			if (i === sequence.steps.length - 1) {
				// Last step - must be currently active
				const activeEntry = this.getActiveEntry(step.chord);
				if (!activeEntry) return false;
				
				// Check timing with previous step if exists
				if (previousReleaseTime !== null) {
					const timeDiff = activeEntry.pressTime - previousReleaseTime;
					if (timeDiff < 0 || timeDiff > this.sequence_timeout) return false;
				}
				
				// Sequence is valid - refresh timeouts for all previous sequence parts
				const now = Date.now();
				for (let j = 0; j < sequence.steps.length - 1; j++) {
					const prevStep = sequence.steps[j];
					const prevEntry = this.getSequencePartCandidates(prevStep.chord);
					if (prevEntry) {
						prevEntry.time_out = now; // Refresh timeout to current time
					}
				}
				
				return true;
			} else {
				// Previous steps - must have been released and within timing window
				const entry = this.getSequencePartCandidates(step.chord);
				if (!entry || !entry.isReleased()) return false;

				// Check timing with previous step if exists
				if (previousReleaseTime !== null) {
					const timeDiff = entry.pressTime - previousReleaseTime;
					if (timeDiff < 0 || timeDiff > this.sequence_timeout) return false;
				}

				previousReleaseTime = entry.releaseTime;
			}
		}

		return false;
	}

	updateSequence(sequence) {
		const wasActive = this.isKeyActive(sequence.pattern);
		const isCurrentlyValid = this.checkSequence(sequence);
		
		if (wasActive && !isCurrentlyValid) {
			const lastStep = sequence.steps.at(-1);
			if (!this.isKeyActive(lastStep.chord)) {
				const triggerEvent = this.getReleasedEntry(lastStep.chord);
				this.addKey(sequence.pattern, InputManager.RELEASE, triggerEvent?.releaseEvent || null);

				return;
			}
		}
		
		if (isCurrentlyValid && !wasActive) {
			// Sequence just became valid - add press entry
			const lastStep = sequence.steps.at(-1);
			const triggerEvent = this.getActiveEntry(lastStep.chord);
			this.addKey(sequence.pattern, InputManager.PRESS, triggerEvent?.pressEvent || null);
		}
	}
}


export default class InputManager {
	/** @type {number} Single key press (no repeat) */
	static PRESS = 0;
	/** @type {number} Key being held down (auto-repeat) */
	static HOLD = 1;
	/** @type {number} Key released */
	static RELEASE = 2;
	/** @type {number} Manual repeated presses */
	static REPEAT = 3;

	static triggerMap = {
		'press': InputManager.PRESS,
		'hold': InputManager.HOLD,
		'release': InputManager.RELEASE,
		'repeat': InputManager.REPEAT
	};

	constructor(html_element, options = {}) {
		this._html_element = null;
		this.html_bounds = null;
		/**@type {Map<string,{sequence: Sequence, handlers: InputHandler[] }>} */
		this.eventHandlers = new Map();
		this.keyHistory = new KeyHistory();
		this.sequence_timeout = options.sequence_timeout || 2000; // 2 seconds

		this.tickMode = options.tickMode || 'continuous';

		// Timeout handling for continuous events
		this.mouseMoveTimeout = null;
		this.mouseMoveTimeoutDuration = 50 ; // ms - time to wait before considering movement stopped
		
		this.resizeTimeout = null;
		this.resizeTimeoutDuration = 150; // ms - time to wait before considering resize stopped
		
		this.scrollTimeout = null;
		this.scrollTimeoutDuration = 100; // ms - time to wait before considering scroll stopped

		this.key_pressed = this.handleKeyDown.bind(this);
		this.key_released = this.handleKeyUp.bind(this);
		this.mouse_moved = this.handleMouseMove.bind(this);
		this.mouse_pressed = this.handleMouseDown.bind(this);
		this.mouse_released = this.handleMouseUp.bind(this);
		this.scroll_handler = this.handleScroll.bind(this);

		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.target === this._html_element) {
					this.bounds = entry.contentRect;
					this.handleResize(entry.contentRect);
				}
			}
		});

		this.html_element = html_element;

		/**@type {InputHandler[]} */
		this.emptyHandlers = [];
	}

	set html_element(element) {
		if (this._html_element === element) return;
		if (this._html_element) {
			this._html_element.removeEventListener('keydown', this.key_pressed);
			this._html_element.removeEventListener('keyup', this.key_released);
			this._html_element.removeEventListener("pointermove", this.mouse_moved);
			this._html_element.removeEventListener("mousedown", this.mouse_pressed);
			this._html_element.removeEventListener("mouseup", this.mouse_released);
			this._html_element.removeEventListener("scroll", this.scroll_handler);
			this.resizeObserver.unobserve(this._html_element);

			this.bounds = this.html_element.getBoundingClientRect();
		}
		this._html_element = element;
		if (this._html_element) {
			this._html_element.addEventListener('keydown', this.key_pressed);
			this._html_element.addEventListener('keyup', this.key_released);
			this._html_element.addEventListener("pointermove", this.mouse_moved);
			this._html_element.addEventListener("mousedown", this.mouse_pressed);
			this._html_element.addEventListener("mouseup", this.mouse_released);
			this._html_element.addEventListener("scroll", this.scroll_handler);
			this.resizeObserver.observe(this._html_element);
		}
	}

	get html_element() {
		return this._html_element;
	}

	normalizeKey(ev) {
		let parts = [];
		if (ev.ctrlKey) parts.push('ctrl');
		if (ev.altKey) parts.push('alt'); 
		if (ev.shiftKey) parts.push('shift');
		if (ev.metaKey) parts.push('meta');
		parts.push(ev.key.toLowerCase());
		
		if(parts.length !== 1) parts.push(parts.join('+'))

		return parts;
	}

	normalizeMouseButton(ev) {
		const buttonNames = ['mouse0', 'mouse1', 'mouse2', 'mouse3', 'mouse4'];
		const button = buttonNames[ev.button] || `mouse${ev.button}`;
		
		return [button];
	}

	getHandlers(type) {
		return this.eventHandlers.get(type)?.handlers || this.emptyHandlers;
	}

	triggerEvent(type, trigger, keyEntry) {
		for (const handler of this.getHandlers(type)) {

			if (handler.trigger !== trigger) continue;
			let ev = null;

			if (trigger !== InputManager.RELEASE) ev = keyEntry.pressEvent;
			else ev = keyEntry.releaseEvent;

			handler.callback(ev, this);
		}
	}

	checkSequences() {
		this.keyHistory.cleanup();
		for (const [eventKey, { sequence, handlers }] of this.eventHandlers.entries()) {
			this.keyHistory.updateSequence(sequence);
			
			for (const entry of this.keyHistory.getHistory(sequence.pattern)) {
				if (entry.isReleased() && !entry.hasReleaseEventTriggered()) {
					this.triggerEvent(eventKey, InputManager.RELEASE, entry);
					entry.setReleaseEventTriggered();
				} else if (entry.isActive() && !entry.hasPressEventTriggered()) {
					this.triggerEvent(eventKey, InputManager.PRESS, entry);
					entry.setPressEventTriggered();
				} else if (entry.isActive() && entry.hasPressEventTriggered()) {
					this.triggerEvent(eventKey, InputManager.HOLD, entry);
				}
			}
		}
	}

	handleKeyDown(ev) {
		for (const key of this.normalizeKey(ev)) {
			this.keyHistory.addKey(key, InputManager.PRESS, ev);
		}

		this.checkSequences();
	}

	handleKeyUp(ev) {
		for (const key of this.normalizeKey(ev)) {
			this.keyHistory.addKey(key, InputManager.RELEASE, ev);
		}
		this.checkSequences();
	}

	handleMouseDown(ev) {
		for (const button of this.normalizeMouseButton(ev)) {
			this.keyHistory.addKey(button, InputManager.PRESS, ev);
		}
		this.checkSequences();
	}

	handleMouseUp(ev) {
		for (const button of this.normalizeMouseButton(ev)) {
			this.keyHistory.addKey(button, InputManager.RELEASE, ev);
		}
		this.checkSequences();
	}

	tick(delta) {
		if (this.tickMode !== 'continuous') return;
		this.checkSequences();
	}

	handleMouseMove(ev) {
		this.keyHistory.addKey('mousemove', InputManager.PRESS, ev);
		
		if (this.mouseMoveTimeout) {
			clearTimeout(this.mouseMoveTimeout);
		}
		
		// Set a new timeout to detect when movement stops
		this.mouseMoveTimeout = setTimeout(() => {
			// Movement has stopped - release the mousemove
			if (this.keyHistory.isKeyActive('mousemove')) {
				this.keyHistory.addKey('mousemove', InputManager.RELEASE, ev);
				this.checkSequences();
			}
			this.mouseMoveTimeout = null;
		}, this.mouseMoveTimeoutDuration);
		
		this.checkSequences();
	}

	handleResize(bounds) {
		// Always store the resize event when it fires
		this.keyHistory.addKey('resize', InputManager.PRESS, bounds);
		
		// Clear any existing timeout
		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
		}
		
		// Set a new timeout to detect when resize stops
		this.resizeTimeout = setTimeout(() => {
			// Resize has stopped - release the resize
			if (this.keyHistory.isKeyActive('resize')) {
				this.keyHistory.addKey('resize', InputManager.RELEASE, bounds);
				this.checkSequences();
			}
			this.resizeTimeout = null;
		}, this.resizeTimeoutDuration);
		
		this.checkSequences();
	}

	handleScroll(ev) {
		// Always store the scroll event when it fires
		this.keyHistory.addKey('scroll', InputManager.PRESS, ev);
		
		// Clear any existing timeout
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout);
		}
		
		// Set a new timeout to detect when scroll stops
		this.scrollTimeout = setTimeout(() => {
			// Scroll has stopped - release the scroll
			if (this.keyHistory.isKeyActive('scroll')) {
				this.keyHistory.addKey('scroll', InputManager.RELEASE, ev);
				this.checkSequences();
			}
			this.scrollTimeout = null;
		}, this.scrollTimeoutDuration);
		
		this.checkSequences();
	}

	addEventListener(eventType, callback, options = {}) {
		// Parse the eventType for trigger syntax (e.g., 'w:press', 'space:hold')
		let parsedEventType = eventType;
		let parsedTrigger = InputManager.PRESS; // default trigger

		if (eventType.includes(':')) {
			const [keyPart, triggerPart] = eventType.split(':');
			parsedEventType = keyPart.trim();

			parsedTrigger = InputManager.triggerMap[triggerPart.trim()] || InputManager.PRESS;
		}

		const handler = new InputHandler();
		for (const key in options) {
			if (key in handler) {
				handler[key] = options[key];
			}
		}

		// Set the trigger from the parsed syntax, but allow options to override
		handler.trigger = options.trigger || parsedTrigger;
		handler.originalCallback = handler.callback = callback;
		handler.applyThrottle();

		if (!handler.constant) {
			handler.cooldown = handler.cooldown || 50;
		}

		if (!this.eventHandlers.has(parsedEventType)) {
			this.eventHandlers.set(parsedEventType, {
				sequence: new Sequence(parsedEventType),
				handlers: []
			});
		}
		this.getHandlers(parsedEventType).push(handler);
		return this;
	}

	// Remove event listener
	removeEventListener(eventType, callback) {
		const handlers = this.getHandlers(eventType);
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

	// Cleanup method for proper disposal
	dispose() {
		if (this._html_element) {
			this._html_element.removeEventListener('keydown', this.key_pressed);
			this._html_element.removeEventListener('keyup', this.key_released);
			this._html_element.removeEventListener("pointermove", this.mouse_moved);
			this._html_element.removeEventListener("mousedown", this.mouse_pressed);
			this._html_element.removeEventListener("mouseup", this.mouse_released);
			this._html_element.removeEventListener("scroll", this.scroll_handler);
			this.resizeObserver.unobserve(this._html_element);
		}
		this.resizeObserver.disconnect();

		// Clean up timers
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		
		if (this.mouseMoveTimeout) {
			clearTimeout(this.mouseMoveTimeout);
			this.mouseMoveTimeout = null;
		}
		
		if (this.resizeTimeout) {
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = null;
		}
		
		if (this.scrollTimeout) {
			clearTimeout(this.scrollTimeout);
			this.scrollTimeout = null;
		}

		this.eventHandlers.clear();
		this.keyHistory.clear();
		this._html_element = null;
	}
}