import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Tournament } from '../../models/tournament';
import { TournamentService } from '../../services/tournament.service';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  isNewTournamentFormOpen = false;
  errorMessage: string = null;

  requiredForm: FormGroup

  inputNewName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputNewTournamentDate = new FormControl('', [Validators.required])

  tournamentList: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.resetInputNewTournament();
    this.refreshTournamentList();
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
      this.errorMessage = error.message;
    });
  }

  toggleNewTournamentForm() {
    this.isNewTournamentFormOpen = !this.isNewTournamentFormOpen;
    this.errorMessage = null;
  }

  private resetInputNewTournament() {
    this.errorMessage = null;
  }

  hasError() {
    return this.errorMessage !== null;
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
      this.errorMessage = "System error: " + error.message;
    });
  }

  navigateToTournamentDetails(tourament: Tournament) {
    this.router.navigate(['tournament-page'], {
      queryParams: {
        tournamentId: tourament.id,
      },
    })
    .catch((error) => {
      this.errorMessage = "Fatal error: " + error.message;
    });
  }
}
