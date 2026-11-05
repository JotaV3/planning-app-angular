import { Routes } from '@angular/router';
import { Template } from './template/template';
import { CardRegistration } from './card/card-registration/card-registration';

export const routes: Routes = [
    {
        component: Template,
        path: '',
        children: [
            {
                component: CardRegistration,
                path: 'card-registration',
            }
        ]
    }
];
