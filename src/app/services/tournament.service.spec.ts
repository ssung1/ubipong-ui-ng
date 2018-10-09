import { TestBed, inject } from '@angular/core/testing';

import { TournamentService } from './tournament.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

describe('TournamentService', () => {
  const eventId = "bikiniBottomOpen-RoundRobin-Group-5";
  const mockHttpClient = new HttpClient(null);
  const subject = new TournamentService(mockHttpClient);
  const url = environment.tournamentServiceUrl;

  let httpGet: jasmine.Spy;

  beforeEach(() => {
    httpGet = spyOn(mockHttpClient, 'get');

    TestBed.configureTestingModule({
      providers: [TournamentService]
    });
  });

  it('can retrieve a round robin grid by event ID', async () => {
    const content = "example";
    httpGet.and.returnValue([[{type: 1, content: content}]]);
    const response = await subject.getRoundRobinGrid(eventId);

    expect(httpGet).toHaveBeenCalledWith(
      `{url}/rest/v0/event/roundRobinGrid/{eventId}`);
    //expect(response[0][0].content).toBe(content);
  });
});
