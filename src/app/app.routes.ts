import { Routes } from '@angular/router';
import { Clients } from './view/clients/clients';
import { Accounts } from './view/accounts/accounts';

export const routes: Routes = [
  {
    path: 'clients',
    component: Clients,
  },
  {
    path: 'accounts',
    component: Accounts,
  }
];
