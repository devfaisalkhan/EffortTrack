import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';
import { AppInjector } from './app/universal/app-injector';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err))
  .then((appRef: any) =>{
        // custom Dependency injection in angular 19
    const injector = appRef.injector;
    AppInjector.setInjector(injector);
  } )
