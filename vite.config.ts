import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const isVercel = process.env.VERCEL === '1';
	const explicitBase = process.env.VITE_BASE_PATH;
	const base = explicitBase ?? (command === 'serve' ? '/' : isVercel ? '/' : '/chepo/');

	return {
		base,
		plugins: [react()],
	};
});
