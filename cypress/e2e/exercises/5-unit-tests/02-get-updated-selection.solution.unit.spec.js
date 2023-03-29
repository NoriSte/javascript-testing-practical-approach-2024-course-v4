/// <reference types="Cypress" />

/**
 * Main goals
 * - Test the `getUpdatedSelection` function
 */

import { getUpdatedSelection } from '../../../../components/VirtualList/core/getUpdatedSelection'

describe('getUpdatedSelection', () => {
  it('Should select the clicked item', () => {
    // ------------------------------------------
    // Arrange
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]
    const prevSelection = []
    const clickedItemId = 1
    const expectedSelection = [1]

    // ------------------------------------------
    // Act
    const result = getUpdatedSelection({
      items,
      oldSelectedIds: prevSelection,
      clickedItemId,
      modifiers: {},
    })

    // ------------------------------------------
    // Assert
    expect(result).to.deep.eq(expectedSelection)
  })

  it('Should do nothing if the clicked item was already selected', () => {
    // ------------------------------------------
    // Arrange
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]
    const prevSelection = [1]
    const clickedItemId = 1
    const expectedSelection = [1]

    // ------------------------------------------
    // Act
    const result = getUpdatedSelection({
      items,
      oldSelectedIds: prevSelection,
      clickedItemId,
      modifiers: {},
    })

    // ------------------------------------------
    // Assert
    expect(result).to.deep.eq(expectedSelection)
  })

  it('Should select only the clicked item if another item was selected', () => {
    // ------------------------------------------
    // Arrange
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]
    const prevSelection = [1]
    const clickedItemId = 2
    const expectedSelection = [2]

    // ------------------------------------------
    // Act
    const result = getUpdatedSelection({
      items,
      oldSelectedIds: prevSelection,
      clickedItemId,
      modifiers: {},
    })

    // ------------------------------------------
    // Assert
    expect(result).to.deep.eq(expectedSelection)
  })

  it('Should select only the clicked item if more items were selected', () => {
    // ------------------------------------------
    // Arrange
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]
    const prevSelection = [1, 3]
    const clickedItemId = 2
    const expectedSelection = [2]

    // ------------------------------------------
    // Act
    const result = getUpdatedSelection({
      items,
      oldSelectedIds: prevSelection,
      clickedItemId,
      modifiers: {},
    })

    // ------------------------------------------
    // Assert
    expect(result).to.deep.eq(expectedSelection)
  })
})
