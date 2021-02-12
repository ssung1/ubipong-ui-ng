import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  eventList: any[]

  @Output('viewRoundRobinMatchSheet')
  viewRoundRobinMatchSheetEvent: EventEmitter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  viewRoundRobinMatchSheet(event: any) {
    this.viewRoundRobinMatchSheetEvent.emit('wha')
  }
}
