// const nxPreset = require("@nx/jest/preset").default;

process.env.NODE_ENV = "test";

module.exports = {
  // ...nxPreset,
  rootDir: "src/app",
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "../../coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/index.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ["../../jest.setup.ts"],
  testEnvironment: "../../jsdom-extended.js",
  transform: {
    "^()?!.*\\.(js|jsx|ts|tsx|css|json)$": "@nx/react/plugins/jest",
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@nx/next/babel"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
