import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-tracker',
  imports: [CommonModule],
  templateUrl: './time-tracker.html',
  styleUrl: './time-tracker.scss'
})
export class TimeTracker {
    isRunning$: Observable<boolean>;
    time$: Observable<string>;

    constructor(private timerService: TimerService) {
      this.isRunning$ = this.timerService.isRunning$;
    this.time$ = this.timerService.time$;

    }
startTimer() {
    this.timerService.startTimer();
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
