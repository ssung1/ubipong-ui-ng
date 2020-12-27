/// <reference types="cypress"/>

import { getGreeting } from '../support/app.po'

describe('ubipong-ui', () => {
  // Tournament Setup:
  //
  // Bikini Bottom Open 2019       Jun 23, 2019
  // Event: Preliminary Group 1 (bb_201906_pg_rr_1)
  // Players: spongebob, patrick, and squidward
  // Scores:
  // spongebob vs patrick: patrick wins 3 5 1
  // spongebob vs squidward: spongebob wins 13 -5 9 9
  // patrick vs squidward: patrick wins 3 3 3
  
  const bikiniBottomOpen = {
    name: 'Bikini Bottom Open 2019',
    tournamentDate: '2019-06-23T00:00:00-05:00'
  }

  const preliminaryGroup1 = {
    name: "Preliminary Group 1",
    challongeUrl: "bb_201906_pg_rr_1"
  }

  const spongebob = {
    name: 'spongebob'
  }
  const patrick = {
    name: 'patrick'
  }
  const squidward = {
    name: 'squidward'
  }

  const patrickVsSquidward = {
    player1Name: 'patrick',
    player2Name: 'squidward',
    scores: '11-3,11-3,11-3',
    winner: 'patrick'
  }
  const spongbobVsPatrick = {
    player1Name: 'spongebob',
    player2Name: 'patrick',
    scores: '11-3,11-5,11-1',
    winner: 'spongebob'
  }
  const squidwardVsSpongebob = {
    player1Name: 'squidward',
    player2Name: 'spongebob',
    scores: '11-13,11-5,9-11,9-11',
    winner: 'spongebob'
  }

  function addTournament(tournament) {
    cy.get('nav a[href="dashboard"]').click()
    cy.get('#accordion-add-tournament').click()
    cy.get('#input-new-name').type(tournament.name)
    cy.get('#input-new-tournament-date').type(tournament.tournamentDate)
    cy.get('#button-add-tournament').click()
  }

  function addEvent(event) {
    cy.get('p').click()
    cy.get('#input-new-name').type(event.name)
    cy.get('#input-new-challonge-url').type(event.challongeUrl)
    cy.get('#button-add-event').click()
  }

  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to ubipong-ui!')
  })

  it('should run a tournament', () => {
    addTournament(bikiniBottomOpen)
    cy.contains('.tournament-name', bikiniBottomOpen.name).click()
    addEvent(preliminaryGroup1)

    // TODO: add players
    // TODO: start tournament (on challonge.com)
    //   const response = await superagent.get('https://example.com')
    //   expect(response.status).equal(200)

    // get match sheet (by tournament/event -- ui selection would be best)
    // cy.get(':nth-child(2) > a').click()
    // cheating a little to get match sheet -- fix later
    cy.visit('/rr-match-sheet?eventName=bb_201906_pg_rr_1')
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
