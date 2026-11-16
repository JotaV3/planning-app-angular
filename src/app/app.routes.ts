import { Routes } from '@angular/router';
import { Template } from './template/template';
import { CardRegistration } from './card/card-registration/card-registration';
import { Login } from './auth/login/login';

export const routes: Routes = [
    {
        component: Login,
        path: '',
        pathMatch: 'full'
    },

    {
        component: Template,
        path: 'dashboard',
        children: [
            {
                component: CardRegistration,
                path: 'card-registration',
            }
        ]
    }
];
