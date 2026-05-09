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
    account_number: new FormControl<number | null>(null, [Validators.required]),
    account_type: new FormControl('', [Validators.required]),
    balance: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.addAccount({
        account_number: this.accountForm.value.account_number!,
        account_type: this.accountForm.value.account_type!,
        balance: this.accountForm.value.balance!,
        status: this.accountForm.value.status!,
      });
      this.router.navigate(['/accounts']);
    }
  }
}
