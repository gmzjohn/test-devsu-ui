import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';


export interface Client {
  id: number;
  name: string;
  address: string;
  password: string;
  status: boolean;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})

export class Clients {
  title = 'Clients';

  clientColumns: Column<Client>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Address', accessor: 'address' },
    { header: 'Password', accessor: 'password' },
    { header: 'Status', accessor: 'status' }
  ];
}
