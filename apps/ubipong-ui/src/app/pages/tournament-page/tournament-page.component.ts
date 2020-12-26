import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ubipong-ui-ng-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss']
})
export class TournamentPageComponent implements OnInit {

  tournamentId: string
  eventList: any[]
  isNewEventFormOpen: boolean
  errorMessage: string

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.queryParamMap.get('tournamentId')
    this.refreshData()
  }

  refreshData() {
    this.tournamentService.getEventList(Number(this.tournamentId))
      .subscribe(eventList => {
        this.eventList = eventList
      })
  }

  toggleNewEventForm() {
    this.isNewEventFormOpen = !this.isNewEventFormOpen;
    this.errorMessage = null;
  }
}
