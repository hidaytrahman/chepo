import { mockRegistry, getRegistryEntry } from '../model/registry';
import { CATEGORY_LABELS, CATEGORY_ORDER, type MockCategory, type MockDatasetMeta } from '../model/types';

export type DataCatalogItem = MockDatasetMeta & {
	id: number;
	/** @deprecated Use `key` instead. Kept for backward compatibility. */
	name: string;
};

const toTitle = (name: string) =>
	name
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/_/g, ' ')
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());

export const getMockDataKeys = (): string[] => mockRegistry.map((entry) => entry.key);

export const getMockDataByKey = (key: string): unknown => getRegistryEntry(key)?.data;

export const getDataCatalog = (): DataCatalogItem[] =>
	mockRegistry.map((entry, idx) => ({
		id: idx + 1,
		key: entry.key,
		name: entry.key,
		title: entry.title || toTitle(entry.key),
		description: entry.description,
		category: entry.category,
		tags: entry.tags,
		isNew: entry.isNew,
		featured: entry.featured,
	}));

export const getFeaturedDatasets = (): DataCatalogItem[] =>
	getDataCatalog().filter((item) => item.featured);

export const getDatasetsByCategory = (category: MockCategory): DataCatalogItem[] =>
	getDataCatalog().filter((item) => item.category === category);

export const getCategories = (): { id: MockCategory; label: string; count: number }[] => {
	const counts = new Map<MockCategory, number>();
	for (const entry of mockRegistry) {
		counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
	}
	return CATEGORY_ORDER.map((id) => ({
		id,
		label: CATEGORY_LABELS[id],
		count: counts.get(id) ?? 0,
	})).filter((cat) => cat.count > 0);
};

const normalize = (s: string): string =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const splitTokensFromName = (name: string): string[] => {
	const camelSplit = name.replace(/([a-z])([A-Z])/g, '$1 $2');
	const normalized = normalize(camelSplit.replace(/[_-]/g, ' '));
	return normalized ? normalized.split(' ') : [];
};

const getSearchableText = (entry: (typeof mockRegistry)[number]): string =>
	[
		entry.key,
		entry.title,
		entry.description,
		CATEGORY_LABELS[entry.category],
		entry.category,
		...entry.tags,
		...splitTokensFromName(entry.key),
	]
		.join(' ')
		.toLowerCase();

const matchQuery = (text: string, queryTokens: string[]): boolean =>
	queryTokens.every((token) => text.includes(token));

export const searchCatalog = (query: string): DataCatalogItem[] => {
	const q = normalize(query);
	if (!q) return getDataCatalog();

	const queryTokens = q.split(' ');
	return getDataCatalog().filter((item) => {
		const entry = getRegistryEntry(item.key);
		if (!entry) return false;
		return matchQuery(getSearchableText(entry), queryTokens);
	});
};

export const searchMockData = (query: string): string[] =>
	searchCatalog(query).map((item) => item.key);

export const searchKeysByQueryTokens = (query: string): string[] => searchMockData(query);

export const searchAllMockData = (query: string): string[] => searchMockData(query);
