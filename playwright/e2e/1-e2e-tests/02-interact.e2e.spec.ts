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
  viewport: { width: 600, height: 900 },
});

test.describe("The sign up page", () => {
  test("Should allow typing into the input field", async ({ page }) => {
    // ...
  });
});
