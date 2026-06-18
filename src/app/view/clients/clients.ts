import { Component, inject, OnInit, signal } from '@angular/core';
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
export class Clients implements OnInit {
  private clientService = inject(ClientService);
  private router = inject(Router);
  title = 'Clientes';

  clientColumns: Column<Client>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Género', accessor: 'gender' },
    { header: 'Edad', accessor: 'age' },
    { header: 'Identificación', accessor: 'identification' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phoneNumber' },
    // { header: 'Contraseña', accessor: 'password' },
    { header: 'Estado', accessor: 'status' },
  ];

  clientData = signal<Client[]>([]);

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clientData.set(clients);
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/clients/edit', id]);
  }

  onDelete(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.loadClients();
    });
  }
}
