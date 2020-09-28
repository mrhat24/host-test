module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testTimeout: 10000,
};
