import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: [
    {
      command: 'node ../../backend/server.js',
      port: 3000,
      reuseExistingServer: true,
      timeout: 15000,
    },
    {
      command: 'npm --prefix ../../frontend-web run dev',
      port: 5173,
      reuseExistingServer: true,
      timeout: 15000,
    },
    {
      command: 'npm --prefix ../../frontend-admin run dev',
      port: 5174,
      reuseExistingServer: true,
      timeout: 15000,
    },
  ],
});
