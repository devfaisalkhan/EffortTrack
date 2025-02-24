import { Component, Input, OnInit } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { TimeLogsComponent } from '../../components/time-logs/time-logs.component';
import { ActivatedRoute } from '@angular/router';
import { TimerStorageService } from '../timer-storage.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [TimerComponent, TimeLogsComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit  {
  @Input() projectName!: string | null;
  @Input() projectId!: string | null;

  constructor() {}

  ngOnInit() {}

}
