import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from '../../components/event-list/event-list.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSelectHarness } from '@angular/material/select/testing'

describe('TournamentPageComponent', () => {
  const eventId = 101
  const challongeUrl = 'rr_201903_pg_1'
  const tournamentId = 1
  const eventName = 'Preliminary Group 1'
  const startTime = '2019-06-23T14:00:00.000Z'
  const event = {
    "id": eventId,
    "challongeUrl": challongeUrl,
    "name": eventName,
    "tournamentId": tournamentId,
    startTime,
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
  let loader: HarnessLoader

  let mockActivatedRoute: any
  let mockTournamentService: any
  let mockRouter: any
  let mockUserService: any
  let mockSnackBar: any

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

    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockResolvedValue('done')
    }

    mockSnackBar = {
      open: jest.fn()
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
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture)
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

  it('should be able to add new event', async () => {
    await fixture.whenStable()
    fixture.detectChanges()

    const nativeElement = fixture.nativeElement
    nativeElement.querySelector('#accordion-add-event').click()
    fixture.detectChanges()

    // after adding, we would have one more event
    mockTournamentService.getEventList.mockReturnValue(of([
      event, event
    ]))

    const newEventForm = nativeElement.querySelector('#new-event-form')
    expect(newEventForm).toBeTruthy()

    const buttonAddEvent = nativeElement.querySelector('#button-add-event')
    // no input, so the add button is disabled
    expect(buttonAddEvent.disabled).toBe(true)

    const inputNewName = nativeElement.querySelector('#input-new-name')
    expect(inputNewName).toBeTruthy()
    inputNewName.value = eventName
    inputNewName.dispatchEvent(new Event('input'))

    const inputNewChallongeUrl = nativeElement.querySelector('#input-new-challonge-url')
    expect(inputNewChallongeUrl).toBeTruthy()
    inputNewChallongeUrl.value = challongeUrl
    inputNewChallongeUrl.dispatchEvent(new Event('input'))

    const inputNewStartTime = await loader.getHarness(MatSelectHarness.with({
      selector: '#input-new-start-time'
    }))
    expect(inputNewStartTime).toBeTruthy()
    await inputNewStartTime.open()
    const inputNewStartTimeOptionHarnesses = await inputNewStartTime.getOptions()
    const inputNewStartTimeOptions = await Promise.all(
      inputNewStartTimeOptionHarnesses.map(o => o.getText()))
    expect(inputNewStartTimeOptions).toContainEqual('8:00am')
    expect(inputNewStartTimeOptions).toContainEqual('12:00pm')
    expect(inputNewStartTimeOptions).toContainEqual('5:00pm')
    await inputNewStartTime.clickOptions({
      text: '10:00am'
    })

    fixture.detectChanges()
    // with valid input, add button is enabled
    expect(buttonAddEvent.disabled).toBe(false)
    buttonAddEvent.click()

    expect(mockTournamentService.addEvent).toHaveBeenCalledWith({
      challongeUrl,
      name: eventName,
      tournamentId,
      startTime: startTime,
    })

    expect(component.eventList.length).toBe(2)
    const addedEvent = component.eventList[1]
    expect(addedEvent.name).toBe(eventName)
    expect(addedEvent.challongeUrl).toBe(challongeUrl)
    expect(addedEvent.id).toBe(eventId)
    expect(addedEvent.startTime).toBe(startTime)
  })

  it('should navigate to round robin grid page if user clicks on the monitor events button', () => {
    component.eventList.push(event)

    fixture.detectChanges();

    expect(component.hasEvents).toBe(true)

    const compiled = fixture.nativeElement;
    const buttonRoundRobinPage = compiled.querySelector('#view-round-robin-page')
    expect(buttonRoundRobinPage.disabled).toBe(false)
    buttonRoundRobinPage.click();

    expect(mockRouter.navigate).toHaveBeenCalled()
  })

  it('should not allow user to monitor events if there are no events', () => {
    component.eventList = []

    fixture.detectChanges();
    
    expect(component.hasEvents).toBe(false)

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#view-round-robin-page').disabled).toBe(true)
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

  it('should allow user to add event if user is logged in', async () => {
    await fixture.whenStable()
    fixture.detectChanges()

    const addEvent = fixture.nativeElement.querySelector('#accordion-add-event')
    expect(addEvent).toBeTruthy()
  })

  it('should not allow user to add events if user is not logged in', async () => {
    mockUserService.isLoggedIn.mockResolvedValue(false)
    component.ngOnInit()
    await fixture.whenStable()
    fixture.detectChanges()

    const addTournament = fixture.nativeElement.querySelector('#accordion-add-event')
    expect(addTournament).toBeFalsy()
  })

  it('should display error message if event addition fails', () => {
    const errorMessage = 'System Error: Please Try Again Later'

    mockTournamentService.addEvent.mockReturnValue(throwError({
      message: errorMessage
    }))

    component.toggleNewEventForm()

    fixture.detectChanges()

    component.addEvent()

    fixture.detectChanges()
    expect(mockSnackBar.open).toHaveBeenCalled()
  })

  it('should not display event form until tournament information is retrieved', () => {
    // await fixture.whenStable()
    component.tournament = null
    fixture.detectChanges()

    const nativeElement = fixture.nativeElement
    const accordianAddEvent = nativeElement.querySelector('#accordion-add-event')
    expect(accordianAddEvent).toBeFalsy()
  })
})
