import { test as setup } from "@playwright/test";

/**
 * Main goals
 * - Store the jwt token of the first test and reuse it in the next tests
 *
 * What to learn
 * - Again: speeding up the test
 * - Tests must work independently from other tests
 *
 * Testing rules
 * - Deterministic tests means also that you should not rely on their execution order
 */

const authFile =
  "playwright/e2e/1-e2e-tests/12-shared-authentication/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // ...
});
