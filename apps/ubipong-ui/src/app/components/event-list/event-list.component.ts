import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  eventList: any[]

  @Output('viewRoundRobinMatchSheet')
  viewRoundRobinMatchSheetEventEmitter: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  viewRoundRobinMatchSheet(event: any) {
    this.viewRoundRobinMatchSheetEventEmitter.emit(event)
  }
}
