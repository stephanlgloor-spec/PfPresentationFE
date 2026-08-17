import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Look only for specific E2E extensions
  testMatch: /.*\.spec\.ts/, 
  timeout: 30000,
  use: {
    baseURL: 'https://www.postfinance.ch/',
    headless: false,
    viewport: { width: 1960, height: 1440 },
    browserName: 'chromium',
    actionTimeout: 10000,
    ignoreHTTPSErrors: true
  }
});
