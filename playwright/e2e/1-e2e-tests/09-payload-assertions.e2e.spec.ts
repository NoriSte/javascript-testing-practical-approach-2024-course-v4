import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Assert about the response payload
 *
 * Additional goals
 * - Leverage test.step to make the test more readable
 *
 * What to learn
 * - Excluding as much errors as possible
 * - How much important is to test the payloads, even if it's not a user-like check
 * - Understanding what to care about: does the client need to know how the token is made up?
 *
 * Testing rules
 * - A failing test must give useful feedback. It must tell you what failed and why, without re-launching or debugging it
 * - Debugging a failing test is way harder than debugging an application
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
    // ...
  });
});
