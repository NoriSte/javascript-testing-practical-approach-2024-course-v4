/// <reference types="Cypress" />

/**
 * Main goals
 * - Test the `getUpdatedSelection` function with all the modifiers options generating dynamically the tests
 *
 * What to learn
 * - How hard could be running similar tests while maintaining readability
 */

import { getUpdatedSelection } from '../../../../components/VirtualList/core/getUpdatedSelection'

const itemsWithPosition = [
  { item: { id: 0 }, y: 0, height: 1 },
  { item: { id: 1 }, y: 1, height: 1 },
  { item: { id: 2 }, y: 2, height: 1 },
  { item: { id: 3 }, y: 3, height: 1 },
  { item: { id: 4 }, y: 4, height: 1 },
  { item: { id: 5 }, y: 5, height: 1 },
  { item: { id: 6 }, y: 6, height: 1 },
  { item: { id: 7 }, y: 7, height: 1 },
  { item: { id: 8 }, y: 8, height: 1 },
  { item: { id: 9 }, y: 9, height: 1 },
  { item: { id: 10 }, y: 10, height: 1 },
]
// prettier-ignore
const runs = [
  // no modifiers
  { prevSelection: [],        clickedItemId: 0,   modifiers: {},              expectedSelection: [0] },
  { prevSelection: [0],       clickedItemId: 0,   modifiers: {},              expectedSelection: [0] },
  { prevSelection: [0],       clickedItemId: 1,   modifiers: {},              expectedSelection: [1] },
  { prevSelection: [9],       clickedItemId: 0,   modifiers: {},              expectedSelection: [0] },
  { prevSelection: [0, 5, 9], clickedItemId: 2,   modifiers: {},              expectedSelection: [2] },
  { prevSelection: [0, 5, 9], clickedItemId: 5,   modifiers: {},              expectedSelection: [5] },

  // alt
  { prevSelection: [],        clickedItemId: 0,   modifiers: {altKey:true},   expectedSelection: []        },
  { prevSelection: [0],       clickedItemId: 0,   modifiers: {altKey:true},   expectedSelection: []        },
  { prevSelection: [0],       clickedItemId: 1,   modifiers: {altKey:true},   expectedSelection: [0]       },
  { prevSelection: [9],       clickedItemId: 0,   modifiers: {altKey:true},   expectedSelection: [9]       },
  { prevSelection: [0, 5, 9], clickedItemId: 2,   modifiers: {altKey:true},   expectedSelection: [0, 5, 9] },
  { prevSelection: [0, 5, 9], clickedItemId: 5,   modifiers: {altKey:true},   expectedSelection: [0, 9]    },

  // meta
  { prevSelection: [],        clickedItemId: 0,   modifiers: {metaKey:true},  expectedSelection: [0]          },
  { prevSelection: [0],       clickedItemId: 0,   modifiers: {metaKey:true},  expectedSelection: []           },
  { prevSelection: [0],       clickedItemId: 1,   modifiers: {metaKey:true},  expectedSelection: [0, 1]       },
  { prevSelection: [9],       clickedItemId: 0,   modifiers: {metaKey:true},  expectedSelection: [9, 0]       },
  { prevSelection: [0, 5, 9], clickedItemId: 2,   modifiers: {metaKey:true},  expectedSelection: [0, 5, 9, 2] },
  { prevSelection: [0, 5, 9], clickedItemId: 5,   modifiers: {metaKey:true},  expectedSelection: [0, 9]       },

  // ctrl
  { prevSelection: [],        clickedItemId: 0,   modifiers: {ctrlKey:true},  expectedSelection: [0]          },
  { prevSelection: [0],       clickedItemId: 0,   modifiers: {ctrlKey:true},  expectedSelection: []           },
  { prevSelection: [0],       clickedItemId: 1,   modifiers: {ctrlKey:true},  expectedSelection: [0, 1]       },
  { prevSelection: [9],       clickedItemId: 0,   modifiers: {ctrlKey:true},  expectedSelection: [9, 0]       },
  { prevSelection: [0, 5, 9], clickedItemId: 2,   modifiers: {ctrlKey:true},  expectedSelection: [0, 5, 9, 2] },
  { prevSelection: [0, 5, 9], clickedItemId: 5,   modifiers: {ctrlKey:true},  expectedSelection: [0, 9]       },

  // shift
  { prevSelection: [],        clickedItemId: 0,   modifiers: {shiftKey:true}, expectedSelection: [0]                            },
  { prevSelection: [0],       clickedItemId: 0,   modifiers: {shiftKey:true}, expectedSelection: [0]                            },
  { prevSelection: [0],       clickedItemId: 1,   modifiers: {shiftKey:true}, expectedSelection: [0, 1]                         },
  { prevSelection: [9],       clickedItemId: 0,   modifiers: {shiftKey:true}, expectedSelection: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] },
  { prevSelection: [0, 5, 9], clickedItemId: 2,   modifiers: {shiftKey:true}, expectedSelection: [0, 9, 8, 7, 6, 5, 4, 3, 2]    },
  { prevSelection: [0, 5, 9], clickedItemId: 5,   modifiers: {shiftKey:true}, expectedSelection: [0, 9, 8, 7, 6, 5]             },
]

const getModifiersList = modifiers => Object.keys(modifiers).filter(key => modifiers[key])

describe('getUpdatedSelection', () => {
  runs.forEach(run => {
    it(`When the selection is '${run.prevSelection}', clicking '${
      run.clickedItemId
    }' with modifiers '${getModifiersList(run.modifiers)}' should return '${
      run.expectedSelection
    }'`, () => {
      // ------------------------------------------
      // Arrange

      // ------------------------------------------
      // Act
      const result = getUpdatedSelection({
        items: itemsWithPosition,
        oldSelectedIds: run.prevSelection,
        clickedItemId: run.clickedItemId,
        modifiers: run.modifiers,
      })

      // ------------------------------------------
      // Assert
      expect(result).to.deep.eq(run.expectedSelection)
    })
  })
})
