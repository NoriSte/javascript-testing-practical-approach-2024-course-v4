/// <reference types="Cypress" />

/**
 * Main goals
 * - Write a custom command that abstracts away the authentication code
 *
 * Additional goals
 * - Control logging instead of using Cypress' default one
 *
 * What to learn
 * - Shortening the test
 * - Abstracting away the repetitive code
 *
 * What to think about
 * - Keeping the abstraction level as low as possible (let's talk about the PageObject model...)
 * - How could you speed up the test without using `type`?
 *
 * Testing rules
 * - Keep the test code simple, stupid! DRY it as few as possible
 */

const noLog = { log: false }

Cypress.Commands.add('register', { prevSubject: 'optional' }, function (_subject) {
  cy.log('**Automatic registration start**')

  cy.visit('/register', noLog)

  const random = Math.round(Math.random() * 1_000_000)

  cy.findByPlaceholderText('Username', noLog).type(`foo${random}`, {
    delay: 0,
    log: false,
  })
  cy.findByPlaceholderText('Email', noLog).type(`foo${random}@bar.com`, {
    delay: 0,
    log: false,
  })
  cy.findByPlaceholderText('Password', noLog).type('bazbazbaz', { delay: 0, log: false })

  cy.intercept('POST', '**/api.realworld.io/api/users').as('signup-request')

  cy.get('form', noLog).within(() => cy.findByText('Sign up', noLog).click(noLog))

  cy.wait('@signup-request', noLog).then(interception => {
    // assert about the request payload
    expect(interception.request.body).to.deep.eq({
      user: {
        username: `foo${random}`,
        email: `foo${random}@bar.com`,
        password: 'bazbazbaz',
      },
    })

    // assert about the response status code
    expect(interception.response.statusCode).to.eq(200)

    // assert about the response payload
    const responseBody = interception.response.body
    expect(responseBody.user).to.have.property('username', `foo${random}`)
    expect(responseBody.user).to.have.property('email', `foo${random}@bar.com`)
    // we can't assert about the payload content because it's randomic
    expect(responseBody.user).to.have.property('token').and.to.be.a('string').and.not.to.be.empty
  })

  cy.findByText('No articles are here... yet.', { log: false }).should('be.visible')

  cy.log('**Automatic registration success**')
})

context('The New Post page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
  })

  it('Should get the user registered', () => {
    cy.register()
    cy.visit('/editor')
    cy.findByText('New Post').should('be.visible')
  })
})
