import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog, TimerService } from '../../services/timer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-logs',
  imports: [CommonModule, FormsModule],
  templateUrl: './time-logs.html',
  styleUrl: './time-logs.scss'
})
export class TimeLogs implements OnInit {
  logs$: Observable<TimeLog[]>;
  filteredLogs$: Observable<TimeLog[]>;
  filterDate: string;

  constructor(private timerService: TimerService) {
    this.logs$ = this.timerService.logs$;
    this.filteredLogs$ = new Observable<TimeLog[]>();
    this.filterDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.filterLogsByDay();
  }

  filterLogsByDay() {
    this.filteredLogs$ = this.timerService.filterLogsByDay(new Date(this.filterDate));
  }

  clearLogs() {
    if (confirm('Are you sure you want to delete all time logs?')) {
      this.timerService.clearLogs();
    }
  }
}
