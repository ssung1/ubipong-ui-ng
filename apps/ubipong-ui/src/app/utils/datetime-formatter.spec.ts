import { formatTime } from './datetime-formatter'

describe('DatetimeFormatter', () => {
  it('should format time, displaying 12-hour format and minute', () => {
    expect(formatTime('2022-03-05T12:30:12')).toEqual('12:30')
  })
})
