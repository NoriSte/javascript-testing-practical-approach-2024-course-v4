import { test } from "@playwright/test";

/**
 * Main goals
 * - Visit the registration page
 * - Type something into it
 *
 *
 * What to learn
 * - Basic interactions with the app under test
 * - Using the devtools to find out the right selector to retrieve DOM elements
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The sign up page", () => {
  test("Should allow typing into the input field", async ({ page }) => {
    await page.goto("/#/register");

    // `page.locator` accepts all DOM selectors
    await page.locator(".form-control").first().fill("Foo");
  });
});
