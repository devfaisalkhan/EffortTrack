import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RefreshContentService } from '../refresh-content.service';
import { TimerStorageService } from '../timer-storage.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  timer: number = 0;
  isRunning: boolean = false;
  startTime: Date | null = null; 
  stopTime: Date | null = null; 
  interval: any;
  sessionLogs: { startTime: Date | null, stopTime: Date | null, duration: number | null }[] = [];
  showReports: boolean = false; 

  constructor(private timerStorageService: TimerStorageService, private refreshContent: RefreshContentService) {}

  startTimer() {
    this.isRunning = true;
    this.startTime = new Date();
    this.stopTime = null; 
    this.interval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.interval);
    this.stopTime = new Date();
    
    let duration!: number;
    if (this.startTime) {
      duration = Math.floor((this.stopTime.getTime() - this.startTime.getTime()) / 1000);
    }

    this.sessionLogs.push({ startTime: this.startTime, stopTime: this.stopTime, duration });
    this.timerStorageService.saveSession(this.startTime, this.stopTime, duration);

    this.timer = 0;

    this.refreshContent.triggerRefresh()
  }

  toggleReports() {
    this.showReports = !this.showReports;
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + ':' : ''}${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
