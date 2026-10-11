import { inflateSync } from "fflate";
import decodeJpeg from "jpeg-js";
import { TGALoader } from 'three/addons/loaders/TGALoader.js';
import UPNG from "upng-js";

export interface ZipFileEntry {
    name: string;
    localHeaderOffset: number;
    compressedSize: number;
    uncompressedSize: number;
    compressionMethod: number;
}

/**
 * Parses only the Central Directory headers at the end of the ZIP buffer.
 * Synchronous, stack-safe, and takes under 5ms on a 140MB archive.
 */
export function extractHeaders(buffer: ArrayBuffer): Map<string, ZipFileEntry> {
    const view = new DataView(buffer);
    const u8 = new Uint8Array(buffer);
    const fileMap = new Map<string, ZipFileEntry>();

    // 1. Locate the End of Central Directory (EOCD) signature [0x50, 0x4B, 0x05, 0x06]
    let eocdOffset = buffer.byteLength - 22;
    const minEocdOffset = Math.max(0, buffer.byteLength - 65535 - 22);
    let found = false;
    
    while (eocdOffset >= minEocdOffset) {
        if (view.getUint32(eocdOffset, true) === 0x06054b50) {
            found = true;
            break;
        }
        eocdOffset--;
    }

    if (!found) {
        throw new Error("Invalid ZIP file: End of Central Directory (EOCD) not found");
    }

    // 2. Read Central Directory size and offset from EOCD
    const cdSize = view.getUint32(eocdOffset + 12, true);
    const cdOffset = view.getUint32(eocdOffset + 16, true);

    // 3. Parse Central Directory file headers
    let offset = cdOffset;
    const decoder = new TextDecoder("utf-8");

    while (offset < cdOffset + cdSize) {
        const sig = view.getUint32(offset, true);
        if (sig !== 0x02014b50) break; // End of Central Directory files

        const compressionMethod = view.getUint16(offset + 10, true);
        const compressedSize = view.getUint32(offset + 20, true);
        const uncompressedSize = view.getUint32(offset + 24, true);
        const filenameLength = view.getUint16(offset + 28, true);
        const extraFieldLength = view.getUint16(offset + 30, true);
        const fileCommentLength = view.getUint16(offset + 32, true);
        const localHeaderOffset = view.getUint32(offset + 42, true);

        const nameBytes = u8.subarray(offset + 46, offset + 46 + filenameLength);
        const name = decoder.decode(nameBytes);

        fileMap.set(name, {
            name,
            localHeaderOffset,
            compressedSize,
            uncompressedSize,
            compressionMethod
        });

        offset += 46 + filenameLength + extraFieldLength + fileCommentLength;
    }

    return fileMap;
}

/**
 * Extracts a file from the raw zip buffer on-demand synchronously.
 * Zero streams, zero microtask hops.
 */
export function extractFile(buffer: ArrayBuffer, entry: ZipFileEntry): ArrayBuffer {
    const view = new DataView(buffer);
    const u8 = new Uint8Array(buffer);
    const { localHeaderOffset, compressedSize, compressionMethod, name } = entry;

    // Verify Local File Header signature [0x50, 0x4B, 0x03, 0x04]
    const sig = view.getUint32(localHeaderOffset, true);
    if (sig !== 0x04034b50) {
        throw new Error(`Invalid Local File Header signature for file: ${name}`);
    }

    const filenameLength = view.getUint16(localHeaderOffset + 26, true);
    const extraFieldLength = view.getUint16(localHeaderOffset + 28, true);

    const dataOffset = localHeaderOffset + 30 + filenameLength + extraFieldLength;
    const compressedSlice = u8.subarray(dataOffset, dataOffset + compressedSize);

    if (compressionMethod === 8) {
        // Fast, synchronous, zero-stream in-memory decompression using fflate
        return inflateSync(compressedSlice).buffer;
    } else if (compressionMethod === 0) {
        // STORED (Uncompressed): Slice directly
        return compressedSlice.slice(0).buffer;
    } else {
        throw new Error(`Unsupported ZIP compression method: ${compressionMethod} for file: ${name}`);
    }
}

export function stripJsonComments(jsonString: string): string {
    // Matches string literals and escaped quotes to avoid stripping comments inside strings
    return jsonString.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
}

export function fileToJson(buffer: ArrayBuffer, entry: ZipFileEntry): any {
    const fileBuffer = extractFile(buffer, entry);
    const text = new TextDecoder("utf-8").decode(fileBuffer);
    const cleanText = stripJsonComments(text);
    return JSON.parse(cleanText);
}

export function extractFromPngFile(buffer: ArrayBuffer, file: ZipFileEntry) {
    const fileBuffer = extractFile(buffer, file);
    const image = UPNG.decode(fileBuffer);
    const rgbaData = UPNG.toRGBA8(image)[0];

    return {
        width: image.width,
        height: image.height,
        data: new Uint8Array(rgbaData)
    };
}

export function extractFromTgaFile(buffer: ArrayBuffer, file: ZipFileEntry) {
    const fileBuffer = extractFile(buffer, file);
    const loader = new TGALoader();
    const imageData = loader.parse(fileBuffer);

    return {
        width: imageData.width!,
        height: imageData.height!,
        data: imageData.data as Uint8Array
    };
}

export function extractFromJpegFile(buffer: ArrayBuffer, file: ZipFileEntry) {
    const fileBuffer = extractFile(buffer, file);
    const imageData = decodeJpeg.decode(fileBuffer, { useTArray: true });

    return {
        width: imageData.width,
        height: imageData.height,
        data: imageData.data as Uint8Array
    };
}

export function extractFromImageFile(buffer: ArrayBuffer, file: ZipFileEntry) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
            return extractFromPngFile(buffer, file);
            case 'tga':
                return extractFromTgaFile(buffer, file);
        case 'jpg':
        case 'jpeg':
            return extractFromJpegFile(buffer, file);
        default:
            throw new Error(`Unsupported image format: ${extension}`);
    }
}