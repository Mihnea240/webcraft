import { ResourceRegistry } from "./resource_manager/resourceRegistry";

export default class ResourceLoader {
	public registry: ResourceRegistry;

	constructor() {
		this.registry = new ResourceRegistry();
	}

	async init(): Promise<void> {
		// Mock resource initialization
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 100);
		});
	}
}
