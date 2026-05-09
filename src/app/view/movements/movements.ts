import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Column } from '../../components/table/types';
import { Table } from '../../components/table/table';
import { Movement, MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, RouterLink, Table],
  templateUrl: './movements.html',
  styleUrl: './movements.css',
})
export class Movements {
  private movementService = inject(MovementService);
  private router = inject(Router);
  title = 'Movimientos';

  movementColumns: Column<Movement>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Fecha', accessor: 'date' },
    { header: 'Tipo de movimiento', accessor: 'movement_type' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Balance', accessor: 'balance' },
  ];

  movementData = this.movementService.getMovements();

  onEdit(id: number) {
    this.router.navigate(['/movements/edit', id]);
  }

  onDelete(id: number) {
    this.movementService.deleteMovement(id);
  }
}
