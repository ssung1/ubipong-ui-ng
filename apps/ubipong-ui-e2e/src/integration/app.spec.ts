import { getGreeting } from '../support/app.po'

describe('ubipong-ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to ubipong-ui!')
  })

  it('should run a tournament', () => {
    // TODO: add tournament
    // cy.get('nav .tournament-list')
    // TODO: add event
    // TODO: add players
    // TODO: start tournament (on challonge.com)
    //   const response = await superagent.get('https://example.com')
    //   expect(response.status).equal(200)

    // get match sheet (by tournament/event -- ui selection would be best)
    cy.get(':nth-child(2) > a').click()
    // cheating a little to get match sheet -- fix later
    cy.visit('/#rr-match-sheet?eventName=bb_201906_pg_rr_1')
    cy.reload(true)
    cy.get('#round-robin-match-sheet').click()

    cy.get('table > :nth-child(1) > :nth-child(3)').contains('Game 1')
    // just trying a different way to verify text
    cy.get('table > :nth-child(1) > :nth-child(4)').should('have.text', 'Game 2')
    cy.get('table > :nth-child(2) > :nth-child(1)').should('have.text', 'B')
    cy.get('table > :nth-child(2) > :nth-child(2)').should('have.text', 'patrick')
    cy.get(':nth-child(3) > :nth-child(1)').should('have.text', 'C')
    cy.get(':nth-child(3) > :nth-child(2)').should('have.text', 'squidward')
    cy.get(':nth-child(5) > :nth-child(1)').should('have.text', 'A')
    cy.get(':nth-child(5) > :nth-child(2)').should('have.text', 'spongebob')

    // TODO: enter some scores
    // TODO: view scores (by tournament)
    // TODO: get tournament result
  })
})
