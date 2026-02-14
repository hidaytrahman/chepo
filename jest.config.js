// jest.config.js (ESM syntax)
export default {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'babel-jest',
		'\\.css$': 'jest-css-modules-transform',
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	coverageDirectory: 'coverage',
	collectCoverage: true,
	coverageReporters: ['text', 'lcov'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
};
