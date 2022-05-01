import { Player } from "./player";

export class RoundRobinGroup {
  eventId: number;
  groupNumber: number;
  playerList: Player[];

  constructor(eventId: number, groupNumber: number, playerList: Player[]) {
    this.eventId = eventId ?? 0
    this.groupNumber = groupNumber ?? 0
    this.playerList = playerList ?? []
  }
}
