import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:4100",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // Standard, non-authenticated browser
    {
      name: "chromium:e2e",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /1-e2e-tests\/.*(test|spec).(ts)/,
    },

    // Authenticated browser
    {
      name: "authenticated:chromium:e2e",
      use: {
        ...devices["Desktop Chrome"],
        storageState:
          "playwright/e2e/2-authenticated-e2e-tests/.auth/user.json",
      },
      dependencies: ["12-shared-authentication"],
      testMatch: /2-authenticated-e2e-tests\/.*(test|spec).(ts)/,
    },
    {
      name: "12-shared-authentication",
      testMatch: /12-shared-authentication.solution\.e2e\.setup\.ts/,
    },

    {
      name: "chromium:frontend",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /3-frontend-tests\/.*(test|spec).(ts)/,
    },

    {
      name: "chromium:realworld",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /realworld\/.*(test|spec).(ts)/,
    },

    /* Test against other browsers. */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run realworld:start",
    url: "http://localhost:4100",
    reuseExistingServer: !process.env.CI,
  },
});
