import { menuSingleMatchSheet } from '../support/menu.po'

describe('ubipong-ui-accesory', () => {
  function goToSingleMatchSheet() {
    cy.get(menuSingleMatchSheet).click()
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('can display a (generic) single match sheet (set of 4!)', () => {
    goToSingleMatchSheet()
    cy.get('.event-name').should('have.length', 4)
    cy.get('.round-name').should('have.length', 4)
    cy.get('.player-name').should('have.length', 8)
    cy.get('.score').should('have.length.gte', 16)
  })
})
