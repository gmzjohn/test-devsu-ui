import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';

export interface Movement {
  id: number;
  date: string;
  movement_type: string;
  amount: number;
  balance: number;
}

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './movements.html',
  styleUrl: './movements.css',
})
export class Movements {
  title = 'Movimientos';

  movementColumns: Column<Movement>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Fecha', accessor: 'date' },
    { header: 'Tipo de movimiento', accessor: 'movement_type' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Balance', accessor: 'balance' },
  ];
}
