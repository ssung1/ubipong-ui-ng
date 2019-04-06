import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayerListComponent } from './event-player-list.component';
import { FormsModule } from '@angular/forms';
import { Player } from 'src/app/models/player';

describe('EventPlayerListComponent', () => {
  let component: EventPlayerListComponent;
  let fixture: ComponentFixture<EventPlayerListComponent>;

  const player1Name = 'spongebob';
  const player1Club = 'atlantic ocean ttc';
  const player1Rating = 1001;

  const player2Name = 'buttercup';
  const player2Club = 'townsville ttc';
  const player2Rating = 2001;

  const newName = 'patrick';
  const newClub = 'atlantic ocean ttc';
  const newRating = 1234;

  const player1: Player = {
    name: player1Name,
    club: player1Club,
    rating: player1Rating
  };

  const player2: Player = {
    name: player2Name,
    club: player2Club,
    rating: player2Rating
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayerListComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new player when user hits the add button', () => {
    component.playerList = [];

    const dom = fixture.nativeElement;
    dom.querySelector('#input-new-name').value = newName;
    // have to fire the input event so that Angular would update the component
    dom.querySelector('#input-new-name').dispatchEvent(new Event('input'));
    dom.querySelector('#input-new-club').value = newClub;
    dom.querySelector('#input-new-club').dispatchEvent(new Event('input'));
    dom.querySelector('#input-new-rating').value = newRating;
    dom.querySelector('#input-new-rating').dispatchEvent(new Event('input'));
    dom.querySelector('#button-add-player').click();

    const newPlayer = component.playerList[0];
    expect(newPlayer.name).toBe(newName);
    expect(newPlayer.club).toBe(newClub);
    expect(newPlayer.rating).toBe(newRating);
  });

  it('should remove a player when user hits the delete button', () => {
    component.playerList = [ player1, player2 ];

    fixture.detectChanges();

    const dom = fixture.nativeElement;
    const deleteButton = dom.querySelector('#event-player-list input[type="button"]');
    expect(deleteButton.value).toBe('X');
    deleteButton.click();

    // only one player left
    expect(component.playerList.length).toBe(1);
    expect(component.playerList[0].name).toBe(player2Name);
  });
});
