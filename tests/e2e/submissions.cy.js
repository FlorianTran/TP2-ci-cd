/* global cy */

describe('Tests E2E - Soumissions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('devrait afficher le formulaire de soumission', () => {
    cy.get('h1').should('contain', 'TP CI/CD - Formulaire de soumission');
    cy.get('#name').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Soumettre');
  });

  it('devrait soumettre un formulaire valide', () => {
    const testName = 'Test User E2E';
    const testEmail = 'test.e2e@example.com';

    cy.get('#name').type(testName);
    cy.get('#email').type(testEmail);
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('contain', 'Soumission enregistrée avec succès');
    
    // Vérifier que le formulaire est réinitialisé
    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
  });

  it('devrait afficher une erreur pour un email invalide', () => {
    cy.get('#name').type('Test User');
    cy.get('#email').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'L\'email n\'est pas valide');
  });

  it('devrait afficher une erreur pour des champs vides', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Le nom est requis');
    cy.get('.error').should('contain', 'L\'email est requis');
  });

  it('devrait naviguer vers la page des soumissions', () => {
    cy.get('a[href="/submissions"]').should('have.attr', 'href', '/submissions');
    // On ne visite plus la page car c'est du JSON
    cy.request('/submissions').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('devrait afficher les soumissions existantes', () => {
    cy.request('/submissions').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
}); 