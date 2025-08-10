import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimeLogs } from './components/time-logs/time-logs';
import { TimeTracker } from './components/time-tracker/time-tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimeTracker, TimeLogs],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
