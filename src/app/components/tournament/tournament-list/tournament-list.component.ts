import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentService } from 'src/app/services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  isNewTournamentFormOpen = false;
  inputNewName: string = null;
  inputNewTournamentDate: string = null;
  errorMessage: string = null;
  
  tournamentList: Tournament[] = [
  ];

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetInputNewTournament();
    this.refreshTournamentList();
  }

  refreshTournamentList() {
    this.tournamentService.getTournamentList().subscribe(response => {
      this.tournamentList = response['_embedded']['tournaments'];
    }, error => {
      this.errorMessage = error;
    });
  }

  toggleNewTournamentForm() {
    this.isNewTournamentFormOpen = !this.isNewTournamentFormOpen;
    this.errorMessage = null;
  }

  private resetInputNewTournament() {
    this.inputNewName = null;
    this.inputNewTournamentDate = null;
    this.errorMessage = null;
  }

  hasError() {
    return this.errorMessage !== null;
  }

  addTournament() {
    const newTournament: Tournament = {
      name: this.inputNewName,
      tournamentDate: this.inputNewTournamentDate,
      _links: null
    };

    const response = this.tournamentService.addTournament(newTournament);
    response.subscribe(addedTournament => {
      this.tournamentList.push(addedTournament);
      this.resetInputNewTournament();
    }, error => {
      this.errorMessage = "System error: " + error.message;
    });
  }
}
