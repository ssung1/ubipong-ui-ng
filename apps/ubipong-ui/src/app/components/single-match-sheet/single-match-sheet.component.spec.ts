import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchSheetComponent } from './single-match-sheet.component';

describe('SingleMatchSheetComponent', () => {
  let component: SingleMatchSheetComponent;
  let fixture: ComponentFixture<SingleMatchSheetComponent>;
  let compiled: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleMatchSheetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchSheetComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name of the event', () => {
    const eventName = 'Championship'

    component.eventName = eventName
    fixture.detectChanges()

    const eventNameElement = compiled.querySelector('.event-name')
    expect(eventNameElement).toBeTruthy()
    expect(eventNameElement.textContent).toBe(eventName)
    expect(eventNameElement.dataset.name).toBe(eventName)
  })

  it('should have name of the round', () => {
    const roundName = 'Quarter Finals'

    component.roundName = roundName
    fixture.detectChanges()

    const roundNameElement = compiled.querySelector('.round-name')
    expect(roundNameElement).toBeTruthy()
    expect(roundNameElement.textContent).toBe(roundName)
    expect(roundNameElement.dataset.name).toBe(roundName)
  })

  it('should have names of the players', () => {
    const player1Name = 'SpongeBob'
    const player2Name = 'Patrick'

    component.player1Name = player1Name
    component.player2Name = player2Name
    fixture.detectChanges()

    const player1NameElement = compiled.querySelector(`.player-name[data-name="${player1Name}"]`)
    expect(player1NameElement).toBeTruthy()
    expect(player1NameElement.textContent).toBe(player1Name)
    const player2NameElement = compiled.querySelector(`.player-name[data-name="${player2Name}"]`)
    expect(player2NameElement).toBeTruthy()
    expect(player2NameElement.textContent).toBe(player2Name)
  })

  it('should have space to write down the scores', () => {
    const gameCount = 7
    component.gameCount = gameCount 

    fixture.detectChanges()

    const scoreElementList = compiled.querySelectorAll('.score')
    expect(scoreElementList).toBeTruthy()
    expect(scoreElementList.length).toBe(gameCount * 2)
  })

  it('should auto-correct number of games to an odd number', () => {
    // even game count would be incremented by 1
    const gameCount = 6
    component.gameCount = gameCount 

    fixture.detectChanges()

    const scoreElementList = compiled.querySelectorAll('.score')
    expect(scoreElementList).toBeTruthy()
    expect(scoreElementList.length).toBe((gameCount + 1) * 2)
  })
});
