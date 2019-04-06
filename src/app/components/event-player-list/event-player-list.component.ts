import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-player-list',
  templateUrl: './event-player-list.component.html',
  styleUrls: ['./event-player-list.component.scss']
})
export class EventPlayerListComponent implements OnInit {
  playerList: Player[] = [];

  newName = '';
  newClub = '';
  newRating = null;

  constructor() { }

  ngOnInit() {
  }

  addPlayer() {
    const player = new Player();
    player.name = this.newName;
    player.club = this.newClub;
    player.rating = this.newRating;
    this.playerList.push(player);

    this.newName = '';
    this.newClub = '';
    this.newRating = null;
  }

  deletePlayer(index: number) {
    this.playerList.splice(index, 1);
  }
}
