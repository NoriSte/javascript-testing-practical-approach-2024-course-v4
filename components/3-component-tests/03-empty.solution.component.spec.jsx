/// <reference types="Cypress" />

/**
 * Main goals
 * - Test that the list renders nothing when empty
 *
 * Additional goals
 * - Test that the scrollbar is not visible if not needed
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

  it("Should not render anything when no items are provided", () => {
    // ------------------------------------------
    // Arrange
    const itemHeight = 30;
    const listHeight = 90;
    const items = [];

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
    cy.findByTestId("VirtualList")
      .then(($el) => $el.text())
      .should("be.empty");
  });

  it("Should not show the scrollbar when not needed", () => {
    // ------------------------------------------
    // Arrange
    const itemHeight = 30;
    const listHeight = 90; // must be higher than `itemHeight` multiplied by the number of items
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

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
    cy.get(".scrollbar-thumb-y").should("not.be.visible");
  });
});
