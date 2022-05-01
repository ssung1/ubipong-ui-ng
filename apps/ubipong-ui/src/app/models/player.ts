export class Player {
  name: string
  club: string
  rating: number

  constructor(name: string, club: string, rating: number) {
    this.name = name ?? ''
    this.club = club ?? ''
    this.rating = rating ?? 0
  }
}
