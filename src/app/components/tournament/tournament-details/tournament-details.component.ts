import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {
  tournamentUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentUrl = this.route.snapshot.queryParamMap.get("tournament");

    // mock data
    this.tournamentUrl = "tournament does not have url";
  }

}
