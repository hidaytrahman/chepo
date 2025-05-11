// jest.config.js (ESM syntax)
export default {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest', // For TypeScript
		'^.+\\.jsx?$': 'babel-jest', // For JavaScript
		'\\.css$': 'jest-css-modules-transform', // For CSS modules
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	coverageDirectory: 'coverage',
	collectCoverage: true,
	coverageReporters: ['text', 'lcov'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS imports
	},
};
