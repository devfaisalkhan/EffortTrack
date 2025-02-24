import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TimerStorageService } from '../../pages/timer-storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RefreshContentService } from '../../pages/refresh-content.service';
import { IProject, ISession } from '../timer/session.model';

@Component({
  selector: 'app-time-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-logs.component.html',
  styleUrls: ['./time-logs.component.scss']
})
export class TimeLogsComponent implements OnInit, AfterViewInit {
  @Input() projectId!: string | null;
  logs: any[] = [];
  duration: number = 0;

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
    this.logs = this.timerStorageService.getAllSessions(this.projectId).reverse();
  }
}
