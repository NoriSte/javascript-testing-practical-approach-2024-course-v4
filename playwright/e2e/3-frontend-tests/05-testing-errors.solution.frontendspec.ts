import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Test what the user sees when the server returns error during the registration
 * - Leverage the app action instead of filling the form
 *
 * Additional goals
 * - Test what the user sees when the server returns more than one error
 *
 * What to learn
 * - How much controlling the back-end is useful to test error/edge cases
 * - You must spend most of your automation time with front-end Tests
 *
 * What to think about
 * - The importance of low/no abstraction, referring to the additional exercise
 * - How hard it could be to test something like this with an E2E test
 * - If the front-end is 100% tested by stubbing the back-end, what do E2E tests test?
 * - How to use Playwright as a development tool
 *   - Keeping Playwright opened while coding
 *   - Leverage Playwright speed by replacing manual actions
 *   - Install Chrome extensions
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

const credentials = {
  username: "Tester",
  email: "user@realworld.io",
  password: "mysupersecretpassword",
};

test.describe("The sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/register");
  });

  test("Should show an error when the email is already in use", async ({
    page,
  }) => {
    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        json: { errors: { email: "is already taken." } },
        status: 422,
      });
    });

    const signupResponsePromise = page.waitForResponse("**/api/users");

    await test.step("Invoke the app action", async () => {
      await page.evaluate((credentials) => {
        // @ts-expect-error The window object is not extended for the sake if this course
        window.appActions.signup(credentials);
      }, credentials);
    });

    await signupResponsePromise;

    await expect(page.getByText("email is already taken.")).toBeVisible();
  });

  test("Should show an error for every error returned by the server", async ({
    page,
  }) => {
    await page.route("**/api/users", async (route) => {
      await route.fulfill({
        json: { errors: { email: "foo", username: "bar" } },
        status: 422,
      });
    });

    const signupResponsePromise = page.waitForResponse("**/api/users");

    await test.step("Invoke the app action", async () => {
      await page.evaluate((credentials) => {
        // @ts-expect-error The window object is not extended for the sake if this course
        window.appActions.signup(credentials);
      }, credentials);
    });

    await signupResponsePromise;

    await expect(page.getByText("email foo")).toBeVisible();
    await expect(page.getByText("username bar")).toBeVisible();
  });
});
