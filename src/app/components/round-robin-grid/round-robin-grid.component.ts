import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

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
  eventUrlList: string[] = ["group1", "group2"];

  gridContent: any[][] = [[]];
  event: any = {};

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.refresh) {
      this.initRefreshInterval();
    }
    this.eventUrlList = this.parseEventList();
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
    const eventUrl = this.eventUrlList[this.eventIndex];

    forkJoin(
      this.tournamentService.getRoundRobinGrid(eventUrl),
      this.tournamentService.getEvent(eventUrl),
    ).subscribe(v => {
      this.gridContent = v[0];
      this.event = v[1];
    });

    this.eventIndex += 1;
    if (this.eventIndex >= this.eventUrlList.length) {
      this.eventIndex = 0;
    }
  }

  ngOnDestroy() {
    this.clearRefreshInterval();
  }
}
