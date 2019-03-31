import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinMatchSheetComponent } from './round-robin-match-sheet.component';
import { TournamentService } from '../../services/tournament.service';

describe('RoundRobinMatchSheetComponent', () => {
  let component: RoundRobinMatchSheetComponent;
  let fixture: ComponentFixture<RoundRobinMatchSheetComponent>;
  let mockTournamentService;

  beforeEach(async(() => {
    mockTournamentService = jasmine.createSpyObj('mockTournamentService', ['getRoundRobinMatchList']);

    TestBed.configureTestingModule({
      declarations: [ RoundRobinMatchSheetComponent ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinMatchSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve match list', () => {

  });
});
