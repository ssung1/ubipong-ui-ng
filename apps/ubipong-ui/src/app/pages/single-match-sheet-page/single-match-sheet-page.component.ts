import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-match-sheet-page',
  templateUrl: './single-match-sheet-page.component.html',
  styleUrls: ['./single-match-sheet-page.component.scss'],
})
export class SingleMatchSheetPageComponent implements OnInit {
  readonly sheetCount = 4

  constructor() {}

  ngOnInit(): void {}

  get singleMatchSheetRange() {
    return Array.from({ length: this.sheetCount })
  }
}
