export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  extensionsToTreatAsEsm: ['.ts'],
  globals: { 'ts-jest': { useESM: true, tsconfig: './tsconfig.json' } },
  collectCoverageFrom: ['src/**/*.ts', '!src/server.ts']
};
