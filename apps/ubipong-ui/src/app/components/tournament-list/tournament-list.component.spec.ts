import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TournamentListComponent } from './tournament-list.component'
import { FormsModule } from '@angular/forms'
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
        "tournament": {
            "href": tournamentLink
        }
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
        "tournament": {
            "href": tournamentLink2
        }
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
      ],
    })
    .compileComponents();

    router = TestBed.get(Router);
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

  it('should hide new tournament form in the beginning', () => {
    const compiled = fixture.nativeElement;

    const tournamentForm = compiled.querySelector('.new-tournament-form');
    expect(tournamentForm).toBeFalsy();
  });

  it('should be able to activate the new tournament form', () => {
    const compiled = fixture.nativeElement;

    const accordionAddTournament = compiled.querySelector('#accordion-add-tournament');
    expect(accordionAddTournament).toBeTruthy();
    accordionAddTournament.click();

    fixture.detectChanges();

    const tournamentForm = compiled.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();
  });

  it('should be able to add a new tournament (in ui)', () => {
    const compiled = fixture.nativeElement;

    component.tournamentList = [];

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const tournamentForm = compiled.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();

    const inputNewName = compiled.querySelector('#input-new-name');
    inputNewName.value = tournamentName;
    inputNewName.dispatchEvent(new Event('input'));

    const inputNewTournamentDate = compiled.querySelector('#input-new-tournament-date');
    inputNewTournamentDate.value = tournamentDate;
    inputNewTournamentDate.dispatchEvent(new Event('input'));

    const buttonAddTournament = compiled.querySelector('#button-add-tournament');
    buttonAddTournament.click();

    expect(component.tournamentList.length).toBe(1);
    const addedTournament = component.tournamentList[0];
    expect(addedTournament.name).toBe(tournamentName);
    expect(addedTournament.tournamentDate).toBe(tournamentDate);
    expect(addedTournament['_links']['self']['href']).toBeTruthy();

    expect(component.inputNewName).toBe(null);
    expect(component.inputNewTournamentDate).toBe(null);

    expect(mockTournamentService.addTournament).toHaveBeenCalledWith({
      _links: null,
      name: tournamentName,
      tournamentDate: tournamentDate,
      id: 0
    })
  });

  it('should be able to cancel the adding of tournament', () => {
    const compiled = fixture.nativeElement;

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const tournamentForm = compiled.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();

    const buttonAddTournament = compiled.querySelector('#button-add-tournament-cancel');
    buttonAddTournament.click();

    const buttonStartAdd = compiled.querySelector('#button-add-tournament-start');
    expect(buttonStartAdd).toBeFalsy();
  });

  it('should be able to load a list of tournaments', () => {
    expect(component.tournamentList.length).toBe(2);
  });

  it('should not have a box to display error message unless there is an error', () => {
    const compiled = fixture.nativeElement;

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const errorMessageBox = compiled.querySelector('#input-error-message > div');

    expect(errorMessageBox).toBeFalsy();
  });

  it('should display error message if tournament addition fails', () => {
    const errorMessage = 'System Error: Please Try Again Later'

    mockTournamentService.addTournament.mockReturnValue(throwError({
      message: errorMessage
    }));

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    component.addTournament();
    expect(component.errorMessage).toContain(errorMessage);

    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    const errorMessageBox = compiled.querySelector('#input-error-message > div');
  
    expect(errorMessageBox).toBeTruthy();
    expect(errorMessageBox.textContent).toContain(errorMessage);
  });

  it('should navigate to the event list page when a tournament is selected', () => {
    component.tournamentList = [tournament];

    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const tournamentItem = compiled.querySelector('.tournament-card');

    expect(tournamentItem).toBeTruthy();

    const navigate = jest.spyOn(router, 'navigate');

    expect(router).toBe(component.router);
    tournamentItem.click();

    expect(navigate).toHaveBeenCalledWith(['tournament-page'], {
      queryParams: {
        tournamentId: tournamentId
      }
    });
  });
});
