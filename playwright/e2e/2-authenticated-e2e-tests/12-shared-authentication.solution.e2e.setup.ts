import { test as setup, expect } from "@playwright/test";

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

const authFile = "playwright/e2e/2-authenticated-e2e-tests/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Start of authentication steps.
  await page.goto("/#/register");
  const random = Math.round(Math.random() * 1_000_000);
  const credentials = {
    username: `foo${random}`,
    email: `foo${random}@bar.com`,
    password: "bazbazbaz",
  };
  await setup.step("Invoke the app action", async () => {
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
  await setup.step("Submit the form", async () => {
    await page.locator("form").getByText("Sign up").click();
  });
  await setup.step("Await for the request", async () => {
    await signupRequestPromise;
  });
  await setup.step("Await for the response", async () => {
    await signupResponsePromise;
  });
  await page.reload();
  await setup.step("Check if the user is logged in", async () => {
    await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();
  });
  // End of authentication steps.

  // Store the new user state
  await page.context().storageState({ path: authFile });

  // ATTENTION: if you need to run unauthenticated tests inside an authenticated project, you need
  // to reset the storage state this way before the test runs
  // test.use({ storageState: { cookies: [], origins: [] } }); // Reset storage state for this file to avoid being authenticated
});
