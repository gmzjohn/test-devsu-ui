import { Routes } from '@angular/router';
import { Clients } from './view/clients/clients';
import { Accounts } from './view/accounts/accounts';
import { CreateAccount } from './view/accounts/create-account/create-account';
import { Movements } from './view/movements/movements';
import { CreateMovements } from './view/movements/create-movements/create-movements';
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
    path: 'accounts/create',
    component: CreateAccount,
  },
  {
    path: 'movements',
    component: Movements,
  },
  {
    path: 'movements/create',
    component: CreateMovements,
  },
];
