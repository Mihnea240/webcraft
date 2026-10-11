import { Array3D } from "@engine/utils/array3D";

export class AtlasBuilder {
    atlas: Uint8Array;
    private occupancy: Array3D<Uint8Array>;
    private pointer = { x: 0, y: 0 };
    
    constructor(
        buffer: Uint8Array,
        public width: number,
        public height: number,
        public unitSize: number = 16,
        public padding: number = 8)
    {
        this.width = width;
        this.height = height;
        this.atlas = buffer;
        
        const slotsWidth = Math.floor(width / this.unitSize);
        const slotsHeight = Math.floor(height / this.unitSize);

        console.log(`[AtlasBuilder] Initialized with ${slotsWidth}x${slotsHeight} slots of size ${this.unitSize} and padding ${this.padding}.`);
        this.occupancy = new Array3D<Uint8Array>(slotsWidth, slotsHeight, 1).allocateBuffer(Uint8Array);
        this.occupancy.fill(0);
    }
 
    atlasByteOffset(x: number, y: number): number {
        return (y * this.width + x) * 4; // 4 bytes per pixel (RGBA)
    }

    copyToAtlas(src: Uint8Array, srcWidth: number, srcHeight: number, destX: number, destY: number) {
        const atlasWidth = this.width;
        let destOffset = (destY * atlasWidth + destX) * 4;
        let srcOffset = 0;

        for (let y = 0; y < srcHeight; y++) {
            // Copy pixels directly byte-by-byte (no subarray allocations!)
            for (let x = 0; x < srcWidth * 4; x++) {
                this.atlas[destOffset + x] = src[srcOffset + x];
            }
            destOffset += atlasWidth * 4;
            srcOffset += srcWidth * 4;
        }
    }

    paddImage(left: number, top: number, width: number, height: number) {
        const firstRowOffset = this.atlasByteOffset(left, top);
        const lastRowOffset = this.atlasByteOffset(left, top + height - 1);

        // 1. Top and Bottom padding rows
        for (let i = 0; i < this.padding; i++) {
            const destTopOffset = this.atlasByteOffset(left, top - i - 1);
            const destBottomOffset = this.atlasByteOffset(left, top + height + i);

            for (let x = 0; x < width * 4; x++) {
                this.atlas[destTopOffset + x] = this.atlas[firstRowOffset + x];
                this.atlas[destBottomOffset + x] = this.atlas[lastRowOffset + x];
            }
        }

        // 2. Left and Right padding columns (including padded rows)
        for (let i = 0; i < this.padding; i++) {
            for (let y = 0; y < height; y++) {
                const srcLeftOffset = this.atlasByteOffset(left, top + y);
                const destLeftOffset = this.atlasByteOffset(left - i - 1, top + y);
                this.atlas[destLeftOffset] = this.atlas[srcLeftOffset];
                this.atlas[destLeftOffset + 1] = this.atlas[srcLeftOffset + 1];
                this.atlas[destLeftOffset + 2] = this.atlas[srcLeftOffset + 2];
                this.atlas[destLeftOffset + 3] = this.atlas[srcLeftOffset + 3];

                const srcRightOffset = this.atlasByteOffset(left + width - 1, top + y);
                const destRightOffset = this.atlasByteOffset(left + width + i, top + y);
                this.atlas[destRightOffset] = this.atlas[srcRightOffset];
                this.atlas[destRightOffset + 1] = this.atlas[srcRightOffset + 1];
                this.atlas[destRightOffset + 2] = this.atlas[srcRightOffset + 2];
                this.atlas[destRightOffset + 3] = this.atlas[srcRightOffset + 3];
            }
        }

        // 3. Padded corners (size: padding x padding)
        const corners = [
            { srcX: left, srcY: top, destX: left - this.padding, destY: top - this.padding },
            { srcX: left + width - 1, srcY: top, destX: left + width, destY: top - this.padding },
            { srcX: left, srcY: top + height - 1, destX: left - this.padding, destY: top + height },
            { srcX: left + width - 1, srcY: top + height - 1, destX: left + width, destY: top + height }
        ];

        for (const corner of corners) {
            const srcOffset = this.atlasByteOffset(corner.srcX, corner.srcY);
            const r = this.atlas[srcOffset];
            const g = this.atlas[srcOffset + 1];
            const b = this.atlas[srcOffset + 2];
            const a = this.atlas[srcOffset + 3];

            for (let dy = 0; dy < this.padding; dy++) {
                const destRowOffset = this.atlasByteOffset(corner.destX, corner.destY + dy);
                for (let dx = 0; dx < this.padding; dx++) {
                    const offset = destRowOffset + dx * 4;
                    this.atlas[offset] = r;
                    this.atlas[offset + 1] = g;
                    this.atlas[offset + 2] = b;
                    this.atlas[offset + 3] = a;
                }
            }
        }
    }

    fits(x: number, y: number, width: number, height: number) {
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                if(this.occupancy.get(x + i, y + j, 0) !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    // Get the next available position in the atlas for an image of given width and height in pixels, considering the padding and unit size. Returns undefined if no position is available.
    getNextAvailablePosition(width: number, height: number) {
        const neededWidth = Math.ceil((width + 2 * this.padding) / this.unitSize);
        const neededHeight = Math.ceil((height + 2 * this.padding) / this.unitSize);
        
        let { x, y } = this.pointer;
        while (x < this.occupancy.x && y < this.occupancy.y) {
            if (this.fits(x, y, neededWidth, neededHeight)) {
                return { x, y };
            }

            x++;
            if (x >= this.occupancy.x) {
                x = 0;
                y++;
            }
        }
    }

    setOccupied(x: number, y: number, width: number, height: number) {
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                this.occupancy.set(x + i, y + j, 0, 1);
            }
        }
    }

    addImage(src: Uint8Array, srcWidth: number, srcHeight: number, position?: { x: number, y: number }) {
        const neededWidth = Math.ceil((srcWidth + 2 * this.padding) / this.unitSize);
        const neededHeight = Math.ceil((srcHeight + 2 * this.padding) / this.unitSize);

        position ??= this.getNextAvailablePosition(srcWidth, srcHeight);
        if (!position) { 
            throw new Error("Could not find available position in atlas for image of size " + srcWidth + "x" + srcHeight);
        }

        const atlasX = position.x * this.unitSize;
        const atlasY = position.y * this.unitSize;

        const imageX = atlasX + this.padding;
        const imageY = atlasY + this.padding;

        this.copyToAtlas(src, srcWidth, srcHeight, imageX, imageY);
        this.paddImage(imageX, imageY, srcWidth, srcHeight);

        this.setOccupied(position.x, position.y, neededWidth, neededHeight);

        return position;
    }
}