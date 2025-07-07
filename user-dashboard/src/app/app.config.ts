import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { authReducer } from './auth/store/auth.reducer';
// import { dashboardReducer } from './dashboard/store/dashboard.reducer';
import { dashboardReducer } from './dashboard/store/dashboard.reducer';
// import { AuthEffects } from './auth/store/auth.effects';
// import { DashboardEffects } from './dashboard/store/dashboard.effects';
// import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
    }),
    provideStore({ auth: authReducer, dashboard: dashboardReducer }),
    // provideEffects([AuthEffects, DashboardEffects]),
  ],
};
