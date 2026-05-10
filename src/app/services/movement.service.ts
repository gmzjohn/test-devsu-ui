import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Movement {
  id: number;
  date: string;
  movementType: string;
  amount: number;
  balance: number;
  accountId: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movements`;

  getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.apiUrl);
  }

  getMovementById(id: number): Observable<Movement> {
    return this.http.get<Movement>(`${this.apiUrl}/${id}`);
  }

  addMovement(movement: Omit<Movement, 'id'>, accountId: number): Observable<Movement> {
    return this.http.post<Movement>(`${this.apiUrl}?accountId=${accountId}`, movement);
  }

  updateMovement(id: number, movement: Omit<Movement, 'id'>, accountId: number): Observable<Movement> {
    return this.http.put<Movement>(`${this.apiUrl}/${id}?accountId=${accountId}`, movement);
  }

  deleteMovement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
