import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { of } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MainMenuComponent } from '../../components/main-menu/main-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventListComponent } from '../../components/event-list/event-list.component';

describe('TournamentPageComponent', () => {
  const eventId = 101
  const challongeUrl = 'rr_201903_pg_1'
  const tournamentId = 1
  const eventName = 'Preliminary Group 1'
  const event = {
    "id": eventId,
    "challongeUrl": challongeUrl,
    "name": eventName,
    "tournamentId": tournamentId,
    "challongeTournament": null,
    "_links": {
      "self": {
        "href": "http://localhost:8080/crud/events/1"
      },
      "event": {
        "href": "http://localhost:8080/crud/events/1"
      }
    }
  }
  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;

  let mockActivatedRoute: any
  let mockTournamentService: any

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: jest.fn().mockReturnValue(tournamentId)
        }
      }
    }

    mockTournamentService = {
      getEventList: jest.fn().mockReturnValue(of([event])),
      addEvent: jest.fn().mockReturnValue(of(event))
    }

    await TestBed.configureTestingModule({
      declarations: [
        TournamentPageComponent,
        MainMenuComponent,
        EventListComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
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
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of events in the tournament', () => {
    component.refreshData()
    fixture.detectChanges()

    const eventNameElement = fixture.nativeElement.querySelector('.event-name')
    expect(eventNameElement.textContent).toBe(eventName)
    const challongeUrlElement = fixture.nativeElement.querySelector('.challonge-url')
    expect(challongeUrlElement.textContent).toBe(challongeUrl)
  })

  it('should be able to add new event', () => {
    const nativeElement = fixture.nativeElement
    nativeElement.querySelector('#accordion-add-event').click()
    fixture.detectChanges()

    // after adding, we would have one more event
    mockTournamentService.getEventList.mockReturnValue(of([
      event, event
    ]))

    const newEventForm = nativeElement.querySelector('#new-event-form')
    expect(newEventForm).toBeTruthy()

    const inputNewName = nativeElement.querySelector('#input-new-name')
    inputNewName.value = eventName
    inputNewName.dispatchEvent(new Event('input'))
    const inputNewChallongeUrl = nativeElement.querySelector('#input-new-challonge-url')
    inputNewChallongeUrl.value = challongeUrl
    inputNewChallongeUrl.dispatchEvent(new Event('input'))

    const buttonAddEvent = nativeElement.querySelector('#button-add-event')
    buttonAddEvent.click()

    expect(mockTournamentService.addEvent).toHaveBeenCalledWith({
      challongeUrl,
      name: eventName,
      tournamentId,
    })

    expect(component.eventList.length).toBe(2)
    const addedEvent = component.eventList[1]
    expect(addedEvent.name).toBe(eventName)
    expect(addedEvent.challongeUrl).toBe(challongeUrl)
    expect(addedEvent.id).toBe(eventId)
  })

  it('should navigate to round robin grid page if user clicks on the monitor events button', () => {
    component.eventList.push(event)

    fixture.detectChanges();

    const navigateToRoundRobinPageSpy = jest.spyOn(component, 'navigateToRoundRobinPage');

    const compiled = fixture.nativeElement;
    compiled.querySelector('#view-round-robin-page').click();

    expect(navigateToRoundRobinPageSpy).toHaveBeenCalled();
  })

  it('should navigate to round robin match list page if user clicks on the view match sheets button', () => {
    component.eventList.push(event)

    fixture.detectChanges();

    const navigateToRoundRobinMatchSheetSpy = jest.spyOn(component, 'navigateToRoundRobinMatchSheet')

    const compiled = fixture.nativeElement;
    compiled.querySelector('.button-round-robin-match-sheet').click();

    expect(navigateToRoundRobinMatchSheetSpy).toHaveBeenCalled();
  })
})
