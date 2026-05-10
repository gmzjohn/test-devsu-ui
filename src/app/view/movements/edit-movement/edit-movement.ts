import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovementService } from '../../../services/movement.service';
import { AccountService, Account } from '../../../services/account.service';
import { BackButton } from '../../../components/back-button/back-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movement',
  imports: [ReactiveFormsModule, BackButton, CommonModule],
  templateUrl: './edit-movement.html',
  styleUrl: './edit-movement.css',
})
export class EditMovement implements OnInit {
  private movementService = inject(MovementService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id!: number;
  accounts = signal<Account[]>([]);

  movementForm = new FormGroup({
    accountId: new FormControl<number | null>(null, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    movementType: new FormControl('', [Validators.required]),
    amount: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts.set(accounts);
    });
    this.movementService.getMovementById(this.id).subscribe(movement => {
      this.movementForm.setValue({
        accountId: movement.accountId,
        date: movement.date,
        movementType: movement.movementType,
        amount: movement.amount,
      });
    });
  }

  onSubmit() {
    if (this.movementForm.valid) {
      const accountId = this.movementForm.value.accountId!;
      this.movementService.updateMovement(this.id, {
        date: this.movementForm.value.date!,
        movementType: this.movementForm.value.movementType!,
        amount: this.movementForm.value.amount!,
        balance: 0,
        accountId,
      }, accountId).subscribe(() => {
        this.router.navigate(['/movements']);
      });
    }
  }
}
