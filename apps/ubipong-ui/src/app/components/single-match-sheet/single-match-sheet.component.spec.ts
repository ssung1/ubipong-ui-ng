import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchSheetComponent } from './single-match-sheet.component';

describe('SingleMatchSheetComponent', () => {
  let component: SingleMatchSheetComponent;
  let fixture: ComponentFixture<SingleMatchSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleMatchSheetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
