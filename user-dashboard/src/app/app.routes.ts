import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
    {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
    canActivate: [
      () => {
        const token = localStorage.getItem('token');
        return !!token;
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
