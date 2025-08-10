import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-time-tracker',
  imports: [CommonModule],
  templateUrl: './time-tracker.html',
  styleUrls: ['./time-tracker.scss']
})
export class TimeTracker implements OnInit, OnDestroy {
  @ViewChild('flipClock', { static: true }) flipClock: ElementRef | undefined;

  isRunning$: Observable<boolean>;
  time$: Observable<string>;
  private timeSubscription: Subscription | undefined;

  constructor(private timerService: TimerService) {
    this.isRunning$ = this.timerService.isRunning$;
    this.time$ = this.timerService.time$;
  }

  ngOnInit() {
    this.timeSubscription = this.time$.subscribe(time => {
      this.updateFlipClock(time);
    });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
    this.stopTimer();
  }

  startTimer() {
    this.timerService.startTimer();
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  private updateFlipClock(time: string) {
    if (!this.flipClock) {
      return;
    }

    const digits = this.flipClock.nativeElement.querySelectorAll('.digit');
    const timeDigits = time.replace(/:/g, '').split('');

    gsap.utils.toArray(digits).forEach((digit: any, i) => {
      const top = digit.querySelector('.top');
      const bottom = digit.querySelector('.bottom');
      const targetDigit = timeDigits[i];

      if (top.textContent !== targetDigit) {
        const topClone = top.cloneNode(true);
        digit.appendChild(topClone);

        gsap.to(topClone, {
          duration: 0.5,
          rotationX: -180,
          transformOrigin: 'bottom',
          onComplete: () => {
            top.textContent = targetDigit;
            bottom.textContent = targetDigit;
            topClone.remove();
          }
        });
      }
    });
  }
}
