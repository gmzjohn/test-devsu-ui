import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  private clientService = inject(ClientService)
  title = 'Clients';

  clientColumns: Column<Client>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Address', accessor: 'address' },
    { header: 'Password', accessor: 'password' },
    { header: 'Status', accessor: 'status' }
  ];

  clientData = this.clientService.getClients();
}
