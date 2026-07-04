import { loadMockData, peekMockData, clearMockDataCache, isMockDataCached } from './dataLoader';

describe('dataLoader', () => {
	beforeEach(() => {
		clearMockDataCache();
	});

	test('loadMockData loads a module dataset', async () => {
		const data = await loadMockData('videoPlayer');
		expect(data).toBeDefined();
		expect(typeof data).toBe('object');
		expect(isMockDataCached('videoPlayer')).toBe(true);
	});

	test('loadMockData resolves case-insensitive keys', async () => {
		const data = await loadMockData('VideoPlayer');
		expect(data).toBeDefined();
	});

	test('loadMockData caches results', async () => {
		const first = await loadMockData('todos');
		const second = await loadMockData('todos');
		expect(first).toBe(second);
		expect(peekMockData('todos')).toBe(first);
	});

	test('loadMockData throws for unknown keys', async () => {
		await expect(loadMockData('not-a-real-key')).rejects.toThrow('Unknown dataset key');
	});

	test('loadMockData loads a JSON dataset', async () => {
		const data = await loadMockData('githubRepo');
		expect(data).toBeDefined();
		expect(typeof data).toBe('object');
		expect(data).toHaveProperty('name');
	});
});
