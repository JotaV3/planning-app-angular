import { Routes } from '@angular/router';
import { Template } from './template/template';
import { CardRegistration } from './card/card-registration/card-registration';
import { Login } from './auth/login/login';
import { AuthGuard } from './core/auth-guard';

export const routes: Routes = [

    // if path empty, redirect to dashboard
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: Login
    },

    {
        path: 'dashboard',
        component: Template,
        canActivate: [AuthGuard],
        children: [
            {
                component: CardRegistration,
                path: 'card-registration',
            }
        ]
    },

    // takes any non-existent URL route and redirects to the dashboard
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
