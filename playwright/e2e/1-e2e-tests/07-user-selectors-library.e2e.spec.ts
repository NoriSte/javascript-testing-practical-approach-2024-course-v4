import { test } from "@playwright/test";

/**
 * Main goals
 * - Leverage user-oriented selectors
 *
 * Additional goals
 * - Retrieve the button through its role
 *
 * What to learn
 * - Data-testid selectors don't help in case of debugging, is the property missing? Is it empty? Is it wrong?
 * - The importance of testing the same way the users use the app
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
