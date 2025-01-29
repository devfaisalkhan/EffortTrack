import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TimerStorageService } from '../timer-storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RefreshContentService } from '../refresh-content.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  logs: any[] = [];
  duration: number = 0;
  private storageKey = 'effortTrackData';

  constructor(private timerStorageService: TimerStorageService, private refreshSvc: RefreshContentService) {}

  ngAfterViewInit(): void {
    this.refreshSvc.refreshTriggered$.subscribe(()=> {
      this._getAllSessions()
    })
  }

  ngOnInit(): void {
    this._getAllSessions();
    this.duration = this.calculateTotalWork(this.logs);
  }

  calculateTotalWork(logs: any[]): number {
    return logs.reduce((total, log) => {
      return total + (log.totalWork || 0);
    }, 0);
  }

  formatTotalWork(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} second${seconds > 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  }
  
  confirmClearReports() {
    const confirmation = confirm('Are you sure you want to clear all work reports? This action cannot be undone.');
    if (confirmation) {
      localStorage.clear();
      this._getAllSessions();
      alert('All reports have been successfully cleared!');
    }
  }

  private _getAllSessions() {
    this.logs = this.timerStorageService.getAllSessions().reverse();
  }
}
