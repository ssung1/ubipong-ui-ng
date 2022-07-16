import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import {TournamentEvent} from '../../models/tournament-event'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  eventList: TournamentEvent[] = []

  @Output('viewRoundRobinMatchSheet')
  viewRoundRobinMatchSheetEventEmitter: EventEmitter<TournamentEvent> =
    new EventEmitter<TournamentEvent>()

  @Output('viewEventDetails')
  viewEventDetailsEventEmitter: EventEmitter<TournamentEvent> =
    new EventEmitter<TournamentEvent>()

  constructor() { }

  ngOnInit(): void {
  }

  viewRoundRobinMatchSheet(event: TournamentEvent) {
    this.viewRoundRobinMatchSheetEventEmitter.emit(event)
  }

  viewEventDetails(event: TournamentEvent) {
    this.viewEventDetailsEventEmitter.emit(event)
  }
}
