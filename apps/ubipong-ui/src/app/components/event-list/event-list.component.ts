import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ubipong-ui-ng-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input()
  eventList: any[]

  constructor() { }

  ngOnInit(): void {
  }

}
