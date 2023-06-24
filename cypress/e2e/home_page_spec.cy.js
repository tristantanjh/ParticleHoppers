describe('Homepage', () => {
  it('successfully loads homepage', () => {
    cy.visit('/');
  })

  beforeEach(() => {
    cy.visit('/');
  })

  it('should navigate to the login page from the first button', () => {
    cy.get('#login-btn').click();
    cy.url().should('include', '/login');
  })

  it('should navigate to the login page from the second button', () => {
    cy.get('#begin-btn').click(); 
    cy.url().should('include', '/login');
  });

  it('should navigate to the mission section on homepage from top navbar', () => {
    cy.get('.mission-topnav').click();
    cy.url().should('include', '#mission');
  });

  it('should navigate to the top of homepage from bottom navbar', () => {
    cy.get('.home-botnav').click();
    cy.url().should('include', '#main');
  });

  it('should navigate to the mission section on homepage from bottom navbar', () => {
    cy.get('.mission-botnav').click();
    cy.url().should('include', '#mission');
  });

  it('should navigate to the about page from bottom navbar', () => {
    cy.get('.about-botnav').click();
    cy.url().should('include', '/about');
  });
})