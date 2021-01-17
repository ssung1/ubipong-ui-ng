import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinPageComponent } from './round-robin-page.component';
import { TournamentService } from '../../services/tournament.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('RoundRobinPageComponent', () => {
  let component: RoundRobinPageComponent;
  let fixture: ComponentFixture<RoundRobinPageComponent>;

  const eventName = "Bikini Bottom Round Robin Group 1";
  const roundRobinGrid = [["A", "B", "C"]];
  const mockTournamentService = new TournamentService(null);
  const mockActivatedRoute = new ActivatedRoute();

  let getRoundRobinGrid: jasmine.Spy;
  let getEvent: jasmine.Spy;
  let parseEventList: jasmine.Spy;

  beforeEach(async () => {
    getRoundRobinGrid = spyOn(mockTournamentService, "getRoundRobinGrid");
    getRoundRobinGrid.and.returnValue(of(roundRobinGrid));

    getEvent = spyOn(mockTournamentService, "getEvent");
    getEvent.and.returnValue(of({ name: eventName }));

    TestBed.configureTestingModule({
      declarations: [ RoundRobinPageComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinPageComponent);
    component = fixture.componentInstance;

    parseEventList = spyOn(component, "parseEventList");
    parseEventList.and.returnValue(["event 1", "event 2", "event 3"]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh', (done) => {
    component.refreshIntervalTime = 100;
    component.initRefreshInterval();
    const refreshData = spyOn(component, "refreshData");
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
    expect(getRoundRobinGrid).toHaveBeenCalledWith("event 1");
    expect(component.eventIndex).toBe(1);
    component.refreshData();
    expect(getRoundRobinGrid).toHaveBeenCalledWith("event 2");
    expect(component.eventIndex).toBe(2);
    component.refreshData();
    expect(getRoundRobinGrid).toHaveBeenCalledWith("event 3");
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
