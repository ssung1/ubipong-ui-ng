import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-round-robin-match-sheet',
  templateUrl: './round-robin-match-sheet.component.html',
  styleUrls: ['./round-robin-match-sheet.component.scss']
})
export class RoundRobinMatchSheetComponent implements OnInit {
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
    this.refreshData();
  }

  refreshData() {
    forkJoin([
      this.tournamentService.getRoundRobinMatchList(this.challongeUrl),
      this.tournamentService.getEvent(this.challongeUrl),
    ]).subscribe(v => {
      this.matchList = v[0];
      // also group the matches so we can print the match sheet
      this.matchGroupList = this.groupMatchList(v[0]);
      this.event = v[1];
    });
  }

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
