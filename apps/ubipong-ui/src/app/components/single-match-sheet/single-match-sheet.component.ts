import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-match-sheet',
  templateUrl: './single-match-sheet.component.html',
  styleUrls: ['./single-match-sheet.component.scss'],
})
export class SingleMatchSheetComponent implements OnInit {
  @Input()
  eventName = '(event name)'

  @Input()
  roundName = '(round name)'

  @Input()
  player1Name = '(player 1 name)'

  @Input()
  player2Name = '(player 2 name)'

  constructor() {}

  ngOnInit(): void {}
}
