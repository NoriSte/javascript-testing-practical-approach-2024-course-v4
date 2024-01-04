import { test } from "@playwright/test";

/**
 * Main goals
 * - Visit the home page of the site
 *
 * Additional goals
 * - Change the viewport size
 * - Change the viewport once for all the tests
 *
 * What to learn
 * - Using Playwright1's documentation
 * - Using basic Playwright's commands
 * - Getting familiar with the Playwright's UI
 * - Getting familiar `test.use`
 */

test.describe("The site", () => {
  test("Should work", async ({ page }) => {
    // Playwright docs https://playwright.dev/docs
    // ...
  });
});
