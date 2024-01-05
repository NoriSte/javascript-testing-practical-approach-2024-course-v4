import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Mock the server
 *
 * Additional goals
 * - Clean up the test removing everything unneeded
 *
 * What to learn
 * - What's mocking
 * - When to leverage E2E tests and when not
 * - That working without a back-end parallelize FE/BE development
 * - That the back-end slows down the front-end development
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
