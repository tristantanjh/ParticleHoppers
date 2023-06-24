describe('Login', () => {
    it('successfully loads homepage', () => {
        cy.visit('/login');
    });

    beforeEach(() => {
        cy.visit('/login');
    });

    it('should log in successfully with valid credentials', () => {
      cy.get('input[name="email"]').type('test@123.com');
      cy.get('input[name="password"]').type('qwerty');
  
      cy.get('#login-btn').click();
  
      cy.url().should('include', '/breathe'); 
    });
  
    it('should display an error message with invalid credentials', () => {
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
  
      cy.get('#login-btn').click();
  
      cy.contains('Password or username is incorrect').should('be.visible');
    });

    it('should display an error message with missing password field', () => {
        cy.get('input[name="email"]').type('invalid@example.com');
    
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should display an error message with missing username field', () => {
        cy.get('input[name="password"]').type('invalidpassword');
    
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should display an error message with missing username and password field', () => {
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should navigate to the register page on clicking register button', () => {
        cy.get('#register-btn').click();
        cy.url().should('include', '/register');
    });

    it('should navigate to the home page on clicking logo', () => {
        cy.get('.image-hover').click();
        cy.url().should('include', '/');
    });
    
    it('should redirect to breathe page if accessed while already logged in', () => {
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
        cy.get('#login-btn').click();

        cy.visit('/login');
        cy.url().should('include', '/breathe'); 
    })
  });
  