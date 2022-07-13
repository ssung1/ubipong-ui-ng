import { EventTime } from './tournament-time'

describe('tournament time', () => {
  it('should produce the correct displayed value: in the am', () => {
    const eventTime = new EventTime({hour: 5, minute: 6})
    expect(eventTime.display).toBe('5:06am')
  })

  it('should produce the correct displayed value: noon should be pm', () => {
    const eventTime = new EventTime({hour: 12, minute: 0})
    expect(eventTime.display).toBe('12:00pm')
  })

  it('should produce the correct displayed value: in the pm', () => {
    const eventTime = new EventTime({hour: 13, minute: 50})
    expect(eventTime.display).toBe('1:50pm')
  })
})
