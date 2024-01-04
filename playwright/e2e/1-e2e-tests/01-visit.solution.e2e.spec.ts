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

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The site", () => {
  test("Should work", async ({ page }) => {
    // thanks to playwright.config.ts, the url could be simply '/'
    await page.goto("http://localhost:4100");
  });
});
