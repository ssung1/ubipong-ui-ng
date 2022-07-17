import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
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
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {By} from '@angular/platform-browser';

describe('EventListComponent', () => {
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
    await TestBed.configureTestingModule({
      declarations: [
        EventListComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    component.eventList = [event]
    fixture.detectChanges();
  });

  function findEventCardElement() {
    return fixture.debugElement.query(By.css('app-event-card'))
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display event through the event-card component (app-event-card)', () => {
    const eventCardElement = findEventCardElement()
    expect(eventCardElement).toBeTruthy()
    expect(eventCardElement.properties['event']).toEqual(event)
  })

  it('should relay the event to view round robin match sheet', () => {
    const eventCardElement = findEventCardElement()
    expect(eventCardElement).toBeTruthy()

    const viewRoundRobinMatchSheetEventSpy = jest.spyOn(
      component.viewRoundRobinMatchSheetEventEmitter, 'emit')
    eventCardElement.triggerEventHandler('viewRoundRobinMatchSheet', event)
    expect(viewRoundRobinMatchSheetEventSpy).toHaveBeenCalled()
  })

  it('should relay the event to nagivate to event details', () => {
    const eventCardElement = findEventCardElement()
    expect(eventCardElement).toBeTruthy()

    const viewEventDetailsEventSpy = jest.spyOn(
      component.viewEventDetailsEventEmitter, 'emit')
    eventCardElement.triggerEventHandler('viewEventDetails', event)
    expect(viewEventDetailsEventSpy).toHaveBeenCalled()
  })
})
