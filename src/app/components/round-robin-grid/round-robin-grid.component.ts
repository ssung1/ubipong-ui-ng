import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

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
  eventList: string[] = ["group1", "group2"];

  gridContent: any[][] = [[]];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.refresh) {
      this.initRefreshInterval();
    }
    this.eventList = this.parseEventList();
    this.refreshData();
  }

  parseEventList(): string[] {
    const eventListJson = this.route.snapshot.queryParamMap.get("eventList");
    return JSON.parse(eventListJson);
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
    const event = this.eventList[this.eventIndex];
    console.log("Refreshing...", event);
    this.tournamentService.getRoundRobinGrid(this.eventList[this.eventIndex])
      .subscribe((grid) => {
        this.gridContent = grid;
      })
    this.eventIndex += 1;
    if (this.eventIndex >= this.eventList.length) {
      this.eventIndex = 0;
    }
  }

  ngOnDestroy() {
    this.clearRefreshInterval();
  }
}
