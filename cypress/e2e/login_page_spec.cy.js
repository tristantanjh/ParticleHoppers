describe('Login', () => {
    // Test case: Successfully loads login page
    it('successfully loads login page', () => {
        cy.visit('/login');
    });

    beforeEach(() => {
        cy.visit('/login');
    });

    // Test case: Log in successfully with valid credentials
    it('should log in successfully with valid credentials', () => {
        // Fill in the login form with existing fields
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
    
        // Submit the form
        cy.get('#login-btn').click();
        cy.url().should('include', '/'); 
    });
  
    // Test case: Display error message with invalid credentials
    it('should display an error message with invalid credentials', () => {
        // Fill in the login form with both invalid fields
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('wrongpassword');
    
        // Submit the form
        cy.get('#login-btn').click();

        // Assert the error message
        cy.contains('Password or username is incorrect').should('be.visible');
    });

    // Test case: Display error message with invalid email only
    it('should display an error message with invalid email only', () => {
        // Fill in the login form with invalid email only
        cy.get('input[name="email"]').type('invalid@example.com');
        cy.get('input[name="password"]').type('qwerty');
    
        // Submit the form
        cy.get('#login-btn').click();
    
        // Assert the error message
        cy.contains('Password or username is incorrect').should('be.visible');
    });

     // Test case: Display error message with invalid password only
     it('should display an error message with invalid password only', () => {
        // Fill in the login form with invalid password only
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('wrongpassword');
    
        // Submit the form
        cy.get('#login-btn').click();

        // Assert the error message
        cy.contains('Password or username is incorrect').should('be.visible');
    });


    // Test case: Display error message with missing password field
    it('should display an error message with missing password field', () => {
        // Fill in the login form with missing password field
        cy.get('input[name="email"]').type('test@123.com');
    
        // Submit the form
        cy.get('#login-btn').click();

        // Assert the error message
        cy.contains('Missing credentials').should('be.visible');
    });

    // Test case: Display error message with missing username field
    it('should display an error message with missing email field', () => {
        // Fill in the login form with missing email field
        cy.get('input[name="password"]').type('qwerty');
    
        // Submit the form
        cy.get('#login-btn').click();

        // Assert the error message
        cy.contains('Missing credentials').should('be.visible');
    });

    // Test case: Display error message with missing email and password field
    it('should display an error message with missing email and password field', () => {
        // Submit the empty form
        cy.get('#login-btn').click();

        // Assert the error message
        cy.contains('Missing credentials').should('be.visible');
    });

    // Test case: Navigate to the register page on clicking register button
    it('should navigate to the register page on clicking register button', () => {
        cy.get('#register-btn').click();
        cy.url().should('include', '/register');
    });

    // Test case: Navigate to the home page on clicking logo
    it('should navigate to the home page on clicking logo', () => {
        cy.get('.image-hover').click();
        cy.url().should('include', '/');
    });
    
    // Test case: Redirect to home page if accessed while already logged in
    it('should redirect to home page if accessed while already logged in', () => {
        // Log in with test credentials
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
        cy.get('#login-btn').click();

        // Access the login page
        cy.visit('/login');
        cy.url().should('include', '/'); 
    });
  });
  