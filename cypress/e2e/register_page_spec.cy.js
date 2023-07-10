/* 
    Default Tester Account Details: 
    Email: test@123.com
    Username: tester1
    Password: qwerty
*/

describe('Registration Page', () => {
    // Test case: Successfully loads register page
    it('successfully loads register page', () => {
        cy.visit('/register');
    });

    // Test case: Redirect to home page if accessed while already logged in
    it('should redirect to home page if accessed while already logged in', () => {
        // Login with test credentials
        cy.visit('/login');
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
        cy.get('#login-btn').click();

        // Access the registration page
        cy.visit('/register');
        cy.url().should('include', '/'); 
    });

    beforeEach(() => {
        cy.visit('/register');
    });

    // Test case: Display error message when email and username are already taken
    it('should display an error message when email and username is already taken', () => {
        // Fill in the registration form with existing email and username fields
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="username"]').type('tester1');
        cy.get('input[name="password"]').type('qwerty');
        
        // Submit the form
        cy.get('#signup-btn').click();
        
        // Assert the error message
        cy.contains('Email or username is already taken').should('be.visible');
    });

    // Test case: Display error message when only email is already taken
    it('should display an error message when only email is already taken', () => {
        // Generate a unique identifier
        const uniqueId = Date.now();

        // Fill in the registration form with existing email fields
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="username"]').type(uniqueId);
        cy.get('input[name="password"]').type('qwerty');
        
        // Submit the form
        cy.get('#signup-btn').click();
        
        // Assert the error message
        cy.contains('Email or username is already taken').should('be.visible');
    });

    // Test case: Display error message when only username is already taken
    it('should display an error message when only username is already taken', () => {
        // Generate a unique identifier
        const uniqueId = Date.now();
        const email = `testuser${uniqueId}@example.com`;

        // Fill in the registration form with existing email fields
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="username"]').type('tester1');
        cy.get('input[name="password"]').type('qwerty');
        
        // Submit the form
        cy.get('#signup-btn').click();
        
        // Assert the error message
        cy.contains('Email or username is already taken').should('be.visible');
    });

    // Test case: Register a new user and redirect to the home page
    it('should register a new user and redirect to home page', () => {
      // Generate a unique timestamp as identifier
        const uniqueId = Date.now();
        const email = `testuser${uniqueId}@example.com`;
        const password = "qwerty";
        
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="username"]').type("testing user" + uniqueId);
        cy.get('input[name="password"]').type(password);

        cy.get('#signup-btn').click();
        cy.url().should('include', '/'); 
    });

    // Test cases for missing field combinations
    const fields = ['email', 'username', 'password'];
  
    for (let i = 1; i < fields.length; i++) {
        const missingFields = getCombinations(fields, i);
        
        missingFields.forEach((combination) => {
            const testTitle = combination.join(', ');
            
            it(`should reject registration with missing ${testTitle} fields`, () => {
                // Visit the registration page
                cy.visit('/register'); // Replace with the actual URL of the registration page
                
                // Fill in the registration form with incomplete or missing data
                combination.forEach((field) => {
                cy.get(`input[name="${field}"]`).type('Test Value');
                cy.get(`input[name="${field}"]`).clear();
                });
                
                // Submit the form
                cy.get('#signup-btn').click();
                
                // Assert the error message
                cy.url().should('include', '/register'); 
                cy.contains('Missing credentials').should('be.visible'); 
            });
        });
    }

    // Test case: Navigate to the login page if login anchor tag is clicked
    it('should navigate to the login page if login anchor tag is clicked ', () => {
        cy.get('#redirect-login').click();
        cy.url().should('include', '/login'); 
    }); 

    // Test case: Navigate to the home page on clicking logo
    it('should navigate to the home page on clicking logo', () => {
        cy.get('.image-hover').click();
        cy.url().should('include', '/');
    });
});

// Function to generate combinations of fields
function getCombinations(arr, length) {
    const combinations = [];

    if (length === 0) {
        return [[]];
    }

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(i + 1);
        const subCombinations = getCombinations(remaining, length - 1);
        
        subCombinations.forEach((subCombination) => {
        combinations.push([current, ...subCombination]);
        });
    }

    return combinations;
}
  
  