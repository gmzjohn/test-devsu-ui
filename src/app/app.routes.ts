import { Routes } from '@angular/router';
import { Clients } from './view/clients/clients';
import { CreateClient } from './view/clients/create-client/create-client';
import { EditClient } from './view/clients/edit-client/edit-client';
import { Accounts } from './view/accounts/accounts';
import { CreateAccount } from './view/accounts/create-account/create-account';
import { EditAccount } from './view/accounts/edit-account/edit-account';
import { Movements } from './view/movements/movements';
import { CreateMovements } from './view/movements/create-movements/create-movements';
import { EditMovement } from './view/movements/edit-movement/edit-movement';
import { Reports } from './view/reports/reports';

export const routes: Routes = [
  { path: 'clients', component: Clients },
  { path: 'clients/create', component: CreateClient },
  { path: 'clients/edit/:id', component: EditClient },
  { path: 'accounts', component: Accounts },
  { path: 'accounts/create', component: CreateAccount },
  { path: 'accounts/edit/:id', component: EditAccount },
  { path: 'movements', component: Movements },
  { path: 'movements/create', component: CreateMovements },
  { path: 'movements/edit/:id', component: EditMovement },
  { path: 'reports', component: Reports },
];
