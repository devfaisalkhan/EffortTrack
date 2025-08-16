import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TimeLog {
  start: Date;
  end: Date;
  duration: string;
  description: string;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerRunning = false;
  private startTime: Date | null = null;
  private timerSubscription: any;

  private timeSubject = new BehaviorSubject<string>('00:00:00');
  private logsSubject = new BehaviorSubject<TimeLog[]>([]);
  private isRunningSubject = new BehaviorSubject<boolean>(false);

  time$ = this.timeSubject.asObservable();
  logs$ = this.logsSubject.asObservable();
  isRunning$ = this.isRunningSubject.asObservable();

  constructor() {
    this.loadLogs();
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.isRunningSubject.next(true);
      this.startTime = new Date();
      this.timerSubscription = interval(1000).pipe(
        map(() => this.formatDuration(new Date().getTime() - this.startTime!.getTime()))
      ).subscribe(time => this.timeSubject.next(time));
    }
  }

  stopTimer(description: string) {
    if (this.timerRunning && this.startTime) {
      this.timerRunning = false;
      this.isRunningSubject.next(false);
      const endTime = new Date();
      const duration = this.formatDuration(endTime.getTime() - this.startTime.getTime());
      
      const log: TimeLog = {
        start: new Date(this.startTime), // Ensure we're working with a clean Date object
        end: new Date(endTime), // Ensure we're working with a clean Date object
        duration,
        description
      };

      const currentLogs = this.logsSubject.value;
      const updatedLogs = [log, ...currentLogs];
      
      localStorage.setItem('timeLogs', JSON.stringify(updatedLogs));
      this.logsSubject.next(updatedLogs);
      
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      
      this.timeSubject.next('00:00:00');
      this.startTime = null;
    }
  }

  private loadLogs() {
    const savedLogs = localStorage.getItem('timeLogs');
    if (savedLogs) {
      const logs: TimeLog[] = JSON.parse(savedLogs);
      // Convert string dates back to Date objects
      const parsedLogs = logs.map(log => ({
        ...log,
        start: new Date(log.start),
        end: new Date(log.end)
      }));
      this.logsSubject.next(parsedLogs);
    }
  }

  updateLog(updatedLog: TimeLog) {
    const currentLogs = this.logsSubject.value;
    const updatedLogs = currentLogs.map(log => {
      // Compare dates properly by converting to time values
      if (log.start.getTime() === updatedLog.start.getTime()) {
        return updatedLog;
      }
      return log;
    });

    localStorage.setItem('timeLogs', JSON.stringify(updatedLogs));
    this.logsSubject.next(updatedLogs);
  }

  private formatDuration(ms: number): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  clearLogs() {
    localStorage.removeItem('timeLogs');
    this.logsSubject.next([]);
  }

  filterLogsByDay(date: Date): Observable<TimeLog[]> {
    // Normalize the date to remove time component for comparison
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    return this.logs$.pipe(
      map(logs => logs.filter(log => {
        // Normalize the log date to remove time component for comparison
        const logDate = new Date(log.start);
        const normalizedLogDate = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());
        
        // Compare the normalized dates
        return normalizedLogDate.getTime() === normalizedDate.getTime();
      }))
    );
  }
}
