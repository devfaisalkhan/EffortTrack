import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTracker } from './time-tracker';

describe('TimeTracker', () => {
  let component: TimeTracker;
  let fixture: ComponentFixture<TimeTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
