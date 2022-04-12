import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageComponent } from './event-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsComponent } from '../../components/event-details/event-details.component';
import { of, throwError } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainMenuComponent } from '../../components/main-menu/main-menu.component';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatNativeDateModule } from '@angular/material/core'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSelectHarness } from '@angular/material/select/testing'

describe('EventPageComponent', () => {
  const event = {
    id: 1,
    name: 'Test Event',
    challongeUrl: 'bb_201906_pg_rr_1',
    status: 'pending',
    startTime: '2020-01-01T12:00:00.000Z'
  }

  let component: EventPageComponent
  let fixture: ComponentFixture<EventPageComponent>

  let mockUserService: any
  let mockActivatedRoute: any
  let mockTournamentService: any
  let mockSnackBar: any

  beforeEach(async () => {
    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockResolvedValue('done')
    }

    mockActivatedRoute = {
      queryParamMap: of({
        get: jest.fn().mockReturnValue(event.id)
      })
    }

    mockTournamentService = {
      getEvent: jest.fn().mockReturnValue(of(event)),
      updateEvent: jest.fn().mockReturnValue(of(event)),
    }

    mockSnackBar = {
      open: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [
        EventPageComponent,
        MainMenuComponent,
        EventDetailsComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
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
        MatNativeDateModule,
        MatSidenavModule,
        MatListModule,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TournamentService, useValue: mockTournamentService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should display event name', () => {
    expect(component).toBeTruthy()

    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent)
      .toContain(component.event.name)
  })

  it('should contain event details', () => {
    const compiled = fixture.debugElement.nativeElement
    const eventDetails = compiled.querySelector('app-event-details')
    expect(eventDetails).toBeTruthy()
  })

  it('should call tournamentService when it receives the update event', () => {
    const compiled = fixture.nativeElement
    const buttonEnableEditing = compiled.querySelector('app-event-details button.enable-editing')
    expect(buttonEnableEditing).toBeTruthy()

    buttonEnableEditing.click()

    fixture.detectChanges()
    const buttonSubmitEvent = compiled.querySelector('.edit-panel .submit-event')
    expect(buttonSubmitEvent).toBeTruthy()

    buttonSubmitEvent.click()
    expect(mockTournamentService.updateEvent).toHaveBeenCalledWith({
      ...event,
      startTime: null
    })
  })
})
