# Texture Atlas Building & PBR Array

Summary: WebCraft compiles block textures into a 2D Texture Array (`Texture2DArray` in WebGPU) at runtime. The process is handled off-thread in a Web Worker using direct byte manipulation, avoiding the GPU-to-CPU stalls of browser Canvas APIs.

## 1. Color & MERS (PBR) Layout
- **Color Layer**: Holds base color (RGB) and transparency (A).
- **MERS Layer**: Holds material properties packed into RGBA: **M**etalness (R), **E**mission (G), **R**oughness (B), **S**ubsurface (A).
- **TSL Shading**: Three Shading Language (TSL) built-in nodes (`texture()`) sample matching coordinates on both layers to feed the native physical PBR material pipeline.
- **Coordination**: Both layers are stitched at the exact same offsets using the CPU [`AtlasBuilder`](file:///home/mihnea/web/webcraft/engine/resource_manager/atlasBuilder.ts).

## 2. Why Canvas API (OffscreenCanvas) is Avoided
1. **GPU-to-CPU Stalls**: `getImageData()` forces a synchronous VRAM-to-RAM readback, freezing the worker thread while waiting for the GPU to render.
2. **API Overhead**: Drawing hundreds of $16 \times 16$ tiles via `ctx.drawImage` incurs massive JS-to-C++ binding and driver validation overhead. CPU `Uint8Array.set` copies bytes instantly.
3. **Forced Conversions**: Canvas forces color profile matching (sRGB) and alpha premultiplication, corrupting raw MERS data.
4. **Padding (Bleed Borders)**: Preventing mipmap seams requires a 1px border. On canvas this requires 9 `drawImage` calls per tile ($9 \times 500 = 4,500$ calls). [`AtlasBuilder`](file:///home/mihnea/web/webcraft/engine/resource_manager/atlasBuilder.ts) handles this with cheap row memory copies.

## 3. Worker Implementation Details
- **Decoders**: PNG (`upng-js`), JPEG (`jpeg-js`), and TGA (Three's `TGALoader.parse`) decode directly to CPU-side RGBA `Uint8Array` buffers.
- **Transferables**: Raw stitched atlas buffers are sent back to the main thread via zero-copy `ArrayBuffer` transferables, then uploaded to the GPU in a single write call.
