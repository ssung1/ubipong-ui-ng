import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlbuilder } from 'urlbuilder';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private httpClient: HttpClient) { }

  getRoundRobinGrid(eventId: string): Observable<any[][]> {
    this.httpClient.get('http://localhost:8080/rest/v0/events');
    return of([[]]);
  }
}
