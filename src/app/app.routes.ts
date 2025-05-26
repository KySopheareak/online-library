import { Routes } from '@angular/router';
import { NavMenuComponent } from './routes/nav-menu/nav-menu.component';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent)
  },
  {
      path: 'login',
      loadComponent: () => import('./routes/login/login.component').then(c => c.LoginComponent)
  },
  {
      path: '',
      component: NavMenuComponent,
      children: [
          {
              path: '',
              redirectTo: 'list',
              pathMatch: 'full',
          },
          {
              path: 'list',
              loadComponent: () => import('./routes/list/routes/list.component').then(c => c.ListComponent)
          }
      ]
  }
];
