describe('Homepage', () => {
	// Test case: Successfully loads homepage
	it('successfully loads homepage', () => {
		cy.visit('/');
	})

	beforeEach(() => {
		cy.visit('/');
	})

	// Test case: Navigate to the login page from the login button on top navbar
	it('should navigate to the login page from the login button on top navbar', () => {
		cy.get('#login-btn').click();
		cy.url().should('include', '/login');
	})

	// Test case: Navigate to the login page from 'begin' button
	it("should navigate to the login page from 'begin' button", () => {
		cy.get('#begin-btn').click(); 
		cy.url().should('include', '/login');
	});

	// Test case: Navigate to the mission section on homepage from top navbar
	it('should navigate to the mission section on homepage from top navbar', () => {
		cy.get('.mission-topnav').click();
		cy.url().should('include', '#mission');
	});

	// Test case: Navigate to the top of homepage from bottom navbar
	it('should navigate to the top of homepage from bottom navbar', () => {
		cy.get('.home-botnav').click();
		cy.url().should('include', '#main');
	});

	// Test case: Navigate to the mission section on homepage from bottom navbar
	it('should navigate to the mission section on homepage from bottom navbar', () => {
		cy.get('.mission-botnav').click();
		cy.url().should('include', '#mission');
	});

	// Test case: Navigate to the about page from bottom navbar
	it('should navigate to the about page from bottom navbar', () => {
		cy.get('.about-botnav').click();
		cy.url().should('include', '/about');
	});
})