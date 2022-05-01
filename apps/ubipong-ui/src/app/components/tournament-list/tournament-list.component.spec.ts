import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TournamentListComponent } from './tournament-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { of, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { TournamentService } from '../../services/tournament.service'
import { Tournament } from '../../models/tournament'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { LayoutModule } from '@angular/cdk/layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule } from '@angular/material/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('TournamentListComponent', () => {
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournamentName = 'Summer Games 2019';
  const tournamentDate = '2019-06-20T12:00:00-0500';
  const tournamentId = 1
  const tournamentLink2 = "http://localhost:8080/crud/tournaments/2";
  const tournamentName2 = 'Summer Games 2020';
  const tournamentDate2 = '2020-06-20T12:00:00-0500';
  const tournamentId2 = 2
  const tournament: Tournament = {
    "id": tournamentId,
    "name": tournamentName,
    "tournamentDate": tournamentDate,
    "_links": {
        "self": {
            "href": tournamentLink
        },
    }
  }
  const tournament2: Tournament = {
    "id": tournamentId2,
    "name": tournamentName2,
    "tournamentDate": tournamentDate2,
    "_links": {
        "self": {
            "href": tournamentLink2
        },
    }
  }

  let component: TournamentListComponent;
  let fixture: ComponentFixture<TournamentListComponent>;
  let mockTournamentService: any;
  let router: Router;

  beforeEach(async () => {
    mockTournamentService = {
      addTournament: jest.fn(),
      getTournamentList: jest.fn(),
    }
    mockTournamentService.addTournament.mockReturnValue(of(tournament));
    mockTournamentService.getTournamentList.mockReturnValue(of({
      "_embedded": {
        "tournaments": [
          tournament,
          tournament2
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
      declarations: [ TournamentListComponent ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
      ],
      imports: [ 
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        LayoutModule,
        MatSidenavModule,
        MatListModule,
        MatNativeDateModule,
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tournament list', () => {
    component.tournamentList = [tournament];

    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const tournamentItem = compiled.querySelector('.tournament-card');

    expect(tournamentItem).toBeTruthy();
    expect(tournamentItem.textContent).toContain(tournamentName);
  });

});
