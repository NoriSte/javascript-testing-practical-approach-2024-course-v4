import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Write a custom function that abstracts away the authentication code
 *
 * What to learn
 * - Shortening the test
 * - Abstracting away the repetitive code
 *
 * What to think about
 * - Keeping the abstraction level as low as possible (let's talk about the PageObject model...)
 *
 * Testing rules
 * - Keep the test code simple, stupid! DRY it as few as possible
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The New Post page", () => {
  test("Should get the user registered", async ({ page }) => {
    // ...
  });
});
