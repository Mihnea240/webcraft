# GPU Geometry Cube Layout Specification

## Design Constraints & Decisions

The layout of `CubeStruct` was designed to achieve maximum cache locality and rendering throughput under the following constraints:

1. **48-Byte Alignment (GPU Cache Locality)**:
   WEBGPU inforces 16-byte alignment for all buffers. The first considered size was 32 bytes, this was possible if using offset and scale as 6 bytes, with the face uvs taking 24 bytes(6 faces * 4 bytes per face, one for each u v w h). However, this leaves no space to add rotation data, so i decided to keep at 48 bytes.

2. **Move to f16 (Geometry and Pivot Compression)**:
   In the Bedrock specs, there are fields like `inflate`, `scale`, `scale_pivot`, `rotation`, `rotation_pivot`, and `translation`. Rather than storing these in the struct or computing them on the GPU, all coordinate offsets and pivot transformations are pre-multiplied and collapsed on the CPU at load-time into exactly two fields: `offset` and `scale`.
   
   ### Sequential CPU Baker Steps:
   To prepare the data for the GPU, the CPU processes the local geometry values in order:
   
   1. **Apply Inflate**:
      $$\vec{offset} = \vec{offset} - I$$
      $$\vec{scale} = \vec{scale} + 2I$$
      
   2. **Apply Scale Pivot**:
      $$\vec{offset} = \vec{scale\_pivot} + \vec{scale} \times (\vec{offset} - \vec{scale\_pivot})$$
      $$\vec{scale} = \vec{scale} \times \vec{scale\_vector}$$
      
   3. **Apply Rotation Pivot**:
      $$\vec{offset} = Q \times (\vec{offset} - \vec{rotation\_pivot}) \times Q^{-1} + \vec{rotation\_pivot}$$
      
   4. **Apply Translation**:
      $$\vec{offset} = \vec{offset} + \vec{translation}$$
      
   These final computed values are written directly to the `offset` and `scale` fields in the `CubeStruct`.
   
   ### GPU Shader Math:
   The GPU only needs to apply the final bone rotation/transformation ($Q_{\text{bone}}$) at the very end:
   $$V_{\text{final}} = Q_{\text{bone}} \times (V_{\text{local}} \times \vec{scale}) \times Q_{\text{bone}}^{-1} + \vec{offset}$$
   

3. **Face uvs**

4. **In-Shader Random Offsets (Unified Shader Batching)**:
   Since all voxel quads in a chunk are rendered using a single unified shader to minimize draw calls and state changes, we cannot use block-type-specific shader code.
   
   Minecraft bakes this type into the final vertex data, but because we are triyng to reduce the memory footprint of a chunk mesh, we have to move the random offset to the gpu shader.  
    The random offset component specfies a range and a step paramater for each axis, i decided to put this into the cubeTransform data as there were some bytes left to the alligned size of 48 bytes. 

---

## CubeStruct Schema (48-Bytes Stride)

```typescript
import { ArrayType, Bit, Float16, Int8, Struct, Uint32, Uint8 } from "bitpacker";

const QuaternionStruct = new Uint32(); // Or we can use Uint32 for 32-bit smallest-three
const FaceUVStruct = new Struct({
    u: new Uint8(),
    v: new Uint8(),
    w: new Int8(),
    h: new Int8(),
});

const rangeStruct = new Struct({min: new Int8(), max: new Int8()});

export const CubeStruct = new Struct({
    // --- Geometry & Scale (17 Bytes) ---
    rotation: QuaternionStruct,
    offset: new ArrayType(new Float16(), 3),
    scale: new ArrayType(new Float16(), 3),
    
    // --- Face UVs (6 Faces * 4 Bytes = 24 Bytes) ---
    uvs: new ArrayType(FaceUVStruct, 6),  

    // --- Random Offset Parameters (7 Bytes) ---
    x_offset: rangeStruct,
    y_offset: rangeStruct,
    z_offset: rangeStruct,
    
    x_offset_step: new Bit(2),
    y_offset_step: new Bit(2),
    z_offset_step: new Bit(2),

    //Flags
    random_offset_enabled: new Bit(1),
    pad1: new Bit(1),

    // --- Move the cube faces along the normal direction (1 Byte) ---
    inset: new Uint8(),
});

```
```
```
