import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPageComponent } from './tournament-page.component';
import { of } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

describe('TournamentPageComponent', () => {
  const eventId = 101
  const challongeUrl = 'rr_201903_pg_1'
  const tournamentId = 1
  const eventName = 'Preliminary Group 1'
  const event = {
    "eventId": eventId,
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

  let mockActivatedRoute
  let mockTournamentService

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
      declarations: [ TournamentPageComponent ],
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
    expect(addedEvent.eventId).toBe(eventId)
  })
})
