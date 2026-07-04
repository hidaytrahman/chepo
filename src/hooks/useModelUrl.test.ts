import { getInitialModelFromUrl, buildModelUrl } from './useModelUrl';

describe('useModelUrl helpers', () => {
	const originalLocation = window.location;

	beforeEach(() => {
		// @ts-expect-error jsdom location mock
		delete window.location;
		window.location = new URL('https://example.com/chepo/?model=users') as unknown as Location;
	});

	afterEach(() => {
		window.location = originalLocation;
	});

	test('getInitialModelFromUrl reads valid model param', () => {
		expect(getInitialModelFromUrl()).toBe('users');
	});

	test('getInitialModelFromUrl returns empty for unknown model', () => {
		window.location = new URL('https://example.com/chepo/?model=unknown') as unknown as Location;
		expect(getInitialModelFromUrl()).toBe('');
	});

	test('buildModelUrl sets model query param', () => {
		window.location = new URL('https://example.com/chepo/') as unknown as Location;
		expect(buildModelUrl('products')).toBe('/chepo/?model=products');
	});
});
