import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movement {
  id: number;
  date: string;
  movementType: string;
  amount: number;
  balance: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/movements';

  getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.apiUrl);
  }

  getMovementById(id: number): Observable<Movement> {
    return this.http.get<Movement>(`${this.apiUrl}/${id}`);
  }

  addMovement(movement: Omit<Movement, 'id'>): Observable<Movement> {
    return this.http.post<Movement>(this.apiUrl, movement);
  }

  updateMovement(id: number, movement: Omit<Movement, 'id'>): Observable<Movement> {
    return this.http.put<Movement>(`${this.apiUrl}/${id}`, movement);
  }

  deleteMovement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
