import { test, expect } from "@playwright/test";

/**
 * Main goals
 * - Assert about the response payload
 *
 * Additional goals
 * - Leverage test.step to make the test more readable
 *
 * What to learn
 * - Excluding as much errors as possible
 * - How much important is to test the payloads, even if it's not a user-like check
 * - Understanding what to care about: does the client need to know how the token is made up?
 *
 * Testing rules
 * - A failing test must give useful feedback. It must tell you what failed and why, without re-launching or debugging it
 * - Debugging a failing test is way harder than debugging an application
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

    await page.getByPlaceholder("Username").fill(`foo${random}`);
    await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
    await page.getByPlaceholder("Password").fill("bazbazbaz");

    const signupRequestPromise = page.waitForRequest("**/api/users");

    // https://api.realworld.io/api/users goes 307 and redirects to https://api.realworld.io/api/users
    // hence we can't use request.response() to get the response
    const signupResponsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("api/users") && response.status() === 201
    );

    await page.locator("form").getByText("Sign up").click();

    const request = await signupRequestPromise;
    const requestBody = request.postDataJSON();

    expect(requestBody).toEqual({
      user: {
        username: `foo${random}`,
        email: `foo${random}@bar.com`,
        password: "bazbazbaz",
      },
    });

    const response = await signupResponsePromise;
    const responseBody = await response.json();

    // assert about the response payload
    expect(responseBody.user, "Response payload:  username").toHaveProperty(
      "username",
      `foo${random}`
    );
    expect(responseBody.user, "Response payload: email").toHaveProperty(
      "email",
      `foo${random}@bar.com`
    );
    // we can't assert about the payload content because it's randomic
    expect(responseBody.user, "Response payload: token").toHaveProperty(
      "token"
    );
    expect(
      responseBody.user.token,
      "Response payload: token is a string"
    ).toEqual(expect.any(String));
    expect(
      responseBody.user.token,
      "Response payload: token is not empty"
    ).not.toEqual("");

    await page.reload();
    await expect(page.getByText("New Article")).toBeVisible();
  });

  test("Playground: group blocks with test.step", async ({ page }) => {
    const random = Math.round(Math.random() * 1_000_000);

    await test.step("Fill the form", async () => {
      await page.getByPlaceholder("Username").fill(`foo${random}`);
      await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
      await page.getByPlaceholder("Password").fill("bazbazbaz");
    });

    const signupRequestPromise = page.waitForRequest("**/api/users");

    // https://api.realworld.io/api/users goes 307 and redirects to https://api.realworld.io/api/users
    // hence we can't use request.response() to get the response
    const signupResponsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("api/users") && response.status() === 201
    );

    await test.step("Submit the form", async () => {
      await page.locator("form").getByText("Sign up").click();
    });

    await test.step("Assert about the request", async () => {
      const request = await signupRequestPromise;
      const requestBody = request.postDataJSON();

      expect(requestBody).toEqual({
        user: {
          username: `foo${random}`,
          email: `foo${random}@bar.com`,
          password: "bazbazbaz",
        },
      });
    });

    await test.step("Assert about the response", async () => {
      const response = await signupResponsePromise;
      const responseBody = await response.json();

      expect(responseBody.user, "Response payload:  username").toHaveProperty(
        "username",
        `foo${random}`
      );
      expect(responseBody.user, "Response payload: email").toHaveProperty(
        "email",
        `foo${random}@bar.com`
      );
      // we can't assert about the payload content because it's randomic
      expect(responseBody.user, "Response payload: token").toHaveProperty(
        "token"
      );
      expect(
        responseBody.user.token,
        "Response payload: token is a string"
      ).toEqual(expect.any(String));
      expect(
        responseBody.user.token,
        "Response payload: token is not empty"
      ).not.toEqual("");
    });

    await test.step("Check the user is logged in", async () => {
      await page.reload();
      await expect(page.getByText("New Article")).toBeVisible();
    });
  });
});
