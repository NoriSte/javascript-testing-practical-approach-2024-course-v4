/// <reference types="Cypress" />

/**
 * Main goals
 * - Scroll the list and test the selection range (by keeping the 'shift' key pressed) works as expected
 *
 * Additional goals
 * - Make the test working even without knowing in advance which items will be visible
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
      data-testid={`item-${item.id}`}
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
  const { onSelect, ...virtualListProps } = props;

  // store the selection in an internal state
  const [selectedItems, setSelectedItems] = React.useState([]);
  const handleSelect = React.useCallback(
    ({ newSelectedIds }) => {
      setSelectedItems(newSelectedIds);
      // call the passed spy to notify the test about the new selected ids
      onSelect(newSelectedIds);
    },
    [setSelectedItems, onSelect]
  );

  // Transparently renders the VirtualList, apart from:
  // - storing the selection
  // - passing the new selection back to the test
  return (
    <VirtualList
      selectedItemIds={selectedItems}
      onSelect={handleSelect}
      // VirtualList props passed from the test
      {...virtualListProps}
    />
  );
}

describe("VirtualList wrapper", () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(300, 300);
  });

  it("The additive selection should work", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      { id: 7, name: "Item 7" },
      { id: 8, name: "Item 8" },
      { id: 9, name: "Item 9" },
      { id: 10, name: "Item 10" },
      { id: 11, name: "Item 11" },
      { id: 12, name: "Item 12" },
      { id: 13, name: "Item 13" },
      { id: 14, name: "Item 14" },
      { id: 15, name: "Item 15" },
      { id: 16, name: "Item 16" },
      { id: 17, name: "Item 17" },
      { id: 18, name: "Item 18" },
      { id: 19, name: "Item 19" },
      { id: 20, name: "Item 20" },
    ];

    // mounting the component
    mount(
      <SelectableList
        // test-specific props
        onSelect={cy.spy().as("onSelect")}
        // VirtualList props
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // Act

    // click on the first item
    cy.findByText("Item 1").click();

    // scroll the list
    cy.findAllByTestId("VirtualList").first().trigger("wheel", {
      deltaX: 0,
      deltaY: 200,
    });

    cy.get("body").type("{shift}", { release: false });

    // Item 7, 8, 9, and 10 are going to be visible after the scroll
    // click on the 10th item. It's going to be clicked as soon as it's in the DOM and clickable
    cy.findByText("Item 10")
      .click()
      // Assert
      .get("@onSelect")
      .should((spy) => {
        expect(spy).to.have.been.calledTwice;
        expect(spy).to.have.been.calledWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

    // release the shift button
    cy.get("body").type("{shift}", { release: true });
  });

  it("Playground: Get the additive selection work without knowing in advance which item will be visible after scrolling", () => {
    // ------------------------------------------
    // Arrange

    // creating the data
    const itemHeight = 30;
    const listHeight = 90;
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
      { id: 5, name: "Item 5" },
      { id: 6, name: "Item 6" },
      { id: 7, name: "Item 7" },
      { id: 8, name: "Item 8" },
      { id: 9, name: "Item 9" },
      { id: 10, name: "Item 10" },
      { id: 11, name: "Item 11" },
      { id: 12, name: "Item 12" },
      { id: 13, name: "Item 13" },
      { id: 14, name: "Item 14" },
      { id: 15, name: "Item 15" },
      { id: 16, name: "Item 16" },
      { id: 17, name: "Item 17" },
      { id: 18, name: "Item 18" },
      { id: 19, name: "Item 19" },
      { id: 20, name: "Item 20" },
    ];

    // mounting the component
    mount(
      <SelectableList
        // test-specific props
        onSelect={cy.spy().as("onSelect")}
        // VirtualList props
        items={items}
        getItemHeights={() => itemHeight}
        RenderItem={RenderItem}
        listHeight={listHeight}
      />
    );

    // Act

    // click on the first item
    cy.findByText("Item 1").click();

    // scroll the list
    cy.findAllByTestId("VirtualList").first().trigger("wheel", {
      deltaX: 0,
      deltaY: 200,
    });

    let firstFullyVisibleItemIndex;
    let firstFullyVisibleItem;
    // wait the scroll to end
    cy.wait(1000).then(() => {
      firstFullyVisibleItemIndex = getFirstFullyVisibleItemIndex(items);
      firstFullyVisibleItem = items[firstFullyVisibleItemIndex];

      cy.get("body").type("{shift}", { release: false });

      // click on the 10th item. It's going to be clicked as soon as it's in the DOM and clickable
      cy.findByText(firstFullyVisibleItem.name)
        .click()
        // Assert
        .get("@onSelect")
        .should((spy) => {
          const expectedSelection = [];
          // calculates the expected selection at runtime
          // Please note: dynamic tests are harder to be comprehended and debugged
          for (let j = 0; j <= firstFullyVisibleItemIndex; j++) {
            expectedSelection.push(items[j].id);
          }

          expect(spy).to.have.been.calledTwice;
          expect(spy).to.have.been.calledWith(expectedSelection);
        });

      // release the shift button
      cy.get("body").type("{shift}", { release: true });
    });
  });
});

// Look for the first fully visible item.
const getFirstFullyVisibleItemIndex = (items) => {
  const firstRenderedItemIndex = items.findIndex((item) => {
    console.log(
      item,
      Cypress.$(`[data-testid=item-${item.id}]`).length,
      `[data-testid=item-${item.id}]`
    );
    return !!Cypress.$(`[data-testid=item-${item.id}]`).length;
  });

  // Please note: it takes for granted that the list has no buffer.
  return firstRenderedItemIndex + 1;
};
