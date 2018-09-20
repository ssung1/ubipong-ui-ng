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

  gridContent = [
    [ "", "Group 1", "A", "B", "C" ],
    [ "A", "SpongeBob", "x", "W 5 7", "W 3 5" ],
    [ "B", "Patrick", "L -5 -7", "x", "W 3 5" ],
    [ "C", "Sandy", "L -3 -5", "L -3 -5", "x" ],
  ];
  
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
        this.gridContent = [
          [ "", "Group 1", "A", "B", "C" ],
          [ "A", "SpongeBob", "x", "W 5 7", "W 3 5" ],
          [ "B", "Patrick", "L -5 -7", "x", "W 3 5" ],
          [ "C", "Sandy", "L -3 -5", "L -3 -5", "x" ],
        ];
      }
      else {
        this.gridContent = [
          [ "", "Group 2", "A", "B", "C" ],
          [ "A", "Blossom", "x", "W 5 7", "W 3 5" ],
          [ "B", "Bubbles", "L -5 -7", "x", "W 3 5" ],
          [ "C", "Buttercup", "L -3 -5", "L -3 -5", "x" ],
        ];
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
