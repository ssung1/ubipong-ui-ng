export class TournamentTime {
  readonly hour: number
  readonly minute: number

  constructor({hour, minute}: {hour: number; minute: number}) {
    this.hour = hour
    this.minute = minute
  }

  get display() {
    const minute = String(this.minute).padStart(2, '0')
    const ampm = this.hour < 12 ? 'am' : 'pm'
    if (this.hour <= 12) {
      return `${this.hour}:${minute}${ampm}`
    } else {
      return `${this.hour - 12}:${minute}${ampm}`
    }
  }
}
