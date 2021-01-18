import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { flatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-round-robin-match-sheet',
  templateUrl: './round-robin-match-sheet.component.html',
  styleUrls: ['./round-robin-match-sheet.component.scss']
})
export class RoundRobinMatchSheetComponent implements OnInit {
  eventId: string;
  challongeUrl: string;
  event: any;
  matchList: any[];
  matchGroupList: any[][];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // we are calling challongeUrl eventName for now, because eventually we will be using actual event ID or event name
    this.challongeUrl = this.route.snapshot.queryParamMap.get("eventName");
    this.eventId = this.route.snapshot.queryParamMap.get("eventName")
    this.refreshData();
  }

  refreshData() {
    this.tournamentService.getEvent(this.eventId).pipe(flatMap(event => {
      this.event = event
      return this.tournamentService.getRoundRobinMatchList(event.challongeUrl)
    })).subscribe(matchList => {
      this.matchList = matchList;
      // also group the matches so we can print the match sheet
      this.matchGroupList = this.groupMatchList(matchList);
    })
  }

  /**
   * group a matchList into subgroups, for the purpose of printing a subgroup per page
   * @param matchList
   */
  groupMatchList(matchList: any[]): any[][] {
    // do not destroy the original array
    const matchListCopy = matchList.slice(0);
    const matchGroupList = [];
    while(matchListCopy.length > 0) {
        matchGroupList.push(matchListCopy.splice(0, 5));
    }
    return matchGroupList;
  }

  gameHeader() {
    return [' ', ' ', 'Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'];
  }

  gameResultBlank() {
    return [' ', ' ', ' ', ' ', ' '];
  }
}
