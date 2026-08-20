export interface StorageUnit<ElementType, MetaType> {
    // Flag indicating whether this storage unit uses metadata
    useMetadata: boolean;

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
