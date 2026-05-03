import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './features',
  timeout: 30_000,
  retries: 3,
  reporter: [['list'], ['junit', { outputFile: './playwright-report/results.xml' }]],
  use: {
    viewport: {
      width: 1280,
      height: 720,
    },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: './playwright-report',
})
