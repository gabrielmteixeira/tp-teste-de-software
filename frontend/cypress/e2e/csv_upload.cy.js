describe('CSV Upload', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr', 'portrait');
    cy.visit('/');
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/home');
  });

  // Função auxiliar para testar o upload de arquivos
  const testUpload = (menuHref, urlPart) => {
    cy.get(`[href="${menuHref}"]`).click();
    cy.url().should('include', urlPart);

    cy.window().then(w => w.beforeReload = true)
    cy.window().should('have.prop', 'beforeReload', true);

    // Substitua '.w-24' por um seletor mais específico e estável
    cy.get('[data-cy="file-upload"]').selectFile('cypress/fixtures/teste.csv');
    cy.get('[data-cy="submit-upload"]').click();

    // Esperar pela mensagem de sucesso, em vez de usar cy.wait
    cy.get('[data-cy="success-toast"]').should('be.visible').and('contain', 'Arquivo recebido com sucesso');

    cy.window().should('not.have.prop', 'beforeReload');
  };

  it('Incomes Upload', function () {
    testUpload('/rendas', '/rendas');
  });

  it('Expenses Upload', function () {
    testUpload('/despesas', '/despesas');
  });
});
