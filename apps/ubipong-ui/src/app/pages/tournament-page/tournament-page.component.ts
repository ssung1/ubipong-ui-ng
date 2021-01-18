import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

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

  addEvent(name: string, challongeUrl: string) {
    this.tournamentService
      .addEvent({
        tournamentId: this.tournamentId,
        name,
        challongeUrl,
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
        eventList: JSON.stringify(this.eventList.map(event => event.eventId))
      }
    })
  }

  navigateToRoundRobinMatchSheet(event) {
    this.router.navigate(['/rr-match-sheet'], {
      queryParams: {
        eventName: event.eventId
      }
    })
  }
}
