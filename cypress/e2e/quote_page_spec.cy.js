describe('Quote', () => {
    // Test case: Redirects user to login page if accessing without login
    it('redirects user to login page if accessing without login', () => {
        cy.visit('/quote');

        // Asserts that user is redirected to login page
        cy.url().should('include', '/login')
    });

    beforeEach(() => {
        if (Cypress.currentTest.title !== 'redirects user to login page if accessing without login') {
            cy.visit('/login');
            cy.get('input[name="email"]').type('test@123.com');
            cy.get('input[name="password"]').type('qwerty');
            cy.get('#login-btn').click();
            cy.visit('/quote');
            cy.url().should('include', '/quote'); 
        }
    });

    // Test case: Successfully loads quote when logged in
    it('should display the quote page', () => {
        cy.visit('/quote');
        cy.url().should('include', '/quote'); 
        // Assert that the quote element is not empty
        cy.get('h1.quote').should('not.be.empty');

        // Assert that the quoteAuthor element is not empty
        cy.get('p.quoteAuthor').should('not.be.empty');
    });

    // Test case: Navigate to the breathe page from 'take another breather' button
	it("should navigate to the breathe page from 'take another breather' button", () => {
		cy.get('#begin-btn').click(); 
		cy.url().should('include', '/breathe');
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

        // Visit quote page again
        cy.visit('/quote');

        // Asserts that user is redirected to login page, proving that user is logged out
        cy.url().should('include', '/login');
    });

    // Test case: Daily quote refreshes at 8am (start testing at 7:59am)
    it('should refresh the quote at 8am daily', () => {
        const refreshTime = new Date('2023-06-23T08:00:00'); // Refresh time set at 8am
      
        // Freeze time to a specific date and time
        cy.clock(refreshTime.getTime());
      
        let previousQuote = '';
      
        cy.visit('/quote');

        // Check whether current time is between 7:50am to 8am to prevent needless running of test case
        if (checkTimeRange()) {
            return;
        }

        // Assert that the initial quote is displayed and store it in `previousQuote`
        cy.get('.quote').should('not.be.empty').then(($quote) => {
          previousQuote = $quote.text();
        });
        cy.get('.quoteAuthor').should('not.be.empty');
      
        // Wait for a specific duration (2 minutes) to simulate the passage of time
        const waitDuration = 120000;
        cy.wait(waitDuration);

        cy.visit('/quote'); // Refresh the page

        // Assert that the quote has been refreshed and compare it with the previous quote
        cy.get('.quote').should('not.be.empty').should(($quote) => {
          const currentQuote = $quote.text();
          expect(currentQuote).not.to.equal(previousQuote);
        });
        cy.get('.quoteAuthor').should('not.be.empty');
    });
})

// Function to check for whether current time lies between 7:50am and 8am
function checkTimeRange() {
    // Get the current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Define the desired refresh time range (7:50am to 8:00am)
    const refreshTimeHour = 7;
    const refreshTimeMinuteStart = 50;
    const refreshTimeMinuteEnd = 0;

    // Check if the current time is within the desired range
    if (
        currentHour !== refreshTimeHour ||
        currentMinute < refreshTimeMinuteStart ||
        currentMinute > refreshTimeMinuteEnd
    ) {
        // Skip the test case if it's not within the desired time range
        cy.log(
            'Skipping the quote refresh test as it is not within the desired time range.'
        );
        return true;
    }

    return false;
}