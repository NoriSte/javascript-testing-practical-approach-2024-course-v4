import { test, expect } from "@playwright/test";

test.describe("Smoke test", () => {
  test("The frontend should work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("conduit");
  });
});
