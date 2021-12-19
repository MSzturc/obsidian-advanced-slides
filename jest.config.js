/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePathIgnorePatterns: ["<rootDir>/docs/"],

	modulePaths: ['<rootDir>', 'node_modules'],
	moduleDirectories: ['src', 'node_modules'],

  };
