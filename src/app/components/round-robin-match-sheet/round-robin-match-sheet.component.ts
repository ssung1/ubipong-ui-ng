import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-robin-match-sheet',
  templateUrl: './round-robin-match-sheet.component.html',
  styleUrls: ['./round-robin-match-sheet.component.scss']
})
export class RoundRobinMatchSheetComponent implements OnInit {
  eventName: string;
  matchList: any[];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.eventName = this.route.snapshot.queryParamMap.get("eventName");
    this.refreshData();
  }

  refreshData() {
    this.tournamentService.getRoundRobinMatchList(this.eventName)
        .subscribe(ml => {
          this.matchList = ml;
        });
  }
}
