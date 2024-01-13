import { test, expect } from "@playwright/test";

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
    const random = Math.round(Math.random() * 1_000_000);

    await page.getByPlaceholder("Username").fill(`foo${random}`);
    await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
    await page.getByPlaceholder("Password").fill("bazbazbaz");

    // Please note: no `await` here!
    const signupResponsePromise = page.waitForResponse(
      "https://api.realworld.io/api/users"
    );

    await page.locator("form").getByText("Sign up").click();
    await signupResponsePromise;

    await page.waitForURL("/#/");
    await page.reload();

    await expect(page.getByText("New Article")).toBeVisible();
  });

  test("Playground: retrieve button by role", async ({ page }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await page.getByPlaceholder("Username").fill(`foo${random}`);
    await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
    await page.getByPlaceholder("Password").fill("bazbazbaz");

    // Please note: no `await` here!
    const signupResponsePromise = page.waitForResponse("**/api/users");

    await page.getByRole("button", { name: "Sign up" }).click();
    await signupResponsePromise;

    await page.waitForURL("/#/");
    await page.reload();

    await expect(page.getByText("New Article")).toBeVisible();
  });
});
