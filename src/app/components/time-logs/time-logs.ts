import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeLog, TimerService } from '../../services/timer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-time-logs',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './time-logs.html',
  styleUrl: './time-logs.scss'
})
export class TimeLogs implements OnInit {
  logs$: Observable<TimeLog[]>;
  filteredLogs$: Observable<TimeLog[]>;
  totalTime$: Observable<string>;
  filterDate!: string;

  constructor(private timerService: TimerService) {
    this.logs$ = this.timerService.logs$;
    this.filteredLogs$ = new Observable<TimeLog[]>(); 
    this.totalTime$ = new Observable<string>();
    this.filterDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  ngOnInit(): void {
    this.filterLogsByDay();
  }

  filterLogsByDay() {
    this.filteredLogs$ = this.timerService.filterLogsByDay(new Date(this.filterDate));
    this.totalTime$ = this.filteredLogs$.pipe(
      map(logs => {
        const totalMilliseconds = logs.reduce((acc, log) => {
          const durationParts = log.duration.split(':').map(part => parseInt(part, 10));
          const milliseconds = (durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]) * 1000;
          return acc + milliseconds;
        }, 0);

        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor(((totalMilliseconds % 3600000) % 60000) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      })
    );
  }

  clearLogs() {
    if (confirm('Are you sure you want to delete all time logs?')) {
      this.timerService.clearLogs();
    }
  }

  toggleEdit(log: TimeLog) {
    // Close any other editing rows
    this.filteredLogs$.subscribe(logs => {
      logs.forEach(l => {
        if (l !== log) {
          l.editing = false;
        }
      });
    });
    
    log.editing = true;
  }

  updateDescription(log: TimeLog, newDescription: string) {
    if (log.editing) {
      log.description = newDescription;
      log.editing = false;
      this.timerService.updateLog(log);
    }
  }
}