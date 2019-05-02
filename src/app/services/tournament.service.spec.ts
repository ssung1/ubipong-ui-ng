import { TestBed, inject } from '@angular/core/testing';

import { TournamentService } from './tournament.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tournament } from '../models/tournament';

describe('TournamentService', () => {
  const eventUrl = "bikiniBottomOpen-RoundRobin-Group-5";
  const eventName = "From Bikini Bottom: Round Robin Group 5";
  const tournamentName = "Bikini Bottom Open";
  let mockHttpClient: any;
  let tournamentService;
  const url = environment.tournamentServiceUrl;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get', 'post']);
    tournamentService = new TournamentService(mockHttpClient);

    TestBed.configureTestingModule({
      providers: [TournamentService]
    });
  });

  it('can retrieve a round robin grid by event URL', async () => {
    const content = "example";
    mockHttpClient.get.and.returnValue([[{type: 1, content: content}]]);
    const response = tournamentService.getRoundRobinGrid(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/event/${eventUrl}/roundRobinGrid`);
    expect(response[0][0].content).toBe(content);
  });

  it('can retrieve event information by event URL', async () => {
    mockHttpClient.get.and.returnValue({ name: eventName });
    const response = tournamentService.getEvent(eventUrl);

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/event/${eventUrl}`);
    expect(response["name"]).toBe(eventName);
  });

  it('can create a tournament', async() => {
    const tournamentLink = "http://localhost:8080/crud/tournaments/1";
    const tournament: Tournament = {
      "name": tournamentName,
      "tournamentDate": "2018-06-20T17:00:00.000+0000",
    };

    mockHttpClient.post.and.returnValue({
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
    });

    const response = tournamentService.createTournament(tournamentName);
    //expect(mockHttpClient.post).toHaveBeenCalledWith(`${url}/crud/tournaments`, JSON.stringify(tournament), jasmine.anything());
    expect(response['_links']['self']['href']).toBe(tournamentLink);
  });

  it('can retrieve a list of tournaments', async() => {
    mockHttpClient.get.and.returnValue({
      "_embedded": {
        "tournaments": [
          {
            "name": "THD Summer Games 2018",
            "tournamentDate": "2018-06-20T17:00:00.000+0000",
            "_links": {
              "self": {
                "href": "http://localhost:8080/crud/tournaments/1"
              },
              "tournament": {
                "href": "http://localhost:8080/crud/tournaments/1"
              }
            }
          }
        ]
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
    });

    const response = tournamentService.getTournamentList();
    
  });
});
