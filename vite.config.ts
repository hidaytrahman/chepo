import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/chepo/', // modified lines
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: './setupTests.ts',
		// css: true,
		coverage: {
			reporter: ['text', 'json', 'html', 'lcov'],
			// all: true,
			// include: ['src/**/*.{ts,tsx}'],
			// exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
			// statements: 80,
			// branches: 80,
			// functions: 80,
			// lines: 80,
			// perFile: true,
			// skipFull: true,
			reportsDirectory: 'coverage',
		},
	},
});
