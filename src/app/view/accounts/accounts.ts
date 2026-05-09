import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';
import { Account, AccountService } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  private accountService = inject(AccountService);
  private router = inject(Router);
  title = 'Cuentas';

  accountColumns: Column<Account>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Número de cuenta', accessor: 'account_number' },
    { header: 'Tipo de cuenta', accessor: 'account_type' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Estado', accessor: 'status' },
  ];

  accountData = this.accountService.getAccounts();

  onEdit(id: number) {
    this.router.navigate(['/accounts/edit', id]);
  }

  onDelete(id: number) {
    this.accountService.deleteAccount(id);
  }
}
