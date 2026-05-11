import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  private reportService = inject(ReportService);

  loading = signal(false);
  error = signal<string | null>(null);

  reportForm = new FormGroup({
    accountNumber: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.reportForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      const { accountNumber, startDate, endDate } = this.reportForm.value;

      this.reportService.generateReport(accountNumber!, startDate!, endDate!).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `report-${accountNumber}-${startDate}-${endDate}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(
            err.status === 404
              ? 'Cuenta no encontrada. Favor revisar numero de cuenta.'
              : 'Hubo un error al generar reporte. Favor intentar de nuevo.'
          );
          this.loading.set(false);
        },
      });
    }
  }
}
