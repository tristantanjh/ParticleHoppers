describe("'Relax' Mode for Breathe Page", () => {
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

    // Test case: Mode is 'relax' 
    it("should have a mode of 'relax'", () => {
        cy.get('#breathe-types').should('have.value', '1');
    });

    // Test case: Successfully transitions through breathe and hold phases
    it('should transition through breathe and hold phases', () => {
        cy.get('#container').click();
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.wait(4000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(7000); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(8000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
    });

    // Test case: Successfully decrements breathsLeft on each breathe phase
    it('should decrement breathsLeft on each breathe phase', () => {
        cy.get('#container').click();
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.wait(4000); // Wait for breathe in phase
        cy.get('.breaths-text').should('have.text', '3');
        cy.wait(7000); // Wait for hold phase
        cy.wait(8000); // Wait for breathe out phase
        cy.get('.breaths-text').should('have.text', '2');
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
        cy.wait(5000); // Wait for countdown (3, 2, 1)
        cy.get('.breaths-text').should('have.text', '3');
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.wait(4000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(7000); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(8000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.breaths-text').should('have.text', '2');
        cy.wait(4000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(7000); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(8000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'Breathe In!');
        cy.get('#container').should('have.class', 'grow');
        cy.get('.breaths-text').should('have.text', '1');
        cy.wait(4000); // Wait for breathe in phase
        cy.get('#text').should('have.text', 'Hold');
        cy.wait(7000); // Wait for hold phase
        cy.get('#text').should('have.text', 'Breathe Out!');
        cy.get('#container').should('have.class', 'shrink');
        cy.wait(8000); // Wait for breathe out phase
        cy.get('#text').should('have.text', 'finished');
        cy.get('.breaths-text').should('have.text', '0');
        cy.wait(3000); // Wait for 'finished' text
        cy.url().should('include', '/quote');
    });

    // Test case: Redirect after completing the animation
    it('should redirect after completing the animation', () => {
        cy.get('#container').click();
        cy.wait(65000); // Wait for all cycles to finish
        cy.url().should('include', '/quote');
    });
});