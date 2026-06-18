import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';
import { Account, AccountService } from '../../services/account.service';
import { Client, ClientService } from '../../services/client.service';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  private accountService = inject(AccountService);
  private clientService = inject(ClientService);
  private router = inject(Router);
  title = 'Cuentas';

  private clientMap = new Map<number, Client>();

  accountColumns: Column<Account>[] = [
    { header: 'ID', accessor: 'id' },
    {
      header: 'Cliente',
      accessor: 'clientId',
      render: (row) => {
        const client = this.clientMap.get(row.clientId);
        return client ? client.name : String(row.clientId);
      },
    },
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
    forkJoin({
      accounts: this.accountService.getAccounts(),
      clients: this.clientService.getClients(),
    }).subscribe(({ accounts, clients }) => {
      this.clientMap = new Map(clients.map(c => [c.id, c]));
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
