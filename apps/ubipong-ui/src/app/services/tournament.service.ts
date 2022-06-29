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

  getRoundRobinGrid(eventId: number): Observable<any[][]> {
    const url = this.getUrl(`${eventRoot}/${eventId}/roundRobinGrid`);
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
    return <Observable<any>>this.httpClient.put(tournamentLink, tournament, { headers: this.defaultHeaders });
  }

  addEvent(addEventRequest: AddEventRequest): Observable<any> {
    const url = this.getUrl(`${eventRoot}`)
    return <Observable<any>>this.httpClient.post(url, addEventRequest, { headers: this.defaultHeaders })
  }

  updateEvent(event: TournamentEvent): Observable<TournamentEvent> {
    const url = this.getUrl(`${eventRoot}/${event.id}`)
    return <Observable<TournamentEvent>>this.httpClient.put(url, event, { headers: this.defaultHeaders })
  }
}
