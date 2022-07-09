import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleMatchSheetComponent } from '../../components/single-match-sheet/single-match-sheet.component';

import { SingleMatchSheetPageComponent } from './single-match-sheet-page.component';

describe('SingleMatchSheetPageComponent', () => {
  let component: SingleMatchSheetPageComponent;
  let compiled: any
  let fixture: ComponentFixture<SingleMatchSheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SingleMatchSheetPageComponent,
        SingleMatchSheetComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchSheetPageComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include four single match sheets', () => {
    const matchSheet = compiled.querySelectorAll('app-single-match-sheet')
    expect(matchSheet.length).toBe(4)
  })
});
