import { Component, OnInit } from '@angular/core';
import { TournamentEvent } from '../../models/tournament-event';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event?: TournamentEvent

  constructor() { }

  ngOnInit(): void {
  }

}
