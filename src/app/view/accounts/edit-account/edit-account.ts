import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-edit-account',
  imports: [ReactiveFormsModule, BackButton],
  templateUrl: './edit-account.html',
  styleUrl: './edit-account.css',
})
export class EditAccount implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;

  accountForm = new FormGroup({
    account_number: new FormControl<number | null>(null, [Validators.required]),
    account_type: new FormControl('', [Validators.required]),
    balance: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const account = this.accountService.getAccountById(this.id);
    if (account) {
      this.accountForm.setValue({
        account_number: account.account_number,
        account_type: account.account_type,
        balance: account.balance,
        status: account.status,
      });
    }
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.updateAccount(this.id, {
        account_number: this.accountForm.value.account_number!,
        account_type: this.accountForm.value.account_type!,
        balance: this.accountForm.value.balance!,
        status: this.accountForm.value.status!,
      });
      this.router.navigate(['/accounts']);
    }
  }
}
