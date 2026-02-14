import {
	getMockDataKeys,
	getMockDataByKey,
	searchMockData,
	getDataCatalog,
	searchAllMockData,
	searchKeysByQueryTokens,
} from './search.utils';

describe('search.utils', () => {
	test('getMockDataKeys returns non-empty keys', () => {
		const keys = getMockDataKeys();
		expect(Array.isArray(keys)).toBe(true);
		expect(keys.length).toBeGreaterThan(0);
		expect(keys).toContain('videoPlayer');
	});

	test('getMockDataByKey resolves case-insensitive key', () => {
		const data = getMockDataByKey('VideoPlayer');
		expect(data).toBeDefined();
		expect(typeof data).toBe('object');
	});

	test('searchMockData returns relevant matches', () => {
		const matches = searchMockData('user');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((m) => m.toLowerCase().includes('user'))).toBe(true);
	});

	test('searchAllMockData returns matches by key and content', () => {
		const matches = searchAllMockData('user');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((m) => m.toLowerCase().includes('user'))).toBe(true);
	});

	test('token-based search matches camelCase keys by phrase', () => {
		const matches = searchKeysByQueryTokens('photos full');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches).toContain('photosFull');
	});

	test('token-based search finds synonyms', () => {
		const matches = searchKeysByQueryTokens('image');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((m) => m.toLowerCase().includes('photos'))).toBe(true);
	});

	test('getDataCatalog produces items with title', () => {
		const catalog = getDataCatalog();
		expect(catalog.length).toBeGreaterThan(0);
		expect(catalog[0]).toHaveProperty('name');
		expect(catalog[0]).toHaveProperty('title');
	});
});
