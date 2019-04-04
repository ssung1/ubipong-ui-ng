import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { race } from 'q';

@Component({
  selector: 'app-event-player-list',
  templateUrl: './event-player-list.component.html',
  styleUrls: ['./event-player-list.component.scss']
})
export class EventPlayerListComponent implements OnInit {
  playerList: Player[] = [
    {
      name: "spongebob",
      club: "atlantic ocean",
      rating: 123
    }
  ];

  newName = '';
  newClub = '';
  newRating = null;

  constructor() { }

  ngOnInit() {
  }

  addPlayer(name: string) {
    const player = new Player();
    player.name = name;
    this.playerList.push(player);
  }
}
