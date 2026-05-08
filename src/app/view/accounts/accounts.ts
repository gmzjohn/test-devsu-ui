import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';


export interface Account {
  id: number;
  account_number: number;
  account_type: string;
  balance: number;
  status: boolean;
}

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  title = "Cuentas"

  accountColumns: Column<Account>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Número de cuenta', accessor: 'account_number' },
    { header: 'Tipo de cuenta', accessor: 'account_type' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Status', accessor: 'status' }
  ];
}
