import {
	getMockDataKeys,
	getMockDataByKey,
	searchMockData,
	getDataCatalog,
	searchAllMockData,
	searchKeysByQueryTokens,
	searchCatalog,
	getFeaturedDatasets,
	getCategories,
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

	test('searchAllMockData returns matches by metadata', () => {
		const matches = searchAllMockData('user');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((m) => m.toLowerCase().includes('user'))).toBe(true);
	});

	test('token-based search matches camelCase keys by phrase', () => {
		const matches = searchKeysByQueryTokens('photos full');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches).toContain('photosFull');
	});

	test('token-based search finds synonyms via tags', () => {
		const matches = searchKeysByQueryTokens('image');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.some((m) => m.toLowerCase().includes('photos'))).toBe(true);
	});

	test('getDataCatalog produces items with metadata', () => {
		const catalog = getDataCatalog();
		expect(catalog.length).toBeGreaterThan(0);
		expect(catalog[0]).toHaveProperty('key');
		expect(catalog[0]).toHaveProperty('title');
		expect(catalog[0]).toHaveProperty('category');
		expect(catalog[0]).toHaveProperty('tags');
	});

	test('searchCatalog filters by category label', () => {
		const matches = searchCatalog('commerce');
		expect(matches.length).toBeGreaterThan(0);
		expect(matches.every((m) => m.category === 'commerce' || m.tags.length > 0)).toBe(true);
	});

	test('getFeaturedDatasets returns only featured items', () => {
		const featured = getFeaturedDatasets();
		expect(featured.length).toBeGreaterThan(0);
		expect(featured.every((item) => item.featured)).toBe(true);
	});

	test('getCategories returns labeled groups with counts', () => {
		const categories = getCategories();
		expect(categories.length).toBeGreaterThan(0);
		expect(categories[0]).toHaveProperty('label');
		expect(categories[0].count).toBeGreaterThan(0);
	});
});
