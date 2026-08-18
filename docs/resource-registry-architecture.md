# Resource Registry & Serialization Architecture

This document describes the design, interfaces, and architecture of the resource registry system in WebCraft, explaining how we synchronize resources (textures, tiles, mappings) between the Web Worker (off-thread JIT parser) and the Main Thread (GPU renderer) using zero-copy memory transfers.

---

## 1. Core Concepts & Objectives

WebCraft targets 60+ FPS on low-end and mobile hardware. To achieve this, resource loading and texture atlas stitching must run off-thread to avoid locking the UI. Our architecture satisfies three goals:
1. **Unified Interface**: The exact same registry classes (e.g., `BlockTextureRegistry`, `AtlasTileRegistry`) run on both the main thread and the worker, keeping binary layout and query logic in one place.
2. **Zero-Copy Transfers**: Heavy data (pixel arrays, packed GPU descriptors) is written directly to binary buffers (`ArrayBuffer`) and transferred between threads using Web Transferable pointers instead of JSON cloning.
3. **Registry Caching**: The state of any registry is defined by its binary buffer and a string-to-ID mapping table, making it trivial to save/restore from IndexedDB.

---

## 2. Interface Definitions

### 2.1 StorageUnit
Every registry is backed by a `StorageUnit`, which manages raw allocation, resizing, and JIT-optimized element access.

```typescript
export interface StorageUnit<ElementType, MetaType> {
    useMetadata: boolean;

    get(id: number): ElementType | undefined;
    set(id: number, value: Partial<ElementType>): void;

    getMeta(id: number): MetaType | undefined;
    setMeta(id: number, value: MetaType): void;

    writePointer(): number;
    add(value: Partial<ElementType>, meta: MetaType): number;

    // Exports standard serializable metadata (excluding raw binary buffers)
    exportMetadata(): {
        metadata: MetaType[];
        length: number;
        arrayData?: ElementType[]; // Only present for non-binary array storages
    };
    
    importMetadata(state: {
        metadata: MetaType[];
        length: number;
        arrayData?: ElementType[];
    }): void;
}
```

### 2.2 ResourceRegistry
The base class for all registries. It defines the mapping maps (`nameToIdMap` and `idToNameMap`) and cascading parental lookups.

```typescript
export abstract class ResourceRegistry<ElementType, MetaType> {
    public storage: StorageUnit<ElementType, MetaType>;

    // Decoupled constructor: Setup empty default storage, or link parent for cascading clone
    constructor(public parent?: ResourceRegistry<ElementType, MetaType>) {
        if (parent) {
            this.storage = parent.storage;
        } else {
            this.storage = this.createStorageUnit();
        }
    }

    // --- Buffer checkout and import ---
    // Returns all raw transferable ArrayBuffers owned by this registry
    public checkoutBuffers(): ArrayBuffer[];
    // Binds transferred ArrayBuffers back to this registry
    public importBuffers(buffers: ArrayBuffer[], writePointers?: number[]): void;

    // --- Metadata export and import ---
    // Returns serializable name mappings and storage metadata
    public exportMetadata(): RegistryMetadata;
    public importMetadata(state: RegistryMetadata): void;
}
```

---

## 3. Unified Data Flow (Off-Thread Compilation)

The data flow leverages the **Payload Packer** to automate checking out buffers and serializing metadata across all registries in a single generic loop, avoiding recurrent boilerplate.

### Sequence Flow:

```
[Main Thread]                             [Web Worker]
-------------                             ------------
1. RP.ts default()
   - Instantiates Registries
          │
2. RP.ts parseTerrainTextures()
   - WorkerEntryPoint.preparePayload()
   - Checks out ArrayBuffers
          │
          ├───────── [Transfer Request] ─────────► 3. textureHandler.ts onmessage
          │          (zipBuffer + ArrayBuffers)     - Instantiates TextureMapper
          │                                         - Re-attaches ArrayBuffers
          │                                         - Hydrates Metadata
          │                                                │
          │                                         4. TextureMapper.parse()
          │                                         - Decodes PNG/TGA
          │                                         - Stitches Altases on CPU
          │                                         - Writes directly to buffers
          │                                                │
          │                                         5. packRegistries()
          │                                         - Checks out ArrayBuffers
          ├───────── [Transfer Response] ◄─────────┘ (ArrayBuffers + Metadata)
          ▼
6. WorkerEntryPoint.interpretPayload()
   - Re-attaches ArrayBuffers
   - Imports Mappings & Metadata
   - Ready for Chunk Meshing
```

---

## 4. Key Architectural Decisions Log

### Decision 1: Decoupling Registry Constructors from Storage Units
*   **Context**: Initially, registry constructors accepted a `storage` medium argument. This tightly coupled registry instantiation with storage allocation and made hydration code cluttered.
*   **Decision**: We removed the `storage` parameter. Constructors now only accept an optional `parent` registry for parent-child cloning. Registries instantiate their default storage upon creation, and rely on `importBuffers()` and `importMetadata()` to swap their buffers during hydration.

### Decision 2: Separating Transferables from Metadata
*   **Context**: An `ArrayBuffer` is a **transferable** object (passed zero-copy via pointer swap), whereas metadata (name mappings, tint flags) is a standard **cloneable** JS object.
*   **Decision**: We split the registry state transfer into two separate paths:
    1.  `checkoutBuffers()` / `importBuffers()` which deal strictly with `ArrayBuffer[]`.
    2.  `exportMetadata()` / `importMetadata()` which deal strictly with JSON-serializable configurations.

### Decision 3: Automated Payload Packer
*   **Context**: Writing custom buffer-binding code for every new registry type is error-prone and scales poorly.
*   **Decision**: We created `payloadPacker.ts`. It iterates through a dictionary of registries, checks out all buffers, tracks how many buffers each registry owns (allowing registries like `AtlasTileRegistry` to own multiple buffers), and packages them. The receiving thread runs the inverse loop, completely automating worker bindings.

### Decision 4: Fallback Error Boundary (No `undefined` Propagation)
*   **Context**: If a texture file is missing from a ZIP or Jpeg/Png decoding fails, propagating `undefined` up the stack requires checking for `undefined` on every level and risks crashing the WebGL render loop.
*   **Decision**: We implemented a `try/catch` boundary in `TextureMapper.addTileAtIndex()`. If any parsing step fails, it catches the exception, prints a warning, and returns `this.fallbackTextureId` (a pre-rendered black-and-purple checkerboard). The rest of the engine remains type-safe and never has to handle `undefined` values.

### Decision 5: Singly Linked List Pack Cascading and Logical Deletion
*   **Context**: Users can enable/disable resource packs dynamically at runtime. Shifting or rebuilding packed binary buffers when a pack is removed is extremely expensive and causes WebGL stalls.
*   **Decision**: We modeled `ResourcePack` and `ResourceRegistry` as singly linked lists pointing to their parents. When a pack is disabled, we traverse the list and bypass the pack and its registries ($O(1)$ pointer swaps). The physical buffers remain untouched, but the name-to-ID mappings of the bypassed pack are logically severed, instantly updating the visible assets without stalling the GPU.

### Decision 6: Shallow Buffer Sharing in Multi-World Environments
*   **Context**: Multiple WebCraft worlds might run on a single page. They should share the heavy resources (VRAM, texture arrays) to save memory, but need independent pack chains and custom name-to-ID mappings.
*   **Decision**: Cloning a registry (via `new BlockTextureRegistry(parent)`) performs a shallow reference of the underlying data `storage` (sharing the same `ArrayBuffer` and elements), but instantiates separate mapping dictionaries (`nameToIdMap`). This achieves zero duplicated memory across worlds while keeping logical control isolated per world viewport.

