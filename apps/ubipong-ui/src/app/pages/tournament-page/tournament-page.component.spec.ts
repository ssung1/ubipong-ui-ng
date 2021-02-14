import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { of } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  const tournament = {
    id: tournamentId,
    name: "Eat Sleep Pong 2019",
    tournamentDate: "2019-06-23T00:00:00Z"
  }

  let component: TournamentPageComponent;
  let fixture: ComponentFixture<TournamentPageComponent>;

  let mockActivatedRoute: any
  let mockTournamentService: any
  let mockRouter: any

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
      addEvent: jest.fn().mockReturnValue(of(event)),
      getTournamentById: jest.fn().mockReturnValue(of(tournament)),
    }
    
    mockRouter = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    }

    await TestBed.configureTestingModule({
      declarations: [
        TournamentPageComponent,
        MainMenuComponent,
        EventListComponent,
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
      ],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
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

  it('should display tournament name as header', () => {
    component.refreshData()
    fixture.detectChanges()

    const header = fixture.nativeElement.querySelector('#tournament-page h1')
    expect(header.textContent).toBe(tournament.name)
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

    const compiled = fixture.nativeElement;
    compiled.querySelector('.button-round-robin-match-sheet').click();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rr-match-sheet'], {
      queryParams: {
        eventId: event.id
      }
    });
  })
})
