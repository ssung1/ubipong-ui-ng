import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';

import { MatMenuModule } from '@angular/material/menu'
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
import { MatToolbarModule } from '@angular/material/toolbar'
import { LayoutModule } from '@angular/cdk/layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule } from '@angular/material/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  let event = {
    id: 123,
    name: 'Bikini Bottom Open 2019',
    challongeUrl: 'bb_201906_rr_pg_1'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
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
        MatNativeDateModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display events', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const compiled = fixture.nativeElement

    expect(compiled.querySelector('.event-card-list .event-name').textContent.trim()).toBe(event.name)
  })

  it('should emit event to view round robin match sheet', () => {
    component.eventList = [event]
    fixture.detectChanges()

    const compiled = fixture.nativeElement

    const buttonRoundRobinMatchSheet = compiled.querySelector('.button-round-robin-match-sheet')

    const viewRoundRobinMatchSheetEventSpy = jest.spyOn(component.viewRoundRobinMatchSheetEvent, 'emit')

    expect(buttonRoundRobinMatchSheet.disabled).toBe(false)
    buttonRoundRobinMatchSheet.click()

    expect(viewRoundRobinMatchSheetEventSpy).toHaveBeenCalled()
  })
});
