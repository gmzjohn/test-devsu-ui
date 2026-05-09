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

  addClient(client: Omit<Client, 'id'>) {
    const newClient = {
      ...client,
      id: this.clients().length + 1,
    };
    this.clients.update((clients) => [...clients, newClient]);
  }

  updateClient(id: number, changes: Omit<Client, 'id'>) {
    this.clients.update((clients) =>
      clients.map((c) => (c.id === id ? { ...c, ...changes } : c))
    );
  }

  deleteClient(id: number) {
    this.clients.update((clients) => clients.filter((c) => c.id !== id));
  }

  getClientById(id: number): Client | undefined {
    return this.clients().find((c) => c.id === id);
  }
}
