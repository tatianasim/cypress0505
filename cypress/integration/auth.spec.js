describe('Auth', () => {
  beforeEach(()=> {
    cy.visit('/user/login')
  })

  it('Log in with valid credentials', () => {
    cy.intercept('POST', '/user/login')
      .as('login')

    cy.get('#normal_login_email')
      .type(Cypress.env('login'))
    cy.get('#normal_login_password')
      .type(Cypress.env('password'))
    cy.get('.login-form-button')
      .click()

    cy.wait('@login')
      .then(({response})=> {
        cy.url().should('include', response.body.payload.userId)
      })
    cy.get('.ant-avatar-square')
      .should('be.visible')

  })

  it('Email input field is required', () => {
    cy.get('#normal_login_email')
      .type('test')
      .clear()

    cy.xpath('//div[contains(@class, "ant-col")][div//input[@id="normal_login_email"]]//div[@role="alert"]')
      .should('have.text', 'Required')
  })

  it('Email incorrect validation', () => {
    cy.get('#normal_login_email')
      .type('test')


    cy.xpath('//div[contains(@class, "ant-col")][div//input[@id="normal_login_email"]]//div[@role="alert"]')
      .should('have.text', '\'email\' is not a valid email')
  })

  it('Password input field is required', () => {
    cy.get('#normal_login_password')
      .type('test')
      .clear()

    cy.xpath('//div[contains(@class, "ant-col")][div//input[@id="normal_login_password"]]//div[@role="alert"]')
      .should('have.text', 'Required')
  })
})

