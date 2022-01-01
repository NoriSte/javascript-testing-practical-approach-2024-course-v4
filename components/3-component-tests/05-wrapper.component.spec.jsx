/// <reference types="Cypress" />

/**
 * Main goals
 * - Build a wrapper around the VirtualList that allows to re-render the component once the selection changes
 *
 * What to learn
 * - Re-rendering a component while testing it
 */

import React from "react";
import { mount } from "@cypress/react";
import { VirtualList } from "../VirtualList/VirtualList";

const RenderItem = ({ item, selected, onClick }) => {
  const even = parseInt(item.id.toString()) % 2;

  // the colors are helpful to easily distinguish the rows
  const backgroundColor = selected
    ? even
      ? "#0357d8"
      : "#007AFF"
    : even
    ? "#DDD"
    : "#EEE";

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

// wrap the VirtualList to internally manage the selection, passing outside only the new selection
function SelectableList(props) {
  // this component must
  // - pass all the props down to the VirtualList
  // - accept a `onSelect` prop that will be passed by the test to intercept every selection update
  // - manage the selection and re-rendering the VirtualList when the selection changes

  // Transparently renders the VirtualList, apart from:
  // - storing the selection
  // - passing the new selection back to the test
  return (
    <VirtualList
    // ...
    />
  );
}

describe("VirtualList wrapper", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("Playground: test the selection with a mini-app that exposes the selected items", () => {
    // ...
    // `SelectableList` must be mounted instead of `VirtualList`
  });
});
