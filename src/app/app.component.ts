import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RefreshContentService } from './pages/refresh-content.service';
import { TimerStorageService } from './pages/timer-storage.service';
import { ReportsComponent } from './pages/reports/reports.component';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './pages/timer/timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReportsComponent, CommonModule, TimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EffortTrack';
  timer: number = 0; // Timer in seconds
    isRunning: boolean = false;
    startTime: Date | null = null; // Start time
    stopTime: Date | null = null; // Stop time
    interval: any;
    sessionLogs: { startTime: Date | null, stopTime: Date | null, duration: number | null }[] = [];
    showReports: boolean = false; // Toggle state for reports
  
    constructor(private timerStorageService: TimerStorageService, private refreshContent: RefreshContentService) {}
  
    // Start Timer
    startTimer() {
      this.isRunning = true;
      this.startTime = new Date();
      this.stopTime = null; 
      this.interval = setInterval(() => {
        this.timer++;
      }, 1000);
    }
  
    // Stop Timer
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
  
      // Reset the timer for the next session
      this.timer = 0;
  
      this.refreshContent.triggerRefresh()
    }
  
    // Toggle Reports Section
    toggleReports() {
      this.showReports = !this.showReports;
    }
  
    // Format Timer (hh:mm:ss)
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
