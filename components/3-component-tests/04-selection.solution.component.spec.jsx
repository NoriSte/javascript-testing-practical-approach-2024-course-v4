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

  it("Should select an item when the item is clicked", () => {
    // ------------------------------------------
    // Arrange

    // creating the spy
    // a spy is needed to intercept the call the VirtualList does
    const onSelectSpy = cy.spy().as("onSelect");

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];

    // mounting the component
    mount(
      <VirtualList
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
        onSelect={onSelectSpy}
      />
    );

    // ------------------------------------------
    // Act
    cy.findByText("Item 1").click();

    // ------------------------------------------
    // Assert (cy.wrap(onSelectSpy) would do the same)
    cy.get("@onSelect").should((spy) => {
      expect(spy).to.have.been.calledOnce;

      // see
      // https://sinonjs.org/releases/latest/assertions/
      // https://sinonjs.org/releases/latest/matchers/
      expect(spy).to.have.been.calledWith(
        Cypress.sinon.match({ newSelectedIds: [1] })
      );

      // Sinon matchers allow to assert about partials of the params
      expect(spy).to.have.been.calledWith(
        Cypress.sinon.match({ item: { id: 1, name: "Item 1" } })
      );
    });
  });
});
