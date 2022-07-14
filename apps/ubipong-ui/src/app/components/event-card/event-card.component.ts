import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { EventStatus } from '../../models/event-status'
import { TournamentEvent } from '../../models/tournament-event'

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input()
  event: TournamentEvent = {
    id: 0,
    tournamentId: 0,
    name: 'loading...',
    challongeUrl: '',
    status: EventStatus.Created,
    startTime: '',
  }

  @Output('viewRoundRobinMatchSheet')
  viewRoundRobinMatchSheetEventEmitter: EventEmitter<TournamentEvent> =
    new EventEmitter<TournamentEvent>()

  @Output('viewEventDetails')
  viewEventDetailsEventEmitter: EventEmitter<TournamentEvent> =
    new EventEmitter<TournamentEvent>()

  constructor() {}

  ngOnInit(): void {}

  viewRoundRobinMatchSheet(event: TournamentEvent) {
    this.viewRoundRobinMatchSheetEventEmitter.emit(event)
  }

  viewEventDetails(event: TournamentEvent) {
    this.viewEventDetailsEventEmitter.emit(event)
  }

  formatTime(dateTime: string) {
    return new Date(dateTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    } as Intl.DateTimeFormatOptions)
  }

  isRoundRobinMatchSheetDisabled(status: string) {
    return status === 'created'
  }
}
