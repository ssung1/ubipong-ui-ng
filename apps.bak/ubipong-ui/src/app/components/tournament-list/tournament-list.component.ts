import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from '../../models/tournament';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  @Output('viewTournamentPage')
  viewTournamentPageEventEmitter: EventEmitter<number> = new EventEmitter<number>()

  @Input()
  tournamentList: Tournament[] = [];

  constructor(
  ) {
  }

  ngOnInit() {
  }

  viewTournamentPage(tournament: Tournament) {
    this.viewTournamentPageEventEmitter.emit(tournament.id)
  }
}
