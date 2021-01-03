import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentUrl = this.route.snapshot.queryParams["tournament"] ?
      this.route.snapshot.queryParams["tournament"] : "tournament does not have url";
  }

  navigateToRoundRobinGrid() {
    const eventListJson = JSON.stringify(this.eventList.map(event => event.url));
    this.router.navigate(['/rr-grid'], {
      queryParams: {
        eventList: eventListJson
      }
    });
  }
}
