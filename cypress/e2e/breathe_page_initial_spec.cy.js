describe('Basic Breathe Page Test Cases', () => {
    // Test case: Redirects user to login page if accessing without login
    it('redirects user to login page if accessing without login', () => {
        cy.visit('/breathe');
        cy.url().should('include', '/login');
    });

    beforeEach(() => {
        if (Cypress.currentTest.title !== 'redirects user to login page if accessing without login') {
            cy.visit('/login');
            cy.get('input[name="email"]').type('test@123.com');
            cy.get('input[name="password"]').type('qwerty');
            cy.get('#login-btn').click();
            cy.get('#breather-link').click();
            cy.url().should('include', '/breathe'); 
        }
    });

    // Test case: Successfully loads breathe when logged in
    it('should display the breathe page', () => {
        cy.visit('/breathe');
        cy.url().should('include', '/breathe'); 
        cy.get('#container').should('be.visible');
        cy.get('#text').should('have.text', 'ready?');
        cy.get('.breaths-text').should('be.visible');
    });

    // Test case: Navigate to the home page on clicking logo
    it('should navigate to the home page on clicking logo', () => {
        cy.get('.logoButton').click();
        cy.url().should('include', '/');
    });

    // Test case: Initial mode is 'relax' 
    it("should have an initial mode of 'relax'", () => {
        cy.get('#breathe-types').should('have.value', '1');
    });

    // Test case: Can choose modes between 'relax', 'clarity' and 'energize' 
    it("should be able to choose modes between 'relax', 'clarity' and 'energize' ", () => {
       // Switch to 'Clarity' mode
        cy.get('#breathe-types').select('2');
        cy.get('#breathe-types').should('have.value', '2');
        
        // Switch to 'Energise' mode
        cy.get('#breathe-types').select('3');
        cy.get('#breathe-types').should('have.value', '3');
        
        // Switch back to 'Relax' mode
        cy.get('#breathe-types').select('1');
        cy.get('#breathe-types').should('have.value', '1');
    });

    // Test case: Cannot switch modes during animation
    it("should not be able to switch modes during animation ", () => {
        // Assert that the select element is initially enabled
        cy.get('#breathe-types').should('not.be.disabled');

        // Starts animation
        cy.get('.container').click();
        cy.get('#text').should('have.text', 'starting soon...');

        // Assert that the select element is disabled during the animation
        cy.get('#breathe-types').should('be.disabled');
    });

     // Test case: Can switch modes when animation is paused
     it("should be able to switch modes when animation is paused ", () => {
        // Assert that the select element is initially enabled
        cy.get('#breathe-types').should('not.be.disabled');

        // Starts and pauses animation
        cy.get('.container').click();
        cy.get('#text').should('have.text', 'starting soon...');
        cy.wait(500);
        cy.get('.container').click();
        cy.get('#text').should('have.text', 'Ready to continue?');


        // Assert that the select element is not disabled when animation is paused
        cy.get('#breathe-types').should('not.be.disabled');

        // Switch to 'Clarity' mode
        cy.get('#breathe-types').select('2');
        cy.get('#breathe-types').should('have.value', '2');
        
        // Switch to 'Energise' mode
        cy.get('#breathe-types').select('3');
        cy.get('#breathe-types').should('have.value', '3');
        
        // Switch back to 'Relax' mode
        cy.get('#breathe-types').select('1');
        cy.get('#breathe-types').should('have.value', '1');
    });

    // Test case: Correctly execute buffer period after starting
    it('should execute buffer period after starting', () => {
        // Start the animation
        cy.get('.container').click();

        // Assert initial text
        cy.get('#text').should('have.text', 'starting soon...');

        // Wait for buffer period countdown
        cy.wait(2000);
        cy.get('#text').should('have.text', '3');
        cy.wait(1000);
        cy.get('#text').should('have.text', '2');
        cy.wait(1000);
        cy.get('#text').should('have.text', '1');
        cy.wait(1000);

        // Assert the start of breathe in phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.pointer-container').should('have.css', 'animation').and('not.be.empty');
    });

    // Test case:  Start animation on click of button
    it('should start animation on click of button', () => {
        cy.get('.container').click();
        cy.get('#text').should('have.text', 'starting soon...');
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.pointer-container').should('have.css', 'animation').and('not.be.empty');
    });

    // Test case: Pause the animation when container is clicked again
    it('should pause the animation when container is clicked again', () => {
        cy.get('#container').click();
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.get('#container').click(); // Pause the animation
        cy.get('#text').should('have.text', 'Ready to continue?');
        cy.get('#container').should('not.have.class', 'grow');
    });

    // Test case: Continue the animation when container is clicked again after pausing
    it('should continue the animation when container is clicked again after pausing', () => {
        cy.get('#container').click();
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.get('#container').click(); // Pause the animation
        cy.wait(2000); // Wait for some time while animation is paused
        cy.get('#container').click(); // Unpause the animation
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.get('#text').should('not.have.text', 'Ready to continue?');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.pointer-container').should('have.css', 'animation').and('not.be.empty');
    });

    
    // Test case: Play audio when animation starts and stop it when paused, ensuring the audio restarts after resume
    it('should play audio when animation starts and stop it when paused, ensuring the audio restarts after resume', () => {
        cy.window().then((win) => {
            cy.stub(win.Audio.prototype, 'play').as('audioPlay');
        });

        cy.window().then((win) => {
            cy.stub(win.Audio.prototype, 'pause').as('audioPause');
        });

        cy.window().then((win) => {
            cy.stub(win.Audio.prototype, 'load').as('audioLoad');
        });

        // Start the animation
        cy.get('#container').click();
        cy.wait(1000);

        cy.get('@audioPlay').should('have.been.called');

         // Pause the animation
        cy.get('#container').click();
        cy.wait(500);

        // Assert that the audio play() method has been called
        cy.get('@audioPause').should('have.been.called');
        cy.get('@audioLoad').should('have.been.called');
    });

})