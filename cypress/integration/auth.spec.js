describe('Auth', () => {
    it('Log in with valid credentials', () => {
        cy.visit('/user/login')
        cy.get('#normal_login_email').type('test33@example.com')
        cy.get('#normal_login_password').type('qwer123Ty')
        cy.get('.login-form-button').click()
        cy.get('.ant-avatar-square').should('be.visible')
        cy.url().should('include', '625c10b8af4a9d476b895d39')
    })
})