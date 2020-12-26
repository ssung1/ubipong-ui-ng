import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinMatchSheetComponent } from './round-robin-match-sheet.component';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RoundRobinMatchSheetComponent', () => {
  const eventTitle = "round robin tournament for integration test";
  const eventName = 'round-robin';
  const matchList = [
    {
      matchId: 1,
      player1Id: 123,
      player2Id: 124,
      player1Seed: 'A',
      player2Seed: 'B',
      winnerId: null,
      resultCode: null,
      player1Name: 'patrick',
      player2Name: 'squidward',
    }
  ];
  const event = {
    "eventId": 5090933,
    "name": eventName,
    "tournamentId": null,
    "challongeTournament": {
      "id": 5090933,
      "name": eventTitle,
      "url": "integration_test_rr",
      "description": "",
      "subdomain": null,
      "tournament_type": "round robin",
      "game_name": "Table Tennis"
    }
  };

  let component: RoundRobinMatchSheetComponent;
  let fixture: ComponentFixture<RoundRobinMatchSheetComponent>;
  let mockTournamentService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTournamentService = {
      'getRoundRobinMatchList': jest.fn().mockReturnValue(of(matchList)),
      'getEvent': jest.fn().mockReturnValue(of(event)),
    };

    mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue(eventName)
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [ RoundRobinMatchSheetComponent ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinMatchSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve match list', () => {
    expect(component.eventName).toBe(eventName);
    expect(component.matchList).toBe(matchList);
    expect(component.event).toBe(event);
  });
});
