/// <reference types="Cypress" />

/**
 * Main goals
 * - Click the button
 * - Sleep the test 10 seconds
 * - Assert that everything works
 * - Check that the test works if launched more times
 *
 * Additional goals
 * - Avoid unnecessary waiting
 * - Log the Cypress's commands queue
 *
 * What to learn
 * - Adding assertions to close the circle and get the test a real test
 * - Analyzing the behavior of the app and asserting about it
 * - Thinking about what to assert
 * - Cypress's automating retrying
 * - Command's timeout
 * - Cypress commands queue
 *
 * What to think about
 * - The test could fail because of server delays, Cypress doesn't wait forever
 *
 * Testing rules
 * - Tests must be deterministic
 * - The tests should not fail randomly. False-negative tests are the worst ones
 * - Obviously, the opposite is important too: tests must fail if the app does not work
 * - A bad test is worse then not having it
 */

context('The sign up page', () => {
  beforeEach(() => {
    // adapt the viewport, allows the instructor to have more vertical windows when sharing the screen
    cy.viewport(600, 900)
    cy.visit('/register')
  })

  it('Should allow registering and redirects the user to the home page', () => {
    const random = Math.round(Math.random() * 1_000_000)

    // this is an E2E test, hence the back-end is a real one. The same user can't be registered more
    // than once, we need to generate random users
    cy.get('.form-control').eq(0).type(`foo${random}`)
    cy.get('.form-control').eq(1).type(`foo${random}@bar.com`)
    cy.get('.form-control').eq(2).type('bazbazbaz')

    cy.get('button').click()

    // waiting for the redirect to the home page
    cy.wait(10000)

    cy.location().should(location => expect(location.pathname).to.eq('/'))
  })

  it('Playground: avoid unnecessary timeout', function () {
    const random = Math.round(Math.random() * 1_000_000)

    cy.get('.form-control').eq(0).type(`foo${random}`)
    cy.get('.form-control').eq(1).type(`foo${random}@bar.com`)
    cy.get('.form-control').eq(2).type('bazbazbaz')

    cy.get('button').click()

    cy.location({ timeout: 10000 })
      // if `should` fails, it retries the previous, side-effects free, command
      .should(location => expect(location.pathname).to.eq('/'))

    // log the Cypress commands
    console.log(this.test.commands)
  })
})
