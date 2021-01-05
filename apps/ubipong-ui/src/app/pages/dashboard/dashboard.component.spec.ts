import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardComponent } from './dashboard.component'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { TournamentListComponent } from '../../components/tournament-list/tournament-list.component'
import { TournamentService } from '../../services/tournament.service'

describe('DashboardComponent', () => {
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournamentName = 'Summer Games 2019';
  const tournamentDate = '2019-06-20T12:00:00-0500';

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockTournamentService: any;

  beforeEach(async () => {
    mockTournamentService = {
      getTournamentList: jest.fn()
    }
    mockTournamentService.getTournamentList.mockReturnValue(of({
      "_embedded": {
        "tournaments": [
          {
              "name": tournamentName,
              "tournamentDate": tournamentDate,
              "_links": {
                  "self": {
                      "href": tournamentLink
                  },
                  "tournament": {
                      "href": tournamentLink
                  }
              }
          },
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
          "totalElements": 9,
          "totalPages": 1,
          "number": 0
      }
    }));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TournamentListComponent,
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});