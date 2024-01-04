/// <reference types="Cypress" />

/**
 * Main goals
 * - Transform the previous manually-created state-sharing test into a cy.session-based test
 *
 * What to learn
 * - To leverage the dedicated cy.session command
 */

Cypress.Commands.add('register', function (username, email, password) {
  cy.session(
    [username, email, password],
    () => {
      // ------------------------------
      // the registration flow
      cy.intercept('POST', '**/api.realworld.io/api/users').as('signup-request')
      cy.visit('/register')
      cy.window().its('appActions').invoke('signup', { username, email, password })
      cy.wait('@signup-request').then(_interception => {
        // ... all the payload assertions are skipped for brevity...
      })
      cy.findByText('New Post').should('be.visible')
    },
    {
      validate() {
        cy.visit('/')

        // use the 'New Post' string to detect if the user is authenticated or not
        cy.findByText('New Post').should('be.visible')
      },
    },
  )
})

context('The New Post page', () => {
  const random = Math.round(Math.random() * 1_000_000)
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

  it('Should get the user registered', () => {
    cy.register(credentials.username, credentials.email, credentials.password)
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })

  it('Should get the user registered (leveraging the previous user)', () => {
    cy.register(credentials.username, credentials.email, credentials.password)
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })
})
