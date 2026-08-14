import type { ResourcePack } from "./RP";

export class ResourceRegistry<T> {
    constructor(public pack: ResourcePack) {}

    getById(id: number): T | undefined {
        const local = this.getLocalById(id);
        if (local !== undefined) {
            return local;
        }
        return this.getParentRegistry()?.getById(id);
    }

    getByName(name: string): T | undefined {
        const local = this.getLocalByName(name);
        if (local !== undefined) {
            return local;
        }
        return this.getParentRegistry()?.getByName(name);
    }

    protected getLocalById(id: number): T | undefined {
        return undefined;
    }

    protected getLocalByName(name: string): T | undefined {
        return undefined;
    }

    protected getParentRegistry(): ResourceRegistry<T> | undefined {
        return undefined;
    }

    get size(): number {
        return this.localSize();
    }

    protected localSize(): number {
        return 0;
    }
}
