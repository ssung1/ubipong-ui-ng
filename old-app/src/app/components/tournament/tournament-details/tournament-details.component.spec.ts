import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailsComponent } from './tournament-details.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('TournamentDetailsComponent', () => {
  let component: TournamentDetailsComponent;
  let fixture: ComponentFixture<TournamentDetailsComponent>;
  let mockActivatedRoute: any;

  let eventList: any[] = [
    {
      name: "Preliminary Round Robin Group 1",
      url: "thd_201907_pr_rr_1",
      status: "started"
    },
    {
      name: "Preliminary Round Robin Group 2",
      url: "thd_201907_pr_rr_2",
      status: "started"
    },
    {
      name: "Championship Group 2",
      url: "thd_201907_ch_rr_2",
      status: "pending"
    }
  ];

  beforeEach(async(() => {
    mockActivatedRoute = jasmine.createSpyObj('mockActivateRoute', ['route']);
    mockActivatedRoute.snapshot = {
      queryParams: {
      }
    };
    TestBed.configureTestingModule({
      declarations: [TournamentDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to round robin grid page if user clicks on the monitor events button', () => {
    component.eventList = eventList;

    fixture.detectChanges();

    component.navigateToRoundRobinGrid = jasmine.createSpy('navigateToRoundRobinGridSpy');

    const compiled = fixture.nativeElement;

    compiled.querySelector('#monitor-events-button').click();

    expect(component.navigateToRoundRobinGrid).toHaveBeenCalled();
  });
});
