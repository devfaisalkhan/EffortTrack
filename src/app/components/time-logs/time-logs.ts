import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog, TimerService } from '../../services/timer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-logs',
  imports: [CommonModule],
  templateUrl: './time-logs.html',
  styleUrl: './time-logs.scss'
})
export class TimeLogs {
  logs$: Observable<TimeLog[]>;
  constructor(private timerService: TimerService) {
    this.logs$ = this.timerService.logs$;
  }
}
