/// <reference types="Cypress" />

/**
 * Main goals
 * - Test what the user sees when the server returns error during the registration
 * - Leverage the app action instead of filling the form
 *
 * Additional goals
 * - Test what the user sees when the server returns more than one error
 *
 * What to learn
 * - How much controlling the back-end is useful to test error/edge cases
 * - You must spend most of your automation time with UI Integration Tests
 *
 * What to think about
 * - The importance of low/no abstraction, referring to the additional exercise
 * - How hard it could be to test something like this with an E2E test
 * - If the front-end is 100% tested by stubbing the back-end, what do E2E tests test?
 * - How to use Cypress as a development tool
 *   - Keeping Cypress opened while coding
 *   - Leverage Cypress speed by replacing manual actions
 *   - Use chrome instead of Electron for the latest devtools
 *   - Install Chrome extensions
 */

const headers = { 'Access-Control-Allow-Origin': '*' }

beforeEach(() => {
  // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
  cy.viewport(600, 900)
})

context('The sign up page', () => {
  it('Should show an error when the email is already in use', () => {
    cy.intercept('POST', '**/api/users', {
      // the response returned by the server in case of error
      body: { errors: { email: 'is already taken.' } },
      statusCode: 422,
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).as('signup-request')

    cy.visit('/#/register')

    // leverage tha app action to avoid filling the form. The credentials are optional since the
    // server isn't the real one
    cy.window().its('appActions').invoke('signup', {})

    cy.wait('@signup-request')

    cy.findByText('email is already taken.').should('be.visible')
  })

  it('Should show an error for every error returned by the server', () => {
    cy.intercept('POST', '**/api/users', {
      // the response returned by the server in case of error
      body: { errors: { email: 'foo', username: 'bar' } },
      statusCode: 422,
      headers: { 'Access-Control-Allow-Origin': '*' },
    }).as('signup-request')

    cy.visit('/#/register')

    cy.window().its('appActions').invoke('signup', {})

    cy.wait('@signup-request')

    cy.findByText('email foo').should('be.visible')
    cy.findByText('username bar').should('be.visible')
  })
})
