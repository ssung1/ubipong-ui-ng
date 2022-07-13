import { Links } from "./links"

export type Tournament  = {
  readonly id: number
  readonly name: string
  readonly tournamentDate: string
  readonly _links: Links | null
}
