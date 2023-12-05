describe('Registration and Login', () => {
  const userEmail = 'pds@gg.com';
  const userPassword = 'c@mpt4caO';
  const userName = 'Prática em Desenvolvimento';

  beforeEach(() => {
    cy.viewport('iphone-xr', 'portrait');
  });

  const registerUser = () => {
    cy.visit('/cadastro');
    cy.get('[data-cy="name"]').type(userName);
    cy.get('[data-cy="email"]').type(userEmail);
    cy.get('[data-cy="password"]').type(userPassword);
    cy.get('[data-cy="submit"]').click();
  };

  const loginUser = () => {
    cy.visit('/');
    cy.get('[data-cy="email"]').type(userEmail);
    cy.get('[data-cy="password"]').type(userPassword);
    cy.get('[data-cy="submit"]').click();
  };

  it('Register new user', () => {
    registerUser();
    cy.get('.go2072408551').as('successToast').should('be.visible')
    cy.get('@successToast').should('contain', 'Cadastro realizado com sucesso!');
  });

  it('New user should login', () => {
    loginUser();
    cy.url().should('include', '/home');
    cy.get('[data-cy="profile-picture"]').click();
    cy.url().should('include', '/perfil');
    cy.get('[data-cy="name"]').should('contain', userName);
    cy.get('[data-cy="email"]').should('contain', userEmail);
  });
});
