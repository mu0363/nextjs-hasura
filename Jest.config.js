module.exports = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "tests/(.*)": "<rootDir>/__tests__/$1",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
