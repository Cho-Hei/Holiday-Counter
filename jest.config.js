const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  clearMocks: true,
  coverageProvider: "babel",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // ...
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(s?css|less)$": "identity-obj-proxy",
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);