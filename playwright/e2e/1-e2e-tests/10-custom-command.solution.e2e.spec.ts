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

const register = async ({ page, step }) => {
  await page.goto("/#/register");

  const random = Math.round(Math.random() * 1_000_000);

  await step("Fill the form", async () => {
    await page.getByPlaceholder("Username").fill(`foo${random}`);
    await page.getByPlaceholder("Email").fill(`foo${random}@bar.com`);
    await page.getByPlaceholder("Password").fill("bazbazbaz");
  });

  // https://api.realworld.io/api/users goes 307 and redirects to https://api.realworld.io/api/users
  // hence we can't use request.response() to get the response
  const signupResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("api/users") && response.status() === 201
  );

  await step("Submit the form", async () => {
    await page.locator("form").getByText("Sign up").click();
  });

  await step("Assert about the request and the response", async () => {
    const response = await signupResponsePromise;
    const requestBody = response.request().postDataJSON();

    expect(requestBody).toEqual({
      user: {
        username: `foo${random}`,
        email: `foo${random}@bar.com`,
        password: "bazbazbaz",
      },
    });

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

  await page.reload();

  await step("Check if the user is logged in", async () => {
    await expect(page.getByRole("link", { name: "New Article" })).toBeVisible();
  });
};

test.use({
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  viewport: { width: 600, height: 900 },
});

test.describe("The New Post page", () => {
  test("Should get the user registered", async ({ page }) => {
    await register({ page, step: test.step });
    await page.goto("/#/editor");
    await expect(page.getByText("New Article")).toBeVisible();
  });
});
