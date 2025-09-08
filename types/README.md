# TypeScript Definitions for WebCraft

This directory contains TypeScript definition files for the WebCraft voxel engine project.

## File Structure

```
types/
├── index.d.ts          # Main export file - import from here
├── core.d.ts           # Core interfaces and base types
├── engine.d.ts         # Engine classes (World, Player, Chunk, etc.)
├── web-components.d.ts # Web component definitions
├── constants.d.ts      # Constants and settings
└── README.md          # This file
```

## Usage

### Basic Import
```javascript
// Import all types
import type { Player, World, Chunk } from './types';

// Or import specific types
import type { ChunkPipeline, ChunkRenderer } from './types/engine';
```

### JSDoc Integration
The types are designed to work with JSDoc comments in your JavaScript files:

```javascript
/**
 * @param {World} world - The world instance
 * @param {Player} player - The player instance
 */
function setupGame(world, player) {
    // Your code here with full IntelliSense
}
```

### VS Code Integration
With the updated `jsconfig.json`, VS Code will automatically:
- Provide IntelliSense for all engine classes
- Show method signatures and parameter types
- Catch type errors in your JavaScript code
- Support Go to Definition for types

## Key Types

### Core Engine
- `World` - Main world container with chunks and players
- `Player` - Player entity with camera and controls
- `Chunk` - Voxel chunk with mesh data
- `ChunkPipeline` - WebGPU rendering pipeline
- `ChunkRenderer` - Chunk rendering system

### Utilities
- `InputManager` - Input handling system
- `Array3D` - 3D array for voxel data
- `BitPacker` - Bit packing utilities
- `BlockModel` - Block type system

### Block System
- `BlockState` - Individual block state
- `BlockObjectParser` - Block definition parser
- `AtlasBuilder` - Texture atlas builder

## Features

1. **No Runtime Dependencies**: These are pure TypeScript definitions with no runtime impact
2. **Three.js Compatibility**: Uses generic interfaces instead of direct Three.js dependencies
3. **WebGPU Support**: Includes basic WebGPU type hints
4. **Modular Design**: Organized by functionality for easy maintenance
5. **JSDoc Integration**: Works seamlessly with existing JSDoc comments

## Extending Types

To add new types or modify existing ones:

1. **Core types**: Add to `core.d.ts`
2. **Engine classes**: Add to `engine.d.ts` 
3. **Web components**: Add to `web-components.d.ts`
4. **Constants**: Add to `constants.d.ts`
5. **Re-export**: Update `index.d.ts` if needed

## Path Aliases

The `jsconfig.json` includes these path aliases:
- `@types/*` → `./types/*`
- `@engine/*` → `./engine/*` 
- `@utils/*` → `./engine/utils/*`
- `@voxel/*` → `./engine/voxel/*`
- `@block-model/*` → `./engine/block_model/*`

Example usage:
```javascript
import Player from '@engine/player.js';
import { Array3D } from '@utils/memory_management.js';
```

## Notes

- Types use generic interfaces (like `Vector3Like`) instead of Three.js types to avoid dependency issues
- Static class members are properly declared using `declare class` syntax
- All major engine components are typed for full IntelliSense support
- WebGPU types are simplified to avoid complex dependency chains
