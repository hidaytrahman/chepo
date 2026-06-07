/**
 * Lazy loaders for TypeScript datasets. Each import() creates a separate Vite chunk.
 * JSON datasets are loaded via import.meta.glob in registry.ts — no entry needed here.
 */
export const moduleLoaders: Record<string, () => Promise<unknown>> = {
	users: () => import('./user/users').then((m) => m.users),
	userMe: () => import('./user/users').then((m) => m.userMe),
	githubUser: () => import('./user/users').then((m) => m.githubUser),
	todos: () => import('./user/users').then((m) => m.todos),
	photosFull: () => import('./user/users').then((m) => m.photosFull),
	photosShort: () => import('./user/users').then((m) => m.photosShort),
	videoPlayer: () => import('./misc/media').then((m) => m.videoPlayer),
	audioPlayer: () => import('./misc/media').then((m) => m.audioPlayer),
	radioPlayer: () => import('./misc/media').then((m) => m.radioPlayer),
	products: () => import('./misc/products').then((m) => m.products),
	productCategories: () => import('./misc/products').then((m) => m.productCategories),
	slideSettings: () => import('./misc/settings').then((m) => m.slideSettings),
	languages: () => import('./misc/languages').then((m) => m.languages),
	months: () => import('./misc/months').then((m) => m.months),
	monthsShort: () => import('./misc/months').then((m) => m.monthsShort),
	week: () => import('./misc/week').then((m) => m.week),
	weekShort: () => import('./misc/week').then((m) => m.weekShort),
	countries: () => import('./misc/countries').then((m) => m.countries),
	cart: () => import('./misc/shopping').then((m) => m.cart),
	accounts: () => import('./misc/accounts').then((m) => m.accounts),
	marketing: () => import('./misc/marketing').then((m) => m.marketing),
	layout: () => import('./ui/layout').then((m) => m.layout),
};
