/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    preset: 'ts-jest',
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testEnvironment: 'node',
    verbose: true,
};