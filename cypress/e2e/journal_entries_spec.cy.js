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

        // Visit journal entries page again
        cy.visit('/journal/entries');

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

    // Test case: Displays the full journal entry in a modal when clicking entry title
    it('should display the full journal entry in a modal when clicking entry title', () => {
        // Click the first entry title to open the journal entry modal
        cy.get('#tableBody')
            .find('tr')
            .first()
            .find('p.underline')
            .click();
    
        // Assert that the journal entry modal is displayed
        cy.get('.journalModal')
            .should('be.visible');
   
        // Assert that the header in the journal entry modal is not empty
        cy.get('.journalModal')
            .find('.modal-title')
            .should('not.be.empty');

        // Assert that the entry title field in the journal entry modal is not empty
        cy.get('.journalModal')
            .find('#entryTitle')
            .should('not.be.empty');

        // Assert that the entry content field in the journal entry modal is not empty
        cy.get('.journalModal')
            .find('#entryContent')
            .should('not.be.empty');
    });

    it('should only allow editing of entries submitted today', () => {
        // Find the entry submitted today in the table
        cy.get('#tableBody')
          .find('tr')
          .each((row) => {
            const entryDate = Cypress.$(row).find('td').eq(1).text().trim();
            if (entryDate === new Date().toDateString()) {
              // Click the edit button of the entry submitted today
              cy.wrap(row).find('.bi-pencil-square')
                .click({ force: true });
      
              // Assert that the edit modal is displayed
              cy.get('.editModal')
                .should('be.visible');
            }
          });
      });

    // Test case: Checks whether today\'s entry is filled. if found, create today\'s entry should be visible, and upon clicking should redirect to create entry page
    it('should check whether today\'s entry is filled. if found, create today\'s entry should be visible, and upon clicking should redirect to create entry page', () => {
        // Get today's date
        const today = new Date().toDateString();
    
        // Flag to keep track of today's entry
        let foundTodayEntry = false;

        // Check each row in the table
        cy.get('#tableBody')
        .find('tr')
        .each((row) => {
            // Get the date column
            cy.wrap(row)
            .find('td')
            .eq(1)
            .invoke('text')
            .then((dateColumn) => {
                // Clean up the date text
                const entryDate = dateColumn.trim();

                // Check if today's date matches the entry date
                if (entryDate === today) {
                // Today's entry is found, set the flag to true
                foundTodayEntry = true;
                }
            });
        })
        .then(() => {
            // Check if today's entry is found
            if (!foundTodayEntry) {
            // Today's entry is not found, check the "Fill In Today's Entry" div
            cy.get('#todays-entry')
                .should('be.visible')
                .click();

            // Assert that the URL has changed to "/journal/new"
            cy.url().should('include', '/journal/new');
            }
        });
    });
});

describe("Journal Entries (New User with No Existing Entries)", () => {
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
        if (Cypress.currentTest.title !== 'should create a new user with no existing entries') {
            cy.visit('/login');
            cy.get('input[name="email"]').type(email);
            cy.get('input[name="password"]').type(password);
            cy.get('#login-btn').click();
            cy.visit('/journal/entries');
             // Listen to the uncaught:exception event and handle it gracefully
            cy.on('uncaught:exception', (err) => {
                // Log the error and prevent it from failing the test
                console.error(err);
                return false;
            });
            cy.url().should('include', '/journal/entries'); 
        }
    });

    // Test case: Displays message when there are no journal entries
    it('should display a message when there are no journal entries', () => {
        // Assert that the message for no journal entries is displayed
        cy.get('.lead.main-text.fw-normal')
          .should('have.text', 'No journal entries found. Create an entry now?');
    });

    // Test case: Redirects to the create entry page when "Create an entry now?" link is clicked
    it('should redirect to the create entry page when "Create an entry now?" link is clicked', () => {
        // Click the "Create an entry now?" link
        cy.get('.fw-bold.create-entry')
          .click();
    
        // Assert that the URL has changed to "/journal/new"
        cy.url().should('include', '/journal/new');
    });

    // Test case: Updates entries to show newly added entry
    it('should update entries when new entry is added', () => {
        // Click the "Create an entry now?" link
        cy.get('.fw-bold.create-entry')
          .click();
    
        // Assert that the URL has changed to "/journal/new"
        cy.url().should('include', '/journal/new');

        // Enter values in the title and content fields
        cy.get('#newTitle').type('Sample Title');
        cy.get('#newContent').type('Sample Content');

        // Click the submit button
        cy.get('#submitButton').click();

        // Assert that the URL has changed to the view all entries page
        cy.url().should('include', '/journal/entries');

        // Check if the new entry is added to the entry list
        cy.get('#tableBody')
            .find('tr')
            .first()
            .find('td')
            .eq(0)
            .should('contain', 'Sample Title') // Check the title of the new entry
            .should('contain', 'Sample Content'); // Check the content of the new entry
    });

    // Test case: Edit modal shows up when the edit SVG is clicked
    it('should show the edit modal when the edit SVG is clicked', () => {
        // Click the first edit SVG in the entry list
        cy.get('.bi-pencil-square').first().click();
    
        // Assert that the edit modal is visible
        cy.get('.editModal')
            .should('be.visible');
    });

    // Test case: Editing an entry
    it('should successfully edit an entry', () => {
        // Click the first edit SVG in the entry list
        cy.get('.bi-pencil-square').first().click();

        // Wait for the edit modal to appear
        cy.get('.editModal')
            .should('be.visible');

        // Update the title and content fields
        cy.get('#editTitle').clear();
        cy.get('#editTitle').should('be.visible').wait(500).type('Updated Title');
        cy.get('#editContent').clear().type('Updated Content');

        // Click the save button
        cy.get('#saveButton').click();

        // Assert that the edit modal is no longer visible
        cy.get('.editModal')
            .should('not.be.visible');

        // Assert that the updated entry is displayed in the entry list
        cy.get('.entry-title').should('contain', 'Updated Title');
        cy.get('.entry-content').should('contain', 'Updated Content');
    });

    // Test case: Delete modal shows up when the delete SVG is clicked
    it('should show the delete modal when the delete SVG is clicked', () => {
        // Click the first delete SVG in the entry list
        cy.get('.bi-trash3').first().click();
    
        // Assert that the delete modal is visible
        cy.get('.deleteModal')
            .should('be.visible');
    });

    // Test case: Deleting an entry 
    it('should delete an entry when delete button is clicked', () => {
        // Click the first delete SVG in the entry list
        cy.get('.bi-trash3').first().click();
    
        // Assert that the delete modal is visible
        cy.get('.deleteModal')
            .should('be.visible')
            .find('.btn-danger')
            .click();

        // Assert that the message for no journal entries is displayed
        cy.get('.lead.main-text.fw-normal')
          .should('have.text', 'No journal entries found. Create an entry now?');
    });
});