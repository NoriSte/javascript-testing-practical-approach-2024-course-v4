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
    const random = Math.round(Math.random() * 1_000_000);

    await page.getByTestId("username").fill(`foo${random}`);
    await page.getByTestId("email").fill(`foo${random}@bar.com`);
    await page.getByTestId("password").fill("bazbazbaz");

    // Please note: no `await` here!
    const signupRequestPromise = page.waitForRequest("**/api/users");

    await page.getByTestId("signup-button").click();
    await signupRequestPromise;

    await page.waitForURL("/#/", { timeout: 1000 });
  });
});
