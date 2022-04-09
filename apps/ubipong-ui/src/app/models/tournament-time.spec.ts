import { TournamentTime } from './tournament-time'

describe('tournament time', () => {
  it('should produce the correct displayed value: in the am', () => {
    const tournamentTime = new TournamentTime({hour: 5, minute: 6})
    expect(tournamentTime.display).toBe('5:06am')
  })

  it('should produce the correct displayed value: noon should be pm', () => {
    const tournamentTime = new TournamentTime({hour: 12, minute: 0})
    expect(tournamentTime.display).toBe('12:00pm')
  })

  it('should produce the correct displayed value: in the pm', () => {
    const tournamentTime = new TournamentTime({hour: 13, minute: 50})
    expect(tournamentTime.display).toBe('1:50pm')
  })
})
