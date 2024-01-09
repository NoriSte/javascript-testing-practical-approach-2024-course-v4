# Adding Playwright to an existing project

1. Install Playwright: `$ npm init playwright@latest`

2. add some scripts to the package.json
```json
"pw:e2e": "playwright test",
"pw:e2e:ui": "playwright test --ui",
```

3. delete the example tests Playwright asdds

4. create a smoke test: create a `<YOUR_PLAYWRIGHT_DIRECTORY>/smoke.spec.ts` file containing the following content code
  ```ts
  import { test } from "@playwright/test";

  test.describe("smoke", () => {
    test("should work", async ({ page }) => {
      await page.goto("/");
    });
  });
  ```

5. edit the `playwright.config.ts` adding the baseUrl (`"baseUrl": "http://localhost:<YOUR_PORT>",`)

6. add the `webServer` script to `playwright.config.ts`
  ```ts
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start", // TODO: change it with your own starting script
    url: "http://localhost:<YOUR_PORT>",
    reuseExistingServer: !process.env.CI,
  },
  ```

7. add the `test` script to the package.json
  ```json
  "test": "npm run pw:e2e",
  ```

That's it! You're ready to:
- launch `$ npm run pw:e2e:ui` that allows to use Cypress locally
- launch `$ npm test` that allows to start the application and test it in CI pipelines
