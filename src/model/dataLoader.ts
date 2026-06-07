import { getRegistryEntry } from './registry';

const cache = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();

export const loadMockData = async (key: string): Promise<unknown> => {
	const entry = getRegistryEntry(key);
	if (!entry) {
		throw new Error(`Unknown dataset key: ${key}`);
	}

	if (cache.has(entry.key)) {
		return cache.get(entry.key);
	}

	const pending = inflight.get(entry.key);
	if (pending) {
		return pending;
	}

	const promise = entry.load().then((data) => {
		cache.set(entry.key, data);
		inflight.delete(entry.key);
		return data;
	});

	inflight.set(entry.key, promise);
	return promise;
};

export const peekMockData = (key: string): unknown | undefined => {
	const entry = getRegistryEntry(key);
	return entry ? cache.get(entry.key) : undefined;
};

export const clearMockDataCache = (): void => {
	cache.clear();
	inflight.clear();
};

export const isMockDataCached = (key: string): boolean => {
	const entry = getRegistryEntry(key);
	return entry ? cache.has(entry.key) : false;
};
