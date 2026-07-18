import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@engine': path.resolve(__dirname, './engine'),
			'@utils': path.resolve(__dirname, './engine/utils'),
			'@web_components': path.resolve(__dirname, './web_components'),
			'@chunk': path.resolve(__dirname, './engine/chunk'),
			'@voxel': path.resolve(__dirname, './engine/chunk'),
			'@block': path.resolve(__dirname, './engine/block'),
			'@player': path.resolve(__dirname, './engine/player'),
			'@world': path.resolve(__dirname, './engine/world'),
			'web-components': path.resolve(__dirname, '../web-components/core/decorators/index.ts')
		}
	},
	esbuild: {
		target: 'esnext',
		supported: {
			'decorators': false // Force ESBuild to transpile standard Stage 3 decorators
		},
		tsconfigRaw: {
			compilerOptions: {
				experimentalDecorators: false,
				useDefineForClassFields: true
			}
		}
	}
});
