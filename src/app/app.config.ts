import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { accountTokenInterceptor } from './data/helpers/interceptors/account.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(withInterceptors([accountTokenInterceptor]))
    
  ]
  
};

