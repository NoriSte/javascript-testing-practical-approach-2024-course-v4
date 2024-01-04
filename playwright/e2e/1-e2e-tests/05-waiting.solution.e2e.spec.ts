import { test } from "@playwright/test";

/**
 * Main goals
 * - Intercept the XHR request
 * - Wait for the XHR request
 *
 * Additional goals
 * - Leverage glob search to avoid hard coding the server host
 *
 * What to learn
 * - Getting the test more useful in case of failure
 * - What kind of errors are discoverable with a high-level test and what aren't
 * - Intercepting XHR requests
 * - The importance of the test execution speed
 * - Avoid flaky fixed timeouts
 *
 * What to think about
 * - Does the test error point you directly to the problem?
 * - Do the screenshot, video, and the error avoid you to debug the test?
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },

  // in case of failure, check the `test-results` directory on the root of the project
  video: "retain-on-failure",
});

test.describe("The sign up page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("Should allow registering and redirects the user to the home page", async ({
    page,
  }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await page.locator(".form-control").nth(0).fill(`foo${random}`);
    await page.locator(".form-control").nth(1).fill(`foo${random}@bar.com`);
    await page.locator(".form-control").nth(2).fill("bazbazbaz");

    // Please note: no `await` here!
    const signupRequestPromise = page.waitForRequest(
      "https://conduit.productionready.io/api/users"
    );

    await page.locator("button").click();
    await signupRequestPromise;

    await page.waitForURL("/", { timeout: 1000 });
  });

  test("Playground: avoid hard coding the server host", async ({ page }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await page.locator(".form-control").nth(0).fill(`foo${random}`);
    await page.locator(".form-control").nth(1).fill(`foo${random}@bar.com`);
    await page.locator(".form-control").nth(2).fill("bazbazbaz");

    // Please note: no `await` here!
    const signupRequestPromise = page.waitForRequest("**/api/users");

    await page.locator("button").click();
    await signupRequestPromise;

    await page.waitForURL("/");
  });
});
