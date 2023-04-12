/// <reference types="cypress" />
// ↑ = @types/cypress.d.ts 를 가져오는것과 같다
import '@testing-library/cypress/add-commands';

describe('Youtube App', () => {
  beforeEach(() => {
    // intercept = url요청을 우리가 설정한 값으로 대체 해줌
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'hotTrend.json',
    });
    cy.intercept('GET', /(search)/g, {
      fixture: 'search.json',
    });
    cy.viewport('macbook-16');
    cy.visit('/');
  });

  it('renders Logo text', () => {
    cy.findByText('Youtube').should('exist');
  });

  it('shows popular video first', () => {
    cy.findByText('hotTrend video').should('exist');
  });

  it('searchs by query', () => {
    cy.findByPlaceholderText('Search').type('bts');
    cy.findByRole('button').click();
    cy.findByText('Search result1').should('exist');
  });

  it('goes to detail page', () => {
    cy.findAllByRole('listitem').first().findByRole('img').click();
    cy.findByTitle('hotTrend video').should('exist');
    cy.findByText('hotTrend video').should('exist');
    cy.findByText('Search result1').should('exist');
  });
});
