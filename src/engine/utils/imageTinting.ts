
export function colorFromHex(hex: string): [number, number, number] {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    
    if (hex.length !== 6) {
        throw new Error('Invalid hex color format');
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return [r, g, b];
}


export function imageWithTint(imageData: Uint8Array, width: number, height: number, tintColor: [number, number, number]) {
    for (let pixel = 0; pixel < width * height; pixel++) {
        const offset = pixel * 4;
        const r1 = imageData[offset];
        const g1 = imageData[offset + 1];
        const b1 = imageData[offset + 2];
        // const a = imageData[offset + 3];

        const [r2, g2, b2] = tintColor;
        // Apply tint color
        imageData[offset] = (r1 * r2) /255;
        imageData[offset + 1] = (g1 * g2) / 255;
        imageData[offset + 2] = (b1 * b2) / 255;
        // imageData[offset + 3] = a; // Keep alpha unchanged
    }
}

export function imageWithOverlay(imageData: Uint8Array, width: number, height: number, overlayColor: [number, number, number]) { 
    for (let pixel = 0; pixel < width * height; pixel++) {
        const offset = pixel * 4;
        const r1 = imageData[offset];
        const g1 = imageData[offset + 1];
        const b1 = imageData[offset + 2];
        const a = 255 - imageData[offset + 3];

        const [r2, g2, b2] = overlayColor;

        imageData[offset] = (r1 * r2 + r1 * a) / 255;
        imageData[offset + 1] = (g1 * g2 + g1 * a) / 255;
        imageData[offset + 2] = (b1 * b2 + b1 * a) / 255;
        imageData[offset + 3] = 255; // Set alpha to fully opaque
    }
}