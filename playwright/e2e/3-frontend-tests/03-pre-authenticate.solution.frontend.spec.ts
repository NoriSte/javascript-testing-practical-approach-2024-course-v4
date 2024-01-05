import { test, expect } from "@playwright/test";
import { signup } from "./02-external-responses.solution-responses/signup";
import { emptyTags } from "./02-external-responses.solution-responses/emptyTags";
import { emptyArticles } from "./02-external-responses.solution-responses/emptyArticles";

/**
 * Main goals
 * - Navigate the home page and get the user already logged in by mocking the back-end
 *
 * What to learn
 * - We don't need to pass through the registration page anymore
 */

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The home page", () => {
  test.beforeEach(async ({ page }) => {
    // Abort all the XHR requests to avoid false positives
    await page.route("**", (route) => {
      // use 'xhr' of 'fetch' based on what the frontend app does
      if (route.request().resourceType() === "xhr") {
        route.abort();
        return;
      }

      route.continue();
    });

    await page.goto("/#/register");

    page.evaluate((token) => {
      localStorage.setItem("jwtToken", token);
    }, signup.user.token);

    await page.route(
      "**/api/user",
      async (route) => await route.fulfill({ json: signup })
    );
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
    const userCheckResponsePromise = page.waitForResponse("**/api/user");

    await page.reload();
    await page.goto("/#/");

    await tagsRequestPromise;
    await articlesRequestPromise;
    await userCheckResponsePromise;
  });

  test("Should work", async ({ page }) => {
    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
    await expect(page.getByText("New Article")).toBeVisible();
  });
});
