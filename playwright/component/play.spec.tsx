import * as React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { VirtualList } from "../../components/VirtualList/VirtualList";
import { Try } from "../../components/VirtualList/Try";

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

test.use({ viewport: { width: 500, height: 500 } });

test("Should render only the visible items", async ({ mount }) => {
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
  const component = await mount(
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
  await expect(component.getByText("Item 1")).toBeVisible();
  await expect(component.getByText("Item 2")).toBeVisible();
  await expect(component.getByText("Item 3")).toBeVisible();
  await expect(component.getByText("Item 4")).toBeVisible();
});

test("Try", async ({ mount }) => {
  const component = await mount(<Try />);

  // ------------------------------------------
  // Act

  // ------------------------------------------
  // Assert
  await expect(component.getByText("Hello")).toBeVisible();
});
