describe('Options', () => {
  it('Profile form fill', () => {

    cy.visit('/')

    cy.request({
      method: 'POST',
      url:'https://server-prod.pasv.us/user/login',
      body: {
        email: 'test33@example.com',
        password: 'qwer123Ty'
      }
    }).then((response) => {
      window.localStorage.setItem('userId', response.body.payload.userId)
      window.localStorage.setItem('userId', response.body.payload.token)


      cy.request({
        method: 'PATCH',
        url: 'https://server-prod.pasv.us/user/profile',
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
})