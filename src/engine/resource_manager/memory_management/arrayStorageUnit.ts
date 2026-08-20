import { StorageUnit } from "./storageUnit";

export class ArrayStorageUnit<ElementType, MetaType> implements StorageUnit<ElementType, MetaType> {
    private data: ElementType[] = [];
    private metadata: MetaType[] = [];

    constructor(initialSize: number = 0, public useMetadata: boolean = true) {
        this.data = new Array<ElementType>(initialSize);
        this.metadata = useMetadata ? new Array<MetaType>(initialSize) : [];
    }

    public get(id: number): ElementType | undefined {
        return this.data[id];
    }

    public set(id: number, value: Partial<ElementType>) {
        if (this.data[id]) {
            // Apply partial updates if the object already exists
            Object.assign(this.data[id] as any, value);
        } else {
            this.data[id] = value as ElementType;
        }
    }

    public getMeta(id: number): MetaType | undefined {
        return this.useMetadata ? this.metadata[id] : undefined;
    }

    public setMeta(id: number, value: MetaType) {
        if (this.useMetadata) {
            this.metadata[id] = value;
        }
    }

    public writePointer(): number {
        return this.data.length;
    }

    public add(value?: Partial<ElementType>, meta?: MetaType): number {
        const id = this.data.length;
        this.data.push(value as ElementType);
        if (this.useMetadata && meta !== undefined) {
            this.metadata[id] = meta;
        }
        return id;
    }

    // --- Export / Import Protocol for Registry Serialization ---

    public exportMetadata() {
        return {
            metadata: this.useMetadata ? [...this.metadata] : [],
            length: this.data.length,
            arrayData: [...this.data]
        };
    }

    public importMetadata(state: {
        metadata: MetaType[];
        length: number;
        arrayData?: ElementType[];
    }): void {
        if (state.arrayData) {
            this.data = [...state.arrayData];
        }
        if (this.useMetadata && state.metadata) {
            this.metadata = [...state.metadata];
        } else {
            this.metadata = [];
        }
    }
}
