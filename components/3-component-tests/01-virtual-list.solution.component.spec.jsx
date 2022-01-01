/// <reference types="Cypress" />

/**
 * Main goals
 * - Test that the list renders only the visible items
 *
 * Additional goals
 * - Test that the list renders the right number of items even when if one of them is partially visible
 *
 * What to learn
 * - How to mount a component with Cypress
 * - The AAA pattern
 * - Pros and cons of high-level tests
 * - Pros and cons of low-level tests
 * - Low-level tests exploit good design choices but they are hard for the same reason
 *
 * What to think about
 * - We could need to mock node_modules dependencies with low-level tests
 *
 * Testing rules
 * - Different test types provide different feedback and have different cost
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

  it("Should render only the visible items", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90; // must be `itemHeight` multiplied by the number of visible items
    const items = [
      // visible ones
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      // invisible one
      { id: 3, name: "Item 4" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // Act

    // ------------------------------------------
    // Assert
    cy.findByText("Item 1").should("be.visible");
    cy.findByText("Item 2").should("be.visible");
    cy.findByText("Item 3").should("be.visible");
    cy.findByText("Item 4").should("not.exist");
  });

  it("Should render the visible items when an item is partially shown", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 80;
    const items = [
      // visible ones
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      // partially visible
      { id: 3, name: "Item 3" },
      // invisible one
      { id: 3, name: "Item 4" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // ------------------------------------------
    // Act

    // ------------------------------------------
    // Assert
    cy.findByText("Item 1").should("be.visible");
    cy.findByText("Item 2").should("be.visible");
    cy.findByText("Item 3").should("be.visible");
    cy.findByText("Item 4").should("not.exist");
  });
});
