import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayerListComponent } from './event-player-list.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service'

import { Player } from '../../models/player';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { MatMenuModule } from '@angular/material/menu'
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
import { MatToolbarModule } from '@angular/material/toolbar'
import { LayoutModule } from '@angular/cdk/layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('EventPlayerListComponent', () => {
  let mockUserService: any

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

  beforeEach(async () => {
    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockResolvedValue('done')
    }
    TestBed.configureTestingModule({
      declarations: [
        EventPlayerListComponent,
        MainMenuComponent,
      ],
      imports: [
        FormsModule,
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
        { provide: UserService, useValue: mockUserService }
      ],
    })
    .compileComponents();
  });

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

  it('should set number of groups to 4 if there are 16 players and group size is 4', () => {
    component.playerList = [
      player1, player2, player1, player2,
      player1, player2, player1, player2,
      player1, player2, player1, player2,
      player1, player2, player1, player2,
    ];

    expect(component.calculateNumberOfGroups(4)).toBe(4);
  });

  it('should set number of groups to 3 if there are 9 players and group size is 4', () => {
    component.playerList = [
      player1, player2, player1, player2,
      player1, player2, player1, player2,
      player1, 
    ];

    expect(component.calculateNumberOfGroups(4)).toBe(3);
  });

  it('should correctly create the round robin groups - empty list', () => {
    component.playerList = [
    ];
    component.createGroupList(4);

    expect(component.roundRobinGroupList.length).toBe(0);
  });

  it('should correctly create the round robin groups - singleton list', () => {
    component.playerList = [
      player1,
    ];
    component.createGroupList(4);

    expect(component.roundRobinGroupList.length).toBe(1);
  });

  it('should correctly create the round robin groups - two players into two groups', () => {
    component.playerList = [
      player1, player2
    ];
    component.createGroupList(1);

    expect(component.roundRobinGroupList.length).toBe(2);
    expect(component.roundRobinGroupList[0].playerList[0].name).toBe(player1Name);
    expect(component.roundRobinGroupList[1].playerList[0].name).toBe(player2Name);
  });

  it('should correctly create the round robin groups - three players into two groups', () => {
    component.playerList = [
      player1, player2, player1
    ];
    component.createGroupList(2);

    expect(component.roundRobinGroupList.length).toBe(2);

    // group1 should have player1
    // group2 should have player2, player1
    expect(component.roundRobinGroupList[0].playerList[0].name).toBe(player1Name);
    expect(component.roundRobinGroupList[1].playerList[0].name).toBe(player2Name);
    expect(component.roundRobinGroupList[1].playerList[1].name).toBe(player1Name);
  });

  it('should get the correct group size', () => {
    const groupSize = 5;
    const dom = fixture.nativeElement;
    dom.querySelector('#input-group-size').value = groupSize;

    const createGroupList = spyOn(component, 'createGroupList').and.stub();
    dom.querySelector('#button-make-groups').click();
    expect(createGroupList).toHaveBeenCalledWith(groupSize.toString());
  });

  it('should create round robin groups when user clicks on the make group button', () => {
    component.playerList = [
      player1
    ];

    const dom = fixture.nativeElement;
    dom.querySelector('#input-group-size').value = "1";
    dom.querySelector('#button-make-groups').click();

    fixture.detectChanges();

    const player = dom.querySelector('div.group-list table tr:nth-child(3) > td:nth-child(1)');
    expect(player.textContent).toBe(player1.name);
  });

  it('should not sort players by rating if option is turned off', () => {
    component.sortedByRating = false;

    component.playerList = [];

    component.addPlayer(player1Name, player1Club, player1Rating.toString());
    expect(component.playerList.length).toBe(1);
    expect(component.playerList[0].name).toBe(player1Name);

    component.addPlayer(player2Name, player2Club, player2Rating.toString());
    expect(component.playerList.length).toBe(2);
    expect(component.playerList[0].name).toBe(player1Name);
    expect(component.playerList[1].name).toBe(player2Name);
  });

  it('should sort players by rating if option is turned on', () => {
    component.sortedByRating = true;

    component.playerList = [];

    component.addPlayer(player1Name, player1Club, player1Rating.toString());
    expect(component.playerList.length).toBe(1);
    expect(component.playerList[0].name).toBe(player1Name);

    component.addPlayer(player2Name, player2Club, player2Rating.toString());
    expect(component.playerList.length).toBe(2);
    // player 2 has higher rating and should be placed before player 1
    expect(player2Rating).toBeGreaterThan(player1Rating);
    expect(component.playerList[0].name).toBe(player2Name);
    expect(component.playerList[1].name).toBe(player1Name);
  });

  it('should turn on/off sort-by-rating option as user clicks on the checkbox', () => {
    component.sortedByRating = true;

    const dom = fixture.nativeElement;
    const checkbox = dom.querySelector('#checkbox-sorted-by-rating');

    fixture.detectChanges();
    expect(checkbox.checked).toBe(true);

    checkbox.click();

    expect(checkbox.checked).toBe(false);
    expect(component.sortedByRating).toBe(false);
  });

  it('should create a string that contains all the players in a group', () => {
    component.playerList = [player1, player2];
    component.createGroupList(2);
    const playerString = component.getAllPlayersAsString(component.roundRobinGroupList[0]);

    expect(playerString).toBe(player1Name + '\n' + player2Name);
  })
});
