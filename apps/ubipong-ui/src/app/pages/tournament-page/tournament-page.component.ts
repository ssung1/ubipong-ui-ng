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
    // console.log('ngoninit')
    // console.log(this.route.snapshot.queryParamMap.get('tournamentId'))
    // this.tournamentId = Number(this.route.snapshot.queryParamMap.get('tournamentId'))
    // if (isNaN(this.tournamentId)) {
    //   console.log('route out of here')
    //   this.router.navigate(['/dashboard'])
    // } else {
    //   console.log('tournament id ok', this.tournamentId)
    // }
    // this.refreshData()

    console.log(this.route.snapshot.paramMap.get('param1'))
    console.log(this.route.snapshot.params.param1)
    this.route.paramMap.subscribe(pm => {
      console.log(pm.get('param1'))
    })
    this.route.params.subscribe(p => {
      console.log(p.param1)
    })

    console.log(this.route.snapshot.queryParamMap.get('tournamentId'))
    console.log(this.route.snapshot.queryParams.tournamentId)
    this.route.queryParamMap.subscribe(pm => {
      console.log(pm.get('tournamentId'))
    })
    this.route.queryParams.subscribe(p => {
      console.log(p.tournamentId)
    })
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

  navigateToRoundRobinGrid() {
  }
}
