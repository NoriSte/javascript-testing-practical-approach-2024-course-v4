import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Mock the server
 *
 * Additional goals
 * - Clean up the test removing everything unneeded
 *
 * What to learn
 * - What's mocking
 * - When to leverage E2E tests and when not
 * - That working without a back-end parallelize FE/BE development
 * - That the back-end slows down the front-end development
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

    await page.route("**/api/users", async (route) => {
      const json = {
        user: {
          username: "Tester",
          email: "user@realworld.io",
          token:
            "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw",
        },
      };
      await route.fulfill({ json });
    });
    await page.route("**/api/user", async (route) => {
      const json = {
        user: {
          username: "Tester",
          email: "user@realworld.io",
          token:
            "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2ZhZjc4YTkzNGFiMDRhZjRhMzE0MCIsInVzZXJuYW1lIjoidGVzdGVyNzk1MzYiLCJleHAiOjE1NzM4MzY2ODAsImlhdCI6MTU2ODY0OTA4MH0.zcHxMz2Vx5h-EoiUZlRyUw0z_A_6AIZ0LzQgROvsPqw",
        },
      };
      await route.fulfill({ json });
    });

    await page.route(
      "**/api/tags",
      async (route) => await route.fulfill({ json: { tags: [] } })
    );
    await page.route(
      "**/api/articles/feed**",
      async (route) =>
        await route.fulfill({ json: { articles: [], articlesCount: 0 } })
    );

    await page.getByPlaceholder("Username").fill("Tester");
    await page.getByPlaceholder("Email").fill("user@realworld.io");
    await page.getByPlaceholder("Password").fill("mysupersecretpassword");

    const signupRequestPromise = page.waitForRequest("**/api/users");

    const tagsResponsePromise = page.waitForResponse("**/api/tags");
    const articlesResponsePromise = page.waitForResponse(
      "**/api/articles/feed**"
    );
    const userCheckResponsePromise = page.waitForResponse("**/api/user");

    await page.locator("form").getByText("Sign up").click();

    const request = await signupRequestPromise;
    const requestBody = request.postDataJSON();

    expect(requestBody).toEqual({
      user: {
        username: "Tester",
        email: "user@realworld.io",
        password: "mysupersecretpassword",
      },
    });

    await request.response();
    await page.reload();

    await tagsResponsePromise;
    await articlesResponsePromise;
    await userCheckResponsePromise;

    await expect(page.getByText("No articles are here... yet.")).toBeVisible();
    await expect(page.getByText("New Article")).toBeVisible();
  });
});
