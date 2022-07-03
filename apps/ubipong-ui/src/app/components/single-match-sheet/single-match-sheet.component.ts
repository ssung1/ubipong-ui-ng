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

  @Input()
  gameCount = 5

  constructor() {}

  ngOnInit(): void {}

  get scoreSpaceRange() {
    const correctedGameCount = ((gameCount) => {
      if (gameCount % 2 === 0) {
        return gameCount + 1
      } else {
        return gameCount
      }
    })(this.gameCount)

    const scoresPerGame = 2
    return Array.from({length: correctedGameCount * scoresPerGame})
  }
}
