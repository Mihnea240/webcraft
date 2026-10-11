import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@types': path.resolve(__dirname, './types'),
			'@engine': path.resolve(__dirname, './engine'),
			'@utils': path.resolve(__dirname, './engine/utils'),
			'@resources': path.resolve(__dirname, './resources'),
			'@web_components': path.resolve(__dirname, './web_components'),
			'@examples': path.resolve(__dirname, './examples'),

			// Engine subsystems
			'@voxel': path.resolve(__dirname, './engine/chunk'),
			'@block': path.resolve(__dirname, './engine/block'),
			'@player': path.resolve(__dirname, './engine/player'),
			'@world': path.resolve(__dirname, './engine/world'),
			'@chunk': path.resolve(__dirname, './engine/chunk'),
			
			// Sibling BitPacker link
			'@bitpacker': path.resolve(__dirname, '../web-components/core/bitpacker/index.ts')
		}
	}
});