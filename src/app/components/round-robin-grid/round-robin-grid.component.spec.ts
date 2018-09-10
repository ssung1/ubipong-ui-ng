import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinGridComponent } from './round-robin-grid.component';

describe('RoundRobinGridComponent', () => {
  let component: RoundRobinGridComponent;
  let fixture: ComponentFixture<RoundRobinGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundRobinGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh', (done) => {
    component.refreshIntervalTime = 100;
    component.initRefreshInterval();
    const refreshData = spyOn(component, "refreshData");
    setTimeout(() => {
      expect(refreshData).toHaveBeenCalled();
      setTimeout(() => {
        expect(refreshData).toHaveBeenCalled();
        done();
      }, component.refreshIntervalTime + 100);
    }, component.refreshIntervalTime + 100);
  });

  it('should rotate round robin groups', () => {
    component.eventList = ["1", "2", "3"];
    component.eventIndex = 0;
    component.refreshData();
    expect(component.eventIndex).toBe(1);
    component.refreshData();
    expect(component.eventIndex).toBe(2);
    component.refreshData();
    expect(component.eventIndex).toBe(0);
  });
});
