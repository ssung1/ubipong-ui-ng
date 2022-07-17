import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatNativeDateModule } from '@angular/material/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TournamentEvent } from '../../models/tournament-event'
import { EventStatus } from '../../models/event-status'

describe('EventCardComponent', () => {
  function formatTime(dateTime: string) {
    const timeWithDayPeriod = new Date(dateTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    } as Intl.DateTimeFormatOptions)
    const spaceIndex = timeWithDayPeriod.search(' ')
    return timeWithDayPeriod.substring(0, spaceIndex)
  }
  let component: EventCardComponent
  let fixture: ComponentFixture<EventCardComponent>
  let compiled: any

  const event: TournamentEvent = {
    id: 123,
    tournamentId: 234,
    name: 'Bikini Bottom Open 2019',
    challongeUrl: 'bb_201906_rr_pg_1',
    startTime: '2019-06-01T00:00:00.000Z',
    status: EventStatus.Started,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCardComponent],
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
        MatSidenavModule,
        MatListModule,
        MatNativeDateModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display event', () => {
    component.event = event
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card')
    expect(eventCard.querySelector('.event-name').textContent.trim()).toBe(event.name)
    expect(eventCard.querySelector('.event-status').textContent.trim()).toBe(event.status)
    const timeString = formatTime(event.startTime)
    expect(eventCard.querySelector('.event-start-time').textContent.trim()).toBe(timeString)
  })

  it('should emit event to view round robin match sheet', () => {
    component.event = event
    fixture.detectChanges()

    const buttonRoundRobinMatchSheet = compiled.querySelector('.button-round-robin-match-sheet')

    const viewRoundRobinMatchSheetEventSpy = jest.spyOn(
      component.viewRoundRobinMatchSheetEventEmitter, 'emit')

    expect(buttonRoundRobinMatchSheet.disabled).toBe(false)
    buttonRoundRobinMatchSheet.click()

    expect(viewRoundRobinMatchSheetEventSpy).toHaveBeenCalled()
  })

  it('should disable round robin match sheet if event has not started', () => {
    component.event = {
      ...event,
      status: EventStatus.Created,
    }
    fixture.detectChanges()

    const buttonRoundRobinMatchSheet = compiled.querySelector('.button-round-robin-match-sheet')

    expect(buttonRoundRobinMatchSheet.disabled).toBe(true)
  })

  it('should emit event to nagivate to event details if selected', () => {
    component.event = event
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card .event-name')

    const viewEventDetailsEventSpy = jest.spyOn(
      component.viewEventDetailsEventEmitter, 'emit')

    eventCard.click()

    expect(viewEventDetailsEventSpy).toHaveBeenCalled()
  })

  it('should not emit event to nagivate if only the challonge URL is selected', () => {
    component.event = event
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card .challonge-url')

    const viewEventDetailsEventSpy = jest.spyOn(
      component.viewEventDetailsEventEmitter, 'emit')

    eventCard.click()

    expect(viewEventDetailsEventSpy).not.toHaveBeenCalled()
  })
});
