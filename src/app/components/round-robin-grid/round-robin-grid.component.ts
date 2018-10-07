import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-round-robin-grid',
  templateUrl: './round-robin-grid.component.html',
  styleUrls: ['./round-robin-grid.component.scss']
})
export class RoundRobinGridComponent implements OnInit, OnDestroy {

  private refreshInterval;
  refreshIntervalTime = environment.roundRobinGridRefreshInterval;
  refresh = environment.roundRobinGridRefresh;

  eventIndex: number = 0;
  eventList: Array<String> = ["group1", "group2"];

  gridContent: any[][] = [[{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"spongebob","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"W 4 5 6","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":4,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true},{"player1Score":11,"player2Score":6,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"patrick","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"L -4 -5 -6","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":4,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false},{"player1Score":6,"player2Score":11,"winForPlayer1":false}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"L -9 8 -6 -5","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":9,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":8,"winForPlayer1":true},{"player1Score":6,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false}]}],[{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"squidward","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"W 9 -8 6 5","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":9,"winForPlayer1":true},{"player1Score":8,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":6,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}]];

  constructor() { }

  ngOnInit() {
    if (this.refresh) {
      this.initRefreshInterval();
    }
  }

  initRefreshInterval() {
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, this.refreshIntervalTime);
  }

  clearRefreshInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refreshData() {
    if (environment.mockData) {
      if (this.eventIndex == 0) {
        this.gridContent = [[{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"spongebob","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"W 4 5 6","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":4,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true},{"player1Score":11,"player2Score":6,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"patrick","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"L -4 -5 -6","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":4,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false},{"player1Score":6,"player2Score":11,"winForPlayer1":false}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"L -9 8 -6 -5","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":9,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":8,"winForPlayer1":true},{"player1Score":6,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false}]}],[{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"squidward","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"W 9 -8 6 5","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":9,"winForPlayer1":true},{"player1Score":8,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":6,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}]];
      }
      else {
        this.gridContent = [[{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"spongebob","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"W 4 5 6","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":4,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true},{"player1Score":11,"player2Score":6,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"patrick","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"L -4 -5 -6","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":4,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false},{"player1Score":6,"player2Score":11,"winForPlayer1":false}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"L -9 8 -6 -5","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":9,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":8,"winForPlayer1":true},{"player1Score":6,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false}]}],[{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"squidward","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"W 9 -8 6 5","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":9,"winForPlayer1":true},{"player1Score":8,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":6,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}]];
      }
    }
    else {
      //
    }
    this.eventIndex += 1;
    if (this.eventIndex >= this.eventList.length) {
      this.eventIndex = 0;
    }
  }

  ngOnDestroy() {
    this.clearRefreshInterval();
  }
}
