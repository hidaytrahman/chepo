import { modal } from '../model';

type DataCatalogItem = {
	id: number;
	name: string;
	title: string;
	isNew?: boolean;
};

const toTitle = (name: string) =>
	name
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/_/g, ' ')
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());

export const getMockDataKeys = (): string[] => Object.keys(modal);

export const getMockDataByKey = (key: string): any => {
	const k = getMockDataKeys().find((n) => n.toLowerCase() === key.toLowerCase());
	return k ? (modal as any)[k] : undefined;
};

export const getDataCatalog = (): DataCatalogItem[] =>
	getMockDataKeys().map((name, idx) => ({
		id: idx + 1,
		name,
		title: toTitle(name),
	}));

export const searchMockData = (query: string): string[] => {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return getMockDataKeys().filter((name) => name.toLowerCase().includes(q));
};

export const dataList: DataCatalogItem[] = getDataCatalog();

export const highlightColors = ['gray', 'blue', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'magenta'];

const deepIncludes = (value: unknown, q: string): boolean => {
	if (value == null) return false;
	const t = typeof value;
	if (t === 'string') return (value as string).toLowerCase().includes(q);
	if (t === 'number') return String(value).toLowerCase().includes(q);
	if (t === 'boolean') return String(value).toLowerCase().includes(q);
	if (Array.isArray(value)) {
		for (const v of value) {
			if (deepIncludes(v, q)) return true;
		}
		return false;
	}
	if (t === 'object') {
		for (const v of Object.values(value as Record<string, unknown>)) {
			if (deepIncludes(v, q)) return true;
		}
		return false;
	}
	return false;
};

export const searchAllMockData = (query: string): string[] => {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const keys = getMockDataKeys();
	const byName = searchKeysByQueryTokens(query);
	const byContent = keys.filter((name) => {
		const data = getMockDataByKey(name);
		try {
			return deepIncludes(data, q);
		} catch {
			return false;
		}
	});
	const set = new Set<string>([...byName, ...byContent]);
	return Array.from(set);
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

const aliasMap: Record<string, string[]> = {
	photos: ['photo', 'image', 'images', 'pic', 'pics', 'picture', 'pictures', 'gallery'],
	users: ['user', 'person', 'people', 'account', 'profile'],
	github: ['git', 'gh', 'repo'],
	products: ['product', 'item', 'items', 'catalog'],
	categories: ['category', 'group', 'type'],
	months: ['month'],
	week: ['weeks', 'weekday', 'weekdays'],
	countries: ['country', 'nation', 'nationality', 'code', 'dial'],
	languages: ['language', 'locale'],
	cart: ['basket', 'checkout'],
	accounts: ['bank', 'account', 'finance'],
	marketing: ['campaign', 'ads', 'advertisement'],
	audio: ['sound', 'music'],
	video: ['media', 'movie'],
	layout: ['ui', 'screen', 'page'],
};

const expandAliases = (tokens: string[]): string[] => {
	const out = new Set<string>();
	for (const t of tokens) {
		out.add(t);
		const aliases = aliasMap[t];
		if (aliases) {
			for (const a of aliases) out.add(a);
		}
	}
	return Array.from(out);
};

const getKeyTokens = (name: string): string[] => {
	const base = splitTokensFromName(name);
	return expandAliases(base);
};

const matchTokens = (queryTokens: string[], keyTokens: string[]): boolean => {
	return queryTokens.every((qt) => keyTokens.some((kt) => kt.includes(qt) || qt.includes(kt)));
};

export const searchKeysByQueryTokens = (query: string): string[] => {
	const q = normalize(query);
	if (!q) return [];
	const qTokens = q.split(' ');
	const keys = getMockDataKeys();
	const matches = keys.filter((name) => matchTokens(qTokens, getKeyTokens(name)));
	if (matches.length) return matches;
	return keys.filter((name) => name.toLowerCase().includes(q));
};
