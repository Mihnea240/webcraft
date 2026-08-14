import { Array3D } from "@engine/utils/array3D";

export class AtlasBuilder {
    atlas: Uint8Array;
    padding: number;
    private occupancy: Array3D<Uint8Array>;
    private pointer = { x: 0, y: 0 };
    
    constructor(
        buffer: Uint8Array,
        public width: number,
        public height: number,
        public unitSize: number = 16)
    {
        this.width = width;
        this.height = height;
        this.atlas = buffer;
        this.padding = this.unitSize / 2;
        
        const slotsWidth = Math.floor(width / (this.unitSize + this.padding * 2));
        const slotsHeight = Math.floor(height / (this.unitSize + this.padding * 2));

        this.occupancy = new Array3D<Uint8Array>(slotsWidth, slotsHeight, 1);
        this.occupancy.fill(0);
    }
 
    atlasByteOffset(x: number, y: number): number {
        return (y * this.width + x) * 4; // 4 bytes per pixel (RGBA)
    }

    copyRowToAtlas(row: Uint8Array, rowWidth: number, destX: number, destY: number) {
        this.atlas.set(row, this.atlasByteOffset(destX, destY));
    }

    copyToAtlas(src: Uint8Array, srcWidth: number, srcHeight: number, destX: number, destY: number) {
        for (let y = 0, offset = 0; y < srcHeight; y++, offset += srcWidth * 4) {
            const slice = src.subarray(offset, offset + srcWidth * 4);
            this.copyRowToAtlas(slice, srcWidth, destX, destY + y);
        }
    }

    *getCorners(left: number, top: number, width: number, height: number) {
        // Top-left corner
        yield {
            padding_x: left - this.padding, padding_y: top - this.padding,
            image_x: left, image_y: top
        }

        // Top-right corner
        yield {
            padding_x: left + width, padding_y: top - this.padding,
            image_x: left + width - 1, image_y: top
        }

        // Bottom-left corner
        yield {
            padding_x: left - this.padding, padding_y: top + height,
            image_x: left, image_y: top + height - 1
        }

        // Bottom-right corner
        yield {
            padding_x: left + width, padding_y: top + height,
            image_x: left + width - 1, image_y: top + height - 1
        } 
    }

    paddImage(left: number, top: number, width: number, height: number) {
        const cornerOffset = this.atlasByteOffset(left, top);
        const firstRow = this.atlas.subarray(cornerOffset, cornerOffset + width * 4);
        const lastRowOffset = this.atlasByteOffset(left, top + height - 1);
        const lastRow = this.atlas.subarray(lastRowOffset, lastRowOffset + width * 4);

        for (let i = 0; i < this.padding; i++) {
            // Top padding
            this.copyRowToAtlas(firstRow, width, left, top - i - 1);

            // Bottom padding
            this.copyRowToAtlas(firstRow, width, left, top + height + i);

            // Left padding
            for (let y = 0; y < height; y++) {
                const pixelOffset = this.atlasByteOffset(left, top + y);
                const pixel = this.atlas.subarray(pixelOffset, pixelOffset + 4);
                this.copyRowToAtlas(pixel, 1, left - i - 1, top + y);
            }

            // Right padding
            for (let y = 0; y < height; y++) {
                const pixelOffset = this.atlasByteOffset(left + width - 1, top + y);
                const pixel = this.atlas.subarray(pixelOffset, pixelOffset + 4);
                this.copyRowToAtlas(pixel, 1, left + width + i, top + y);
            }
        }

        const pixelBuffer = new Uint8Array(this.padding * 4); // Buffer to hold a corner row of the same pixel repeated
        for (const corner of this.getCorners(left, top, width, height)) {
            //Create row
            const pixelOffset = this.atlasByteOffset(corner.image_x, corner.image_y);
            const pixel = this.atlas.subarray(pixelOffset, pixelOffset + 4);
            for (let i = 0; i < this.padding; i++) {
                pixelBuffer.set(pixel, i * 4);
            }

            //Padd corner row
            for (let i = 0; i < this.padding; i++) {
                this.copyRowToAtlas(pixelBuffer, this.padding, corner.padding_x, corner.padding_y + i);
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

    getNextAvailablePosition(width: number, height: number) {
        
        let { x, y } = this.pointer;
        while (x < this.occupancy.x && y < this.occupancy.y) {
            if (this.fits(x, y, width, height)) {
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

    addImage(src: Uint8Array, srcWidth: number, srcHeight: number) {
        const width = Math.ceil((srcWidth + 2 * this.padding) / this.unitSize);
        const height = Math.ceil((srcHeight + 2 * this.padding) / this.unitSize);

        const position = this.getNextAvailablePosition(width, height);
        if (!position) return;

        const atlasX = position.x * this.unitSize;
        const atlasY = position.y * this.unitSize;

        const imageX = atlasX + this.padding;
        const imageY = atlasY + this.padding;

        this.copyToAtlas(src, srcWidth, srcHeight, imageX, imageY);
        this.paddImage(imageX, imageY, srcWidth, srcHeight);

        this.setOccupied(position.x, position.y, width, height);

        return position;
    }
}