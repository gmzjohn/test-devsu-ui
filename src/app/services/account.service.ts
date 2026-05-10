import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  initialBalance: number;
  status: boolean;
  clientId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/accounts`;

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  addAccount(account: Omit<Account, 'id'>, clientId: number): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}?clientId=${clientId}`, account);
  }

  updateAccount(id: number, account: Omit<Account, 'id'>, clientId: number): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}?clientId=${clientId}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
