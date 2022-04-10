import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { Tournament } from '../../models/tournament';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss']
})
export class TournamentPageComponent implements OnInit {

  isLoggedIn = false

  tournamentId: number = NaN
  tournament: Tournament | null = null
  eventList: any[] = []
  isNewEventFormOpen: boolean = false
  
  inputNewName = new FormControl('', [Validators.required, Validators.maxLength(60)])
  inputNewChallongeUrl = new FormControl('', [Validators.required])
  inputNewStartTime = new FormControl()

  // cannot use `get timeOptionList()`.  not sure why yet, but material does not like it
  // when used as mat-option inside a mat-select
  readonly timeOptionList = Object.freeze([
    {hour: 8, minute: 0, display: "8:00am"},
    {hour: 9, minute: 0, display: "9:00am"},
    {hour: 10, minute: 0, display: "10:00am"},
    {hour: 11, minute: 0, display: "11:00am"},
    {hour: 12, minute: 0, display: "12:00pm"},
    {hour: 13, minute: 0, display: "1:00pm"},
    {hour: 14, minute: 0, display: "2:00pm"},
    {hour: 15, minute: 0, display: "3:00pm"},
    {hour: 16, minute: 0, display: "4:00pm"},
    {hour: 17, minute: 0, display: "5:00pm"},
  ])

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.refreshUser()
    const tournamentIdParam = this.route.snapshot.queryParamMap.get('tournamentId')
    this.tournamentId = Number(tournamentIdParam)
    if (!tournamentIdParam || isNaN(this.tournamentId)) {
      this.router.navigate(['/dashboard'])
    } else {
      this.refreshData()
    }
  }

  refreshData() {
    this.tournamentService.getTournamentById(this.tournamentId)
      .subscribe(tournament => {
        this.tournament = tournament
      }, error => {
        this.snackBar.open(`Cound not get tournament info: ${error.message}`, 'Ok')
      })

    this.tournamentService.getEventList(this.tournamentId)
      .subscribe(eventList => {
        this.eventList = eventList
      }, error => {
        this.snackBar.open(`Cound not get event list: ${error.message}`, 'Ok')
      })
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

  get inputNewChallongeUrlErrorMessage() {
    if (this.inputNewChallongeUrl.hasError('required')) {
      return 'Must have challonge.com URL'
    }
    return JSON.stringify(this.inputNewChallongeUrl.errors)
  }

  get isNewEventFormInvalid() {
    return this.inputNewName.invalid ||
      this.inputNewChallongeUrl.invalid
  }

  get hasEvents() {
    return this.eventList.length > 0
  }

  addEvent() {
    // offset in milliseconds for easy conversion
    const offset = new Date().getTimezoneOffset() * 60 * 1000
    // set clock to local time
    const tournamentDate = new Date(new Date(this.tournament.tournamentDate).getTime() + offset)
    // so that we can use setHours to get the right hours
    tournamentDate.setHours(this.inputNewStartTime.value?.hour,
      this.inputNewStartTime.value?.minute, 0)

    this.tournamentService
      .addEvent({
        tournamentId: this.tournamentId,
        name: this.inputNewName.value,
        challongeUrl: this.inputNewChallongeUrl.value,
        startTime: tournamentDate.toJSON(),
      })
      .pipe(map(() => this.refreshData()))
      .subscribe(() => {
      }, error => {
        this.snackBar.open(`System error: ${error.message}`, "Ok", {duration: 2000})
      });
  }

  toggleNewEventForm() {
    this.isNewEventFormOpen = !this.isNewEventFormOpen;
  }

  navigateToRoundRobinPage() {
    this.router.navigate(['/rr-grid'], {
      queryParams: {
        eventIdList: JSON.stringify(this.eventList.map(event => event.id))
      }
    })
  }

  /**
   * this "event" here is the tournament event, not
   * the angular/javascript "event"
   */
  navigateToRoundRobinMatchSheet(event: any) {
    this.router.navigate(['/rr-match-sheet'], {
      queryParams: {
        eventId: event.id
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  navigateToEventPage(event: any) {
    this.router.navigate(['/event-page'], {
      queryParams: {
        eventId: event.id
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  refreshUser() {
    this.userService.isLoggedIn().then(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  get isReadyForEditing() {
    return this.tournament && this.isLoggedIn
  }
}
