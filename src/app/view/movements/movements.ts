import { Component, inject, OnInit, signal } from '@angular/core';
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
export class Movements implements OnInit {
  private movementService = inject(MovementService);
  private router = inject(Router);
  title = 'Movimientos';

  movementColumns: Column<Movement>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Fecha', accessor: 'date' },
    { header: 'Tipo de movimiento', accessor: 'movementType' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Balance', accessor: 'balance' },
  ];

  movementData = signal<Movement[]>([]);

  ngOnInit() {
    this.loadMovements();
  }

  loadMovements() {
    this.movementService.getMovements().subscribe(movements => {
      this.movementData.set(movements);
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/movements/edit', id]);
  }

  onDelete(id: number) {
    this.movementService.deleteMovement(id).subscribe(() => {
      this.loadMovements();
    });
  }
}
