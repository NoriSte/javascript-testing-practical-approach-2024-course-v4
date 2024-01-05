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
  await page.goto("/#/register");

  const random = Math.round(Math.random() * 1_000_000);
  const credentials = {
    username: `foo${random}`,
    email: `foo${random}@bar.com`,
    password: "bazbazbaz",
  };

  await step("Invoke the app action", async () => {
    await page.evaluate((credentials) => {
      // @ts-expect-error The window object is not extended for the sake if this course
      window.appActions.signup(credentials);
    }, credentials);
  });

  const signupRequestPromise = page.waitForRequest("**/api/users");

  // https://api.realworld.io/api/users goes 307 and redirects to https://api.realworld.io/api/users
  // hence we can't use request.response() to get the response
  const signupResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("api/users") && response.status() === 201
  );

  await step("Submit the form", async () => {
    await page.locator("form").getByText("Sign up").click();
  });

  await step("Assert about the request", async () => {
    await signupRequestPromise;

    // ... all the payload assertions are skipped for brevity...
  });

  await step("Assert about the response", async () => {
    await signupResponsePromise;

    // ... all the payload assertions are skipped for brevity...
  });

  await page.reload();

  await step("Check if the user is logged in", async () => {
    await expect(
      page.getByRole("link", { name: " New Article" })
    ).toBeVisible();
  });
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
