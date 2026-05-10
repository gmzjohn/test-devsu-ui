import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount {
  private accountService = inject(AccountService);
  private router = inject(Router);

  accountForm = new FormGroup({
    accountNumber: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
    initialBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    status: new FormControl(true, [Validators.required]),
  });

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.addAccount({
        accountNumber: this.accountForm.value.accountNumber!,
        accountType: this.accountForm.value.accountType!,
        initialBalance: this.accountForm.value.initialBalance!,
        status: this.accountForm.value.status!,
      }).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    }
  }
}
