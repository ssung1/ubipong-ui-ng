import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tournament } from '../models/tournament';
import { AddEventRequest } from '../models/add-event-request';
import {TournamentEvent} from '../models/tournament-event';

const eventRoot = '/rest/v0/events';
const crudEventRoot = '/crud/events'
const tournamentRoot = '/rest/v0/tournaments'

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  eventIndex = 0;

  constructor(private httpClient: HttpClient) { }

  getUrl(path: string): string {
    return environment.tournamentServiceUrl + path;
  }

  get defaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return headers;
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

    const url = this.getUrl(`${eventRoot}/${eventUrl}/roundRobinGrid`);
    return <Observable<any[][]>>this.httpClient.get(url);
  }

  getEvent(eventId: number): Observable<any> {
    const url = this.getUrl(`${eventRoot}/${eventId}`);
    return this.httpClient.get(url);
  }

  getEventList(tournamentId: number): Observable<any[]> {
    const url = this.getUrl(`${eventRoot}/search/find-by-tournament-id?tournament-id=${tournamentId}`)
    return <Observable<any[]>>this.httpClient.get(url);
  }

  getRoundRobinMatchList(eventUrl: string): Observable<any[]> {
    const url = this.getUrl(`${eventRoot}/${eventUrl}/roundRobinMatchList`);
    return <Observable<any[]>>this.httpClient.get(url);
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    const url = this.getUrl(tournamentRoot)

    return <Observable<any>>this.httpClient.post(url, tournament, { headers: this.defaultHeaders })
  }

  getTournamentList(): Observable<any> {
    const url = this.getUrl(tournamentRoot);
    return <Observable<any>>this.httpClient.get(url);
  }

  getTournament(tournamentLink: string): Observable<Tournament> {
    const url = tournamentLink;
    return <Observable<Tournament>>this.httpClient.get(url);
  }

  getTournamentById(tournamentId: number): Observable<Tournament> {
    const url = this.getUrl(`${tournamentRoot}/${tournamentId}`)
    return <Observable<Tournament>>this.httpClient.get(url);
  }

  updateTournament(tournamentLink: string, tournament: Tournament): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return <Observable<any>>this.httpClient.put(tournamentLink, JSON.stringify(tournament), { headers: headers });
  }

  addEvent(addEventRequest: AddEventRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const url = this.getUrl(`${eventRoot}`)
    return <Observable<any>>this.httpClient.post(url, addEventRequest, { headers: headers })
  }

  updateEvent(event: TournamentEvent): Observable<TournamentEvent> {
    const url = this.getUrl(`${eventRoot}/${event.id}`)
    return <Observable<TournamentEvent>>this.httpClient.put(url, event, { headers: this.defaultHeaders })
  }
}
