import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../models/tournament';
import { Validators, FormControl } from '@angular/forms'
import { TournamentService } from '../../services/tournament.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isNewTournamentFormOpen = false;
  isLoggedIn = false;

  inputNewName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputNewTournamentDate = new FormControl('', [Validators.required])

  tournamentList: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.refreshUser()
    this.refreshTournamentList()
    this.resetInputNewTournament()
  }

  get inputNewNameErrorMessage() {
    if (this.inputNewName.hasError('required')) {
      return 'Name cannot be empty';
    }
    if (this.inputNewName.hasError('maxlength')) {
      return 'Name is too long';
    }
    return JSON.stringify(this.inputNewName.errors);
  }

  get inputNewTournamentDateErrorMessage() {
    if (this.inputNewTournamentDate.hasError('required')) {
      return 'Must have tournament date';
    }
    return JSON.stringify(this.inputNewTournamentDate.errors);
  }

  get isNewTournamentFormInvalid() {
    return this.inputNewName.invalid ||
        this.inputNewTournamentDate.invalid
  }

  refreshTournamentList() {
    this.tournamentService.getTournamentList().subscribe(response => {
      this.tournamentList = response['_embedded']['tournaments'];
    }, error => {
      this.snackBar.open(`System error: ${error.message}`, "Ok", {duration: 2000})
    });
  }

  toggleNewTournamentForm() {
    this.isNewTournamentFormOpen = !this.isNewTournamentFormOpen;
  }

  private resetInputNewTournament() {
    this.inputNewName.reset()
    this.inputNewTournamentDate.reset()
  }

  addTournament() {
    const newTournament: Tournament = {
      id: 0,
      name: this.inputNewName.value,
      tournamentDate: this.inputNewTournamentDate.value,
      _links: null
    };

    const response = this.tournamentService.addTournament(newTournament);
    response.subscribe(addedTournament => {
      this.tournamentList.push(addedTournament);
      this.resetInputNewTournament();
    }, error => {
      this.snackBar.open(`System error: ${error.message}`, "Ok", {duration: 2000})
    });
  }

  navigateToTournamentPage(touramentId: number) {
    this.router.navigate(['tournament-page'], {
      queryParams: {
        tournamentId: touramentId,
      },
    })
    .catch((error) => {
      this.snackBar.open(`System error: ${error.message}`, "Ok", {duration: 2000})
    });
  }

  refreshUser() {
    this.userService.isLoggedIn().then(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }
}
