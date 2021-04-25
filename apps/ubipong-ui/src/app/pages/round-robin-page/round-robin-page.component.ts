import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { interval, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-round-robin-page',
  templateUrl: './round-robin-page.component.html',
  styleUrls: ['./round-robin-page.component.scss']
})
export class RoundRobinPageComponent implements OnInit, OnDestroy {

  private refreshInterval: Subscription;
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
    const eventListJson = this.route.snapshot.queryParamMap.get("eventIdList");
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

  refreshData() {
    const eventId = this.eventIdList[this.eventIndex];

    this.tournamentService.getEvent(eventId).pipe(mergeMap(event => {
      // instead of setting this.event = event,
      // we combine event with the output of getRoundRobinGrid
      //
      // this way, this.event and this.gridContent can be updated at the
      // same time in the subscribe block
      return this.tournamentService.getRoundRobinGrid(event.challongeUrl).pipe(map(
        gridContent => [event, gridContent]))
    })).subscribe(([event, gridContent]) => {
      this.event = event
      this.gridContent = gridContent
    });

    this.eventIndex += 1;
    if (this.eventIndex >= this.eventIdList.length) {
      this.eventIndex = 0;
    }
  }

  ngOnDestroy() {
    this.clearRefreshInterval();
  }
}
