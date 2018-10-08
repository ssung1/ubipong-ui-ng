import { TestBed, inject } from '@angular/core/testing';

import { TournamentService } from './tournament.service';
import { HttpClient } from '@angular/common/http';

describe('TournamentService', () => {
  const eventId = "bikiniBottomOpen-RoundRobin-Group-5";
  const mockHttpClient = new HttpClient(null);
  const subject = new TournamentService(mockHttpClient);

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

    expect(httpGet).toHaveBeenCalledWith('http://');
    //expect(response[0][0].content).toBe(content);
  });
});
