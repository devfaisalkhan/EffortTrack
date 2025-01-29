import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TimerStorageService } from './pages/timer-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [TimerStorageService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
