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

  updateAccount(id: number, changes: Omit<Account, 'id'>) {
    this.accounts.update((accounts) =>
      accounts.map((a) => (a.id === id ? { ...a, ...changes } : a))
    );
  }

  deleteAccount(id: number) {
    this.accounts.update((accounts) => accounts.filter((a) => a.id !== id));
  }

  getAccountById(id: number): Account | undefined {
    return this.accounts().find((a) => a.id === id);
  }
}
