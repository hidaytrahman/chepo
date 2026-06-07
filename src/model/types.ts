export type MockCategory = 'user' | 'media' | 'commerce' | 'locale' | 'finance' | 'marketing' | 'ui';

export type MockDatasetMeta = {
	key: string;
	title: string;
	description: string;
	category: MockCategory;
	tags: string[];
	isNew?: boolean;
	featured?: boolean;
};

export type MockDatasetEntry = MockDatasetMeta & {
	data: unknown;
};

export const CATEGORY_LABELS: Record<MockCategory, string> = {
	user: 'User & Identity',
	media: 'Media & Players',
	commerce: 'E-commerce',
	locale: 'Locale & Geography',
	finance: 'Finance',
	marketing: 'Marketing',
	ui: 'UI & Layout',
};

export const CATEGORY_ORDER: MockCategory[] = [
	'user',
	'media',
	'commerce',
	'locale',
	'finance',
	'marketing',
	'ui',
];
