import { EventStatus } from './event-status'

export type TournamentEvent = {
  readonly id: number
  readonly tournamentId: number
  readonly name: string
  readonly challongeUrl: string
  readonly status: EventStatus
  readonly startTime: string
}
