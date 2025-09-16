import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@types': path.resolve(__dirname, './types'),
			'@engine': path.resolve(__dirname, './engine'),
			'@utils': path.resolve(__dirname, './utils'),
			'@resources': path.resolve(__dirname, './resources'),
			'@web_components': path.resolve(__dirname, './web_components'),
			'@examples': path.resolve(__dirname, './examples'),

			// Engine subsystems
			'@voxel': path.resolve(__dirname, './engine/chunk'),
			'@block_model': path.resolve(__dirname, './engine/block_model'),
			'@player': path.resolve(__dirname, './engine/player'),
			'@world': path.resolve(__dirname, './engine/world'),
			'@chunk': path.resolve(__dirname, './engine/chunk'),


			// Core engine files - specific file aliases
			'@engine/world': path.resolve(__dirname, './engine/world/world.js'),
			'@engine/player': path.resolve(__dirname, './engine/player/player.js'),
			'@engine/gpu_manager': path.resolve(__dirname, './engine/world/gpu_manager.js'),

			// Chunk/Voxel system
			'@engine/chunk': path.resolve(__dirname, './engine/chunk/chunk.js'),
			'@engine/block_reference': path.resolve(__dirname, './engine/chunk/block_refrence.js'),
			'@engine/block_state': path.resolve(__dirname, './engine/chunk/block_state.js'),
			'@engine/chunk-mesher': path.resolve(__dirname, './engine/chunk/chunk_mesher.js'),

			// Utilities
			'@utils/constants': path.resolve(__dirname, './utils/constants.js'),
			'@utils/input-manager': path.resolve(__dirname, './utils/input_manager.js'),
			'@utils/voxel_dda': path.resolve(__dirname, './utils/voxel_dda.js'),
			'@utils/faces': path.resolve(__dirname, './utils/faces.js'),
			'@utils/memory_management': path.resolve(__dirname, './utils/memory_management.js'),
			'@utils/bit_packer': path.resolve(__dirname, './utils/bit_packer.js'),

			// Block model files
			'@block-model/blocks': path.resolve(__dirname, './engine/block_model/blocks.js'),

			// World files
			'@world/resource-loader': path.resolve(__dirname, './engine/world/resource-loader.js'),
			'@world/world': path.resolve(__dirname, './engine/world/world.js')
		}
	}
});