/// <reference types="Cypress" />

/**
 * Main goals
 * - Test the `useDelayedShow` initial state hook through a component that uses it
 *
 * What to learn
 * - How we could test a component the same way we use it
 */

import React from "react";
import { mount } from "@cypress/react";
import { useDelayedShow } from "../hooks/useDelayedShow";

// wrap the useDelayedShow hook
function HookConsumer() {
  const { visible, show, hide } = useDelayedShow();

  return (
    <>
      <p>Visible: {visible.toString()}</p>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
    </>
  );
}

describe("useDelayedShow", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should have visible set to false at the beginning", () => {
    // ------------------------------------------
    // Arrange
    mount(<HookConsumer />);

    // ------------------------------------------
    // Act

    // ------------------------------------------
    // Assert
    cy.findByText("Visible: false").should("be.visible");
  });
});
