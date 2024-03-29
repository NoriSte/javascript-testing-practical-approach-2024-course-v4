/// <reference types="Cypress" />

/**
 * Main goals
 * - Assert about the response status code
 * - Assert about the response payload
 *
 * What to learn
 * - Making more assertions on the same subject
 * - Excluding as much errors as possible
 * - How much important is to test the payloads, even if it's not a user-like check
 * - Understanding what to care about: does the client need to know how the token is made up?
 *
 * Testing rules
 * - A failing test must give useful feedback. It must tell you what failed and why, without re-launching or debugging it
 * - Debugging a failing test is way harder than debugging an application
 */

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/#/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    const random = Math.round(Math.random() * 1_000_000)

    cy.findByPlaceholderText('Username').type(`foo${random}`)
    cy.findByPlaceholderText('Email').type(`foo${random}@bar.com`)
    cy.findByPlaceholderText('Password').type('bazbazbaz')

    cy.intercept('POST', '**/api.realworld.io/api/users').as('signup-request')

    cy.get('form').within(() => cy.findByText('Sign up').click())

    cy.wait('@signup-request').then(interception => {
      // assert about the request payload
      expect(interception.request.body, 'Request payload').to.deep.eq({
        user: {
          username: `foo${random}`,
          email: `foo${random}@bar.com`,
          password: 'bazbazbaz',
        },
      })

      // assert about the response status code
      expect(interception.response.statusCode, 'Response status').to.eq(201)

      // assert about the response payload
      const responseBody = interception.response.body
      expect(responseBody.user, 'Response payload:  username').to.have.property(
        'username',
        `foo${random}`,
      )
      expect(responseBody.user, 'Response payload: email').to.have.property(
        'email',
        `foo${random}@bar.com`,
      )
      // we can't assert about the payload content because it's randomic
      expect(responseBody.user, 'Response payload: token')
        .to.have.property('token')
        .and.to.be.a('string').and.not.to.be.empty
    })

    // a full reload is needed to get the user authenticated
    cy.reload()

    cy.findByText('No articles are here... yet.').should('be.visible')
  })
})
