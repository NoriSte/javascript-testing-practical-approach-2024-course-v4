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

  it.skip("Should render only the visible items", () => {
    // ...
    /*
    // the component is
    <VirtualList
      items={items}
      getItemHeights={() => itemHeight}
      RenderItem={RenderItem}
      listHeight={listHeight}
    />
    */
  });
});
