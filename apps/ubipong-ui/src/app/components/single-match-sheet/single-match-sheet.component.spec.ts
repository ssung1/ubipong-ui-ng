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
  })

  it('should have name of the round', () => {
    const roundName = 'Quarter Finals'

    component.roundName = roundName
    fixture.detectChanges()

    const roundNameElement = compiled.querySelector('.round-name')
    expect(roundNameElement).toBeTruthy()
    expect(roundNameElement.textContent).toBe(roundName)
  })

  it('should have names of the players', () => {
    const player1Name = 'SpongeBob'
    const player2Name = 'Patrick'

    component.player1Name = player1Name
    component.player2Name = player2Name
    fixture.detectChanges()

    const playerNameElementList = compiled.querySelectorAll('.player-name')
    expect(playerNameElementList).toBeTruthy()
    expect(playerNameElementList.length).toBeGreaterThan(1)
  })

  it('should have space to write down the scores', () => {
    const scoreElementList = compiled.querySelectorAll('.score')
    expect(scoreElementList).toBeTruthy()
    expect(scoreElementList.length).toBeGreaterThan(1)
  })
});
