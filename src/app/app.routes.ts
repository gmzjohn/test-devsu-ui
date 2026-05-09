import { Routes } from '@angular/router';
import { Clients } from './view/clients/clients';
import { Accounts } from './view/accounts/accounts';
import { Movements } from './view/movements/movements';
import { CreateClient } from './view/clients/create-client/create-client';

export const routes: Routes = [
  {
    path: 'clients',
    component: Clients,
  },
  {
    path: 'clients/create',
    component: CreateClient,
  },
  {
    path: 'accounts',
    component: Accounts,
  },
  {
    path: 'movements',
    component: Movements,
  },
];
