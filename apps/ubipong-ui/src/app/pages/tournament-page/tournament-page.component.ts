import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ubipong-ui-ng-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss']
})
export class TournamentPageComponent implements OnInit {

  tournamentId: number = NaN
  eventList: any[] = []
  isNewEventFormOpen: boolean = false
  errorMessage: string | null = ""
  
  inputNewName = new FormControl('', null)
  inputNewChallongeUrl = new FormControl('', null)

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const tournamentIdParam = this.route.snapshot.queryParamMap.get('tournamentId')
    this.tournamentId = Number(tournamentIdParam)
    if (!tournamentIdParam || isNaN(this.tournamentId)) {
      this.router.navigate(['/dashboard'])
    } else {
      this.refreshData()
    }
  }

  refreshData() {
    this.tournamentService.getEventList(this.tournamentId)
      .subscribe(eventList => {
        this.eventList = eventList
      })
  }

  get isNewEventFormInvalid() {
    return false
  }

  addEvent() {
    this.tournamentService
      .addEvent({
        tournamentId: this.tournamentId,
        name: this.inputNewName.value,
        challongeUrl: this.inputNewChallongeUrl.value,
      })
      .pipe(map(addedEvent => this.refreshData()))
      .subscribe(() => {},
        error => {
          this.errorMessage = "System error: " + error.message;
      });
  }

  toggleNewEventForm() {
    this.isNewEventFormOpen = !this.isNewEventFormOpen;
    this.errorMessage = null;
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
  navigateToRoundRobinMatchSheet(event) {
    this.router.navigate(['/rr-match-sheet'], {
      queryParams: {
        eventId: event.id
      }
    })
  }
}
