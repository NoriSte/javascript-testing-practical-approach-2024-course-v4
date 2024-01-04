import { test } from "@playwright/test";

/**
 * Main goals
 * - Compile all the registration form
 *
 * Additional goals
 * - Store page.locator' result
 * - Limit the scope of form.locator by searching only within the form
 *
 * What to learn
 * - Getting familiar `before`, `beforeEach`
 * - Interact with multiple elements
 * - Getting familiar with Playwright's asynchronicity
 * - Store locators in variables
 * - Time-travelling through the Playwright's UI
 *
 * What to think about
 * - The test is not deterministic, the user can't be registered twice. What could we do?
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/register");
  });

  test("Should allow typing into the input fields", async ({ page }) => {
    // ...
  });
});
