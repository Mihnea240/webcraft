import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
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
