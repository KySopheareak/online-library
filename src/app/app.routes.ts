import { Routes } from '@angular/router';
import { NavMenuComponent } from './routes/nav-menu/nav-menu.component';

export const routes: Routes = [
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
                loadComponent: () => import('./routes/list/list.component').then(c => c.ListComponent)
            }
        ]
    }
];
