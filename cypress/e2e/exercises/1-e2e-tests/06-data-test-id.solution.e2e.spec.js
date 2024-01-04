/// <reference types="Cypress" />

/**
 * Main goals
 * - Leverage data-testid selectors
 *
 * What to learn
 * - Why element/id/class-based selectors aren't stable
 */

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/#/register')
  })

  // The test is skipped since the data-testid attributes are not yet added to the app
  it.skip('Should allow registering and redirects the user to the home page', () => {
    const random = Math.round(Math.random() * 1_000_000)

    // data-testid selectors are more resilient compared to classes, ids, etc.
    cy.get('[data-testid=username]').type(`foo${random}`)
    cy.get('[data-testid=email]').type(`foo${random}@bar.com`)
    cy.get('[data-testid=password]').type('bazbazbaz')

    cy.intercept('POST', '**/api.realworld.io/api/users').as('signup-request')

    cy.get('[data-testid=signup-button]').click()
    cy.wait('@signup-request')

    cy.location().should(location => expect(location.pathname).to.eq('/'))
  })
})
