import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovementService } from '../../../services/movement.service';
import { AccountService, Account } from '../../../services/account.service';
import { BackButton } from '../../../components/back-button/back-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-movements',
  imports: [ReactiveFormsModule, BackButton, CommonModule],
  templateUrl: './create-movements.html',
  styleUrl: './create-movements.css',
})
export class CreateMovements implements OnInit {
  private movementService = inject(MovementService);
  private accountService = inject(AccountService);
  private router = inject(Router);

  accounts = signal<Account[]>([]);
  errorMessage = signal<string | null>(null);

  movementForm = new FormGroup({
    accountId: new FormControl<number | null>(null, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    movementType: new FormControl('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts.set(accounts);
    });
  }

  onSubmit() {
    if (this.movementForm.valid) {
      this.errorMessage.set(null);
      const accountId = this.movementForm.value.accountId!;
      this.movementService.addMovement({
        date: this.movementForm.value.date!,
        movementType: this.movementForm.value.movementType!,
        amount: this.movementForm.value.amount!,
        balance: 0,
        accountId,
      }, accountId).subscribe({
        next: () => this.router.navigate(['/movements']),
        error: (err) => {
          try {
            const body = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            this.errorMessage.set(body?.message);
          } catch {
            this.errorMessage.set('Error.');
          }
        },
      });
    }
  }
}
