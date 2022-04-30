import {Links} from "./links"

export type Tournament = {
  id: number
  name: string
  tournamentDate: string
  _links: Links | null
}
