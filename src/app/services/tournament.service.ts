import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlbuilder } from 'urlbuilder';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  eventIndex = 0;

  constructor(private httpClient: HttpClient) { }

  getUrl(path: string): string {
    return environment.tournamentServiceUrl + path;
  }

  getRoundRobinGrid(eventUrl: string): Observable<any[][]> {
    if (environment.mockData) {

      this.eventIndex += 1;
      if (this.eventIndex >= 2) {
        this.eventIndex = 0;
      }
  
      if (this.eventIndex == 0) {
        return of([[{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"spongebob","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"W 4 5 6","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":4,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true},{"player1Score":11,"player2Score":6,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"patrick","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"L -4 -5 -6","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":4,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false},{"player1Score":6,"player2Score":11,"winForPlayer1":false}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"L -9 8 -6 -5","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":9,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":8,"winForPlayer1":true},{"player1Score":6,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false}]}],[{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"squidward","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"W 9 -8 6 5","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":9,"winForPlayer1":true},{"player1Score":8,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":6,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}]]);
      }
      else {
        return of([[{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"A","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"spongebob","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"W 4 5 6","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":4,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true},{"player1Score":11,"player2Score":6,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}],[{"type":14,"content":"B","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"patrick","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"L -4 -5 -6","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":4,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false},{"player1Score":6,"player2Score":11,"winForPlayer1":false}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":12,"content":"L -9 8 -6 -5","winForPlayer1":false,"winByDefault":false,"gameList":[{"player1Score":9,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":8,"winForPlayer1":true},{"player1Score":6,"player2Score":11,"winForPlayer1":false},{"player1Score":5,"player2Score":11,"winForPlayer1":false}]}],[{"type":14,"content":"C","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":14,"content":"squidward","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]},{"type":11,"content":"W 9 -8 6 5","winForPlayer1":true,"winByDefault":false,"gameList":[{"player1Score":11,"player2Score":9,"winForPlayer1":true},{"player1Score":8,"player2Score":11,"winForPlayer1":false},{"player1Score":11,"player2Score":6,"winForPlayer1":true},{"player1Score":11,"player2Score":5,"winForPlayer1":true}]},{"type":11,"content":"","winForPlayer1":false,"winByDefault":false,"gameList":[]}]]);
      }
    }

    const url = this.getUrl(`/rest/v0/event/${eventUrl}/roundRobinGrid`);
    return <Observable<any[][]>>this.httpClient.get(url);
  }

  getEvent(eventUrl: string): Observable<any> {
    if (environment.mockData) {

      this.eventIndex += 1;
      if (this.eventIndex >= 2) {
        this.eventIndex = 0;
      }
  
      if (this.eventIndex == 0) {
        return of({"name":"Group 1"});
      }
      else {
        return of({"name":"Group 2"});
      }
    }

    const url = this.getUrl(`/rest/v0/event/${eventUrl}`);
    return this.httpClient.get(url);
  }
}
