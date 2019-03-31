import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinMatchSheetComponent } from './round-robin-match-sheet.component';

describe('RoundRobinMatchSheetComponent', () => {
  let component: RoundRobinMatchSheetComponent;
  let fixture: ComponentFixture<RoundRobinMatchSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundRobinMatchSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinMatchSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
