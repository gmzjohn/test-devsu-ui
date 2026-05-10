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
    accountNumber: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
    initialBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    status: new FormControl(true, [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccountById(this.id).subscribe(account => {
      this.accountForm.setValue({
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        initialBalance: account.initialBalance,
        status: account.status,
      });
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.accountService.updateAccount(this.id, {
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
