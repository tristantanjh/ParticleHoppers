/* 
    Default Tester Account Details: 
    Email: test@123.com
    Username: tester1
    Password: qwerty
*/

describe("Journal Entries (Basic Test Cases)", () => {
    // Test case: Redirects user to login page if accessing without login
    it('redirects user to login page if accessing without login', () => {
        cy.visit('/journal/entries');
        cy.url().should('include', '/login');
    });

    beforeEach(() => {
        if (Cypress.currentTest.title !== 'redirects user to login page if accessing without login') {
            cy.visit('/login');
            cy.get('input[name="email"]').type('test@123.com');
            cy.get('input[name="password"]').type('qwerty');
            cy.get('#login-btn').click();
            cy.visit('/journal/entries');
            cy.url().should('include', '/journal/entries'); 
        }
    });

    // Test case: Successfully loads journal entries when logged in
    it('should display the journal entries page', () => {
        cy.visit('/journal/entries');
        cy.url().should('include', '/journal/entries');
        cy.get('#journal-title').should('be.visible');
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

    // Test case: Stay at same page on clicking 'feelings journal' link
	it("should stay at same page on clicking 'feelings journal' link", () => {
		cy.get('#journal-link').click(); 
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

        // Visit quote page again
        cy.visit('/quote');

        // Asserts that user is redirected to login page, proving that user is logged out
        cy.url().should('include', '/login');
    });
});

describe("Journal Entries (Default Test User with Prepopulated Entries)", () => {
    beforeEach(() => {
        if (Cypress.currentTest.title !== 'redirects user to login page if accessing without login') {
            cy.visit('/login');
            cy.get('input[name="email"]').type('test@123.com');
            cy.get('input[name="password"]').type('qwerty');
            cy.get('#login-btn').click();
            cy.visit('/journal/entries');
            cy.url().should('include', '/journal/entries'); 
        }
    });
    
    // Test case: For predefined user, entries table should not be empty
    it('should be prepopulated with entries', () => {
        // Assert that the table exists
        cy.get('table').should('exist');

        // Assert that the table body contains entries
        cy.get('#tableBody').find('tr').should('have.length.gt', 0);
    });

    // Test case: Displays the title, content, and date under the correct headings and expected formats
    it('should display the title, content, and date under the correct headings and expected formats', () => {
        // Get all the journal entry rows
        cy.get('#tableBody').find('tr').each((row, index) => {
            // Get the title, content, and date elements for each row
            cy.wrap(row).find('td').eq(0).then((titleColumn) => {
                const title = titleColumn.text().trim();
        
                // Assert that the title is not empty
                expect(title).to.not.be.empty;
            });
        
            cy.wrap(row).find('td').eq(1).then((dateColumn) => {
                const date = dateColumn.text().trim();
        
                // Assert that the date is not empty
                expect(date).to.not.be.empty;
                // Assert that the date is in the expected format (e.g., "Sun Jul 09 2023")
                expect(date).to.match(/^\w{3} \w{3} \d{2} \d{4}$/);
            });
        
            cy.wrap(row).find('td').eq(2).then((contentColumn) => {
                const content = contentColumn.text().trim();
        
                // Assert that the content is not empty
                expect(content).to.not.be.empty;
            });
        });
    });

    // Test case: Reverses order of the table when clicking the 'date created' table header
    it("should reverse the order of the table when clicking the 'date created' table header", () => {
        // Get the initial order of the table rows
        let initialOrder = [];
        cy.get('#tableBody')
          .find('tr')
          .each((row) => {
            initialOrder.push(row.text().trim());
          });
    
        // Click the Date Created table header to reverse the order
        cy.get('#reverseByDate').click();
        cy.wait(500); // Wait for animation
    
        // Get the reversed order of the table rows
        let reversedOrder = [];
        cy.get('#tableBody')
          .find('tr')
          .each((row) => {
            reversedOrder.push(row.text().trim());
          });
    
        // Assert that the reversed order is the reverse of the initial order
        expect(reversedOrder).to.deep.equal(initialOrder.reverse());
    });
});