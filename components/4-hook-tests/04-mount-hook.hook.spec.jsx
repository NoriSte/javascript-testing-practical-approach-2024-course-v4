/// <reference types="Cypress" />

/**
 * Main goals
 * - Repeat that the show/hide but using `mountHook` instead of `mount` and a wrapper component
 *
 * What to learn
 * - How to leverage Cypress' `mountHook` API
 *
 * What to think about
 * - Do you prefer using a wrapper component or leveraging `mountHook`?
 * - How hard could be to test that it clears the timeout on unmount?
 */

import { mountHook } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
describe("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should set `visible` to `true` after a delay", () => {
    // ...
  });
});
