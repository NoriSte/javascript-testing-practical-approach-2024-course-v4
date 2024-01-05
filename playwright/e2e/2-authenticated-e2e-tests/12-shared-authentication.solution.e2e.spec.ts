import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Store the jwt token of the first test and reuse it in the next tests
 *
 * What to learn
 * - Again: speeding up the test
 * - Tests must work independently from other tests
 *
 * Testing rules
 * - Deterministic tests means also that you should not rely on their execution order
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The New Post page", () => {
  test("Should get the user registered", async ({ page }) => {
    await page.goto("/#/editor");
    await expect(
      page.getByRole("link", { name: " New Article" })
    ).toBeVisible();
  });
});
