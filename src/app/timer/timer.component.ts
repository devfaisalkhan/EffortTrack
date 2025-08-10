import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService, TimeLog } from '../services/timer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <!-- Timer Column -->
        <div class="col-12 col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <h2 class="card-title mb-4">Time Tracker</h2>
              
              <div class="flip-clock mb-4">
                <ng-container *ngIf="time$ | async as time">
                  <!-- Hours -->
                  <div class="digit">
                    <div class="top">{{time[0]}}</div>
                    <div class="bottom">{{time[0]}}</div>
                  </div>
                  <div class="digit">
                    <div class="top">{{time[1]}}</div>
                    <div class="bottom">{{time[1]}}</div>
                  </div>
                  
                  <div class="colon">:</div>
                  
                  <!-- Minutes -->
                  <div class="digit">
                    <div class="top">{{time[3]}}</div>
                    <div class="bottom">{{time[3]}}</div>
                  </div>
                  <div class="digit">
                    <div class="top">{{time[4]}}</div>
                    <div class="bottom">{{time[4]}}</div>
                  </div>
                  
                  <div class="colon">:</div>
                  
                  <!-- Seconds -->
                  <div class="digit">
                    <div class="top">{{time[6]}}</div>
                    <div class="bottom">{{time[6]}}</div>
                  </div>
                  <div class="digit">
                    <div class="top">{{time[7]}}</div>
                    <div class="bottom">{{time[7]}}</div>
                  </div>
                </ng-container>
              </div>

              <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary me-md-2" (click)="startTimer()">
                  Start
                </button>
                <button class="btn btn-danger" (click)="stopTimer()">
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Logs Column -->
        <div class="col-12 col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title mb-4">Time Logs</h2>
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let log of logs$ | async">
                      <td>{{log.start | date:'short'}}</td>
                      <td>{{log.end | date:'short'}}</td>
                      <td>{{log.duration}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TimerComponent implements OnDestroy {
  time$: Observable<string>;
  logs$: Observable<TimeLog[]>;

  constructor(private timerService: TimerService) {
    this.time$ = this.timerService.time$;
    this.logs$ = this.timerService.logs$;
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
