import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ClientService, Client } from '../../../services/client.service';
import { BackButton } from '../../../components/back-button/back-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, BackButton, CommonModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css',
})
export class CreateAccount implements OnInit {
  private accountService = inject(AccountService);
  private clientService = inject(ClientService);
  private router = inject(Router);

  clients = signal<Client[]>([]);

  accountForm = new FormGroup({
    clientId: new FormControl<number | null>(null, [Validators.required]),
    accountNumber: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
    initialBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    status: new FormControl(true, [Validators.required]),
  });

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients.set(clients);
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const clientId = this.accountForm.value.clientId!;
      this.accountService.addAccount({
        accountNumber: this.accountForm.value.accountNumber!,
        accountType: this.accountForm.value.accountType!,
        initialBalance: this.accountForm.value.initialBalance!,
        status: this.accountForm.value.status!,
        clientId,
      }, clientId).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    }
  }
}
