




export class BlockAllocator {
    occupency: Uint8Array;


    constructor(public chunkSize: number, public maxChunks: number) {
        this.occupency = new Uint8Array(maxChunks);
        this.occupency.fill(0);
    }

    allocate(size: number): number {
        let startIndex = -1;
        let count = 0;

        for (let i = 0; i < this.maxChunks; i++) {
            if (this.occupency[i] === 0) {
                if (startIndex === -1) {
                    startIndex = i;
                }
                count++;
                if (count === size) {
                    for (let j = startIndex; j < startIndex + size; j++) {
                        this.occupency[j] = 1;
                    }
                    return startIndex;
                }
            } else {
                startIndex = -1;
                count = 0;
            }
        }

        throw new Error("Slab allocator out of memory");
    }

    free(startIndex: number, size: number): void {
        for (let i = startIndex; i < startIndex + size; i++) {
            if (i >= this.maxChunks) {
                throw new Error("Slab allocator free out of bounds");
            }
            this.occupency[i] = 0;
        }
    }

}