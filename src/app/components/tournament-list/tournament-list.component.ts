import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  tournamentList: Tournament[] = [
    {
      name: "Tournament 1",
      tournamentDate: "2019-03-03"
    },
    {
      name: "Tournament 2",
      tournamentDate: "2019-05-04"
    },
  ]
  constructor() { }

  ngOnInit() {
  }

  loadTournamentList() {

  }
}
