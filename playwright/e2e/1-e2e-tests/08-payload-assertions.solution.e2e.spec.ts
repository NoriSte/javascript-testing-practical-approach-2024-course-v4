import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Assert about the request payload
 *
 * What to learn
 * - Why reducing the amount of possible errors is useful
 * - Leverage every automatic Playwright's waiting
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("Should allow registering and redirects the user to the home page", async ({
    page,
  }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await page.getByPlaceholder("Username").fill(`foo${random}`);
    await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
    await page.getByPlaceholder("Password").fill("bazbazbaz");

    const signupRequestPromise = page.waitForRequest("**/api/users");

    await page.locator("form").getByText("Sign up").click();

    const request = await signupRequestPromise;
    const requestBody = request.postDataJSON();

    expect(requestBody).toEqual({
      user: {
        username: `foo${random}`,
        email: `foo${random}@bar.com`,
        password: "bazbazbaz",
      },
    });

    await page.getByText("No articles are here... yet.").isVisible();
  });
});
