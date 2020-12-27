import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ubipong-ui-ng-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss']
})
export class TournamentPageComponent implements OnInit {

  tournamentId: number
  eventList: any[]
  isNewEventFormOpen: boolean
  errorMessage: string

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tournamentId = Number(this.route.snapshot.queryParamMap.get('tournamentId'))
    this.refreshData()
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
}
