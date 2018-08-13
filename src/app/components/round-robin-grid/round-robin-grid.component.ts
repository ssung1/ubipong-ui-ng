import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-round-robin-grid',
  templateUrl: './round-robin-grid.component.html',
  styleUrls: ['./round-robin-grid.component.scss']
})
export class RoundRobinGridComponent implements OnInit, OnDestroy {

  private refreshInterval;

  gridContent = [
    [ "", "Group 1", "A", "B", "C" ],
    [ "A", "SpongeBob", "x", "W 5 7", "W 3 5" ],
    [ "B", "Patrick", "L -5 -7", "x", "W 3 5" ],
    [ "C", "Sandy", "L -3 -5", "L -3 -5", "x" ],
  ];
  
  constructor() { }

  ngOnInit() {
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    console.log(1);
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }
}
