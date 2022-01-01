/// <reference types="Cypress" />

/**
 * Main goals
 * - Add a `toggle` callback to the hook and test it
 * - Repeat the previous exercise testing `toggle`
 */

import React from "react";
import { mount } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
function HookConsumer() {
  // ...
}

// skipped because the hook must be updated by adding `toggle` before running the tests
describe.skip("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should set `visible` to `true` after a delay", () => {
    // ...
  });

  it("Should set `visible` to `true` after a delay, then set `visible` to `false` immediately", () => {
    // ...
  });
});
