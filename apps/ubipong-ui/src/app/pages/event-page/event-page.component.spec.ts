import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageComponent } from './event-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEditorComponent } from '../../components/event-editor/event-editor.component';
import { of } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
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

describe('EventPageComponent', () => {
  const event = {
    id: 1,
    name: 'Test Event',
    challongeUrl: 'bb_201906_pg_rr_1',
    status: 'pending',
    // the time here should be set to a time that is included in the time-dropdown
    // if we don't, we end up with a null startTime
    startTime: '2020-01-01T17:00:00.000Z'
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
        EventEditorComponent,
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
      .toContain(component.event?.name)
  })

  it('should contain event editor if editing is enabled', async () => {
    await fixture.whenStable()
    expect(component.isLoggedIn).toBe(true)

    fixture.detectChanges()

    const compiled = fixture.nativeElement
    const buttonToggleEventEditor = compiled.querySelector('.button-toggle-event-editor')
    expect(buttonToggleEventEditor).toBeTruthy()
    buttonToggleEventEditor.click()

    fixture.detectChanges()

    const eventEditor = compiled.querySelector('app-event-editor')
    expect(eventEditor).toBeTruthy()
  })

  it('should call tournamentService when it receives the update event', async () => {
    await fixture.whenStable()
    expect(component.isLoggedIn).toBe(true)

    fixture.detectChanges()

    const compiled = fixture.nativeElement
    const buttonToggleEventEditor = compiled.querySelector('.button-toggle-event-editor')
    expect(buttonToggleEventEditor).toBeTruthy()
    buttonToggleEventEditor.click()

    fixture.detectChanges()

    const buttonSubmitEvent = compiled.querySelector('.event-editor .submit-event')
    expect(buttonSubmitEvent).toBeTruthy()

    buttonSubmitEvent.click()
    expect(mockTournamentService.updateEvent).toHaveBeenCalledWith(event)
  })

  it('should close event editor when edit button is clicked while editor is shown', async () => {
    await fixture.whenStable()
    expect(component.isLoggedIn).toBe(true)

    fixture.detectChanges()

    const compiled = fixture.nativeElement
    const buttonToggleEventEditor = compiled.querySelector('.button-toggle-event-editor')
    expect(buttonToggleEventEditor).toBeTruthy()
    buttonToggleEventEditor.click()

    fixture.detectChanges()

    const eventEditor = compiled.querySelector('app-event-editor')
    expect(eventEditor).toBeTruthy()

    buttonToggleEventEditor.click()

    fixture.detectChanges()
    const eventEditorClosed = compiled.querySelector('app-event-editor')
    expect(eventEditorClosed).toBeFalsy()
  })

  it('should close event editor when cancel button is clicked', async () => {
    await fixture.whenStable()
    expect(component.isLoggedIn).toBe(true)

    fixture.detectChanges()

    const compiled = fixture.nativeElement
    const buttonToggleEventEditor = compiled.querySelector('.button-toggle-event-editor')
    expect(buttonToggleEventEditor).toBeTruthy()
    buttonToggleEventEditor.click()

    fixture.detectChanges()

    const eventEditor = compiled.querySelector('app-event-editor')
    expect(eventEditor).toBeTruthy()

    const buttonCancelEvent = compiled.querySelector('.event-editor .cancel-event')
    expect(buttonCancelEvent).toBeTruthy()

    buttonCancelEvent.click()

    fixture.detectChanges()
    const eventEditorClosed = compiled.querySelector('app-event-editor')
    expect(eventEditorClosed).toBeFalsy()
  })
})
