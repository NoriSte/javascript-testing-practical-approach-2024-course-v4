import { test, expect } from "@playwright/test";
import { signup } from "./02-external-responses.solution-responses/signup";
import { emptyTags } from "./02-external-responses.solution-responses/emptyTags";
import { emptyArticles } from "./02-external-responses.solution-responses/emptyArticles";

/**
 * Main goals
 * - Move the responses away from the body of the test
 *
 * What to learn
 * - The importance of the name of the responses
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
    // Abort all the XHR requests to avoid false positives
    await page.route("**", (route) => {
      // use 'xhr' of 'fetch' based on what the frontend app does
      if (route.request().resourceType() === "xhr") {
        route.abort();
        return;
      }

      route.continue();
    });

    await page.route(
      "**/api/users",
      async (route) => await route.fulfill({ json: signup })
    );
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

    await page.getByPlaceholder("Username").fill("Tester");
    await page.getByPlaceholder("Email").fill("user@realworld.io");
    await page.getByPlaceholder("Password").fill("mysupersecretpassword");

    const signupResponsePromise = page.waitForResponse("**/api/users");

    const tagsResponsePromise = page.waitForResponse("**/api/tags");
    const articlesResponsePromise = page.waitForResponse(
      "**/api/articles/feed**"
    );
    const userCheckResponsePromise = page.waitForResponse("**/api/user");

    await page.locator("form").getByText("Sign up").click();

    const response = await signupResponsePromise;
    const requestBody = response.request().postDataJSON();

    expect(requestBody).toEqual({
      user: {
        username: "Tester",
        email: "user@realworld.io",
        password: "mysupersecretpassword",
      },
    });

    await page.reload();

    await tagsResponsePromise;
    await articlesResponsePromise;
    await userCheckResponsePromise;

    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
    await expect(page.getByText("New Article")).toBeVisible();
  });
});
