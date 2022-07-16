import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
import { EventCardComponent } from '../event-card/event-card.component';

describe('EventListComponent', () => {
  const locale = 'en-US'
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }
  let mockUserService: any
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let compiled: any

  const event: TournamentEvent = {
    id: 123,
    tournamentId: 234,
    name: 'Bikini Bottom Open 2019',
    challongeUrl: 'bb_201906_rr_pg_1',
    startTime: '2019-06-01T00:00:00.000Z',
    status: EventStatus.Started,
  } as const

  beforeEach(async () => {
    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockResolvedValue('done')
    }
    await TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
        EventCardComponent,
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
        MatSidenavModule,
        MatListModule,
        MatNativeDateModule,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display events', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card-list mat-card')
    expect(eventCard.querySelector('.event-name').textContent.trim()).toBe(event.name)
    expect(eventCard.querySelector('.event-status').textContent.trim()).toBe(event.status)
    const timeString = new Date(event.startTime).toLocaleString(locale, timeFormat)
    expect(eventCard.querySelector('.event-start-time').textContent.trim()).toBe(timeString)
  })

  it('should emit event to view round robin match sheet', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const buttonRoundRobinMatchSheet = compiled.querySelector('.button-round-robin-match-sheet')

    const viewRoundRobinMatchSheetEventSpy = jest.spyOn(
      component.viewRoundRobinMatchSheetEventEmitter, 'emit')

    expect(buttonRoundRobinMatchSheet.disabled).toBe(false)
    buttonRoundRobinMatchSheet.click()

    expect(viewRoundRobinMatchSheetEventSpy).toHaveBeenCalled()
  })

  it('should disable round robin match sheet if event has not started', () => {
    component.eventList = [{
      ...event,
      status: EventStatus.Created,
    }]
    fixture.detectChanges()

    const buttonRoundRobinMatchSheet = compiled.querySelector('.button-round-robin-match-sheet')

    expect(buttonRoundRobinMatchSheet.disabled).toBe(true)
  })

  it('should emit event to nagivate to event details if selected', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card-list .event-card .event-name')

    const viewEventDetailsEventSpy = jest.spyOn(
      component.viewEventDetailsEventEmitter, 'emit')

    eventCard.click()

    expect(viewEventDetailsEventSpy).toHaveBeenCalled()
  })

  it('should not emit event to nagivate if only the challonge URL is selected', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const eventCard = compiled.querySelector('.event-card-list .event-card .challonge-url')

    const viewEventDetailsEventSpy = jest.spyOn(
      component.viewEventDetailsEventEmitter, 'emit')

    eventCard.click()

    expect(viewEventDetailsEventSpy).not.toHaveBeenCalled()
  })
})
