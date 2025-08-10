import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogs } from './time-logs';

describe('TimeLogs', () => {
  let component: TimeLogs;
  let fixture: ComponentFixture<TimeLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
