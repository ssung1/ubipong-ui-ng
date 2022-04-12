import { Component, OnInit } from '@angular/core'
import { TournamentEvent } from '../../models/tournament-event'
import { ActivatedRoute } from '@angular/router'
import { TournamentService } from '../../services/tournament.service'
import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event?: TournamentEvent

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      map(params => {
        return Number(params.get('eventId'))
      }),
      map(eventId => {
        this.refreshEventById(eventId)
      }))
    .subscribe()
  }

  refreshEventById(eventId: number): void {
    this.tournamentService.getEvent(eventId).subscribe(event => {
      this.event = event
    }, error => {
      this.snackBar.open(`Could not get event info: ${error.message}`, 'OK')
    })
  }

  updateEvent(event: TournamentEvent): void {
    this.tournamentService.updateEvent(event).subscribe(() => {
      this.snackBar.open('Event updated', 'OK')
    }, error => {
      this.snackBar.open(`Could not update event: ${error.message}`, 'OK')
    })
  }
}
