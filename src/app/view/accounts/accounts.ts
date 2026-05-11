import { Component, inject, OnInit, signal } from '@angular/core';
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
export class Accounts implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  title = 'Cuentas';

  accountColumns: Column<Account>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Cliente', accessor: 'clientId' },
    { header: 'Número de cuenta', accessor: 'accountNumber' },
    { header: 'Tipo de cuenta', accessor: 'accountType' },
    { header: 'Balance inicial', accessor: 'initialBalance' },
    { header: 'Estado', accessor: 'status' },
  ];

  accountData = signal<Account[]>([]);

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accountData.set(accounts);
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/accounts/edit', id]);
  }

  onDelete(id: number) {
    this.accountService.deleteAccount(id).subscribe(() => {
      this.loadAccounts();
    });
  }
}
