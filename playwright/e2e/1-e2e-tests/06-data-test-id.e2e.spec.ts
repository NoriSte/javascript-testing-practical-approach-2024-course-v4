import { test } from "@playwright/test";

/**
 * Main goals
 * - Leverage data-testid selectors
 *
 * What to learn
 * - Why element/id/class-based selectors aren't stable
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/register");
  });

  test("Should allow registering and redirects the user to the home page", async ({
    page,
  }) => {
    // ...
  });
});
