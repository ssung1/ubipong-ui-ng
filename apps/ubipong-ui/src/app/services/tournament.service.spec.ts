import { TournamentService } from './tournament.service';
import { environment } from '../../environments/environment';
import { Tournament } from '../models/tournament';
import { of, lastValueFrom } from 'rxjs';

describe('TournamentService', () => {
  const eventUrl = "bikiniBottomOpen-RoundRobin-Group-5";
  const eventName = "From Bikini Bottom: Round Robin Group 5";
  const tournamentName = "Bikini Bottom Open";
  const tournamentId = 1
  const eventId = 101
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournament: Tournament = {
    "id": tournamentId,
    "name": tournamentName,
    "tournamentDate": "2018-06-20T17:00:00.000+0000",
    "_links": {
      "self": {
        "href": tournamentLink
      },
    }
  }
  const event = {
    "id": eventId,
    "tournamentId": tournamentId,
    "challongeUrl": eventUrl,
    "name": "Preliminary Group 1",
    "challongeTournament": null,
    "startTime": "2018-06-20T17:00:00.000+0000",
    "status": "pending",
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
    mockHttpClient.get.mockReturnValue(of([[{ type: 1, content: content }]]));
    const response = await lastValueFrom(tournamentService.getRoundRobinGrid(eventId))
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/events/${eventId}/roundRobinGrid`);
    expect(response[0][0].content).toBe(content);
  });

  it('can retrieve event information by event URL', async () => {
    mockHttpClient.get.mockReturnValue(of({ name: eventName }));
    const response = await lastValueFrom(tournamentService.getEvent(eventId));

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${url}/rest/v0/events/${eventId}`);
    expect(response["name"]).toBe(eventName);
  });

  it('can add a tournament', async () => {
    const addTournamentRequest = {
      "id": 0,
      "name": tournamentName,
      "tournamentDate": "2018-06-20T17:00:00.000+0000",
      "_links": null,
    };

    mockHttpClient.post.mockReturnValue(of(tournament));

    const response: Tournament = await lastValueFrom(tournamentService.addTournament(addTournamentRequest))

    expect(mockHttpClient.post.mock.calls[0][0]).toBe(`${url}/rest/v0/tournaments`)
    expect(mockHttpClient.post.mock.calls[0][1]).toBe(addTournamentRequest)
    expect(mockHttpClient.post.mock.calls[0][2].headers.get('Content-Type')).toBe('application/json')
    expect(response._links?.self.href).toBe(tournamentLink)
  });

  it('can retrieve a list of tournaments', async () => {
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

    const response = await lastValueFrom(tournamentService.getTournamentList())
    expect(mockHttpClient.get).toHaveBeenCalled()

    const tournamentList = response._embedded.tournaments
    expect(tournamentList).toBeTruthy()
    expect(typeof (tournamentList)).toBe('object')
    expect(tournamentList.length).toBe(1)

    expect(tournamentList[0].name).toBe(tournamentName)
  });

  it('can retrieve a tournament by ID (url)', async () => {
    mockHttpClient.get.mockReturnValue(of(tournament));

    const tournamentResponse = await lastValueFrom(tournamentService.getTournament(tournamentLink))
    expect(mockHttpClient.get).toHaveBeenCalledWith(tournamentLink);
    expect(tournamentResponse.name).toBe(tournamentName);
  });

  it('can update a tournament', async () => {
    mockHttpClient.put.mockReturnValue(of(tournament));

    const response = await lastValueFrom(tournamentService.updateTournament(tournamentLink, tournament))
    expect(mockHttpClient.put.mock.calls[0][0]).toBe(tournamentLink)
    expect(mockHttpClient.put.mock.calls[0][1]).toBe(tournament)
    expect(mockHttpClient.put.mock.calls[0][2].headers.get('Content-Type')).toBe('application/json')
    expect(response).toEqual(tournament)
  });

  it('can return list of events of a given tournament', async () => {
    const eventLink = `${url}/rest/v0/events/search/find-by-tournament-id?tournament-id=1`
    mockHttpClient.get.mockReturnValue(of([
      {
        "id": eventId,
        "challongeUrl": eventUrl,
        "name": "Preliminary Group 1",
        "tournamentId": tournamentId,
        "challongeTournament": null,
      }
    ]))

    const eventList = await lastValueFrom(tournamentService.getEventList(1))

    expect(mockHttpClient.get).toHaveBeenCalledWith(eventLink)
    expect(eventList.length).toBe(1)
    expect(eventList[0].id).toBe(eventId)
    expect(eventList[0].challongeUrl).toBe(eventUrl)
  })

  it('can add an event', async () => {
    const eventLink = `${url}/rest/v0/events`
    mockHttpClient.post.mockReturnValue(of(event))
    const addEventRequest = {
      tournamentId: event.tournamentId,
      name: event.name,
      challongeUrl: event.challongeUrl,
      startTime: event.startTime,
    }
    const response = await lastValueFrom(tournamentService.addEvent(addEventRequest));

    expect(mockHttpClient.post.mock.calls[0][0]).toBe(eventLink)
    expect(mockHttpClient.post.mock.calls[0][1]).toBe(addEventRequest)
    expect(mockHttpClient.post.mock.calls[0][2].headers.get('Content-Type')).toBe('application/json')
    expect(response).toEqual(event)
  })

  it('can update an event', async () => {
    const eventLink = `${url}/rest/v0/events/${eventId}`
    mockHttpClient.put.mockReturnValue(of(event))

    const response = await lastValueFrom(tournamentService.updateEvent(event));
    expect(mockHttpClient.put.mock.calls[0][0]).toBe(eventLink)
    expect(mockHttpClient.put.mock.calls[0][1]).toBe(event)
    expect(mockHttpClient.put.mock.calls[0][2].headers.get('Content-Type')).toBe('application/json')
    expect(response).toEqual(event)
  })
})
