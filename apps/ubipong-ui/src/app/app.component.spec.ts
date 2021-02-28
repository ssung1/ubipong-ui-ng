import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { LayoutModule } from '@angular/cdk/layout'

import { RouterTestingModule } from '@angular/router/testing'

import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { TournamentListComponent } from './components/tournament-list/tournament-list.component'
import { UserService } from './services/user.service'

describe('AppComponent', () => {
  let mockUserService: any

  beforeEach(async () => {
    mockUserService = {
      isLoggedIn: jest.fn().mockResolvedValue(false),
    }

    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,        
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        ClipboardModule,
        DragDropModule,
        LayoutModule,

        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        MainMenuComponent,
        RoundRobinMatchSheetComponent,
        DashboardComponent,
        TournamentListComponent,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
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
});
