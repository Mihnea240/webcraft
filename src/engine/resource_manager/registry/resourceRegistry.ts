import { StorageUnit } from "../memory_management/storageUnit";

export abstract class ResourceRegistry<ElementType, MetaType> {
    protected readonly nameToIdMap = new Map<string, number>();
    protected readonly idToNameMap = new Map<number, string>();

    public storage: StorageUnit<ElementType, MetaType>;

    constructor(public parent?: ResourceRegistry<ElementType, MetaType>) {
        if (parent) {
            this.storage = parent.storage;
        } else { 
            this.storage = this.createStorageUnit();
        }
    }

    // --- Direct Forwarding of StorageUnit Methods ---

    public get(id: number): ElementType | undefined {
        return this.storage.get(id);
    }

    public set(id: number, value: Partial<ElementType>): void {
        this.storage.set(id, value);
    }

    public getMeta(id: number): MetaType | undefined {
        return this.storage.getMeta(id);
    }

    public setMeta(id: number, value: MetaType): void {
        this.storage.setMeta(id, value);
    }

    public writePointer(): number {
        return this.storage.writePointer();
    }

    public push(name: string, value?: Partial<ElementType>, meta?: MetaType): number {
        const id = this.storage.add(value, meta);
        this.nameToIdMap.set(name, id);
        this.idToNameMap.set(id, name);
        return id;
    }

    public add(value?: Partial<ElementType>, meta?: MetaType): number {
        return this.storage.add(value, meta);
    }

    /**
     * Allocates a slot in the storage unit (without specifying an element value),
     * registers the name-to-id mapping, and returns the newly allocated ID.
     * This avoids creating a value object when writing directly to buffer views.
     */
    public register(name: string, meta?: MetaType): number {
        const id = this.storage.add(undefined, meta);
        this.nameToIdMap.set(name, id);
        this.idToNameMap.set(id, name);
        return id;
    }

    // --- Local & Cascading Name-ID Mappings ---

    public nameToId(name: string): number | undefined {
        const localId = this.nameToIdMap.get(name);
        return localId !== undefined ? localId : this.parent?.nameToId(name);
    }

    public idToName(id: number): string | undefined {
        const localName = this.idToNameMap.get(id);
        return localName !== undefined ? localName : this.parent?.idToName(id);
    }

    // --- Linked List Node Operations ---

    /**
     * Removes/bypasses a specific registry node from the parent lookup chain.
     */
    public removeNode(node: ResourceRegistry<ElementType, MetaType>): void {
        if (this === node) {
            // Cannot remove ourselves directly from within ourselves
            return;
        }

        let current: ResourceRegistry<ElementType, MetaType> | undefined = this;
        while (current) {
            if (current.parent === node) {
                current.parent = node.parent; // Bypass the deleted node
                return;
            }
            current = current.parent;
        }
    }

    // --- Export / Import Protocol (Excluding Binary Buffers) ---

    public exportMetadata() {
        return {
            mappings: Array.from(this.nameToIdMap.entries()),
            storageMetadata: this.storage.exportMetadata()
        };
    }

    public importMetadata(state: {
        mappings: [string, number][];
        storageMetadata: any;
    }): void {
        this.storage.importMetadata(state.storageMetadata);
        this.nameToIdMap.clear();
        this.idToNameMap.clear();
        for (const [name, id] of state.mappings) {
            this.nameToIdMap.set(name, id);
            this.idToNameMap.set(id, name);
        }
    }

    // --- Buffer checkout and import ---

    public checkoutBuffers(): ArrayBuffer[] {
        if ('checkoutBuffer' in this.storage) {
            return [(this.storage as any).checkoutBuffer()];
        }
        return [];
    }

    public importBuffers(buffers: ArrayBuffer[], writePointers?: number[]): void {
        if ('importBuffer' in this.storage && buffers.length > 0) {
            const length = writePointers ? writePointers[0] : this.storage.writePointer();
            (this.storage as any).importBuffer(buffers[0], length);
        }
    }

    abstract createStorageUnit(): StorageUnit<ElementType, MetaType>;

    get size(): number {
        return this.nameToIdMap.size;
    }
}
