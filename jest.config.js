/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ["<rootDir>/docs/"],

    coveragePathIgnorePatterns: ["src/obsidianUtils.ts"],
	coverageDirectory: "docs/public",
	coverageReporters: ["text-summary","text", "lcov"],

    modulePaths: ['<rootDir>', 'node_modules'],
    moduleDirectories: ['src', 'node_modules'],

};
