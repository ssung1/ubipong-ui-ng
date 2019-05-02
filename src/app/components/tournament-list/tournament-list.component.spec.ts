import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentListComponent } from './tournament-list.component';

describe('TournamentListComponent', () => {
  const tournamentName = 'Summer Games 2019';

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
        tournamentDate: '2019-06-20T12:00:00-0500'
      }
    ];

    fixture.detectChanges();
    
    const dom = fixture.nativeElement;
    const tournamentItem = dom.querySelector('.tournament-item');

    expect(tournamentItem).toBeTruthy();
    expect(tournamentItem.textContent).toContain(tournamentName);
  })
});
