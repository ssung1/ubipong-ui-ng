import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin, interval, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-round-robin-page',
  templateUrl: './round-robin-page.component.html',
  styleUrls: ['./round-robin-page.component.scss']
})
export class RoundRobinPageComponent implements OnInit, OnDestroy {

  private refreshInterval?: Subscription;
  refreshIntervalTime = environment.roundRobinGridRefreshInterval;
  refresh = environment.roundRobinGridRefresh;

  eventIndex: number = 0;
  eventIdList: number[] = []

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
    this.eventIdList = this.parseEventList();
    this.refreshData();
  }

  parseEventList(): number[] {
    const eventListJson = this.route.snapshot.queryParamMap.get("eventIdList") ?? '{}'
    return JSON.parse(eventListJson)
  }

  initRefreshInterval() {
    this.refreshInterval = interval(this.refreshIntervalTime).subscribe(() => {
      this.refreshData()
    })
  }

  clearRefreshInterval() {
    this.refreshInterval?.unsubscribe()
  }

  private getNextEventId() {
    const eventId = this.eventIdList[this.eventIndex]
    this.eventIndex += 1
    if (this.eventIndex >= this.eventIdList.length) {
      this.eventIndex = 0
    }

    return eventId
  }

  refreshData() {
    const eventId = this.getNextEventId()

    const eventObservable = this.tournamentService.getEvent(eventId)
    const roundRobinGridObservable = this.tournamentService.getRoundRobinGrid(eventId)
    forkJoin([eventObservable, roundRobinGridObservable]).subscribe(([event, gridContent]) => {
      this.event = event
      this.gridContent = gridContent
    })
  }

  ngOnDestroy() {
    this.clearRefreshInterval();
  }
}
