import { Injectable, signal } from '@angular/core';

export interface Client {
  id: number;
  name: string;
  address: string;
  password: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients = signal<Client[]>([]);

  getClients() {
    return this.clients.asReadonly();
  }
}
