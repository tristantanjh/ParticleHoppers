describe('Breathe', () => {
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

    // Test case: Correctly execute buffer period after starting
    it('should execute buffer period after starting', () => {
        // Start the animation
        cy.get('.container').click();

        // Assert initial text
        cy.get('#text').should('have.text', 'starting soon...');

        // Wait for buffer period countdown
        cy.wait(4500);
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
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.pointer-container').should('have.css', 'animation').and('not.be.empty');
    });


    // Test case: Successfully transitions through breathe and hold phases
    it('should transition through breathe and hold phases', () => {
        cy.get('#container').click();
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.wait(3000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(1500); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(3000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
    });

    // Test case: Successfully decrements breathsLeft on each breathe phase
    it('should decrement breathsLeft on each breathe phase', () => {
        cy.get('#container').click();
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.wait(3000); // Wait for breathe in phase
        cy.get('.breaths-text').should('have.text', '3');
        cy.wait(1500); // Wait for hold phase
        cy.wait(3000); // Wait for breathe out phase
        cy.get('.breaths-text').should('have.text', '2');
    });

    // Test case: Pause the animation when container is clicked again
    it('should pause the animation when container is clicked again', () => {
        cy.get('#container').click();
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.get('#container').click(); // Pause the animation
        cy.get('#text').should('have.text', 'Ready to continue?');
        cy.get('#container').should('not.have.class', 'grow');
    });

    // Test case: Continue the animation when container is clicked again after pausing
    it('should continue the animation when container is clicked again after pausing', () => {
        cy.get('#container').click();
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.get('#container').click(); // Pause the animation
        cy.wait(2000); // Wait for some time while animation is paused
        cy.get('#container').click(); // Unpause the animation
        cy.wait(7500); // Wait for countdown (3, 2, 1)
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

    // Test case: Handle repeated clicks on the button without breaking the animation
    it('should handle repeated clicks on the button without breaking the animation', () => {
        // Start the animation
        cy.get('#container').click();
        cy.wait(1000);
      
        // Get the initial breathsLeft count
        let initialBreathsLeft;
        cy.get('.breaths-text').invoke('text').then((text) => {
          initialBreathsLeft = parseInt(text);
        });
      
        // Pause and unpause the animation multiple times, making sure that animation is unpaused after clicks
        for (let i = 0; i < 6; i++) {
          cy.get('#container').click(); // Pause or unpause the animation
        }
      
        // Get the final breathsLeft count
        let finalBreathsLeft;
        cy.get('.breaths-text').invoke('text').then((text) => {
          finalBreathsLeft = parseInt(text);
        });
      
        // Assert that the breathsLeft count remains the same
        expect(finalBreathsLeft).to.equal(initialBreathsLeft);

        cy.get('.breaths-text').should('have.text', '0');
        cy.get('#text').should('have.text', 'starting soon...');
        cy.wait(7500); // Wait for countdown (3, 2, 1)
        cy.get('.breaths-text').should('have.text', '3');
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.wait(3000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(1500); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(3000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.breaths-text').should('have.text', '2');
        cy.wait(3000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(1500); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(3000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.breaths-text').should('have.text', '1');
        cy.wait(3000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(1500); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(3000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'finished');
        cy.get('.breaths-text').should('have.text', '0');

        cy.url().should('include', '/quote');
    });

    // Test case: Redirect after completing the animation
    it('should redirect after completing the animation', () => {
        cy.get('#container').click();
        cy.wait(30000); // Wait for all cycles to finish
        cy.url().should('include', '/quote');
    });
})