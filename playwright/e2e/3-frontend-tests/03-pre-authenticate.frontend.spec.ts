import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Navigate the home page and get the user already logged in by mocking the back-end
 *
 * What to learn
 * - We don't need to pass through the registration page anymore
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The home page", () => {
  test.beforeEach(async ({ page }) => {
    // ...
  });

  test("Should work", async ({ page }) => {
    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
  });
});
