import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reports`;

  generateReport(accountNumber: string, startDate: string, endDate: string): Observable<Blob> {
    return this.http.get(this.apiUrl, {
      params: { accountNumber, startDate, endDate },
      responseType: 'blob',
    });
  }
}
