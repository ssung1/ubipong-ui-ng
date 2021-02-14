/// <reference types="cypress"/>

import { getGreeting } from '../support/app.po'
import { environment } from '../config/environment'
import 'cypress-wait-until'
import { Util } from '../support/util'

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
  
  const eventContext = '/rest/v0/events'

  const bikiniBottomOpenBase = {
    name: 'Bikini Bottom Open 2019',
    tournamentDate: '2019-06-23T00:00:00-05:00'
  }

  let bikiniBottomOpen

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

  function deleteChallongeTournament(challongeUrl) {
    cy.request({
      method: 'DELETE',
      url: `${environment.challongeHost}/v1/tournaments/${challongeUrl}.json`,
      qs: {
        api_key: environment.challongeApiKey
      },
      failOnStatusCode: false,
    })
  }

  function goToDashboard() {
    cy.get('[routerlink="/dashboard"] > .mat-list-item-content').click()
  }

  function addTournament(tournament: any) {
    goToDashboard()
    cy.get('#accordion-add-tournament').click()
    cy.get('#input-new-name').type(tournament.name)
    cy.get('#input-new-tournament-date').type(tournament.tournamentDate)
    cy.get('#button-add-tournament').click()
  }

  function goToTournamentFromDashboard(tournamentName) {
    cy.contains('.tournament-name', tournamentName).click()
  }

  function addEvent(event: any) {
    cy.get('#accordion-add-event').click()
    cy.get('#input-new-name').type(event.name)
    cy.get('#input-new-challonge-url').type(event.challongeUrl)
    cy.get('#button-add-event').click()
  }

  function addPlayerList(players, challongeUrl: string) {
    const url = new URL(
      `v1/tournaments/${challongeUrl}/participants/bulk_add.json`,
      environment.challongeHost)

    cy.waitUntil(() => {
      return cy.request({
        method: 'POST',
        url: url.toString(),
        qs: {
          api_key: environment.challongeApiKey
        },
        body: {
          participants: players
        },
        failOnStatusCode: false
      }).then(response => response.status == 200)
    },
    {
      timeout: 15000,
      interval: 5000
    })
  }

  function startEvent(challongeUrl) {
    const url = new URL(
      `v1/tournaments/${challongeUrl}/start.json`,
      environment.challongeHost)

    return cy.request({
      method: 'POST',
      url: url.toString(),
      qs: {
        api_key: environment.challongeApiKey
      }
    })
  }

  function goToRoundRobinMatchSheet(eventName) {
    const event = cy.contains('.event', eventName)
    event.get('.button-round-robin-match-sheet').click()
  }

  function getEventMatchList(challongeUrl) {
    const url = new URL(
      `${eventContext}/${challongeUrl}/roundRobinMatchList`,
      environment.apiHost)
    
    return cy.request(url.toString()).then(response => response.body)
  }

  // find the correct ID of the match we want from matchList
  // then submit score
  function submitMatchResult(match, challongeUrl) {
    // get the entire list
    const matchListChainable = getEventMatchList(challongeUrl)

    matchListChainable.then(matchList => {
      // find the match for which we want to submit the scores
      const thisMatchFromList = matchList.find(m => {
        return m.player1Name == match.player1Name
          && m.player2Name == match.player2Name
      })

      // need to get the ID for the winner
      function getWinnerId() {
        if (thisMatchFromList.player1Name == match.winner) {
          return thisMatchFromList.player1Id
        } else {
          return thisMatchFromList.player2Id
        }
      }

      const url = new URL(
        `v1/tournaments/${challongeUrl}/matches/${thisMatchFromList.matchId}.json`,
        environment.challongeHost)
      const response = cy.request({
        method: 'PUT',
        url: url.toString(),
        qs: {
          api_key: environment.challongeApiKey
        },
        body: {
          match: {
            scores_csv: match.scores,
            winner_id: getWinnerId()
          }
        }
      })
    })
  }

  beforeEach(() => {
    deleteChallongeTournament(preliminaryGroup1.challongeUrl)
    bikiniBottomOpen = {
      ...bikiniBottomOpenBase,
      name: bikiniBottomOpenBase.name + Util.uuidv4()
    }
    cy.visit('/')
  })

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Ubipong Tournament Manager')
  })

  it('should run a tournament', () => {
    addTournament(bikiniBottomOpen)
    goToTournamentFromDashboard(bikiniBottomOpen.name)
    addEvent(preliminaryGroup1)
    addPlayerList([spongebob, patrick, squidward],
      preliminaryGroup1.challongeUrl)
    startEvent(preliminaryGroup1.challongeUrl)
    goToRoundRobinMatchSheet(preliminaryGroup1.name)
    cy.get('h2').should('have.text', preliminaryGroup1.name)
    cy.get('table > :nth-child(1) > :nth-child(3)').contains('Game 1')
    // just trying a different way to verify text
    cy.get('table > :nth-child(1) > :nth-child(4)').should('have.text', 'Game 2')
    cy.get('table > :nth-child(2) > :nth-child(1)').should('have.text', 'B')
    cy.get('table > :nth-child(2) > :nth-child(2)').should('have.text', 'patrick')
    cy.get('table > :nth-child(3) > :nth-child(1)').should('have.text', 'C')
    cy.get('table > :nth-child(3) > :nth-child(2)').should('have.text', 'squidward')
    cy.get('table > :nth-child(5) > :nth-child(1)').should('have.text', 'A')
    cy.get('table > :nth-child(5) > :nth-child(2)').should('have.text', 'spongebob')

    // submit some scores
    submitMatchResult(spongbobVsPatrick, preliminaryGroup1.challongeUrl)
    submitMatchResult(patrickVsSquidward, preliminaryGroup1.challongeUrl)
    submitMatchResult(squidwardVsSpongebob, preliminaryGroup1.challongeUrl)

    // view scores (by tournament)
    cy.visit('/')
    goToDashboard()
    goToTournamentFromDashboard(bikiniBottomOpen.name)
    cy.contains('#view-round-robin-page', 'View Round Robin').click()
    cy.get('h2').should('have.text', preliminaryGroup1.name)
    cy.get('table > :nth-child(1) > :nth-child(3)').should('have.text', ' A ')
    cy.get('table > :nth-child(1) > :nth-child(4)').should('have.text', ' B ')
    cy.get('table > :nth-child(1) > :nth-child(5)').should('have.text', ' C ')
    cy.get('table > :nth-child(2) > :nth-child(1)').should('have.text', ' A ')
    cy.get('table > :nth-child(2) > :nth-child(2)').should('have.text', ' spongebob ')
    cy.get('table > :nth-child(2) > :nth-child(4)').should('have.text', ' W 3 5 1 ')
    cy.get('table > :nth-child(2) > :nth-child(5)').should('have.text', ' W 11 -5 9 9 ')
    cy.get('table > :nth-child(3) > :nth-child(1)').should('have.text', ' B ')
    cy.get('table > :nth-child(3) > :nth-child(2)').should('have.text', ' patrick ')
    cy.get('table > :nth-child(3) > :nth-child(3)').should('have.text', ' L -3 -5 -1 ')
    cy.get('table > :nth-child(3) > :nth-child(5)').should('have.text', ' W 3 3 3 ')
    cy.get('table > :nth-child(4) > :nth-child(1)').should('have.text', ' C ')
    cy.get('table > :nth-child(4) > :nth-child(2)').should('have.text', ' squidward ')
    cy.get('table > :nth-child(4) > :nth-child(3)').should('have.text', ' L -11 5 -9 -9 ')
    cy.get('table > :nth-child(4) > :nth-child(4)').should('have.text', ' L -3 -3 -3 ')

    // TODO: get tournament result
  })
})
