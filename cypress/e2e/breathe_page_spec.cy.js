describe('Breathe', () => {
    it('redirects user to login page if accessing without login', () => {
        cy.visit('/breathe');
    });

    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
        cy.get('#login-btn').click();
        cy.url().should('include', '/breathe'); 
    });

    it('should display the breathe page', () => {
        cy.visit('/breathe');
        cy.url().should('include', '/breathe'); 
    });
})