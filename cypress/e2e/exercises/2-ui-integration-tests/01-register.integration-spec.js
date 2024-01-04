/// <reference types="Cypress" />

/**
 * Main goals
 * - Stub the server
 *
 * Additional goals
 * - Clean up the test removing everything unneeded
 *
 * What to learn
 * - What's stubbing
 * - When to leverage E2E tests and when not
 * - That working without a back-end parallelize FE/BE development
 * - That the back-end slows down the front-end development
 */

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/#/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    // ...
  })
})
