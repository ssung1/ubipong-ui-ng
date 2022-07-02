import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-match-sheet',
  templateUrl: './single-match-sheet.component.html',
  styleUrls: ['./single-match-sheet.component.scss'],
})
export class SingleMatchSheetComponent implements OnInit {
  @Input()
  eventName = '_______________'

  @Input()
  roundName = '_______________'

  @Input()
  player1Name = '_______________'

  @Input()
  player2Name = '_______________'

  constructor() {}

  ngOnInit(): void {}
}
