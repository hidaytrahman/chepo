import {
	videoPlayer,
	audioPlayer,
	radioPlayer,
	slideSettings,
	languages,
	months,
	monthsShort,
	week,
	weekShort,
	countries,
	cart,
	accounts,
	marketing,
} from './misc';
import { photosFull, photosShort, todos, users, githubUser, userMe } from './user/users';
import { productCategories, products } from './misc/products';
import { layout } from './ui';
import type { MockDatasetEntry } from './types';

/**
 * Single source of truth for all mock datasets.
 * To add a new dataset: import the data and append one entry here.
 */
export const mockRegistry: MockDatasetEntry[] = [
	{
		key: 'users',
		title: 'Users',
		description: 'Full user profiles with address, roles, and purchase history',
		category: 'user',
		tags: ['user', 'person', 'people', 'profile', 'account', 'customer'],
		featured: true,
		data: users,
	},
	{
		key: 'userMe',
		title: 'Current User',
		description: 'Authenticated user session with profile and preferences',
		category: 'user',
		tags: ['user', 'me', 'session', 'auth', 'profile', 'current'],
		isNew: true,
		data: userMe,
	},
	{
		key: 'githubUser',
		title: 'GitHub User',
		description: 'GitHub API user profile response shape',
		category: 'user',
		tags: ['github', 'git', 'developer', 'profile', 'api'],
		featured: true,
		data: githubUser,
	},
	{
		key: 'todos',
		title: 'Todos',
		description: 'Simple todo items with completion status',
		category: 'user',
		tags: ['todo', 'task', 'checklist', 'list'],
		data: todos,
	},
	{
		key: 'photosFull',
		title: 'Photos (Full)',
		description: 'Unsplash-style photo object with full metadata',
		category: 'media',
		tags: ['photo', 'image', 'unsplash', 'gallery', 'picture', 'full'],
		data: photosFull,
	},
	{
		key: 'photosShort',
		title: 'Photos (Short)',
		description: 'Trimmed photo object for lightweight use cases',
		category: 'media',
		tags: ['photo', 'image', 'unsplash', 'gallery', 'picture', 'short'],
		featured: true,
		data: photosShort,
	},
	{
		key: 'videoPlayer',
		title: 'Video Player',
		description: 'Video player UI state and controls',
		category: 'media',
		tags: ['video', 'player', 'media', 'movie', 'stream'],
		featured: true,
		data: videoPlayer,
	},
	{
		key: 'audioPlayer',
		title: 'Audio Player',
		description: 'Audio player UI state with track info',
		category: 'media',
		tags: ['audio', 'music', 'sound', 'player', 'track'],
		data: audioPlayer,
	},
	{
		key: 'radioPlayer',
		title: 'Radio Player',
		description: 'Radio stream player state and station info',
		category: 'media',
		tags: ['radio', 'stream', 'station', 'audio', 'player'],
		isNew: true,
		data: radioPlayer,
	},
	{
		key: 'products',
		title: 'Products',
		description: 'Paginated product catalog (DummyJSON-style API response)',
		category: 'commerce',
		tags: ['product', 'catalog', 'shop', 'store', 'ecommerce', 'items'],
		featured: true,
		data: products,
	},
	{
		key: 'productCategories',
		title: 'Product Categories',
		description: 'E-commerce category list with slugs and URLs',
		category: 'commerce',
		tags: ['category', 'categories', 'catalog', 'shop', 'taxonomy'],
		data: productCategories,
	},
	{
		key: 'cart',
		title: 'Shopping Cart',
		description: 'Cart with items, tax, shipping, and totals',
		category: 'commerce',
		tags: ['cart', 'basket', 'checkout', 'order', 'shopping'],
		data: cart,
	},
	{
		key: 'countries',
		title: 'Countries',
		description: 'Country list with dial codes and flag emojis',
		category: 'locale',
		tags: ['country', 'nation', 'dial', 'phone', 'flag', 'international'],
		data: countries,
	},
	{
		key: 'languages',
		title: 'Languages',
		description: 'ISO language codes for localization',
		category: 'locale',
		tags: ['language', 'locale', 'i18n', 'translation', 'iso'],
		data: languages,
	},
	{
		key: 'months',
		title: 'Months',
		description: 'Full month names',
		category: 'locale',
		tags: ['month', 'calendar', 'date', 'time'],
		data: months,
	},
	{
		key: 'monthsShort',
		title: 'Months (Short)',
		description: 'Abbreviated month names',
		category: 'locale',
		tags: ['month', 'calendar', 'date', 'abbreviation'],
		data: monthsShort,
	},
	{
		key: 'week',
		title: 'Weekdays',
		description: 'Full weekday names',
		category: 'locale',
		tags: ['week', 'weekday', 'day', 'calendar'],
		data: week,
	},
	{
		key: 'weekShort',
		title: 'Weekdays (Short)',
		description: 'Abbreviated weekday names',
		category: 'locale',
		tags: ['week', 'weekday', 'day', 'abbreviation'],
		data: weekShort,
	},
	{
		key: 'accounts',
		title: 'Bank Accounts',
		description: 'Bank account records with balances and transactions',
		category: 'finance',
		tags: ['bank', 'account', 'finance', 'money', 'transaction'],
		data: accounts,
	},
	{
		key: 'marketing',
		title: 'Marketing Dashboard',
		description: 'Campaign analytics and performance metrics',
		category: 'marketing',
		tags: ['marketing', 'campaign', 'ads', 'analytics', 'dashboard'],
		data: marketing,
	},
	{
		key: 'slideSettings',
		title: 'Carousel Settings',
		description: 'Owl Carousel-style slider configuration',
		category: 'ui',
		tags: ['carousel', 'slider', 'settings', 'owl', 'slideshow'],
		data: slideSettings,
	},
	{
		key: 'layout',
		title: 'Dashboard Layout',
		description: 'Dashboard layout API response with sections',
		category: 'ui',
		tags: ['layout', 'dashboard', 'ui', 'screen', 'sections'],
		data: layout,
	},
];

const registryByKey = new Map(mockRegistry.map((entry) => [entry.key, entry]));

export const getRegistryEntry = (key: string): MockDatasetEntry | undefined => {
	const normalized = key.toLowerCase();
	return mockRegistry.find((entry) => entry.key.toLowerCase() === normalized);
};

export const getRegistryData = (key: string): unknown => getRegistryEntry(key)?.data;

export const buildModalMap = (): Record<string, unknown> =>
	Object.fromEntries(mockRegistry.map((entry) => [entry.key, entry.data]));

/** @deprecated Use mockRegistry instead. Kept for backward compatibility. */
export const modal = buildModalMap();
