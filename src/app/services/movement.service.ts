import { Injectable, signal } from '@angular/core';

export interface Movement {
  id: number;
  date: string;
  movement_type: string;
  amount: number;
  balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private movements = signal<Movement[]>([]);

  getMovements() {
    return this.movements.asReadonly();
  }

  addMovement(movement: Omit<Movement, 'id'>) {
    const newMovement = {
      ...movement,
      id: this.movements().length + 1,
    };
    this.movements.update((movements) => [...movements, newMovement]);
  }

  updateMovement(id: number, changes: Omit<Movement, 'id'>) {
    this.movements.update((movements) =>
      movements.map((m) => (m.id === id ? { ...m, ...changes } : m))
    );
  }

  deleteMovement(id: number) {
    this.movements.update((movements) => movements.filter((m) => m.id !== id));
  }

  getMovementById(id: number): Movement | undefined {
    return this.movements().find((m) => m.id === id);
  }
}
