import { test, expect, type Page } from "@playwright/test";
import { signup } from "./02-external-responses.solution-responses/signup";
import { emptyTags } from "./02-external-responses.solution-responses/emptyTags";
import { emptyArticles } from "./02-external-responses.solution-responses/emptyArticles";

/**
 * Main goals
 * - Create a custom function that gets the user authenticated
 *
 * Additional goals
 * - by creating the backbone for testing the Create New Post page, ensure that the custom command
 * doesn't contain useless interceptions
 *
 * What to think about
 * - The amazing speed of the current test
 *
 * Testing rules
 * - Tests must be fast, as fast as possible
 */

async function abortServerRequests({ page }: { page: Page }) {
  // Abort all the XHR requests to avoid false positives
  await page.route("**", (route) => {
    // use 'xhr' of 'fetch' based on what the frontend app does
    if (route.request().resourceType() === "xhr") {
      route.abort();
      return;
    }

    route.continue();
  });
}

async function gotoAuthenticated(path: string, { page }: { page: Page }) {
  await page.goto("/#/register");

  page.evaluate((token) => {
    localStorage.setItem("jwtToken", token);
  }, signup.user.token);

  await page.route(
    "**/api/user",
    async (route) => await route.fulfill({ json: signup })
  );

  await page.reload();
  await page.goto(path);
}

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The home page", () => {
  test.beforeEach(async ({ page }) => {
    await abortServerRequests({ page });
  });
  test("Should work", async ({ page }) => {
    await page.route(
      "**/api/tags",
      async (route) => await route.fulfill({ json: emptyTags })
    );
    await page.route(
      "**/api/articles/feed**",
      async (route) => await route.fulfill({ json: emptyArticles })
    );

    const tagsRequestPromise = page.waitForRequest("**/api/tags");
    const articlesRequestPromise = page.waitForRequest(
      "**/api/articles/feed**"
    );

    await gotoAuthenticated("/#/", { page });

    await tagsRequestPromise;
    await articlesRequestPromise;

    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
  });
});

test.describe("The create new post page", () => {
  test("Should work", async ({ page }) => {
    await gotoAuthenticated("/#/editor", { page });

    await expect(page.getByText("New Article")).toBeVisible();
  });
});
