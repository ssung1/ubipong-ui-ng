describe('ubipong-ui-accesory', () => {
  function goToSingleMatchSheet() {
    cy.get('[routerlink="/single-match-sheet"] > .mat-list-item-content').click()
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('can display a (generic) single match sheet (set of 4!)', () => {
    goToSingleMatchSheet()
  })
})
