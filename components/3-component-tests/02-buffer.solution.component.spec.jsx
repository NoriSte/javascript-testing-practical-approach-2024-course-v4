/// <reference types="Cypress" />

/**
 * Main goals
 * - Test that the list renders only the visible items and the buffered ones
 *
 * Additional goals
 * - Test that the list renders the right number of items even when if one of them is partially visible
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

  it("Should render only the visible items and the buffered ones", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 80; // must be `itemHeight` multiplied by the number of visible items
    const buffer = 2;
    const items = [
      // visible ones
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      // buffered ones
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      // non-rendered one
      { id: 6, name: "Item 6" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
        buffer={buffer}
      />
    );

    // ------------------------------------------
    // Act

    // ------------------------------------------
    // Assert
    cy.findByText("Item 1").should("be.visible");
    cy.findByText("Item 2").should("be.visible");
    cy.findByText("Item 3").should("be.visible");
    cy.findByText("Item 4").should("not.be.visible");
    cy.findByText("Item 5").should("not.be.visible");
    cy.findByText("Item 6").should("not.exist");
  });

  it("Should render only the visible items and the buffered ones when an item is partially visible", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 100; // must be `itemHeight` multiplied by the number of visible items
    const buffer = 2;
    const items = [
      // visible ones
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      // visible ones
      { id: 4, name: "Item 4" },
      // buffered ones
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      // non-rendered one
      { id: 7, name: "Item 7" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
        buffer={buffer}
      />
    );

    // ------------------------------------------
    // Act

    // ------------------------------------------
    // Assert
    cy.findByText("Item 1").should("be.visible");
    cy.findByText("Item 2").should("be.visible");
    cy.findByText("Item 3").should("be.visible");
    cy.findByText("Item 4").should("be.visible");
    cy.findByText("Item 5").should("not.be.visible");
    cy.findByText("Item 6").should("not.be.visible");
    cy.findByText("Item 7").should("not.exist");
  });
});
