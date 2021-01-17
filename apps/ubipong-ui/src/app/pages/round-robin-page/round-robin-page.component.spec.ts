import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinPageComponent } from './round-robin-page.component';
import { TournamentService } from '../../services/tournament.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('RoundRobinPageComponent', () => {
  let component: RoundRobinPageComponent;
  let fixture: ComponentFixture<RoundRobinPageComponent>;

  const challongeUrlList = ['bb_201906_pg_rr_1', 'bb_201906_pg_rr_2', 'bb_201906_pg_rr_3']
  const eventName = "Bikini Bottom Round Robin Group 1";
  const roundRobinGrid = [["A", "B", "C"]];
  let mockTournamentService: any
  let mockActivatedRoute: any

  beforeEach(async () => {
    mockTournamentService = {
      getRoundRobinGrid: jest.fn().mockReturnValue(of(roundRobinGrid)),
      getEvent: jest.fn().mockReturnValue(of({name: eventName, challongeUrl: challongeUrlList[0]}))
    }

    mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue(JSON.stringify(challongeUrlList))
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [ RoundRobinPageComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get challongeUrl from query param', () => {
    expect(component.eventUrlList).toEqual(challongeUrlList)
  })

  it('should refresh', (done) => {
    component.refreshIntervalTime = 100;
    component.initRefreshInterval();
    const refreshData = jest.spyOn(component, "refreshData");
    setTimeout(() => {
      expect(refreshData).toHaveBeenCalled();
      setTimeout(() => {
        expect(refreshData).toHaveBeenCalled();
        done();
      }, component.refreshIntervalTime + 100);
    }, component.refreshIntervalTime + 100);
  });

  it('should rotate round robin groups', () => {
    component.eventIndex = 0;
    component.refreshData();
    const getRoundRobinGrid = mockTournamentService.getRoundRobinGrid
    const getEvent = mockTournamentService.getEvent
    expect(getRoundRobinGrid).toHaveBeenCalledWith(challongeUrlList[0]);
    expect(getEvent).toHaveBeenCalledWith(challongeUrlList[0]);
    expect(component.eventIndex).toBe(1);
    component.refreshData();
    expect(getRoundRobinGrid).toHaveBeenCalledWith(challongeUrlList[1]);
    expect(getEvent).toHaveBeenCalledWith(challongeUrlList[1]);
    expect(component.eventIndex).toBe(2);
    component.refreshData();
    expect(getRoundRobinGrid).toHaveBeenCalledWith(challongeUrlList[2]);
    expect(getEvent).toHaveBeenCalledWith(challongeUrlList[2]);
    expect(component.eventIndex).toBe(0);
  });

  it('should update round robin grid after refresh', () => {
    component.refreshData();
    expect(component.gridContent).toBe(roundRobinGrid);
  });

  it('should update event information after refresh', () => {
    component.refreshData();
    expect(component.event["name"]).toBe(eventName);
  });

  it('should display event name as a header', () => {
    const header = fixture.nativeElement.querySelector('h2')
    expect(header.textContent).toBe(eventName)
  })
});
