export type MockCategory = 'user' | 'media' | 'commerce' | 'locale' | 'finance' | 'marketing' | 'ui';

export type DatasetSource =
	| { type: 'module' }
	| { type: 'json'; file: string };

export type MockDatasetMeta = {
	key: string;
	title: string;
	description: string;
	category: MockCategory;
	tags: string[];
	isNew?: boolean;
	featured?: boolean;
	source: DatasetSource;
};

export type MockDatasetEntry = MockDatasetMeta & {
	load: () => Promise<unknown>;
};

export type ManifestDataset = Omit<MockDatasetMeta, 'source'> & {
	source: DatasetSource;
};

export type Manifest = {
	_readme?: string;
	datasets: ManifestDataset[];
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
