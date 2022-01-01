/// <reference types="Cypress" />

/**
 * Main goals
 * - Test the `getItemHeights` function
 */

import { getItemsHeights } from '../../../../components/VirtualList/core/getItemsHeights'

describe('getItemsHeights', () => {
  it('Should invoke the passed `getItemHeights` function with the right params', () => {
    // ------------------------------------------
    // Arrange
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]
    const spy = cy.spy(item => item.id * 10)

    // ------------------------------------------
    // Act
    const result = getItemsHeights({ items, getItemHeights: spy })

    // ------------------------------------------
    // Assert
    expect(result).to.deep.eq([10, 20, 30])

    expect(spy).to.have.been.calledThrice

    expect(spy.args[0]).to.deep.eq([items[0], 0, items])
    expect(spy.args[1]).to.deep.eq([items[1], 1, items])
    expect(spy.args[2]).to.deep.eq([items[2], 2, items])
  })
})
