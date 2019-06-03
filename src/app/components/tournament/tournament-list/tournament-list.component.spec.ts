import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentListComponent } from './tournament-list.component';
import { FormsModule } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';
import { of, throwError } from 'rxjs';
import { Tournament } from 'src/app/models/tournament';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('TournamentListComponent', () => {
  const tournamentLink = "http://localhost:8080/crud/tournaments/1";
  const tournamentName = 'Summer Games 2019';
  const tournamentDate = '2019-06-20T12:00:00-0500';
  const tournamentLink2 = "http://localhost:8080/crud/tournaments/2";
  const tournamentName2 = 'Summer Games 2020';
  const tournamentDate2 = '2020-06-20T12:00:00-0500';

  let component: TournamentListComponent;
  let fixture: ComponentFixture<TournamentListComponent>;
  let mockTournamentService: any;
  let router: Router;

  beforeEach(async(() => {
    mockTournamentService = jasmine.createSpyObj('mockTournamentService', ['addTournament', 'getTournamentList']);
    mockTournamentService.addTournament.and.returnValue(of(
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
      }
    ));
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
          {
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
      declarations: [ TournamentListComponent ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
      ],
      imports: [ 
        FormsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tournament list', () => {
    component.tournamentList = [
      {
        name: tournamentName,
        tournamentDate: tournamentDate,
        _links: {
          self: {
            href: tournamentLink
          }
        },
      },
    ];

    fixture.detectChanges();
    
    const dom = fixture.nativeElement;
    const tournamentItem = dom.querySelector('.tournament-item');

    expect(tournamentItem).toBeTruthy();
    expect(tournamentItem.textContent).toContain(tournamentName);
  });

  it('should hide new tournament form in the beginning', () => {
    const dom = fixture.nativeElement;

    const tournamentForm = dom.querySelector('.new-tournament-form');
    expect(tournamentForm).toBeFalsy();
  });

  it('should be able to activate the new tournament form', () => {
    const dom = fixture.nativeElement;

    const accordionAddTournament = dom.querySelector('#accordion-add-tournament');
    expect(accordionAddTournament).toBeTruthy();
    accordionAddTournament.click();

    fixture.detectChanges();

    const tournamentForm = dom.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();
  });

  it('should be able to add a new tournament (in ui)', () => {
    const dom = fixture.nativeElement;

    component.tournamentList = [
    ];

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const tournamentForm = dom.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();

    const inputNewName = dom.querySelector('#input-new-name');
    inputNewName.value = tournamentName;
    inputNewName.dispatchEvent(new Event('input'));

    const inputNewTournamentDate = dom.querySelector('#input-new-tournament-date');
    inputNewTournamentDate.value = tournamentDate;
    inputNewTournamentDate.dispatchEvent(new Event('input'));

    const buttonAddTournament = dom.querySelector('#button-add-tournament');
    buttonAddTournament.click();

    expect(component.tournamentList.length).toBe(1);
    const addedTournament = component.tournamentList[0];
    expect(addedTournament.name).toBe(tournamentName);
    expect(addedTournament.tournamentDate).toBe(tournamentDate);
    expect(addedTournament['_links']['self']['href']).toBeTruthy();

    expect(component.inputNewName).toBe(null);
    expect(component.inputNewTournamentDate).toBe(null);
  });

  it('should be able to cancel the adding of tournament', () => {
    const dom = fixture.nativeElement;

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const tournamentForm = dom.querySelector('#new-tournament-form');
    expect(tournamentForm).toBeTruthy();

    const buttonAddTournament = dom.querySelector('#button-add-tournament-cancel');
    buttonAddTournament.click();

    const buttonStartAdd = dom.querySelector('#button-add-tournament-start');
    expect(buttonStartAdd).toBeFalsy();
  });

  it('should be able to load a list of tournaments', () => {
    //component.refreshTournamentList();
    //component.ngOnInit();
    expect(component.tournamentList.length).toBe(2);
  });

  it('should not have a box to display error message unless there is an error', () => {
    const dom = fixture.nativeElement;

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    const errorMessageBox = dom.querySelector('#input-error-message > div');

    expect(errorMessageBox).toBeFalsy();
  });

  it('should display error message if tournament addition fails', () => {
    const errorMessage = 'System Error: Please Try Again Later';

    mockTournamentService.addTournament.and.returnValue(throwError({
      message: errorMessage
    }));

    component.toggleNewTournamentForm();

    fixture.detectChanges();

    component.addTournament();
    expect(component.errorMessage).toContain(errorMessage);

    const dom = fixture.nativeElement;
    fixture.detectChanges();
    const errorMessageBox = dom.querySelector('#input-error-message > div');

    expect(errorMessageBox).toBeTruthy();
    expect(errorMessageBox.innerText).toContain(errorMessage);
  });

  it('should navigate to the event list page when a tournament is selected', () => {
    component.tournamentList = [
      {
        name: tournamentName,
        tournamentDate: tournamentDate,
        _links: {
          self: {
            href: tournamentLink
          }
        },
      },
    ];

    fixture.detectChanges();
    
    const dom = fixture.nativeElement;
    const tournamentItem = dom.querySelector('.tournament-item');

    expect(tournamentItem).toBeTruthy();

    const navigate = spyOn(router, 'navigate');

    expect(router).toBe(component.router);
    tournamentItem.click();

    expect(navigate).toHaveBeenCalled();
  });
});
