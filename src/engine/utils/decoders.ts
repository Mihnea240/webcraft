import { Unzip, UnzipFile, UnzipInflate, strFromU8 } from "fflate";
import decodeJpeg from "jpeg-js";
import { TGALoader } from 'three/addons/loaders/TGALoader.js';
import UPNG from "upng-js";

export const unzipper = new Unzip();
unzipper.register(UnzipInflate);

export function extractHeaders(buffer: ArrayBuffer): Map<string, UnzipFile> {
    const fileMap = new Map<string, UnzipFile>();

    unzipper.onfile = (file: UnzipFile) => {
        fileMap.set(file.name, file);
    };

    unzipper.push(new Uint8Array(buffer), true);

    return fileMap;
}

export function extractFile(file: UnzipFile): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        file.ondata = (err, chunk, final) => {
            if (err) {
                reject(err);
                return;
            }
            if (chunk) {
                chunks.push(chunk);
            }
            if (final) {
                const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
                const result = new Uint8Array(totalLength);
                let offset = 0;
                for (const c of chunks) {
                    result.set(c, offset);
                    offset += c.length;
                }
                resolve(result.buffer);
            }
        };
    });
}

export async function fileToJson(file: UnzipFile){
    const buffer = await extractFile(file);
    const text = strFromU8(new Uint8Array(buffer));
    return JSON.parse(text);
}

export async function extractFromPngFile(file: UnzipFile) {
    const buffer = await extractFile(file);
    const image = UPNG.decode(buffer);
    const rgbaData = UPNG.toRGBA8(image)[0]; // Get the first frame's RGBA data

    return {
        width: image.width,
        height: image.height,
        data: new Uint8Array(rgbaData)
    };
}

export async function extractFromTgaFile(file: UnzipFile) {
    const buffer = await extractFile(file);
    const loader = new TGALoader();
    const imageData = loader.parse(buffer);

    return {
        width: imageData.width!,
        height: imageData.height!,
        data: imageData.data as Uint8Array
    };
}

export async function extractFromJpegFile(file: UnzipFile) {
    const buffer = await extractFile(file);
    const imageData = decodeJpeg.decode(buffer, { useTArray: true });

    return {
        width: imageData.width,
        height: imageData.height,
        data: imageData.data as Uint8Array
    };
}

export async function extractFromImageFile(file: UnzipFile) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
            return extractFromPngFile(file);
        case 'tga':
            return extractFromTgaFile(file);
        case 'jpg':
        case 'jpeg':
            return extractFromJpegFile(file);
        default:
            throw new Error(`Unsupported image format: ${extension}`);
    }
}