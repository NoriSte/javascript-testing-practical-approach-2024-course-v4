import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Click the button
 * - Sleep the test 10 seconds
 * - Assert that everything works
 * - Check that the test works if launched more times
 *
 * Additional goals
 * - Avoid unnecessary waiting
 *
 * What to learn
 * - Adding assertions to close the circle and get the test a real test
 * - Analyzing the behavior of the app and asserting about it
 * - Thinking about what to assert
 * - Playwright's auto-waiting
 * - Command's timeout
 *
 * What to think about
 * - The test could fail because of server delays, Playwright doesn't wait forever
 *
 * Testing rules
 * - Tests must be deterministic
 * - The tests should not fail randomly. False-negative tests are the worst ones
 * - Obviously, the opposite is important too: tests must fail if the app does not work
 * - A bad test is worse then not having it
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

    await page.locator(".form-control").nth(0).fill(`foo${random}`);
    await page.locator(".form-control").nth(1).fill(`foo${random}@bar.com`);
    await page.locator(".form-control").nth(2).fill("bazbazbaz");

    await page.locator("button").click();

    await page.waitForTimeout(10_000);

    expect(await page.evaluate("location.hash")).toBe("#/");
  });

  test("Playground: avoid unnecessary timeout", async ({ page }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await page.locator(".form-control").nth(0).fill(`foo${random}`);
    await page.locator(".form-control").nth(1).fill(`foo${random}@bar.com`);
    await page.locator(".form-control").nth(2).fill("bazbazbaz");

    await page.locator("button").click();

    await page.waitForURL("/#/", { timeout: 2_000 });
  });
});
