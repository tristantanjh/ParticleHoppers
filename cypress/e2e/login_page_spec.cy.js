describe('Login', () => {
    it('should log in successfully with valid credentials', () => {
      cy.visit('/login'); // Replace '/login' with the actual URL of your login page
  
      cy.get('input[name="email"]').type('test@123.com');
      cy.get('input[name="password"]').type('qwerty');
  
      cy.get('#login-btn').click();
  
      cy.url().should('include', '/breathe'); // Replace '/dashboard' with the URL of the page after successful login
    });
  
    it('should display an error message with invalid credentials', () => {
      cy.visit('/login');
  
      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
  
      cy.get('#login-btn').click();
  
      cy.contains('Password or username is incorrect').should('be.visible');
    });

    it('should display an error message with missing password field', () => {
        cy.visit('/login');
    
        cy.get('input[name="email"]').type('invalid@example.com');
    
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should display an error message with missing username field', () => {
        cy.visit('/login');
    
        cy.get('input[name="password"]').type('invalidpassword');
    
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should display an error message with missing username and password field', () => {
        cy.visit('/login');
    
        cy.get('#login-btn').click();
        cy.contains('Missing credentials').should('be.visible');
    });

    it('should navigate to the register page on clicking register button', () => {
        cy.visit('/login');
    
        cy.get('#register-btn').click();
        cy.url().should('include', '/register');
    });

    it('should navigate to the home page on clicking logo', () => {
        cy.visit('/login');
    
        cy.get('.image-hover').click();
        cy.url().should('include', '/');
    });
  });
  