import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "tests", // Directory where your test files are located
  testMatch: "*.test.ts", // Pattern to match test files
  // ... other configurations ...
};
export default config;
