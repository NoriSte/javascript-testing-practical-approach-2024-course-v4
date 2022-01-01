/// <reference types="Cypress" />
/// <reference types="cypress-wait-until" />

/**
 * Main goals
 * - Wait until the scroll ends and check the visible items
 *
 * Additional goals
 * - Control the browser clock to avoid the waiting
 *
 * What to learn
 * - Waiting until something happens without the help of Cypress
 * - How to control the browser clock to speed up the test
 *
 * What to think about
 * - Component tests techniques: Visual tests, Snapshot tests, Shallow tests
 * - Component test tools: Jest, Enzyme, Testing-library. Cypress allows debugging the component visually
 */

import React from "react";
import { mount } from "@cypress/react";
import { VirtualList } from "../VirtualList/VirtualList";

// The item renderer to be passed to the list
const RenderItem = ({ item }) => {
  // the colors are helpful to easily distinguish the rows
  const backgroundColor = parseInt(item.id.toString()) % 2 ? "#DDD" : "#EEE";

  return (
    <div
      style={{
        height: "30px",
        backgroundColor,
        fontSize: 15,
        fontFamily: "arial",
      }}
    >
      {item.name}
    </div>
  );
};

describe("VirtualList", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Should render only the visible items", () => {});
});
