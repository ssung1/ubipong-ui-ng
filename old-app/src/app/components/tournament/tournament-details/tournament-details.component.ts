import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {
  tournamentUrl: string;
  eventList: any[] = [
    {
      name: "Preliminary Round Robin Group 1",
      url: "thd_201907_pr_rr_1",
      status: "started"
    },
    {
      name: "Preliminary Round Robin Group 2",
      url: "thd_201907_pr_rr_2",
      status: "started"
    },
    {
      name: "Championship Group 2",
      url: "thd_201907_ch_rr_2",
      status: "pending"
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentUrl = this.route.snapshot.queryParams["tournament"] ?
      this.route.snapshot.queryParams["tournament"] : "tournament does not have url";
  }

  navigateToRoundRobinGrid() {

  }
}
