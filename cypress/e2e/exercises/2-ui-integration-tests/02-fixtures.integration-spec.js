/// <reference types="Cypress" />
/**
 * Main goals
 * - Move the fixtures away from the body of the test
 *
 * What to learn
 * - The importance of the name of the fixtures
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
