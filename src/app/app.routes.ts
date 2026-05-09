import { Routes } from '@angular/router';
import { Clients } from './view/clients/clients';
import { Accounts } from './view/accounts/accounts';
import { Movements } from './view/movements/movements';

export const routes: Routes = [
  {
    path: 'clients',
    component: Clients,
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
