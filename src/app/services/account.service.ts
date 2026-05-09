import { Injectable, signal } from '@angular/core';

export interface Account {
  id: number;
  account_number: number;
  account_type: string;
  balance: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts = signal<Account[]>([]);

  getAccounts() {
    return this.accounts.asReadonly();
  }

  addAccount(account: Omit<Account, 'id'>) {
    const newAccount = {
      ...account,
      id: this.accounts().length + 1,
    };
    this.accounts.update((accounts) => [...accounts, newAccount]);
  }
}
