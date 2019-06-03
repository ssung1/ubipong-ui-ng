import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('TournamentPageComponent', () => {
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournamentName = 'Summer Games 2019';
  const tournamentDate = '2019-06-20T12:00:00-0500';

  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;
  let mockTournamentService: any;

  beforeEach(async(() => {
    mockTournamentService = jasmine.createSpyObj('mockTournamentService', ['getTournamentList']);
    mockTournamentService.getTournamentList.and.returnValue(of({
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
        TournamentPageComponent,
        TournamentListComponent,
        HeaderComponent,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
