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

  it.skip("Should not render anything when no items are provided", () => {
    // ...
    /*
    // the component is
    <VirtualList
      items={items}
      getItemHeights={() => itemHeight}
      RenderItem={RenderItem}
      listHeight={listHeight}
    />;
    */
  });
});
