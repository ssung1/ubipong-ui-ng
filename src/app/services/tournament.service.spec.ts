import { TestBed, inject } from '@angular/core/testing';

import { TournamentService } from './tournament.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tournament } from '../models/tournament';

describe('TournamentService', () => {
  const eventUrl = "bikiniBottomOpen-RoundRobin-Group-5";
  const eventName = "From Bikini Bottom: Round Robin Group 5";
  const tournamentName = "Bikini Bottom Open";
  let mockHttpClient: any;
  let subject;
  const url = environment.tournamentServiceUrl;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    subject = new TournamentService(mockHttpClient);

    TestBed.configureTestingModule({
      providers: [TournamentService]
    });
  });

  it('can retrieve a round robin grid by event URL', async () => {
    const content = "example";
    mockHttpClient.get.and.returnValue([[{type: 1, content: content}]]);
    const response = await subject.getRoundRobinGrid(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/event/${eventUrl}/roundRobinGrid`);
    expect(response[0][0].content).toBe(content);
  });

  it('can retrieve event information by event URL', async () => {
    mockHttpClient.get.and.returnValue({ name: eventName });
    const response = await subject.getEvent(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/event/${eventUrl}`);
    expect(response["name"]).toBe(eventName);
  });

  it('can create a tournament', async() => {
    const tournament: Tournament = {
      "name": tournamentName,
      "tournamentDate": "2018-06-20T17:00:00.000+0000",
    };

    mockHttpClient.get.and.returnValues({
      "name": tournamentName,
      "tournamentDate": "2018-06-20T17:00:00.000+0000",
      "_links": {
          "self": {
              "href": "http://localhost:8080/crud/tournaments/1"
          },
          "tournament": {
              "href": "http://localhost:8080/crud/tournaments/1"
          }
      }
    });

    const response = await subject.createTournament(tournamentName);
    expect(mockHttpClient.post).toHaveBeenCalledWith(`http://${url}/crud/tournaments`);
    expect(response['_links']['self']['href']).toBe('asfasd');
  });
});
