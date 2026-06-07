/**
 * Lazy loaders for JSON datasets. Each import() becomes a separate Vite chunk.
 * When adding a JSON file to data/datasets/, register it here and in manifest.json.
 */
const createJsonLoader = (
	file: string,
	viteImport: () => Promise<{ default: unknown }>,
): (() => Promise<unknown>) => {
	return (): Promise<unknown> => {
		if (typeof process !== 'undefined' && process.env.JEST_WORKER_ID) {
			// Jest cannot resolve JSON via dynamic import — read from disk instead.
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { readFileSync } = require('fs') as typeof import('fs');
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { resolve } = require('path') as typeof import('path');
			return Promise.resolve(
				JSON.parse(readFileSync(resolve(__dirname, '../data/datasets', file), 'utf-8')),
			);
		}
		return viteImport().then((module) => module.default);
	};
};

export const jsonLoaders: Record<string, () => Promise<unknown>> = {
	'../data/datasets/github.user.json': createJsonLoader('github.user.json', () =>
		import('../data/datasets/github.user.json'),
	),
	'../data/datasets/repo.json': createJsonLoader('repo.json', () =>
		import('../data/datasets/repo.json'),
	),
};
