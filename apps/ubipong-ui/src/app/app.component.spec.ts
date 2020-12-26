import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        FormsModule,
      ],
      declarations: [
        AppComponent,
        MainMenuComponent,
        RoundRobinMatchSheetComponent,
        TournamentPageComponent,
        TournamentListComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ubipong-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ubipong-ui');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to ubipong-ui!'
    );
  });
});
