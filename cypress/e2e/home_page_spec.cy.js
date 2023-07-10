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

	// Test case: Navigate to the top of homepage from bottom navbar
	it('should navigate to the top of homepage from bottom navbar', () => {
		cy.get('.home-botnav').click();
		cy.url().should('include', '/');
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

	// Test case: Homepage displays different content based on user login status
	it('displays different content based on user login status', () => {
		// Visit the home page without logging in
		cy.visit('/');
	
		// Assert that the mainText and subText classes, and begin and login buttons show the correct content for non-logged in users
		cy.get('.mainText').should('contain.text', "It's okay to not be okay.");
		cy.get('.subText').should('contain.text', "We’re here to support and allow everyone to feel more at ease in their daily lives by providing support and guidance along the way. No matter what you’re going through, we’re here for you.");
		cy.get('#login-btn').should('contain.text', 'Login');
	
		// Log in the user
		cy.visit('/login');

		// Fill in the login form with existing fields
        cy.get('input[name="email"]').type('test@123.com');
        cy.get('input[name="password"]').type('qwerty');
    
        // Submit the form
        cy.get('#login-btn').click();
		cy.visit('/');
        cy.url().should('include', '/'); 
	
		// Assert that the mainText and subText classes show the correct content for logged in users
		cy.get('.mainText').should('contain.text', 'Welcome back, tester'); // Assert that logged in user's username is displayed
		cy.get('.subText').should('contain.text', "Thank you for allowing us to support your mental health journey. Explore our app's empowering features and unlock personalized support for a transformative experience.");
	
		// Assert that the begin and login buttons have their text changed
		cy.get('#login-btn').should('contain.text', 'Logout');
		cy.get('#breather-link').should('contain.text', 'Take a Breather');
		cy.get('#quote-link').should('contain.text', 'Daily Quote');
		cy.get('#journal-link').should('contain.text', 'Feelings Journal');
	});
})