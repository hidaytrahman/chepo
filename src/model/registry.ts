import manifest from '../data/manifest.json';
import { jsonLoaders } from './jsonLoaders';
import { moduleLoaders } from './loaders';
import type { Manifest, MockDatasetEntry } from './types';

const createLoader = (entry: Manifest['datasets'][number]): (() => Promise<unknown>) => {
	if (entry.source.type === 'json') {
		const path = `../data/datasets/${entry.source.file}`;
		const loader = jsonLoaders[path];
		if (!loader) {
			throw new Error(`JSON dataset file not found: ${entry.source.file} (key: ${entry.key})`);
		}
		return loader;
	}

	const loader = moduleLoaders[entry.key];
	if (!loader) {
		throw new Error(`Module loader not registered for key: ${entry.key}`);
	}
	return loader;
};

export const mockRegistry: MockDatasetEntry[] = (manifest as Manifest).datasets.map((entry) => ({
	...entry,
	load: createLoader(entry),
}));

export const getRegistryEntry = (key: string): MockDatasetEntry | undefined => {
	const normalized = key.toLowerCase();
	return mockRegistry.find((entry) => entry.key.toLowerCase() === normalized);
};

export const getRegistryKeys = (): string[] => mockRegistry.map((entry) => entry.key);
