/// <reference types="Cypress" />

/**
 * Main goals
 * - Transform the previous manually-created state-sharing test into a cy.session-based test
 *
 * What to learn
 * - To leverage the dedicated cy.session command
 */

Cypress.Commands.add('register', function (username, email, password) {
  // ...
})

context('The New Post page', () => {
  const random = Math.round(Math.random() * 1000000)
  const credentials = {
    username: `foo${random}`,
    email: `foo${random}@bar.com`,
    password: 'bazbazbaz',
  }

  before(() => {})

  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
  })

  // Skipped until implemented
  it.skip('Should get the user registered', () => {
    cy.register(credentials.username, credentials.email, credentials.password)
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })

  // Skipped until implemented
  it.skip('Should get the user registered (leveraging the previous user)', () => {
    cy.register(credentials.username, credentials.email, credentials.password)
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })
})
