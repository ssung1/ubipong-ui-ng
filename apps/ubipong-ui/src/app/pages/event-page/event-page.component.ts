import { Component, OnInit } from '@angular/core'
import { TournamentEvent } from '../../models/tournament-event'
import { ActivatedRoute } from '@angular/router'
import { TournamentService } from '../../services/tournament.service'
import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event: TournamentEvent | null = null
  isLoggedIn: boolean = false
  private eventEditorOpen: boolean = false

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.refreshUser()
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
    this.tournamentService.getEvent(eventId).subscribe({
      next: event => {
        this.event = event
      },
      error: error => {
        this.snackBar.open(`Could not get event info: ${error.message}`, 'OK')
      }
    })
  }

  updateEvent(event: TournamentEvent): void {
    this.tournamentService.updateEvent(event).subscribe({
      next: () => {
        this.snackBar.open('Event updated', 'OK')
      },
      error: error => {
        this.snackBar.open(`Could not update event: ${error.message}`, 'OK')
      }
    })
  }

  refreshUser() {
    this.userService.isLoggedIn().then(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  get isEventEditorOpen(): boolean {
    return this.eventEditorOpen
  }

  toggleEventEditor(): void {
    this.eventEditorOpen = !this.eventEditorOpen
  }
}
