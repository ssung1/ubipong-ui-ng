import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayerListComponent } from './event-player-list.component';

describe('EventPlayerListComponent', () => {
  let component: EventPlayerListComponent;
  let fixture: ComponentFixture<EventPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayerListComponent ]
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
});
