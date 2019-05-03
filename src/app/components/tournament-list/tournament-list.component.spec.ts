import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentListComponent } from './tournament-list.component';

describe('TournamentListComponent', () => {
  const tournamentName = 'Summer Games 2019';
  const tournamentDate = '2019-06-20T12:00:00-0500';

  let component: TournamentListComponent;
  let fixture: ComponentFixture<TournamentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentListComponent ]
    })
    .compileComponents();
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

    const tournamentButon = dom.querySelector('.button-add-tournament-start');
    expect(tournamentButon).toBeTruthy();
    tournamentButon.click();

    const tournamentForm = dom.querySelector('.new-tournament-form');
    expect(tournamentForm).toBeTruthy();
  });

  it('should be able to add a new tournament', () => {
    const dom = fixture.nativeElement;

    const buttonStartAdd = dom.querySelector('.button-add-tournament-start');
    expect(buttonStartAdd).toBeTruthy();
    buttonStartAdd.click();

    const tournamentForm = dom.querySelector('.new-tournament-form');
    expect(tournamentForm).toBeTruthy();

    const inputNewName = dom.querySelector('#input-new-name');
    inputNewName.value = tournamentName;

    const inputNewTournamentDate = dom.querySelector('#input-new-tournament-date');
    inputNewTournamentDate.value = tournamentDate;
  });
});
