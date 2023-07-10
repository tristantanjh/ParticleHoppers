describe("Create New Journal Entry Page", () => {
    // Test case: Redirects user to login page if accessing without login
    it('should redirect user to login page if accessing without login', () => {
        cy.visit('/journal/new');

        // Asserts that user is redirected to login page
        cy.url().should('include', '/login')
    });

    let email;
    let password;

    // Creates new user with no existing entries
    it('should create a new user with no existing entries', () => {
        cy.visit('/register');
        const uniqueId = Date.now();
        email = `testuser${uniqueId}@example.com`;
        password = "qwerty";
        
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="username"]').type("testing user" + uniqueId);
        cy.get('input[name="password"]').type(password);

        cy.get('#signup-btn').click();
        cy.url().should('include', '/'); 
    });

    beforeEach(() => {
        if (Cypress.currentTest.title !== 'should create a new user with no existing entries' && 
            Cypress.currentTest.title !== 'should redirect user to login page if accessing without login') {
            cy.visit('/login');
            cy.get('input[name="email"]').type(email);
            cy.get('input[name="password"]').type(password);
            cy.get('#login-btn').click();
            cy.visit('/journal/new');
             // Listen to the uncaught:exception event and handle it gracefully
            // cy.on('uncaught:exception', (err) => {
            //     // Log the error and prevent it from failing the test
            //     console.error(err);
            //     return false;
            // });
            cy.url().should('include', '/journal/new'); 
        }
    });

    it('should display the page to enter new journal entry', () => {
        // Assert that the form fields are displayed
        cy.get('#newTitle')
            .should('be.visible')
            .should('have.attr', 'placeholder', "Title of today's entry");
        cy.get('#newContent')
            .should('be.visible')
            .should('have.attr', 'placeholder', "Pen down today's entry here");

        // Assert that the submit button is displayed and initially disabled
        cy.get('#submitButton')
            .should('be.visible')
            .should('contain', 'Submit')
            .should('be.disabled');

        // Assert that the date is displayed in the header
        cy.get('.display-5.main-text.fw-normal')
            .should('contain', "Today's Journal Entry")
            .should('contain', new Date().toLocaleDateString());
    });
    
    // Test case: Navigate to the breathe page from 'take a breather' link
	it("should navigate to the breathe page from 'take a breather' link", () => {
		cy.get('#breather-link').click(); 
		cy.url().should('include', '/breathe');
	});

    // Test case: Navigate to the quote page from 'daily quote' link
	it("should navigate to the quote page from 'daily quote' link", () => {
		cy.get('#quote-link').click(); 
		cy.url().should('include', '/quote');
	});

    // Test case: Navigate to the journal page from 'view all entries' link
	it("should navigate to the journal page from 'view all entries' link", () => {
		cy.get('#journal-link').click(); 
        // Listen to the uncaught:exception event and handle it gracefully
        cy.on('uncaught:exception', (err) => {
            // Log the error and prevent it from failing the test
            console.error(err);
            return false;
        });
		cy.url().should('include', '/journal/entries');
	});

    // Test case: Navigate to the home page on clicking logo
    it('should navigate to the home page on clicking logo', () => {
        cy.get('.image-hover').click();
        cy.url().should('include', '/');
    });

    // Test case: Logs user out when clicking logout button
    it('should log user out when clicking logout button', () => {
        cy.get('#login-btn').click();

        // Asserts that user is redirected to home page after logout
        cy.url().should('include', '/');

        // Visit new journal page again
        cy.visit('/journal/new');

        // Asserts that user is redirected to login page, proving that user is logged out
        cy.url().should('include', '/login');
    });

    // Test case: Enables submit button when title and content fields are filled
    it('should enable submit button when title and content fields are filled', () => {
        // Enter values in the title and content fields
        cy.get('#newTitle').type('Sample Title');
        cy.get('#newContent').type('Sample Content');

        // Assert that the submit button is enabled
        cy.get('#submitButton').should('be.enabled');
    });

    // Test case: Redirects to the view all entries page when submit button is clicked
    it('should redirect to the view all entries page when submit button is clicked', () => {
        // Enter values in the title and content fields
        cy.get('#newTitle').type('Sample Title');
        cy.get('#newContent').type('Sample Content');

        // Click the submit button
        cy.get('#submitButton').click();

        // Assert that the URL has changed to the view all entries page
        cy.url().should('include', '/journal/entries');
    });
});