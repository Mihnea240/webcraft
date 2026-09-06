import { StorageUnit } from "../memory_management/storageUnit";

export abstract class ResourceRegistry<ElementType, MetaType = void, KeyType = string> {
    protected readonly keyToIdMap = new Map<KeyType, number>();

    public storage: StorageUnit<ElementType, MetaType>;

    constructor(public parent?: ResourceRegistry<ElementType, MetaType, KeyType>) {
        if (parent) {
            this.storage = parent.storage;
        } else { 
            this.storage = this.createStorageUnit();
        }
    }

    // --- Direct Forwarding of StorageUnit Methods ---

    /** Returns the element at the given ID, expected to be a valid ID, as such the return type cant be undefined. */
    public get(id: number): ElementType {
        return this.storage.get(id) as ElementType;
    }

    /** Sets the main resource value at the given ID, */
    public set(id: number, value: Partial<ElementType>) {
        this.storage.set(id, value);
    }
    /** Returns the metadata associated with the given ID, expected to be a valid ID, as such the return type cant be undefined. */
    public getMeta(id: number) {
        return this.storage.getMeta(id) as MetaType;
    }

    /** Sets the metadata associated with the given ID, */
    public setMeta(id: number, value: MetaType) {
        this.storage.setMeta(id, value);
    }

    /** Returns the current write pointer of the underlying storage unit. */
    public writePointer(): number {
        return this.storage.writePointer();
    }

    /** Creates a new element in the storage unit, registers the key-to-id mapping, and returns the newly allocated ID. */
    public push(key: KeyType, value?: Partial<ElementType>, meta?: MetaType): number {
        const id = this.storage.add(value, meta);
        this.keyToIdMap.set(key, id);
        return id;
    }

    /** Creates a new element in the storage unit whithout registering a key, and returns the newly allocated ID. */
    public add(value?: Partial<ElementType>, meta?: MetaType): number {
        return this.storage.add(value, meta);
    }

    /** Clones an existing element+metadata pair into a new slot and returns its new ID. */
    public addClone(id: number): number {
        const value = this.storage.get(id);
        const meta = this.storage.getMeta(id);
        return this.add(value as Partial<ElementType> | undefined, meta);
    }

    /** Clones an existing element, registers it under a new key, and returns the new ID. */
    public pushClone(key: KeyType, id: number): number {
        const newId = this.addClone(id);
        this.keyToIdMap.set(key, newId);
        return newId;
    }

    /**
     * Allocates a slot in the storage unit (without specifying an element value),
     * registers the key-to-id mapping, and returns the newly allocated ID.
     * This avoids creating a value object when writing directly to buffer views.
     */
    public register(key: KeyType, meta?: MetaType): number {
        const id = this.storage.add(undefined, meta);
        this.keyToIdMap.set(key, id);
        return id;
    }

    /**
     * Registers an alias key pointing to an existing resource ID or key.
     */
    public alias(aliasKey: KeyType, target: number | KeyType): boolean {
        const id = typeof target === "number" ? target : this.keyToId(target);
        if (id === undefined) return false;
        this.keyToIdMap.set(aliasKey, id);
        return true;
    }

    /**
     * Removes the element at the specified ID using Swap-and-Pop.
     * Swaps the last element into slot `id`, updates its key-to-id mapping,
     * removes the deleted key, and decrements the storage write pointer.
     * Returns the key of the element that was moved into slot `id` (if any).
     */
    public pop(id: number): KeyType | undefined {
        const lastId = this.storage.writePointer() - 1;
        if (id < 0 || id > lastId) return undefined;

        const deletedKey = this.idToKey(id);
        const lastKey = this.idToKey(lastId);

        // Perform swap-and-pop in underlying storage unit
        this.storage.remove(id);

        if (deletedKey !== undefined) {
            this.keyToIdMap.delete(deletedKey);
        }

        if (id < lastId && lastKey !== undefined) {
            // Update mapping for the moved element
            this.keyToIdMap.set(lastKey, id);
            return lastKey;
        }

        return undefined;
    }

    /**
     * Removes the element associated with the given key using Swap-and-Pop.
     */
    public popKey(key: KeyType): KeyType | undefined {
        const id = this.keyToId(key);
        if (id === undefined) return undefined;
        return this.pop(id);
    }

    // --- Local & Cascading Key-ID Mappings ---

    public keyToId(key: KeyType): number | undefined {
        const localId = this.keyToIdMap.get(key);
        return localId !== undefined ? localId : this.parent?.keyToId(key);
    }

    public idToKey(id: number): KeyType | undefined {
        for (const [key, mappedId] of this.keyToIdMap) {
            if (mappedId === id) return key;
        }
        return this.parent?.idToKey(id);
    }

    // --- Linked List Node Operations ---

    /**
     * Removes/bypasses a specific registry node from the parent lookup chain.
     */
    public removeNode(node: ResourceRegistry<ElementType, MetaType, KeyType>): void {
        if (this === node) {
            // Cannot remove ourselves directly from within ourselves
            return;
        }

        let current: ResourceRegistry<ElementType, MetaType, KeyType> | undefined = this;
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
            mappings: Array.from(this.keyToIdMap.entries()),
            storageMetadata: this.storage.exportMetadata()
        };
    }

    public importMetadata(state: {
        mappings: [KeyType, number][];
        storageMetadata: any;
    }): void {
        this.storage.importMetadata(state.storageMetadata);
        this.keyToIdMap.clear();
        for (const [key, id] of state.mappings) {
            this.keyToIdMap.set(key, id);
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
        return this.keyToIdMap.size;
    }
}
