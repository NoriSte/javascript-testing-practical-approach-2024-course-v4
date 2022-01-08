/// <reference types="Cypress" />

/**
 * Main goals
 * - Test that clicking on an item select it
 *
 * What to learn
 * - What black-box testing means while speaking about a component and its APIs
 * - How to use Spies
 * - What testing without a visual feedback means
 */

import React from "react";
import { mount } from "@cypress/react";
import { VirtualList } from "../VirtualList/VirtualList";

// The item renderer to be passed to the list
const RenderItem = ({ item, onClick }) => {
  // the colors are helpful to easily distinguish the rows
  const backgroundColor = parseInt(item.id.toString()) % 2 ? "#DDD" : "#EEE";

  return (
    <div
      style={{
        height: "30px",
        backgroundColor,
        fontSize: 15,
        fontFamily: "arial",
      }} // the item must call the onClick callback to get the selection work
      onClick={(event) => {
        onClick({ item, event });
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

  it.skip("Should select an item when the item is clicked", () => {
    // ...
    // the VirtualList accepts a prop `onSelect` which is called with the new selection
  });
});
