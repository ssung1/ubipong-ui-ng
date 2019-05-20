import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { TournamentListComponent } from '../tournament-list/tournament-list.component';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

describe('TournamentPageComponent', () => {
  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;
  let mockTournamentService: any;

  beforeEach(async(() => {
    mockTournamentService = jasmine.createSpyObj('mockTournamentService', ['createTournament']);

    TestBed.configureTestingModule({
      declarations: [
        TournamentPageComponent,
        TournamentListComponent,
        HeaderComponent,
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
      ],
      imports: [ FormsModule ],
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
