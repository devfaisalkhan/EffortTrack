import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TimeLog {
  start: Date;
  end: Date;
  duration: string;
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

  stopTimer() {
    if (this.timerRunning && this.startTime) {
      this.timerRunning = false;
      this.isRunningSubject.next(false);
      const endTime = new Date();
      const duration = this.formatDuration(endTime.getTime() - this.startTime.getTime());
      
      const log: TimeLog = {
        start: this.startTime,
        end: endTime,
        duration
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
}
