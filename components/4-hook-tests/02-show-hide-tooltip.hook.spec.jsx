/// <reference types="Cypress" />

/**
 * Main goals
 * - Test that the `useDelayedShow` set `visible` to `true` with a delay
 * - Speed up the test by leveraging cy.clock()
 *
 * Additional goals
 * - Then, test that the `useDelayedShow` set `visible` to `false` immediately
 * - Then, test hat that `visible` doesn't return `true` after a while
 * - Test it by controlling the test failure
 *
 * What to learn
 * - How to properly do negative assertions
 * - Accepting a specific failure on purpose (please note that the test cannot be restored)
 */

import React from "react";
import { mount } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
function HookConsumer() {
  // ...
}

describe("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should set `visible` to `true` after a delay", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);

    // ------------------------------------------
    // Act
    cy.contains("Show").click();
    // Assert
    // `visible` must not become `true` immediately!
    cy.contains("Visible: false").should("be.visible");

    // ------------------------------------------
    // Act
    cy.clock().tick(300);
    // Assert
    cy.contains("Visible: true").should("be.visible");
  });

  it("Should set `visible` to `true` after a delay, then set `visible` to `false` immediately", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);
    cy.clock();

    // ------------------------------------------
    // Act
    cy.contains("Show").click();
    // Assert
    cy.contains("Visible: false").should("be.visible");
    cy.tick(300);
    cy.contains("Visible: true").should("be.visible");

    // ------------------------------------------
    // Act
    cy.contains("Hide").click();
    // Assert
    // `visible` must be set to `false` immediately
    cy.contains("Visible: false", { timeout: 0 }).should("be.visible");
  });

  it("Playground: Repeat the previous test by controlling that `visible: true` does not return visible through controlling the failure of the test ", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);
    cy.clock();

    // ------------------------------------------
    // Act
    cy.contains("Show").click();
    // Assert
    cy.contains("Visible: false").should("be.visible");
    cy.tick(300);
    cy.contains("Visible: true").should("be.visible");

    // ------------------------------------------
    // Act
    cy.contains("Hide").click();
    // Assert
    // `visible` must be set to `false` immediately
    cy.contains("Visible: false", { timeout: 0 }).should("be.visible");

    // ------------------------------------------
    // Assert
    // Accepting a failure on purpose
    cy.once("fail", (err) =>
      expect(err.message).to.be.equal(
        `Timed out retrying after 0ms: Expected to find content: 'Visible: true' but never did.`
      )
    );
    cy.tick(10000);
    cy.contains("Visible: true", { timeout: 0 }).should("be.visible");
  });
});
