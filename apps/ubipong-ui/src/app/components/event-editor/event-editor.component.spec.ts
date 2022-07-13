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
import { MatNativeDateModule } from '@angular/material/core'

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSelectHarness } from '@angular/material/select/testing'

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EventEditorComponent } from './event-editor.component'

import { TournamentEvent } from '../../models/tournament-event'
import { EventTime } from '../../models/event-time'
import { EventStatus } from '../../models/event-status'

describe('EventEditorComponent', () => {
  const eventId = 123
  const event: TournamentEvent = {
    id: eventId,
    name: 'Preliminary Group 1',
    challongeUrl: 'bb_201906_rr_pg_1',
    status: EventStatus.Started,
    startTime: '2021-05-03T12:00:00.000Z',
    tournamentId: 234,
  }

  // we are editing event into newEvent
  const newEvent: TournamentEvent = {
    id: eventId,
    name: 'Preliminary Group 2',
    challongeUrl: 'bb_201906_rr_pg_1',
    status: EventStatus.Started,
    startTime: '2021-05-03T14:00:00.000Z',
    tournamentId: 234,
  }

  let component: EventEditorComponent
  let fixture: ComponentFixture<EventEditorComponent>
  let loader: HarnessLoader

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEditorComponent ],
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
        MatNativeDateModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditorComponent);
    component = fixture.componentInstance;
    component.event = event
    fixture.detectChanges()
    loader = TestbedHarnessEnvironment.loader(fixture)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function editEventName() {
    const inputEventName = fixture.nativeElement.querySelector('input.event-name')
    expect(inputEventName).toBeTruthy()
    expect(inputEventName.value).toBe(component.event?.name ?? '')
    inputEventName.value = newEvent.name
    inputEventName.dispatchEvent(new Event('input'))
  }

  function editChallongUrl() {
    const inputChallongeUrl = fixture.nativeElement.querySelector('input.challonge-url')
    expect(inputChallongeUrl).toBeTruthy()
    expect(inputChallongeUrl.value).toBe(component.event?.challongeUrl ?? '')
    inputChallongeUrl.value = newEvent.challongeUrl
    inputChallongeUrl.dispatchEvent(new Event('input'))
  }

  function editStartDate() {
    const inputStartDate = fixture.nativeElement.querySelector('input.start-date')
    expect(inputStartDate).toBeTruthy()
    // material date picker sets displayed value to local date format
    const startTime = component.event?.startTime
    if (startTime) {
      expect(inputStartDate.value).toBe(new Date(startTime).toLocaleDateString())
    } else {
      expect(inputStartDate.value).toBe('')
    }
    inputStartDate.value = newEvent.startTime
    inputStartDate.dispatchEvent(new Event('input'));
  }

  async function editStartTime() {
    const inputStartTime = await loader.getHarness(MatSelectHarness.with({
      selector: '.start-time'
    }))
    expect(inputStartTime).toBeTruthy()
    await inputStartTime.open()
    const startTime = component.event?.startTime
    if (startTime) {
      const startHour = new Date(startTime).getHours()
      const startMinute = new Date(startTime).getMinutes()
      expect(await inputStartTime.getValueText()).toBe(new EventTime({
        hour: startHour,
        minute: startMinute,
      }).display)
    } else {
      // if not provided, set time to a default value
      expect(await inputStartTime.getValueText()).toBe('8:00am')
    }
    const inputStartTimeOptionHarnesses = await inputStartTime.getOptions()
    const inputStartTimeOptions = await Promise.all(
      inputStartTimeOptionHarnesses.map(o => o.getText()))
    expect(inputStartTimeOptions).toContainEqual('8:00am')
    expect(inputStartTimeOptions).toContainEqual('12:00pm')
    expect(inputStartTimeOptions).toContainEqual('5:00pm')
    // click based on newEvent.startTime, but need to convert to timezone of the test runner
    const newStartHour = new Date(newEvent.startTime).getHours()
    const newStartMinute = new Date(newEvent.startTime).getMinutes()

    await inputStartTime.clickOptions({
      text: new EventTime({
        hour: newStartHour,
        minute: newStartMinute,
      }).display
    })
  }

  it('should allow user to edit event', async () => {
    editEventName()
    editStartDate()
    await editStartTime()

    fixture.detectChanges()
    const buttonSubmitEvent = fixture.nativeElement.querySelector('button.submit-event')
    expect(buttonSubmitEvent).toBeTruthy()

    // event emitter
    const submitEventSpy = jest.spyOn(component.submitFormEventEmitter, 'emit')
    buttonSubmitEvent.click()
    const emittedEvent = submitEventSpy.mock.calls[0][0]
    expect(emittedEvent.name).toBe(newEvent.name)
    expect(emittedEvent.startTime).toBe(newEvent.startTime)
    expect(emittedEvent.challongeUrl).toBe(newEvent.challongeUrl)
  })

  it('should allow user to add new event', async () => {
    component.event = null
    component.ngOnInit()

    editEventName()
    editChallongUrl()
    editStartDate()
    await editStartTime()

    const buttonSubmitEvent = fixture.nativeElement.querySelector('button.submit-event')
    expect(buttonSubmitEvent).toBeTruthy()

    // event emitter
    const submitEventSpy = jest.spyOn(component.submitFormEventEmitter, 'emit')
    buttonSubmitEvent.click()
    const emittedEvent = submitEventSpy.mock.calls[0][0]
    expect(emittedEvent.name).toBe(newEvent.name)
    expect(emittedEvent.startTime).toBe(newEvent.startTime)
    expect(emittedEvent.challongeUrl).toBe(newEvent.challongeUrl)
  })

  it('should allow user to cancel editing by activating the cancel button', async () => {
    const buttonCancelEvent = fixture.nativeElement.querySelector('button.cancel-event')
    const submitEventSpy = jest.spyOn(component.cancelFormEventEmitter, 'emit')

    buttonCancelEvent.click()

    fixture.detectChanges()

    expect(submitEventSpy).toHaveBeenCalledWith(event)
  })
})
