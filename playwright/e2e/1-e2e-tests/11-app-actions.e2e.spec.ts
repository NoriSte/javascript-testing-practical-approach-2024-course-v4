import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Leverage the app action exposed by the React application
 *
 * What to learn
 * - The importance of speeding up the tests
 * - Exposing 'shortcuts' from the front-end application
 * - Never using the UI to reach app state
 */

const register = async ({ page, step }) => {
  // ...
};

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The New Post page", () => {
  test("Should get the user registered", async ({ page }) => {
    await register({ page, step: test.step });
    await page.goto("/#/editor");
    await expect(page.getByText("New Article")).toBeVisible();
  });
});
