import { TestBed, inject } from '@angular/core/testing';

import { TournamentService } from './tournament.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tournament } from '../models/tournament';
import { of } from 'rxjs';
import { doesNotReject } from 'assert';

describe('TournamentService', () => {
  const eventUrl = "bikiniBottomOpen-RoundRobin-Group-5";
  const eventName = "From Bikini Bottom: Round Robin Group 5";
  const tournamentName = "Bikini Bottom Open";
  const tournamentId = 1
  const eventId = 101
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournament = {
    "id": tournamentId,
    "name": tournamentName,
    "tournamentDate": "2018-06-20T17:00:00.000+0000",
    "_links": {
      "self": {
        "href": tournamentLink
      },
      "tournament": {
        "href": tournamentLink
      }
    }
  }

  let mockHttpClient: any;
  let tournamentService: TournamentService;
  const url = environment.tournamentServiceUrl;

  beforeEach(() => {
    mockHttpClient = {
      'get': jest.fn(),
      'post': jest.fn(),
      'put': jest.fn()
    };
    tournamentService = new TournamentService(mockHttpClient);
  });

  it('can retrieve a round robin grid by event URL', async () => {
    const content = "example";
    mockHttpClient.get.mockReturnValue([[{ type: 1, content: content }]]);
    const response = tournamentService.getRoundRobinGrid(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/events/${eventUrl}/roundRobinGrid`);
    expect(response[0][0].content).toBe(content);
  });

  it('can retrieve event information by event URL', async () => {
    mockHttpClient.get.mockReturnValue({ name: eventName });
    const response = tournamentService.getEvent(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/events/${eventUrl}`);
    expect(response["name"]).toBe(eventName);
  });

  it('can add a tournament', () => {
    const tournamentLink = "http://localhost:8080/crud/tournaments/1";
    const addTournamentRequest = {
      "id": 0,
      "name": tournamentName,
      "tournamentDate": "2018-06-20T17:00:00.000+0000",
      "_links": null,
    };

    mockHttpClient.post.mockReturnValue(tournament);

    const response = tournamentService.addTournament(addTournamentRequest);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      `${url}/crud/tournaments`, JSON.stringify(addTournamentRequest), expect.anything());
    expect(response['_links']['self']['href']).toBe(tournamentLink);
  });

  it('can retrieve a list of tournaments', (done) => {
    mockHttpClient.get.mockReturnValue(of({
      "_embedded": {
        "tournaments": [tournament]
      },
      "_links": {
        "self": {
          "href": "http://localhost:8080/crud/tournaments{?page,size,sort}",
          "templated": true
        },
        "profile": {
          "href": "http://localhost:8080/crud/profile/tournaments"
        },
        "search": {
          "href": "http://localhost:8080/crud/tournaments/search"
        }
      },
      "page": {
        "size": 20,
        "totalElements": 1,
        "totalPages": 1,
        "number": 0
      }
    }));

    const responseObservable = tournamentService.getTournamentList();
    expect(mockHttpClient.get).toHaveBeenCalled();

    responseObservable.subscribe(response => {
      const tournamentList = response._embedded.tournaments;
      expect(tournamentList).toBeTruthy()
      expect(typeof (tournamentList)).toBe('object')
      expect(tournamentList.length).toBe(1)
  
      expect(tournamentList[0].name).toBe(tournamentName)
      done()
    })
  });

  it('can retrieve a tournament by ID (url)', (done) => {
    const tournamentLink = "http://localhost:8080/crud/tournaments/3";
    mockHttpClient.get.mockReturnValue(of(tournament));

    const tournamentResponse = tournamentService.getTournament(tournamentLink);
    expect(mockHttpClient.get).toHaveBeenCalledWith(tournamentLink);
    tournamentResponse.subscribe(r => {
      expect(r.name).toBe(tournamentName);
      done()
    })
  });

  it('can update a tournament', () => {
    const tournamentLink = "http://localhost:8080/crud/tournaments/1";
    mockHttpClient.put.mockReturnValue(of(tournament));

    const response = tournamentService.updateTournament(tournamentLink, tournament);
    expect(mockHttpClient.put).toHaveBeenCalled();
  });

  it('can return list of events of a given tournament', (done) => {
    const eventLink = 'http://localhost:8080/crud/events/search/findByTournamentId?tournamentId=1'
    mockHttpClient.get.mockReturnValue(of({
      "_embedded": {
        "events": [
          {
            "id": eventId,
            "challongeUrl": eventUrl,
            "name": "Preliminary Group 1",
            "tournamentId": tournamentId,
            "challongeTournament": null,
            "_links": {
              "self": {
                "href": "http://localhost:8080/crud/events/1"
              },
              "event": {
                "href": "http://localhost:8080/crud/events/1"
              }
            }
          }
        ]
      },
      "_links": {
        "self": {
          "href": "http://localhost:8080/crud/events/search/findByTournamentId?tournamentId=1"
        }
      }
    }))

    const eventListObservable = tournamentService.getEventList(1)

    eventListObservable.subscribe(eventList => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(eventLink)
      expect(eventList.length).toBe(1)
      expect(eventList[0].id).toBe(eventId)
      expect(eventList[0].challongeUrl).toBe(eventUrl)
      done()
    })
  })
});
