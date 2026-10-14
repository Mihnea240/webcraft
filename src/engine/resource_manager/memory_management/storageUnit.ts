export interface StorageUnit<ElementType, MetaType> {
    // Flag indicating whether this storage unit uses metadata
    useMetadata: boolean;

    /** Number of logically stored items in this storage unit. */
    readonly size: number;

    /** Number of items that fit before reallocation (undefined for variable-length storage). */
    readonly capacity?: number;

    // Get the main resource by its ID
    get(id: number): ElementType | undefined;
    // Set the main resource at the specified location (supports partial updates)
    set(id: number, value: Partial<ElementType>): void;

    // Get the metadata associated with a resource by its ID
    getMeta(id: number): MetaType | undefined;
    // Set the metadata associated with a resource at the specified location
    setMeta(id: number, value: MetaType): void;

    // Get the current write pointer (length) for the storage unit
    writePointer(): number;

    // Add a new resource to the storage unit, returning its ID (supports partial elements)
    add(value?: Partial<ElementType>, meta?: MetaType): number;

    // Simple callback invoked when backing buffer is reallocated
    onResize?: (newBuffer: ArrayBuffer) => void;

    // Exports the internal metadata table (excluding raw binary buffers)
    exportMetadata(): {
        metadata: MetaType[];
        length: number;
        arrayData?: ElementType[]; // Used only for non-binary JS arrays (ArrayStorageUnit)
    };
    
    // Imports/merges metadata and array data
    importMetadata(state: {
        metadata: MetaType[];
        length: number;
        arrayData?: ElementType[];
    }): void;
}
