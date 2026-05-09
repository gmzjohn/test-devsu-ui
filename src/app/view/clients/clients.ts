import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';
import { Client, ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  private clientService = inject(ClientService);
  private router = inject(Router);
  title = 'Clientes';

  clientColumns: Column<Client>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Contraseña', accessor: 'password' },
    { header: 'Estado', accessor: 'status' },
  ];

  clientData = this.clientService.getClients();

  onEdit(id: number) {
    this.router.navigate(['/clients/edit', id]);
  }

  onDelete(id: number) {
    this.clientService.deleteClient(id);
  }
}
