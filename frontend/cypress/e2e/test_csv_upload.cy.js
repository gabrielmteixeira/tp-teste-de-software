describe('CSV Upload', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr', 'portrait');
    cy.visit('/');
    cy.get('[data-cy="email"]').type('dan@gg.com');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/home');
  });

  const testUpload = (menuHref, urlPart) => {
    cy.get(`[href="${menuHref}"]`).click();
    cy.url().should('include', urlPart);

    cy.window().then(w => w.beforeReload = true)
    cy.window().should('have.prop', 'beforeReload', true);

    cy.get('[data-cy="file-upload"]').invoke('removeAttr', 'style').selectFile('cypress/fixtures/teste.csv', );
    cy.get('[data-cy="submit-upload"]').click();

    cy.get('.go2072408551').as('successToast').should('be.visible')
    cy.get('@successToast').should('contain', 'Arquivo recebido com sucesso');

    cy.window().should('not.have.prop', 'beforeReload');
  };

  it('Incomes Upload', function () {
    testUpload('/rendas', '/rendas');
  });

  it('Expenses Upload', function () {
    testUpload('/despesas', '/despesas');
  });
});
