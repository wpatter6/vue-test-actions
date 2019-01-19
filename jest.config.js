module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '**/src/**/*.test.ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**.ts'
  ],
	coveragePathIgnorePatterns: [
    '<rootDir>/node_modules'
  ],
  testEnvironment: 'node'
}
