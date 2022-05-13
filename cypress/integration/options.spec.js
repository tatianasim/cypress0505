describe('Options', () => {
  before(() => {
    cy.visit('/')

    cy.request({
      method: 'POST',
      url:`${Cypress.env('api_server')}/user/login`,
      body: {
        email: Cypress.env('login'),
        password: Cypress.env('password')
      }
    }).then((response) => {
      window.localStorage.setItem('userId', response.body.payload.userId)
      window.localStorage.setItem('token', response.body.payload.token)


      cy.request({
        method: 'PATCH',
        url: `${Cypress.env('api_server')}/user/profile`,
        headers: {
          Authorization: response.body.payload.token
        },
        body: {
          firstName:"Lulu",
          lastName:"Rere",
          phone:"11111111111",
          about:"",
          goals:"",
          countryName:"United States",
          englishLevel:"",
          tShirtSize:""
        }
      })

      cy.visit(`/settings/${response.body.payload.userId}/profile`)
    })
  })

  it('Profile form fill', () => {
    cy.get('[data-qa="englishLevel"]')
      .click()
    cy.get('[class*="ant-select-item"][title="Intermediate"]')
      .click()

    cy.intercept('PATCH', '/user/profile')
      .as('profileChange')

    cy.get('.ant-btn-primary')
      .click()

    cy.wait('@profileChange')
      .then((interception)=> {
        expect(interception.response.body.message).to.eq('User profile updated')
      })
  })
})