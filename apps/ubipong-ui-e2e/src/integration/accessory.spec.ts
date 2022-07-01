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
    cy.get('.eventName')
    cy.get('.roundName')
    cy.get('.playerName').should('have.length.gt', 1)
    cy.get('.score').should('have.length.gt', 1)
  })
})
